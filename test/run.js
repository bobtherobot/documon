/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * A dependency-free test runner for Documon.
 *
 * Run with `npm test` or `node test/run.js`. Exits non-zero on the first failing
 * assertion, so CI and automated callers can rely on it.
 *
 * @module  test
 * @package documon
 */

var fs   = require('fs');
var os   = require('os');
var path = require('path');
var cp   = require('child_process');

var ROOT     = path.resolve(__dirname, "..");
var FIXTURES = path.join(__dirname, "fixtures");
var CLI      = path.join(ROOT, "index.js");

var passed = 0;
var failed = 0;

/**
 * @method  ok
 * @private
 * @param   {boolean} cond    - The assertion.
 * @param   {string}  label   - What was being asserted.
 * @param   {string}  [extra] - Detail printed on failure.
 */
function ok(cond, label, extra){
	if(cond){
		passed++;
		console.log("  ok   " + label);
	} else {
		failed++;
		console.log("  FAIL " + label + (extra ? "\n       " + extra : ""));
	}
}

/**
 * Runs the CLI and captures stdout plus the exit status.
 *
 * @method  cli
 * @private
 * @param   {array}  args - CLI arguments.
 * @return  {object}      - `{ status, stdout }`.
 */
function cli(args){
	var res = cp.spawnSync(process.execPath, [CLI].concat(args), { encoding : "utf8" });
	return { status : res.status, stdout : res.stdout || "", stderr : res.stderr || "" };
}

/**
 * Creates a scratch folder for a test.
 *
 * @method  tmp
 * @private
 * @return  {string} - Path to a fresh folder.
 */
function tmp(){
	return fs.mkdtempSync( path.join(os.tmpdir(), "documon-test-") );
}

console.log("\nDocumon test suite\n");

// ------------------------------------------------------------------
console.log("check: clean source");
// ------------------------------------------------------------------
var clean = cli(["--check", "--json", "-i", path.join(FIXTURES, "good.js")]);
var cleanReport = JSON.parse(clean.stdout);

ok(clean.status === 0, "exits 0 when there is nothing wrong", "got " + clean.status);
ok(cleanReport.ok === true, "reports ok:true");
ok(cleanReport.counts.error === 0, "no errors", JSON.stringify(cleanReport.counts));
ok(cleanReport.stats.entities >= 3, "found the module, method and property",
	"entities=" + cleanReport.stats.entities);

// ------------------------------------------------------------------
console.log("\ncheck: problem source");
// ------------------------------------------------------------------
var dirty = cli(["--check", "--json", "-i", path.join(FIXTURES, "bad.js")]);
var dirtyReport = JSON.parse(dirty.stdout);

function hasRule(report, rule){
	return report.findings.some(function(f){ return f.rule === rule; });
}

ok(dirty.status === 2, "exits 2 when problems are found", "got " + dirty.status);
ok(dirtyReport.ok === false, "reports ok:false");
ok(hasRule(dirtyReport, "unknown-tag"), "flags @arg as an unknown tag");
ok(hasRule(dirtyReport, "unresolved-inheritance"), "flags the unresolved @extends target");
ok(hasRule(dirtyReport, "no-kind"), "flags the block with no kind tag");

var argFinding = dirtyReport.findings.filter(function(f){ return f.rule === "unknown-tag"; })[0];
ok(argFinding && /@param/.test(argFinding.fix || ""), "suggests @param as the fix for @arg",
	argFinding && argFinding.fix);

// ------------------------------------------------------------------
console.log("\ncheck: strict mode");
// ------------------------------------------------------------------
var strict = cli(["--check", "--strict", "--json", "-i", path.join(FIXTURES, "bad.js")]);
ok(strict.status === 2, "strict still fails on warnings", "got " + strict.status);

