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
function cli(args, cwd){
	var res = cp.spawnSync(process.execPath, [CLI].concat(args), {
		encoding : "utf8",
		cwd      : cwd || ROOT
	});
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
ok(hasRule(dirtyReport, "unknown-tag"), "flags @typedef as an unknown tag");
ok(hasRule(dirtyReport, "unresolved-inheritance"), "flags the unresolved @extends target");
ok(hasRule(dirtyReport, "no-kind"), "flags the block with no kind tag");

var typedefFinding = dirtyReport.findings.filter(function(f){ return f.rule === "unknown-tag"; })[0];
ok(typedefFinding && /type registry/.test(typedefFinding.fix || ""),
	"explains why @typedef has no equivalent", typedefFinding && typedefFinding.fix);

// ------------------------------------------------------------------
console.log("\njsdoc: alias handling");
// ------------------------------------------------------------------
var jsd = cli(["--check", "--json", "-i", path.join(FIXTURES, "jsdoc.js")], FIXTURES);
var jsdReport = JSON.parse(jsd.stdout);

ok(jsdReport.stats.entities >= 5, "JSDoc-style tags still produce entities",
	"entities=" + jsdReport.stats.entities);
ok(hasRule(jsdReport, "normalized-tag"), "reports what it normalized");

var normalized = jsdReport.findings
	.filter(function(f){ return f.rule === "normalized-tag"; })
	.map(function(f){ return f.message; }).join(" ");

ok(/@function was read as @method/.test(normalized), "@function -> @method", normalized);
ok(/@arg was read as @param/.test(normalized), "@arg -> @param", normalized);
ok(/@prop was read as @property/.test(normalized), "@prop -> @property", normalized);
ok(jsdReport.findings.every(function(f){ return f.level !== "error"; }),
	"aliased source has no errors",
	JSON.stringify(jsdReport.findings.filter(function(f){ return f.level === "error"; })));

var fires = jsdReport.findings.filter(function(f){
	return f.rule === "unknown-tag" && /@fires/.test(f.message);
})[0];
ok(!!fires, "@fires is still reported, not aliased");
ok(fires && !/Use @event instead/.test(fires.fix || ""),
	"@fires advice does not suggest @event", fires && fires.fix);
ok(fires && /emits/.test(fires.fix || ""), "@fires advice explains the difference");

// aliases module, directly
var aliases = require(path.join(ROOT, "src", "aliases.js"));
ok(aliases.resolve("function") === "method", "resolve maps @function");
ok(aliases.resolve("implements") === "impliments", "resolve maps @implements");
ok(aliases.resolve("method") === "method", "resolve leaves canonical tags alone");
ok(aliases.resolve("fires") === "fires", "resolve does not touch @fires");
ok(aliases.inlineLinks("See {@link geo.Circle}.") === "See [geo.Circle](geo.Circle).",
	"inline {@link} becomes markdown");
ok(aliases.inlineLinks("See {@link geo.Box|a box}.") === "See [a box](geo.Box).",
	"inline {@link} with a label");

// ------------------------------------------------------------------
console.log("\njsdoc: build output");
// ------------------------------------------------------------------
var jsOut = path.join(tmp(), "jsdoc");
cli(["-i", path.join(FIXTURES, "jsdoc.js"), "-o", jsOut, "-n", "Geo"], FIXTURES);

var jsModel = JSON.parse( fs.readFileSync(path.join(jsOut, "docs", "model.json"), "utf8") );
var allMembers = jsModel.pages.reduce(function(acc, p){ return acc.concat(p.members); }, []);

var areaMember = allMembers.filter(function(m){ return m.name === "area"; })[0];
ok(!!areaMember, "@function produced a method",
	"members: " + allMembers.map(function(m){ return m.name; }).join(", "));
ok(areaMember && areaMember.params.length === 1, "@arg produced a parameter");
ok(areaMember && areaMember.returns && areaMember.returns.type === "number",
	"@returns produced a return type");
ok(areaMember && /Computes the area/.test(areaMember.description),
	"@description folded into the description", areaMember && areaMember.description);

var areaMeta = (areaMember && areaMember.meta || []).map(function(m){ return m.tag; });
ok(areaMeta.indexOf("deprecated") > -1, "@deprecated kept as metadata", areaMeta.join(","));
ok(areaMeta.indexOf("throws") > -1, "@throws kept as metadata");
ok(areaMeta.indexOf("since") > -1, "@since kept as metadata");

var visibleMember = allMembers.filter(function(m){ return m.name === "visible"; })[0];
ok(!!visibleMember, "@prop produced a property");
ok(visibleMember && visibleMember.access === "private", "@access private applied",
	visibleMember && visibleMember.access);

var renderMember = allMembers.filter(function(m){ return m.name === "render"; })[0];
var types = (renderMember && renderMember.params || []).map(function(p){ return p.type; });
ok(types.indexOf("string|number") > -1, "union types survive", types.join(" "));
ok(types.indexOf("Array<string>") > -1, "generic types survive");
ok(types.indexOf("*") > -1, "wildcard types survive");
ok(types.indexOf("...number") > -1, "rest types survive");

// metadata reaches the rendered page
var pageFiles = fs.readdirSync(path.join(jsOut, "docs")).filter(function(f){
	return /^geo\..*\.html$/.test(f);
});
var anyMeta = pageFiles.some(function(f){
	return /meta-deprecated/.test( fs.readFileSync(path.join(jsOut, "docs", f), "utf8") );
});
ok(anyMeta, "@deprecated renders on the page", "looked in: " + pageFiles.join(", "));

// ------------------------------------------------------------------
console.log("\nbuild: warns about ignored tags");
// ------------------------------------------------------------------
var warned = cli(["-i", path.join(FIXTURES, "jsdoc.js"), "-o", path.join(tmp(), "w"),
	"-n", "Geo", "-p"], FIXTURES);
ok(/unrecognized tag/.test(warned.stdout), "build reports ignored tags in its summary",
	warned.stdout.slice(-300));
ok(/--check/.test(warned.stdout), "and points at --check");

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

// Run from inside the temp project, so the repo's own documon.json
// (which sets a name) doesn't supply one first.
cli(["-i", pkgSrc, "-o", pkgDir], pkgDir);
var borrowed = JSON.parse( fs.readFileSync(path.join(pkgDir, "docs", "model.json"), "utf8") );

ok(borrowed.project === "borrowed-name", "adopts name from the nearest package.json",
	"got " + borrowed.project);
ok(borrowed.version === "4.5.6", "adopts version from the nearest package.json",
	"got " + borrowed.version);
ok(borrowed.description === "Borrowed from package.json.", "adopts the description");

cli(["-i", pkgSrc, "-o", pkgDir, "-n", "Explicit", "-v", "0.0.1"], pkgDir);
var explicit = JSON.parse( fs.readFileSync(path.join(pkgDir, "docs", "model.json"), "utf8") );
ok(explicit.project === "Explicit", "explicit flags beat package.json", "got " + explicit.project);
ok(explicit.version === "0.0.1", "explicit version wins");

ok(JSON.parse(cli(["--check", "--json", "-i", pkgSrc], pkgDir).stdout).ok === true,
	"check runs clean inside a bare project");

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
