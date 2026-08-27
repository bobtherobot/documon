/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers the command line surface itself: help, version, and the exit codes.
 *
 * The usage text is one of the three places a flag has to be documented (alongside
 * `more/104.Options.md` and, where relevant, `TAGS.md`), so this suite also checks that
 * every flag the CLI accepts is at least mentioned in its own help.
 *
 * @module  suites/cli
 * @package test
 */

var path = require('path');

exports.name = "cli: the command line";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	// ------------------------------------------------------------------
	t.section("cli: help");
	// ------------------------------------------------------------------
	var help = t.cli(["-h"]);
	t.ok(help.status === 0, "-h exits 0", "got " + help.status);
	t.ok(/EXIT CODES/.test(help.stdout), "help documents exit codes");
	t.ok(/--check/.test(help.stdout), "help documents --check");
	t.ok(help.stdout.length > 200, "help is more than a stub",
		"length " + help.stdout.length);

	var longHelp = t.cli(["--help"]);
	t.ok(longHelp.status === 0, "--help exits 0");
	t.ok(longHelp.stdout === help.stdout, "--help and -h print the same thing");

	// Each documented exit code is named.
	t.ok(/\b0\b/.test(help.stdout) && /\b1\b/.test(help.stdout) && /\b2\b/.test(help.stdout),
		"all three exit codes appear in the help", help.stdout.slice(-400));

	// ------------------------------------------------------------------
	t.section("cli: version");
	// ------------------------------------------------------------------
	var ver = t.cli(["--version"]);
	var pkgVersion = require(path.join(t.ROOT, "package.json")).version;

	t.ok(ver.status === 0, "--version exits 0");
	t.ok(ver.stdout.trim() === pkgVersion,
		"--version prints the package version", ver.stdout.trim());

	// Version lives in package.json and everything else derives from it, so nothing
	// should be able to drift the way info.js once did.
	t.ok(/^\d+\.\d+\.\d+/.test(pkgVersion), "the package version looks like a version",
		pkgVersion);

	// ------------------------------------------------------------------
	t.section("cli: every flag is documented in its own help");
	// ------------------------------------------------------------------
	// A flag changing means updating more/104.Options.md, the usage string in
	// src/info.js, and TAGS.md/AGENTS.md where relevant. This is the cheapest of those
	// three to verify.
	var info  = t.src("info");
	var usage = info.usage;

	t.ok(typeof usage === "string" && usage.length > 0, "info.js exports a usage string");
	t.ok(typeof info.copyright === "string", "and a copyright string");

	var indexSource = t.read(path.join(t.ROOT, "index.js"));
	var longMatch   = indexSource.match(/LONG\s*=\s*\{([\s\S]*?)\}/);
	var shortFlags  = [];

	if(longMatch){
		var pairs = longMatch[1].match(/(\w)\s*:\s*"(\w+)"/g) || [];
		for(var i=0; i<pairs.length; i++){
			var parts = pairs[i].match(/(\w)\s*:\s*"(\w+)"/);
			shortFlags.push({ short : parts[1], long : parts[2] });
		}
	}

	t.ok(shortFlags.length > 5, "the short-flag table was found in index.js",
		JSON.stringify(shortFlags.length));

	var undocumented = shortFlags.filter(function(f){
		return usage.indexOf("-" + f.short) === -1 && usage.indexOf("--" + f.long) === -1;
	});
	t.ok(undocumented.length === 0, "every short flag appears in the usage text",
		JSON.stringify(undocumented));

	// ------------------------------------------------------------------
	t.section("cli: exit codes");
	// ------------------------------------------------------------------
	t.ok(t.cli(["--check", "-i", path.join(t.FIXTURES, "good.js")]).status === 0,
		"0 when a check finds nothing");
	t.ok(t.cli(["--check", "-i", path.join(t.FIXTURES, "bad.js")]).status === 2,
		"2 when a check finds something");
	t.ok(t.cli(["-i", path.join(t.FIXTURES, "nope-does-not-exist")]).status === 1,
		"1 when the configuration is wrong");

	// ------------------------------------------------------------------
	t.section("cli: json output is machine-readable");
	// ------------------------------------------------------------------
	// Anything scripting Documon parses this, so it has to be valid JSON on stdout with
	// nothing else mixed in.
	var jsonRuns = [
		["--check", "--json", "-i", path.join(t.FIXTURES, "good.js")],
		["--check", "--json", "-i", path.join(t.FIXTURES, "bad.js")],
		["--json", "-i", path.join(t.FIXTURES, "nope-does-not-exist")]
	];

	for(var j=0; j<jsonRuns.length; j++){
		var run = t.cli(jsonRuns[j]);
		var parsed = null;
		try {
			parsed = JSON.parse(run.stdout);
		} catch(e) {
			parsed = null;
		}
		t.ok(parsed !== null, "--json emits parseable JSON for: " + jsonRuns[j].join(" "),
			run.stdout.slice(0, 300));
	}

	// ------------------------------------------------------------------
	t.section("cli: quiet by default, verbose on request");
	// ------------------------------------------------------------------
	var proj = t.project({ src : { "g.js" : t.block(["A module.", "@module g", "@package app"]) } });

	// By default a build reports only the machine-readable companions it wrote, not the
	// configuration or the per-page detail.
	var quiet = t.cli(["-i", proj.src, "-o", proj.out, "-n", "Q"], proj.dir);
	t.ok(/llms\.txt/.test(quiet.stdout), "a build lists the companion files it wrote",
		JSON.stringify(quiet.stdout.slice(0, 200)));
	t.ok( ! /Config/.test(quiet.stdout), "but not the resolved configuration",
		JSON.stringify(quiet.stdout.slice(0, 200)));

	var loud = t.cli(["-i", proj.src, "-o", proj.out, "-n", "Q", "-p"], proj.dir);
	t.ok(loud.stdout.length > quiet.stdout.length, "-p prints more", 
		loud.stdout.length + " vs " + quiet.stdout.length);
	t.ok(/Config/.test(loud.stdout), "including the resolved configuration",
		loud.stdout.slice(0, 300));
	t.ok(/documon/i.test(loud.stdout), "and the copyright banner",
		loud.stdout.slice(0, 200));
};
