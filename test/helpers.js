/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * The shared test harness.
 *
 * Every suite in `test/suites/` exports `{ name, run }` and receives one of these
 * objects. Keeping the assertion counter, the CLI runner and the scratch-folder
 * plumbing in one place means a suite file is nothing but assertions.
 *
 * There are no dependencies here, and there never should be -- the suite has to run
 * anywhere Documon itself runs.
 *
 * @module  helpers
 * @package test
 */

var fs   = require('fs');
var os   = require('os');
var path = require('path');
var cp   = require('child_process');

var ROOT     = path.resolve(__dirname, "..");
var SRC      = path.join(ROOT, "src");
var TEMPLATE = path.join(ROOT, "template") + path.sep;
var FIXTURES = path.join(__dirname, "fixtures");
var CLI      = path.join(ROOT, "index.js");

/**
 * Builds a harness.
 *
 * @method  create
 * @return  {object} - The harness handed to every suite.
 */
function create(){

	var state = {
		passed  : 0,
		failed  : 0,
		failures : []
	};

	var current = "";

	var t = {

		ROOT     : ROOT,
		SRC      : SRC,
		TEMPLATE : TEMPLATE,
		FIXTURES : FIXTURES,
		CLI      : CLI,

		// Built from pieces so this file does not contain the very thing it tests.
		OPEN  : "/*" + "*",
		CLOSE : "*" + "/",

		state : state
	};

	/**
	 * Records one assertion.
	 *
	 * @method  ok
	 * @param   {boolean} cond    - The assertion.
	 * @param   {string}  label   - What was being asserted.
	 * @param   {string}  [extra] - Detail printed on failure.
	 */
	t.ok = function(cond, label, extra){
		if(cond){
			state.passed++;
			console.log("  ok   " + label);
		} else {
			state.failed++;
			state.failures.push(current + " :: " + label);
			console.log("  FAIL " + label + (extra ? "\n       " + extra : ""));
		}
	};

	/**
	 * Prints a section heading inside a suite.
	 *
	 * @method  section
	 * @param   {string} title - The heading.
	 */
	t.section = function(title){
		current = title;
		console.log("\n" + title);
	};

	var neutralDir = null;

	/**
	 * A working directory with no Documon config anywhere above it.
	 *
	 * Config discovery walks up from the working directory, so running the CLI from
	 * inside this repository silently picks up Documon's own `documon.json` -- which
	 * sets `print`, `gati`, `baseUrl` and an `ignore` entry. A test that did not ask for
	 * any of that would then pass or fail for reasons it never stated. Runs that *do*
	 * want the repository's config pass `t.ROOT` explicitly.
	 *
	 * @method  neutral
	 * @return  {string} - A config-free working directory.
	 */
	t.neutral = function(){
		if( ! neutralDir ){
			neutralDir = fs.mkdtempSync( path.join(os.tmpdir(), "documon-neutral-") );
		}
		return neutralDir;
	};

	/**
	 * Runs the CLI and captures stdout plus the exit status.
	 *
	 * @method  cli
	 * @param   {array}  args  - CLI arguments.
	 * @param   {string} [cwd] - Working directory; defaults to a config-free folder, so
	 * nothing is inherited from this repository unless a test asks for it.
	 * @return  {object}       - `{ status, stdout, stderr }`.
	 */
	t.cli = function(args, cwd){
		var res = cp.spawnSync(process.execPath, [CLI].concat(args), {
			encoding : "utf8",
			cwd      : cwd || t.neutral()
		});
		return { status : res.status, stdout : res.stdout || "", stderr : res.stderr || "" };
	};

	/**
	 * Runs the CLI with no arguments at all, so config discovery is what drives it.
	 *
	 * @method  bare
	 * @param   {string} cwd - Working directory.
	 * @return  {object}     - `{ status, stdout, stderr }`.
	 */
	t.bare = function(cwd){
		var res = cp.spawnSync(process.execPath, [CLI], { encoding : "utf8", cwd : cwd });
		return { status : res.status, stdout : res.stdout || "", stderr : res.stderr || "" };
	};

	/**
	 * Creates a scratch folder for a test.
	 *
	 * @method  tmp
	 * @return  {string} - Path to a fresh folder.
	 */
	t.tmp = function(){
		return fs.mkdtempSync( path.join(os.tmpdir(), "documon-test-") );
	};

	/**
	 * Requires a module from `src/`, using the normal require cache.
	 *
	 * @method  src
	 * @param   {string} name - Module filename without the extension.
	 * @return  {any}         - Whatever the module exports.
	 */
	t.src = function(name){
		return require( path.join(SRC, name + ".js") );
	};

	/**
	 * Requires a module from `src/` with a cleared cache, so module-level state starts
	 * empty.
	 *
	 * `organizer.js` keeps its tree, its flat class list and its
	 * already-applied-inheritance list at module scope, and `init()` only resets the
	 * first of the three. Two organizer tests in one process would otherwise see each
	 * other's classes.
	 *
	 * @method  fresh
	 * @param   {string} name - Module filename without the extension.
	 * @return  {any}         - A newly evaluated copy of the module.
	 */
	t.fresh = function(name){
		var file = path.join(SRC, name + ".js");
		delete require.cache[ require.resolve(file) ];
		return require(file);
	};

	/**
	 * Writes a file, creating any missing parent folders.
	 *
	 * @method  write
	 * @param   {string}       file  - Absolute path.
	 * @param   {string|array} lines - Contents; an array is joined with newlines.
	 * @return  {string}             - The path written.
	 */
	t.write = function(file, lines){
		var dir = path.dirname(file);
		if( ! fs.existsSync(dir) ){
			fs.mkdirSync(dir, { recursive : true });
		}
		fs.writeFileSync(file, Array.isArray(lines) ? lines.join("\n") : lines, "utf8");
		return file;
	};

	/**
	 * Reads a file as text.
	 *
	 * @method  read
	 * @param   {string} file - Absolute path.
	 * @return  {string}      - The contents.
	 */
	t.read = function(file){
		return fs.readFileSync(file, "utf8");
	};

	/**
	 * Reads a JSON file.
	 *
	 * @method  readJson
	 * @param   {string} file - Absolute path.
	 * @return  {object}      - The parsed contents.
	 */
	t.readJson = function(file){
		return JSON.parse( fs.readFileSync(file, "utf8") );
	};

	/**
	 * Builds a throwaway project on disk.
	 *
	 * @method  project
	 * @param   {object} spec        - What to create.
	 * @param   {object} [spec.src]  - Map of `"name.js"` to contents (string or array of lines).
	 * @param   {object} [spec.more] - Map of `"104.Thing.md"` to contents.
	 * @param   {object} [spec.root] - Map of files written at the project root.
	 * @return  {object}             - `{ dir, src, more, out }` absolute paths.
	 */
	t.project = function(spec){

		spec = spec || {};

		var dir  = t.tmp();
		var src  = path.join(dir, "src");
		var more = path.join(dir, "more");
		var out  = path.join(dir, "out");

		fs.mkdirSync(src);

		var prop;

		for(prop in (spec.src || {})){
			t.write( path.join(src, prop), spec.src[prop] );
		}

		if(spec.more){
			fs.mkdirSync(more);
			for(prop in spec.more){
				t.write( path.join(more, prop), spec.more[prop] );
			}
		}

		for(prop in (spec.root || {})){
			t.write( path.join(dir, prop), spec.root[prop] );
		}

		return { dir : dir, src : src, more : more, out : out };
	};

	/**
	 * True when a `--check` report contains a finding with the given rule id.
	 *
	 * @method  hasRule
	 * @param   {object}  report - A parsed `--check --json` report.
	 * @param   {string}  rule   - The rule id.
	 * @return  {boolean}        - Whether it is present.
	 */
	t.hasRule = function(report, rule){
		return report.findings.some(function(f){ return f.rule === rule; });
	};

	/**
	 * Returns every finding with the given rule id.
	 *
	 * @method  findings
	 * @param   {object} report - A parsed `--check --json` report.
	 * @param   {string} rule   - The rule id.
	 * @return  {array}         - The matching findings.
	 */
	t.findings = function(report, rule){
		return report.findings.filter(function(f){ return f.rule === rule; });
	};

	/**
	 * Runs `--check --json` and parses the report.
	 *
	 * @method  check
	 * @param   {array}  args  - Extra CLI arguments, typically `["-i", somePath]`.
	 * @param   {string} [cwd] - Working directory.
	 * @return  {object}       - `{ status, report }`.
	 */
	t.check = function(args, cwd){
		var res = t.cli(["--check", "--json"].concat(args), cwd);
		return { status : res.status, report : JSON.parse(res.stdout), stdout : res.stdout };
	};

	/**
	 * Builds a project and returns its `model.json`.
	 *
	 * @method  model
	 * @param   {array}  args  - CLI arguments, which must include `-o`.
	 * @param   {string} [cwd] - Working directory.
	 * @param   {string} out   - The output folder passed to `-o`.
	 * @return  {object}       - The parsed model.
	 */
	t.model = function(args, cwd, out){
		t.cli(args, cwd);
		return t.readJson( path.join(out, "docs", "model.json") );
	};

	/**
	 * Runs a source string through extract -> parse -> splitParsed, the way `documon.js`
	 * does, and hands back the groups a page is built from.
	 *
	 * @method  parseSource
	 * @param   {string} source - Source text containing comment blocks.
	 * @param   {string} [file] - The filename to record.
	 * @return  {array}         - Groups of parsed comment blocks.
	 */
	t.parseSource = function(source, file){

		var extract     = t.src("extract");
		var parse       = t.src("parse");
		var splitParsed = t.src("splitParsed");

		file = file || "/proj/src/thing.js";

		var comments = extract(source);
		var parsed   = [];

		for(var i=0; i<comments.length; i++){
			var one = parse(comments[i], file);
			if(one){
				parsed.push(one);
			}
		}

		return splitParsed(parsed);
	};

	/**
	 * Runs a source string all the way to tagged pages.
	 *
	 * @method  tagSource
	 * @param   {string} source - Source text containing comment blocks.
	 * @param   {object} [conf] - Overrides for the tag configuration.
	 * @return  {array}         - One tagged page per group.
	 */
	t.tagSource = function(source, conf){

		var tag  = t.src("tag");
		var file = (conf && conf.file) || "/proj/src/thing.js";

		var useConf = {
			sourceRootFolder : "/proj/src/",
			file             : file,
			filename         : "thing.js",
			projectName      : "Test",
			projectVersion   : "0.0.0"
		};

		for(var prop in (conf || {})){
			useConf[prop] = conf[prop];
		}

		var groups = t.parseSource(source, file);
		var pages  = [];

		for(var i=0; i<groups.length; i++){
			pages.push( tag(groups[i], useConf, "thing") );
		}

		return pages;
	};

	/**
	 * Parses a single tag line the way `parse.js` would, and returns the flag object.
	 *
	 * @method  flag
	 * @param   {string} line    - One `@tag ...` line.
	 * @param   {array}  [sink]  - An existing flag list, for parent/child cases.
	 * @return  {object}         - The parsed flag.
	 */
	t.flag = function(line, sink){
		var parseFlag = t.src("parseFlag");
		return parseFlag(line, sink || []);
	};

	/**
	 * Wraps lines in a documentation comment.
	 *
	 * @method  block
	 * @param   {array} lines - The lines inside the comment.
	 * @return  {string}      - A complete comment block.
	 */
	t.block = function(lines){
		return [t.OPEN].concat(lines.map(function(l){ return " * " + l; })).concat([" " + t.CLOSE]).join("\n");
	};

	return t;
}

module.exports = { create : create };
