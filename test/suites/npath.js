/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/npath.js`, the path wrapper the whole build runs through.
 *
 * Its one job beyond Node's `path` is that everything comes back with forward slashes,
 * on every platform. Generated ids, docfile names and menu hrefs are all built from
 * these results, so a stray backslash reaches the HTML.
 *
 * @module  suites/npath
 * @package test
 */

exports.name = "npath: path handling";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var p = t.src("npath");

	// ------------------------------------------------------------------
	t.section("npath: clean normalizes separators");
	// ------------------------------------------------------------------
	t.ok(p.clean("a\\b\\c") === "a/b/c", "backslashes become forward slashes", p.clean("a\\b\\c"));
	t.ok(p.clean("a//b///c") === "a/b/c", "repeated slashes collapse", p.clean("a//b///c"));
	t.ok(p.clean("a\\\\b//c") === "a/b/c", "a mixture collapses too", p.clean("a\\\\b//c"));

	var cleanedObj = p.clean({ x : "a\\b", y : "c//d" });
	t.ok(cleanedObj.x === "a/b" && cleanedObj.y === "c/d",
		"cleans every string value of an object", JSON.stringify(cleanedObj));

	var cleanedArr = p.clean(["a\\b", "c//d"]);
	t.ok(cleanedArr[0] === "a/b" && cleanedArr[1] === "c/d",
		"cleans every entry of an array", JSON.stringify(cleanedArr));

	t.ok(p.clean(7) === 7, "leaves a non-string, non-object value alone");

	// ------------------------------------------------------------------
	t.section("npath: the standard path surface");
	// ------------------------------------------------------------------
	t.ok(p.basename("/a/b/c.js") === "c.js", "basename");
	t.ok(p.basename("/a/b/c.js", ".js") === "c", "basename strips a given extension");
	t.ok(p.dirname("/a/b/c.js") === "/a/b", "dirname");
	t.ok(p.extname("/a/b/c.js") === ".js", "extname");
	t.ok(p.isAbsolute("/a") === true, "isAbsolute is true for a rooted path");
	t.ok(p.isAbsolute("a/b") === false, "isAbsolute is false for a relative path");
	t.ok(p.normalize("/a/b/../c/./d") === "/a/c/d", "normalize resolves . and ..",
		p.normalize("/a/b/../c/./d"));
	t.ok(p.join("a", "b", "../c") === "a/c", "join resolves as it concatenates", p.join("a", "b", "../c"));
	t.ok(p.relative("/a/b", "/a/c/d") === "../c/d", "relative", p.relative("/a/b", "/a/c/d"));
	t.ok(p.resolve("/a/b", "../c") === "/a/c", "resolve", p.resolve("/a/b", "../c"));

	var parsed = p.parse("/a/b/c.js");
	t.ok(parsed.dir === "/a/b", "parse returns the directory", parsed.dir);
	t.ok(parsed.base === "c.js", "parse returns the basename");
	t.ok(parsed.name === "c", "parse returns the stem");
	t.ok(parsed.ext === ".js", "parse returns the extension");

	t.ok(p.format({ dir : "/a/b", base : "c.js" }) === "/a/b/c.js", "format rebuilds a path",
		p.format({ dir : "/a/b", base : "c.js" }));

	// ------------------------------------------------------------------
	t.section("npath: forward slashes, always");
	// ------------------------------------------------------------------
	// The module documents this explicitly: internally everything is "/" regardless of
	// what the platform says, because these strings end up in generated HTML.
	t.ok(p.sep === "/", "the exported separator is a forward slash", p.sep);

	var results = [
		p.join("a\\b", "c"),
		p.normalize("a\\b\\c"),
		p.dirname("a\\b\\c.js"),
		p.clean("a\\b")
	];
	t.ok(results.every(function(r){ return String(r).indexOf("\\") === -1; }),
		"no path helper returns a backslash", JSON.stringify(results));

	// ------------------------------------------------------------------
	t.section("npath: trailing slash helpers");
	// ------------------------------------------------------------------
	t.ok(p.removeTrailingSlash("/a/b/") === "/a/b", "removeTrailingSlash");
	t.ok(p.removeTrailingSlash("/a/b") === "/a/b", "removeTrailingSlash is idempotent");
	t.ok(p.addTrailingSlash("/a/b") === "/a/b/", "addTrailingSlash");
	t.ok(p.addTrailingSlash("/a/b/") === "/a/b/", "addTrailingSlash is idempotent");
};
