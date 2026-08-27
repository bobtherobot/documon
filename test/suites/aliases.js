/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/aliases.js`.
 *
 * Aliasing is load-bearing: because structure comes only from tags, a tag Documon does
 * not recognise is not a cosmetic problem, it is a missing page. Equally important is
 * what is deliberately *not* aliased, so this suite pins both directions.
 *
 * @module  suites/aliases
 * @package test
 */

exports.name = "aliases: tag vocabulary";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var aliases = t.src("aliases");

	// ------------------------------------------------------------------
	t.section("aliases: resolve");
	// ------------------------------------------------------------------
	t.ok(aliases.resolve("function") === "method", "resolve maps @function");
	t.ok(aliases.resolve("func") === "method", "resolve maps @func");
	t.ok(aliases.resolve("arg") === "param", "resolve maps @arg");
	t.ok(aliases.resolve("argument") === "param", "resolve maps @argument");
	t.ok(aliases.resolve("parameter") === "param", "resolve maps @parameter");
	t.ok(aliases.resolve("prop") === "property", "resolve maps @prop");
	t.ok(aliases.resolve("member") === "property", "resolve maps @member");
	t.ok(aliases.resolve("var") === "property", "resolve maps @var");
	t.ok(aliases.resolve("augments") === "extends", "resolve maps @augments");
	t.ok(aliases.resolve("yields") === "return", "resolve maps @yields");
	t.ok(aliases.resolve("constructs") === "constructor", "resolve maps @constructs");
	t.ok(aliases.resolve("defaultvalue") === "default", "resolve maps @defaultvalue");

	t.ok(aliases.resolve("method") === "method", "resolve leaves canonical tags alone");
	t.ok(aliases.resolve("param") === "param", "resolve leaves @param alone");
	t.ok(aliases.resolve("FUNCTION") === "method", "resolve is case-insensitive");
	t.ok(aliases.resolve("Prop") === "property", "resolve handles mixed case");

	t.ok(aliases.resolve("") === "", "an empty tag comes back unchanged");
	t.ok(aliases.resolve(null) === null, "null comes back unchanged rather than throwing");
	t.ok(aliases.resolve("madeupthing") === "madeupthing",
		"an unknown tag comes back unchanged, for --check to report");

	// ------------------------------------------------------------------
	t.section("aliases: isAlias");
	// ------------------------------------------------------------------
	t.ok(aliases.isAlias("function") === true, "isAlias is true for an alias");
	t.ok(aliases.isAlias("method") === false, "isAlias is false for a canonical tag");
	t.ok(aliases.isAlias("fires") === false, "isAlias is false for a tag left alone");
	t.ok(aliases.isAlias(null) === false, "isAlias handles null");

	// ------------------------------------------------------------------
	t.section("aliases: what is deliberately not aliased");
	// ------------------------------------------------------------------
	// These have real but *different* meanings. Aliasing them would produce quietly
	// wrong documentation, so they stay unrecognised and surface in --check instead.
	var untouched = ["fires", "emits", "memberof", "typedef", "callback", "enum", "inheritdoc"];

	for(var i=0; i<untouched.length; i++){
		t.ok(aliases.resolve(untouched[i]) === untouched[i],
			"@" + untouched[i] + " is not aliased");
	}

	// ------------------------------------------------------------------
	t.section("aliases: retired spellings");
	// ------------------------------------------------------------------
	t.ok(aliases.resolve("implements") === "implements", "@implements is the canonical spelling");
	t.ok(aliases.resolve("impliments") === "impliments", "@impliments is not aliased back");
	t.ok(aliases.deprecatedFor("impliments") === "implements", "@impliments is flagged as retired");
	t.ok(aliases.deprecatedFor("Impliments") === "implements", "retirement is case-insensitive");
	t.ok(aliases.deprecatedFor("implements") === null, "@implements is not flagged as retired");
	t.ok(aliases.deprecatedFor("method") === null, "an ordinary tag is not flagged as retired");
	t.ok(aliases.deprecatedFor(null) === null, "deprecatedFor handles null");

	// ------------------------------------------------------------------
	t.section("aliases: description tags");
	// ------------------------------------------------------------------
	var descTags = ["desc", "description", "summary", "classdesc", "fileoverview", "file", "overview"];

	for(var d=0; d<descTags.length; d++){
		t.ok(aliases.isDescription(descTags[d]) === true,
			"@" + descTags[d] + " folds into the description");
	}

	t.ok(aliases.isDescription("DESCRIPTION") === true, "description matching is case-insensitive");
	t.ok(aliases.isDescription("method") === false, "@method is not a description tag");
	t.ok(aliases.isDescription(null) === false, "isDescription handles null");

	// ------------------------------------------------------------------
	t.section("aliases: metadata tags");
	// ------------------------------------------------------------------
	t.ok(aliases.metaLabel("deprecated") === "Deprecated", "@deprecated has a label");
	t.ok(aliases.metaLabel("throws") === "Throws", "@throws has a label");
	t.ok(aliases.metaLabel("exception") === "Throws", "@exception shares the @throws label");
	t.ok(aliases.metaLabel("since") === "Since", "@since has a label");
	t.ok(aliases.metaLabel("author") === "Author", "@author has a label");
	t.ok(aliases.metaLabel("license") === "License", "@license has a label");
	t.ok(aliases.metaLabel("copyright") === "Copyright", "@copyright has a label");
	t.ok(aliases.metaLabel("todo") === "To do", "@todo has a label");
	t.ok(aliases.metaLabel("THROWS") === "Throws", "meta labels are case-insensitive");
	t.ok(aliases.metaLabel("method") === null, "@method is not metadata");
	t.ok(aliases.metaLabel(null) === null, "metaLabel handles null");

	// ------------------------------------------------------------------
	t.section("aliases: inline links");
	// ------------------------------------------------------------------
	t.ok(aliases.inlineLinks("See {@link geo.Circle}.") === "See [geo.Circle](geo.Circle).",
		"{@link} becomes a markdown link", aliases.inlineLinks("See {@link geo.Circle}."));

	t.ok(aliases.inlineLinks("See {@link geo.Box|a box}.") === "See [a box](geo.Box).",
		"a piped label is used", aliases.inlineLinks("See {@link geo.Box|a box}."));

	t.ok(aliases.inlineLinks("See {@link geo.Box a box}.") === "See [a box](geo.Box).",
		"a spaced label is used", aliases.inlineLinks("See {@link geo.Box a box}."));

	t.ok(aliases.inlineLinks("{@linkcode a.B}") === "[a.B](a.B)", "linkcode is handled");
	t.ok(aliases.inlineLinks("{@linkplain a.B}") === "[a.B](a.B)", "linkplain is handled");
	t.ok(aliases.inlineLinks("{@tutorial setup}") === "[setup](setup)", "tutorial is handled");

	t.ok(aliases.inlineLinks("One {@link a.A} and {@link b.B|bee}.")
			=== "One [a.A](a.A) and [bee](b.B).",
		"several links in one string are all rewritten",
		aliases.inlineLinks("One {@link a.A} and {@link b.B|bee}."));

	t.ok(aliases.inlineLinks("No links here.") === "No links here.",
		"text without links is returned untouched");
	t.ok(aliases.inlineLinks("Braces {like this} are left alone.")
			=== "Braces {like this} are left alone.",
		"ordinary braces are not links");
	t.ok(aliases.inlineLinks("") === "", "empty text is handled");
	t.ok(aliases.inlineLinks(null) === null, "null is handled");

	// ------------------------------------------------------------------
	t.section("aliases: the exported tables");
	// ------------------------------------------------------------------
	t.ok(typeof aliases.TAGS === "object", "TAGS is exported");
	t.ok(typeof aliases.DEPRECATED === "object", "DEPRECATED is exported");
	t.ok(Array.isArray(aliases.DESCRIPTION_TAGS), "DESCRIPTION_TAGS is exported");
	t.ok(typeof aliases.META_TAGS === "object", "META_TAGS is exported");
	t.ok(aliases.ACCESS_VALUES.join(",") === "private,protected,public",
		"ACCESS_VALUES lists the legal @access values", aliases.ACCESS_VALUES.join(","));

	// An alias table that maps a tag onto another alias would resolve inconsistently
	// depending on how many times resolve() ran.
	var owns = function(obj, key){ return Object.prototype.hasOwnProperty.call(obj, key); };

	var chained = Object.keys(aliases.TAGS).filter(function(k){
		return owns(aliases.TAGS, aliases.TAGS[k]);
	});
	t.ok(chained.length === 0, "no alias points at another alias", JSON.stringify(chained));

	// A tag cannot be both retired and silently aliased -- the two paths report
	// differently and the user would see whichever check ran first.
	var both = Object.keys(aliases.DEPRECATED).filter(function(k){ return owns(aliases.TAGS, k); });
	t.ok(both.length === 0, "no tag is both retired and aliased", JSON.stringify(both));

	// ------------------------------------------------------------------
	t.section("aliases: tags that collide with Object.prototype");
	// ------------------------------------------------------------------
	// The lookup tables are plain object literals, so every lookup can fall through to
	// Object.prototype. "@constructor" is a real Documon tag -- check.js lists it in
	// KNOWN_TAGS and tag.js acts on it -- and it collides with Object.prototype.constructor.
	t.ok(aliases.resolve("constructor") === "constructor",
		"@constructor resolves to itself, not to Object.prototype.constructor",
		"got a " + typeof aliases.resolve("constructor"));

	t.ok(aliases.isAlias("constructor") === false,
		"@constructor is not reported as an alias");

	t.ok(aliases.metaLabel("constructor") === null,
		"@constructor is not mistaken for a metadata tag",
		"got a " + typeof aliases.metaLabel("constructor"));

	t.ok(aliases.deprecatedFor("constructor") === null,
		"@constructor is not reported as retired",
		"got a " + typeof aliases.deprecatedFor("constructor"));

	// The same hole exists for every other inherited member.
	var inherited = ["toString", "valueOf", "hasOwnProperty", "isPrototypeOf", "__proto__"];
	var leaked = inherited.filter(function(k){
		return typeof aliases.resolve(k) !== "string"
			|| aliases.metaLabel(k) !== null
			|| aliases.deprecatedFor(k) !== null;
	});
	t.ok(leaked.length === 0,
		"no inherited Object member leaks through a tag lookup", JSON.stringify(leaked));
};
