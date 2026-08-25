[
	{
		"start": 6,
		"end": 30,
		"data": "Decides whether a given file or folder should be skipped.\n\nShared by the builder and by `--check` so both agree on exactly which files are \"in\"\nthe project.\n\n### History\n\nThe original implementation lived inside `documon.js` and had two defects that made\nthe entire ignore system inert:\n\n1. It `return false`'d from *inside* the loop, so only the first pattern was ever\n   consulted.\n2. That first default pattern (`**&#47;.*`) is not a valid regular expression --\n   `new RegExp(\"**&#47;.*\")` throws \"Nothing to repeat\" -- and the `catch` also\n   returned false.\n\nNet effect: `shouldIgnore()` always returned false, so `node_modules`, `.git`, the\ntemplate folder, the output folder, and every user supplied ignore entry were all\nsilently walked. Running Documon at a project root would happily parse its own\ndependencies.\n\n@module  ignore\n@package documon"
	},
	{
		"start": 34,
		"end": 37,
		"data": "@property {array} DEFAULTS - Patterns always applied, expressed as valid regular\nexpressions (the old glob-looking strings never compiled)."
	},
	{
		"start": 45,
		"end": 53,
		"data": "Translates a simple glob into a regular expression. Supports `*` (within a path\nsegment), `**` (across segments) and `?`. Anything else is escaped literally.\n\n@method     globToRegExp\n@private\n@param      {string}   glob - The glob pattern.\n@return     {RegExp}        - The compiled expression, or null when it still won't compile."
	},
	{
		"start": 85,
		"end": 106,
		"data": "Builds a matcher.\n\nUser supplied entries are matched as documented: a plain substring (\"simple indexOf\")\ntest first, then -- as a convenience -- as a regular expression when the string happens\nto compile as one. Patterns that compile to nothing useful simply never match instead\nof aborting the whole check.\n\nInternal paths (`extra`) are matched literally, never as expressions. They are real\nfilesystem paths, and treating them as patterns is actively dangerous: an output folder\nof `\"./\"` compiles to the regular expression `./`, which matches any character followed\nby a slash -- that is, every path in the project.\n\n@method  create\n@param   {array|string}  [userList]  - Caller supplied ignore entries.\n@param   {array}         [extra]     - Internal paths to exclude (template, output, data folders).\n@return  {object}                    - An object exposing `test(path)` and the resolved `patterns`.\n@example\n\n\t\tvar ignore = require(\"./ignore\").create([\"*.test.js\"], [outputFolder]);\n\t\tif( ignore.test(somePath) ){ continue; }"
	},
	{
		"start": 155,
		"end": 159,
		"data": "@method  test\n@param   {string}   item - The path to test.\n@return  {boolean}       - True when the path should be skipped."
	}
]