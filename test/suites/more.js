/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/more.js`, which merges the hand-written markdown in the "more" folder into
 * the generated site.
 *
 * Ordering and hierarchy come from numeric filename prefixes that are stripped at the
 * `moreQuirkDelimiter`, so `050.Quick Reference.md` sorts by `050` and displays as
 * "Quick Reference". `pageId()` derives the id a prose page will be filed under, and
 * `check.js` calls the very same function so a cross-link is validated exactly the way
 * the site will resolve it -- a second copy of that derivation would drift and start
 * reporting working links as broken.
 *
 * @module  suites/more
 * @package test
 */

var path = require('path');
var fs   = require('fs');

exports.name = "more: the prose folder";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var more = t.src("more");

	// ------------------------------------------------------------------
	t.section("more: pageId strips the sorting prefix");
	// ------------------------------------------------------------------
	t.ok(more.pageId("104.Options.md") === "more.options",
		"a numbered file drops its number and extension", more.pageId("104.Options.md"));

	t.ok(more.pageId("050.Quick Reference.md") === "more.quick_reference",
		"spaces become underscores", more.pageId("050.Quick Reference.md"));

	t.ok(more.pageId("101.About.md") === "more.about",
		"any number works", more.pageId("101.About.md"));

	t.ok(more.pageId("300.More Docs/010.Sub.md") === "more.more_docs.sub",
		"a numbered folder contributes a segment", more.pageId("300.More Docs/010.Sub.md"));

	t.ok(more.pageId("185.Tags/@implements.md") === "more.tags._implements",
		"characters that are not id-safe become underscores",
		more.pageId("185.Tags/@implements.md"));

	// The extension comes off whether or not there is a sorting prefix. It used to survive
	// the no-prefix path -- the early return handed back the raw filename rather than the
	// basename computed just above it -- so an unnumbered "About.md" ided as
	// "more.about_md" and displayed in the menu with a visible ".md".
	t.ok(more.pageId("About.md") === "more.about",
		"an unnumbered file still loses its extension",
		more.pageId("About.md"));

	// The prefix is only stripped when the character immediately before the delimiter is
	// a digit, so an ordinary dotted name keeps both of its segments.
	t.ok(more.pageId("notanumber.Thing.md") === "more.notanumber_thing",
		"a non-numeric prefix is not treated as sorting",
		more.pageId("notanumber.Thing.md"));

	// Only the last extension goes: "Guide.md.md" is a file called "Guide.md".
	t.ok(more.pageId("Guide.md.md") === "more.guide_md",
		"and only one extension is removed",
		more.pageId("Guide.md.md"));

	t.ok(more.pageId("104.Options.md").indexOf("more.") === 0,
		"every prose id is namespaced under 'more'");

	// ------------------------------------------------------------------
	t.section("more: pageId honours a custom delimiter");
	// ------------------------------------------------------------------
	t.ok(more.pageId("104-Options.md", "-") === "more.options",
		"a custom delimiter splits the number off",
		more.pageId("104-Options.md", "-"));

	// The delimiter override must not leak into the next call -- it is module state.
	t.ok(more.pageId("104.Options.md") === "more.options",
		"the default delimiter is restored afterwards",
		more.pageId("104.Options.md"));

	// ------------------------------------------------------------------
	t.section("more: prose pages are built into the site");
	// ------------------------------------------------------------------
	var proj = t.project({
		src : {
			"thing.js" : t.block(["A thing.", "@module thing", "@package app"])
		},
		more : {
			"104.Options.md"         : "# Options\n\nSome prose about options.\n",
			"050.Quick Reference.md" : "# Quick Reference\n\nA table would go here.\n",
			"185.Tags/@implements.md": "# implements\n\nAbout the tag.\n"
		}
	});

	var built = t.cli(["-i", proj.src, "-o", proj.out, "-m", proj.more, "-n", "Proj"], proj.dir);
	var docs  = path.join(proj.out, "docs");

	t.ok(built.status === 0, "a build with a more folder succeeds",
		"exit " + built.status + "\n" + built.stdout.slice(-400));

	var written = fs.readdirSync(docs);
	t.ok(written.filter(function(f){ return /^more\./.test(f); }).length >= 2,
		"prose pages are written", JSON.stringify(written.filter(function(f){ return /^more\./.test(f); })));

	t.ok(fs.existsSync(path.join(docs, "more.options.html")),
		"a prose page is named by its derived id", JSON.stringify(written));

	var optionsPage = t.read(path.join(docs, "more.options.html"));
	t.ok(/Some prose about options\./.test(optionsPage), "with its content rendered",
		optionsPage.slice(0, 300));
	t.ok(/<h1/.test(optionsPage), "as markdown, not as raw text");

	// The prose page joins the menu, under the display name rather than the filename.
	var menuData = t.read(path.join(docs, "_menuData.js"));
	t.ok(/Options/.test(menuData), "the prose page reaches the menu");
	// The label is the display name; "basepath" legitimately keeps the numbered source
	// path, because that is what the source link points at.
	t.ok(/"label"\s*:\s*"Options"/.test(menuData),
		"under its display name, not its numbered filename",
		(menuData.match(/"label"[^,]*/g) || []).join(" "));
	t.ok(/"basepath"\s*:\s*"more\/104\.Options"/.test(menuData),
		"while the numbered path is kept for the source link",
		(menuData.match(/"basepath"[^,]*/g) || []).join(" "));
	t.ok(/Quick Reference/.test(menuData), "and so does a page with a space in its name");

	// A nested folder becomes a nested menu entry.
	t.ok(/Tags/.test(menuData), "a prose folder contributes a menu entry");

	// ------------------------------------------------------------------
	t.section("more: the meta header is read on every page");
	// ------------------------------------------------------------------
	// metaRx is module-level and reused for every page. It used to carry the "g" flag,
	// which makes test() stateful: it matched, left lastIndex past the boundary, missed on
	// the next page, reset, and matched again. Meta headers therefore applied to every
	// *other* page -- and the ones that missed rendered their raw JSON as body text.
	// Three pages is the minimum that catches it; two would pass by luck.
	function metaPage(title){
		return '{\n"icon" : "fa-star"\n}\n__meta__\n\n# ' + title + '\n\nBody of ' + title + '.\n';
	}

	var metaProj = t.project({
		src  : { "thing.js" : t.block(["A thing.", "@module thing", "@package app"]) },
		more : {
			"01.One.md"   : metaPage("One"),
			"02.Two.md"   : metaPage("Two"),
			"03.Three.md" : metaPage("Three")
		}
	});

	var metaBuilt = t.cli(["-i", metaProj.src, "-o", metaProj.out, "-m", metaProj.more, "-n", "P"],
		metaProj.dir);
	t.ok(metaBuilt.status === 0, "a build with meta headers succeeds",
		"exit " + metaBuilt.status + "\n" + metaBuilt.stdout.slice(-300));

	var metaDocs = path.join(metaProj.out, "docs");
	var metaMenu = t.read(path.join(metaDocs, "_menuData.js"));
	var icons = (metaMenu.match(/"kind"\s*:\s*"fa-star"/g) || []).length;

	t.ok(icons === 3, "every page's icon is applied, not every other one",
		icons + " of 3\n" + (metaMenu.match(/"kind"[^,]*/g) || []).join(" "));

	// The other half of the same bug: a page whose meta went unread kept the JSON.
	["one", "two", "three"].forEach(function(name){
		var page = t.read(path.join(metaDocs, "more." + name + ".html"));
		t.ok(page.indexOf("fa-star") === -1,
			"more." + name + " does not leak its raw meta into the body",
			page.slice(0, 400));
		t.ok(/Body of/.test(page), "and still renders its markdown", page.slice(0, 200));
	});

	// A url in the meta turns the entry into an external link instead of a page.
	var extProj = t.project({
		src  : { "thing.js" : t.block(["A thing.", "@module thing", "@package app"]) },
		more : {
			"01.Local.md" : "# Local\n",
			"02.Away.md"  : '{\n"url" : "https://example.com/away"\n}\n__meta__\n\n# Away\n'
		}
	});
	t.cli(["-i", extProj.src, "-o", extProj.out, "-m", extProj.more, "-n", "P"], extProj.dir);
	var extMenu = t.read(path.join(extProj.out, "docs", "_menuData.js"));
	t.ok(/"url"\s*:\s*"https:\/\/example.com\/away"/.test(extMenu),
		"a meta url becomes the menu target",
		(extMenu.match(/"url"[^,]*/g) || []).join(" "));
	t.ok( ! fs.existsSync(path.join(extProj.out, "docs", "more.away.html")),
		"and no page is written for it");

	// ------------------------------------------------------------------
	t.section("more: ordering comes from the numbers");
	// ------------------------------------------------------------------
	// "050" sorts before "104" even though "Quick Reference" sorts after "Options"
	// alphabetically, which is the entire point of the numbering scheme.
	var quickAt   = menuData.indexOf("Quick Reference");
	var optionsAt = menuData.indexOf("Options");
	t.ok(quickAt > -1 && optionsAt > -1 && quickAt < optionsAt,
		"the numeric prefix decides the order, not the alphabet",
		"quick@" + quickAt + " options@" + optionsAt);

	// ------------------------------------------------------------------
	t.section("more: prose pages resolve as link targets");
	// ------------------------------------------------------------------
	// check.js validates cross-links against the same ids the site builds, so a link
	// into the prose folder must resolve and a typo must still be caught.
	var linked = t.project({
		src : {
			"thing.js" : [
				t.OPEN,
				" * A thing.",
				" *",
				" * See [options](more.options), [the tags folder](more.tags),",
				" * [a tag page](more.tags._implements) and [a typo](more.nosuchpage).",
				" * @module  thing",
				" * @package app",
				" " + t.CLOSE
			]
		},
		more : {
			"104.Options.md"          : "# Options\n",
			"185.Tags/@implements.md" : "# implements\n"
		}
	});

	var report = t.check(["-i", linked.src, "-m", linked.more], linked.dir).report;
	var broken = t.findings(report, "broken-link");

	t.ok(broken.length === 1, "a valid prose link resolves", JSON.stringify(broken));
	t.ok(broken.length === 1 && broken[0].message.indexOf("more.nosuchpage") > -1,
		"and a mistyped one is still reported",
		broken.length ? broken[0].message : "nothing reported");

	// ------------------------------------------------------------------
	t.section("more: cross-links in the prose itself are validated");
	// ------------------------------------------------------------------
	// The broken-link rule used to read source comments only, which is exactly why every
	// stale id in Documon's own manual survived -- tag pages pointing at "more.tags.class"
	// when the page is filed as "more.tags._class", guides pointing at pages that moved.
	var proseLinks = t.project({
		src : { "thing.js" : t.block(["A thing.", "@module thing", "@package app"]) },
		more : {
			"01.Good.md" : [
				"# Good",
				"",
				"Links to [the other page](more.bad), [a folder](more.tags),",
				"[a tag page](more.tags._implements) and [the API](app.thing).",
				""
			].join("\n"),
			"02.Bad.md" : [
				"# Bad",
				"",
				"This one points at [nothing at all](more.nosuchpage).",
				""
			].join("\n"),
			"185.Tags/@implements.md" : "# implements\n"
		}
	});

	var proseReport = t.check(["-i", proseLinks.src, "-m", proseLinks.more], proseLinks.dir).report;
	var proseBroken = t.findings(proseReport, "broken-link");

	t.ok(proseBroken.length === 1, "exactly the one bad prose link is reported",
		JSON.stringify(proseBroken.map(function(f){ return f.message; })));
	t.ok(proseBroken.length === 1 && proseBroken[0].message.indexOf("more.nosuchpage") > -1,
		"naming the target that does not resolve",
		proseBroken.length ? proseBroken[0].message : "nothing reported");
	t.ok(proseBroken.length === 1 && /02\.Bad\.md$/.test(proseBroken[0].file),
		"and pointing at the markdown file it was written in",
		proseBroken.length ? proseBroken[0].file : "");
	t.ok(proseBroken.length === 1 && proseBroken[0].line === 3,
		"on the right line", proseBroken.length ? String(proseBroken[0].line) : "");

	// ------------------------------------------------------------------
	t.section("more: a partial --check does not accuse the manual");
	// ------------------------------------------------------------------
	// --check is routinely pointed at part of a project while the config still names the
	// whole more folder. Every prose link into the API then resolves against ids the run
	// was never going to collect. "documon --check -i test" on this repository reported six
	// broken links in more/150.Templates.md, all of them real ids in src/.
	//
	// So a target is judged only when its leading segment is a package this run actually
	// saw. Prose ids are always judged -- the more folder is always read in full.
	var partial = t.project({
		src : { "thing.js" : t.block(["A thing.", "@module thing", "@package app"]) },
		more : {
			"01.Page.md" : [
				"# Page",
				"",
				"Resolves: [thing](app.thing)",
				"",
				"Typo inside a package we scanned: [oops](app.nosuchthing)",
				"",
				"A package this run never read: [other](vendor.Widget)",
				"",
				"A prose page that does not exist: [nope](more.nosuchpage)",
				""
			].join("\n")
		}
	});

	var partialReport = t.check(["-i", partial.src, "-m", partial.more], partial.dir).report;
	var partialBroken = t.findings(partialReport, "broken-link").map(function(f){
		return f.message;
	}).join(" | ");

	t.ok(partialBroken.indexOf("app.nosuchthing") > -1,
		"a typo inside a scanned package is still caught", partialBroken);
	t.ok(partialBroken.indexOf("more.nosuchpage") > -1,
		"and so is a bad prose id, always", partialBroken);
	t.ok(partialBroken.indexOf("vendor.Widget") === -1,
		"but a package this run never scanned is left alone", partialBroken);
	t.ok(partialBroken.indexOf("app.thing") === -1,
		"and a link that resolves says nothing", partialBroken);
	t.ok(t.findings(partialReport, "broken-link").length === 2,
		"exactly two findings, no more", partialBroken);

	// ------------------------------------------------------------------
	t.section("more: illustrative links in code blocks are not cross-references");
	// ------------------------------------------------------------------
	// The manual teaches the *shape* of an id with links that were never meant to resolve.
	// Flagging those would make the rule worthless, so code is skipped -- fenced, indented,
	// and indented inside a blockquote, which is how this manual writes examples.
	var teaching = t.project({
		src : { "thing.js" : t.block(["A thing.", "@module thing", "@package app"]) },
		more : {
			"01.Teaching.md" : [
				"# Teaching",
				"",
				"To link to a class, use the full path:",
				"",
				"\t[see Foo](package.Class.method)",
				"",
				"Or fenced:",
				"",
				"```",
				"[see Bar](some.other.Thing)",
				"```",
				"",
				"> Even inside a quote:",
				">",
				">\t\t[see Baz](yet.another.Thing)",
				"",
				"An image is not a cross-reference either: ![](assets/example.jpg)",
				""
			].join("\n")
		}
	});

	var teachReport = t.check(["-i", teaching.src, "-m", teaching.more], teaching.dir).report;
	t.ok(t.findings(teachReport, "broken-link").length === 0,
		"illustrative ids in code blocks and asset paths are left alone",
		JSON.stringify(t.findings(teachReport, "broken-link").map(function(f){
			return f.file + ":" + f.line + " " + f.message; })));

	// ------------------------------------------------------------------
	t.section("more: DOCS-GO-HERE places the generated docs");
	// ------------------------------------------------------------------
	// The generated source documentation is one subtree, and by default it is tacked onto
	// the end of the prose menu. A file whose name contains "DOCS-GO-HERE" says "put it
	// here instead": the placeholder is removed and the whole subtree takes its slot.

	/**
	 * Builds a project and returns its menu as a flat list of "id" strings, depth-first,
	 * which is the order the menu renders in.
	 *
	 * @method  menuIds
	 * @private
	 * @param   {object} spec - A t.project() spec.
	 * @return  {object}      - `{ ids, menu, docs }`.
	 */
	function menuIds(spec){

		var proj  = t.project(spec);
		var built = t.cli(["-i", proj.src, "-o", proj.out, "-m", proj.more, "-n", "P"], proj.dir);
		var docs  = path.join(proj.out, "docs");
		var raw   = t.read(path.join(docs, "_menuData.js"));
		var data  = eval(raw.replace(/^var MenuData =/, "(") + ")");
		var ids   = [];

		(function walk(nodes){
			(nodes || []).forEach(function(n){
				ids.push(n.id);
				walk(n.children);
			});
		})(data);

		return { ids : ids, menu : raw, docs : docs, status : built.status, stdout : built.stdout };
	}

	var SRC = { "thing.js" : t.block(["A thing.", "@module thing", "@package app"]) };

	// --- default: appended at the end
	var appended = menuIds({
		src : SRC,
		more : { "01.Alpha.md" : "# Alpha\n", "02.Beta.md" : "# Beta\n" }
	});
	t.ok(appended.ids.indexOf("root-packages") > appended.ids.indexOf("more.beta"),
		"without a placeholder the generated docs go last",
		JSON.stringify(appended.ids));

	// --- placed: the subtree takes the placeholder's slot
	var placed = menuIds({
		src : SRC,
		more : {
			"01.Alpha.md"          : "# Alpha\n",
			"02.DOCS-GO-HERE.md"   : "",
			"03.Beta.md"           : "# Beta\n"
		}
	});
	t.ok(placed.ids.indexOf("more.alpha") < placed.ids.indexOf("root-packages")
		&& placed.ids.indexOf("root-packages") < placed.ids.indexOf("more.beta"),
		"the generated docs land exactly where the placeholder sat",
		JSON.stringify(placed.ids));
	t.ok(placed.menu.indexOf("DOCS-GO-HERE") === -1,
		"and the placeholder itself is gone from the menu",
		JSON.stringify(placed.ids));
	t.ok( ! fs.existsSync(path.join(placed.docs, "more.docs_go_here.html")),
		"no page is written for it",
		JSON.stringify(fs.readdirSync(placed.docs).filter(function(f){ return /^more\./.test(f); })));

	// --- the name only has to contain the string, and the file need not be empty
	var loose = menuIds({
		src : SRC,
		more : {
			"01.Alpha.md"                  : "# Alpha\n",
			"02.foo-DOCS-GO-HERE-bar.md"   : "this content is ignored\n",
			"03.Beta.md"                   : "# Beta\n"
		}
	});
	t.ok(loose.ids.indexOf("more.alpha") < loose.ids.indexOf("root-packages")
		&& loose.ids.indexOf("root-packages") < loose.ids.indexOf("more.beta"),
		"surrounding text in the filename is allowed", JSON.stringify(loose.ids));
	t.ok(loose.menu.indexOf("this content is ignored") === -1,
		"and its content is never rendered");

	// --- matching is case sensitive, so a lower-case file is an ordinary page
	var cased = menuIds({
		src : SRC,
		more : { "01.Alpha.md" : "# Alpha\n", "02.docs-go-here.md" : "# Not a marker\n" }
	});
	t.ok(cased.ids.indexOf("more.docs_go_here") > -1
		&& cased.ids.indexOf("root-packages") > cased.ids.indexOf("more.docs_go_here"),
		"a lower-case name is not a placeholder -- it is just a page",
		JSON.stringify(cased.ids));

	// --- inside a folder, the docs nest there
	var nested = menuIds({
		src : SRC,
		more : {
			"01.Alpha.md"                : "# Alpha\n",
			"02.Guide/01.Intro.md"       : "# Intro\n",
			"02.Guide/02.DOCS-GO-HERE.md": "",
			"02.Guide/03.Outro.md"       : "# Outro\n"
		}
	});
	t.ok(nested.ids.indexOf("more.guide.intro") < nested.ids.indexOf("root-packages")
		&& nested.ids.indexOf("root-packages") < nested.ids.indexOf("more.guide.outro"),
		"a placeholder inside a folder nests the generated docs in that folder",
		JSON.stringify(nested.ids));

	// --- a leftover second placeholder must not survive as a dead menu entry
	//
	// newItem() pushes every page into its parent's children before the placeholder check
	// runs, and only the *first* placeholder is spliced back out when the docs take its
	// slot. A second one therefore stayed in the menu as a clickable entry -- while "skip"
	// meant no html was ever written for it, so the nav led to a 404.
	var stray = menuIds({
		src : SRC,
		more : {
			"01.Alpha.md"                      : "# Alpha\n",
			"02.DOCS-GO-HERE.md"               : "",
			"03.Beta.md"                       : "# Beta\n",
			"04.old-DOCS-GO-HERE-scratch.md"   : "leftover\n"
		}
	});
	t.ok(stray.menu.indexOf("DOCS-GO-HERE") === -1,
		"a leftover second placeholder leaves nothing in the menu",
		JSON.stringify(stray.ids));
	t.ok(stray.ids.indexOf("more.old_docs_go_here_scratch") === -1,
		"not even under its cleaned id", JSON.stringify(stray.ids));
	t.ok(stray.ids.indexOf("more.alpha") < stray.ids.indexOf("root-packages")
		&& stray.ids.indexOf("root-packages") < stray.ids.indexOf("more.beta"),
		"and the first one still decides the position", JSON.stringify(stray.ids));

	// Every id the menu offers must correspond to a page that exists. This is the
	// assertion that actually caught the leftover: it was in the menu, with a url.
	var strayMissing = stray.ids.filter(function(id){
		return /^more\./.test(id) && ! fs.existsSync(path.join(stray.docs, id + ".html"));
	});
	t.ok(strayMissing.length === 0,
		"and no prose entry in the menu points at a page that was never written",
		JSON.stringify(strayMissing));

	// --- a placeholder on its own is still a valid way to say "docs first"
	var only = menuIds({
		src  : SRC,
		more : { "01.DOCS-GO-HERE.md" : "" }
	});
	t.ok(only.status === 0, "a more folder holding only a placeholder builds",
		"exit " + only.status + "\n" + only.stdout.slice(-300));
	t.ok(only.ids.indexOf("root-packages") === 0,
		"and puts the generated docs at the top", JSON.stringify(only.ids));

	// ------------------------------------------------------------------
	t.section("more: a missing or empty folder");
	// ------------------------------------------------------------------
	var noMore = t.project({ src : { "thing.js" : t.block(["A thing.", "@module thing", "@package app"]) } });
	var noMoreBuild = t.cli(["-i", noMore.src, "-o", noMore.out,
		"-m", path.join(noMore.dir, "does-not-exist"), "-n", "P"], noMore.dir);
	t.ok(noMoreBuild.status === 0, "a missing more folder does not fail the build",
		"exit " + noMoreBuild.status + "\n" + noMoreBuild.stdout.slice(-300));
	t.ok(fs.existsSync(path.join(noMore.out, "docs", "index.html")),
		"and the site is still written");

	var emptyMore = t.project({
		src  : { "thing.js" : t.block(["A thing.", "@module thing", "@package app"]) },
		more : {}
	});
	fs.mkdirSync(emptyMore.more, { recursive : true });
	var emptyBuild = t.cli(["-i", emptyMore.src, "-o", emptyMore.out, "-m", emptyMore.more, "-n", "P"],
		emptyMore.dir);
	t.ok(emptyBuild.status === 0, "an empty more folder does not fail the build",
		"exit " + emptyBuild.status);
};
