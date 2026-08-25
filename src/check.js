/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Validates documentation comments without generating anything.
 *
 * Because Documon infers nothing from source code, a missing or misspelled tag doesn't
 * produce a warning -- it produces *silence*, and the symbol simply never appears in the
 * output. That is fine for a human who eyeballs the result, and useless for an automated
 * writer that needs to know whether it succeeded.
 *
 * `--check` is that feedback signal: parse everything, report what won't work, exit
 * non-zero. Write comments, check, repair, repeat.
 *
 * @module  check
 * @package documon
 * @example
 *
 * 		documon --check -i ./src            # human readable
 * 		documon --check --json -i ./src     # machine readable
 * 		documon --check --coverage -i ./src # plus undocumented-symbol advisory
 */

var fs      = require('fs');
var path    = require('./npath');
var du      = require('./dirutils');
var extract = require('./extract');
var parse   = require('./parse');
var ignoreModule = require('./ignore');

/**
 * @property {array} KIND_TAGS - Tags that declare what an entity *is*. A comment block
 * needs one of these to become anything at all.
 */
var KIND_TAGS = ["property", "method", "event", "class", "module", "package", "namespace"];

/**
 * @property {array} EXTENDISH - Tags whose value must resolve to another documented id.
 */
var EXTENDISH = ["overrides", "impliments", "extends", "inherits"];

/**
 * @property {array} KNOWN_TAGS - Every tag Documon actually acts on. Anything else is
 * inert -- it will be silently dropped from the output.
 */
var KNOWN_TAGS = KIND_TAGS.concat(EXTENDISH).concat([
	"private", "protected", "static", "public", "readonly",
	"constructor", "example", "param", "return", "returns",
	"type", "order", "optional", "header", "see", "requires",
	"default", "defaultVal", "defaultValue"
]);

/**
 * @property {object} COMMON_TYPOS - Tags people (and models trained on other doc systems)
 * reach for that Documon does not implement, mapped to the right answer.
 */
var COMMON_TYPOS = {
	"returns"     : null,              // valid, listed for clarity
	"arg"         : "param",
	"argument"    : "param",
	"parameter"   : "param",
	"prop"        : "property",
	"member"      : "property",
	"function"    : "method",
	"func"        : "method",
	"fires"       : "event",
	"emits"       : "event",
	"augments"    : "extends",
	"implements"  : "impliments",
	"desc"        : null,
	"description" : null,
	"summary"     : null,
	"typedef"     : null,
	"callback"    : null,
	"async"       : null,
	"deprecated"  : null,
	"since"       : null,
	"author"      : null,
	"license"     : null,
	"todo"        : null,
	"throws"      : null,
	"exception"   : null,
	"file"        : null,
	"fileoverview": null,
	"ignore"      : null,
	"access"      : null,
	"abstract"    : null,
	"virtual"     : null,
	"yields"      : null,
	"template"    : null
};

/**
 * Creates a finding.
 *
 * @method     finding
 * @private
 * @param      {string}  level    - "error", "warning" or "info".
 * @param      {string}  rule     - Stable machine-readable rule id.
 * @param      {string}  file     - Source file.
 * @param      {number}  line     - 1-based line number.
 * @param      {string}  message  - What is wrong.
 * @param      {string}  [fix]    - How to fix it.
 * @return     {object}           - The finding.
 */
function finding(level, rule, file, line, message, fix){
	return {
		level   : level,
		rule    : rule,
		file    : file,
		line    : line,
		message : message,
		fix     : fix || null
	};
}

/**
 * Collects the source files that would be parsed by a build with this config.
 *
 * @method     collect
 * @private
 * @param      {object}  conf - Documon config.
 * @return     {array}        - Absolute file paths.
 */
function collect(conf){

	var exts = conf.sourceExt || "js";
	if(typeof exts === "string"){
		exts = exts.indexOf(" ") > -1 ? exts.split(" ") : [exts];
	}

	var list = conf.src;
	if(typeof list === "string"){
		list = [list];
	}

	// Exclude the generated docs folder -- not `out` itself, which is usually the parent
	// of the source tree.
	var docsFolder = conf.out
		? path.resolve(conf.out) + "/" + (conf.docsDirName || "docs")
		: null;

	var ignore = ignoreModule.create(conf.ignore, docsFolder ? [docsFolder] : []);
	var files = [];

	for(var i=0; i<list.length; i++){
		var item = path.normalize(list[i]);

		if( ! fs.existsSync(item) ){
			continue;
		}

		if( du.exists(item) ){
			files = files.concat( du.readExt(item, exts, true) );
		} else {
			files.push(item);
		}
	}

	return files.filter(function(f){
		return ! ignore.test(f);
	});
}

