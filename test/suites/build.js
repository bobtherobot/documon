/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers a whole build, end to end.
 *
 * Verification for Documon is empirical -- build, then look at what landed on disk -- so
 * this suite runs the real CLI and inspects the real output folder rather than mocking
 * anything.
 *
 * @module  suites/build
 * @package test
 */

var path = require('path');
var fs   = require('fs');

exports.name = "build: end to end";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	// ------------------------------------------------------------------
	t.section("build: the output folder");
	// ------------------------------------------------------------------
	// Requiring the caller to pre-create the output folder was the single biggest
	// first-run failure for scripted callers.
	var out = path.join(t.tmp(), "nested", "docs-here");
	var built = t.cli(["-i", t.FIXTURES, "-o", out, "-n", "Fixture", "-v", "9.9"]);

	t.ok(built.status === 0, "exits 0 on a successful build", "got " + built.status
		+ "\n" + built.stdout.slice(-400));
	t.ok(fs.existsSync(out), "created the missing output folder, parents and all");

	var docs = path.join(out, "docs");
	t.ok(fs.existsSync(path.join(docs, "index.html")), "wrote index.html");
	t.ok(fs.existsSync(path.join(docs, "_menuData.js")), "wrote the menu data");
	t.ok(fs.existsSync(path.join(docs, "_searchData.js")), "wrote the search data");
	t.ok(fs.existsSync(path.join(docs, "assets")), "copied the template assets",
		JSON.stringify(fs.readdirSync(docs)));

	// The search index ships as a plain file -- no server, no database.
	var searchData = t.read(path.join(docs, "_searchData.js"));
	t.ok(searchData.length > 0, "the search data has content");
	t.ok(/fixture/.test(searchData), "and mentions the documented package",
		searchData.slice(0, 200));

	// ------------------------------------------------------------------
	t.section("build: the output folder is emptied first");
	// ------------------------------------------------------------------
	// Both the docs folder and the site folder are generated and emptied on every build,
	// so a page that no longer exists must not linger.
	var stale = path.join(docs, "stale.html");
	t.write(stale, "<html>old</html>");
	t.ok(fs.existsSync(stale), "a stale file exists before the rebuild");

	t.cli(["-i", t.FIXTURES, "-o", out, "-n", "Fixture"]);
	t.ok( ! fs.existsSync(stale), "a rebuild removes files that are no longer generated");
	t.ok(fs.existsSync(path.join(docs, "index.html")), "while still writing the new ones");

	// ------------------------------------------------------------------
	t.section("build: pages and their contents");
	// ------------------------------------------------------------------
	var proj = t.project({
		src : {
			"widget.js" : [
				t.OPEN,
				" * A widget class.",
				" * @class   Widget",
				" * @package app",
				" " + t.CLOSE,
				"function Widget(){}",
				"",
				t.OPEN,
				" * Does the thing.",
				" * @method  doIt",
				" * @param   {string} name - What to do it to.",
				" * @return  {number} - How many times.",
				" " + t.CLOSE,
				"",
				t.OPEN,
				" * The running total.",
				" * @property {number} total=0",
				" " + t.CLOSE,
				"",
				t.OPEN,
				" * Fired whenever it changes.",
				" * @event change",
				" " + t.CLOSE
			]
		}
	});

	var projBuild = t.cli(["-i", proj.src, "-o", proj.out, "-n", "Proj"], proj.dir);
	var projDocs  = path.join(proj.out, "docs");

	t.ok(projBuild.status === 0, "the project builds", "exit " + projBuild.status
		+ "\n" + projBuild.stdout.slice(-400));

	t.ok(fs.existsSync(path.join(projDocs, "app.Widget.html")),
		"a class gets a page named for its id",
		JSON.stringify(fs.readdirSync(projDocs)));
	t.ok(fs.existsSync(path.join(projDocs, "app.html")), "and its package gets one too");

	var widgetPage = t.read(path.join(projDocs, "app.Widget.html"));
	t.ok(/Widget/.test(widgetPage), "the class name renders");
	t.ok(/A widget class\./.test(widgetPage), "the description renders");
	t.ok(/doIt/.test(widgetPage), "the method renders");
	t.ok(/total/.test(widgetPage), "the property renders");
	t.ok(/change/.test(widgetPage), "the event renders");
	t.ok(/name/.test(widgetPage), "the parameter renders");
	t.ok(widgetPage.indexOf("@method") === -1, "and no raw tags leak into the HTML",
		(widgetPage.match(/@[a-z]+/g) || []).slice(0, 5).join(" "));

	// ------------------------------------------------------------------
	t.section("build: inheritance across files");
	// ------------------------------------------------------------------
	var inh = t.project({
		src : {
			"base.js"  : [
				t.OPEN, " * The parent.", " * @class Base", " * @package app", " " + t.CLOSE, "",
				t.OPEN, " * Inherited.", " * @method shared", " " + t.CLOSE
			].join("\n"),
			"child.js" : [
				t.OPEN, " * The child.", " * @class Child", " * @package app",
				" * @extends app.Base", " " + t.CLOSE, "",
				t.OPEN, " * Its own.", " * @method extra", " " + t.CLOSE
			].join("\n")
		}
	});

	t.cli(["-i", inh.src, "-o", inh.out, "-n", "Inh"], inh.dir);
	var inhModel = t.readJson(path.join(inh.out, "docs", "model.json"));
	var childPage = inhModel.pages.filter(function(p){ return p.id === "app.Child"; })[0];

	t.ok(childPage !== undefined, "the child class has a page",
		JSON.stringify(inhModel.pages.map(function(p){ return p.id; })));
	var childMembers = (childPage.members || []).map(function(m){ return m.name; }).sort();
	t.ok(childMembers.join(",") === "extra,shared",
		"and carries the inherited member alongside its own",
		JSON.stringify(childMembers));

	var sharedOnChild = (childPage.members || []).filter(function(m){ return m.name === "shared"; })[0];
	t.ok(sharedOnChild && sharedOnChild.inherited === "app.Base",
		"which is marked as inherited in model.json",
		JSON.stringify(sharedOnChild && sharedOnChild.inherited));

	// ------------------------------------------------------------------
	t.section("build: a file's package carries to later classes");
	// ------------------------------------------------------------------
	var scope = t.project({
		src : {
			"multi.js" : [
				t.OPEN, " * First.", " * @module first", " * @package app", " " + t.CLOSE, "",
				t.OPEN, " * Second class in the same file.", " * @class Second", " " + t.CLOSE,
				"function Second(){}", "",
				t.OPEN, " * Third, explicitly in another package.", " * @class Third",
				" * @package other", " " + t.CLOSE,
				"function Third(){}", "",
				t.OPEN, " * Fourth, back to the inherited package.", " * @class Fourth", " " + t.CLOSE,
				"function Fourth(){}"
			].join("\n")
		}
	});

	t.cli(["-i", scope.src, "-o", scope.out, "-n", "Scope"], scope.dir);
	var scopeIds = t.readJson(path.join(scope.out, "docs", "model.json"))
		.pages.map(function(p){ return p.id; });

	t.ok(scopeIds.indexOf("app.Second") > -1, "a later class inherits the file's @package",
		scopeIds.join(", "));
	t.ok(scopeIds.indexOf("root.Second") === -1, "and no longer falls back to root");
	t.ok(scopeIds.indexOf("other.Third") > -1, "an explicit @package still wins", scopeIds.join(", "));
	t.ok(scopeIds.indexOf("other.Fourth") > -1, "and becomes the package for what follows",
		scopeIds.join(", "));

	// ------------------------------------------------------------------
	t.section("build: qualified ids are not re-parented");
	// ------------------------------------------------------------------
	var qual = t.project({
		src : {
			"q.js" : [
				t.OPEN, " * The parent.", " * @class Base", " * @package app", " " + t.CLOSE,
				"function Base(){}", "",
				t.OPEN, " * The child.", " * @class Child", " * @package app",
				" * @extends app.Base", " " + t.CLOSE,
				"function Child(){}", "",
				t.OPEN, " * Nested params still nest.", " * @method configure",
				" * @param {object} opts - Options.",
				" * @param {number} opts.timeout - How long.", " " + t.CLOSE,
				"function configure(opts){}"
			].join("\n")
		}
	});

	t.cli(["-i", qual.src, "-o", qual.out, "-n", "Q"], qual.dir);
	var qModel = t.readJson(path.join(qual.out, "docs", "model.json"));

	t.ok(qModel.pages.filter(function(p){ return p.id === "app.Child"; })[0] !== undefined,
		"the child class is in the right package",
		qModel.pages.map(function(p){ return p.id; }).join(", "));

	// Nested params must still nest -- that is what the dot means on @param.
	var confMethod = qModel.pages.reduce(function(acc, p){ return acc.concat(p.members); }, [])
		.filter(function(m){ return m.name === "configure"; })[0];
	t.ok(confMethod && confMethod.params.length === 1,
		"@param opts.timeout still nests under opts rather than becoming a sibling",
		confMethod && JSON.stringify(confMethod.params.map(function(p){ return p.name; })));

	// ------------------------------------------------------------------
	t.section("build: warns about ignored tags");
	// ------------------------------------------------------------------
	var warned = t.cli(["-i", path.join(t.FIXTURES, "jsdoc.js"), "-o", path.join(t.tmp(), "w"),
		"-n", "Geo", "-p"], t.FIXTURES);
	t.ok(/unrecognized tag/.test(warned.stdout), "build reports ignored tags in its summary",
		warned.stdout.slice(-300));
	t.ok(/--check/.test(warned.stdout), "and points at --check");

	// A clean build should not cry wolf.
	var quietBuild = t.cli(["-i", path.join(t.FIXTURES, "good.js"),
		"-o", path.join(t.tmp(), "q"), "-n", "Good", "-p"], t.FIXTURES);
	t.ok( ! /unrecognized tag/.test(quietBuild.stdout),
		"a clean build reports no ignored tags", quietBuild.stdout.slice(-300));

	// ------------------------------------------------------------------
	t.section("build: nothing is inferred from code");
	// ------------------------------------------------------------------
	// Structure, membership and inheritance come only from comment tags. A file full of
	// real code and no comments must produce no entities at all.
	var codeOnly = t.project({
		src : {
			"code.js" : [
				"function realFunction(a, b){ return a + b; }",
				"var realVariable = 42;",
				"class RealClass { realMethod(){} }",
				"module.exports = { realFunction : realFunction };"
			].join("\n")
		}
	});

	t.cli(["-i", codeOnly.src, "-o", codeOnly.out, "-n", "CodeOnly"], codeOnly.dir);
	var codeModel = t.readJson(path.join(codeOnly.out, "docs", "model.json"));
	var codeMembers = codeModel.pages.reduce(function(acc, p){ return acc.concat(p.members); }, []);

	t.ok(codeMembers.length === 0, "uncommented code produces no members",
		JSON.stringify(codeMembers.map(function(m){ return m.name; })));

	var codeNames = JSON.stringify(codeModel);
	t.ok(codeNames.indexOf("realFunction") === -1, "no function name is picked up from code");
	t.ok(codeNames.indexOf("RealClass") === -1, "no class name is picked up from code");
	t.ok(codeNames.indexOf("realVariable") === -1, "no variable name is picked up from code");

	// ------------------------------------------------------------------
	t.section("build: an empty project");
	// ------------------------------------------------------------------
	var emptyProj = t.project({ src : {} });
	var emptyBuild = t.cli(["-i", emptyProj.src, "-o", emptyProj.out, "-n", "Empty", "-p"],
		emptyProj.dir);

	t.ok( ! /at .*\.js:\d+/.test(emptyBuild.stdout + emptyBuild.stderr),
		"a project with no source files does not crash",
		(emptyBuild.stdout + emptyBuild.stderr).slice(-300));
	t.ok(/No files to parse/.test(emptyBuild.stdout),
		"and says so when output is not suppressed", emptyBuild.stdout.slice(-300));

	// The JSON contract is the unambiguous one: a run that parsed nothing and wrote no
	// site is not a success. Exit codes are part of the contract too -- 0 success,
	// 1 config error, 2 findings.
	var emptyJson = t.cli(["--json", "-i", emptyProj.src, "-o", emptyProj.out, "-n", "Empty"],
		emptyProj.dir);
	var emptyReport = JSON.parse(emptyJson.stdout);

	t.ok(emptyReport.ok === false,
		"a build that parsed no files does not report ok:true",
		JSON.stringify(emptyReport));
	t.ok(emptyJson.status !== 0,
		"and does not exit 0", "exit " + emptyJson.status);

	// ------------------------------------------------------------------
	t.section("build: dumpData");
	// ------------------------------------------------------------------
	// dumpData writes stage-by-stage output, which is the main debugging tool for the
	// parse pipeline.
	var dump = t.project({ src : { "d.js" : t.block(["A module.", "@module d", "@package app"]) } });
	t.cli(["-i", dump.src, "-o", dump.out, "-n", "D", "-d"], dump.dir);

	var dataDir = path.join(dump.out, "docs", "_data");
	t.ok(fs.existsSync(dataDir), "dumpData writes a _data folder",
		JSON.stringify(fs.readdirSync(path.join(dump.out, "docs"))));

	var dumped = fs.existsSync(dataDir) ? fs.readdirSync(dataDir) : [];
	t.ok(dumped.some(function(f){ return /^comments_/.test(f); }), "with the extracted comments",
		JSON.stringify(dumped));
	t.ok(dumped.some(function(f){ return /^parsed_/.test(f); }), "the parsed blocks");
	t.ok(dumped.some(function(f){ return /^tagged_/.test(f); }), "and the tagged output");

	var noDump = t.project({ src : { "d.js" : t.block(["A module.", "@module d", "@package app"]) } });
	t.cli(["-i", noDump.src, "-o", noDump.out, "-n", "D"], noDump.dir);
	t.ok( ! fs.existsSync(path.join(noDump.out, "docs", "_data")),
		"and nothing is dumped unless asked for");
};
