#!/usr/bin/env node
/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * The command-line and programmatic entry point for Documon.
 *
 * Resolves configuration from three sources (later wins):
 *
 * 	1. built-in defaults
 * 	2. a config file (`documon.json`, `.documonrc`, or a `documon` key in `package.json`)
 * 	3. CLI flags / the options object passed to `run()`
 *
 * @module  index
 * @package documon
 * @example
 *
 * 		var documon = require("documon");
 * 		documon({ src : "./src", out : "./docs" });
 */

var fs = require("fs");
var path = require("./src/npath");
var log = require('./src/log');
var documon = require('./src/documon');
var info = require('./src/info');
var mist = require('./src/minimist');
var check = require('./src/check');

/**
 * @property {object} EXIT - Process exit codes. Documon used to always exit 0, which
 * made failures invisible to CI and to automated (AI agent) tooling. Callers can now
 * branch on these.
 * @property {number} EXIT.OK=0        - Everything worked.
 * @property {number} EXIT.CONFIG=1    - Bad or missing configuration, nothing was built.
 * @property {number} EXIT.FINDINGS=2  - `--check` ran and found problems.
 */
var EXIT = {
	OK       : 0,
	CONFIG   : 1,
	FINDINGS : 2
};

/**
 * @property {object} LONG - Maps the historical single-letter CLI flags to readable
 * long-form equivalents. Both forms are accepted; the long form is what an agent (or a
 * human reading a build script six months later) will actually reach for.
 */
var LONG = {
	i : "src",
	o : "out",
	t : "template",
	p : "print",
	n : "name",
	g : "ignore",
	v : "version",
	l : "launch",
	d : "dumpData",
	e : "sourceExt",
	m : "more",
	a : "docBegin",
	z : "docEnd",
	x : "indexShortcutName",
	q : "moreQuirkDelimiter",
	y : "gati"
};

/**
 * @property {array} LONG_ONLY - Options that have no historical single-letter flag. They
 * are accepted as long flags (`--description "..."`) and as config-file keys.
 */
var LONG_ONLY = [
	"description",
	"baseUrl",
	"docsDirName",
	"emitLlms",
	"emitModel"
];

/**
 * @property {array} CONFIG_FILES - Filenames searched for when no `--config` is given.
 */
var CONFIG_FILES = ["documon.json", "documon.config.json", ".documonrc"];

/**
 * Reads a config file from disk, or plucks the `documon` key out of a `package.json`.
 *
 * @method     readConfigFile
 * @private
 * @param      {string}   fpath  - Path to the config file.
 * @return     {object}          - The parsed config, or null when unreadable.
 */
function readConfigFile(fpath, errors){
	try {
		var raw = JSON.parse( fs.readFileSync(fpath, 'utf8') );
		if( path.parse(fpath).base === "package.json" ){
			return raw.documon || null;
		}
		return raw;
	} catch(e) {
		errors.push("Could not parse config file: " + fpath + " (" + e.message + ")");
		return null;
	}
}

/**
 * @property {array} PATH_KEYS - Config keys whose value is a filesystem path.
 */
var PATH_KEYS = ["src", "out", "more", "template"];

/**
 * Rewrites a config file's relative paths so they are read relative to the config file
 * rather than to the working directory.
 *
 * `findConfig()` deliberately walks up the tree so the tool can be run from anywhere
 * inside a project. Without this, that only ever worked from the project root: a root
 * `documon.json` saying `"src": "./src"` run from `project/src/deeper` looked for
 * `project/src/deeper/src` and failed with "Input folder doesn't exist".
 *
 * Absolute paths are left alone, as is anything that is not a path key.
 *
 * @method     rebasePaths
 * @private
 * @param      {object}  conf - The parsed config, modified in place.
 * @param      {string}  dir  - The folder the config file lives in.
 */
