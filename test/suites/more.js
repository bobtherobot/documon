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

	t.ok(more.pageId("185.Tags/@implements.md") === "more.tags._implements_md",
		"characters that are not id-safe become underscores",
		more.pageId("185.Tags/@implements.md"));

	// The prefix is only stripped when the character immediately before the delimiter is
	// a digit, so an ordinary dotted name is left intact.
	t.ok(more.pageId("About.md") === "more.about_md",
		"an unnumbered file keeps its extension in the id -- number your prose files",
		more.pageId("About.md"));

	t.ok(more.pageId("notanumber.Thing.md") === "more.notanumber_thing_md",
		"a non-numeric prefix is not treated as sorting",
		more.pageId("notanumber.Thing.md"));

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
				" * [a tag page](more.tags._implements_md) and [a typo](more.nosuchpage).",
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
