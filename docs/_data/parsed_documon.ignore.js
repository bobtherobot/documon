[
	{
		"text": "Decides whether a given file or folder should be skipped.\n\nShared by the builder and by `--check` so both agree on exactly which files are \"in\"\nthe project.\n\n### History\n\nThe original implementation lived inside `documon.js` and had two defects that made\nthe entire ignore system inert:\n\n1. It `return false`'d from *inside* the loop, so only the first pattern was ever\n   consulted.\n2. That first default pattern (`**&#47;.*`) is not a valid regular expression --\n   `new RegExp(\"**&#47;.*\")` throws \"Nothing to repeat\" -- and the `catch` also\n   returned false.\n\nNet effect: `shouldIgnore()` always returned false, so `node_modules`, `.git`, the\ntemplate folder, the output folder, and every user supplied ignore entry were all\nsilently walked. Running Documon at a project root would happily parse its own\ndependencies.\n\n",
		"start": 6,
		"end": 30,
		"file": "/Volumes/Drives/projects/documon/documon/src/ignore.js",
		"flags": [
			{
				"source": "@module  ignoreignore",
				"flag": "module",
				"after": "ignore",
				"afterType": "ignore",
				"name": "ignore",
				"single": true,
				"text": "ignore"
			},
			{
				"source": "@package documon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
			}
		],
		"source": "Decides whether a given file or folder should be skipped.\n\nShared by the builder and by `--check` so both agree on exactly which files are \"in\"\nthe project.\n\n### History\n\nThe original implementation lived inside `documon.js` and had two defects that made\nthe entire ignore system inert:\n\n1. It `return false`'d from *inside* the loop, so only the first pattern was ever\n   consulted.\n2. That first default pattern (`**&#47;.*`) is not a valid regular expression --\n   `new RegExp(\"**&#47;.*\")` throws \"Nothing to repeat\" -- and the `catch` also\n   returned false.\n\nNet effect: `shouldIgnore()` always returned false, so `node_modules`, `.git`, the\ntemplate folder, the output folder, and every user supplied ignore entry were all\nsilently walked. Running Documon at a project root would happily parse its own\ndependencies.\n\n@module  ignore\n@package documon",
		"meta": [],
		"id": "documon.ignore"
	},
	{
		"text": "",
		"start": 34,
		"end": 37,
		"file": "/Volumes/Drives/projects/documon/documon/src/ignore.js",
		"flags": [
			{
				"source": "@property {array} DEFAULTS - Patterns always applied, expressed as valid regular",
				"flag": "property",
				"after": "{array} DEFAULTS - Patterns always applied, expressed as valid regular",
				"type": "array",
				"afterType": "DEFAULTS - Patterns always applied, expressed as valid regular",
				"name": "DEFAULTS",
				"text": "Patterns always applied, expressed as valid regular\nexpressions (the old glob-looking strings never compiled)."
			}
		],
		"source": "@property {array} DEFAULTS - Patterns always applied, expressed as valid regular\nexpressions (the old glob-looking strings never compiled).",
		"meta": [],
		"id": "documon.ignore.DEFAULTS"
	},
	{
		"text": "Translates a simple glob into a regular expression. Supports `*` (within a path\nsegment), `**` (across segments) and `?`. Anything else is escaped literally.\n\n",
		"start": 45,
		"end": 53,
		"file": "/Volumes/Drives/projects/documon/documon/src/ignore.js",
		"flags": [
			{
				"source": "@method     globToRegExpglobToRegExp",
				"flag": "method",
				"after": "globToRegExp",
				"afterType": "globToRegExp",
				"name": "globToRegExp",
				"single": true,
				"text": "globToRegExp"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}   glob - The glob pattern.The glob pattern.",
				"flag": "param",
				"after": "{string}   glob - The glob pattern.",
				"type": "string",
				"afterType": "glob - The glob pattern.",
				"name": "glob",
				"text": "The glob pattern."
			},
			{
				"source": "@return     {RegExp}        - The compiled expression, or null when it still won't compile.",
				"flag": "return",
				"after": "{RegExp}        - The compiled expression, or null when it still won't compile.",
				"type": "RegExp",
				"afterType": "The compiled expression, or null when it still won't compile.",
				"text": "The compiled expression, or null when it still won't compile."
			}
		],
		"source": "Translates a simple glob into a regular expression. Supports `*` (within a path\nsegment), `**` (across segments) and `?`. Anything else is escaped literally.\n\n@method     globToRegExp\n@private\n@param      {string}   glob - The glob pattern.\n@return     {RegExp}        - The compiled expression, or null when it still won't compile.",
		"meta": [],
		"id": "documon.ignore.globToRegExp"
	},
	{
		"text": "Builds a matcher.\n\nUser supplied entries are matched as documented: a plain substring (\"simple indexOf\")\ntest first, then -- as a convenience -- as a regular expression when the string happens\nto compile as one. Patterns that compile to nothing useful simply never match instead\nof aborting the whole check.\n\nInternal paths (`extra`) are matched literally, never as expressions. They are real\nfilesystem paths, and treating them as patterns is actively dangerous: an output folder\nof `\"./\"` compiles to the regular expression `./`, which matches any character followed\nby a slash -- that is, every path in the project.\n\n",
		"start": 85,
		"end": 106,
		"file": "/Volumes/Drives/projects/documon/documon/src/ignore.js",
		"flags": [
			{
				"source": "@method  createcreate",
				"flag": "method",
				"after": "create",
				"afterType": "create",
				"name": "create",
				"single": true,
				"text": "create"
			},
			{
				"source": "@param   {array|string}  [userList]  - Caller supplied ignore entries.Caller supplied ignore entries.",
				"flag": "param",
				"after": "{array|string}  [userList]  - Caller supplied ignore entries.",
				"type": "array|string",
				"afterType": "[userList]  - Caller supplied ignore entries.",
				"optional": true,
				"name": "userList",
				"text": "Caller supplied ignore entries."
			},
			{
				"source": "@param   {array}         [extra]     - Internal paths to exclude (template, output, data folders).Internal paths to exclude (template, output, data folders).",
				"flag": "param",
				"after": "{array}         [extra]     - Internal paths to exclude (template, output, data folders).",
				"type": "array",
				"afterType": "[extra]     - Internal paths to exclude (template, output, data folders).",
				"optional": true,
				"name": "extra",
				"text": "Internal paths to exclude (template, output, data folders)."
			},
			{
				"source": "@return  {object}                    - An object exposing `test(path)` and the resolved `patterns`.An object exposing `test(path)` and the resolved `patterns`.",
				"flag": "return",
				"after": "{object}                    - An object exposing `test(path)` and the resolved `patterns`.",
				"type": "object",
				"afterType": "An object exposing `test(path)` and the resolved `patterns`.",
				"text": "An object exposing `test(path)` and the resolved `patterns`."
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\n\t\tvar ignore = require(\"./ignore\").create([\"*.test.js\"], [outputFolder]);\n\t\tif( ignore.test(somePath) ){ continue; }"
			}
		],
		"source": "Builds a matcher.\n\nUser supplied entries are matched as documented: a plain substring (\"simple indexOf\")\ntest first, then -- as a convenience -- as a regular expression when the string happens\nto compile as one. Patterns that compile to nothing useful simply never match instead\nof aborting the whole check.\n\nInternal paths (`extra`) are matched literally, never as expressions. They are real\nfilesystem paths, and treating them as patterns is actively dangerous: an output folder\nof `\"./\"` compiles to the regular expression `./`, which matches any character followed\nby a slash -- that is, every path in the project.\n\n@method  create\n@param   {array|string}  [userList]  - Caller supplied ignore entries.\n@param   {array}         [extra]     - Internal paths to exclude (template, output, data folders).\n@return  {object}                    - An object exposing `test(path)` and the resolved `patterns`.\n@example\n\n\t\tvar ignore = require(\"./ignore\").create([\"*.test.js\"], [outputFolder]);\n\t\tif( ignore.test(somePath) ){ continue; }",
		"meta": [],
		"id": "documon.ignore.create"
	},
	{
		"text": "",
		"start": 155,
		"end": 159,
		"file": "/Volumes/Drives/projects/documon/documon/src/ignore.js",
		"flags": [
			{
				"source": "@method  testtest",
				"flag": "method",
				"after": "test",
				"afterType": "test",
				"name": "test",
				"single": true,
				"text": "test"
			},
			{
				"source": "@param   {string}   item - The path to test.The path to test.",
				"flag": "param",
				"after": "{string}   item - The path to test.",
				"type": "string",
				"afterType": "item - The path to test.",
				"name": "item",
				"text": "The path to test."
			},
			{
				"source": "@return  {boolean}       - True when the path should be skipped.",
				"flag": "return",
				"after": "{boolean}       - True when the path should be skipped.",
				"type": "boolean",
				"afterType": "True when the path should be skipped.",
				"text": "True when the path should be skipped."
			}
		],
		"source": "@method  test\n@param   {string}   item - The path to test.\n@return  {boolean}       - True when the path should be skipped.",
		"meta": [],
		"id": "documon.ignore.test"
	}
]