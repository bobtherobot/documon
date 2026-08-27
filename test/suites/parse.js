/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/parse.js`, which turns one extracted comment block into a description plus
 * a list of flags, then normalizes the tags that do not map one-to-one onto Documon.
 *
 * The normalize step is where tags from other documentation systems are either folded
 * into the description, converted, collected as metadata, or left alone -- and the whole
 * point of it is that nothing an author wrote is silently thrown away.
 *
 * @module  suites/parse
 * @package test
 */

exports.name = "parse: comment blocks into flags";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var extract = t.src("extract");
	var parse   = t.src("parse");

	var OPEN  = t.OPEN;
	var CLOSE = t.CLOSE;

	/**
	 * Extracts and parses one comment block.
	 *
	 * @method  one
	 * @private
	 * @param   {array} lines - The lines inside the comment.
	 * @return  {object}      - The parsed block.
	 */
	function one(lines){
		var text = [OPEN].concat(lines).concat([" " + CLOSE]).join("\n");
		return parse( extract(text)[0], "/proj/src/thing.js" );
	}

	/**
	 * The flag names a block produced, in order.
	 *
	 * @method  names
	 * @private
	 * @param   {object} block - A parsed block.
	 * @return  {array}        - Flag names.
	 */
	function names(block){
		return block.flags.map(function(f){ return f.flag; });
	}

	/**
	 * Finds a flag by name.
	 *
	 * @method  flag
	 * @private
	 * @param   {object} block - A parsed block.
	 * @param   {string} name  - The flag to find.
	 * @return  {object}       - The flag, or undefined.
	 */
	function flag(block, name){
		return block.flags.filter(function(f){ return f.flag === name; })[0];
	}

	// ------------------------------------------------------------------
	t.section("parse: description and flags");
	// ------------------------------------------------------------------
	var basic = one([
		" * A description.",
		" * More text.",
		" * @method foo",
		" * @param {string} a - First."
	]);

	t.ok(/A description\./.test(basic.text), "free text above the tags is the description",
		JSON.stringify(basic.text));
	t.ok(/More text\./.test(basic.text), "the description may span lines");
	t.ok(basic.text.indexOf("@method") === -1, "and stops at the first tag", basic.text);
	t.ok(names(basic).join(",") === "method,param", "the tags become flags",
		names(basic).join(","));
	t.ok(basic.file === "/proj/src/thing.js", "the file is recorded");
	t.ok(typeof basic.start === "number" && typeof basic.end === "number",
		"line numbers are carried through");
	t.ok(typeof basic.source === "string" && basic.source.length > 0,
		"the raw source is kept");

	// A description line that follows a tag belongs to that tag, not to the block.
	var continued = one([
		" * @method foo",
		" * @param {string} a - First line.",
		" * second line of the same parameter."
	]);
	var param = flag(continued, "param");
	t.ok(/First line\./.test(param.text), "a tag keeps its own first-line description");
	t.ok(/second line of the same parameter/.test(param.text),
		"and continuation lines are appended to it", JSON.stringify(param.text));
	t.ok(continued.text.indexOf("second line") === -1,
		"continuation lines do not leak into the block description");

	t.ok(one([" * Just prose, no tags."]).flags.length === 0,
		"a block with no tags has no flags");
	t.ok(/Just prose/.test(one([" * Just prose, no tags."]).text),
		"but still has its description");

	t.ok(parse({ data : "" }, "f.js") === null, "an empty block parses to null");
	t.ok(parse({ data : null }, "f.js") === null, "a block with no data parses to null");

	// ------------------------------------------------------------------
	t.section("parse: description tags fold into the description");
	// ------------------------------------------------------------------
	// Documon takes the description from the free text, so @description and friends have
	// no equivalent tag. Their content is folded in rather than dropped.
	var descTags = ["desc", "description", "summary", "classdesc", "fileoverview", "overview"];

	for(var i=0; i<descTags.length; i++){
		var folded = one([" * @method foo", " * @" + descTags[i] + " Folded in."]);
		t.ok(/Folded in\./.test(folded.text),
			"@" + descTags[i] + " folds into the description", JSON.stringify(folded.text));
		t.ok(names(folded).indexOf(descTags[i]) === -1,
			"@" + descTags[i] + " leaves no stray flag behind", names(folded).join(","));
	}

	// When there is both free text and a description tag, both survive.
	var both = one([
		" * Written above.",
		" * @method foo",
		" * @description Written as a tag."
	]);
	t.ok(/Written above\./.test(both.text) && /Written as a tag\./.test(both.text),
		"free text and a description tag are combined", JSON.stringify(both.text));

	// A multi-line description tag keeps all of its lines.
	var multi = one([
		" * @method foo",
		" * @description First line.",
		" * Second line."
	]);
	t.ok(/First line\./.test(multi.text) && /Second line\./.test(multi.text),
		"a multi-line description tag folds in whole", JSON.stringify(multi.text));

	// ------------------------------------------------------------------
	t.section("parse: @access becomes a visibility flag");
	// ------------------------------------------------------------------
	var priv = one([" * @property bar", " * @access private"]);
	t.ok(names(priv).indexOf("private") > -1, "@access private becomes @private",
		names(priv).join(","));
	t.ok(names(priv).indexOf("access") === -1, "and the access tag itself is consumed");
	t.ok(flag(priv, "private").writtenFlag === "access",
		"the written spelling is remembered for reporting");

	t.ok(names(one([" * @property bar", " * @access protected"])).indexOf("protected") > -1,
		"@access protected becomes @protected");
	t.ok(names(one([" * @property bar", " * @access public"])).indexOf("public") > -1,
		"@access public becomes @public");
	t.ok(names(one([" * @property bar", " * @access PRIVATE"])).indexOf("private") > -1,
		"@access is case-insensitive");

	// An access value Documon does not have is dropped rather than becoming a bogus flag.
	var bogus = one([" * @property bar", " * @access nonsense"]);
	t.ok(names(bogus).join(",") === "property",
		"an unrecognised @access value produces no flag", names(bogus).join(","));

	// ------------------------------------------------------------------
	t.section("parse: @const becomes a read-only property");
	// ------------------------------------------------------------------
	var konst = one([" * @const {number} MAX"]);
	t.ok(names(konst).indexOf("property") > -1, "@const becomes a @property",
		names(konst).join(","));
	t.ok(names(konst).indexOf("readonly") > -1, "and gains @readonly");
	t.ok(flag(konst, "property").name === "MAX", "keeping its name");
	t.ok(flag(konst, "property").type === "number", "and its type");
	t.ok(flag(konst, "property").writtenFlag === "const",
		"the written spelling is remembered");

	t.ok(names(one([" * @constant {number} MAX"])).indexOf("readonly") > -1,
		"@constant works the same way");

	// ------------------------------------------------------------------
	t.section("parse: metadata tags are collected, not dropped");
	// ------------------------------------------------------------------
	var meta = one([
		" * @method foo",
		" * @deprecated Use bar instead.",
		" * @since 1.2.0",
		" * @throws {Error} Boom.",
		" * @author Someone",
		" * @todo Finish this."
	]);

	t.ok(Array.isArray(meta.meta), "a meta list is always present");
	t.ok(meta.meta.length === 5, "every metadata tag is collected",
		JSON.stringify(meta.meta.map(function(m){ return m.flag; })));
	t.ok(names(meta).join(",") === "method",
		"and none of them remain as flags", names(meta).join(","));

	/**
	 * @method  entry
	 * @private
	 * @param   {string} name - The metadata tag.
	 * @return  {object}      - Its collected entry.
	 */
	function entry(name){
		return meta.meta.filter(function(m){ return m.flag === name; })[0];
	}

	t.ok(entry("deprecated").label === "Deprecated", "the label is resolved");
	t.ok(entry("deprecated").text === "Use bar instead.", "the text is kept",
		JSON.stringify(entry("deprecated").text));
	t.ok(entry("since").text === "1.2.0", "a version reads as text",
		JSON.stringify(entry("since").text));
	t.ok(entry("throws").label === "Throws", "@throws is labelled");
	t.ok(/Boom\./.test(entry("throws").text), "and keeps its whole body",
		JSON.stringify(entry("throws").text));
	t.ok(entry("todo").label === "To do", "@todo has a readable label");

	t.ok(one([" * @method foo"]).meta.length === 0,
		"a block with no metadata has an empty list");

	// @exception shares the @throws label.
	t.ok(one([" * @method foo", " * @exception {Error} Nope."]).meta[0].label === "Throws",
		"@exception is labelled as Throws");

	// A metadata tag with no body is still recorded -- "@deprecated" alone is meaningful.
	var bare = one([" * @method foo", " * @deprecated"]);
	t.ok(bare.meta.length === 1, "a bodyless metadata tag is still collected",
		JSON.stringify(bare.meta));
	t.ok(bare.meta[0].text === "", "with empty text", JSON.stringify(bare.meta[0].text));

	// A multi-line metadata tag keeps its continuation lines.
	var metaMulti = one([
		" * @method foo",
		" * @deprecated First line.",
		" * Second line."
	]);
	t.ok(/First line\./.test(metaMulti.meta[0].text) && /Second line\./.test(metaMulti.meta[0].text),
		"a multi-line metadata tag keeps every line",
		JSON.stringify(metaMulti.meta[0].text));

	// ------------------------------------------------------------------
	t.section("parse: ordinary tags are left alone");
	// ------------------------------------------------------------------
	var ordinary = one([
		" * @class Thing",
		" * @package app",
		" * @extends app.Base",
		" * @private",
		" * @example",
		" * @see app.Other"
	]);
	t.ok(names(ordinary).join(",") === "class,package,extends,private,example,see",
		"structural tags pass through untouched and in order",
		names(ordinary).join(","));
};
