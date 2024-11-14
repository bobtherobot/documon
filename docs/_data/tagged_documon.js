{
	"line": 26,
	"name": "documon",
	"shortText": "The main entry point and processor for Documon, which allows you to run Documon directly from Node.",
	"shortHtml": "<p>The main entry point and processor for Documon, which allows you to run Documon directly from Node.</p>",
	"text": "The main entry point and processor for Documon, which allows you to run Documon directly from Node.\n\n",
	"html": "<p>The main entry point and processor for Documon, which allows you to run Documon directly from Node.</p>",
	"entity": "module",
	"flagSearchText": " documon documon \n\n\t\tvar myDocumon = require(\"path/to/documon/src/documon.js\");\n\t\tmyDocumon.run({\n  \t\tfiles : \"path/to/src\"\n\t\t});\n\t\t",
	"package": "documon",
	"example": [
		{
			"text": "\n\n\t\tvar myDocumon = require(\"path/to/documon/src/documon.js\");\n\t\tmyDocumon.run({\n  \t\tfiles : \"path/to/src\"\n\t\t});\n\t\t",
			"html": "<pre><code>    var myDocumon = require(\"path/to/documon/src/documon.js\");\n    myDocumon.run({\n      files : \"path/to/src\"\n    });\n</code></pre>"
		}
	],
	"file": "documon/src/documon.js",
	"filename": "documon.js",
	"klass": "documon",
	"docfile": "documon.documon.html",
	"id": "documon.documon",
	"methods": [
		{
			"line": 152,
			"name": "filterFileTypes",
			"shortText": "Determines if the file has the proper extension based on the acceptable extensions defined in this modules static \"extensions\" array.",
			"shortHtml": "<p>Determines if the file has the proper extension based on the acceptable extensions defined in this modules static \"extensions\" array.</p>",
			"text": "Determines if the file has the proper extension based on the acceptable extensions defined in this modules static \"extensions\" array.\n",
			"html": "<p>Determines if the file has the proper extension based on the acceptable extensions defined in this modules static \"extensions\" array.</p>",
			"entity": "method",
			"flagSearchText": " filterFileTypes The path or full file name. Whether or not it's an OK extension.",
			"access": "private",
			"params": [
				{
					"name": "fpath",
					"shortText": "The path or full file name.",
					"shortHtml": "<p>The path or full file name.</p>",
					"text": "The path or full file name.",
					"html": "<p>The path or full file name.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "boolean",
				"text": "Whether or not it's an OK extension.",
				"html": "<p>Whether or not it's an OK extension.</p>",
				"shortText": "<p>Whether or not it's an OK extension.</p>",
				"shortHtml": "<p>Whether or not it's an OK extension.</p>"
			},
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.filterFileTypes"
		},
		{
			"line": 187,
			"name": "init",
			"shortText": "Initializes Documan based on the configuration settings",
			"shortHtml": "<p>Initializes Documan based on the configuration settings</p>",
			"text": "Initializes Documan based on the configuration settings\n\n- Parses configuration\n- Finds source files\n- Creates output folder\n- Copies template assets to output folder\n- Initializes main templates\n\n",
			"html": "<p>Initializes Documan based on the configuration settings</p>\n<ul>\n<li>Parses configuration</li>\n<li>Finds source files</li>\n<li>Creates output folder</li>\n<li>Copies template assets to output folder</li>\n<li>Initializes main templates</li>\n</ul>",
			"entity": "method",
			"flagSearchText": " init \n See (run)[run], as this configuration object is simply passed through. False when there's an error or misconfiguration. True when everything seems cool.",
			"access": "private",
			"params": [
				{
					"name": "conf",
					"shortText": "See (run)[run], as this configuration object is simply passed through.",
					"shortHtml": "<p>See (run)[run], as this configuration object is simply passed through.</p>",
					"text": "See (run)[run], as this configuration object is simply passed through.",
					"html": "<p>See (run)[run], as this configuration object is simply passed through.</p>",
					"type": "object"
				}
			],
			"returns": {
				"type": "boolean",
				"text": "False when there's an error or misconfiguration. True when everything seems cool.",
				"html": "<p>False when there's an error or misconfiguration. True when everything seems cool.</p>",
				"shortText": "<p>False when there's an error or misconfiguration. True when everything seems cool.</p>",
				"shortHtml": "<p>False when there's an error or misconfiguration. True when everything seems cool.</p>"
			},
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.init"
		},
		{
			"line": 622,
			"name": "run",
			"shortText": "The main processing loop that executes and manages the main flow control of parsing, evaluating and  ",
			"shortHtml": "<p>The main processing loop that executes and manages the main flow control of parsing, evaluating and  </p>",
			"text": "The main processing loop that executes and manages the main flow control of parsing, evaluating and  \nconstruction of the documentation.\n\nAfter [init](#init) configures things based on the settings, and generates a list of files to process\nthis method process and sends each file to the [seeder](#seeder) of evaluation and processing.\n\n- Generates HTML pages\n- Generates _menuData.js\n\n",
			"html": "<p>The main processing loop that executes and manages the main flow control of parsing, evaluating and<br />\nconstruction of the documentation.</p>\n<p>After <a href=\"#init\">init</a> configures things based on the settings, and generates a list of files to process\nthis method process and sends each file to the <a href=\"#seeder\">seeder</a> of evaluation and processing.</p>\n<ul>\n<li>Generates HTML pages</li>\n<li>Generates _menuData.js</li>\n</ul>",
			"entity": "method",
			"flagSearchText": " run\n The configuration object. See [mainConf](#mainConf)",
			"params": [
				{
					"name": "conf",
					"shortText": "The configuration object. See [mainConf](#mainConf)",
					"shortHtml": "<p>The configuration object. See <a href=\"#mainConf\">mainConf</a></p>",
					"text": "The configuration object. See [mainConf](#mainConf)",
					"html": "<p>The configuration object. See <a href=\"#mainConf\">mainConf</a></p>",
					"type": "object"
				}
			],
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.run"
		},
		{
			"line": 516,
			"name": "seeder",
			"shortText": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).",
			"shortHtml": "<p>Extracts, parses and tags comments from one source file and stuffs the result into <a href=\"#organizer\">organizer</a>.</p>",
			"text": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).\n\n- Generates data files (if dumpData enabled)\n\n",
			"html": "<p>Extracts, parses and tags comments from one source file and stuffs the result into <a href=\"#organizer\">organizer</a>.</p>\n<ul>\n<li>Generates data files (if dumpData enabled)</li>\n</ul>",
			"entity": "method",
			"flagSearchText": " seeder The path to the file. The file's search data as computed by tag.js",
			"access": "private",
			"params": [
				{
					"name": "file",
					"shortText": "The path to the file.",
					"shortHtml": "<p>The path to the file.</p>",
					"text": "The path to the file.",
					"html": "<p>The path to the file.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "object",
				"text": "The file's search data as computed by tag.js",
				"html": "<p>The file's search data as computed by tag.js</p>",
				"shortText": "<p>The file's search data as computed by tag.js</p>",
				"shortHtml": "<p>The file's search data as computed by tag.js</p>"
			},
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.seeder"
		},
		{
			"line": 474,
			"name": "shouldIgnore",
			"shortText": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).",
			"shortHtml": "<p>Extracts, parses and tags comments from one source file and stuffs the result into <a href=\"#organizer\">organizer</a>.</p>",
			"text": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).\n\n- Generates data files (if dumpData enabled)\n\n",
			"html": "<p>Extracts, parses and tags comments from one source file and stuffs the result into <a href=\"#organizer\">organizer</a>.</p>\n<ul>\n<li>Generates data files (if dumpData enabled)</li>\n</ul>",
			"entity": "method",
			"flagSearchText": " shouldIgnore The path to the file. true = ignore this file, false = don't ignore.",
			"access": "private",
			"params": [
				{
					"name": "item",
					"shortText": "The path to the file.",
					"shortHtml": "<p>The path to the file.</p>",
					"text": "The path to the file.",
					"html": "<p>The path to the file.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "boolean",
				"text": "true = ignore this file, false = don't ignore.",
				"html": "<p>true = ignore this file, false = don't ignore.</p>",
				"shortText": "<p>true = ignore this file, false = don't ignore.</p>",
				"shortHtml": "<p>true = ignore this file, false = don't ignore.</p>"
			},
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.shouldIgnore"
		},
		{
			"line": 141,
			"name": "writeData",
			"shortText": "Simplify file write for text or json.",
			"shortHtml": "<p>Simplify file write for text or json.</p>",
			"text": "Simplify file write for text or json.\n\n",
			"html": "<p>Simplify file write for text or json.</p>",
			"entity": "method",
			"flagSearchText": " writeData The path to save to. The string to save Whether the data should be serialized to JSON or not.",
			"access": "private",
			"params": [
				{
					"name": "fpath",
					"shortText": "The path to save to.",
					"shortHtml": "<p>The path to save to.</p>",
					"text": "The path to save to.",
					"html": "<p>The path to save to.</p>",
					"type": "string"
				},
				{
					"name": "data",
					"shortText": "The string to save",
					"shortHtml": "<p>The string to save</p>",
					"text": "The string to save",
					"html": "<p>The string to save</p>",
					"type": "string"
				},
				{
					"name": "json",
					"shortText": "Whether the data should be serialized to JSON or not.",
					"shortHtml": "<p>Whether the data should be serialized to JSON or not.</p>",
					"text": "Whether the data should be serialized to JSON or not.",
					"html": "<p>Whether the data should be serialized to JSON or not.</p>",
					"type": "boolean"
				}
			],
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.writeData"
		}
	],
	"properties": [
		{
			"line": 120,
			"name": "dumpData",
			"shortText": "Whether or not to write intermediary files used during processing to the output data folder.",
			"shortHtml": "<p>Whether or not to write intermediary files used during processing to the output data folder.</p>",
			"text": "Whether or not to write intermediary files used during processing to the output data folder.",
			"html": "<p>Whether or not to write intermediary files used during processing to the output data folder.</p>",
			"type": "boolean",
			"defaultVal": "false",
			"entity": "property",
			"flagSearchText": " Whether or not to write intermediary files used during processing to the output data folder.",
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.dumpData"
		},
		{
			"line": 86,
			"name": "extensions",
			"shortText": "The list of extensions to search for source code.",
			"shortHtml": "<p>The list of extensions to search for source code.</p>",
			"text": "The list of extensions to search for source code.",
			"html": "<p>The list of extensions to search for source code.</p>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " The list of extensions to search for source code.",
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.extensions"
		},
		{
			"line": 97,
			"name": "ignoreList",
			"shortText": "A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:",
			"shortHtml": "<p>A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:</p>",
			"text": "A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:\n\n\t\t'\\/\\.'\n\t\t'\\.git'\n\t\t'node_modules'\n\n\tConfiguration will concat this list with the user provied list.",
			"html": "<p>A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:</p>\n<pre><code>    '\\/\\.'\n    '\\.git'\n    'node_modules'\n\nConfiguration will concat this list with the user provied list.\n</code></pre>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:\n\n\t\t'\\/\\.'\n\t\t'\\.git'\n\t\t'node_modules'\n\n\tConfiguration will concat this list with the user provied list.",
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.ignoreList"
		},
		{
			"line": 125,
			"name": "indexRedirectName",
			"shortText": "The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.",
			"shortHtml": "<p>The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.</p>",
			"text": "The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.",
			"html": "<p>The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.</p>",
			"type": "string",
			"entity": "property",
			"flagSearchText": " The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.",
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.indexRedirectName"
		},
		{
			"line": 81,
			"name": "mainConf",
			"shortText": "NOTE: // sourceRootFolder and dataFolder are injected into the \"mainConf\" by documon.",
			"shortHtml": "<p>NOTE: // sourceRootFolder and dataFolder are injected into the \"mainConf\" by documon.</p>",
			"text": "\nNOTE: // sourceRootFolder and dataFolder are injected into the \"mainConf\" by documon.\n\nExample link [other class to root.documon.dirutils.makedir](root.documon.dirutils.makedir)\nExample link [other class to documon.dirutils.makedir](documon.dirutils.makedir)\nExample link [other class to documon.dirutils](documon.dirutils)\nExample link [local to #run](#run)\n\n",
			"html": "<p>NOTE: // sourceRootFolder and dataFolder are injected into the \"mainConf\" by documon.</p>\n<p>Example link <a href=\"root.documon.dirutils.makedir\">other class to root.documon.dirutils.makedir</a>\nExample link <a href=\"documon.dirutils.makedir\">other class to documon.dirutils.makedir</a>\nExample link <a href=\"documon.dirutils\">other class to documon.dirutils</a>\nExample link <a href=\"#run\">local to #run</a></p>",
			"type": "Object",
			"children": [
				{
					"name": "projectName",
					"shortText": "The title of the project (displayed in the title of the docs).",
					"shortHtml": "<p>The title of the project (displayed in the title of the docs).</p>",
					"text": "The title of the project (displayed in the title of the docs).",
					"html": "<p>The title of the project (displayed in the title of the docs).</p>",
					"type": "string"
				},
				{
					"name": "files",
					"shortText": "The location of the source file or folder to process.",
					"shortHtml": "<p>The location of the source file or folder to process.</p>",
					"text": "The location of the source file or folder to process.",
					"html": "<p>The location of the source file or folder to process.</p>",
					"type": "string | array"
				},
				{
					"name": "outputFolder",
					"shortText": "Where the docs will be written to. Defaults to be parallel to source folder.",
					"shortHtml": "<p>Where the docs will be written to. Defaults to be parallel to source folder.</p>",
					"text": "Where the docs will be written to. Defaults to be parallel to source folder.",
					"html": "<p>Where the docs will be written to. Defaults to be parallel to source folder.</p>",
					"type": "string",
					"optional": true
				},
				{
					"name": "ignoreList",
					"shortText": "A list of source files or folders to ignore.",
					"shortHtml": "<p>A list of source files or folders to ignore.</p>",
					"text": "A list of source files or folders to ignore.",
					"html": "<p>A list of source files or folders to ignore.</p>",
					"type": "array",
					"optional": true
				},
				{
					"name": "templateFolder",
					"shortText": "The path to the template folder (defaults to the main documon/template folder)",
					"shortHtml": "<p>The path to the template folder (defaults to the main documon/template folder)</p>",
					"text": "The path to the template folder (defaults to the main documon/template folder)",
					"html": "<p>The path to the template folder (defaults to the main documon/template folder)</p>",
					"type": "string",
					"optional": true
				},
				{
					"name": "projectVersion",
					"shortText": "Your product's version",
					"shortHtml": "<p>Your product's version</p>",
					"text": "Your product's version",
					"html": "<p>Your product's version</p>",
					"type": "string",
					"optional": true
				},
				{
					"name": "docBegin",
					"shortText": "Delimiter used to signify the START of a source-code comment.",
					"shortHtml": "<p>Delimiter used to signify the START of a source-code comment.</p>",
					"text": "Delimiter used to signify the START of a source-code comment.",
					"html": "<p>Delimiter used to signify the START of a source-code comment.</p>",
					"type": "string",
					"optional": true,
					"defaultVal": "&#47;**"
				},
				{
					"name": "docEnd",
					"shortText": "Delimiter used to signify the END of a source-code comment.",
					"shortHtml": "<p>Delimiter used to signify the END of a source-code comment.</p>",
					"text": "Delimiter used to signify the END of a source-code comment.",
					"html": "<p>Delimiter used to signify the END of a source-code comment.</p>",
					"type": "string",
					"optional": true,
					"defaultVal": "*&#47;"
				},
				{
					"name": "launchWhenDone",
					"shortText": "Launch the documentation in the browser when done?",
					"shortHtml": "<p>Launch the documentation in the browser when done?</p>",
					"text": "Launch the documentation in the browser when done?",
					"html": "<p>Launch the documentation in the browser when done?</p>",
					"type": "boolean",
					"optional": true,
					"defaultVal": "false"
				},
				{
					"name": "sourceExt",
					"shortText": "The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").",
					"shortHtml": "<p>The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").</p>",
					"text": "The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").",
					"html": "<p>The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").</p>",
					"type": "string | array",
					"optional": true,
					"defaultVal": "js"
				},
				{
					"name": "dumpData",
					"shortText": "Whether or not to save intermediary data objects.",
					"shortHtml": "<p>Whether or not to save intermediary data objects.</p>",
					"text": "Whether or not to save intermediary data objects.",
					"html": "<p>Whether or not to save intermediary data objects.</p>",
					"type": "boolean",
					"optional": true,
					"defaultVal": "false"
				},
				{
					"name": "docsDirName",
					"shortText": "The folder name used to house the docs.",
					"shortHtml": "<p>The folder name used to house the docs.</p>",
					"text": "The folder name used to house the docs.\n",
					"html": "<p>The folder name used to house the docs.</p>",
					"type": "String",
					"optional": true,
					"defaultVal": "docs"
				},
				{
					"name": "sourceRootFolder",
					"shortText": "(derived by documon) The actual location that a given source file resides within.",
					"shortHtml": "<p>(derived by documon) The actual location that a given source file resides within.</p>",
					"text": "(derived by documon) The actual location that a given source file resides within.",
					"html": "<p>(derived by documon) The actual location that a given source file resides within.</p>",
					"type": "String",
					"optional": true
				},
				{
					"name": "dataFolder",
					"shortText": "(derived by documon) The path used to place data files.",
					"shortHtml": "<p>(derived by documon) The path used to place data files.</p>",
					"text": "(derived by documon) The path used to place data files.",
					"html": "<p>(derived by documon) The path used to place data files.</p>",
					"type": "String",
					"optional": true
				},
				{
					"name": "more",
					"shortText": "The path to a folder containing addition markdown (.md) files to include.",
					"shortHtml": "<p>The path to a folder containing addition markdown (.md) files to include.</p>",
					"text": "The path to a folder containing addition markdown (.md) files to include.",
					"html": "<p>The path to a folder containing addition markdown (.md) files to include.</p>",
					"type": "String",
					"optional": true
				},
				{
					"name": "indexShortcutName",
					"shortText": "The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.",
					"shortHtml": "<p>The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.</p>",
					"text": "The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.",
					"html": "<p>The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.</p>",
					"type": "String",
					"optional": true,
					"defaultVal": "__LAUNCH.html"
				},
				{
					"name": "moreQuirkDelimiter",
					"shortText": "More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.",
					"shortHtml": "<p>More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.</p>",
					"text": "More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.\n",
					"html": "<p>More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.</p>",
					"type": "String",
					"optional": true,
					"defaultVal": "."
				}
			],
			"entity": "property",
			"flagSearchText": " Used to store user supplied config settings.",
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.mainConf"
		},
		{
			"line": 115,
			"name": "quiet",
			"shortText": "Supress stdout messages.",
			"shortHtml": "<p>Supress stdout messages.</p>",
			"text": "Supress stdout messages.",
			"html": "<p>Supress stdout messages.</p>",
			"type": "boolean",
			"defaultVal": "false",
			"entity": "property",
			"flagSearchText": " Supress stdout messages.",
			"file": "documon/src/documon.js",
			"filename": "documon.js",
			"klass": "documon",
			"package": "documon",
			"docfile": "documon.documon.html",
			"id": "documon.documon.quiet"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.0.0",
	"search": {
		"documon.documon": "documon : main entry point processor Documon which allows Documon directly from Nodedocumon documon myDocumon require path documon documon myDocumon files path",
		"documon.documon.writeData": "writeData : Simplify file write text jsonwriteData path save string save Whether data should serialized JSON",
		"documon.documon.filterFileTypes": "filterFileTypes : Determines file proper extension based acceptable extensions defined this modules static extensions arrayfilterFileTypes path full file name Whether extension",
		"documon.documon.init": "init : Initializes Documan based configuration settings Parses configuration Finds source files Creates output folder Copies template assets output folder Initializes main templatesinit this configuration object simply passed through False when there error misconfiguration True when everything seems cool",
		"documon.documon.shouldIgnore": "shouldIgnore : Extracts parses tags comments from source file stuffs result into organizer organizer Generates data files dumpData enabledshouldIgnore path file true ignore this file false ignore",
		"documon.documon.seeder": "seeder : Extracts parses tags comments from source file stuffs result into organizer organizer Generates data files dumpData enabledseeder path file file search data computed",
		"documon.documon.run": "run : main processing loop that executes manages main flow control parsing evaluating construction documentation After init init configures things based settings generates list files process this method process sends each file seeder seeder evaluation processing Generates HTML pages Generates menuDataconfiguration object mainConf mainConf",
		"documon.documon.mainConf": "mainConf : NOTE sourceRootFolder dataFolder injected into mainConf documon Example link other class root documon dirutils makedir root documon dirutils makedir Example link other class documon dirutils makedir documon dirutils makedir Example link other class documon dirutils documon dirutils Example link localUsed store user supplied config settings",
		"documon.documon.extensions": "extensions : list extensions search source codelist extensions search source code",
		"documon.documon.ignoreList": "ignoreList : list strings representing regex patterns files folders ignore default following patterns already included node modules Configuration will concat this list with user provied listlist strings representing regex patterns files folders ignore default following patterns already included node modules Configuration will concat this list with user provied list",
		"documon.documon.quiet": "quiet : Supress stdout messagesSupress stdout messages",
		"documon.documon.dumpData": "dumpData : Whether write intermediary files used during processing output data folderWhether write intermediary files used during processing output data folder",
		"documon.documon.indexRedirectName": "indexRedirectName : filename shortcut index html file name that will push name folder quicker access index hrml filefilename shortcut index html file name that will push name folder quicker access index hrml file"
	}
}