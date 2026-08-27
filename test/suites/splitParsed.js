/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/splitParsed.js`, which divides one file's comments into independent groups
 * so a file holding several classes behaves like several one-class files.
 *
 * `tag.js` assumes everything it is handed belongs to a single page, so getting the split
 * wrong merges unrelated classes onto one page -- or, worse, drops a file's `@package`
 * for everything after the first class, which silently re-homes those classes under
 * "root" and breaks every `@extends` pointing at them.
 *
 * @module  suites/splitParsed
 * @package test
 */

exports.name = "splitParsed: one file into pages";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	/**
	 * Runs source through extract, parse and split.
	 *
	 * @method  groups
	 * @private
	 * @param   {array} lines - Source lines.
	 * @return  {array}       - The groups.
	 */
	function groups(lines){
		return t.parseSource(lines.join("\n"));
	}

	/**
	 * The package a group ends up declaring, as `tag.js` would read it.
	 *
	 * @method  pkgOf
	 * @private
	 * @param   {array} chunk - One group.
	 * @return  {string}      - The package name, or null.
	 */
	function pkgOf(chunk){
		for(var i=0; i<chunk.length; i++){
			var flags = chunk[i].flags || [];
			for(var f=0; f<flags.length; f++){
				if(flags[f].flag === "package" || flags[f].flag === "namespace"){
					return (flags[f].after || flags[f].name || "").trim();
				}
			}
		}
		return null;
	}

	/**
	 * The kind tags a group contains, flattened.
	 *
	 * @method  kindsOf
	 * @private
	 * @param   {array} chunk - One group.
	 * @return  {array}       - Names of the class/module tags found.
	 */
	function kindsOf(chunk){
		var out = [];
		for(var i=0; i<chunk.length; i++){
			var flags = chunk[i].flags || [];
			for(var f=0; f<flags.length; f++){
				if(["class", "module", "package", "namespace"].indexOf(flags[f].flag) > -1){
					out.push(flags[f].flag + ":" + (flags[f].name || flags[f].after));
				}
			}
		}
		return out;
	}

	var OPEN  = t.OPEN;
	var CLOSE = t.CLOSE;

	/**
	 * Builds a comment block.
	 *
	 * @method  b
	 * @private
	 * @param   {array} lines - Tag lines.
	 * @return  {string}      - A comment block.
	 */
	function b(lines){
		return [OPEN].concat(lines.map(function(l){ return " * " + l; })).concat([" " + CLOSE]).join("\n");
	}

	// ------------------------------------------------------------------
	t.section("splitParsed: where the splits happen");
	// ------------------------------------------------------------------
	var single = groups([ b(["A module.", "@module thing", "@package app"]) ]);
	t.ok(single.length === 1, "one declaration is one group", JSON.stringify(single.length));

	var twoClasses = groups([
		b(["First.", "@class First", "@package app"]),
		b(["A method on First.", "@method doIt"]),
		b(["Second.", "@class Second"]),
		b(["A method on Second.", "@method doThat"])
	]);
	t.ok(twoClasses.length === 2, "@class starts a new group", JSON.stringify(twoClasses.length));
	t.ok(twoClasses[0].length === 2, "members stay with the class above them",
		JSON.stringify(twoClasses[0].length));
	t.ok(twoClasses[1].length === 2, "and the second class keeps its own");

	// All four split tags behave the same way.
	var splitTags = ["package", "namespace", "module", "class"];
	for(var i=0; i<splitTags.length; i++){
		var pair = groups([
			b(["First.", "@" + splitTags[i] + " AAA"]),
			b(["Second.", "@" + splitTags[i] + " BBB"])
		]);
		t.ok(pair.length === 2, "@" + splitTags[i] + " starts a new group",
			JSON.stringify(kindsOf(pair[0]).concat(kindsOf(pair[1]))));
	}

	// A @method never starts a group.
	var methodsOnly = groups([
		b(["One.", "@method one"]),
		b(["Two.", "@method two"]),
		b(["Three.", "@method three"])
	]);
	t.ok(methodsOnly.length === 1, "@method does not start a group",
		JSON.stringify(methodsOnly.length));

	// A file with no comments at all still yields one (empty) group rather than throwing.
	t.ok(t.parseSource("var x = 1;").length === 1,
		"a file with no comments yields a single empty group");

	// ------------------------------------------------------------------
	t.section("splitParsed: a file's package carries forward");
	// ------------------------------------------------------------------
	// Splitting on @class means the second class in a file starts a group of its own,
	// and that group contains no @package tag -- the file declared it once, at the top.
	// Without propagation those classes land under "root" and every @extends pointing at
	// them stops resolving.
	var carried = groups([
		b(["First.", "@module first", "@package app"]),
		b(["Second class in the same file.", "@class Second"]),
		b(["Third, explicitly elsewhere.", "@class Third", "@package other"]),
		b(["Fourth, after the switch.", "@class Fourth"])
	]);

	t.ok(carried.length === 4, "four declarations make four groups",
		JSON.stringify(carried.length));
	t.ok(pkgOf(carried[0]) === "app", "the first group declares the package", pkgOf(carried[0]));
	t.ok(pkgOf(carried[1]) === "app", "the second inherits it", pkgOf(carried[1]));
	t.ok(pkgOf(carried[2]) === "other", "an explicit package still wins", pkgOf(carried[2]));
	t.ok(pkgOf(carried[3]) === "other", "and becomes the package for what follows",
		pkgOf(carried[3]));

	// The inherited tag is marked, so nothing downstream mistakes it for something the
	// author wrote.
	var inheritedFlag = carried[1][0].flags.filter(function(f){ return f.flag === "package"; })[0];
	t.ok(inheritedFlag && inheritedFlag.inherited === true,
		"an inherited package tag is marked as inherited",
		JSON.stringify(inheritedFlag));

	// @namespace propagates the same way @package does.
	var ns = groups([
		b(["First.", "@module first", "@namespace app"]),
		b(["Second.", "@class Second"])
	]);
	t.ok(pkgOf(ns[1]) === "app", "@namespace carries forward too", pkgOf(ns[1]));

	// A file that never declares a package leaves the groups alone, so tag.js applies
	// its own "root" fallback.
	var noPkg = groups([
		b(["First.", "@class First"]),
		b(["Second.", "@class Second"])
	]);
	t.ok(pkgOf(noPkg[1]) === null, "nothing is invented when no package was declared",
		JSON.stringify(pkgOf(noPkg[1])));

	// A package declared part way down does not reach backwards.
	var later = groups([
		b(["First.", "@class First"]),
		b(["Second.", "@class Second", "@package app"]),
		b(["Third.", "@class Third"])
	]);
	t.ok(pkgOf(later[0]) === null, "a later package does not apply to earlier groups",
		JSON.stringify(pkgOf(later[0])));
	t.ok(pkgOf(later[1]) === "app", "it applies to its own group");
	t.ok(pkgOf(later[2]) === "app", "and to what follows");

	// ------------------------------------------------------------------
	t.section("splitParsed: order is preserved");
	// ------------------------------------------------------------------
	var ordered = groups([
		b(["A.", "@class Alpha", "@package app"]),
		b(["B.", "@class Bravo"]),
		b(["C.", "@class Charlie"])
	]);
	var seen = ordered.map(function(g){ return kindsOf(g)[0]; });
	t.ok(seen[0] === "class:Alpha" && seen[1] === "class:Bravo" && seen[2] === "class:Charlie",
		"groups come back in source order", JSON.stringify(seen));
};
