/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/llms.js`, which writes the machine-readable companions to the HTML:
 * `llms.txt`, `llms-full.txt` and `model.json`.
 *
 * `model.json` is a published interface -- anything consuming Documon output
 * programmatically reads it -- so the shape of a record matters as much as its contents.
 *
 * @module  suites/llms
 * @package test
 */

var path = require('path');
var fs   = require('fs');

exports.name = "llms: machine-readable output";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var llms = t.src("llms");

	// Built from pieces so this file does not contain the very thing it tests.
	var SLASH = "&#" + "47;";
	var AT    = "&#" + "64;";

	// ------------------------------------------------------------------
	t.section("llms: deHtml");
	// ------------------------------------------------------------------
	t.ok(llms.deHtml("<p>Hello <b>world</b></p>") === "Hello world",
		"tags are stripped", JSON.stringify(llms.deHtml("<p>Hello <b>world</b></p>")));

	t.ok(llms.deHtml("<p>One</p><p>Two</p>") === "One\nTwo",
		"block elements become line breaks",
		JSON.stringify(llms.deHtml("<p>One</p><p>Two</p>")));

	t.ok(llms.deHtml("<ul><li>one</li><li>two</li></ul>") === "one\ntwo",
		"list items become lines",
		JSON.stringify(llms.deHtml("<ul><li>one</li><li>two</li></ul>")));

	t.ok(llms.deHtml("a<br>b") === "a\nb", "a break becomes a line break",
		JSON.stringify(llms.deHtml("a<br>b")));

	// Script and style contents are removed entirely, not merely untagged -- otherwise
	// the analytics snippet ends up in llms.txt as prose.
	t.ok(llms.deHtml("<script>bad()</script><p>ok</p>") === "ok",
		"script contents are removed", JSON.stringify(llms.deHtml("<script>bad()</script><p>ok</p>")));
	t.ok(llms.deHtml("<style>p{color:red}</style><p>ok</p>") === "ok",
		"style contents are removed");

	t.ok(llms.deHtml("a &amp; b &lt;c&gt; &quot;d&quot;") === 'a & b <c> "d"',
		"the common entities are decoded",
		JSON.stringify(llms.deHtml("a &amp; b &lt;c&gt; &quot;d&quot;")));
	t.ok(llms.deHtml("a&nbsp;b") === "a b", "a non-breaking space becomes a space");
	t.ok(llms.deHtml("a &#8212; b") === "a  b" || llms.deHtml("a &#8212; b") === "a b",
		"a numeric entity is dropped rather than left raw",
		JSON.stringify(llms.deHtml("a &#8212; b")));

	t.ok(llms.deHtml("a     b") === "a b", "runs of spaces collapse");
	t.ok(llms.deHtml("<p>a</p><p></p><p></p><p></p><p>b</p>").indexOf("\n\n\n") === -1,
		"runs of blank lines collapse",
		JSON.stringify(llms.deHtml("<p>a</p><p></p><p></p><p></p><p>b</p>")));

	// The comment escapes are real characters, not markup. deHtml used to decode "&amp;"
	// before stripping numeric entities, so both the escapes and a deliberately literal
	// "&amp;#47;" were swallowed -- a default value written as an encoded "/**" reached
	// llms.txt as "**".
	t.ok(llms.deHtml("<p>" + SLASH + "** and " + AT + "method</p>") === "/** and @method",
		"the comment escapes are decoded rather than dropped",
		JSON.stringify(llms.deHtml("<p>" + SLASH + "** and " + AT + "method</p>")));
	t.ok(llms.deHtml("<p>&amp;#47;</p>") === "&#47;",
		"and an encoded ampersand survives as the entity itself",
		JSON.stringify(llms.deHtml("<p>&amp;#47;</p>")));

	t.ok(llms.deHtml("") === "", "an empty string yields an empty string");
	t.ok(llms.deHtml(null) === "", "null yields an empty string");
	t.ok(llms.deHtml(undefined) === "", "undefined yields an empty string");

	// ------------------------------------------------------------------
	t.section("llms: modelPage");
	// ------------------------------------------------------------------
	var record = llms.modelPage({
		id  : "fallback",
		ctx : {
			id      : "app.Widget",
			klass   : "Widget",
			entity  : "class",
			package : "app",
			text    : "  A widget.  ",
			file    : "widget.js",
			line    : 12,
			meta    : [ { flag : "deprecated", label : "Deprecated", text : " Use Gadget. " } ],
			methods : [ {
				id     : "app.Widget.doIt",
				name   : "doIt",
				entity : "method",
				type   : null,
				access : "private",
				line   : 20
			} ],
			properties : [ { id : "app.Widget.total", name : "total", type : "number" } ],
			events     : [ { id : "app.Widget.change", name : "change" } ]
		}
	});

	t.ok(record.id === "app.Widget", "the id comes from the entity", record.id);
	t.ok(record.name === "Widget", "the name is the class name", record.name);
	t.ok(record.kind === "class", "the kind is the entity kind", record.kind);
	t.ok(record.package === "app", "the package is recorded", record.package);
	t.ok(record.description === "A widget.", "the description is trimmed",
		JSON.stringify(record.description));
	t.ok(record.file === "widget.js", "the source file is recorded");
	t.ok(record.line === 12, "the line is recorded as a number", JSON.stringify(record.line));

	t.ok(record.meta.length === 1, "metadata is carried over");
	t.ok(record.meta[0].tag === "deprecated", "with the tag name", record.meta[0].tag);
	t.ok(record.meta[0].label === "Deprecated", "its label");
	t.ok(record.meta[0].text === "Use Gadget.", "and its trimmed text",
		JSON.stringify(record.meta[0].text));

	// A record is built from the raw comment text, which never passes through markdown --
	// so this is the only place the escapes get decoded on the way to model.json,
	// llms-full.txt and the JSON-LD each page embeds.
	var escaped = llms.modelPage({
		ctx : {
			id   : "app.Esc",
			text : "Opens with " + SLASH + "** and closes with *" + SLASH + ".",
			meta : [ { flag : "since", label : "Since", text : "Use " + AT + "method." } ],
			methods : [ {
				name    : "go",
				text    : "Takes " + AT + "param.",
				params  : [ { name : "p", text : "Written as " + SLASH + "**." } ],
				returns : { type : "string", text : "A " + SLASH + " character." }
			} ]
		}
	});

	t.ok(escaped.description === "Opens with /** and closes with */.",
		"the description is decoded", JSON.stringify(escaped.description));
	t.ok(escaped.meta[0].text === "Use @method.", "and so is metadata text",
		JSON.stringify(escaped.meta[0].text));
	t.ok(escaped.members[0].description === "Takes @param.", "and a member description",
		JSON.stringify(escaped.members[0].description));
	t.ok(escaped.members[0].params[0].description === "Written as /**.",
		"and a parameter description",
		JSON.stringify(escaped.members[0].params[0].description));
	t.ok(escaped.members[0].returns.text === undefined
			&& escaped.members[0].returns.description === "A / character.",
		"and a returns description",
		JSON.stringify(escaped.members[0].returns.description));

	t.ok(record.members.length === 3, "every bucket contributes members",
		JSON.stringify(record.members.map(function(m){ return m.name; })));

	/**
	 * @method  mem
	 * @private
	 * @param   {string} name - The member name.
	 * @return  {object}      - The member record.
	 */
	function mem(name){
		return record.members.filter(function(m){ return m.name === name; })[0];
	}

	t.ok(mem("doIt").kind === "method", "a method is recorded as a method");
	t.ok(mem("doIt").access === "private", "its access is recorded", mem("doIt").access);
	t.ok(mem("total").kind === "property", "a property takes its kind from its bucket",
		mem("total").kind);
	t.ok(mem("change").kind === "event", "and so does an event", mem("change").kind);
	t.ok(mem("total").access === "public",
		"a member with no visibility tag defaults to public", mem("total").access);

	// A page with nothing on it must still produce a well-formed record, because
	// consumers index on these keys.
	var empty = llms.modelPage({ id : "app", ctx : {} });
	t.ok(empty.id === "app", "an empty page falls back to the page id", empty.id);
	t.ok(empty.kind === "package", "and is treated as a package", empty.kind);
	t.ok(Array.isArray(empty.members) && empty.members.length === 0,
		"with an empty member list, not a missing one", JSON.stringify(empty.members));
	t.ok(Array.isArray(empty.meta) && empty.meta.length === 0, "and an empty meta list");
	t.ok(empty.description === "", "and an empty description");
	t.ok(empty.line === null, "a missing line is null, not undefined",
		JSON.stringify(empty.line));
	t.ok(empty.package === null, "a missing package is null");

	var noCtx = llms.modelPage({ id : "bare" });
	t.ok(noCtx.id === "bare", "a page with no entity at all still yields a record", noCtx.id);

	// ------------------------------------------------------------------
	t.section("llms: a parameter keeps its sub-properties");
	// ------------------------------------------------------------------
	// Documon documents an object argument's shape with a dotted name, which parseFlag
	// files under the parent as "children". modelPage used to flatten a parameter to
	// name/type/description, so "@param {string} opts.timeout" reached the HTML and was
	// then dropped from model.json, llms-full.txt and the embedded JSON-LD -- the readers
	// that cannot fall back to looking at the page.
	var nested = llms.modelPage({
		ctx : {
			id : "app.Widget", klass : "Widget", entity : "class", package : "app",
			methods : [ {
				id : "app.Widget.open", name : "open", entity : "method",
				params : [ {
					name : "opts", type : "object", text : "Options.",
					children : [
						{ name : "timeout", type : "number", text : "Milliseconds.", defaultVal : "500" },
						{ name : "quiet", type : "boolean", text : "Say nothing.", optional : true }
					]
				} ]
			} ]
		}
	});

	var openParams = nested.members[0].params;

	t.ok(openParams.length === 1, "the parent parameter is emitted once",
		JSON.stringify(openParams.map(function(p2){ return p2.name; })));
	t.ok(openParams[0].children.length === 2, "carrying its sub-properties",
		JSON.stringify(openParams[0].children));
	t.ok(openParams[0].children[0].name === "timeout"
		&& openParams[0].children[0].type === "number",
		"each with its own name and type", JSON.stringify(openParams[0].children[0]));
	t.ok(openParams[0].children[0]["default"] === "500",
		"a documented default reaches the model",
		JSON.stringify(openParams[0].children[0]["default"]));
	t.ok(openParams[0].children[1].optional === true,
		"and so does optionality", JSON.stringify(openParams[0].children[1].optional));
	t.ok(openParams[0].optional === false && openParams[0]["default"] === null,
		"a plain parameter reports both explicitly rather than omitting them",
		JSON.stringify(openParams[0]));
	t.ok(Array.isArray(openParams[0].children[0].children),
		"children is always an array, at every depth");

	// ------------------------------------------------------------------
	t.section("llms: the files a build writes");
	// ------------------------------------------------------------------
	var proj = t.project({
		src : {
			"good.js" : [
				t.OPEN,
				" * A well-formed module.",
				" * @module  good",
				" * @package fixture",
				" " + t.CLOSE,
				"",
				t.OPEN,
				" * Adds two numbers.",
				" * @method  add",
				" * @param   {number} a - First addend.",
				" * @param   {number} b - Second addend.",
				" * @return  {number}   - The sum.",
				" " + t.CLOSE
			]
		}
	});

	t.cli(["-i", proj.src, "-o", proj.out, "-n", "Fixture", "-v", "9.9"], proj.dir);
	var docs = path.join(proj.out, "docs");

	t.ok(fs.existsSync(path.join(docs, "llms.txt")), "wrote llms.txt");
	t.ok(fs.existsSync(path.join(docs, "llms-full.txt")), "wrote llms-full.txt");
	t.ok(fs.existsSync(path.join(docs, "model.json")), "wrote model.json");

	var model = t.readJson(path.join(docs, "model.json"));
	t.ok(model.generator === "documon", "model.json identifies its generator", model.generator);
	t.ok(model.project === "Fixture", "and the project name", model.project);
	// -v 9.9 arrives through minimist, which parses a bare numeric argument as a number.
	t.ok(String(model.version) === "9.9", "and the version", JSON.stringify(model.version));
	t.ok(Array.isArray(model.pages) && model.pages.length > 0, "and lists pages");

	var goodPage = model.pages.filter(function(p){ return p.id === "fixture.good"; })[0];
	t.ok(goodPage !== undefined, "model.json contains the module",
		"ids: " + model.pages.map(function(p){ return p.id; }).join(", "));
	t.ok(goodPage && goodPage.kind === "module", "records the entity kind",
		goodPage && goodPage.kind);

	var addMethod = goodPage && goodPage.members.filter(function(m){ return m.name === "add"; })[0];
	t.ok(addMethod !== undefined, "records the method");
	t.ok(addMethod && addMethod.params.length === 2, "records both parameters",
		addMethod && JSON.stringify(addMethod.params.map(function(p){ return p.name; })));
	t.ok(addMethod && addMethod.returns && addMethod.returns.type === "number",
		"records the return type");

	var full = t.read(path.join(docs, "llms-full.txt"));
	t.ok(/add/.test(full), "llms-full.txt mentions the method");
	t.ok(full.indexOf("<p>") === -1, "and contains no HTML tags",
		full.slice(0, 200));

	var index = t.read(path.join(docs, "llms.txt"));
	t.ok(/Fixture/.test(index), "llms.txt names the project", index.slice(0, 200));

	// ------------------------------------------------------------------
	t.section("llms: opting out");
	// ------------------------------------------------------------------
	var plain = t.project({ src : { "good.js" : t.block(["A module.", "@module g", "@package p"]) } });
	t.cli(["-i", plain.src, "-o", plain.out, "--no-emitLlms", "--no-emitModel"], plain.dir);

	t.ok( ! fs.existsSync(path.join(plain.out, "docs", "llms.txt")),
		"--no-emitLlms suppresses llms.txt");
	t.ok( ! fs.existsSync(path.join(plain.out, "docs", "llms-full.txt")),
		"--no-emitLlms suppresses llms-full.txt");
	t.ok( ! fs.existsSync(path.join(plain.out, "docs", "model.json")),
		"--no-emitModel suppresses model.json");
	t.ok(fs.existsSync(path.join(plain.out, "docs", "index.html")),
		"but the HTML is still written");

	// The two flags are independent.
	var onlyModel = t.project({ src : { "good.js" : t.block(["A module.", "@module g", "@package p"]) } });
	t.cli(["-i", onlyModel.src, "-o", onlyModel.out, "--no-emitLlms"], onlyModel.dir);
	t.ok(fs.existsSync(path.join(onlyModel.out, "docs", "model.json")),
		"--no-emitLlms alone leaves model.json in place");
	t.ok( ! fs.existsSync(path.join(onlyModel.out, "docs", "llms.txt")),
		"and still suppresses llms.txt");
};
