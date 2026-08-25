[
	{
		"text": "Validates documentation comments without generating anything.\n\nBecause Documon infers nothing from source code, a missing or misspelled tag doesn't\nproduce a warning -- it produces *silence*, and the symbol simply never appears in the\noutput. That is fine for a human who eyeballs the result, and useless for an automated\nwriter that needs to know whether it succeeded.\n\n`--check` is that feedback signal: parse everything, report what won't work, exit\nnon-zero. Write comments, check, repair, repeat.\n\n",
		"start": 6,
		"end": 24,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@module  checkcheck",
				"flag": "module",
				"after": "check",
				"afterType": "check",
				"name": "check",
				"single": true,
				"text": "check"
			},
			{
				"source": "@package documondocumon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\n\t\tdocumon --check -i ./src            # human readable\n\t\tdocumon --check --json -i ./src     # machine readable\n\t\tdocumon --check --coverage -i ./src # plus undocumented-symbol advisory"
			}
		],
		"source": "Validates documentation comments without generating anything.\n\nBecause Documon infers nothing from source code, a missing or misspelled tag doesn't\nproduce a warning -- it produces *silence*, and the symbol simply never appears in the\noutput. That is fine for a human who eyeballs the result, and useless for an automated\nwriter that needs to know whether it succeeded.\n\n`--check` is that feedback signal: parse everything, report what won't work, exit\nnon-zero. Write comments, check, repair, repeat.\n\n@module  check\n@package documon\n@example\n\n\t\tdocumon --check -i ./src            # human readable\n\t\tdocumon --check --json -i ./src     # machine readable\n\t\tdocumon --check --coverage -i ./src # plus undocumented-symbol advisory",
		"meta": [],
		"id": "documon.check"
	},
	{
		"text": "",
		"start": 35,
		"end": 38,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@property {array} KIND_TAGS - Tags that declare what an entity *is*. A comment block",
				"flag": "property",
				"after": "{array} KIND_TAGS - Tags that declare what an entity *is*. A comment block",
				"type": "array",
				"afterType": "KIND_TAGS - Tags that declare what an entity *is*. A comment block",
				"name": "KIND_TAGS",
				"text": "Tags that declare what an entity *is*. A comment block\nneeds one of these to become anything at all."
			}
		],
		"source": "@property {array} KIND_TAGS - Tags that declare what an entity *is*. A comment block\nneeds one of these to become anything at all.",
		"meta": [],
		"id": "documon.check.KIND_TAGS"
	},
	{
		"text": "",
		"start": 41,
		"end": 43,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@property {array} EXTENDISH - Tags whose value must resolve to another documented id.",
				"flag": "property",
				"after": "{array} EXTENDISH - Tags whose value must resolve to another documented id.",
				"type": "array",
				"afterType": "EXTENDISH - Tags whose value must resolve to another documented id.",
				"name": "EXTENDISH",
				"text": "Tags whose value must resolve to another documented id."
			}
		],
		"source": "@property {array} EXTENDISH - Tags whose value must resolve to another documented id.",
		"meta": [],
		"id": "documon.check.EXTENDISH"
	},
	{
		"text": "",
		"start": 46,
		"end": 49,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@property {array} KNOWN_TAGS - Every tag Documon actually acts on. Anything else is",
				"flag": "property",
				"after": "{array} KNOWN_TAGS - Every tag Documon actually acts on. Anything else is",
				"type": "array",
				"afterType": "KNOWN_TAGS - Every tag Documon actually acts on. Anything else is",
				"name": "KNOWN_TAGS",
				"text": "Every tag Documon actually acts on. Anything else is\ninert -- it will be silently dropped from the output."
			}
		],
		"source": "@property {array} KNOWN_TAGS - Every tag Documon actually acts on. Anything else is\ninert -- it will be silently dropped from the output.",
		"meta": [],
		"id": "documon.check.KNOWN_TAGS"
	},
	{
		"text": "",
		"start": 57,
		"end": 60,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@property {object} COMMON_TYPOS - Tags people (and models trained on other doc systems)",
				"flag": "property",
				"after": "{object} COMMON_TYPOS - Tags people (and models trained on other doc systems)",
				"type": "object",
				"afterType": "COMMON_TYPOS - Tags people (and models trained on other doc systems)",
				"name": "COMMON_TYPOS",
				"text": "Tags people (and models trained on other doc systems)\nreach for that Documon does not implement, mapped to the right answer."
			}
		],
		"source": "@property {object} COMMON_TYPOS - Tags people (and models trained on other doc systems)\nreach for that Documon does not implement, mapped to the right answer.",
		"meta": [],
		"id": "documon.check.COMMON_TYPOS"
	},
	{
		"text": "",
		"start": 86,
		"end": 89,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@property {object} TAG_NOTES - Extra guidance for tags that look like they should work",
				"flag": "property",
				"after": "{object} TAG_NOTES - Extra guidance for tags that look like they should work",
				"type": "object",
				"afterType": "TAG_NOTES - Extra guidance for tags that look like they should work",
				"name": "TAG_NOTES",
				"text": "Extra guidance for tags that look like they should work\nbut genuinely have no Documon equivalent."
			}
		],
		"source": "@property {object} TAG_NOTES - Extra guidance for tags that look like they should work\nbut genuinely have no Documon equivalent.",
		"meta": [],
		"id": "documon.check.TAG_NOTES"
	},
	{
		"text": "Creates a finding.\n\n",
		"start": 101,
		"end": 113,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@method     findingfinding",
				"flag": "method",
				"after": "finding",
				"afterType": "finding",
				"name": "finding",
				"single": true,
				"text": "finding"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}  level    - \"error\", \"warning\" or \"info\".\"error\", \"warning\" or \"info\".",
				"flag": "param",
				"after": "{string}  level    - \"error\", \"warning\" or \"info\".",
				"type": "string",
				"afterType": "level    - \"error\", \"warning\" or \"info\".",
				"name": "level",
				"text": "\"error\", \"warning\" or \"info\"."
			},
			{
				"source": "@param      {string}  rule     - Stable machine-readable rule id.Stable machine-readable rule id.",
				"flag": "param",
				"after": "{string}  rule     - Stable machine-readable rule id.",
				"type": "string",
				"afterType": "rule     - Stable machine-readable rule id.",
				"name": "rule",
				"text": "Stable machine-readable rule id."
			},
			{
				"source": "@param      {string}  file     - Source file.Source file.",
				"flag": "param",
				"after": "{string}  file     - Source file.",
				"type": "string",
				"afterType": "file     - Source file.",
				"name": "file",
				"text": "Source file."
			},
			{
				"source": "@param      {number}  line     - 1-based line number.1-based line number.",
				"flag": "param",
				"after": "{number}  line     - 1-based line number.",
				"type": "number",
				"afterType": "line     - 1-based line number.",
				"name": "line",
				"text": "1-based line number."
			},
			{
				"source": "@param      {string}  message  - What is wrong.What is wrong.",
				"flag": "param",
				"after": "{string}  message  - What is wrong.",
				"type": "string",
				"afterType": "message  - What is wrong.",
				"name": "message",
				"text": "What is wrong."
			},
			{
				"source": "@param      {string}  [fix]    - How to fix it.How to fix it.",
				"flag": "param",
				"after": "{string}  [fix]    - How to fix it.",
				"type": "string",
				"afterType": "[fix]    - How to fix it.",
				"optional": true,
				"name": "fix",
				"text": "How to fix it."
			},
			{
				"source": "@return     {object}           - The finding.",
				"flag": "return",
				"after": "{object}           - The finding.",
				"type": "object",
				"afterType": "The finding.",
				"text": "The finding."
			}
		],
		"source": "Creates a finding.\n\n@method     finding\n@private\n@param      {string}  level    - \"error\", \"warning\" or \"info\".\n@param      {string}  rule     - Stable machine-readable rule id.\n@param      {string}  file     - Source file.\n@param      {number}  line     - 1-based line number.\n@param      {string}  message  - What is wrong.\n@param      {string}  [fix]    - How to fix it.\n@return     {object}           - The finding.",
		"meta": [],
		"id": "documon.check.finding"
	},
	{
		"text": "Collects the source files that would be parsed by a build with this config.\n\n",
		"start": 125,
		"end": 132,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@method     collectcollect",
				"flag": "method",
				"after": "collect",
				"afterType": "collect",
				"name": "collect",
				"single": true,
				"text": "collect"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {object}  conf - Documon config.Documon config.",
				"flag": "param",
				"after": "{object}  conf - Documon config.",
				"type": "object",
				"afterType": "conf - Documon config.",
				"name": "conf",
				"text": "Documon config."
			},
			{
				"source": "@return     {array}        - Absolute file paths.",
				"flag": "return",
				"after": "{array}        - Absolute file paths.",
				"type": "array",
				"afterType": "Absolute file paths.",
				"text": "Absolute file paths."
			}
		],
		"source": "Collects the source files that would be parsed by a build with this config.\n\n@method     collect\n@private\n@param      {object}  conf - Documon config.\n@return     {array}        - Absolute file paths.",
		"meta": [],
		"id": "documon.check.collect"
	},
	{
		"text": "Lists the ids of the prose pages the \"more\" folder will produce.\n\nThose pages are real link targets (`[the options](more.options)`), but they come\nfrom markdown, not comments, so the cross-reference pass has no way to know they\nexist. Without this, every link into the manual reads as broken.\n\n",
		"start": 173,
		"end": 184,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@method  moreIdsmoreIds",
				"flag": "method",
				"after": "moreIds",
				"afterType": "moreIds",
				"name": "moreIds",
				"single": true,
				"text": "moreIds"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {object} conf - The resolved configuration.The resolved configuration.",
				"flag": "param",
				"after": "{object} conf - The resolved configuration.",
				"type": "object",
				"afterType": "conf - The resolved configuration.",
				"name": "conf",
				"text": "The resolved configuration."
			},
			{
				"source": "@return  {object} A map of id -> true. Empty when no more folder is configured.",
				"flag": "return",
				"after": "{object} A map of id -> true. Empty when no more folder is configured.",
				"type": "object",
				"afterType": "A map of id -> true. Empty when no more folder is configured.",
				"name": "A",
				"text": "map of id -> true. Empty when no more folder is configured."
			}
		],
		"source": "Lists the ids of the prose pages the \"more\" folder will produce.\n\nThose pages are real link targets (`[the options](more.options)`), but they come\nfrom markdown, not comments, so the cross-reference pass has no way to know they\nexist. Without this, every link into the manual reads as broken.\n\n@method  moreIds\n@private\n@param   {object} conf - The resolved configuration.\n@return  {object} A map of id -> true. Empty when no more folder is configured.",
		"meta": [],
		"id": "documon.check.moreIds"
	},
	{
		"text": "Derives the id a comment block will be filed under, mirroring how `tag.js` builds ids.\n\nIds are scoped `package.container.member` -- the same shape as the generated filenames\n(`documon.dirutils.html`). A `@method` therefore inherits the `@class` or `@module`\ndeclared above it in the same file; without that scope every `run()` in the project\nwould look like a collision.\n\n",
		"start": 224,
		"end": 237,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@method     blockIdblockId",
				"flag": "method",
				"after": "blockId",
				"afterType": "blockId",
				"name": "blockId",
				"single": true,
				"text": "blockId"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {object}  info      - Summarized block.Summarized block.",
				"flag": "param",
				"after": "{object}  info      - Summarized block.",
				"type": "object",
				"afterType": "info      - Summarized block.",
				"name": "info",
				"text": "Summarized block."
			},
			{
				"source": "@param      {string}  [scope]   - The enclosing class/module name.The enclosing class/module name.",
				"flag": "param",
				"after": "{string}  [scope]   - The enclosing class/module name.",
				"type": "string",
				"afterType": "[scope]   - The enclosing class/module name.",
				"optional": true,
				"name": "scope",
				"text": "The enclosing class/module name."
			},
			{
				"source": "@return     {string}            - Dotted id, or null.",
				"flag": "return",
				"after": "{string}            - Dotted id, or null.",
				"type": "string",
				"afterType": "Dotted id, or null.",
				"text": "Dotted id, or null."
			}
		],
		"source": "Derives the id a comment block will be filed under, mirroring how `tag.js` builds ids.\n\nIds are scoped `package.container.member` -- the same shape as the generated filenames\n(`documon.dirutils.html`). A `@method` therefore inherits the `@class` or `@module`\ndeclared above it in the same file; without that scope every `run()` in the project\nwould look like a collision.\n\n@method     blockId\n@private\n@param      {object}  info      - Summarized block.\n@param      {string}  [scope]   - The enclosing class/module name.\n@return     {string}            - Dotted id, or null.",
		"meta": [],
		"id": "documon.check.blockId"
	},
	{
		"text": "Reduces a parsed comment block to the facts the rules care about.\n\n",
		"start": 262,
		"end": 269,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@method     summarizesummarize",
				"flag": "method",
				"after": "summarize",
				"afterType": "summarize",
				"name": "summarize",
				"single": true,
				"text": "summarize"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {object}  parsed - Output of `parse()`.Output of `parse()`.",
				"flag": "param",
				"after": "{object}  parsed - Output of `parse()`.",
				"type": "object",
				"afterType": "parsed - Output of `parse()`.",
				"name": "parsed",
				"text": "Output of `parse()`."
			},
			{
				"source": "@return     {object}         - Summary.",
				"flag": "return",
				"after": "{object}         - Summary.",
				"type": "object",
				"afterType": "Summary.",
				"text": "Summary."
			}
		],
		"source": "Reduces a parsed comment block to the facts the rules care about.\n\n@method     summarize\n@private\n@param      {object}  parsed - Output of `parse()`.\n@return     {object}         - Summary.",
		"meta": [],
		"id": "documon.check.summarize"
	},
	{
		"text": "A deliberately shallow symbol scan used only by the coverage advisory.\n\nThis never feeds the render path -- Documon still derives structure exclusively from\ncomments. It exists so an automated writer can be told \"you documented 4 of 11 exported\nthings\" instead of silently shipping a near-empty manual.\n\n",
		"start": 342,
		"end": 353,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@method     scanSymbolsscanSymbols",
				"flag": "method",
				"after": "scanSymbols",
				"afterType": "scanSymbols",
				"name": "scanSymbols",
				"single": true,
				"text": "scanSymbols"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}  source - File contents.File contents.",
				"flag": "param",
				"after": "{string}  source - File contents.",
				"type": "string",
				"afterType": "source - File contents.",
				"name": "source",
				"text": "File contents."
			},
			{
				"source": "@return     {array}          - `{ name, line }` records.",
				"flag": "return",
				"after": "{array}          - `{ name, line }` records.",
				"type": "array",
				"afterType": "`{ name, line }` records.",
				"text": "`{ name, line }` records."
			}
		],
		"source": "A deliberately shallow symbol scan used only by the coverage advisory.\n\nThis never feeds the render path -- Documon still derives structure exclusively from\ncomments. It exists so an automated writer can be told \"you documented 4 of 11 exported\nthings\" instead of silently shipping a near-empty manual.\n\n@method     scanSymbols\n@private\n@param      {string}  source - File contents.\n@return     {array}          - `{ name, line }` records.",
		"meta": [],
		"id": "documon.check.scanSymbols"
	},
	{
		"text": "Runs the validator.\n\n",
		"start": 381,
		"end": 393,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@method  runrun",
				"flag": "method",
				"after": "run",
				"afterType": "run",
				"name": "run",
				"single": true,
				"text": "run"
			},
			{
				"source": "@param   {object}  conf         - Documon config (same shape the builder receives).Documon config (same shape the builder receives).",
				"flag": "param",
				"after": "{object}  conf         - Documon config (same shape the builder receives).",
				"type": "object",
				"afterType": "conf         - Documon config (same shape the builder receives).",
				"name": "conf",
				"text": "Documon config (same shape the builder receives)."
			},
			{
				"source": "@param   {object}  [opts]       - Options.Options.",
				"flag": "param",
				"after": "{object}  [opts]       - Options.",
				"type": "object",
				"afterType": "[opts]       - Options.",
				"optional": true,
				"name": "opts",
				"text": "Options.",
				"children": [
					{
						"source": "@param   {boolean} [opts.coverage=false] - Include the undocumented-symbol advisory.Include the undocumented-symbol advisory.",
						"flag": "param",
						"after": "{boolean} [opts.coverage=false] - Include the undocumented-symbol advisory.",
						"type": "boolean",
						"afterType": "[opts.coverage=false] - Include the undocumented-symbol advisory.",
						"defaultVal": "false",
						"optional": true,
						"parent": "opts",
						"name": "coverage",
						"text": "Include the undocumented-symbol advisory."
					}
				]
			},
			{
				"source": "@return  {object}               - `{ ok, counts, findings, stats }`.`{ ok, counts, findings, stats }`.",
				"flag": "return",
				"after": "{object}               - `{ ok, counts, findings, stats }`.",
				"type": "object",
				"afterType": "`{ ok, counts, findings, stats }`.",
				"text": "`{ ok, counts, findings, stats }`."
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\n\t\tvar report = require(\"documon\").check.run({ src : \"./src\" }, { coverage : true });\n\t\tif(report.counts.error){ process.exit(2); }"
			}
		],
		"source": "Runs the validator.\n\n@method  run\n@param   {object}  conf         - Documon config (same shape the builder receives).\n@param   {object}  [opts]       - Options.\n@param   {boolean} [opts.coverage=false] - Include the undocumented-symbol advisory.\n@return  {object}               - `{ ok, counts, findings, stats }`.\n@example\n\n\t\tvar report = require(\"documon\").check.run({ src : \"./src\" }, { coverage : true });\n\t\tif(report.counts.error){ process.exit(2); }",
		"meta": [],
		"id": "documon.check.run"
	},
	{
		"text": "Prints a report for humans.\n\n",
		"start": 701,
		"end": 707,
		"file": "/Volumes/Drives/projects/documon/documon/src/check.js",
		"flags": [
			{
				"source": "@method  printprint",
				"flag": "method",
				"after": "print",
				"afterType": "print",
				"name": "print",
				"single": true,
				"text": "print"
			},
			{
				"source": "@param   {object}    report - The result of `run()`.The result of `run()`.",
				"flag": "param",
				"after": "{object}    report - The result of `run()`.",
				"type": "object",
				"afterType": "report - The result of `run()`.",
				"name": "report",
				"text": "The result of `run()`."
			},
			{
				"source": "@param   {function}  log    - The logger.",
				"flag": "param",
				"after": "{function}  log    - The logger.",
				"type": "function",
				"afterType": "log    - The logger.",
				"name": "log",
				"text": "The logger."
			}
		],
		"source": "Prints a report for humans.\n\n@method  print\n@param   {object}    report - The result of `run()`.\n@param   {function}  log    - The logger.",
		"meta": [],
		"id": "documon.check.print"
	}
]