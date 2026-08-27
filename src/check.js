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
var aliases = require('./aliases');
var more    = require('./more');

/**
 * @property {array} KIND_TAGS - Tags that declare what an entity *is*. A comment block
 * needs one of these to become anything at all.
 */
var KIND_TAGS = ["property", "method", "event", "class", "module", "package", "namespace"];

/**
 * @property {array} EXTENDISH - Tags whose value must resolve to another documented id.
 */
var EXTENDISH = ["overrides", "implements", "extends", "inherits"];

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

	// Tags with a real meaning that Documon deliberately does not alias, because the
	// meaning is not the same. Suggesting a "fix" here would produce wrong documentation,
	// so the guidance explains the difference instead.
	  "fires"       : null
	, "emits"       : null
	, "memberof"    : null
	, "typedef"     : null
	, "callback"    : null
	, "enum"        : null
	, "inheritdoc"  : null
	, "async"       : null
	, "abstract"    : null
	, "virtual"     : null
	, "generator"   : null
	, "global"      : null
	, "inner"       : null
	, "instance"    : null
	, "mixes"       : null
	, "mixin"       : null
	, "ignore"      : null
	, "hideconstructor" : null
};

/**
 * @property {object} TAG_NOTES - Extra guidance for tags that look like they should work
 * but genuinely have no Documon equivalent.
 */