function rebasePaths(conf, dir){

	for(var i=0; i<PATH_KEYS.length; i++){

		var key = PATH_KEYS[i];
		var val = conf[key];

		if( ! val ){
			continue;
		}

		if( Array.isArray(val) ){
			var list = [];
			for(var v=0; v<val.length; v++){
				list.push( typeof val[v] === "string" && ! path.isAbsolute(val[v])
					? path.resolve(dir, val[v])
					: val[v] );
			}
			conf[key] = list;
			continue;
		}

		if( typeof val === "string" && ! path.isAbsolute(val) ){
			conf[key] = path.resolve(dir, val);
		}
	}
}

/**
 * Walks up from a starting folder looking for a Documon config file. Lets an agent run
 * `documon` from anywhere inside a project and still pick up the project's settings.
 *
 * @method     findConfig
 * @private
 * @param      {string}   from  - Folder to start searching from.
 * @return     {string}         - Absolute path to the config file, or null.
 */
function findConfig(from){
	var dir = path.resolve(from || process.cwd());
	var last = null;

	while(dir && dir !== last){
		for(var i=0; i<CONFIG_FILES.length; i++){
			var candidate = path.join(dir, CONFIG_FILES[i]);
			if( fs.existsSync(candidate) ){
				return candidate;
			}
		}
		var pkg = path.join(dir, "package.json");
		if( fs.existsSync(pkg) ){
			try {
				if( JSON.parse(fs.readFileSync(pkg, 'utf8')).documon ){
					return pkg;
				}
			} catch(e) { /* not our problem, keep walking */ }
		}
		last = dir;
		dir = path.dirname(dir);
	}

	return null;
}

/**
 * Finds the nearest `package.json` and borrows the project's identity from it.
 *
 * Without this, `name`, `version` and `description` have to be repeated in a config file
 * or on the command line, and then kept in sync by hand -- which is exactly the kind of
 * duplication that goes stale.
 *
 * @method     packageDefaults
 * @private
 * @param      {string}  from - Folder to start searching from.
 * @return     {object}       - `{ name, version, description }`, any of which may be absent.
 */
function packageDefaults(from){

	var dir  = path.resolve(from || process.cwd());
	var last = null;

	while(dir && dir !== last){

		var pkgPath = path.join(dir, "package.json");

		if( fs.existsSync(pkgPath) ){
			try {
				var pkg = JSON.parse( fs.readFileSync(pkgPath, 'utf8') );
				return {
					name        : pkg.name,
					version     : pkg.version,
					description : pkg.description
				};
			} catch(e) {
				return {};
			}
		}

		last = dir;
		dir = path.dirname(dir);
	}

	return {};
}

/**
 * Turns raw CLI argv into a Documon options object, folding in any config file found.
 *
 * @method     optsFromArgv
 * @private
 * @param      {object}   argv    - Parsed minimist output.
 * @param      {array}    errors  - Collector for problems found along the way.
 * @return     {object}           - Documon options.
 */
function optsFromArgv(argv, errors){

	var opts = {};

	// Config file first, so explicit flags can override it.
	var configPath = argv.config || argv.c;
	if(configPath === true){
		configPath = null; // "--config" with no value
	}
	if( ! configPath ){
		configPath = findConfig(process.cwd());
	}
	if(configPath){
		var resolvedConfig = path.resolve(configPath);
		var fromFile = readConfigFile(resolvedConfig, errors);
		if(fromFile){
			rebasePaths(fromFile, path.dirname(resolvedConfig));
			for(var prop in fromFile){
				opts[prop] = fromFile[prop];
			}
			opts.configFile = resolvedConfig;
		}
	}

	// Short flags, mapped to their long names.
	for(var short in LONG){
		if(typeof argv[short] !== "undefined"){
			opts[ LONG[short] ] = argv[short];
		}
	}

	// Long flags win over short ones.
	for(var key in LONG){
		var longName = LONG[key];
		if(typeof argv[longName] !== "undefined"){
			opts[longName] = argv[longName];
		}
	}

	// Long-only options.
	for(var n=0; n<LONG_ONLY.length; n++){
		var only = LONG_ONLY[n];
		if(typeof argv[only] !== "undefined"){
			opts[only] = argv[only];
		}
	}

	// Positional: [source] [output]
	if( ! opts.src && argv._ && argv._[0] ){
		opts.src = argv._[0];
	}
	if( ! opts.out && argv._ && argv._[1] ){
		opts.out = argv._[1];
	}

	// Modes
	opts.check    = argv.check    ? true : false;
	opts.json     = argv.json     ? true : false;
	opts.coverage = argv.coverage ? true : false;
	opts.strict   = argv.strict   ? true : false;

	// Ignore list arrives as a semicolon delimited string from the CLI.
	if(typeof opts.ignore === "string"){
		opts.ignore = opts.ignore.split(";").map(function(item){
			return item.trim();
		}).filter(Boolean);
	}

	return opts;
}