/**
 * Derives the id a comment block will be filed under, mirroring how `tag.js` builds ids.
 *
 * Ids are scoped `package.container.member` -- the same shape as the generated filenames
 * (`documon.dirutils.html`). A `@method` therefore inherits the `@class` or `@module`
 * declared above it in the same file; without that scope every `run()` in the project
 * would look like a collision.
 *
 * @method     blockId
 * @private
 * @param      {object}  info      - Summarized block.
 * @param      {string}  [scope]   - The enclosing class/module name.
 * @return     {string}            - Dotted id, or null.
 */
function blockId(info, scope){

	if( ! info.name ){
		return null;
	}

	var parts = [];

	if(info.package){
		parts.push(info.package);
	}

	// Containers are their own scope; members hang off the container above them.
	var isContainer = (info.kind === "class" || info.kind === "module");

	if( ! isContainer && scope ){
		parts.push(scope);
	}

	parts.push(info.name);

	return parts.join(".");
}

/**
 * Reduces a parsed comment block to the facts the rules care about.
 *
 * @method     summarize
 * @private
 * @param      {object}  parsed - Output of `parse()`.
 * @return     {object}         - Summary.
 */
function summarize(parsed){

	var info = {
		line     : (parsed.start || 0) + 1,
		file     : parsed.file,
		text     : (parsed.text || "").trim(),
		kind     : null,
		name     : null,
		package  : null,
		declaredPackage : null,
		tags     : [],
		params   : [],
		extends  : [],
		hasReturn: false,
		isMethod : false,
		takesParams : false
	};

	for(var i=0; i<parsed.flags.length; i++){

		var f    = parsed.flags[i];
		var flag = f.flag;

		if( ! flag ){
			continue;
		}

		info.tags.push(f);

		if( KIND_TAGS.indexOf(flag) > -1 ){
			if(flag === "package" || flag === "namespace"){
				info.package = (f.after || "").trim() || f.name || null;
				info.declaredPackage = info.package;
			} else {
				if( ! info.kind ){
					info.kind = flag;
					info.name = f.name || null;
				}
				if(flag === "method"){
					info.isMethod = true;
				}
				if(flag === "method" || flag === "event"){
					info.takesParams = true;
				}
			}
		}

		if(flag === "param"){
			info.params.push(f);
		}

		if(flag === "return" || flag === "returns"){
			info.hasReturn = true;
		}

		if( EXTENDISH.indexOf(flag) > -1 ){
			// `name` is only the final segment for dotted targets ("fixture.Base" ->
			// "Base"), because parseFlag treats dots as parent/child. `after` keeps the
			// whole thing, which is what an id has to match.
			var target = (f.after || "").trim() || f.name;
			if(target){
				info.extends.push({ flag : flag, target : target, line : info.line });
			}
		}
	}

	return info;
}

/**
 * A deliberately shallow symbol scan used only by the coverage advisory.
 *
 * This never feeds the render path -- Documon still derives structure exclusively from
 * comments. It exists so an automated writer can be told "you documented 4 of 11 exported
 * things" instead of silently shipping a near-empty manual.
 *
 * @method     scanSymbols
 * @private
 * @param      {string}  source - File contents.
 * @return     {array}          - `{ name, line }` records.
 */
function scanSymbols(source){

	var found  = [];
	var seen   = {};
	var lines  = source.split("\n");

	var patterns = [
		/^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/,
		/^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:function\b|\([^)]*\)\s*=>|[A-Za-z_$][\w$]*\s*=>)/,
		/^\s*(?:export\s+)?class\s+([A-Za-z_$][\w$]*)/,
		/^\s*(?:public|private|protected)?\s*(?:static\s+)?(?:async\s+)?def\s+([A-Za-z_$][\w$]*)/
	];

	for(var i=0; i<lines.length; i++){
		for(var p=0; p<patterns.length; p++){
			var m = lines[i].match(patterns[p]);
			if(m && m[1] && ! seen[ m[1] ]){
				seen[ m[1] ] = true;
				found.push({ name : m[1], line : i + 1 });
				break;
			}
		}
	}

	return found;
}

/**
 * Runs the validator.
 *
 * @method  run
 * @param   {object}  conf         - Documon config (same shape the builder receives).
 * @param   {object}  [opts]       - Options.
 * @param   {boolean} [opts.coverage=false] - Include the undocumented-symbol advisory.
 * @return  {object}               - `{ ok, counts, findings, stats }`.
 * @example
 *
 * 		var report = require("documon").check.run({ src : "./src" }, { coverage : true });
 * 		if(report.counts.error){ process.exit(2); }
 */
