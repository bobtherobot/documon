/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers the JSDoc-compatibility story end to end.
 *
 * A block written the way a JSDoc-trained author (or a model trained on JSDoc) writes it
 * has to produce a page, because an unrecognised kind tag does not render badly -- it
 * removes the entity entirely. Equally, tags whose meaning differs must *not* be quietly
 * accepted, because that produces confidently wrong documentation.
 *
 * @module  suites/jsdoc
 * @package test
 */

var path = require('path');
var fs   = require('fs');

exports.name = "jsdoc: writing it the other way";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var fixture = path.join(t.FIXTURES, "jsdoc.js");

	// ------------------------------------------------------------------
	t.section("jsdoc: what --check reports");
	// ------------------------------------------------------------------
	var jsd = t.check(["-i", fixture], t.FIXTURES).report;

	t.ok(jsd.stats.entities >= 5, "JSDoc-style tags still produce entities",
		"entities=" + jsd.stats.entities);
	t.ok(t.hasRule(jsd, "normalized-tag"), "reports what it normalized");

	var normalized = t.findings(jsd, "normalized-tag")
		.map(function(f){ return f.message; }).join(" ");

	t.ok(/@function was read as @method/.test(normalized), "@function -> @method", normalized);
	t.ok(/@arg was read as @param/.test(normalized), "@arg -> @param", normalized);
	t.ok(/@prop was read as @property/.test(normalized), "@prop -> @property", normalized);

	t.ok(jsd.findings.every(function(f){ return f.level !== "error"; }),
		"and none of it is an error",
		JSON.stringify(jsd.findings.filter(function(f){ return f.level === "error"; })));

	// @fires has a real but different meaning, so it is reported rather than aliased.
	var fires = jsd.findings.filter(function(f){ return /@fires/.test(f.message); })[0];
	t.ok(fires !== undefined, "@fires is still reported, not aliased",
		JSON.stringify(jsd.findings.map(function(f){ return f.message; })));
	t.ok(fires && ! /Use @event instead/.test(fires.fix || ""),
		"and is not given a bogus replacement", fires && fires.fix);
	t.ok(fires && /emits/.test(fires.fix || ""), "@fires advice explains the difference",
		fires && fires.fix);

	// ------------------------------------------------------------------
	t.section("jsdoc: what actually gets built");
	// ------------------------------------------------------------------
	var jsOut = path.join(t.tmp(), "jsdoc");
	t.cli(["-i", fixture, "-o", jsOut, "-n", "Geo"], t.FIXTURES);

	var jsModel    = t.readJson(path.join(jsOut, "docs", "model.json"));
	var allMembers = jsModel.pages.reduce(function(acc, p){ return acc.concat(p.members); }, []);

	var areaMember = allMembers.filter(function(m){ return m.name === "area"; })[0];
	t.ok(areaMember !== undefined, "@function produced a method",
		"members: " + allMembers.map(function(m){ return m.name; }).join(", "));
	t.ok(areaMember && areaMember.params.length === 1, "@arg produced a parameter");
	t.ok(areaMember && areaMember.returns && areaMember.returns.type === "number",
		"@returns produced a return type");
	t.ok(areaMember && /Computes the area/.test(areaMember.description),
		"@description folded into the description", areaMember && areaMember.description);

	var areaMeta = (areaMember && areaMember.meta || []).map(function(m){ return m.tag; });
	t.ok(areaMeta.indexOf("deprecated") > -1, "@deprecated kept as metadata", areaMeta.join(","));
	t.ok(areaMeta.indexOf("throws") > -1, "@throws kept as metadata");
	t.ok(areaMeta.indexOf("since") > -1, "@since kept as metadata");

	var visibleMember = allMembers.filter(function(m){ return m.name === "visible"; })[0];
	t.ok(visibleMember !== undefined, "@prop produced a property");
	t.ok(visibleMember && visibleMember.access === "private", "@access private applied",
		visibleMember && visibleMember.access);

	var renderMember = allMembers.filter(function(m){ return m.name === "render"; })[0];
	var types = (renderMember && renderMember.params || []).map(function(p){ return p.type; });
	t.ok(types.indexOf("string|number") > -1, "union types survive", types.join(" "));
	t.ok(types.indexOf("Array<string>") > -1, "generic types survive");
	t.ok(types.indexOf("*") > -1, "wildcard types survive");
	t.ok(types.indexOf("...number") > -1, "rest types survive");

	// metadata reaches the rendered page
	var pageFiles = fs.readdirSync(path.join(jsOut, "docs")).filter(function(f){
		return /^geo\..*\.html$/.test(f);
	});
	var anyMeta = pageFiles.some(function(f){
		return /meta-deprecated/.test( t.read(path.join(jsOut, "docs", f)) );
	});
	t.ok(anyMeta, "@deprecated renders on the page", "looked in: " + pageFiles.join(", "));

	// ------------------------------------------------------------------
	t.section("jsdoc: every alias builds a real entity");
	// ------------------------------------------------------------------
	// The point of aliasing is that the entity exists. Each of these is written the
	// other way and must still appear in the output.
	var aliased = t.project({
		src : {
			"a.js" : [
				t.OPEN, " * A module.", " * @module m", " * @package app", " " + t.CLOSE, "",
				t.OPEN, " * By function.", " * @function viaFunction", " " + t.CLOSE, "",
				t.OPEN, " * By func.", " * @func viaFunc", " " + t.CLOSE, "",
				t.OPEN, " * By prop.", " * @prop {number} viaProp", " " + t.CLOSE, "",
				t.OPEN, " * By member.", " * @member {number} viaMember", " " + t.CLOSE, "",
				t.OPEN, " * By var.", " * @var {number} viaVar", " " + t.CLOSE
			].join("\n")
		}
	});

	t.cli(["-i", aliased.src, "-o", aliased.out, "-n", "A"], aliased.dir);
	var aliasedNames = t.readJson(path.join(aliased.out, "docs", "model.json"))
		.pages.reduce(function(acc, p){ return acc.concat(p.members); }, [])
		.map(function(m){ return m.name; });

	var expected = ["viaFunction", "viaFunc", "viaProp", "viaMember", "viaVar"];
	for(var i=0; i<expected.length; i++){
		t.ok(aliasedNames.indexOf(expected[i]) > -1,
			expected[i] + " produced an entity", JSON.stringify(aliasedNames));
	}

	// @augments is the JSDoc spelling of @extends, and must resolve inheritance.
	var augments = t.project({
		src : {
			"b.js" : [
				t.OPEN, " * The parent.", " * @class Base", " * @package app", " " + t.CLOSE, "",
				t.OPEN, " * Inherited.", " * @method shared", " " + t.CLOSE, "",
				t.OPEN, " * The child.", " * @class Child", " * @package app",
				" * @augments app.Base", " " + t.CLOSE
			].join("\n")
		}
	});

	t.cli(["-i", augments.src, "-o", augments.out, "-n", "B"], augments.dir);
	var childPage = t.readJson(path.join(augments.out, "docs", "model.json"))
		.pages.filter(function(p){ return p.id === "app.Child"; })[0];

	t.ok(childPage !== undefined, "@augments produced a class in the right package");
	t.ok(childPage && (childPage.members || []).some(function(m){ return m.name === "shared"; }),
		"and cross-filled the parent's members",
		childPage && JSON.stringify((childPage.members || []).map(function(m){ return m.name; })));

	// ------------------------------------------------------------------
	t.section("jsdoc: tags that must not be silently accepted");
	// ------------------------------------------------------------------
	// Accepting these would produce documentation that is confidently wrong, so each is
	// reported with advice explaining the difference rather than a replacement.
	var notAliased = t.project({
		src : {
			"c.js" : [
				t.OPEN, " * A module.", " * @module m", " * @package app", " " + t.CLOSE, "",
				t.OPEN, " * Uses tags with no equivalent.", " * @method thing",
				" * @typedef {string} NameLike",
				" * @memberof app.Other",
				" * @callback done",
				" * @enum {number}",
				" * @inheritdoc",
				" " + t.CLOSE
			].join("\n")
		}
	});

	var notReport = t.check(["-i", notAliased.src], notAliased.dir).report;
	var messages  = notReport.findings.map(function(f){ return f.message; }).join(" | ");

	var mustReport = ["typedef", "memberof", "callback", "enum", "inheritdoc"];
	for(var m=0; m<mustReport.length; m++){
		t.ok(messages.indexOf("@" + mustReport[m]) > -1,
			"@" + mustReport[m] + " is reported rather than silently accepted", messages);
	}

	var withAdvice = notReport.findings.filter(function(f){
		return /@(typedef|memberof|callback|enum|inheritdoc)/.test(f.message) && f.fix;
	});
	t.ok(withAdvice.length >= 4, "each comes with advice on what to do instead",
		JSON.stringify(withAdvice.map(function(f){ return f.fix; })));
};
