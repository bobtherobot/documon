/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * A dependency-free test runner for Documon.
 *
 * Run everything with `npm test` or `node test/run.js`. Run one area by naming it:
 *
 * 		node test/run.js parse
 * 		node test/run.js parse tag organizer
 *
 * Areas are the files in `test/suites/`. Each exports `{ name, run }`; `run` is handed
 * the harness from `test/helpers.js` and does nothing but assert. Exits non-zero when
 * any assertion fails, so CI and automated callers can rely on it.
 *
 * @module  test
 * @package documon
 */

var fs   = require('fs');
var path = require('path');

var helpers = require('./helpers.js');

var SUITES = path.join(__dirname, "suites");

/**
 * @property {array} ORDER - The order suites run in. Cheap, self-contained areas come
 * first so a break in the parser is reported before minutes of build tests. Anything not
 * listed here still runs, alphabetically, at the end.
 */
var ORDER = [
	"utils",
	"npath",
	"fileops",
	"searchPrep",
	"markdown",
	"aliases",
	"extract",
	"parseFlag",
	"parse",
	"splitParsed",
	"tag",
	"organizer",
	"menuBuilder",
	"llms",
	"ignore",
	"more",
	"check",
	"config",
	"build",
	"jsdoc",
	"cli",
	"readme",
	"invariants"
];

/**
 * Lists the available suite names, in run order.
 *
 * @method  discover
 * @private
 * @return  {array} - Suite names, without the extension.
 */
function discover(){

	var names = fs.readdirSync(SUITES)
		.filter(function(f){ return /\.js$/.test(f); })
		.map(function(f){ return f.replace(/\.js$/, ""); });

	names.sort(function(a, b){
		var ai = ORDER.indexOf(a);
		var bi = ORDER.indexOf(b);
		if(ai === -1){ ai = ORDER.length; }
		if(bi === -1){ bi = ORDER.length; }
		if(ai !== bi){ return ai - bi; }
		return a < b ? -1 : (a > b ? 1 : 0);
	});

	return names;
}

/**
 * Matches a requested area against the available suites, case-insensitively.
 *
 * @method  resolve
 * @private
 * @param   {string} want      - What the caller typed.
 * @param   {array}  available - Every suite name.
 * @return  {string}           - The matching name, or null.
 */
function resolve(want, available){

	var lower = String(want).toLowerCase().replace(/\.js$/, "");

	for(var i=0; i<available.length; i++){
		if( available[i].toLowerCase() === lower ){
			return available[i];
		}
	}

	return null;
}

var available = discover();
var requested = process.argv.slice(2);
var selected  = available;

if(requested.length){

	selected = [];

	for(var a=0; a<requested.length; a++){

		var match = resolve(requested[a], available);

		if( ! match ){
			console.error("\nUnknown test area: " + requested[a]);
			console.error("Available areas:\n  " + available.join("\n  ") + "\n");
			process.exit(1);
		}

		if( selected.indexOf(match) === -1 ){
			selected.push(match);
		}
	}

	// Keep the canonical order even when the caller lists areas out of order.
	selected.sort(function(x, y){ return available.indexOf(x) - available.indexOf(y); });
}

var t = helpers.create();

console.log("\nDocumon test suite");
console.log(selected.length === available.length
	? "running all " + available.length + " areas"
	: "running: " + selected.join(", "));

var started = Date.now();

for(var s=0; s<selected.length; s++){

	var name  = selected[s];
	var suite = require( path.join(SUITES, name + ".js") );

	console.log("\n================================================");
	console.log("  " + (suite.name || name));
	console.log("================================================");

	try {
		suite.run(t);
	} catch(e) {
		t.ok(false, "[" + name + "] suite threw and could not finish",
			e && e.stack ? e.stack : String(e));
	}
}

var elapsed = ((Date.now() - started) / 1000).toFixed(1);

console.log("\n================================================");

if(t.state.failed){
	console.log("\nFailures:");
	for(var f=0; f<t.state.failures.length; f++){
		console.log("  - " + t.state.failures[f]);
	}
}

console.log("\n" + t.state.passed + " passed, " + t.state.failed + " failed"
	+ "  (" + selected.length + " areas, " + elapsed + "s)\n");

process.exit(t.state.failed ? 1 : 0);