function run(conf, opts){

	opts = opts || {};

	var findings = [];
	var files    = collect(conf);

	var ids       = {};   // id -> first location
	var blocks    = [];
	var linkRefs  = [];
	var totalComments = 0;
	var documentedFiles = 0;
	var coverage = null;

	// ------------------------------------------------
	// Pass 1: parse everything, gather ids.
	// ------------------------------------------------
	for(var i=0; i<files.length; i++){

		var file     = files[i];
		var contents;

		try {
			contents = fs.readFileSync(file, 'utf8');
		} catch(e) {
			findings.push( finding("error", "unreadable-file", file, 1,
				"Could not read file: " + e.message) );
			continue;
		}

		var comments = extract(contents, conf.docBegin, conf.docEnd);
		totalComments += comments.length;

		if(comments.length){
			documentedFiles++;
		} else {
			findings.push( finding("info", "no-comments", file, 1,
				"No Documon comment blocks found in this file.",
				"Add a doc comment block with an @module, @class, @method or @property tag.") );
		}

		var currentPackage = null;
		var currentScope   = null;

		for(var c=0; c<comments.length; c++){

			var parsed = parse(comments[c], file);
			if( ! parsed ){
				continue;
			}

			var info = summarize(parsed);
			info.file = file;

			// Package declarations carry forward to later blocks in the same file,
			// which is how tag.js scopes ids.
			if(info.package){
				currentPackage = info.package;
			} else {
				info.package = currentPackage;
			}

			// A @class/@module opens a new scope that later members in the file belong to.
			if(info.kind === "class" || info.kind === "module"){
				currentScope = info.name;
			}
			info.scope = currentScope;

			blocks.push(info);

			var id = blockId(info, currentScope);
			if(id && info.kind){
				if( ids[id] ){
					findings.push( finding("error", "duplicate-id", file, info.line,
						'Duplicate id "' + id + '" -- already declared at '
							+ ids[id].file + ":" + ids[id].line + ". One page will overwrite the other.",
						"Rename one of them, or scope them into different @package values.") );
				} else {
					ids[id] = { file : file, line : info.line };
				}
			}

			// Collect markdown links for the cross-reference rule.
			var linkSource = info.text + "\n" + info.tags.map(function(t){ return t.text || ""; }).join("\n");
			var linkRe = /\[([^\]]*)\]\(([^)\s]+)\)/g;
			var match;
			while( (match = linkRe.exec(linkSource)) !== null ){
				linkRefs.push({ target : match[2], file : file, line : info.line });
			}
		}
	}

	// ------------------------------------------------
	// Pass 2: per-block rules.
	// ------------------------------------------------
	for(var b=0; b<blocks.length; b++){

		var blk = blocks[b];

		// --- unknown / misspelled tags
		for(var t=0; t<blk.tags.length; t++){
			var tag = blk.tags[t];
			if( KNOWN_TAGS.indexOf(tag.flag) === -1 ){
				var suggestion = COMMON_TYPOS[tag.flag];
				findings.push( finding("warning", "unknown-tag", blk.file, blk.line,
					'@' + tag.flag + ' is not a Documon tag and will be ignored.',
					suggestion ? ("Use @" + suggestion + " instead.")
					           : "Remove it, or fold the information into the description. See TAGS.md.") );
			}
		}

		// --- a block that declares nothing produces nothing
		// Note: `package` is inherited from earlier blocks in the same file, so test the
		// package the block declared itself -- otherwise a stray block in a packaged file
		// looks intentional.
		if( ! blk.kind && ! blk.declaredPackage && blk.tags.length ){
			findings.push( finding("warning", "no-kind", blk.file, blk.line,
				"Comment block has tags but no @property, @method, @event, @class or @module -- it will not appear in the output.",
				"Add the tag that says what this is.") );
		}

		// --- named entity with no name
		if(blk.kind && ! blk.name){
			findings.push( finding("error", "missing-name", blk.file, blk.line,
				"@" + blk.kind + " has no name.",
				"Write @" + blk.kind + " someName.") );
		}

		// --- no description
		if(blk.kind && ! blk.text){
			findings.push( finding("info", "no-description", blk.file, blk.line,
				(blk.name || blk.kind) + " has no description text.",
				"Add a sentence above the tags.") );
		}

		// --- params
		var paramSeen = {};
		for(var pi=0; pi<blk.params.length; pi++){

			var prm = blk.params[pi];

			if( ! prm.name ){
				findings.push( finding("warning", "param-no-name", blk.file, blk.line,
					"@param has no name and cannot be rendered.",
					"Write @param {type} name - description.") );
				continue;
			}

			if( paramSeen[prm.name] ){
				findings.push( finding("warning", "duplicate-param", blk.file, blk.line,
					'@param "' + prm.name + '" is declared more than once.') );
			}
			paramSeen[prm.name] = true;

			if( ! prm.type ){
				findings.push( finding("info", "param-no-type", blk.file, blk.line,
					'@param "' + prm.name + '" has no {type}.',
					"Write @param {string} " + prm.name + " - description.") );
			}
		}

		// The templates render parameters for methods and for events with a signature
		// (template/member.jst). On a @class or @module they are parsed but never shown.
		if(blk.params.length && blk.kind && ! blk.takesParams){
			findings.push( finding("warning", "param-on-non-method", blk.file, blk.line,
				"@param used on @" + blk.kind + ". Parameters only render on @method and @event.",
				"Change the kind to @method, or move the parameter list into the description.") );
		}
	}

	// ------------------------------------------------
	// Pass 3: cross-references.
	// ------------------------------------------------
	for(var e=0; e<blocks.length; e++){
		var eb = blocks[e];
		for(var x=0; x<eb.extends.length; x++){
			var ext = eb.extends[x];
			if( ! ids[ext.target] ){
				findings.push( finding("error", "unresolved-inheritance", eb.file, ext.line,
					'@' + ext.flag + ' "' + ext.target + '" does not match any documented id.',
					"Use the fully qualified id (package.Class), or document the parent.") );
			}
		}
	}

	for(var l=0; l<linkRefs.length; l++){
		var ref = linkRefs[l];
		var target = ref.target;

		// Skip real URLs, anchors, and file paths.
		if( /^(https?:|mailto:|#|\.|\/)/.test(target) || target.indexOf(".html") > -1 ){
			continue;
		}

		// Documon cross-links look like dotted ids.
		if( target.indexOf(".") > -1 && ! ids[target] ){
			findings.push( finding("warning", "broken-link", ref.file, ref.line,
				'Cross-reference "' + target + '" does not match any documented id.',
				"Check the id, or use a full URL.") );
		}
	}

	// ------------------------------------------------
	// Pass 4: coverage advisory (opt-in, never affects output).
	// ------------------------------------------------
	if(opts.coverage){

		var documented = {};
		for(var d=0; d<blocks.length; d++){
			if(blocks[d].name){
				documented[ blocks[d].name ] = true;
			}
		}

		var symbols = 0;
		var missing = 0;

		for(var s=0; s<files.length; s++){
			var body;
			try {
				body = fs.readFileSync(files[s], 'utf8');
			} catch(err) {
				continue;
			}
			var syms = scanSymbols(body);
			for(var y=0; y<syms.length; y++){
				symbols++;
				if( ! documented[ syms[y].name ] ){
					missing++;
					findings.push( finding("info", "undocumented-symbol", files[s], syms[y].line,
						'"' + syms[y].name + '" has no matching documentation block.',
						"Add a doc comment with @method " + syms[y].name + ", or ignore if intentionally internal.") );
				}
			}
		}

		coverage = {
			symbols     : symbols,
			documented  : symbols - missing,
			undocumented: missing,
			percent     : symbols ? Math.round(((symbols - missing) / symbols) * 100) : 100
		};
	}

	// ------------------------------------------------
	// Tally.
	// ------------------------------------------------
	var counts = { error : 0, warning : 0, info : 0 };
	for(var f2=0; f2<findings.length; f2++){
		counts[ findings[f2].level ]++;
	}

	if( ! files.length ){
		findings.push( finding("error", "no-files", String(conf.src), 1,
			"No source files matched. Nothing to check.",
			"Check the -i path and -e extensions.") );
		counts.error++;
	}

	return {
		ok       : counts.error === 0,
		generator: "documon",
		counts   : counts,
		stats    : {
			files      : files.length,
			filesWithComments : documentedFiles,
			comments   : totalComments,
			entities   : Object.keys(ids).length
		},
		coverage : coverage,
		findings : findings
	};
}

