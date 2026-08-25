{
	"line": 31,
	"name": "ignore",
	"shortText": "Decides whether a given file or folder should be skipped.",
	"shortHtml": "<p>Decides whether a given file or folder should be skipped.</p>",
	"text": "Decides whether a given file or folder should be skipped.\n\nShared by the builder and by `--check` so both agree on exactly which files are \"in\"\nthe project.\n\n### History\n\nThe original implementation lived inside `documon.js` and had two defects that made\nthe entire ignore system inert:\n\n1. It `return false`'d from *inside* the loop, so only the first pattern was ever\n   consulted.\n2. That first default pattern (`**&#47;.*`) is not a valid regular expression --\n   `new RegExp(\"**&#47;.*\")` throws \"Nothing to repeat\" -- and the `catch` also\n   returned false.\n\nNet effect: `shouldIgnore()` always returned false, so `node_modules`, `.git`, the\ntemplate folder, the output folder, and every user supplied ignore entry were all\nsilently walked. Running Documon at a project root would happily parse its own\ndependencies.\n\n",
	"html": "<p>Decides whether a given file or folder should be skipped.</p>\n<p>Shared by the builder and by <code>--check</code> so both agree on exactly which files are \"in\"<br />\nthe project.</p>\n<h3 id=\"history\">History</h3>\n<p>The original implementation lived inside <code>documon.js</code> and had two defects that made<br />\nthe entire ignore system inert:</p>\n<ol>\n<li>It <code>return false</code>'d from <em>inside</em> the loop, so only the first pattern was ever<br />\nconsulted.</li>\n<li>That first default pattern (<code>**&amp;#47;.*</code>) is not a valid regular expression --<br />\n<code>new RegExp(\"**&amp;#47;.*\")</code> throws \"Nothing to repeat\" -- and the <code>catch</code> also<br />\nreturned false.</li>\n</ol>\n<p>Net effect: <code>shouldIgnore()</code> always returned false, so <code>node_modules</code>, <code>.git</code>, the<br />\ntemplate folder, the output folder, and every user supplied ignore entry were all<br />\nsilently walked. Running Documon at a project root would happily parse its own<br />\ndependencies.</p>",
	"entity": "module",
	"flagSearchText": " ignore documon",
	"package": "documon",
	"file": "src/ignore.js",
	"filename": "ignore.js",
	"klass": "ignore",
	"docfile": "documon.ignore.html",
	"id": "documon.ignore",
	"methods": [
		{
			"line": 107,
			"name": "create",
			"shortText": "Builds a matcher.",
			"shortHtml": "<p>Builds a matcher.</p>",
			"text": "Builds a matcher.\n\nUser supplied entries are matched as documented: a plain substring (\"simple indexOf\")\ntest first, then -- as a convenience -- as a regular expression when the string happens\nto compile as one. Patterns that compile to nothing useful simply never match instead\nof aborting the whole check.\n\nInternal paths (`extra`) are matched literally, never as expressions. They are real\nfilesystem paths, and treating them as patterns is actively dangerous: an output folder\nof `\"./\"` compiles to the regular expression `./`, which matches any character followed\nby a slash -- that is, every path in the project.\n\n",
			"html": "<p>Builds a matcher.</p>\n<p>User supplied entries are matched as documented: a plain substring (\"simple indexOf\")<br />\ntest first, then -- as a convenience -- as a regular expression when the string happens<br />\nto compile as one. Patterns that compile to nothing useful simply never match instead<br />\nof aborting the whole check.</p>\n<p>Internal paths (<code>extra</code>) are matched literally, never as expressions. They are real<br />\nfilesystem paths, and treating them as patterns is actively dangerous: an output folder<br />\nof <code>\"./\"</code> compiles to the regular expression <code>./</code>, which matches any character followed<br />\nby a slash -- that is, every path in the project.</p>",
			"entity": "method",
			"flagSearchText": " create Caller supplied ignore entries. Internal paths to exclude (template, output, data folders). An object exposing `test(path)` and the resolved `patterns`. \n\n\t\tvar ignore = require(\"./ignore\").create([\"*.test.js\"], [outputFolder]);\n\t\tif( ignore.test(somePath) ){ continue; }",
			"params": [
				{
					"name": "userList",
					"shortText": "Caller supplied ignore entries.",
					"shortHtml": "<p>Caller supplied ignore entries.</p>",
					"text": "Caller supplied ignore entries.",
					"html": "<p>Caller supplied ignore entries.</p>",
					"type": "array|string",
					"optional": true
				},
				{
					"name": "extra",
					"shortText": "Internal paths to exclude (template, output, data folders).",
					"shortHtml": "<p>Internal paths to exclude (template, output, data folders).</p>",
					"text": "Internal paths to exclude (template, output, data folders).",
					"html": "<p>Internal paths to exclude (template, output, data folders).</p>",
					"type": "array",
					"optional": true
				}
			],
			"returns": {
				"type": "object",
				"text": "An object exposing `test(path)` and the resolved `patterns`.",
				"html": "<p>An object exposing <code>test(path)</code> and the resolved <code>patterns</code>.</p>",
				"shortText": "<p>An object exposing <code>test(path)</code> and the resolved <code>patterns</code>.</p>",
				"shortHtml": "<p>An object exposing <code>test(path)</code> and the resolved <code>patterns</code>.</p>"
			},
			"example": [
				{
					"text": "\n\n\t\tvar ignore = require(\"./ignore\").create([\"*.test.js\"], [outputFolder]);\n\t\tif( ignore.test(somePath) ){ continue; }",
					"html": "<pre><code>    var ignore = require(\"./ignore\").create([\"*.test.js\"], [outputFolder]);\n    if( ignore.test(somePath) ){ continue; }</code></pre>"
				}
			],
			"file": "src/ignore.js",
			"filename": "ignore.js",
			"klass": "ignore",
			"package": "documon",
			"docfile": "documon.ignore.html",
			"id": "documon.ignore.create"
		},
		{
			"line": 54,
			"name": "globToRegExp",
			"shortText": "Translates a simple glob into a regular expression. Supports `*` (within a path",
			"shortHtml": "<p>Translates a simple glob into a regular expression. Supports <code>*</code> (within a path</p>",
			"text": "Translates a simple glob into a regular expression. Supports `*` (within a path\nsegment), `**` (across segments) and `?`. Anything else is escaped literally.\n\n",
			"html": "<p>Translates a simple glob into a regular expression. Supports <code>*</code> (within a path<br />\nsegment), <code>**</code> (across segments) and <code>?</code>. Anything else is escaped literally.</p>",
			"entity": "method",
			"flagSearchText": " globToRegExp The glob pattern. The compiled expression, or null when it still won't compile.",
			"access": "private",
			"params": [
				{
					"name": "glob",
					"shortText": "The glob pattern.",
					"shortHtml": "<p>The glob pattern.</p>",
					"text": "The glob pattern.",
					"html": "<p>The glob pattern.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "RegExp",
				"text": "The compiled expression, or null when it still won't compile.",
				"html": "<p>The compiled expression, or null when it still won't compile.</p>",
				"shortText": "<p>The compiled expression, or null when it still won't compile.</p>",
				"shortHtml": "<p>The compiled expression, or null when it still won't compile.</p>"
			},
			"file": "src/ignore.js",
			"filename": "ignore.js",
			"klass": "ignore",
			"package": "documon",
			"docfile": "documon.ignore.html",
			"id": "documon.ignore.globToRegExp"
		}
	],
	"properties": [
		{
			"line": 38,
			"name": "DEFAULTS",
			"shortText": "Patterns always applied, expressed as valid regular",
			"shortHtml": "<p>Patterns always applied, expressed as valid regular</p>",
			"text": "Patterns always applied, expressed as valid regular\nexpressions (the old glob-looking strings never compiled).",
			"html": "<p>Patterns always applied, expressed as valid regular<br />\nexpressions (the old glob-looking strings never compiled).</p>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " Patterns always applied, expressed as valid regular\nexpressions (the old glob-looking strings never compiled).",
			"file": "src/ignore.js",
			"filename": "ignore.js",
			"klass": "ignore",
			"package": "documon",
			"docfile": "documon.ignore.html",
			"id": "documon.ignore.DEFAULTS"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "3.0.0",
	"search": {
		"documon.ignore": "ignore : Decides whether given file folder should skipped Shared builder check both agree exactly which files project History original implementation lived inside documon defects that made entire ignore system inert return false from inside loop only first pattern ever consulted That first default pattern valid regular expression RegExp throws Nothing repeat catch also returned false effect shouldIgnore always returned false node modules template folder output folder every user supplied ignore entry were silently walked Running Documon project root would happily parse dependenciesignore documon",
		"documon.ignore.globToRegExp": "globToRegExp : Translates simple glob into regular expression Supports within path segment across segments Anything else escaped literallyglobToRegExp glob pattern compiled expression null when still compile",
		"documon.ignore.create": "create : Builds matcher User supplied entries matched documented plain substring simple indexOf test first then convenience regular expression when string happens compile Patterns that compile nothing useful simply never match instead aborting whole check Internal paths extra matched literally never expressions They real filesystem paths treating them patterns actively dangerous output folder compiles regular expression which matches character followed slash that every path projectcreate Caller supplied ignore entries Internal paths exclude template output data folders object exposing test path resolved patterns ignore require ignore create test outputFolder ignore test somePath continue",
		"documon.ignore.DEFAULTS": "DEFAULTS : Patterns always applied expressed valid regular expressions glob looking strings never compiledPatterns always applied expressed valid regular expressions glob looking strings never compiled"
	}
}