// ------------------------------------------------------------------
console.log("\ncheck: coverage advisory");
// ------------------------------------------------------------------
var cov = cli(["--check", "--coverage", "--json", "-i", path.join(FIXTURES, "good.js")]);
var covReport = JSON.parse(cov.stdout);
ok(covReport.coverage !== null, "coverage block present when requested");
ok(typeof covReport.coverage.percent === "number", "coverage reports a percentage");

var noCov = JSON.parse( cli(["--check", "--json", "-i", path.join(FIXTURES, "good.js")]).stdout );
ok(noCov.coverage === null, "coverage absent unless asked for");

// ------------------------------------------------------------------
console.log("\nbuild: output folder is created");
// ------------------------------------------------------------------
var out = path.join(tmp(), "nested", "docs-here");
var built = cli(["-i", FIXTURES, "-o", out, "-n", "Fixture", "-v", "9.9"]);

ok(built.status === 0, "exits 0 on a successful build", "got " + built.status
	+ "\n" + built.stdout.slice(-400));
ok(fs.existsSync(out), "created the missing output folder");
ok(fs.existsSync(path.join(out, "docs", "index.html")), "wrote index.html");

// ------------------------------------------------------------------
console.log("\nbuild: machine-readable companions");
// ------------------------------------------------------------------
var docsDir = path.join(out, "docs");
ok(fs.existsSync(path.join(docsDir, "llms.txt")), "wrote llms.txt");
ok(fs.existsSync(path.join(docsDir, "llms-full.txt")), "wrote llms-full.txt");
ok(fs.existsSync(path.join(docsDir, "model.json")), "wrote model.json");

var model = JSON.parse( fs.readFileSync(path.join(docsDir, "model.json"), "utf8") );
ok(model.generator === "documon", "model.json identifies its generator");
ok(model.pages.length > 0, "model.json lists pages");

var goodPage = model.pages.filter(function(p){ return p.id === "fixture.good"; })[0];
ok(!!goodPage, "model.json contains the fixture module",
	"ids: " + model.pages.map(function(p){ return p.id; }).join(", "));

if(goodPage){
	ok(goodPage.kind === "module", "records the entity kind", "got " + goodPage.kind);
	var addMethod = goodPage.members.filter(function(m){ return m.name === "add"; })[0];
	ok(!!addMethod, "records the method");
	ok(addMethod && addMethod.params.length === 2, "records both parameters");
	ok(addMethod && addMethod.returns && addMethod.returns.type === "number",
		"records the return type");
}

// ------------------------------------------------------------------
console.log("\nbuild: opting out");
// ------------------------------------------------------------------
var out2 = path.join(tmp(), "plain");
cli(["-i", FIXTURES, "-o", out2, "--no-emitLlms", "--no-emitModel"]);
ok(!fs.existsSync(path.join(out2, "docs", "llms.txt")), "--no-emitLlms suppresses llms.txt");
ok(!fs.existsSync(path.join(out2, "docs", "model.json")), "--no-emitModel suppresses model.json");

// ------------------------------------------------------------------
console.log("\nconfig: failure modes");
// ------------------------------------------------------------------
var missing = cli(["--json", "-i", path.join(FIXTURES, "nope-does-not-exist")]);
ok(missing.status === 1, "exits 1 when the source path is missing", "got " + missing.status);

var missingReport = JSON.parse(missing.stdout);
ok(missingReport.ok === false, "reports failure as JSON");
ok(missingReport.errors.length === 1, "reports exactly one error, with no phantom entries",
	JSON.stringify(missingReport.errors));
ok(/doesn't exist/.test(missingReport.errors[0]), "the error names the real problem",
	missingReport.errors[0]);

// ------------------------------------------------------------------
console.log("\nconfig: documon.json discovery");
// ------------------------------------------------------------------
var projDir = tmp();
var projSrc = path.join(projDir, "src");
fs.mkdirSync(projSrc);
fs.copyFileSync(path.join(FIXTURES, "good.js"), path.join(projSrc, "good.js"));
fs.writeFileSync(path.join(projDir, "documon.json"), JSON.stringify({
	src : projSrc,
	out : projDir,
	name : "FromConfig",
	version : "3.2.1"
}), "utf8");

