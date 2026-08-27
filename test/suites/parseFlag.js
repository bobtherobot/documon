/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/parseFlag.js`, which turns one `@tag ...` line into a flag object.
 *
 * This is the fiddliest module in the project: the tag grammar is deliberately loose so
 * people can write documentation the way they naturally would, which means a great many
 * spellings have to land on the same result. The cases here are drawn from the grammar
 * table in the module's own header comment.
 *
 * The vocabulary a flag object uses:
 *
 * - `flag`       - the tag name, "@" stripped and resolved through aliases
 * - `type`       - whatever was inside `{}`
 * - `name`       - the identifier
 * - `defaultVal` - the value after "="
 * - `optional`   - true when the name was bracketed
 * - `text`       - the description
 * - `after`      - everything after the tag, verbatim
 * - `afterType`  - everything after the `{type}`
 *
 * @module  suites/parseFlag
 * @package test
 */

exports.name = "parseFlag: the tag grammar";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var parseFlag = t.src("parseFlag");

	/**
	 * Parses one line in isolation.
	 *
	 * @method  f
	 * @private
	 * @param   {string} line - The tag line.
	 * @return  {object}      - The flag object.
	 */
	function f(line){
		return parseFlag(line, []);
	}

	// ------------------------------------------------------------------
	t.section("parseFlag: the tag name");
	// ------------------------------------------------------------------
	t.ok(f("@method foo").flag === "method", "reads the tag name");
	t.ok(f("@method").flag === "method", "reads a tag with nothing after it");
	t.ok(f("@method ").flag === "method", "trailing space does not become part of the name");
	t.ok(f("@method\t").flag === "method", "nor does a trailing tab");
	t.ok(f("   @method foo").flag === "method", "leading whitespace is ignored");

	// Aliases are resolved here, and what the author actually typed is preserved so the
	// build summary and --check can report the normalization.
	var aliased = f("@function foo");
	t.ok(aliased.flag === "method", "an alias resolves to the canonical tag", aliased.flag);
	t.ok(aliased.writtenFlag === "function", "and the written spelling is remembered",
		aliased.writtenFlag);
	t.ok(f("@method foo").writtenFlag === undefined,
		"a canonical tag records no written spelling");

	t.ok(f("@madeup foo").flag === "madeup", "an unknown tag is left alone for --check");

	// ------------------------------------------------------------------
	t.section("parseFlag: type, name and description");
	// ------------------------------------------------------------------
	var full = f("@param {object|string} name - description is here");
	t.ok(full.type === "object|string", "reads a union type", full.type);
	t.ok(full.name === "name", "reads the name");
	t.ok(full.text === "description is here", "reads the description", full.text);
	t.ok(full.after === "{object|string} name - description is here",
		"after holds everything past the tag", full.after);
	t.ok(full.afterType === "name - description is here",
		"afterType holds everything past the type", full.afterType);

	// The dash between name and description is optional, and so is the whitespace form.
	var forms = [
		"@param {object} name - description is here",
		"@param {object} name -description is here",
		"@param {object} name description is here",
		"@param {object} name\t\tdescription is here",
		"@param {object} name \t description is here",
		"@param  \t {object} name \t- description is here"
	];
	for(var i=0; i<forms.length; i++){
		var one = f(forms[i]);
		t.ok(one.name === "name" && one.text === "description is here",
			"same result for: " + JSON.stringify(forms[i]),
			JSON.stringify({ name : one.name, text : one.text }));
	}

	t.ok(f("@param {object}").type === "object", "a type with nothing after it");
	t.ok(f("@param {object}").name === undefined, "and no name is invented");
	t.ok(f("@param {} name - desc").type === "", "an empty type is an empty string");
	t.ok(f("@param {} name - desc").name === "name", "and the name still reads");

	var noType = f("@param {object} - description is here");
	t.ok(noType.name === undefined, "a dash straight after the type means no name",
		noType.name);
	t.ok(noType.text === "description is here", "and the description is the whole rest");

	var dashOnly = f("@param - description is here");
	t.ok(dashOnly.text === "description is here", "a description with no type or name",
		dashOnly.text);
	t.ok(dashOnly.name === undefined, "and still no name");

	t.ok(f("@param").after === "", "a bare tag has an empty after");
	t.ok(f("@param").type === undefined, "a bare tag has no type");
	t.ok(f("@param").name === undefined, "a bare tag has no name");

	// ------------------------------------------------------------------
	t.section("parseFlag: name written before the type");
	// ------------------------------------------------------------------
	// Both orders are accepted, because both are in common use.
	var front = f("@param name {object|string} - description is here");
	t.ok(front.name === "name", "the name may come first", front.name);
	t.ok(front.type === "object|string", "and the type still reads", front.type);
	t.ok(front.text === "description is here", "and so does the description", front.text);

	var frontDefault = f('@param name="bar" {object} - desc');
	t.ok(frontDefault.name === "name", "a default value works in the name-first form",
		frontDefault.name);
	t.ok(frontDefault.defaultVal === "bar", "and the value is captured",
		frontDefault.defaultVal);

	// ------------------------------------------------------------------
	t.section("parseFlag: default values");
	// ------------------------------------------------------------------
	t.ok(f('@param {object} name="bar" - desc').defaultVal === "bar",
		"a quoted default value has its quotes stripped");
	t.ok(f("@param {object} name='bar' - desc").defaultVal === "bar",
		"single quotes are stripped too");
	t.ok(f("@param {object} name=bar - desc").defaultVal === "bar",
		"an unquoted default value reads");
	t.ok(f("@param {number} count=0 - desc").defaultVal === "0",
		"a numeric default reads as a string");
	t.ok(f('@param {object} name = "bar" - desc').defaultVal === "bar",
		"spaces around the equals sign are tolerated",
		f('@param {object} name = "bar" - desc').defaultVal);
	t.ok(f('@param {object} name = "bar" - desc').name === "name",
		"and the name is not polluted by them");
	t.ok(f('@param {object} name="bar" - desc').name === "name",
		"the name stops at the equals sign");
	t.ok(f("@property {number} total=0").name === "total",
		"@property carries a default the same way");

	// The description may itself contain braces and at-signs; only the leading {type}
	// and leading @tag are structural.
	var messy = f('@param {object} name="bar" - description with {other} bracket @with at sign');
	t.ok(messy.type === "object", "a brace later in the line is not the type", messy.type);
	t.ok(/\{other\} bracket @with at sign/.test(messy.text),
		"braces and at-signs survive in the description", messy.text);

	// ------------------------------------------------------------------
	t.section("parseFlag: optional names");
	// ------------------------------------------------------------------
	var opt = f("@param {object} [opts] - Options.");
	t.ok(opt.optional === true, "square brackets mark a parameter optional");
	t.ok(opt.name === "opts", "and the brackets are stripped from the name", opt.name);

	var optDefault = f("@param {number} [timeout=30] - How long.");
	t.ok(optDefault.optional === true, "optional with a default is still optional");
	t.ok(optDefault.name === "timeout", "the name is clean", optDefault.name);
	t.ok(optDefault.defaultVal === "30", "and the default reads", optDefault.defaultVal);

	t.ok(f("@param {object} name - Not optional.").optional === undefined,
		"an unbracketed name is not optional");

	// ------------------------------------------------------------------
	t.section("parseFlag: types are passed through verbatim");
	// ------------------------------------------------------------------
	// Documon does not interpret types, so anything a language can express must survive.
	var types = [
		"string", "string|number", "Array<string>", "Object<string, number>",
		"*", "...number", "?string", "!string", "function(a, b)"
	];
	for(var ty=0; ty<types.length; ty++){
		var got = f("@param {" + types[ty] + "} x - desc").type;
		t.ok(got === types[ty], "type survives: " + types[ty], "got " + JSON.stringify(got));
	}

	// A nested-brace record type is the one thing that does not survive: the type is
	// read with a non-greedy match to the first closing brace, so "{{a: string}}" is
	// truncated. Pinned here so the limitation is visible rather than surprising.
	t.ok(f("@param {{a: string}} x - desc").type === "{a: string",
		"a nested-brace record type is truncated at the first closing brace",
		JSON.stringify(f("@param {{a: string}} x - desc").type));

	// ------------------------------------------------------------------
	t.section("parseFlag: dotted names on @param and @property");
	// ------------------------------------------------------------------
	// A dot means "member of" only on these two tags, and it nests the flag under its
	// parent instead of adding a sibling.
	var nested = [];
	parseFlag("@param {object} opts - Options.", nested);
	parseFlag("@param {number} opts.timeout - How long.", nested);
	parseFlag("@param {string} opts.name - The name.", nested);

	t.ok(nested.length === 1, "children do not become siblings",
		JSON.stringify(nested.map(function(x){ return x.name; })));
	t.ok(nested[0].name === "opts", "the parent is the one in the list");
	t.ok(nested[0].children && nested[0].children.length === 2,
		"both children are attached to it",
		JSON.stringify(nested[0].children && nested[0].children.map(function(x){ return x.name; })));
	t.ok(nested[0].children[0].name === "timeout", "the child keeps only its own name");
	t.ok(nested[0].children[0].parent === "opts", "and records its parent");
	t.ok(nested[0].children[0].type === "number", "and keeps its own type");

	var propNested = [];
	parseFlag("@property {object} conf - Config.", propNested);
	parseFlag("@property {string} conf.path - Where.", propNested);
	t.ok(propNested.length === 1 && propNested[0].children.length === 1,
		"@property nests the same way",
		JSON.stringify(propNested.map(function(x){ return x.name; })));

	// A child whose parent was never declared stays at the top level rather than
	// vanishing.
	var orphan = [];
	parseFlag("@param {number} nothing.here - Orphaned.", orphan);
	t.ok(orphan.length === 1, "a child with no declared parent is still recorded",
		JSON.stringify(orphan));
	t.ok(orphan[0].name === "here" && orphan[0].parent === "nothing",
		"and remembers what it was looking for",
		JSON.stringify({ name : orphan[0].name, parent : orphan[0].parent }));

	// ------------------------------------------------------------------
	t.section("parseFlag: dotted names everywhere else are qualified ids");
	// ------------------------------------------------------------------
	// This is the bug that made inheritance written the documented way do nothing:
	// "@extends app.Base" had its name truncated to "Base", and when the same block also
	// carried "@package app" the flag was re-parented under the package tag and
	// disappeared from the block entirely.
	var refTags = ["extends", "implements", "inherits", "overrides", "see", "requires"];

	for(var r=0; r<refTags.length; r++){
		var ref = f("@" + refTags[r] + " app.Base");
		t.ok(ref.name === "app.Base",
			"@" + refTags[r] + " keeps a fully qualified name whole",
			"got " + ref.name);
		t.ok(ref.parent === undefined,
			"@" + refTags[r] + " is not re-parented");
	}

	// The killer case: the same block declares the package and extends into it.
	var sameBlock = [];
	parseFlag("@class Child", sameBlock);
	parseFlag("@package app", sameBlock);
	parseFlag("@extends app.Base", sameBlock);

	t.ok(sameBlock.length === 3, "@extends survives alongside @package in one block",
		JSON.stringify(sameBlock.map(function(x){ return x.flag + ":" + x.name; })));
	t.ok(sameBlock[2].name === "app.Base", "with its qualified name intact",
		sameBlock[2].name);
	t.ok( ! sameBlock[1].children, "and the @package tag gains no children");

	// ------------------------------------------------------------------
	t.section("parseFlag: single-word lines");
	// ------------------------------------------------------------------
	// Some tags carry one word that is a name, some carry one word that is a type or a
	// description. The "single" marker lets tag.js decide.
	var single = f("@type string");
	t.ok(single.single === true, "a lone word after a tag is marked single");
	t.ok(single.name === "string", "and is available as the name");

	t.ok(f("@param {object} name").single === true,
		"a type followed by one word is single too");
	t.ok(f("@param {object} name - desc").single === undefined,
		"a line with a description is not single");
};
