/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Decides whether a given file or folder should be skipped.
 *
 * Shared by the builder and by `--check` so both agree on exactly which files are "in"
 * the project.
 *
 * ### History
 *
 * The original implementation lived inside `documon.js` and had two defects that made
 * the entire ignore system inert:
 *
 * 1. It `return false`'d from *inside* the loop, so only the first pattern was ever
 *    consulted.
 * 2. That first default pattern (`**&#47;.*`) is not a valid regular expression --
 *    `new RegExp("**&#47;.*")` throws "Nothing to repeat" -- and the `catch` also
 *    returned false.
 *
 * Net effect: `shouldIgnore()` always returned false, so `node_modules`, `.git`, the
 * template folder, the output folder, and every user supplied ignore entry were all
 * silently walked. Running Documon at a project root would happily parse its own
 * dependencies.
 *
 * @module  ignore
 * @package documon
 */

/**
 * @property {array} DEFAULTS - Patterns always applied, expressed as valid regular
 * expressions (the old glob-looking strings never compiled).
 */
var DEFAULTS = [
	"(^|/)\\.[^/]+(/|$)",        // any dot-file or dot-folder
	"(^|/)node_modules(/|$)",
	"(^|/)bower_components(/|$)",
	"(^|/)vendor(/|$)"
];

/**
 * Translates a simple glob into a regular expression. Supports `*` (within a path
 * segment), `**` (across segments) and `?`. Anything else is escaped literally.
 *
 * @method     globToRegExp
 * @private
 * @param      {string}   glob - The glob pattern.
 * @return     {RegExp}        - The compiled expression, or null when it still won't compile.
 */
function globToRegExp(glob){

	var out = "";

	for(var i=0; i<glob.length; i++){
		var ch = glob[i];

		if(ch === "*"){
			if(glob[i+1] === "*"){
				out += ".*";
				i++;
				if(glob[i+1] === "/"){ i++; }
			} else {
				out += "[^/]*";
			}
		} else if(ch === "?"){
			out += "[^/]";
		} else if( "\\^$.|+()[]{}".indexOf(ch) > -1 ){
			out += "\\" + ch;
		} else {
			out += ch;
		}
	}

	try {
		return new RegExp(out, "i");
	} catch(e) {
		return null;
	}
}

/**
 * Builds a matcher.
 *
 * User supplied entries are matched as documented: a plain substring ("simple indexOf")
 * test first, then -- as a convenience -- as a regular expression when the string happens
 * to compile as one. Patterns that compile to nothing useful simply never match instead
 * of aborting the whole check.
 *
 * @method  create
 * @param   {array|string}  [userList]  - Caller supplied ignore entries.
 * @param   {array}         [extra]     - Internal paths to exclude (template, output, data folders).
 * @return  {object}                    - An object exposing `test(path)` and the resolved `patterns`.
 * @example
 *
 * 		var ignore = require("./ignore").create(["*.test.js"], [outputFolder]);
 * 		if( ignore.test(somePath) ){ continue; }
 */
function create(userList, extra){

	var patterns = DEFAULTS.slice();

	if(userList){
		if(typeof userList === "string"){
			patterns.push(userList);
		} else {
			patterns = patterns.concat(userList);
		}
	}

	if(extra){
		patterns = patterns.concat(extra);
	}

	// Pre-compile once, rather than building a RegExp per pattern per file.
	var compiled = [];
	for(var i=0; i<patterns.length; i++){
		var str = patterns[i];
		if( ! str || typeof str !== "string" ){
			continue;
		}
		var re = null;
		try {
			re = new RegExp(str, "i");
		} catch(e) {
			// Not a valid regex. If it looks like a glob ("*.test.js", "src/**/tmp"),
			// translate it rather than dropping the pattern on the floor -- glob syntax
			// is what most people (and most agents) reach for first.
			re = globToRegExp(str);
		}
		compiled.push({ str : str, re : re });
	}

	return {

		patterns : patterns,

		/**
		 * @method  test
		 * @param   {string}   item - The path to test.
		 * @return  {boolean}       - True when the path should be skipped.
		 */
		test : function(item){

			if( ! item ){
				return false;
			}

			var norm = String(item).split("\\").join("/");

			for(var i=0; i<compiled.length; i++){
				var pat = compiled[i];

				// Documented behaviour: plain substring match.
				if( pat.str.indexOf("\\") === -1 && norm.indexOf(pat.str) > -1 ){
					return true;
				}

				// Convenience: regular expression match.
				if( pat.re && pat.re.test(norm) ){
					return true;
				}
			}

			return false;
		}
	};
}

module.exports = {
	create   : create,
	DEFAULTS : DEFAULTS
};
