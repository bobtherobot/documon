/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/ignore.js`, shared by the builder and by `--check` so both agree on exactly
 * which files are "in" the project.
 *
 * The original implementation returned false for everything, which meant `node_modules`,
 * `.git`, the template folder and the output folder were all walked. Two properties keep
 * that from coming back: the defaults actually match, and an internal path is matched
 * literally rather than as an expression -- an output folder of `"./"` compiled to a
 * regular expression that matched every path in the project.
 *
 * @module  suites/ignore
 * @package test
 */

exports.name = "ignore: what gets skipped";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var ignore = t.src("ignore");

	// ------------------------------------------------------------------
	t.section("ignore: the defaults");
	// ------------------------------------------------------------------
	var bare = ignore.create();

	t.ok(bare.test("/p/node_modules/x/y.js"), "node_modules is ignored");
	t.ok(bare.test("/p/bower_components/x.js"), "bower_components is ignored");
	t.ok(bare.test("/p/vendor/x.js"), "vendor is ignored");
	t.ok(bare.test("/p/.git/config"), "a dot folder is ignored");
	t.ok(bare.test("/p/.eslintrc"), "a dot file is ignored");
	t.ok(bare.test("node_modules/x.js"), "a relative node_modules path is ignored");

	t.ok( ! bare.test("/p/src/real.js"), "an ordinary source file is kept");
	t.ok( ! bare.test("/p/src/index.js"), "and so is an index file");

	// A folder whose name merely contains a default is not the default.
	t.ok( ! bare.test("/p/my_vendors/x.js"), "a folder that only resembles a default is kept",
		"my_vendors");

	t.ok( ! bare.test(""), "an empty path is not ignored");
	t.ok( ! bare.test(null), "a null path is not ignored");

	t.ok(Array.isArray(ignore.DEFAULTS) && ignore.DEFAULTS.length > 0,
		"the default list is exported");

	// ------------------------------------------------------------------
	t.section("ignore: user patterns");
	// ------------------------------------------------------------------
	var matcher = ignore.create(["*.test.js", "scratch"], ["/out/dir"]);

	t.ok(matcher.test("/p/node_modules/x/y.js"), "the defaults still apply");
	t.ok(matcher.test("/p/a.test.js"), "a simple glob matches");
	t.ok(matcher.test("/p/deep/b.test.js"), "a glob matches at any depth");
	t.ok(matcher.test("/p/scratch/f.js"), "a plain substring matches");
	t.ok(matcher.test("/out/dir/f.js"), "an internal path is ignored");
	t.ok( ! matcher.test("/p/src/real.js"), "ordinary source files are kept");
	t.ok( ! matcher.test("/p/src/atest.js"), "a near miss is kept", "atest.js");

	// A single string is accepted as well as a list.
	var single = ignore.create("*.spec.js");
	t.ok(single.test("/p/a.spec.js"), "a single pattern string is accepted");
	t.ok( ! single.test("/p/a.js"), "and does not over-match");

	// Glob forms.
	var globs = ignore.create(["src/**/tmp", "?.js", "*.min.js"]);
	t.ok(globs.test("/p/src/a/b/tmp"), "** crosses path segments");
	t.ok(globs.test("/p/a.js"), "? matches a single character");
	t.ok(globs.test("/p/lib.min.js"), "a leading * matches within a segment");

	// A regular expression is accepted too, as documented.
	var re = ignore.create(["\\.spec\\.js$"]);
	t.ok(re.test("/p/a.spec.js"), "a regular expression pattern matches");
	t.ok( ! re.test("/p/a.spec.js.bak"), "and is anchored as written");

	// A pattern that is neither a valid expression nor a useful glob must simply never
	// match, rather than aborting the whole walk.
	var broken = ignore.create(["[unclosed"]);
	t.ok( ! broken.test("/p/src/real.js"),
		"a pattern that cannot compile does not swallow the project");

	// ------------------------------------------------------------------
	t.section("ignore: internal paths are literal, never patterns");
	// ------------------------------------------------------------------
	// An output folder of "./" compiles to the expression "./", which matches any
	// character followed by a slash -- that is, every path in the project.
	var dotSlash = ignore.create(null, ["./"]);
	t.ok( ! dotSlash.test("/somewhere/else/src/real.js"),
		"an output folder of './' does not match everything",
		"./ as a literal");

	var out = ignore.create(null, ["/p/out"]);
	t.ok(out.test("/p/out"), "the internal path itself is ignored");
	t.ok(out.test("/p/out/docs/index.html"), "and everything beneath it");
	t.ok( ! out.test("/p/outside/f.js"),
		"but not a sibling whose name merely starts the same way", "/p/outside");
	t.ok( ! out.test("/p/src/f.js"), "and not unrelated paths");

	// Internal paths are resolved, so a relative one still matches an absolute file.
	var relative = ignore.create(null, ["test/fixtures"]);
	t.ok(relative.test(t.FIXTURES + "/good.js") || relative.test("test/fixtures/good.js"),
		"a relative internal path is resolved before matching");

	var several = ignore.create(null, ["/p/out", "/p/template", "/p/data"]);
	t.ok(several.test("/p/template/page.jst"), "several internal paths all apply");
	t.ok(several.test("/p/data/dump.json"), "each one of them");
	t.ok( ! several.test("/p/src/a.js"), "without catching the source");

	// A root internal path would ignore the entire filesystem, so it is discarded.
	var rootish = ignore.create(null, ["/"]);
	t.ok( ! rootish.test("/p/src/real.js"), "an internal path of '/' is discarded");

	// ------------------------------------------------------------------
	t.section("ignore: reporting");
	// ------------------------------------------------------------------
	var reported = ignore.create(["*.test.js"], ["/p/out"]);
	t.ok(Array.isArray(reported.patterns), "the resolved patterns are exposed");
	t.ok(reported.patterns.indexOf("*.test.js") > -1, "including the user's own",
		JSON.stringify(reported.patterns));
	t.ok(reported.patterns.length > 1, "alongside the defaults and internal paths");

	// ------------------------------------------------------------------
	t.section("ignore: windows-style paths");
	// ------------------------------------------------------------------
	// Paths arrive from the filesystem walk, which on Windows uses backslashes.
	var win = ignore.create(["scratch"]);
	t.ok(win.test("C:\\p\\node_modules\\x.js"), "a backslash path still matches a default");
	t.ok(win.test("C:\\p\\scratch\\f.js"), "and a user pattern");
};
