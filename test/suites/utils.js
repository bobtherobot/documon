/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/utils.js` -- the small helpers the rest of the pipeline leans on.
 *
 * `sortOn` gets the most attention because it decides the order every menu, member list
 * and page section appears in, and it silently switches between numeric and string
 * comparison based on the first element it sees.
 *
 * @module  suites/utils
 * @package test
 */

exports.name = "utils: helpers";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var utils = t.src("utils");

	// Built from pieces so this file does not contain the very thing it tests.
	var SLASH = "&#" + "47;";
	var AT    = "&#" + "64;";

	// ------------------------------------------------------------------
	t.section("utils: capitalize");
	// ------------------------------------------------------------------
	t.ok(utils.capitalize("hello") === "Hello", "capitalizes the first letter");
	t.ok(utils.capitalize("Hello") === "Hello", "leaves an already-capital letter alone");
	t.ok(utils.capitalize("a") === "A", "handles a single character");
	t.ok(utils.capitalize("") === "", "passes an empty string through");
	t.ok(utils.capitalize(null) === null, "passes null through rather than throwing");
	t.ok(utils.capitalize("123abc") === "123abc", "leaves a leading digit unchanged");

	// ------------------------------------------------------------------
	t.section("utils: decodeCommentEscapes");
	// ------------------------------------------------------------------
	// A comment cannot hold a literal comment-closer or a literal tag character without
	// ending the comment or declaring a tag, so both are written HTML-encoded in the
	// source. This is what turns them back, and it is the only thing that ever does.
	t.ok(utils.decodeCommentEscapes(SLASH) === "/", "an encoded slash decodes",
		utils.decodeCommentEscapes(SLASH));
	t.ok(utils.decodeCommentEscapes(AT) === "@", "an encoded tag character decodes",
		utils.decodeCommentEscapes(AT));
	t.ok(utils.decodeCommentEscapes("a" + SLASH + "b" + SLASH + "c") === "a/b/c",
		"every occurrence is replaced, not just the first");
	t.ok(utils.decodeCommentEscapes("&#047;&#0064;") === "/@",
		"zero padding is legal in a numeric entity and is accepted",
		utils.decodeCommentEscapes("&#047;&#0064;"));

	// The authoring guide writes the ampersand itself encoded, so the reader sees the
	// entity rather than its result. Decoding that would destroy the one page that
	// explains the convention.
	t.ok(utils.decodeCommentEscapes("&amp;#47;") === "&amp;#47;",
		"an encoded ampersand is left alone",
		utils.decodeCommentEscapes("&amp;#47;"));

	// Anything else is none of this function's business.
	t.ok(utils.decodeCommentEscapes("&#8212;") === "&#8212;",
		"an unrelated numeric entity is untouched");
	t.ok(utils.decodeCommentEscapes("plain") === "plain", "ordinary text is untouched");
	t.ok(utils.decodeCommentEscapes("") === "", "an empty string passes through");
	t.ok(utils.decodeCommentEscapes(null) === null,
		"null passes through rather than throwing");
	t.ok(utils.decodeCommentEscapes(undefined) === undefined, "and so does undefined");

	// ------------------------------------------------------------------
	t.section("utils: trailing slashes");
	// ------------------------------------------------------------------
	t.ok(utils.addTrailingSlash("a/b") === "a/b/", "adds a missing trailing slash");
	t.ok(utils.addTrailingSlash("a/b/") === "a/b/", "does not double an existing one");
	t.ok(utils.addTrailingSlash("") === "", "leaves an empty string empty");
	t.ok(utils.removeTrailingSlash("a/b/") === "a/b", "removes a trailing slash");
	t.ok(utils.removeTrailingSlash("a/b") === "a/b", "leaves a bare path alone");
	t.ok(utils.removeTrailingSlash("/") === "", "reduces a lone slash to nothing");

	// Only keys containing "folder" are touched, which is what lets the config carry
	// both folder paths and plain strings without mangling the plain ones.
	var conf = {
		outputFolder   : "/a/b",
		templateFolder : "/c/d/",
		name           : "Not/A/Folder",
		docsDirName    : "docs"
	};
	utils.normalizeConfTrailingSlash(conf);
	t.ok(conf.outputFolder === "/a/b/", "normalize adds a slash to a *Folder key");
	t.ok(conf.templateFolder === "/c/d/", "and leaves a correct one alone");
	t.ok(conf.name === "Not/A/Folder", "a non-folder key is untouched", conf.name);
	t.ok(conf.docsDirName === "docs", "a folder-ish name that is not a path is untouched");

	utils.normalizeConfTrailingSlash(conf, "remove");
	t.ok(conf.outputFolder === "/a/b", "normalize can remove slashes too");
	t.ok(conf.name === "Not/A/Folder", "removal still skips non-folder keys");

	// ------------------------------------------------------------------
	t.section("utils: clone");
	// ------------------------------------------------------------------
	var original = {
		name : "top",
		nested : { list : [1, 2, { deep : "yes" }] },
		when : null
	};
	var copy = utils.clone(original);

	t.ok(copy !== original, "returns a new object");
	t.ok(copy.nested !== original.nested, "nested objects are copied, not shared");
	t.ok(copy.nested.list !== original.nested.list, "arrays are copied");
	t.ok(copy.nested.list[2] !== original.nested.list[2], "objects inside arrays are copied");
	t.ok(copy.nested.list[2].deep === "yes", "values survive the copy");
	t.ok(copy.when === null, "null survives as null");

	copy.nested.list[2].deep = "changed";
	t.ok(original.nested.list[2].deep === "yes",
		"mutating the copy does not reach the original -- buildMenu depends on this");

	t.ok(utils.clone("plain") === "plain", "primitives pass through");
	t.ok(utils.clone(7) === 7, "numbers pass through");

	// ------------------------------------------------------------------
	t.section("utils: sortOn");
	// ------------------------------------------------------------------
	var byName = [ { name : "Charlie" }, { name : "alice" }, { name : "Bravo" } ];
	utils.sortOn(byName, "name");
	t.ok(byName.map(function(x){ return x.name; }).join(",") === "alice,Bravo,Charlie",
		"sorts strings case-insensitively", byName.map(function(x){ return x.name; }).join(","));

	// The reason numeric detection exists at all: as strings, 100 sorts before 20.
	var byOrder = [ { order : 100 }, { order : 20 }, { order : 3 } ];
	utils.sortOn(byOrder, "order");
	t.ok(byOrder.map(function(x){ return x.order; }).join(",") === "3,20,100",
		"sorts numbers numerically, not as strings",
		byOrder.map(function(x){ return x.order; }).join(","));

	var reversed = [ { n : 1 }, { n : 3 }, { n : 2 } ];
	utils.sortOn(reversed, "n", true);
	t.ok(reversed.map(function(x){ return x.n; }).join(",") === "3,2,1", "can sort in reverse");

	// tag.js calls sortOn(list, ["name", "order"]) -- the second pass wins, so an
	// explicit @order overrides the alphabetical pass.
	var multi = [
		{ name : "aaa", order : 2 },
		{ name : "zzz", order : 1 },
		{ name : "mmm", order : 3 }
	];
	utils.sortOn(multi, ["name", "order"]);
	t.ok(multi.map(function(x){ return x.name; }).join(",") === "zzz,aaa,mmm",
		"an array of keys applies each in turn, last key winning",
		multi.map(function(x){ return x.name; }).join(","));

	t.ok(utils.sortOn(null, "name") === null, "a null list is returned untouched");
	t.ok(utils.sortOn([], "name").length === 0, "an empty list is returned untouched");

	var noProp = [ { a : 1 } ];
	t.ok(utils.sortOn(noProp) === noProp, "no property means no sort");

	var single = [ { name : "only" } ];
	utils.sortOn(single, "name");
	t.ok(single.length === 1 && single[0].name === "only", "a one-item list survives");
};
