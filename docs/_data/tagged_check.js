{
	"line": 25,
	"name": "check",
	"shortText": "Validates documentation comments without generating anything.",
	"shortHtml": "<p>Validates documentation comments without generating anything.</p>",
	"text": "Validates documentation comments without generating anything.\n\nBecause Documon infers nothing from source code, a missing or misspelled tag doesn't\nproduce a warning -- it produces *silence*, and the symbol simply never appears in the\noutput. That is fine for a human who eyeballs the result, and useless for an automated\nwriter that needs to know whether it succeeded.\n\n`--check` is that feedback signal: parse everything, report what won't work, exit\nnon-zero. Write comments, check, repair, repeat.\n\n",
	"html": "<p>Validates documentation comments without generating anything.</p>\n<p>Because Documon infers nothing from source code, a missing or misspelled tag doesn't<br />\nproduce a warning -- it produces <em>silence</em>, and the symbol simply never appears in the<br />\noutput. That is fine for a human who eyeballs the result, and useless for an automated<br />\nwriter that needs to know whether it succeeded.</p>\n<p><code>--check</code> is that feedback signal: parse everything, report what won't work, exit<br />\nnon-zero. Write comments, check, repair, repeat.</p>",
	"entity": "module",
	"flagSearchText": " check documon \n\n\t\tdocumon --check -i ./src            # human readable\n\t\tdocumon --check --json -i ./src     # machine readable\n\t\tdocumon --check --coverage -i ./src # plus undocumented-symbol advisory",
	"package": "documon",
	"example": [
		{
			"text": "\n\n\t\tdocumon --check -i ./src            # human readable\n\t\tdocumon --check --json -i ./src     # machine readable\n\t\tdocumon --check --coverage -i ./src # plus undocumented-symbol advisory",
			"html": "<pre><code>    documon --check -i ./src            # human readable\n    documon --check --json -i ./src     # machine readable\n    documon --check --coverage -i ./src # plus undocumented-symbol advisory</code></pre>"
		}
	],
	"file": "src/check.js",
	"filename": "check.js",
	"klass": "check",
	"docfile": "documon.check.html",
	"id": "documon.check",
	"methods": [
		{
			"line": 186,
			"name": "blockId",
			"shortText": "Derives the id a comment block will be filed under, mirroring how `tag.js` builds ids.",
			"shortHtml": "<p>Derives the id a comment block will be filed under, mirroring how <code>tag.js</code> builds ids.</p>",
			"text": "Derives the id a comment block will be filed under, mirroring how `tag.js` builds ids.\n\nIds are scoped `package.container.member` -- the same shape as the generated filenames\n(`documon.dirutils.html`). A `@method` therefore inherits the `@class` or `@module`\ndeclared above it in the same file; without that scope every `run()` in the project\nwould look like a collision.\n\n",
			"html": "<p>Derives the id a comment block will be filed under, mirroring how <code>tag.js</code> builds ids.</p>\n<p>Ids are scoped <code>package.container.member</code> -- the same shape as the generated filenames<br />\n(<code>documon.dirutils.html</code>). A <code>@method</code> therefore inherits the <code>@class</code> or <code>@module</code><br />\ndeclared above it in the same file; without that scope every <code>run()</code> in the project<br />\nwould look like a collision.</p>",
			"entity": "method",
			"flagSearchText": " blockId Summarized block. The enclosing class/module name. Dotted id, or null.",
			"access": "private",
			"params": [
				{
					"name": "info",
					"shortText": "Summarized block.",
					"shortHtml": "<p>Summarized block.</p>",
					"text": "Summarized block.",
					"html": "<p>Summarized block.</p>",
					"type": "object"
				},
				{
					"name": "scope",
					"shortText": "The enclosing class/module name.",
					"shortHtml": "<p>The enclosing class/module name.</p>",
					"text": "The enclosing class/module name.",
					"html": "<p>The enclosing class/module name.</p>",
					"type": "string",
					"optional": true
				}
			],
			"returns": {
				"type": "string",
				"text": "Dotted id, or null.",
				"html": "<p>Dotted id, or null.</p>",
				"shortText": "<p>Dotted id, or null.</p>",
				"shortHtml": "<p>Dotted id, or null.</p>"
			},
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.blockId"
		},
		{
			"line": 132,
			"name": "collect",
			"shortText": "Collects the source files that would be parsed by a build with this config.",
			"shortHtml": "<p>Collects the source files that would be parsed by a build with this config.</p>",
			"text": "Collects the source files that would be parsed by a build with this config.\n\n",
			"html": "<p>Collects the source files that would be parsed by a build with this config.</p>",
			"entity": "method",
			"flagSearchText": " collect Documon config. Absolute file paths.",
			"access": "private",
			"params": [
				{
					"name": "conf",
					"shortText": "Documon config.",
					"shortHtml": "<p>Documon config.</p>",
					"text": "Documon config.",
					"html": "<p>Documon config.</p>",
					"type": "object"
				}
			],
			"returns": {
				"type": "array",
				"text": "Absolute file paths.",
				"html": "<p>Absolute file paths.</p>",
				"shortText": "<p>Absolute file paths.</p>",
				"shortHtml": "<p>Absolute file paths.</p>"
			},
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.collect"
		},
		{
			"line": 113,
			"name": "finding",
			"shortText": "Creates a finding.",
			"shortHtml": "<p>Creates a finding.</p>",
			"text": "Creates a finding.\n\n",
			"html": "<p>Creates a finding.</p>",
			"entity": "method",
			"flagSearchText": " finding \"error\", \"warning\" or \"info\". Stable machine-readable rule id. Source file. 1-based line number. What is wrong. How to fix it. The finding.",
			"access": "private",
			"params": [
				{
					"name": "level",
					"shortText": "\"error\", \"warning\" or \"info\".",
					"shortHtml": "<p>\"error\", \"warning\" or \"info\".</p>",
					"text": "\"error\", \"warning\" or \"info\".",
					"html": "<p>\"error\", \"warning\" or \"info\".</p>",
					"type": "string"
				},
				{
					"name": "rule",
					"shortText": "Stable machine-readable rule id.",
					"shortHtml": "<p>Stable machine-readable rule id.</p>",
					"text": "Stable machine-readable rule id.",
					"html": "<p>Stable machine-readable rule id.</p>",
					"type": "string"
				},
				{
					"name": "file",
					"shortText": "Source file.",
					"shortHtml": "<p>Source file.</p>",
					"text": "Source file.",
					"html": "<p>Source file.</p>",
					"type": "string"
				},
				{
					"name": "line",
					"shortText": "1-based line number.",
					"shortHtml": "<p>1-based line number.</p>",
					"text": "1-based line number.",
					"html": "<p>1-based line number.</p>",
					"type": "number"
				},
				{
					"name": "message",
					"shortText": "What is wrong.",
					"shortHtml": "<p>What is wrong.</p>",
					"text": "What is wrong.",
					"html": "<p>What is wrong.</p>",
					"type": "string"
				},
				{
					"name": "fix",
					"shortText": "How to fix it.",
					"shortHtml": "<p>How to fix it.</p>",
					"text": "How to fix it.",
					"html": "<p>How to fix it.</p>",
					"type": "string",
					"optional": true
				}
			],
			"returns": {
				"type": "object",
				"text": "The finding.",
				"html": "<p>The finding.</p>",
				"shortText": "<p>The finding.</p>",
				"shortHtml": "<p>The finding.</p>"
			},
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.finding"
		},
		{
			"line": 647,
			"name": "print",
			"shortText": "Prints a report for humans.",
			"shortHtml": "<p>Prints a report for humans.</p>",
			"text": "Prints a report for humans.\n\n",
			"html": "<p>Prints a report for humans.</p>",
			"entity": "method",
			"flagSearchText": " print The result of `run()`. The logger.",
			"params": [
				{
					"name": "report",
					"shortText": "The result of `run()`.",
					"shortHtml": "<p>The result of <code>run()</code>.</p>",
					"text": "The result of `run()`.",
					"html": "<p>The result of <code>run()</code>.</p>",
					"type": "object"
				},
				{
					"name": "log",
					"shortText": "The logger.",
					"shortHtml": "<p>The logger.</p>",
					"text": "The logger.",
					"html": "<p>The logger.</p>",
					"type": "function"
				}
			],
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.print"
		},
		{
			"line": 339,
			"name": "run",
			"shortText": "Runs the validator.",
			"shortHtml": "<p>Runs the validator.</p>",
			"text": "Runs the validator.\n\n",
			"html": "<p>Runs the validator.</p>",
			"entity": "method",
			"flagSearchText": " run Documon config (same shape the builder receives). Options. `{ ok, counts, findings, stats }`. \n\n\t\tvar report = require(\"documon\").check.run({ src : \"./src\" }, { coverage : true });\n\t\tif(report.counts.error){ process.exit(2); }",
			"params": [
				{
					"name": "conf",
					"shortText": "Documon config (same shape the builder receives).",
					"shortHtml": "<p>Documon config (same shape the builder receives).</p>",
					"text": "Documon config (same shape the builder receives).",
					"html": "<p>Documon config (same shape the builder receives).</p>",
					"type": "object"
				},
				{
					"name": "opts",
					"shortText": "Options.",
					"shortHtml": "<p>Options.</p>",
					"text": "Options.",
					"html": "<p>Options.</p>",
					"type": "object",
					"optional": true,
					"children": [
						{
							"name": "coverage",
							"shortText": "Include the undocumented-symbol advisory.",
							"shortHtml": "<p>Include the undocumented-symbol advisory.</p>",
							"text": "Include the undocumented-symbol advisory.",
							"html": "<p>Include the undocumented-symbol advisory.</p>",
							"type": "boolean",
							"optional": true,
							"defaultVal": "false"
						}
					]
				}
			],
			"returns": {
				"type": "object",
				"text": "`{ ok, counts, findings, stats }`.",
				"html": "<p><code>{ ok, counts, findings, stats }</code>.</p>",
				"shortText": "<p><code>{ ok, counts, findings, stats }</code>.</p>",
				"shortHtml": "<p><code>{ ok, counts, findings, stats }</code>.</p>"
			},
			"example": [
				{
					"text": "\n\n\t\tvar report = require(\"documon\").check.run({ src : \"./src\" }, { coverage : true });\n\t\tif(report.counts.error){ process.exit(2); }",
					"html": "<pre><code>    var report = require(\"documon\").check.run({ src : \"./src\" }, { coverage : true });\n    if(report.counts.error){ process.exit(2); }</code></pre>"
				}
			],
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.run"
		},
		{
			"line": 299,
			"name": "scanSymbols",
			"shortText": "A deliberately shallow symbol scan used only by the coverage advisory.",
			"shortHtml": "<p>A deliberately shallow symbol scan used only by the coverage advisory.</p>",
			"text": "A deliberately shallow symbol scan used only by the coverage advisory.\n\nThis never feeds the render path -- Documon still derives structure exclusively from\ncomments. It exists so an automated writer can be told \"you documented 4 of 11 exported\nthings\" instead of silently shipping a near-empty manual.\n\n",
			"html": "<p>A deliberately shallow symbol scan used only by the coverage advisory.</p>\n<p>This never feeds the render path -- Documon still derives structure exclusively from<br />\ncomments. It exists so an automated writer can be told \"you documented 4 of 11 exported<br />\nthings\" instead of silently shipping a near-empty manual.</p>",
			"entity": "method",
			"flagSearchText": " scanSymbols File contents. `{ name, line }` records.",
			"access": "private",
			"params": [
				{
					"name": "source",
					"shortText": "File contents.",
					"shortHtml": "<p>File contents.</p>",
					"text": "File contents.",
					"html": "<p>File contents.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "array",
				"text": "`{ name, line }` records.",
				"html": "<p><code>{ name, line }</code> records.</p>",
				"shortText": "<p><code>{ name, line }</code> records.</p>",
				"shortHtml": "<p><code>{ name, line }</code> records.</p>"
			},
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.scanSymbols"
		},
		{
			"line": 218,
			"name": "summarize",
			"shortText": "Reduces a parsed comment block to the facts the rules care about.",
			"shortHtml": "<p>Reduces a parsed comment block to the facts the rules care about.</p>",
			"text": "Reduces a parsed comment block to the facts the rules care about.\n\n",
			"html": "<p>Reduces a parsed comment block to the facts the rules care about.</p>",
			"entity": "method",
			"flagSearchText": " summarize Output of `parse()`. Summary.",
			"access": "private",
			"params": [
				{
					"name": "parsed",
					"shortText": "Output of `parse()`.",
					"shortHtml": "<p>Output of <code>parse()</code>.</p>",
					"text": "Output of `parse()`.",
					"html": "<p>Output of <code>parse()</code>.</p>",
					"type": "object"
				}
			],
			"returns": {
				"type": "object",
				"text": "Summary.",
				"html": "<p>Summary.</p>",
				"shortText": "<p>Summary.</p>",
				"shortHtml": "<p>Summary.</p>"
			},
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.summarize"
		}
	],
	"properties": [
		{
			"line": 60,
			"name": "COMMON_TYPOS",
			"shortText": "Tags people (and models trained on other doc systems)",
			"shortHtml": "<p>Tags people (and models trained on other doc systems)</p>",
			"text": "Tags people (and models trained on other doc systems)\nreach for that Documon does not implement, mapped to the right answer.",
			"html": "<p>Tags people (and models trained on other doc systems)<br />\nreach for that Documon does not implement, mapped to the right answer.</p>",
			"type": "object",
			"entity": "property",
			"flagSearchText": " Tags people (and models trained on other doc systems)\nreach for that Documon does not implement, mapped to the right answer.",
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.COMMON_TYPOS"
		},
		{
			"line": 43,
			"name": "EXTENDISH",
			"shortText": "Tags whose value must resolve to another documented id.",
			"shortHtml": "<p>Tags whose value must resolve to another documented id.</p>",
			"text": "Tags whose value must resolve to another documented id.",
			"html": "<p>Tags whose value must resolve to another documented id.</p>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " Tags whose value must resolve to another documented id.",
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.EXTENDISH"
		},
		{
			"line": 38,
			"name": "KIND_TAGS",
			"shortText": "Tags that declare what an entity *is*. A comment block",
			"shortHtml": "<p>Tags that declare what an entity <em>is</em>. A comment block</p>",
			"text": "Tags that declare what an entity *is*. A comment block\nneeds one of these to become anything at all.",
			"html": "<p>Tags that declare what an entity <em>is</em>. A comment block<br />\nneeds one of these to become anything at all.</p>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " Tags that declare what an entity *is*. A comment block\nneeds one of these to become anything at all.",
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.KIND_TAGS"
		},
		{
			"line": 49,
			"name": "KNOWN_TAGS",
			"shortText": "Every tag Documon actually acts on. Anything else is",
			"shortHtml": "<p>Every tag Documon actually acts on. Anything else is</p>",
			"text": "Every tag Documon actually acts on. Anything else is\ninert -- it will be silently dropped from the output.",
			"html": "<p>Every tag Documon actually acts on. Anything else is<br />\ninert -- it will be silently dropped from the output.</p>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " Every tag Documon actually acts on. Anything else is\ninert -- it will be silently dropped from the output.",
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.KNOWN_TAGS"
		},
		{
			"line": 89,
			"name": "TAG_NOTES",
			"shortText": "Extra guidance for tags that look like they should work",
			"shortHtml": "<p>Extra guidance for tags that look like they should work</p>",
			"text": "Extra guidance for tags that look like they should work\nbut genuinely have no Documon equivalent.",
			"html": "<p>Extra guidance for tags that look like they should work<br />\nbut genuinely have no Documon equivalent.</p>",
			"type": "object",
			"entity": "property",
			"flagSearchText": " Extra guidance for tags that look like they should work\nbut genuinely have no Documon equivalent.",
			"file": "src/check.js",
			"filename": "check.js",
			"klass": "check",
			"package": "documon",
			"docfile": "documon.check.html",
			"id": "documon.check.TAG_NOTES"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "3.0.0",
	"search": {
		"documon.check": "check : Validates documentation comments without generating anything Because Documon infers nothing from source code missing misspelled doesn produce warning produces silence symbol simply never appears output That fine human eyeballs result useless automated writer that needs know whether succeeded check that feedback signal parse everything report what work exit zero Write comments check repair repeatcheck documon documon check human readable documon check json machine readable documon check coverage plus undocumented symbol advisory",
		"documon.check.finding": "finding : Creates findingfinding error warning info Stable machine readable rule Source file based line number What wrong finding",
		"documon.check.collect": "collect : Collects source files that would parsed build with this configcollect Documon config Absolute file paths",
		"documon.check.blockId": "blockId : Derives comment block will filed under mirroring builds scoped package container member same shape generated filenames documon dirutils html method therefore inherits class module declared above same file without that scope every project would look like collisionblockId Summarized block enclosing class module name Dotted null",
		"documon.check.summarize": "summarize : Reduces parsed comment block facts rules care aboutsummarize Output parse Summary",
		"documon.check.scanSymbols": "scanSymbols : deliberately shallow symbol scan used only coverage advisory This never feeds render path Documon still derives structure exclusively from comments exists automated writer told documented exported things instead silently shipping near empty manualscanSymbols File contents name line records",
		"documon.check.run": "run : Runs validatorDocumon config same shape builder receives Options counts findings stats report require documon check coverage true report counts error process exit",
		"documon.check.print": "print : Prints report humansprint result logger",
		"documon.check.KIND_TAGS": "KIND_TAGS : Tags that declare what entity comment block needs these become anythingTags that declare what entity comment block needs these become anything",
		"documon.check.EXTENDISH": "EXTENDISH : Tags whose value must resolve another documentedTags whose value must resolve another documented",
		"documon.check.KNOWN_TAGS": "KNOWN_TAGS : Every Documon actually acts Anything else inert will silently dropped from outputEvery Documon actually acts Anything else inert will silently dropped from output",
		"documon.check.COMMON_TYPOS": "COMMON_TYPOS : Tags people models trained other systems reach that Documon does implement mapped right answerTags people models trained other systems reach that Documon does implement mapped right answer",
		"documon.check.TAG_NOTES": "TAG_NOTES : Extra guidance tags that look like they should work genuinely have Documon equivalentExtra guidance tags that look like they should work genuinely have Documon equivalent"
	}
}