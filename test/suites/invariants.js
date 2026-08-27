/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Guards the project's hard constraints -- the rules that are not visible in any one
 * function, and that a reasonable-looking change quietly breaks.
 *
 * Each of these has already gone wrong at least once:
 *
 * - **Zero runtime dependencies.** The 2.6.1 release existed solely to fix a
 *   `require("showdown")` that should have been `require("./showdown.min.js")`.
 * - **Nothing is inferred from source code.** Structure, membership and inheritance come
 *   only from comment tags. The one deliberate exception is `--check --coverage`, which
 *   must stay advisory.
 * - **Documentation in three places.** A flag lives in `more/104.Options.md`, in the
 *   usage string in `src/info.js`, and -- where it affects tag syntax -- in `TAGS.md`.
 *
 * @module  suites/invariants
 * @package test
 */

var path = require('path');
var fs   = require('fs');

exports.name = "invariants: the hard constraints";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	// ------------------------------------------------------------------
	t.section("invariants: zero runtime dependencies");
	// ------------------------------------------------------------------
	/**
	 * @property {array} VENDORED - Third-party code that lives in the repository rather
	 * than in node_modules. A require of one of these is a relative path, not a package.
	 */
	var VENDORED = ["showdown.min.js", "minimist.js", "opn.js", "npath.js", "upath.js"];

	/**
	 * Removes comments, so a `require` shown in an @example is not mistaken for a real
	 * one. Several modules document their own usage with `require("documon")`.
	 *
	 * @method  stripComments
	 * @private
	 * @param   {string} body - Source text.
	 * @return  {string}      - The same source with comments blanked out.
	 */
	function stripComments(body){
		return body
			.replace(/\/\*[\s\S]*?\*\//g, "")
			.replace(/^[ \t]*\/\/.*$/gm, "");
	}

	var srcFiles = fs.readdirSync(t.SRC).filter(function(f){ return /\.js$/.test(f); });
	t.ok(srcFiles.length > 10, "found the source files to scan", JSON.stringify(srcFiles.length));

	var offenders = [];

	for(var i=0; i<srcFiles.length; i++){

		// The vendored files are third-party; they are not held to Documon's own rules.
		if( VENDORED.indexOf(srcFiles[i]) > -1 ){
			continue;
		}

		var body     = stripComments( t.read( path.join(t.SRC, srcFiles[i]) ) );
		var requires = body.match(/require\s*\(\s*["'][^"']+["']\s*\)/g) || [];

		for(var r=0; r<requires.length; r++){

			var target = requires[r].match(/["']([^"']+)["']/)[1];

			// A relative path is our own code or a vendored file. A bare specifier is a
			// package -- unless it is a Node built-in.
			if( target.charAt(0) === "." || target.charAt(0) === "/" ){
				continue;
			}

			if( ["fs", "path", "os", "child_process", "util", "url", "events", "http",
				"https", "assert", "crypto", "stream", "zlib", "readline"].indexOf(target) > -1 ){
				continue;
			}

			offenders.push(srcFiles[i] + " requires " + target);
		}
	}

	t.ok(offenders.length === 0,
		"no file in src/ requires an npm package -- this is what 2.6.1 was released to fix",
		JSON.stringify(offenders));

	// The same rule applies to the CLI entry point.
	var indexRequires = (stripComments( t.read(path.join(t.ROOT, "index.js")) )
		.match(/require\s*\(\s*["'][^"']+["']\s*\)/g) || [])
		.map(function(x){ return x.match(/["']([^"']+)["']/)[1]; })
		.filter(function(x){
			return x.charAt(0) !== "." && x.charAt(0) !== "/"
				&& ["fs", "path", "os", "child_process", "util"].indexOf(x) === -1;
		});
	t.ok(indexRequires.length === 0, "and neither does index.js",
		JSON.stringify(indexRequires));

	// package.json must agree.
	var pkg = t.readJson(path.join(t.ROOT, "package.json"));
	t.ok( ! pkg.dependencies || Object.keys(pkg.dependencies).length === 0,
		"package.json declares no runtime dependencies",
		JSON.stringify(pkg.dependencies));
	t.ok( ! pkg.peerDependencies || Object.keys(pkg.peerDependencies).length === 0,
		"nor any peer dependencies", JSON.stringify(pkg.peerDependencies));

	// The vendored files have to actually be there, or the relative requires break.
	for(var v=0; v<VENDORED.length; v++){
		t.ok(fs.existsSync(path.join(t.SRC, VENDORED[v])),
			VENDORED[v] + " is vendored in src/");
	}

	// ------------------------------------------------------------------
	t.section("invariants: nothing is inferred from source code");
	// ------------------------------------------------------------------
	// Structure, membership and inheritance come only from comment tags. Code inference
	// in the render path would make the output depend on the language being parseable,
	// which is the opposite of what Documon is for.
	var codeOnly = t.project({
		src : {
			"code.js" : [
				"function realFunction(a, b){ return a + b; }",
				"var realVariable = 42;",
				"const anotherOne = () => {};",
				"class RealClass {",
				"    realMethod(){ return 1; }",
				"    get realGetter(){ return 2; }",
				"}",
				"module.exports = { realFunction : realFunction, RealClass : RealClass };"
			].join("\n")
		}
	});

	t.cli(["-i", codeOnly.src, "-o", codeOnly.out, "-n", "CodeOnly"], codeOnly.dir);
	var model     = t.readJson(path.join(codeOnly.out, "docs", "model.json"));
	var serialized = JSON.stringify(model);

	var members = model.pages.reduce(function(acc, p){ return acc.concat(p.members); }, []);
	t.ok(members.length === 0, "uncommented code produces no members at all",
		JSON.stringify(members.map(function(m){ return m.name; })));

	var symbols = ["realFunction", "realVariable", "anotherOne", "RealClass",
		"realMethod", "realGetter"];
	for(var s=0; s<symbols.length; s++){
		t.ok(serialized.indexOf(symbols[s]) === -1,
			"'" + symbols[s] + "' is not picked up from the code");
	}

	// A partly documented file documents only what was tagged.
	var partial = t.project({
		src : {
			"p.js" : [
				t.OPEN, " * A module.", " * @module p", " * @package app", " " + t.CLOSE,
				"function undocumentedOne(){}",
				"",
				t.OPEN, " * Documented.", " * @method documentedOne", " " + t.CLOSE,
				"function documentedOne(){}",
				"function undocumentedTwo(){}"
			].join("\n")
		}
	});

	t.cli(["-i", partial.src, "-o", partial.out, "-n", "P"], partial.dir);
	var partialModel = JSON.stringify(t.readJson(path.join(partial.out, "docs", "model.json")));
	t.ok(partialModel.indexOf("documentedOne") > -1, "a tagged symbol is documented");
	t.ok(partialModel.indexOf("undocumentedOne") === -1,
		"an untagged symbol above it is not");
	t.ok(partialModel.indexOf("undocumentedTwo") === -1,
		"and neither is one below it");

	// Inheritance is not inferred either -- a real `extends` in code means nothing.
	var codeExtends = t.project({
		src : {
			"e.js" : [
				t.OPEN, " * The parent.", " * @class Base", " * @package app", " " + t.CLOSE,
				"class Base { inheritMe(){} }",
				"",
				t.OPEN, " * The child, with no @extends tag.", " * @class Child",
				" * @package app", " " + t.CLOSE,
				"class Child extends Base {}"
			].join("\n")
		}
	});

	t.cli(["-i", codeExtends.src, "-o", codeExtends.out, "-n", "E"], codeExtends.dir);
	var childPage = t.readJson(path.join(codeExtends.out, "docs", "model.json"))
		.pages.filter(function(p){ return p.id === "app.Child"; })[0];
	t.ok(childPage && (childPage.members || []).length === 0,
		"a real `extends` in code cross-fills nothing without an @extends tag",
		childPage && JSON.stringify((childPage.members || []).map(function(m){ return m.name; })));

	// The coverage advisory is the one deliberate exception, and it must stay advisory.
	var advisory = t.cli(["--check", "--coverage", "--json", "-i", codeOnly.src], codeOnly.dir);
	var advisoryReport = JSON.parse(advisory.stdout);
	var advisories = t.findings(advisoryReport, "undocumented-symbol");

	t.ok(advisories.length > 0, "--check --coverage does see the undocumented symbols",
		JSON.stringify(advisories.length));
	t.ok(advisories.every(function(f){ return f.level === "info"; }),
		"but reports them only as information",
		JSON.stringify(advisories.map(function(f){ return f.level; })));
	t.ok(t.cli(["--check", "--coverage", "-i", codeOnly.src], codeOnly.dir).status
			=== t.cli(["--check", "-i", codeOnly.src], codeOnly.dir).status,
		"and never changes the outcome");

	// ------------------------------------------------------------------
	t.section("invariants: a flag is documented everywhere it has to be");
	// ------------------------------------------------------------------
	var optionsDoc = t.read(path.join(t.ROOT, "more", "104.Options.md"));
	var usage      = t.src("info").usage;
	var indexSrc   = t.read(path.join(t.ROOT, "index.js"));

	var longMatch  = indexSrc.match(/LONG\s*=\s*\{([\s\S]*?)\}/);
	var flags      = [];

	if(longMatch){
		var pairs = longMatch[1].match(/(\w)\s*:\s*"(\w+)"/g) || [];
		for(var f=0; f<pairs.length; f++){
			var parts = pairs[f].match(/(\w)\s*:\s*"(\w+)"/);
			flags.push({ short : parts[1], long : parts[2] });
		}
	}

	t.ok(flags.length > 5, "the flag table was found in index.js", JSON.stringify(flags.length));

	var missingFromDoc = flags.filter(function(fl){
		return optionsDoc.indexOf("--" + fl.long) === -1 && optionsDoc.indexOf(fl.long) === -1;
	});
	t.ok(missingFromDoc.length === 0, "every flag appears in more/104.Options.md",
		JSON.stringify(missingFromDoc));

	var missingFromUsage = flags.filter(function(fl){
		return usage.indexOf("--" + fl.long) === -1 && usage.indexOf("-" + fl.short) === -1;
	});
	t.ok(missingFromUsage.length === 0, "every flag appears in the usage string in src/info.js",
		JSON.stringify(missingFromUsage));

	// The long-only options travel the same route.
	var onlyMatch = indexSrc.match(/LONG_ONLY\s*=\s*\[([\s\S]*?)\]/);
	var longOnly  = onlyMatch
		? (onlyMatch[1].match(/"(\w+)"/g) || []).map(function(x){ return x.replace(/"/g, ""); })
		: [];

	t.ok(longOnly.length > 0, "the long-only option list was found", JSON.stringify(longOnly));

	var longOnlyMissing = longOnly.filter(function(name){
		return optionsDoc.indexOf(name) === -1;
	});
	t.ok(longOnlyMissing.length === 0, "every long-only option appears in more/104.Options.md",
		JSON.stringify(longOnlyMissing));

	var longOnlyMissingUsage = longOnly.filter(function(name){
		return usage.indexOf(name) === -1;
	});
	t.ok(longOnlyMissingUsage.length === 0,
		"every long-only option appears in the usage string in src/info.js",
		JSON.stringify(longOnlyMissingUsage));

	// ------------------------------------------------------------------
	t.section("invariants: every tag Documon acts on is documented");
	// ------------------------------------------------------------------
	var check    = t.src("check");
	var tagsDoc  = t.read(path.join(t.ROOT, "TAGS.md"));

	t.ok(Array.isArray(check.KNOWN_TAGS) && check.KNOWN_TAGS.length > 10,
		"check.js exports the known tag list", JSON.stringify(check.KNOWN_TAGS.length));

	var undocumentedTags = check.KNOWN_TAGS.filter(function(tag){
		return tagsDoc.indexOf("@" + tag) === -1;
	});
	t.ok(undocumentedTags.length === 0, "every known tag appears in TAGS.md",
		JSON.stringify(undocumentedTags));

	// And the reverse: a tag the docs promise must actually be implemented, or the
	// reader writes it and gets nothing.
	var promised = (tagsDoc.match(/`@(\w+)`/g) || [])
		.map(function(x){ return x.replace(/[`@]/g, ""); });

	var aliases = t.src("aliases");
	var unimplemented = promised.filter(function(tag){
		if( check.KNOWN_TAGS.indexOf(tag) > -1 ){ return false; }
		if( aliases.resolve(tag) !== tag ){ return false; }          // it is an alias
		if( aliases.isDescription(tag) ){ return false; }            // folds into the description
		if( aliases.metaLabel(tag) ){ return false; }                // collected as metadata
		if( aliases.deprecatedFor(tag) ){ return false; }            // documented as retired
		if( tag === "access" ){ return false; }                      // becomes a visibility flag
		if( tag === "tag" ){ return false; }                         // the prose placeholder "@tag"
		if( /^(fires|emits|memberof|typedef|callback|enum|inheritdoc|async|abstract|global|inner|mixin|virtual|generator|instance|mixes|ignore|hideconstructor|const|constant|file)$/.test(tag) ){
			return false;                                            // documented as NOT supported
		}
		return true;
	});

	t.ok(unimplemented.length === 0,
		"every tag TAGS.md presents as usable is actually implemented",
		JSON.stringify(unimplemented));

	// ------------------------------------------------------------------
	t.section("invariants: generated folders are not hand-edited");
	// ------------------------------------------------------------------
	// docs/ is emptied on every build, so anything hand-written there is lost. The
	// checked-in docs folder should therefore look generated.
	var docsDir = path.join(t.ROOT, "docs");
	if(fs.existsSync(docsDir)){
		t.ok(fs.existsSync(path.join(docsDir, "index.html")),
			"the checked-in docs folder looks like Documon output");
		t.ok(fs.existsSync(path.join(docsDir, "_menuData.js")),
			"including the generated menu data");
	} else {
		t.ok(true, "no checked-in docs folder to verify");
	}

	// ------------------------------------------------------------------
	t.section("invariants: documon checks itself");
	// ------------------------------------------------------------------
	// Run from the package root on purpose, so this uses the repository's own
	// documon.json -- the same configuration `npm run check` uses, which is what excludes
	// the vendored showdown build from the scan.
	var self = t.check(["-i", t.SRC], t.ROOT);
	t.ok(self.report.counts.error === 0, "documon's own source has no check errors",
		JSON.stringify(self.report.findings.filter(function(f){ return f.level === "error"; })));
	t.ok(self.report.counts.warning === 0, "and no warnings either",
		JSON.stringify(self.report.findings.filter(function(f){ return f.level === "warning"; })));

	// The suite is documented the same way the source is, so it should pass too. The
	// fixtures are deliberately broken and are excluded.
	var selfTests = t.check(["-i", path.join(t.ROOT, "test"), "-g", "fixtures"], t.ROOT);
	t.ok(selfTests.report.counts.error === 0, "and neither does the test suite",
		JSON.stringify(selfTests.report.findings.filter(function(f){ return f.level === "error"; })));
};
