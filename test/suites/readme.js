/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Runs a realistic project through every workflow the README documents, from both the
 * command line and Node, and checks that the results are actually right.
 *
 * The rest of the suite tests modules in isolation and builds small throwaway projects.
 * This one takes `test/fixtures/project` -- a small library with two packages, a class
 * that extends another across files, package-level members split across two files, a
 * "more" folder, and files that are supposed to be skipped -- and asserts the exact
 * output it should produce. If Documon quietly starts documenting something it should
 * not, or stops documenting something it should, it shows up here as a diff in a list of
 * ids rather than as a vague "a file exists" pass.
 *
 * It also asserts that the CLI and the Node API produce *identical* output for the same
 * input, which is the claim the README's two Quick Start blocks make side by side.
 *
 * @module  suites/readme
 * @package test
 */

var path = require('path');
var fs   = require('fs');

exports.name = "readme: the documented workflows";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var FIXTURE = path.join(t.FIXTURES, "project");
	var SRC     = path.join(FIXTURE, "src");
	var MORE    = path.join(FIXTURE, "more");

	/**
	 * Copies a folder tree, so a test can write into a throwaway copy of the fixture.
	 *
	 * Deliberately hand-rolled rather than calling `dirutils.copy` -- a test should not
	 * lean on the code it is checking to set itself up.
	 *
	 * @method  copyTree
	 * @private
	 * @param   {string} from - Source folder.
	 * @param   {string} to   - Destination folder.
	 */
	function copyTree(from, to){

		fs.mkdirSync(to, { recursive : true });

		var entries = fs.readdirSync(from);

		for(var i=0; i<entries.length; i++){

			var src = path.join(from, entries[i]);
			var dst = path.join(to, entries[i]);

			if( fs.statSync(src).isDirectory() ){
				copyTree(src, dst);
			} else {
				fs.writeFileSync(dst, fs.readFileSync(src));
			}
		}
	}

	/**
	 * A throwaway copy of the fixture project.
	 *
	 * @method  fixtureCopy
	 * @private
	 * @return  {object} - `{ dir, src, more }` absolute paths.
	 */
	function fixtureCopy(){
		var dir = path.join(t.tmp(), "project");
		copyTree(FIXTURE, dir);
		return { dir : dir, src : path.join(dir, "src"), more : path.join(dir, "more") };
	}

	/**
	 * Page ids from a model, sorted.
	 *
	 * @method  idsOf
	 * @private
	 * @param   {object} model - A parsed model.json.
	 * @return  {array}        - Sorted ids.
	 */
	function idsOf(model){
		return model.pages.map(function(p){ return p.id; }).sort();
	}

	/**
	 * A page out of a model.
	 *
	 * @method  pageOf
	 * @private
	 * @param   {object} model - A parsed model.json.
	 * @param   {string} id    - The page id.
	 * @return  {object}       - The page, or undefined.
	 */
	function pageOf(model, id){
		return model.pages.filter(function(p){ return p.id === id; })[0];
	}

	/**
	 * A member out of a page.
	 *
	 * @method  memberOf
	 * @private
	 * @param   {object} page - A model page.
	 * @param   {string} name - The member name.
	 * @return  {object}      - The member, or undefined.
	 */
	function memberOf(page, name){
		return ((page && page.members) || []).filter(function(m){ return m.name === name; })[0];
	}

	/**
	 * Member names of a page, sorted.
	 *
	 * @method  namesOf
	 * @private
	 * @param   {object} page - A model page.
	 * @return  {array}       - Sorted names.
	 */
	function namesOf(page){
		return ((page && page.members) || []).map(function(m){ return m.name; }).sort();
	}

	/**
	 * @property {string} EXPECTED_IDS - Every page the fixture should produce, and
	 * nothing else. Written out in full so an unexpected addition or disappearance is
	 * visible in the failure message.
	 */
	var EXPECTED_IDS = ["acme", "acme.Button", "acme.Widget", "root", "util", "util.format"].join(",");

	/**
	 * @property {string} EXPECTED_IDS_NO_IGNORE - What the same project produces when no
	 * ignore is configured. Ignoring is opt-in, so `widget.test.js` is documented like
	 * any other file; `vendor/` still drops out because it is a built-in default.
	 */
	var EXPECTED_IDS_NO_IGNORE = ["acme", "acme.AlsoShouldNotAppear", "acme.Button",
		"acme.Widget", "root", "util", "util.format"].join(",");

	// ==================================================================
	t.section("readme: the Node API, exactly as documented");
	// ==================================================================
	// The README's "In Node (javascript)" block, with the same option names it shows.
	var apiOut = path.join(t.tmp(), "api-out");
	var documon = require(path.join(t.ROOT, "index.js"));

	var result = documon({
		src         : SRC,
		out         : apiOut,
		more        : MORE,
		name        : "Acme",
		version     : "2.3.4",
		description : "One line about the project.",
		baseUrl     : "https://example.com/docs",
		ignore      : ["*.test.js", "vendor/**"],
		sourceExt   : ["js"],
		launch      : false,
		print       : false
	});

	t.ok(typeof documon === "function", "require(\"documon\") gives you a callable");
	t.ok(result && result.ok === true, "a good build reports ok:true",
		JSON.stringify(result));
	t.ok(result.exitCode === 0, "with exit code 0", JSON.stringify(result.exitCode));
	t.ok(Array.isArray(result.errors) && result.errors.length === 0, "and no errors");
	t.ok(typeof result.pages === "number" && result.pages > 0,
		"it reports how many pages it wrote", JSON.stringify(result.pages));
	t.ok(typeof result.files === "number" && result.files === 5,
		"and how many source files it read", JSON.stringify(result.files));
	t.ok(typeof result.out === "string" && result.out.length > 0,
		"and where it put them", JSON.stringify(result.out));

	// The README's error handling: `if( ! result.ok ){ process.exit(result.exitCode); }`
	var badResult = documon({ src : path.join(FIXTURE, "no-such-folder"), out : t.tmp() });
	t.ok(badResult.ok === false, "a bad build reports ok:false", JSON.stringify(badResult));
	t.ok(badResult.exitCode === 1, "with a non-zero exit code to pass to process.exit",
		JSON.stringify(badResult.exitCode));
	t.ok(badResult.errors.length > 0, "and says what was wrong",
		JSON.stringify(badResult.errors));

	// ==================================================================
	t.section("readme: the output is actually correct");
	// ==================================================================
	var apiDocs  = path.join(apiOut, "docs");
	var apiModel = t.readJson(path.join(apiDocs, "model.json"));

	t.ok(idsOf(apiModel).join(",") === EXPECTED_IDS,
		"exactly the expected pages were produced, and nothing else",
		idsOf(apiModel).join(","));

	// --- the base class
	var widget = pageOf(apiModel, "acme.Widget");
	t.ok(widget.kind === "class", "the base class is a class", widget.kind);
	t.ok(widget.package === "acme", "in the right package", widget.package);
	t.ok(/base widget/.test(widget.description), "with its description",
		JSON.stringify(widget.description));
	t.ok(widget.file === "src/core/widget.js", "and the file it came from", widget.file);
	t.ok(namesOf(widget).join(",") === "draw,drawn,hide,visible",
		"carrying exactly the members it declared", namesOf(widget).join(","));

	var draw = memberOf(widget, "draw");
	t.ok(draw.kind === "method", "draw is a method");
	t.ok(draw.returns && draw.returns.type === "boolean", "with its return type",
		JSON.stringify(draw.returns));
	t.ok(draw.params.length === 1, "and one top-level parameter",
		JSON.stringify(draw.params.map(function(p){ return p.name; })));
	t.ok(draw.params[0].name === "opts" && draw.params[0].type === "object",
		"named and typed as written", JSON.stringify(draw.params[0]));

	var hide = memberOf(widget, "hide");
	t.ok(hide.access === "protected", "@protected is carried through", hide.access);
	t.ok(hide.meta.length === 2, "its metadata tags are kept",
		JSON.stringify(hide.meta.map(function(m){ return m.tag; })));
	t.ok(hide.meta.some(function(m){ return m.tag === "deprecated"; }), "including @deprecated");
	t.ok(hide.meta.some(function(m){ return m.tag === "since"; }), "and @since");

	var visible = memberOf(widget, "visible");
	t.ok(visible.kind === "property", "visible is a property", visible.kind);
	t.ok(visible.type === "boolean", "with its type", visible.type);

	t.ok(memberOf(widget, "drawn").kind === "event", "drawn is an event",
		memberOf(widget, "drawn").kind);

	// --- the derived class
	var button = pageOf(apiModel, "acme.Button");
	t.ok(namesOf(button).join(",") === "click,draw,drawn,hide,visible",
		"the derived class carries its own members plus the inherited ones",
		namesOf(button).join(","));

	t.ok(memberOf(button, "click").inherited === null,
		"a member it declared itself is not marked inherited",
		JSON.stringify(memberOf(button, "click").inherited));
	t.ok(memberOf(button, "hide").inherited === "acme.Widget",
		"an inherited member names where it came from",
		JSON.stringify(memberOf(button, "hide").inherited));
	t.ok(memberOf(button, "visible").inherited === "acme.Widget",
		"inherited properties too");
	t.ok(memberOf(button, "drawn").inherited === "acme.Widget",
		"and inherited events");

	// An overridden member keeps the child's own definition, not the parent's.
	t.ok(memberOf(button, "draw").inherited === null,
		"an overridden member is the child's own, not a copy of the parent's",
		JSON.stringify(memberOf(button, "draw").inherited));
	t.ok(memberOf(button, "draw").id === "acme.Button.draw",
		"with the child's id", memberOf(button, "draw").id);

	t.ok(memberOf(button, "click").params[0].name === "times",
		"the derived class keeps its own parameters",
		JSON.stringify(memberOf(button, "click").params));

	// --- package-level members, contributed by two separate files
	var util = pageOf(apiModel, "util");
	t.ok(util.kind === "package", "a package with loose members is a package page", util.kind);
	t.ok(namesOf(util).join(",") === "alpha,bravo",
		"members from BOTH files that declared the package survive",
		namesOf(util).join(","));

	// --- a module inside a package
	var format = pageOf(apiModel, "util.format");
	t.ok(format.kind === "module", "a @module is a module page", format.kind);
	t.ok(namesOf(format).join(",") === "separator,slug",
		"with its own members", namesOf(format).join(","));
	t.ok(memberOf(format, "separator").access === "readonly",
		"@readonly is carried through", memberOf(format, "separator").access);
	t.ok(memberOf(format, "slug").returns.type === "string",
		"and return types are right", JSON.stringify(memberOf(format, "slug").returns));

	// ==================================================================
	t.section("readme: what must NOT be documented");
	// ==================================================================
	var serialized = JSON.stringify(apiModel);

	t.ok(serialized.indexOf("ShouldNotAppear") === -1,
		"the vendor folder is skipped by default");
	t.ok(serialized.indexOf("AlsoShouldNotAppear") === -1,
		"a file matching the ignore pattern is skipped");
	t.ok(serialized.indexOf("Not a source file") === -1,
		"a file with the wrong extension is never read");
	t.ok(idsOf(apiModel).indexOf("vendor") === -1,
		"and neither leaves a package behind", idsOf(apiModel).join(","));

	// The README is emphatic that nothing is inferred from code: these are real symbols
	// in the fixture with no tags of their own.
	t.ok(serialized.indexOf("prototype") === -1,
		"nothing is picked up from the code around the comments");

	// ==================================================================
	t.section("readme: the CLI and the Node API agree");
	// ==================================================================
	// The README shows both as equivalent ways in. Same input must mean same output.
	var cliOut = path.join(t.tmp(), "cli-out");
	// Run from a config-free folder. The fixture lives inside this repository, so a run
	// with the fixture as its working directory would walk up and find Documon's own
	// documon.json -- which sets an analytics id, and would show up here as a difference
	// between the two entry points that has nothing to do with either of them.
	var cliRun = t.cli([
		"-i", SRC, "-o", cliOut, "-m", MORE,
		"-n", "Acme", "-v", "2.3.4",
		"--description", "One line about the project.",
		"--baseUrl", "https://example.com/docs",
		"-g", "*.test.js",
		"-e", "js"
	], t.neutral());

	t.ok(cliRun.status === 0, "the CLI build succeeds", "exit " + cliRun.status
		+ "\n" + (cliRun.stdout + cliRun.stderr).slice(-400));

	var cliModel = t.readJson(path.join(cliOut, "docs", "model.json"));

	t.ok(idsOf(cliModel).join(",") === idsOf(apiModel).join(","),
		"the CLI produces the same pages as the Node API",
		idsOf(cliModel).join(",") + "  vs  " + idsOf(apiModel).join(","));

	t.ok(JSON.stringify(cliModel) === JSON.stringify(apiModel),
		"and a byte-identical model.json",
		"cli " + JSON.stringify(cliModel).length + " bytes vs api "
			+ JSON.stringify(apiModel).length + " bytes");

	// The rendered HTML should match too.
	var apiPage = t.read(path.join(apiDocs, "acme.Widget.html"));
	var cliPage = t.read(path.join(cliOut, "docs", "acme.Widget.html"));
	t.ok(apiPage === cliPage, "and identical rendered HTML",
		"api " + apiPage.length + " bytes vs cli " + cliPage.length + " bytes");

	// ==================================================================
	t.section("readme: npx documon ./src ./  (positional arguments)");
	// ==================================================================
	// The very first line of the Quick Start. Nothing else in the suite uses this form.
	var pos = fixtureCopy();
	var posRun = t.cli(["./src", "./"], pos.dir);

	t.ok(posRun.status === 0, "positional src and out work", "exit " + posRun.status
		+ "\n" + (posRun.stdout + posRun.stderr).slice(-400));
	t.ok(fs.existsSync(path.join(pos.dir, "docs", "index.html")),
		"writing ./docs as the README says",
		JSON.stringify(fs.readdirSync(pos.dir)));

	var posModel = t.readJson(path.join(pos.dir, "docs", "model.json"));
	t.ok(idsOf(posModel).join(",") === EXPECTED_IDS_NO_IGNORE,
		"producing every page, since this form configures no ignore",
		idsOf(posModel).join(","));
	t.ok(idsOf(posModel).indexOf("vendor") === -1,
		"though the built-in defaults still apply", idsOf(posModel).join(","));

	// name/version/description come from the fixture's package.json, as documented.
	t.ok(posModel.project === "acme-fixture",
		"project identity falls back to the nearest package.json", posModel.project);
	t.ok(String(posModel.version) === "2.3.4", "including the version",
		JSON.stringify(posModel.version));
	t.ok(/fixture library/.test(posModel.description || ""), "and the description",
		JSON.stringify(posModel.description));

	// ==================================================================
	t.section("readme: the flag form");
	// ==================================================================
	var flagProj = fixtureCopy();
	var flagRun  = t.cli(["-i", "./src", "-o", "./", "-n", "My Project", "-v", "1.0", "-p"],
		flagProj.dir);

	t.ok(flagRun.status === 0, "documon -i ./src -o ./ -n \"My Project\" -v 1.0 -p",
		"exit " + flagRun.status + "\n" + (flagRun.stdout + flagRun.stderr).slice(-400));
	t.ok(/Config/.test(flagRun.stdout), "-p prints what it resolved",
		flagRun.stdout.slice(0, 200));

	var flagModel = t.readJson(path.join(flagProj.dir, "docs", "model.json"));
	t.ok(flagModel.project === "My Project", "-n sets the project name", flagModel.project);
	t.ok(String(flagModel.version) === "1", "-v sets the version",
		JSON.stringify(flagModel.version));

	// ==================================================================
	t.section("readme: with a config file");
	// ==================================================================
	// "Put a documon.json beside your package.json and just run documon."
	var confProj = fixtureCopy();
	t.write(path.join(confProj.dir, "documon.json"), JSON.stringify({
		src         : "./src",
		out         : "./",
		name        : "My Project",
		version     : "1.0.0",
		description : "One line about the project.",
		ignore      : ["*.test.js"]
	}, null, "\t"));

	var confRun = t.bare(confProj.dir);
	t.ok(confRun.status === 0, "documon with no arguments at all",
		"exit " + confRun.status + "\n" + (confRun.stdout + confRun.stderr).slice(-400));

	var confModel = t.readJson(path.join(confProj.dir, "docs", "model.json"));
	t.ok(confModel.project === "My Project", "uses the config file's name", confModel.project);
	t.ok(String(confModel.version) === "1.0.0", "and version",
		JSON.stringify(confModel.version));
	t.ok(idsOf(confModel).join(",") === EXPECTED_IDS,
		"and builds the same project, ignore included", idsOf(confModel).join(","));

	// "It is found from anywhere in the project tree."
	var deep = path.join(confProj.dir, "src", "core");
	var deepRun = t.bare(deep);
	t.ok(deepRun.status === 0, "found from a sub-folder deep in the tree",
		"exit " + deepRun.status + "\n" + (deepRun.stdout + deepRun.stderr).slice(-400));

	// "a documon key inside package.json works too"
	var keyProj = fixtureCopy();
	var keyPkg  = t.readJson(path.join(keyProj.dir, "package.json"));
	keyPkg.documon = { src : "./src", out : "./", name : "From The Key" };
	t.write(path.join(keyProj.dir, "package.json"), JSON.stringify(keyPkg, null, "\t"));

	var keyRun = t.bare(keyProj.dir);
	t.ok(keyRun.status === 0, "a documon key inside package.json works too",
		"exit " + keyRun.status + "\n" + (keyRun.stdout + keyRun.stderr).slice(-400));
	t.ok(t.readJson(path.join(keyProj.dir, "docs", "model.json")).project === "From The Key",
		"and supplies the settings",
		t.readJson(path.join(keyProj.dir, "docs", "model.json")).project);

	// ==================================================================
	t.section("readme: check before you build");
	// ==================================================================
	var checkClean = t.cli(["--check", "-i", SRC, "-g", "*.test.js"], FIXTURE);
	t.ok(checkClean.status === 0, "documon --check -i ./src exits 0 on a clean project",
		"exit " + checkClean.status + "\n" + checkClean.stdout.slice(-400));

	var checkJson = t.check(["-i", SRC, "-g", "*.test.js"], FIXTURE);
	t.ok(checkJson.report.ok === true, "--check --json reports ok on the same project",
		JSON.stringify(checkJson.report.counts));
	t.ok(checkJson.report.counts.error === 0, "with no errors",
		JSON.stringify(checkJson.report.findings.filter(function(f){ return f.level === "error"; })));
	t.ok(checkJson.report.stats.entities > 10, "having found the entities",
		JSON.stringify(checkJson.report.stats));

	var checkCov = t.cli(["--check", "--coverage", "--json", "-i", SRC, "-g", "*.test.js"], FIXTURE);
	t.ok(JSON.parse(checkCov.stdout).coverage !== null,
		"--check --coverage adds the advisory",
		JSON.stringify(JSON.parse(checkCov.stdout).coverage));

	// "exits 2 if anything is wrong"
	var brokenProj = fixtureCopy();
	t.write(path.join(brokenProj.src, "broken.js"), [
		"/*" + "*",
		" * Extends something that was never documented.",
		" * @class   Broken",
		" * @package acme",
		" * @extends acme.NoSuchThing",
		" " + "*" + "/"
	].join("\n"));

	var brokenRun = t.cli(["--check", "-i", brokenProj.src, "-g", "*.test.js"], brokenProj.dir);
	t.ok(brokenRun.status === 2, "and exits 2 when something is wrong",
		"exit " + brokenRun.status);

	// The three documented exit codes, from the README's own list.
	t.ok(t.cli(["--check", "-i", SRC, "-g", "*.test.js"], FIXTURE).status === 0,
		"exit 0: success");
	t.ok(t.cli(["-i", path.join(FIXTURE, "no-such-folder"), "-o", t.tmp()]).status === 1,
		"exit 1: configuration error");
	t.ok(brokenRun.status === 2, "exit 2: check found problems");

	// ==================================================================
	t.section("readme: the more folder");
	// ==================================================================
	t.ok(fs.existsSync(path.join(apiDocs, "more.overview.html")),
		"a numbered prose page is built under its derived id",
		JSON.stringify(fs.readdirSync(apiDocs).filter(function(f){ return /^more/.test(f); })));
	t.ok(/acme.*library/i.test(t.read(path.join(apiDocs, "more.overview.html"))),
		"with its content rendered");
	t.ok(fs.existsSync(path.join(apiDocs, "more.guide.getting_started.html")),
		"and a page inside a prose folder keeps the folder in its id",
		JSON.stringify(fs.readdirSync(apiDocs).filter(function(f){ return /^more/.test(f); })));

	// Cross-links between prose and code resolve, in both directions.
	var linkReport = t.check(["-i", SRC, "-m", MORE, "-g", "*.test.js"], FIXTURE).report;
	t.ok(t.findings(linkReport, "broken-link").length === 0,
		"every cross-reference in the project resolves",
		JSON.stringify(t.findings(linkReport, "broken-link").map(function(f){ return f.message; })));

	// ==================================================================
	t.section("readme: machine readable output");
	// ==================================================================
	t.ok(fs.existsSync(path.join(apiDocs, "llms.txt")), "llms.txt is written");
	t.ok(fs.existsSync(path.join(apiDocs, "llms-full.txt")), "llms-full.txt is written");
	t.ok(fs.existsSync(path.join(apiDocs, "model.json")), "model.json is written");

	var llmsIndex = t.read(path.join(apiDocs, "llms.txt"));
	t.ok(/Acme/.test(llmsIndex), "llms.txt names the project", llmsIndex.slice(0, 200));
	t.ok(/acme\.Widget/.test(llmsIndex), "and indexes the code pages");
	t.ok(/Overview/i.test(llmsIndex), "and the prose pages too");
	t.ok(/example\.com\/docs/.test(llmsIndex), "using baseUrl to build absolute links");

	var llmsFull = t.read(path.join(apiDocs, "llms-full.txt"));
	t.ok(/base widget/i.test(llmsFull), "llms-full.txt contains the actual prose");
	t.ok(/draw/.test(llmsFull), "and the members");
	t.ok(llmsFull.indexOf("<p>") === -1 && llmsFull.indexOf("</div>") === -1,
		"as plain text, with no HTML left in it",
		(llmsFull.match(/<[a-z\/][^>]*>/g) || []).slice(0, 5).join(" "));

	t.ok(apiModel.generator === "documon", "model.json identifies its generator");
	t.ok(apiModel.baseUrl === "https://example.com/docs", "and records the base url",
		apiModel.baseUrl);

	// "Disable with --no-emitLlms / --no-emitModel"
	var plainOut = path.join(t.tmp(), "plain");
	t.cli(["-i", SRC, "-o", plainOut, "-g", "*.test.js", "--no-emitLlms", "--no-emitModel"], FIXTURE);
	t.ok( ! fs.existsSync(path.join(plainOut, "docs", "llms.txt")), "--no-emitLlms disables llms.txt");
	t.ok( ! fs.existsSync(path.join(plainOut, "docs", "model.json")), "--no-emitModel disables model.json");
	t.ok(t.read(path.join(plainOut, "docs", "acme.Widget.html")).indexOf("application/ld+json") === -1,
		"and the embedded JSON-LD with it, since it is the same record");
	t.ok(fs.existsSync(path.join(plainOut, "docs", "index.html")), "while the site is still built");

	// ==================================================================
	t.section("readme: a static, searchable site with no server");
	// ==================================================================
	t.ok(fs.existsSync(path.join(apiDocs, "index.html")), "there is an index page");
	t.ok(fs.existsSync(path.join(apiDocs, "_searchData.js")), "search ships as a static file");
	t.ok(fs.existsSync(path.join(apiDocs, "_menuData.js")), "and so does the menu");

	var searchData = t.read(path.join(apiDocs, "_searchData.js"));
	t.ok(/acme\.Widget/.test(searchData), "the search index covers the classes",
		searchData.slice(0, 200));
	t.ok(/acme\.Button\.click/.test(searchData), "and the members");

	var menuData = t.read(path.join(apiDocs, "_menuData.js"));
	t.ok(/acme/.test(menuData) && /util/.test(menuData), "the menu covers both packages");
	t.ok(/Overview/.test(menuData), "and the prose pages");

	// Every page the menu links to has to exist, or the shipped site has dead links.
	var linked = (menuData.match(/"url"\s*:\s*"([^"#]+\.html)/g) || [])
		.map(function(x){ return x.replace(/.*"/, ""); });
	var deadLinks = linked.filter(function(f){ return ! fs.existsSync(path.join(apiDocs, f)); });
	t.ok(linked.length > 5, "the menu links to a number of pages", JSON.stringify(linked.length));
	t.ok(deadLinks.length === 0, "and every page it links to exists",
		JSON.stringify(deadLinks));

	// Nothing server-side: the pages are plain files with no build-time absolute paths
	// leaking out of the machine that built them.
	var widgetHtml = t.read(path.join(apiDocs, "acme.Widget.html"));
	t.ok(widgetHtml.indexOf(t.ROOT) === -1,
		"a generated page carries no absolute local paths");
	t.ok(/Widget/.test(widgetHtml) && /draw/.test(widgetHtml),
		"and does contain the documentation");
	t.ok(/rel="canonical"/.test(widgetHtml), "with a canonical link, since baseUrl was set");

	// ==================================================================
	t.section("readme: pages carry social metadata");
	// ==================================================================
	// The v2.7.0 changelog says generated pages carry "a real meta description, canonical
	// link and Open Graph tags". Those tags used to be on index.html alone, which is the
	// one page nobody links to directly -- it is the class and module pages that get
	// cited and shared.
	/**
	 * Pulls the Open Graph and twitter meta tags out of a page.
	 *
	 * @method  ogOf
	 * @private
	 * @param   {string} html - The rendered page.
	 * @return  {object}      - Property name to content.
	 */
	function ogOf(html){

		var found = {};
		var tags  = html.match(/<meta (?:property|name)="(?:og|twitter):[^"]+" content="[^"]*">/g) || [];

		for(var i=0; i<tags.length; i++){
			var parts = tags[i].match(/"((?:og|twitter):[^"]+)" content="([^"]*)"/);
			found[ parts[1] ] = parts[2];
		}

		return found;
	}

	var widgetOg = ogOf( t.read(path.join(apiDocs, "acme.Widget.html")) );

	t.ok(widgetOg["og:type"] === "article",
		"a content page is an article, not a website", JSON.stringify(widgetOg));
	t.ok(widgetOg["og:title"] === "Widget - Acme",
		"with a title that identifies the page and the project", widgetOg["og:title"]);
	t.ok(/base widget/.test(widgetOg["og:description"] || ""),
		"a description taken from the entity's own prose",
		JSON.stringify(widgetOg["og:description"]));
	t.ok(widgetOg["og:site_name"] === "Acme", "the project as the site name",
		widgetOg["og:site_name"]);
	t.ok(widgetOg["og:url"] === "https://example.com/docs/acme.Widget.html",
		"and an absolute url built from baseUrl", widgetOg["og:url"]);
	t.ok(widgetOg["twitter:card"] === "summary", "plus a twitter card type");

	// The description must be the real description, never the id -- an id makes a
	// useless preview and a useless search result.
	t.ok(widgetOg["og:description"] !== "acme.Widget",
		"never the bare id", widgetOg["og:description"]);

	// Every generated page, of every kind, carries them.
	var everyPage = fs.readdirSync(apiDocs).filter(function(f){
		return /\.html$/.test(f) && f !== "__LAUNCH.html";
	});
	t.ok(everyPage.length > 5, "there are pages of several kinds to check",
		JSON.stringify(everyPage));

	var withoutOg = everyPage.filter(function(f){
		var og = ogOf( t.read(path.join(apiDocs, f)) );
		return ! og["og:title"] || ! og["og:description"] || ! og["og:type"];
	});
	t.ok(withoutOg.length === 0, "every generated page carries Open Graph tags",
		JSON.stringify(withoutOg));

	// Prose pages from the "more" folder go through the same template, so they get the
	// same treatment -- including a description drawn from the markdown body rather than
	// from the page id.
	var proseOg = ogOf( t.read(path.join(apiDocs, "more.overview.html")) );
	t.ok(proseOg["og:title"] === "Overview - Acme",
		"a prose page is titled and attributed too", proseOg["og:title"]);
	t.ok(proseOg["og:site_name"] === "Acme", "with the project as its site name",
		proseOg["og:site_name"]);
	t.ok(/one page/i.test(proseOg["og:description"] || ""),
		"and a description read out of the markdown body",
		JSON.stringify(proseOg["og:description"]));
	t.ok((proseOg["og:description"] || "").indexOf("more.overview") === -1,
		"rather than the page id", JSON.stringify(proseOg["og:description"]));
	t.ok(/rel="canonical"/.test(t.read(path.join(apiDocs, "more.overview.html"))),
		"and a canonical link, like any other page");

	// The index page keeps the tags it always had.
	var indexOg = ogOf( t.read(path.join(apiDocs, "index.html")) );
	t.ok(indexOg["og:type"] === "website", "the index is still a website, not an article",
		indexOg["og:type"]);
	t.ok(/Acme/.test(indexOg["og:title"] || ""), "and still names the project",
		indexOg["og:title"]);

	// og:url needs a real base to be absolute, so it is omitted rather than guessed at.
	var noBaseOut = path.join(t.tmp(), "no-base");
	t.cli(["-i", SRC, "-o", noBaseOut, "-n", "Acme", "-g", "*.test.js"], t.neutral());
	var noBaseOg = ogOf( t.read(path.join(noBaseOut, "docs", "acme.Widget.html")) );

	t.ok(noBaseOg["og:url"] === undefined,
		"without baseUrl there is no og:url to be wrong",
		JSON.stringify(noBaseOg["og:url"]));
	t.ok(noBaseOg["og:title"] === "Widget - Acme",
		"but the rest of the tags are still there", JSON.stringify(noBaseOg));
	t.ok(t.read(path.join(noBaseOut, "docs", "acme.Widget.html")).indexOf("rel=\"canonical\"") === -1,
		"and no canonical link either");

	// A name is whatever the author typed in the tag, so it can contain characters that
	// would end the attribute early and mangle the rest of the head.
	var oddProj = t.project({
		src : { "q.js" : t.block(['A class with an awkward name.', '@class Say"Hello"&Bye', '@package app']) }
	});
	t.cli(["-i", oddProj.src, "-o", oddProj.out, "-n", 'A&B "Quoted"'], oddProj.dir);

	var oddFile = fs.readdirSync(path.join(oddProj.out, "docs"))
		.filter(function(f){ return /^app\..*\.html$/.test(f); })[0];
	var oddHtml = t.read(path.join(oddProj.out, "docs", oddFile));
	var oddOg   = ogOf(oddHtml);

	t.ok(oddOg["og:title"] === "Say&quot;Hello&quot;&amp;Bye - A&amp;B &quot;Quoted&quot;",
		"quotes and ampersands in a name are escaped, not left to break the tag",
		JSON.stringify(oddOg["og:title"]));
	t.ok(oddOg["og:site_name"] === "A&amp;B &quot;Quoted&quot;",
		"and so are they in the project name", JSON.stringify(oddOg["og:site_name"]));
	t.ok(/<\/head>/.test(oddHtml), "the head still closes properly");

	// ==================================================================
	t.section("readme: the HTML is structured for readers and machines");
	// ==================================================================
	// llms.txt and model.json only help a consumer that knows to look for them. Whatever
	// lands on a single page -- a search crawler, a retrieval pipeline, a screen reader --
	// gets the HTML, so the HTML has to carry the structure too.
	var widgetPageHtml = t.read(path.join(apiDocs, "acme.Widget.html"));

	// --- a real document outline
	var headings = (widgetPageHtml.match(/<h([1-6])[^>]*class="([^"]*)"/g) || []);
	t.ok(headings.length > 3, "a content page has heading elements",
		JSON.stringify(headings.length));

	t.ok(/<h1[^>]*class="member-name/.test(widgetPageHtml),
		"the entity the page is about is its h1");
	t.ok((widgetPageHtml.match(/<h1/g) || []).length === 1,
		"and there is exactly one h1",
		JSON.stringify((widgetPageHtml.match(/<h1/g) || []).length));
	t.ok(/<h2[^>]*class="heading-part"/.test(widgetPageHtml),
		"each section is an h2");
	t.ok(/<h3[^>]*class="member-name/.test(widgetPageHtml),
		"and each member under it is an h3");

	// Sections and their members must nest correctly, or the outline is a lie.
	var order = (widgetPageHtml.match(/<h([1-3])/g) || []).map(function(x){ return x.slice(2); });
	t.ok(order[0] === "1", "the h1 comes first", JSON.stringify(order));
	t.ok(order.indexOf("3") > order.indexOf("2"),
		"and members come after the section heading they belong to", JSON.stringify(order));

	// --- stable ids to deep-link and anchor to
	t.ok(/id="acme\.Widget\.draw"/.test(widgetPageHtml),
		"members carry an id, not just a legacy name anchor");
	t.ok(/name="acme\.Widget\.draw"/.test(widgetPageHtml),
		"while the name anchor stays, so existing links keep working");

	var ids = (widgetPageHtml.match(/id="[^"]+"/g) || []);
	var dupeIds = ids.filter(function(x, i){ return ids.indexOf(x) !== i; });
	t.ok(dupeIds.length === 0, "and no id appears twice", JSON.stringify(dupeIds));

	// --- JSON-LD
	/**
	 * Pulls the JSON-LD node out of a page.
	 *
	 * @method  ldOf
	 * @private
	 * @param   {string} html - The rendered page.
	 * @return  {object}      - The parsed node, or null.
	 */
	function ldOf(html){
		var m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
		if( ! m ){
			return null;
		}
		try {
			return JSON.parse( m[1].replace(/<\\\//g, "</") );
		} catch(e) {
			return null;
		}
	}

	var ld = ldOf(widgetPageHtml);

	t.ok(ld !== null, "a content page embeds JSON-LD, and it parses");
	t.ok(ld["@context"] === "https://schema.org", "with the schema.org context",
		ld["@context"]);
	t.ok(ld["@type"] === "APIReference", "typed as an API reference", ld["@type"]);
	t.ok(ld.name === "Widget", "naming the entity", ld.name);
	t.ok(ld.identifier === "acme.Widget", "with its fully qualified id", ld.identifier);
	t.ok(ld.url === "https://example.com/docs/acme.Widget.html",
		"and an absolute url when baseUrl is set", ld.url);
	t.ok(ld.isPartOf && ld.isPartOf.name === "Acme", "attributed to the project",
		JSON.stringify(ld.isPartOf));

	// Descriptions are stored as markdown; a structured field should carry prose.
	t.ok(/base widget/.test(ld.description || ""), "carrying the real description",
		JSON.stringify(ld.description));
	t.ok((ld.description || "").indexOf("**") === -1,
		"flattened, rather than with markdown markers still in it",
		JSON.stringify(ld.description));

	// Members become parts, pointing at anchors that exist.
	var partNames = (ld.hasPart || []).map(function(x){ return x.name; }).sort();
	t.ok(partNames.join(",") === "draw,drawn,hide,visible",
		"every member of the page becomes a part", partNames.join(","));

	var kinds = {};
	(ld.hasPart || []).forEach(function(x){ kinds[x.name] = x.articleSection; });
	t.ok(kinds.draw === "method" && kinds.visible === "property" && kinds.drawn === "event",
		"each part records what kind of member it is", JSON.stringify(kinds));

	var partAnchors = (ld.hasPart || []).map(function(x){ return (x.url || "").split("#")[1]; })
		.filter(Boolean);
	var deadAnchors = partAnchors.filter(function(a){
		return widgetPageHtml.indexOf('id="' + a + '"') === -1;
	});
	t.ok(partAnchors.length === 4, "each part links to its own anchor",
		JSON.stringify(partAnchors));
	t.ok(deadAnchors.length === 0, "and every one of those anchors exists on the page",
		JSON.stringify(deadAnchors));

	// Every page kind carries structured data, prose pages included.
	var withoutLd = everyPage.filter(function(f){
		return ldOf( t.read(path.join(apiDocs, f)) ) === null;
	});
	t.ok(withoutLd.length === 0, "every generated page embeds JSON-LD",
		JSON.stringify(withoutLd));

	var proseLd = ldOf( t.read(path.join(apiDocs, "more.overview.html")) );
	t.ok(proseLd["@type"] === "TechArticle",
		"a prose page is an article rather than an API reference", proseLd["@type"]);
	t.ok(/one page/i.test(proseLd.description || ""),
		"described from its own markdown", JSON.stringify(proseLd.description));

	// --- the machine-readable companions are advertised from every page
	var withoutAlt = everyPage.filter(function(f){
		var html = t.read(path.join(apiDocs, f));
		return ! /rel="alternate"[^>]*llms\.txt/.test(html)
			|| ! /rel="alternate"[^>]*model\.json/.test(html);
	});
	t.ok(withoutAlt.length === 0,
		"every page points at llms.txt and model.json, not just the index",
		JSON.stringify(withoutAlt));

	// --- the embedded record agrees with the standalone one
	var widgetRecord = pageOf(apiModel, "acme.Widget");
	t.ok(ld.identifier === widgetRecord.id,
		"the embedded record is the same entity as the one in model.json");
	t.ok((ld.hasPart || []).length === widgetRecord.members.length,
		"with the same number of members",
		(ld.hasPart || []).length + " vs " + widgetRecord.members.length);

	// ==================================================================
	t.section("readme: rebuilding is idempotent");
	// ==================================================================
	// Building twice must give the same answer -- the output folder is emptied and
	// regenerated each time, and nothing should accumulate.
	var twiceOut = path.join(t.tmp(), "twice");
	t.cli(["-i", SRC, "-o", twiceOut, "-m", MORE, "-n", "Acme", "-g", "*.test.js"], FIXTURE);
	var firstPass = t.read(path.join(twiceOut, "docs", "model.json"));
	var firstList = fs.readdirSync(path.join(twiceOut, "docs")).sort().join(",");

	t.cli(["-i", SRC, "-o", twiceOut, "-m", MORE, "-n", "Acme", "-g", "*.test.js"], FIXTURE);
	var secondPass = t.read(path.join(twiceOut, "docs", "model.json"));
	var secondList = fs.readdirSync(path.join(twiceOut, "docs")).sort().join(",");

	t.ok(firstPass === secondPass, "a second build produces an identical model.json");
	t.ok(firstList === secondList, "and an identical set of files",
		firstList + "\n vs \n" + secondList);
};