var TAG_NOTES = {
	  "impliments" : "@impliments was Documon's own misspelling and was retired in v3.0.0. Rename it to @implements."
	, "fires"      : "@fires documents which event a method emits; @event declares the event itself. Document the event separately with @event and mention it in the description."
	, "emits"      : "@emits documents which event a method emits; @event declares the event itself. Document the event separately with @event and mention it in the description."
	, "memberof"   : "Documon scopes by @package plus the enclosing @class/@module, not by @memberof."
	, "typedef"    : "Documon has no type registry. Describe the shape in the description, or document it as a @class."
	, "callback"   : "Document the callback as a @method, or describe its signature in the @param description."
	, "enum"       : "Document each value as a @property, or describe them in the description."
	, "inheritdoc" : "Use @extends or @inherits; Documon cross-fills inherited members automatically."
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
 * Lists the ids of the prose pages the "more" folder will produce.
 *
 * Those pages are real link targets (`[the options](more.options)`), but they come
 * from markdown, not comments, so the cross-reference pass has no way to know they
 * exist. Without this, every link into the manual reads as broken.
 *
 * @method  moreIds
 * @private
 * @param   {object} conf - The resolved configuration.
 * @return  {object} A map of id -> true. Empty when no more folder is configured.
 */
function moreIds(conf){

	var found = {};

	if( ! conf.more ){
		return found;
	}

	var folder = path.normalize( path.resolve(conf.more) );

	if( ! du.exists(folder) ){
		return found;
	}

	var files = du.readExt(folder, ["md"], true);

	for(var i=0; i<files.length; i++){

		var relative = path.normalize(files[i]).substring(folder.length).replace(/^\/+/, "");

		if( ! relative ){
			continue;
		}

		var id = more.pageId(relative, conf.moreQuirkDelimiter);
		found[id] = true;

		// Folders are pages too, so register every ancestor: "more.tags" as well
		// as "more.tags._implements_md".
		var parts = id.split(".");
		while(parts.length > 1){
			parts.pop();
			found[ parts.join(".") ] = true;
		}
	}

	return found;
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
				// class.jst hands a @class or @module to member.jst as a "methods"
				// part, so those pages render a signature, a parameter table and
				// a returns block just like a method does.
				if(flag === "method" || flag === "event" || flag === "class" || flag === "module"){
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
 * Resolves an inheritance target the way the builder does.
 *
 * `organizer.js:applyInheritance()` accepts a bare class name for a parent in the same
 * package -- `@extends Base` inside `@package demo` means `demo.Base` -- and the manual
 * teaches that short form. The validator used to compare the written target against the
 * fully qualified ids only, so the documented short form was reported as an
 * `unresolved-inheritance` **error** on input that built perfectly. That broke the
 * `documon --check && documon` recipe for anyone who followed the docs.
 *
 * The rule mirrors the builder exactly: a target with no dot at all is qualified with the
 * block's package. A dotted target is already an id and is looked up as written.
 *
 * @method     resolveExtends
 * @private
 * @param      {string}  target  - The `@extends` / `@inherits` / `@implements` value as written.
 * @param      {string}  [pkg]   - The package the declaring block belongs to.
 * @param      {object}  ids     - The map of documented ids.
 * @return     {string}          - The id it resolves to, or null.
 */
function resolveExtends(target, pkg, ids){

	if( ! target ){
		return null;
	}

	if( ids[target] ){
		return target;
	}

	if( target.indexOf(".") < 0 && pkg ){
		var qualified = pkg + "." + target;
		if( ids[qualified] ){
			return qualified;
		}
	}

	return null;
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

			// Collect markdown links for the cross-reference rule. @example content is
			// code, not prose -- it routinely contains illustrative ids that were never
			// meant to resolve -- so it is excluded.
			var linkSource = info.text + "\n" + info.tags.filter(function(t){
				return t.flag !== "example";
			}).map(function(t){ return t.text || ""; }).join("\n");
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

		// --- unknown tags, and tags we accepted under a different spelling
		for(var t=0; t<blk.tags.length; t++){

			var tag = blk.tags[t];

			// parseFlag resolves aliases, recording what was actually written. Report it
			// so the author can converge on one spelling if they want to -- but at info
			// level, because the documentation built correctly either way.
			if(tag.writtenFlag && tag.writtenFlag !== tag.flag){
				findings.push( finding("info", "normalized-tag", blk.file, blk.line,
					'@' + tag.writtenFlag + ' was read as @' + tag.flag + '.',
					"Write @" + tag.flag + " to match the rest of Documon.") );
				continue;
			}

			// A retired spelling used to work, so silence would look like success.
			var replacement = aliases.deprecatedFor(tag.flag);
			if(replacement){
				findings.push( finding("error", "retired-tag", blk.file, blk.line,
					'@' + tag.flag + ' was retired in v3.0.0 and is no longer read.',
					"Rename it to @" + replacement + ".") );
				continue;
			}

			if( KNOWN_TAGS.indexOf(tag.flag) === -1 ){
				var note = TAG_NOTES[ String(tag.flag).toLowerCase() ];
				var suggestion = COMMON_TYPOS[ String(tag.flag).toLowerCase() ];
				findings.push( finding("warning", "unknown-tag", blk.file, blk.line,
					'@' + tag.flag + ' is not a Documon tag and will be ignored.',
					note ? note
					     : (suggestion ? ("Use @" + suggestion + " instead.")
					                   : "Remove it, or fold the information into the description. See TAGS.md.")) );
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

		// template/member.jst renders parameters for methods, for events with a
		// signature, and for the @class or @module that heads a page (class.jst
		// routes it through the same "methods" part). On any other kind they are
		// parsed and then dropped.
		if(blk.params.length && blk.kind && ! blk.takesParams){
			findings.push( finding("warning", "param-on-non-method", blk.file, blk.line,
				"@param used on @" + blk.kind + ". Parameters only render on @method, @event, @class and @module.",
				"Change the kind, or move the parameter list into the description.") );
		}
	}

	// ------------------------------------------------
	// Pass 3: cross-references.
	// ------------------------------------------------
	for(var e=0; e<blocks.length; e++){
		var eb = blocks[e];
		for(var x=0; x<eb.extends.length; x++){
			var ext = eb.extends[x];
			if( ! resolveExtends(ext.target, eb.package, ids) ){
				findings.push( finding("error", "unresolved-inheritance", eb.file, ext.line,
					'@' + ext.flag + ' "' + ext.target + '" does not match any documented id.',
					"Use the fully qualified id (package.Class), or document the parent.") );
			}
		}
	}

	// Prose pages are link targets too, but they come from markdown rather than
	// comments, so they are not in `ids`.
	var prose = moreIds(conf);

	for(var l=0; l<linkRefs.length; l++){
		var ref = linkRefs[l];
		var target = ref.target;

		// Skip real URLs, anchors, and file paths.
		if( /^(https?:|mailto:|#|\.|\/)/.test(target) || target.indexOf(".html") > -1 ){
			continue;
		}

		// Documon cross-links look like dotted ids.
		if( target.indexOf(".") > -1 && ! ids[target] && ! prose[target] ){
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
