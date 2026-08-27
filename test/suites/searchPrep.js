/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/searchPrep.js`, which decides what text the static search index contains.
 *
 * Its rules are aggressive on purpose -- the index ships to the browser as a plain file,
 * so short words and punctuation are stripped to keep it small.
 *
 * @module  suites/searchPrep
 * @package test
 */

exports.name = "searchPrep: search text";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var searchPrep = t.src("searchPrep");

	// ------------------------------------------------------------------
	t.section("searchPrep: stripping");
	// ------------------------------------------------------------------
	t.ok(searchPrep("hello wonderful world") === "hello wonderful world",
		"keeps ordinary words", searchPrep("hello wonderful world"));

	t.ok(searchPrep("hello, wonderful; world!") === "hello wonderful world",
		"strips punctuation", searchPrep("hello, wonderful; world!"));

	t.ok(searchPrep("alpha\n\tbravo\ncharlie") === "alpha bravo charlie",
		"collapses newlines and tabs into single spaces",
		searchPrep("alpha\n\tbravo\ncharlie"));

	t.ok(searchPrep("alpha      bravo") === "alpha bravo",
		"collapses runs of spaces", searchPrep("alpha      bravo"));

	// ------------------------------------------------------------------
	t.section("searchPrep: short words are dropped");
	// ------------------------------------------------------------------
	// Words of one to three characters are removed, so "the cat sat" contributes nothing.
	t.ok(searchPrep("the cat sat") === "", "one-to-three character words are dropped",
		JSON.stringify(searchPrep("the cat sat")));

	t.ok(searchPrep("configuration file loader") === "configuration file loader",
		"four-character words survive", searchPrep("configuration file loader"));

	t.ok(searchPrep("the configuration is loaded") === "configuration loaded",
		"short words are dropped from a mixed sentence",
		searchPrep("the configuration is loaded"));

	// ------------------------------------------------------------------
	t.section("searchPrep: single results are discarded");
	// ------------------------------------------------------------------
	// A lone word is not worth an index entry, so it is thrown away entirely.
	t.ok(searchPrep("configuration") === "", "a single surviving word yields nothing",
		JSON.stringify(searchPrep("configuration")));

	t.ok(searchPrep("configuration loader") === "configuration loader",
		"two surviving words are kept");

	// ------------------------------------------------------------------
	t.section("searchPrep: empty input");
	// ------------------------------------------------------------------
	t.ok(searchPrep("") === "", "empty string in, empty string out");
	t.ok(searchPrep(null) === "", "null yields an empty string, not a crash");
	t.ok(searchPrep(undefined) === "", "undefined yields an empty string");
	t.ok(searchPrep("!!! ??? ...") === "", "punctuation-only input yields nothing");
};
