/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/tag.js`, where tag semantics live.
 *
 * By the time a group of parsed blocks reaches tag.js it is just flags; this is the stage
 * that decides what an entity *is*, what it is called, what its id is, which page it
 * belongs on, and which of its tags render. Everything the templates read comes from
 * here.
 *
 * @module  suites/tag
 * @package test
 */

exports.name = "tag: tag semantics";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var OPEN  = t.OPEN;
	var CLOSE = t.CLOSE;

	// Built from pieces so this file does not contain the very thing it tests.
	var SLASH = "&#" + "47;";
	var AT    = "&#" + "64;";

	/**
	 * Builds a comment block from tag lines.
	 *
	 * @method  b
	 * @private
	 * @param   {array} lines - The lines inside the comment.
	 * @return  {string}      - A comment block.
	 */
	function b(lines){
		return [OPEN].concat(lines.map(function(l){ return " * " + l; })).concat([" " + CLOSE]).join("\n");
	}

	/**
	 * Tags a set of blocks and returns the first page.
	 *
	 * @method  page
	 * @private
	 * @param   {array}  blocks - Comment blocks.
	 * @param   {object} [conf] - Config overrides.
	 * @return  {object}        - The tagged page.
	 */
	function page(blocks, conf){
		return t.tagSource(blocks.join("\n\n"), conf)[0];
	}

	/**
	 * Finds a member by name.
	 *
	 * @method  member
	 * @private
	 * @param   {array}  list - A methods, properties or events list.
	 * @param   {string} name - The member name.
	 * @return  {object}      - The member, or undefined.
	 */
	function member(list, name){
		return (list || []).filter(function(m){ return m.name === name; })[0];
	}

	// ------------------------------------------------------------------
	t.section("tag: identity and ids");
	// ------------------------------------------------------------------
	var widget = page([
		b(["A widget class.", "@class Widget", "@package app"]),
		b(["Does a thing.", "@method doThing", "@param {string} a - First.", "@returns {number} - Count."]),
		b(["The total.", "@property {number} total=0"]),
		b(["Fired on change.", "@event change"])
	]);

	t.ok(widget.klass === "Widget", "the class name is recorded", widget.klass);
	t.ok(widget.package === "app", "the package is recorded", widget.package);
	t.ok(widget.entity === "class", "the kind is recorded", widget.entity);
	t.ok(widget.id === "app.Widget", "the page id is package.Class", widget.id);
	t.ok(widget.docfile === "app.Widget.html", "the docfile follows the id", widget.docfile);
	t.ok(widget.file === "thing.js", "the file is relative to the source root", widget.file);

	// Member ids hang off the page id, which is what every cross-reference resolves against.
	t.ok(member(widget.methods, "doThing").id === "app.Widget.doThing",
		"a method id is page id plus name", member(widget.methods, "doThing").id);
	t.ok(member(widget.properties, "total").id === "app.Widget.total",
		"a property id is page id plus name");
	t.ok(member(widget.events, "change").id === "app.Widget.change",
		"an event id is page id plus name");

	// A module behaves exactly like a class as far as page structure goes.
	var mod = page([ b(["A module.", "@module helper", "@package app"]) ]);
	t.ok(mod.id === "app.helper", "@module produces a page id the same way", mod.id);
	t.ok(mod.entity === "module", "and records its own kind", mod.entity);

	// With no package declared anywhere, everything falls back to "root".
	var rootless = page([ b(["Loose.", "@class Loose"]) ]);
	t.ok(rootless.package === "root", "a missing package falls back to root", rootless.package);
	t.ok(rootless.id === "root.Loose", "and the id reflects it", rootless.id);

	// @namespace is a synonym for @package.
	var ns = page([ b(["A class.", "@class Thing", "@namespace app"]) ]);
	t.ok(ns.package === "app", "@namespace sets the package", ns.package);

	// ------------------------------------------------------------------
	t.section("tag: members are sorted into their buckets");
	// ------------------------------------------------------------------
	t.ok(widget.methods.length === 1, "methods land in methods",
		JSON.stringify(widget.methods.map(function(m){ return m.name; })));
	t.ok(widget.properties.length === 1, "properties land in properties");
	t.ok(widget.events.length === 1, "events land in events");
	t.ok(member(widget.methods, "doThing").entity === "method", "a method knows its kind");
	t.ok(member(widget.properties, "total").entity === "property", "a property knows its kind");
	t.ok(member(widget.events, "change").entity === "event", "an event knows its kind");

	// Members are sorted by name, then by any explicit @order.
	var sorted = page([
		b(["A class.", "@class Sorted", "@package app"]),
		b(["Zulu.", "@method zulu"]),
		b(["Alpha.", "@method alpha"]),
		b(["Mike.", "@method mike"])
	]);
	t.ok(sorted.methods.map(function(m){ return m.name; }).join(",") === "alpha,mike,zulu",
		"methods come back alphabetically",
		sorted.methods.map(function(m){ return m.name; }).join(","));

	var ordered = page([
		b(["A class.", "@class Ordered", "@package app"]),
		b(["Alpha.", "@method alpha", "@order 3"]),
		b(["Zulu.", "@method zulu", "@order 1"]),
		b(["Mike.", "@method mike", "@order 2"])
	]);
	t.ok(ordered.methods.map(function(m){ return m.name; }).join(",") === "zulu,mike,alpha",
		"an explicit @order overrides the alphabetical sort",
		ordered.methods.map(function(m){ return m.name; }).join(","));
	t.ok(member(ordered.methods, "alpha").order === 3, "@order is stored as a number",
		JSON.stringify(member(ordered.methods, "alpha").order));

	t.ok(page([
		b(["A class.", "@class X", "@package app"]),
		b(["Not a number.", "@method a", "@order nonsense"])
	]).methods[0].order === undefined, "a non-numeric @order is ignored");

	// ------------------------------------------------------------------
	t.section("tag: parameters");
	// ------------------------------------------------------------------
	var params = page([
		b(["A class.", "@class P", "@package app"]),
		b([
			"Configures.",
			"@method configure",
			"@param {object} opts - Options.",
			"@param {number} [opts.timeout=30] - How long.",
			"@param {string} name - A name."
		])
	]);
	var configure = member(params.methods, "configure");

	t.ok(configure.params.length === 2, "dotted params nest rather than becoming siblings",
		JSON.stringify(configure.params.map(function(p){ return p.name; })));
	t.ok(configure.params[0].name === "opts", "the parent parameter is first");
	t.ok(configure.params[0].type === "object", "and keeps its type");
	t.ok(configure.params[0].children && configure.params[0].children.length === 1,
		"the child is attached", JSON.stringify(configure.params[0].children));
	t.ok(configure.params[0].children[0].name === "timeout", "with its own name");
	t.ok(configure.params[0].children[0].optional === true, "and its optional marker");
	t.ok(configure.params[0].children[0].defaultVal === "30", "and its default value");
	t.ok(/How long\./.test(configure.params[0].children[0].text), "and its description");
	t.ok(configure.params[1].name === "name", "an undotted parameter stays a sibling");

	// Descriptions are rendered to HTML for the template, and a one-line summary is
	// derived for listings.
	t.ok(/<p>/.test(configure.params[1].html), "a parameter description is rendered as HTML",
		configure.params[1].html);
	t.ok(typeof configure.params[1].shortText === "string",
		"and a short form is available for listings");

	// ------------------------------------------------------------------
	t.section("tag: returns");
	// ------------------------------------------------------------------
	var ret = member(widget.methods, "doThing").returns;
	t.ok(ret.type === "number", "the return type is read", ret.type);
	t.ok(/Count\./.test(ret.text), "and the description", JSON.stringify(ret.text));
	t.ok(/<p>/.test(ret.html), "which is also rendered as HTML");

	// @returns has no name, but the parser cannot know that, so tag.js glues the
	// mistakenly-extracted first word back onto the description.
	var noDash = page([
		b(["A class.", "@class R", "@package app"]),
		b(["Computes.", "@method area", "@returns {number} The computed area."])
	]);
	t.ok(/^The computed area\./.test(member(noDash.methods, "area").returns.text.trim()),
		"a description with no leading dash is not truncated",
		JSON.stringify(member(noDash.methods, "area").returns.text));

	t.ok(page([
		b(["A class.", "@class R2", "@package app"]),
		b(["Computes.", "@method area", "@return {number} - Area."])
	]).methods[0].returns.type === "number", "@return works as well as @returns");

	// ------------------------------------------------------------------
	t.section("tag: visibility and truths");
	// ------------------------------------------------------------------
	var truths = ["private", "protected", "public", "static", "readonly"];

	for(var i=0; i<truths.length; i++){
		var withTruth = page([
			b(["A class.", "@class V", "@package app"]),
			b(["A member.", "@method m", "@" + truths[i]])
		]);
		t.ok(member(withTruth.methods, "m").access === truths[i],
			"@" + truths[i] + " sets access", member(withTruth.methods, "m").access);
	}

	t.ok(member(widget.properties, "total").access === undefined,
		"a member with no visibility tag has no access set");

	// ------------------------------------------------------------------
	t.section("tag: inheritance tags");
	// ------------------------------------------------------------------
	var extendish = ["extends", "implements", "inherits", "overrides"];

	for(var e=0; e<extendish.length; e++){
		var ext = page([ b(["A class.", "@class C", "@package app", "@" + extendish[e] + " app.Base"]) ]);
		t.ok(ext[extendish[e]] === "app.Base",
			"@" + extendish[e] + " records a qualified target",
			ext[extendish[e]]);
	}

	var bare = page([ b(["A class.", "@class C", "@package app", "@extends Base"]) ]);
	t.ok(bare.extends === "Base", "an unqualified target is left for the organizer to resolve",
		bare.extends);

	// ------------------------------------------------------------------
	t.section("tag: property types written both ways");
	// ------------------------------------------------------------------
	// A property's type may come from @property {type} or from a separate @type tag,
	// and @type accepts braces or bare words.
	var braced = page([
		b(["A class.", "@class T", "@package app"]),
		b(["A value.", "@property val", "@type {string}"])
	]);
	t.ok(member(braced.properties, "val").type === "string", "@type {string} sets the type",
		member(braced.properties, "val").type);

	var bareType = page([
		b(["A class.", "@class T", "@package app"]),
		b(["A value.", "@property val", "@type string"])
	]);
	t.ok(member(bareType.properties, "val").type === "string", "@type string sets the type too",
		member(bareType.properties, "val").type);

	t.ok(page([
		b(["A class.", "@class T", "@package app"]),
		b(["A value.", "@property val", "@type {string|number}"])
	]).properties[0].type === "string|number",
		"a braced union type survives whole",
		page([
			b(["A class.", "@class T", "@package app"]),
			b(["A value.", "@property val", "@type {string|number}"])
		]).properties[0].type);

	// TAGS.md documents the braced form only. Unbraced, the first word lands in "name"
	// and the rest in "text", and patchType keeps only the "text" half -- so
	// "@type string | number" reduces to "number". Pinned so the difference between the
	// two forms is visible rather than surprising.
	t.ok(page([
		b(["A class.", "@class T", "@package app"]),
		b(["A value.", "@property val", "@type string | number"])
	]).properties[0].type === "number",
		"an unbraced union keeps only the trailing type -- use braces for unions",
		page([
			b(["A class.", "@class T", "@package app"]),
			b(["A value.", "@property val", "@type string | number"])
		]).properties[0].type);

	// ------------------------------------------------------------------
	t.section("tag: descriptions and markdown");
	// ------------------------------------------------------------------
	var md = page([
		b(["A class with **bold** text.", "", "A second paragraph.", "@class M", "@package app"])
	]);
	t.ok(/<strong>bold<\/strong>/.test(md.html), "the description is rendered as markdown",
		md.html);
	t.ok(/A class with/.test(md.text), "the raw text is kept alongside it");
	t.ok(md.shortText.indexOf("A class with") === 0,
		"the short form is the first line with content", JSON.stringify(md.shortText));
	t.ok(/<strong>/.test(md.shortHtml), "and is rendered too");

	// The escapes have to survive extract.js and parse.js and be decoded only after, so a
	// comment can show a comment. This runs the whole path rather than calling markdown
	// directly, because the ordering is the entire point: decoding a line earlier would
	// end the block at the inner closer, and decoding the tag character earlier would
	// make "inner" a real method.
	var esc = page([
		b([
			"Comments inside a comment:",
			"",
			"    " + SLASH + "**",
			"     * " + AT + "method inner",
			"     *" + SLASH,
			"",
			"@class E",
			"@package app"
		])
	]);

	t.ok(esc.id === "app.E", "the block survives an encoded closer intact", esc.id);
	t.ok(member(esc.methods, "inner") === undefined,
		"an encoded tag character does not declare a member",
		JSON.stringify((esc.methods || []).map(function(m){ return m.name; })));
	t.ok(esc.html.indexOf("/**") !== -1, "and decodes to a real slash in the html", esc.html);
	t.ok(esc.html.indexOf("@method inner") !== -1, "along with the tag character", esc.html);
	t.ok(esc.html.indexOf("&amp;#47;") === -1, "with no entity left visible", esc.html);

	// The raw text keeps the encoded form -- llms.js decodes it separately on the way to
	// model.json, because that path never passes through markdown.
	t.ok(esc.text.indexOf(SLASH) !== -1,
		"the raw text still holds the encoded form for llms.js to decode",
		JSON.stringify(esc.text));

	// ------------------------------------------------------------------
	t.section("tag: metadata reaches the page");
	// ------------------------------------------------------------------
	var meta = page([
		b(["A class.", "@class D", "@package app"]),
		b(["Old.", "@method old", "@deprecated Use fresh.", "@since 1.1.0"])
	]);
	var old = member(meta.methods, "old");
	t.ok(old.meta && old.meta.length === 2, "metadata is carried onto the member",
		JSON.stringify(old.meta));
	t.ok(old.meta[0].label === "Deprecated", "with its label");
	t.ok(/Use fresh\./.test(old.meta[0].text), "and its text");
	t.ok(/<p>/.test(old.meta[0].html), "and rendered HTML for the template");

	// ------------------------------------------------------------------
	t.section("tag: see and requires");
	// ------------------------------------------------------------------
	var refs = page([
		b(["A class.", "@class S", "@package app", "@see app.Other", "@see app.Another",
			"@requires app.Dep"])
	]);
	t.ok(Array.isArray(refs.see) && refs.see.length === 2,
		"repeated @see tags collect into a list", JSON.stringify(refs.see));
	t.ok(Array.isArray(refs.requires) && refs.requires[0] === "app.Dep",
		"@requires collects too", JSON.stringify(refs.requires));

	// ------------------------------------------------------------------
	t.section("tag: examples");
	// ------------------------------------------------------------------
	var example = page([
		b(["A class.", "@class E", "@package app"]),
		b(["Does it.", "@method go", "@example", "", "\t\tgo();"])
	]);
	var go = member(example.methods, "go");
	t.ok(Array.isArray(go.example) && go.example.length === 1,
		"an example is collected", JSON.stringify(go.example));
	t.ok(/go\(\)/.test(go.example[0].text), "keeping its code", JSON.stringify(go.example[0].text));
	t.ok(/<code|<pre/.test(go.example[0].html), "and rendering it as a code block",
		go.example[0].html);

	var twoExamples = page([
		b(["A class.", "@class E2", "@package app"]),
		b(["Does it.", "@method go", "@example", "", "\t\tone();", "@example", "", "\t\ttwo();"])
	]);
	t.ok(member(twoExamples.methods, "go").example.length === 2,
		"repeated examples collect into a list",
		JSON.stringify(member(twoExamples.methods, "go").example.length));

	// A typed example names the language for syntax highlighting. This currently throws:
	// processExample() assigns to an "opts" that was never declared in its scope.
	var typedThrew = null;
	try {
		page([
			b(["A class.", "@class E3", "@package app"]),
			b(["Does it.", "@method go", "@example {js}", "", "\t\tgo();"])
		]);
	} catch(err) {
		typedThrew = err;
	}
	t.ok(typedThrew === null,
		"an example with a language type does not throw",
		typedThrew && typedThrew.message);

	// ------------------------------------------------------------------
	t.section("tag: the search index");
	// ------------------------------------------------------------------
	t.ok(typeof widget.search === "object", "a search index is produced");
	t.ok(widget.search["app.Widget"] !== undefined, "the page itself is indexed",
		JSON.stringify(Object.keys(widget.search)));
	t.ok(widget.search["app.Widget.doThing"] !== undefined, "and so are its members");
	t.ok(/^Widget : /.test(widget.search["app.Widget"]),
		"an entry starts with the entity name", widget.search["app.Widget"]);

	// ------------------------------------------------------------------
	t.section("tag: project identity is carried through");
	// ------------------------------------------------------------------
	var named = page([ b(["A class.", "@class N", "@package app"]) ], {
		projectName    : "MyProject",
		projectVersion : "9.9.9"
	});
	t.ok(named.projectName === "MyProject", "the project name reaches the page");
	t.ok(named.projectVersion === "9.9.9", "and so does the version");

	// ------------------------------------------------------------------
	t.section("tag: loose members with no class");
	// ------------------------------------------------------------------
	// A file that documents members without declaring a class still produces a page --
	// those members are "loose" in the package.
	var loose = page([
		b(["Just a method.", "@method standalone", "@package app"])
	]);
	t.ok(loose.package === "app", "a loose member keeps its package", loose.package);
	t.ok(loose.klass === undefined, "and has no class", loose.klass);
	t.ok(loose.methods && loose.methods.length === 1, "the method is still collected",
		JSON.stringify(loose.methods && loose.methods.length));
	t.ok(loose.methods[0].id === "app.standalone",
		"and its id hangs directly off the package", loose.methods[0].id);
};
