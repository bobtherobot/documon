/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers config resolution in `index.js`.
 *
 * Three layers, later winning: built-in defaults, then a config file, then explicit
 * flags. Config files are discovered by walking up from the working directory, and
 * `name` / `version` / `description` fall back to the nearest `package.json` -- which is
 * why nothing should ever hard-code a version into a build script.
 *
 * Exit code 1 means a config error, and is distinct from exit code 2, which means the
 * check found something.
 *
 * @module  suites/config
 * @package test
 */

var path = require('path');
var fs   = require('fs');

exports.name = "config: resolution and discovery";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	/**
	 * A minimal source file.
	 *
	 * @method  source
	 * @private
	 * @return  {string} - A documented module.
	 */
	function source(){
		return t.block(["A well-formed module.", "@module good", "@package fixture"]);
	}

	// ------------------------------------------------------------------
	t.section("config: failure modes");
	// ------------------------------------------------------------------
	var missing = t.cli(["--json", "-i", path.join(t.FIXTURES, "nope-does-not-exist")]);
	t.ok(missing.status === 1, "exits 1 when the source path is missing", "got " + missing.status);

	var missingReport = JSON.parse(missing.stdout);
	t.ok(missingReport.ok === false, "reports failure as JSON");
	t.ok(missingReport.errors.length === 1, "reports exactly one error, with no phantom entries",
		JSON.stringify(missingReport.errors));
	t.ok(/doesn't exist/.test(missingReport.errors[0]), "the error names the real problem",
		missingReport.errors[0]);
	t.ok(Array.isArray(missingReport.findings) && missingReport.findings.length === 0,
		"a config error produces no findings", JSON.stringify(missingReport.findings));

	// A config error is a different exit code from a check finding, so a caller can tell
	// "I called this wrong" from "the docs have problems".
	var findingExit = t.cli(["--check", "--json", "-i", path.join(t.FIXTURES, "bad.js")]);
	t.ok(findingExit.status === 2 && missing.status === 1,
		"a config error and a check finding use different exit codes",
		findingExit.status + " vs " + missing.status);

	// ------------------------------------------------------------------
	t.section("config: documon.json discovery");
	// ------------------------------------------------------------------
	var proj = t.project({
		src  : { "good.js" : source() },
		root : { "documon.json" : JSON.stringify({
			src     : "./src",
			out     : ".",
			name    : "FromConfig",
			version : "3.2.1"
		}) }
	});

	var configured = t.bare(proj.dir);
	t.ok(configured.status === 0, "runs with no flags when documon.json is present",
		"got " + configured.status + "\n" + configured.stdout.slice(-400));
	t.ok(fs.existsSync(path.join(proj.dir, "docs", "index.html")), "built using the config file");

	var configModel = t.readJson(path.join(proj.dir, "docs", "model.json"));
	t.ok(configModel.project === "FromConfig", "picked up name from the config file",
		"got " + configModel.project);
	t.ok(String(configModel.version) === "3.2.1", "picked up version from the config file",
		JSON.stringify(configModel.version));

	// The other accepted filenames behave the same way.
	var otherNames = ["documon.config.json", ".documonrc"];

	for(var n=0; n<otherNames.length; n++){
		var alt = t.project({
			src  : { "good.js" : source() },
			root : {}
		});
		t.write(path.join(alt.dir, otherNames[n]), JSON.stringify({
			src : "./src", out : ".", name : "Named" + n
		}));

		var altRun = t.bare(alt.dir);
		t.ok(altRun.status === 0, otherNames[n] + " is discovered",
			"got " + altRun.status + "\n" + altRun.stdout.slice(-300));
		t.ok(fs.existsSync(path.join(alt.dir, "docs", "model.json")),
			otherNames[n] + " drives a build");
	}

	// A "documon" key inside package.json works too.
	var inPkg = t.project({ src : { "good.js" : source() } });
	t.write(path.join(inPkg.dir, "package.json"), JSON.stringify({
		name    : "pkg-config",
		version : "1.0.0",
		documon : { src : "./src", out : ".", name : "FromPackageKey" }
	}));

	var pkgRun = t.bare(inPkg.dir);
	t.ok(pkgRun.status === 0, "a documon key in package.json is discovered",
		"got " + pkgRun.status + "\n" + pkgRun.stdout.slice(-300));
	t.ok(t.readJson(path.join(inPkg.dir, "docs", "model.json")).project === "FromPackageKey",
		"and supplies the settings",
		t.readJson(path.join(inPkg.dir, "docs", "model.json")).project);

	// Discovery walks up from the working directory, so running from a sub-folder still
	// finds the project's config.
	var nested = t.project({
		src  : { "good.js" : source() },
		root : { "documon.json" : JSON.stringify({ src : "./src", out : ".", name : "FoundAbove" }) }
	});
	var deep = path.join(nested.dir, "src", "deeper");
	fs.mkdirSync(deep, { recursive : true });

	// findConfig() states its purpose as letting the tool run "from anywhere inside a
	// project and still pick up the project's settings", so a relative path in the
	// config has to be read relative to the config file rather than to the cwd.
	var fromDeep = t.bare(deep);
	t.ok(fromDeep.status === 0,
		"a config found by walking up resolves its relative paths against itself",
		"exit " + fromDeep.status + "\n" + (fromDeep.stdout + fromDeep.stderr).slice(-300));
	t.ok(fs.existsSync(path.join(nested.dir, "docs", "index.html")),
		"and the build lands where the config says");

	// ------------------------------------------------------------------
	t.section("config: package.json supplies project identity");
	// ------------------------------------------------------------------
	var pkgProj = t.project({ src : { "good.js" : source() } });
	t.write(path.join(pkgProj.dir, "package.json"), JSON.stringify({
		name        : "borrowed-name",
		version     : "4.5.6",
		description : "Borrowed from package.json."
	}));

	// Run from inside the temp project, so the repo's own documon.json
	// (which sets a name) doesn't supply one first.
	t.cli(["-i", pkgProj.src, "-o", pkgProj.dir], pkgProj.dir);
	var borrowed = t.readJson(path.join(pkgProj.dir, "docs", "model.json"));

	t.ok(borrowed.project === "borrowed-name", "adopts name from the nearest package.json",
		"got " + borrowed.project);
	t.ok(String(borrowed.version) === "4.5.6", "adopts version from the nearest package.json",
		JSON.stringify(borrowed.version));
	t.ok(borrowed.description === "Borrowed from package.json.", "adopts the description");

	// ------------------------------------------------------------------
	t.section("config: the layers, later winning");
	// ------------------------------------------------------------------
	t.cli(["-i", pkgProj.src, "-o", pkgProj.dir, "-n", "Explicit", "-v", "0.0.1"], pkgProj.dir);
	var explicit = t.readJson(path.join(pkgProj.dir, "docs", "model.json"));
	t.ok(explicit.project === "Explicit", "explicit flags beat package.json",
		"got " + explicit.project);
	t.ok(String(explicit.version) === "0.0.1", "explicit version wins",
		JSON.stringify(explicit.version));

	// A flag beats the config file as well.
	var layered = t.project({
		src  : { "good.js" : source() },
		root : { "documon.json" : JSON.stringify({
			src : "./src", out : ".", name : "FromFile", version : "1.1.1"
		}) }
	});
	t.cli(["-n", "FromFlag"], layered.dir);
	var layeredModel = t.readJson(path.join(layered.dir, "docs", "model.json"));
	t.ok(layeredModel.project === "FromFlag", "a flag beats the config file",
		layeredModel.project);
	t.ok(String(layeredModel.version) === "1.1.1",
		"while settings the flag did not mention still come from the file",
		JSON.stringify(layeredModel.version));

	// And the config file beats the package.json fallback.
	var overFallback = t.project({ src : { "good.js" : source() } });
	t.write(path.join(overFallback.dir, "package.json"), JSON.stringify({
		name : "from-package", version : "9.9.9"
	}));
	t.write(path.join(overFallback.dir, "documon.json"), JSON.stringify({
		src : "./src", out : ".", name : "FromConfigFile"
	}));
	t.bare(overFallback.dir);
	t.ok(t.readJson(path.join(overFallback.dir, "docs", "model.json")).project === "FromConfigFile",
		"the config file beats the package.json fallback",
		t.readJson(path.join(overFallback.dir, "docs", "model.json")).project);

	// ------------------------------------------------------------------
	t.section("config: options that change the output");
	// ------------------------------------------------------------------
	// docsDirName renames the folder the site is written into. The public site relies on
	// this to publish at a web root.
	var renamed = t.project({ src : { "good.js" : source() } });
	t.cli(["-i", renamed.src, "-o", renamed.out, "--docsDirName", "api", "-n", "R"], renamed.dir);
	t.ok(fs.existsSync(path.join(renamed.out, "api", "index.html")),
		"docsDirName renames the output folder",
		JSON.stringify(fs.existsSync(renamed.out) ? fs.readdirSync(renamed.out) : "no out"));
	t.ok( ! fs.existsSync(path.join(renamed.out, "docs")),
		"and the default name is not also used");

	// sourceExt decides which files are read at all.
	var exts = t.project({
		src : {
			"a.js"  : t.block(["A js module.", "@module ajs", "@package app"]),
			"b.txt" : t.block(["A txt module.", "@module btxt", "@package app"])
		}
	});
	t.cli(["-i", exts.src, "-o", exts.out, "-e", "txt", "-n", "E"], exts.dir);
	var extIds = t.readJson(path.join(exts.out, "docs", "model.json"))
		.pages.map(function(p){ return p.id; });
	t.ok(extIds.indexOf("app.btxt") > -1, "sourceExt reads the extension it names",
		JSON.stringify(extIds));
	t.ok(extIds.indexOf("app.ajs") === -1, "and skips the ones it does not",
		JSON.stringify(extIds));

	// ignore keeps files out of the build.
	var ignored = t.project({
		src : {
			"keep.js" : t.block(["Kept.", "@module keep", "@package app"]),
			"skip.js" : t.block(["Skipped.", "@module skip", "@package app"])
		}
	});
	t.cli(["-i", ignored.src, "-o", ignored.out, "-g", "skip.js", "-n", "I"], ignored.dir);
	var ignoredIds = t.readJson(path.join(ignored.out, "docs", "model.json"))
		.pages.map(function(p){ return p.id; });
	t.ok(ignoredIds.indexOf("app.keep") > -1, "an unignored file is built",
		JSON.stringify(ignoredIds));
	t.ok(ignoredIds.indexOf("app.skip") === -1, "and an ignored one is not",
		JSON.stringify(ignoredIds));

	// ------------------------------------------------------------------
	t.section("config: a malformed config file");
	// ------------------------------------------------------------------
	var broken = t.project({ src : { "good.js" : source() } });
	t.write(path.join(broken.dir, "documon.json"), "{ this is not json ");

	var brokenRun = t.bare(broken.dir);
	t.ok(brokenRun.status !== 0, "a malformed config file does not silently succeed",
		"got " + brokenRun.status);
	t.ok(/documon\.json|json|config/i.test(brokenRun.stdout + brokenRun.stderr),
		"and says which file was the problem",
		(brokenRun.stdout + brokenRun.stderr).slice(-300));
};
