/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `--check`, the validator in `src/check.js`.
 *
 * Because Documon infers nothing from source code, a mistyped or unimplemented tag is
 * not a cosmetic problem -- the entity silently disappears. `--check` is what turns that
 * silence into a message, so every rule it can report is exercised here, along with the
 * exit codes callers depend on.
 *
 * Exit codes are part of the contract: 0 success, 1 config error, 2 findings.
 *
 * @module  suites/check
 * @package test
 */

exports.name = "check: the validator";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var path = require('path');

	/**
	 * Checks a one-file project built from tag lines.
	 *
	 * @method  checkSource
	 * @private
	 * @param   {array|string} lines - The lines inside a comment, or whole file text.
	 * @return  {object}             - `{ status, report }`.
	 */
	function checkSource(lines){
		var proj = t.project({
			"src" : { "s.js" : Array.isArray(lines) ? lines.join("\n") : lines }
		});
		return t.check(["-i", proj.src], proj.dir);
	}

	// ------------------------------------------------------------------
	t.section("check: clean source");
	// ------------------------------------------------------------------
	var clean = t.check(["-i", path.join(t.FIXTURES, "good.js")]);

	t.ok(clean.status === 0, "exits 0 when there is nothing wrong", "got " + clean.status);
	t.ok(clean.report.ok === true, "reports ok:true");
	t.ok(clean.report.counts.error === 0, "no errors", JSON.stringify(clean.report.counts));
	t.ok(clean.report.generator === "documon", "the report identifies its generator");
	t.ok(clean.report.stats.entities >= 3, "found the module, method and property",
		"entities=" + clean.report.stats.entities);
	t.ok(clean.report.stats.files === 1, "counted the file", JSON.stringify(clean.report.stats));
	t.ok(clean.report.stats.filesWithComments === 1, "and noticed it has comments");
	t.ok(Array.isArray(clean.report.findings), "findings is always an array");

	// ------------------------------------------------------------------
	t.section("check: problem source");
	// ------------------------------------------------------------------
	var dirty = t.check(["-i", path.join(t.FIXTURES, "bad.js")]);

	t.ok(dirty.status === 2, "exits 2 when problems are found", "got " + dirty.status);
	t.ok(dirty.report.ok === false, "reports ok:false");
	t.ok(t.hasRule(dirty.report, "unknown-tag"), "flags @typedef as an unknown tag");
	t.ok(t.hasRule(dirty.report, "unresolved-inheritance"), "flags the unresolved @extends target");
	t.ok(t.hasRule(dirty.report, "no-kind"), "flags the block with no kind tag");

	var typedefFinding = t.findings(dirty.report, "unknown-tag")[0];
	t.ok(typedefFinding && /type registry/.test(typedefFinding.fix || ""),
		"explains why @typedef has no equivalent", typedefFinding && typedefFinding.fix);

	// Every finding has to be actionable: a place and a message.
	var vague = dirty.report.findings.filter(function(f){
		return ! f.file || ! f.message || typeof f.line !== "number" || ! f.rule || ! f.level;
	});
	t.ok(vague.length === 0, "every finding names a file, line, rule, level and message",
		JSON.stringify(vague));

	// ------------------------------------------------------------------
	t.section("check: individual rules");
	// ------------------------------------------------------------------
	var noKind = checkSource([t.OPEN, " * Has tags but never says what it is.",
		" * @param {string} x - Nothing renders this.", " " + t.CLOSE]);
	t.ok(t.hasRule(noKind.report, "no-kind"), "no-kind: a block with no kind tag",
		JSON.stringify(noKind.report.findings.map(function(f){ return f.rule; })));

	var unknown = checkSource([t.OPEN, " * A thing.", " * @method thing",
		" * @nonsense whatever", " " + t.CLOSE]);
	t.ok(t.hasRule(unknown.report, "unknown-tag"), "unknown-tag: a tag Documon does not act on",
		JSON.stringify(unknown.report.findings.map(function(f){ return f.rule; })));

	var missingName = checkSource([t.OPEN, " * A thing.", " * @method", " " + t.CLOSE]);
	t.ok(t.hasRule(missingName.report, "missing-name"), "missing-name: a kind tag with no name",
		JSON.stringify(missingName.report.findings.map(function(f){ return f.rule; })));

	var dupId = checkSource([
		t.OPEN, " * One.", " * @method same", " * @package app", " " + t.CLOSE, "",
		t.OPEN, " * Two.", " * @method same", " * @package app", " " + t.CLOSE
	]);
	t.ok(t.hasRule(dupId.report, "duplicate-id"), "duplicate-id: two entities with one id",
		JSON.stringify(dupId.report.findings.map(function(f){ return f.rule; })));

	var dupParam = checkSource([t.OPEN, " * A thing.", " * @method thing",
		" * @param {string} x - Once.", " * @param {string} x - Twice.", " " + t.CLOSE]);
	t.ok(t.hasRule(dupParam.report, "duplicate-param"), "duplicate-param: a repeated parameter",
		JSON.stringify(dupParam.report.findings.map(function(f){ return f.rule; })));

	var noType = checkSource([t.OPEN, " * A thing.", " * @method thing",
		" * @param x - No type given.", " " + t.CLOSE]);
	t.ok(t.hasRule(noType.report, "param-no-type"), "param-no-type: a parameter with no type",
		JSON.stringify(noType.report.findings.map(function(f){ return f.rule; })));

	var noDesc = checkSource([t.OPEN, " * @method undescribed", " " + t.CLOSE]);
	t.ok(t.hasRule(noDesc.report, "no-description"), "no-description: an entity with no prose",
		JSON.stringify(noDesc.report.findings.map(function(f){ return f.rule; })));

	var noComments = t.check(["-i", t.project({ src : { "bare.js" : "var x = 1;\n" } }).src]);
	t.ok(t.hasRule(noComments.report, "no-comments"), "no-comments: a file with no documentation",
		JSON.stringify(noComments.report.findings.map(function(f){ return f.rule; })));

	var badLink = checkSource([t.OPEN, " * See [nothing](app.NoSuchThing).",
		" * @module thing", " * @package app", " " + t.CLOSE]);
	t.ok(t.hasRule(badLink.report, "broken-link"), "broken-link: a link to an id that does not exist",
		JSON.stringify(badLink.report.findings.map(function(f){ return f.rule; })));

	// A link to something that does exist must not be reported.
	var goodLink = checkSource([
		t.OPEN, " * The target.", " * @class Target", " * @package app", " " + t.CLOSE, "",
		t.OPEN, " * See [it](app.Target).", " * @class Source", " * @package app", " " + t.CLOSE
	]);
	t.ok( ! t.hasRule(goodLink.report, "broken-link"), "a link to a real id is not reported",
		JSON.stringify(t.findings(goodLink.report, "broken-link")));

	// ------------------------------------------------------------------
	t.section("check: where parameters actually render");
	// ------------------------------------------------------------------
	// class.jst routes the @class/@module that heads a page through member.jst as a
	// "methods" part, so those pages DO show a signature and a parameter table. The
	// rule used to warn about them, which sent authors to delete working docs.
	var paramDir = t.tmp();
	t.write(path.join(paramDir, "p.js"), [
		t.OPEN, " * A callable module.", " * @class   Runner", " * @package app",
		" * @param   {string} text - Input.", " * @returns {string} - Output.", " " + t.CLOSE,
		"",
		t.OPEN, " * A module.", " * @module  Helper", " * @package app",
		" * @param   {string} text - Input.", " " + t.CLOSE,
		"",
		t.OPEN, " * A property.", " * @property {object} conf",
		" * @param   {string} nope - Never rendered.", " " + t.CLOSE
	].join("\n"));

	var paramFindings = t.findings(t.check(["-i", paramDir]).report, "param-on-non-method");

	t.ok(paramFindings.length === 1, "@param on @class and @module is not flagged",
		JSON.stringify(paramFindings));
	t.ok(paramFindings.length === 1 && /@property/.test(paramFindings[0].message),
		"@param on a kind that drops it is still flagged",
		paramFindings.length ? paramFindings[0].message : "nothing reported");

	// ------------------------------------------------------------------
	t.section("check: strict mode");
	// ------------------------------------------------------------------
	var strict = t.cli(["--check", "--strict", "--json", "-i", path.join(t.FIXTURES, "bad.js")]);
	t.ok(strict.status === 2, "strict still fails on warnings", "got " + strict.status);

	// A file with only warnings passes normally and fails under --strict.
	var warnOnly = t.project({
		src : { "w.js" : [t.OPEN, " * A thing.", " * @method thing",
			" * @nonsense whatever", " " + t.CLOSE].join("\n") }
	});
	var lenient = t.check(["-i", warnOnly.src], warnOnly.dir);
	t.ok(lenient.status === 0, "warnings alone pass without --strict",
		"got " + lenient.status + " " + JSON.stringify(lenient.report.counts));
	t.ok(lenient.report.counts.warning > 0, "though they are still reported",
		JSON.stringify(lenient.report.counts));

	var strictWarn = t.cli(["--check", "--strict", "--json", "-i", warnOnly.src], warnOnly.dir);
	t.ok(strictWarn.status === 2, "and fail under --strict", "got " + strictWarn.status);

	// ------------------------------------------------------------------
	t.section("check: coverage advisory");
	// ------------------------------------------------------------------
	var cov = t.check(["--coverage", "-i", path.join(t.FIXTURES, "good.js")]);
	t.ok(cov.report.coverage !== null, "coverage block present when requested");
	t.ok(typeof cov.report.coverage.percent === "number", "coverage reports a percentage",
		JSON.stringify(cov.report.coverage));
	t.ok(typeof cov.report.coverage.symbols === "number", "and a symbol count");
	t.ok(typeof cov.report.coverage.documented === "number", "and a documented count");

	t.ok(t.check(["-i", path.join(t.FIXTURES, "good.js")]).report.coverage === null,
		"coverage absent unless asked for");

	// The advisory must stay advisory: it is the one place Documon looks at code, and it
	// must never change the outcome.
	var undoc = t.project({
		src : { "u.js" : [
			t.OPEN, " * A module.", " * @module u", " * @package app", " " + t.CLOSE,
			"function totallyUndocumented(){}"
		].join("\n") }
	});
	var withCov = t.cli(["--check", "--coverage", "--json", "-i", undoc.src], undoc.dir);
	var withoutCov = t.cli(["--check", "--json", "-i", undoc.src], undoc.dir);
	t.ok(withCov.status === withoutCov.status,
		"--coverage does not change the exit code",
		withCov.status + " vs " + withoutCov.status);

	var covReport = JSON.parse(withCov.stdout);
	var advisories = t.findings(covReport, "undocumented-symbol");
	t.ok(advisories.every(function(f){ return f.level === "info"; }),
		"every coverage finding is informational only",
		JSON.stringify(advisories.map(function(f){ return f.level; })));

	// ------------------------------------------------------------------
	t.section("check: retired spellings");
	// ------------------------------------------------------------------
	var spell = t.project({
		src : {
			"s.js" : [
				t.OPEN, " * A module.", " * @module thing", " * @package app", " " + t.CLOSE, "",
				t.OPEN, " * Correct spelling.", " * @class Good", " * @implements app.Iface", " " + t.CLOSE,
				"function Good(){}", "",
				t.OPEN, " * The interface.", " * @class Iface", " " + t.CLOSE,
				"function Iface(){}"
			].join("\n")
		}
	});

	var spellReport = t.check(["-i", spell.src], spell.dir).report;
	t.ok(spellReport.counts.error === 0, "@implements resolves inheritance",
		JSON.stringify(spellReport.findings.filter(function(f){ return f.level === "error"; })));

	t.write(path.join(spell.src, "old.js"), [
		t.OPEN, " * Retired spelling.", " * @class Legacy", " * @package app",
		" * @impliments app.Iface", " " + t.CLOSE, "function Legacy(){}"
	].join("\n"));

	var retired = t.check(["-i", spell.src], spell.dir);

	t.ok(retired.status === 2, "@impliments fails the check", "got " + retired.status);
	t.ok(t.hasRule(retired.report, "retired-tag"), "reports it as retired, not merely unknown");

	var retiredFinding = t.findings(retired.report, "retired-tag")[0];
	t.ok(retiredFinding && /Rename it to @implements/.test(retiredFinding.fix || ""),
		"names the replacement spelling", retiredFinding && retiredFinding.fix);

	var retiredBuild = t.cli(["-i", spell.src, "-o", path.join(t.tmp(), "r"), "-p"], spell.dir);
	t.ok(/was retired/.test(retiredBuild.stdout), "the build says so too, rather than staying quiet",
		retiredBuild.stdout.slice(-300));

	// ------------------------------------------------------------------
	t.section("check: qualified ids resolve");
	// ------------------------------------------------------------------
	// The killer case: the SAME block declares @package app and @extends app.Base. The
	// dotted-name logic used to nest the @extends under the @package tag, so the
	// inheritance vanished entirely and the check reported it as unresolved.
	var qualified = t.project({
		src : {
			"q.js" : [
				t.OPEN, " * The parent.", " * @class Base", " * @package app", " " + t.CLOSE,
				"function Base(){}", "",
				t.OPEN, " * The child.", " * @class Child", " * @package app",
				" * @extends app.Base", " " + t.CLOSE,
				"function Child(){}"
			].join("\n")
		}
	});

	var qReport = t.check(["-i", qualified.src], qualified.dir).report;
	t.ok(qReport.counts.error === 0, "@extends app.Base resolves when the block also sets @package",
		JSON.stringify(qReport.findings.filter(function(f){ return f.level === "error"; })));

	// ------------------------------------------------------------------
	t.section("check: known tags are not reported");
	// ------------------------------------------------------------------
	// Every tag Documon acts on must pass cleanly, or --check sends people to delete
	// working documentation.
	var everyTag = t.project({
		src : {
			"all.js" : [
				t.OPEN,
				" * A class using a broad spread of tags.",
				" * @class    Everything",
				" * @package  app",
				" * @see      app.Everything",
				" * @requires app.Everything",
				" " + t.CLOSE,
				"",
				t.OPEN,
				" * A method using the member tags.",
				" * @method   doIt",
				" * @param    {string} [name=\"x\"] - A name.",
				" * @return   {number} - A count.",
				" * @static",
				" * @public",
				" * @order    2",
				" * @example",
				" *",
				" * \t\tdoIt();",
				" " + t.CLOSE,
				"",
				t.OPEN,
				" * A property using the property tags.",
				" * @property total",
				" * @type     {number}",
				" * @default  0",
				" * @readonly",
				" * @optional",
				" " + t.CLOSE,
				"",
				t.OPEN,
				" * An event.",
				" * @event    change",
				" * @private",
				" " + t.CLOSE
			].join("\n")
		}
	});

	var everyReport = t.check(["-i", everyTag.src], everyTag.dir).report;
	var unknownTags = t.findings(everyReport, "unknown-tag");
	t.ok(unknownTags.length === 0, "no supported tag is reported as unknown",
		JSON.stringify(unknownTags.map(function(f){ return f.message; })));
	t.ok(everyReport.counts.error === 0, "and a broad spread of tags checks clean",
		JSON.stringify(everyReport.findings.filter(function(f){ return f.level === "error"; })));

	// ------------------------------------------------------------------
	t.section("check: report shape");
	// ------------------------------------------------------------------
	var shape = t.check(["-i", path.join(t.FIXTURES, "good.js")]).report;
	var keys = ["ok", "generator", "counts", "stats", "coverage", "findings"];
	for(var k=0; k<keys.length; k++){
		t.ok(Object.prototype.hasOwnProperty.call(shape, keys[k]),
			"the report always carries '" + keys[k] + "'", JSON.stringify(Object.keys(shape)));
	}
	t.ok(typeof shape.counts.error === "number" && typeof shape.counts.warning === "number"
			&& typeof shape.counts.info === "number",
		"counts are broken down by level", JSON.stringify(shape.counts));
};