/**
 * Verifies a path exists.
 *
 * Note: the previous implementation pushed "not specified" onto the error list
 * unconditionally (outside the `else`), so every successful run still reported phantom
 * errors like "Input folder not specified" for folders that plainly existed.
 *
 * @method     exists
 * @private
 * @param      {string}   fpath   - The path to test.
 * @param      {string}   kind    - Human label used in error messages.
 * @param      {array}    errors  - Collector for problems.
 * @return     {boolean}          - Whether the path exists.
 */
function exists(fpath, kind, errors) {

	if( ! fpath ){
		errors.push(kind + " not specified.");
		return false;
	}

	var resolved = path.resolve(fpath);

	if( ! fs.existsSync(resolved) ){
		errors.push(kind + " doesn't exist: " + resolved);
		return false;
	}

	return true;
}

/**
 * The CLI wrapper. Parses argv, runs, and sets an exit code.
 *
 * @method  cli
 * @private
 */
function cli(){

	var argv = mist(process.argv.slice(2));

	if(argv.h || argv.help){
		log(info.usage);
		process.exitCode = EXIT.OK;
		return;
	}

	if(argv.version === true || argv.V){
		log( require("./package.json").version );
		process.exitCode = EXIT.OK;
		return;
	}

	var errors = [];
	var opts = optsFromArgv(argv, errors);

	if(errors.length){
		log(errors, "Errors", false);
		process.exitCode = EXIT.CONFIG;
		return;
	}

	var result = run(opts);

	process.exitCode = result && typeof result.exitCode === "number" ? result.exitCode : EXIT.OK;
}

/**
 * Runs Documon.
 *
 * @method  run
 * @param   {object|string}  opts - Options object, or a string treated as `src`.
 * @return  {object}              - A result object: `{ ok, exitCode, errors, findings, pages }`.
 * @example
 *
 * 		var documon = require("documon");
 * 		var result = documon({ src : "./src", out : "./docs" });
 * 		if( ! result.ok ){ process.exit(result.exitCode); }
 */