var configured = cp.spawnSync(process.execPath, [CLI], { cwd : projDir, encoding : "utf8" });
ok(configured.status === 0, "runs with no flags when documon.json is present",
	"got " + configured.status);
ok(fs.existsSync(path.join(projDir, "docs", "index.html")), "built using the config file");

var configModel = JSON.parse( fs.readFileSync(path.join(projDir, "docs", "model.json"), "utf8") );
ok(configModel.project === "FromConfig", "picked up name from the config file",
	"got " + configModel.project);
ok(configModel.version === "3.2.1", "picked up version from the config file");

// ------------------------------------------------------------------
console.log("\nconfig: package.json supplies project identity");
// ------------------------------------------------------------------
var pkgDir = tmp();
var pkgSrc = path.join(pkgDir, "src");
fs.mkdirSync(pkgSrc);
fs.copyFileSync(path.join(FIXTURES, "good.js"), path.join(pkgSrc, "good.js"));
fs.writeFileSync(path.join(pkgDir, "package.json"), JSON.stringify({
	name : "borrowed-name",
	version : "4.5.6",
	description : "Borrowed from package.json."
}), "utf8");

cli(["-i", pkgSrc, "-o", pkgDir]);
var borrowed = JSON.parse( fs.readFileSync(path.join(pkgDir, "docs", "model.json"), "utf8") );

ok(borrowed.project === "borrowed-name", "adopts name from the nearest package.json",
	"got " + borrowed.project);
ok(borrowed.version === "4.5.6", "adopts version from the nearest package.json",
	"got " + borrowed.version);
ok(borrowed.description === "Borrowed from package.json.", "adopts the description");

cli(["-i", pkgSrc, "-o", pkgDir, "-n", "Explicit", "-v", "0.0.1"]);
var explicit = JSON.parse( fs.readFileSync(path.join(pkgDir, "docs", "model.json"), "utf8") );
ok(explicit.project === "Explicit", "explicit flags beat package.json", "got " + explicit.project);
ok(explicit.version === "0.0.1", "explicit version wins");

// ------------------------------------------------------------------
console.log("\nignore: patterns actually apply");
// ------------------------------------------------------------------
var ignore = require(path.join(ROOT, "src", "ignore.js"));
var matcher = ignore.create(["*.test.js", "scratch"], ["/out/dir"]);

ok(matcher.test("/p/node_modules/x/y.js"), "ignores node_modules by default");
ok(matcher.test("/p/.git/config"), "ignores dot folders by default");
ok(matcher.test("/p/a.test.js"), "honours a simple glob");
ok(matcher.test("/p/scratch/f.js"), "honours a substring");
ok(matcher.test("/out/dir/f.js"), "ignores the output folder");
ok(!matcher.test("/p/src/real.js"), "keeps ordinary source files");

// ------------------------------------------------------------------
console.log("\ncli: basics");
// ------------------------------------------------------------------
var help = cli(["-h"]);
ok(help.status === 0, "-h exits 0");
ok(/EXIT CODES/.test(help.stdout), "help documents exit codes");
ok(/--check/.test(help.stdout), "help documents --check");

var ver = cli(["--version"]);
ok(ver.status === 0, "--version exits 0");
ok(ver.stdout.trim() === require(path.join(ROOT, "package.json")).version,
	"--version prints the package version", ver.stdout.trim());

// ------------------------------------------------------------------
console.log("\ndogfood: documon checks itself");
// ------------------------------------------------------------------
var self = cli(["--check", "--json", "-i", path.join(ROOT, "src")]);
var selfReport = JSON.parse(self.stdout);
ok(selfReport.counts.error === 0, "documon's own source has no check errors",
	JSON.stringify(selfReport.findings.filter(function(f){ return f.level === "error"; })));

// ------------------------------------------------------------------
console.log("\n" + passed + " passed, " + failed + " failed\n");
process.exit(failed ? 1 : 0);
