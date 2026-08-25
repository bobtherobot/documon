[
	{
		"start": 6,
		"end": 24,
		"data": "Validates documentation comments without generating anything.\n\nBecause Documon infers nothing from source code, a missing or misspelled tag doesn't\nproduce a warning -- it produces *silence*, and the symbol simply never appears in the\noutput. That is fine for a human who eyeballs the result, and useless for an automated\nwriter that needs to know whether it succeeded.\n\n`--check` is that feedback signal: parse everything, report what won't work, exit\nnon-zero. Write comments, check, repair, repeat.\n\n@module  check\n@package documon\n@example\n\n\t\tdocumon --check -i ./src            # human readable\n\t\tdocumon --check --json -i ./src     # machine readable\n\t\tdocumon --check --coverage -i ./src # plus undocumented-symbol advisory"
	},
	{
		"start": 34,
		"end": 37,
		"data": "@property {array} KIND_TAGS - Tags that declare what an entity *is*. A comment block\nneeds one of these to become anything at all."
	},
	{
		"start": 40,
		"end": 42,
		"data": "@property {array} EXTENDISH - Tags whose value must resolve to another documented id."
	},
	{
		"start": 45,
		"end": 48,
		"data": "@property {array} KNOWN_TAGS - Every tag Documon actually acts on. Anything else is\ninert -- it will be silently dropped from the output."
	},
	{
		"start": 56,
		"end": 59,
		"data": "@property {object} COMMON_TYPOS - Tags people (and models trained on other doc systems)\nreach for that Documon does not implement, mapped to the right answer."
	},
	{
		"start": 85,
		"end": 88,
		"data": "@property {object} TAG_NOTES - Extra guidance for tags that look like they should work\nbut genuinely have no Documon equivalent."
	},
	{
		"start": 99,
		"end": 111,
		"data": "Creates a finding.\n\n@method     finding\n@private\n@param      {string}  level    - \"error\", \"warning\" or \"info\".\n@param      {string}  rule     - Stable machine-readable rule id.\n@param      {string}  file     - Source file.\n@param      {number}  line     - 1-based line number.\n@param      {string}  message  - What is wrong.\n@param      {string}  [fix]    - How to fix it.\n@return     {object}           - The finding."
	},
	{
		"start": 123,
		"end": 130,
		"data": "Collects the source files that would be parsed by a build with this config.\n\n@method     collect\n@private\n@param      {object}  conf - Documon config.\n@return     {array}        - Absolute file paths."
	},
	{
		"start": 171,
		"end": 184,
		"data": "Derives the id a comment block will be filed under, mirroring how `tag.js` builds ids.\n\nIds are scoped `package.container.member` -- the same shape as the generated filenames\n(`documon.dirutils.html`). A `@method` therefore inherits the `@class` or `@module`\ndeclared above it in the same file; without that scope every `run()` in the project\nwould look like a collision.\n\n@method     blockId\n@private\n@param      {object}  info      - Summarized block.\n@param      {string}  [scope]   - The enclosing class/module name.\n@return     {string}            - Dotted id, or null."
	},
	{
		"start": 209,
		"end": 216,
		"data": "Reduces a parsed comment block to the facts the rules care about.\n\n@method     summarize\n@private\n@param      {object}  parsed - Output of `parse()`.\n@return     {object}         - Summary."
	},
	{
		"start": 286,
		"end": 297,
		"data": "A deliberately shallow symbol scan used only by the coverage advisory.\n\nThis never feeds the render path -- Documon still derives structure exclusively from\ncomments. It exists so an automated writer can be told \"you documented 4 of 11 exported\nthings\" instead of silently shipping a near-empty manual.\n\n@method     scanSymbols\n@private\n@param      {string}  source - File contents.\n@return     {array}          - `{ name, line }` records."
	},
	{
		"start": 325,
		"end": 337,
		"data": "Runs the validator.\n\n@method  run\n@param   {object}  conf         - Documon config (same shape the builder receives).\n@param   {object}  [opts]       - Options.\n@param   {boolean} [opts.coverage=false] - Include the undocumented-symbol advisory.\n@return  {object}               - `{ ok, counts, findings, stats }`.\n@example\n\n\t\tvar report = require(\"documon\").check.run({ src : \"./src\" }, { coverage : true });\n\t\tif(report.counts.error){ process.exit(2); }"
	},
	{
		"start": 630,
		"end": 636,
		"data": "Prints a report for humans.\n\n@method  print\n@param   {object}    report - The result of `run()`.\n@param   {function}  log    - The logger."
	}
]