function run(opts) {

	var errors = [];

	if( ! opts ){
		errors.push("No configuration specified.");
		return fail(errors, false);
	}

	if(typeof opts === 'string'){
		opts = { src : opts };
	}

	// --json implies quiet: an agent parsing stdout shouldn't have to skip banners.
	var quiet = opts.json ? true : (opts.print ? false : true);

	var src = opts.src;
	var out = opts.out;
	var template = opts.template;

	// -------------
	// Input must exist.
	var inputOK;
	if( ! src ){
		errors.push("Input folder not specified.");
		inputOK = false;
	} else if(typeof src === 'object'){
		inputOK = true;
		for(var i=0; i<src.length; i++){
			if( ! exists(src[i], "Input folder", errors) ){
				inputOK = false;
				break;
			}
		}
	} else {
		inputOK = exists(src, "Input folder", errors);
	}

	// -------------
	// Template, when specified, must exist.
	var templateOK = true;
	if (template) {
		templateOK = exists(template, "Template folder", errors);
	}

	// -------------
	// Output does NOT have to exist -- we create it. Requiring the caller to pre-create
	// the output folder was the single biggest first-run failure for scripted callers.
	var outputOK = true;
	if (out && ! opts.check) {
		var outResolved = path.resolve(out);
		if( ! fs.existsSync(outResolved) ){
			try {
				require('./src/dirutils').make(outResolved);
				log("Created output folder: " + outResolved, null, quiet);
			} catch(e) {
				errors.push("Could not create output folder: " + outResolved + " (" + e.message + ")");
				outputOK = false;
			}
		}
	}

	if( !(inputOK && outputOK && templateOK) ){
		if( ! opts.json ){
			log(info.usage, null, quiet);
			log(opts, "Specified Options", quiet);
		}
		return fail(errors, opts.json);
	}

	// Fall back to the nearest package.json for project identity, so name/version/
	// description live in exactly one place instead of being restated per build script.
	// Searched from the source folder, which is what a caller means even when the process
	// was launched from somewhere else. Anything explicitly supplied wins.
	var seed = typeof src === "object" ? src[0] : src;
	var pkg  = packageDefaults( seed ? path.dirname(path.resolve(seed)) : process.cwd() );

	if( ! opts.name && pkg.name ){
		opts.name = pkg.name;
	}
	if( ! opts.version && pkg.version ){
		opts.version = pkg.version;
	}
	if( ! opts.description && pkg.description ){
		opts.description = pkg.description;
	}

	log(info.copyright, null, quiet);

	var conf = {
		src                 : src,
		out                 : out,
		template            : template,
		name                : opts.name,
		description         : opts.description,
		version             : opts.version,
		launch              : opts.launch,
		ignore              : opts.ignore,
		print               : opts.print,
		dumpData            : opts.dumpData,
		sourceExt           : opts.sourceExt,
		more                : opts.more,
		docBegin            : opts.docBegin,
		docEnd              : opts.docEnd,
		docsDirName         : opts.docsDirName,
		indexShortcutName   : opts.indexShortcutName,
		moreQuirkDelimiter  : opts.moreQuirkDelimiter,
		gati                : opts.gati,
		baseUrl             : opts.baseUrl,
		emitLlms            : opts.emitLlms === false ? false : true,
		emitModel           : opts.emitModel === false ? false : true,
		quiet               : quiet
	};

	log(conf, "Config", quiet);

	// -------------
	// Check mode: validate only, never write.
	if(opts.check){
		var report = check.run(conf, { coverage : opts.coverage });

		if(opts.json){
			process.stdout.write(JSON.stringify(report, null, "\t") + "\n");
		} else {
			check.print(report, log);
		}

		var bad = report.counts.error > 0 || (opts.strict && report.counts.warning > 0);

		return {
			ok       : ! bad,
			exitCode : bad ? EXIT.FINDINGS : EXIT.OK,
			errors   : [],
			findings : report.findings,
			counts   : report.counts
		};
	}

	// -------------
	// Build.
	var built = documon.run(conf);

	// run() returns null when it could not build -- most commonly "no files to parse",
	// which happens when the source folder is empty or holds nothing matching sourceExt.
	// That return value used to be ignored, so a run that wrote no site still reported
	// ok:true and exit 0, and with output quiet by default it said nothing at all.
	if( ! built ){
		return fail([
			"No files to parse. Check the source folder and the sourceExt setting."
		], opts.json);
	}

	var result = {
		ok       : true,
		exitCode : EXIT.OK,
		errors   : [],
		findings : [],
		out      : built && built.outputFolder,
		pages    : built && built.pages,
		files    : built && built.files
	};

	if(opts.json){
		process.stdout.write(JSON.stringify(result, null, "\t") + "\n");
	}

	return result;
}

/**
 * Builds a failure result, printing or serializing it as appropriate.
 *
 * @method     fail
 * @private
 * @param      {array}    errors  - The collected error strings.
 * @param      {boolean}  json    - Whether to emit JSON instead of human output.
 * @return     {object}           - A result object.
 */
function fail(errors, json){

	var result = {
		ok       : false,
		exitCode : EXIT.CONFIG,
		errors   : errors,
		findings : []
	};

	if(json){
		process.stdout.write(JSON.stringify(result, null, "\t") + "\n");
	} else {
		log(errors, "Errors", false);
	}

	return result;
}

// -------------------------
// If running as CLI (direct access via shell):
if (require.main === module) {
	cli();
}

module.exports = run;
module.exports.run = run;
module.exports.check = check;
module.exports.EXIT = EXIT;