/**
 * Prints a report for humans.
 *
 * @method  print
 * @param   {object}    report - The result of `run()`.
 * @param   {function}  log    - The logger.
 */
function print(report, log){

	var order = { error : 0, warning : 1, info : 2 };
	var sorted = report.findings.slice().sort(function(a, b){
		return order[a.level] - order[b.level];
	});

	if(sorted.length){
		log(null, "Findings", false);
		for(var i=0; i<sorted.length; i++){
			var f = sorted[i];
			log(f.level.toUpperCase() + "  " + f.file + ":" + f.line
				+ "\n      [" + f.rule + "] " + f.message
				+ (f.fix ? "\n      fix: " + f.fix : ""), null, false);
		}
	}

	var summary = {
		files    : report.stats.files,
		comments : report.stats.comments,
		entities : report.stats.entities,
		errors   : report.counts.error,
		warnings : report.counts.warning,
		info     : report.counts.info
	};

	if(report.coverage){
		summary.coverage = report.coverage.documented + "/" + report.coverage.symbols
			+ " (" + report.coverage.percent + "%)";
	}

	log(summary, "Summary", false);
	log(report.ok ? "PASS" : "FAIL", null, false);
}

module.exports = {
	run        : run,
	print      : print,
	KNOWN_TAGS : KNOWN_TAGS,
	KIND_TAGS  : KIND_TAGS
};
