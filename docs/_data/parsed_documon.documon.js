[
	{
		"text": "The main entry point and processor for Documon, which allows you to run Documon directly from Node.\n\n",
		"start": 13,
		"end": 25,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@module  documondocumon",
				"flag": "module",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
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
				"text": "\n\n\t\tvar myDocumon = require(\"path/to/documon/src/documon.js\");\n\t\tmyDocumon.run({\n  \t\tfiles : \"path/to/src\"\n\t\t});\n\t\t"
			}
		],
		"source": "The main entry point and processor for Documon, which allows you to run Documon directly from Node.\n\n@module  documon\n@package documon\n@example\n\n\t\tvar myDocumon = require(\"path/to/documon/src/documon.js\");\n\t\tmyDocumon.run({\n  \t\tfiles : \"path/to/src\"\n\t\t});\n\t\t",
		"id": "documon.documon"
	},
	{
		"text": "\nNOTE: // sourceRootFolder and dataFolder are injected into the \"mainConf\" by documon.\n\nExample link [other class to root.documon.dirutils.makedir](root.documon.dirutils.makedir)\nExample link [other class to documon.dirutils.makedir](documon.dirutils.makedir)\nExample link [other class to documon.dirutils](documon.dirutils)\nExample link [local to #run](#run)\n\n",
		"start": 51,
		"end": 80,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@property  {Object} mainConf \t\t\t\t\t\t- Used to store user supplied config settings.Used to store user supplied config settings.",
				"flag": "property",
				"after": "{Object} mainConf \t\t\t\t\t\t- Used to store user supplied config settings.",
				"type": "Object",
				"afterType": "mainConf \t\t\t\t\t\t- Used to store user supplied config settings.",
				"name": "mainConf",
				"text": "Used to store user supplied config settings.",
				"children": [
					{
						"source": "@property  {string} mainConf.projectName \t\t\t- The title of the project (displayed in the title of the docs).The title of the project (displayed in the title of the docs).",
						"flag": "property",
						"after": "{string} mainConf.projectName \t\t\t- The title of the project (displayed in the title of the docs).",
						"type": "string",
						"afterType": "mainConf.projectName \t\t\t- The title of the project (displayed in the title of the docs).",
						"parent": "mainConf",
						"name": "projectName",
						"text": "The title of the project (displayed in the title of the docs)."
					},
					{
						"source": "@property  {string | array} mainConf.files \t\t\t\t\t- The location of the source file or folder to process.The location of the source file or folder to process.",
						"flag": "property",
						"after": "{string | array} mainConf.files \t\t\t\t\t- The location of the source file or folder to process.",
						"type": "string | array",
						"afterType": "mainConf.files \t\t\t\t\t- The location of the source file or folder to process.",
						"parent": "mainConf",
						"name": "files",
						"text": "The location of the source file or folder to process."
					},
					{
						"source": "@property  {string} [mainConf.outputFolder] \t\t\t- Where the docs will be written to. Defaults to be parallel to source folder.Where the docs will be written to. Defaults to be parallel to source folder.",
						"flag": "property",
						"after": "{string} [mainConf.outputFolder] \t\t\t- Where the docs will be written to. Defaults to be parallel to source folder.",
						"type": "string",
						"afterType": "[mainConf.outputFolder] \t\t\t- Where the docs will be written to. Defaults to be parallel to source folder.",
						"optional": true,
						"parent": "mainConf",
						"name": "outputFolder",
						"text": "Where the docs will be written to. Defaults to be parallel to source folder."
					},
					{
						"source": "@property  {array} [mainConf.ignoreList] \t\t\t- A list of source files or folders to ignore.A list of source files or folders to ignore.",
						"flag": "property",
						"after": "{array} [mainConf.ignoreList] \t\t\t- A list of source files or folders to ignore.",
						"type": "array",
						"afterType": "[mainConf.ignoreList] \t\t\t- A list of source files or folders to ignore.",
						"optional": true,
						"parent": "mainConf",
						"name": "ignoreList",
						"text": "A list of source files or folders to ignore."
					},
					{
						"source": "@property  {string} [mainConf.templateFolder] \t\t- The path to the template folder (defaults to the main documon/template folder)The path to the template folder (defaults to the main documon/template folder)",
						"flag": "property",
						"after": "{string} [mainConf.templateFolder] \t\t- The path to the template folder (defaults to the main documon/template folder)",
						"type": "string",
						"afterType": "[mainConf.templateFolder] \t\t- The path to the template folder (defaults to the main documon/template folder)",
						"optional": true,
						"parent": "mainConf",
						"name": "templateFolder",
						"text": "The path to the template folder (defaults to the main documon/template folder)"
					},
					{
						"source": "@property  {string} [mainConf.projectVersion] \t\t- Your product's versionYour product's version",
						"flag": "property",
						"after": "{string} [mainConf.projectVersion] \t\t- Your product's version",
						"type": "string",
						"afterType": "[mainConf.projectVersion] \t\t- Your product's version",
						"optional": true,
						"parent": "mainConf",
						"name": "projectVersion",
						"text": "Your product's version"
					},
					{
						"source": "@property  {string} [mainConf.docBegin=\"&#47;**\"] \t- Delimiter used to signify the START of a source-code comment.Delimiter used to signify the START of a source-code comment.",
						"flag": "property",
						"after": "{string} [mainConf.docBegin=\"&#47;**\"] \t- Delimiter used to signify the START of a source-code comment.",
						"type": "string",
						"afterType": "[mainConf.docBegin=\"&#47;**\"] \t- Delimiter used to signify the START of a source-code comment.",
						"defaultVal": "&#47;**",
						"optional": true,
						"parent": "mainConf",
						"name": "docBegin",
						"text": "Delimiter used to signify the START of a source-code comment."
					},
					{
						"source": "@property  {string} [mainConf.docEnd=\"*&#47;\"] \t\t- Delimiter used to signify the END of a source-code comment.Delimiter used to signify the END of a source-code comment.",
						"flag": "property",
						"after": "{string} [mainConf.docEnd=\"*&#47;\"] \t\t- Delimiter used to signify the END of a source-code comment.",
						"type": "string",
						"afterType": "[mainConf.docEnd=\"*&#47;\"] \t\t- Delimiter used to signify the END of a source-code comment.",
						"defaultVal": "*&#47;",
						"optional": true,
						"parent": "mainConf",
						"name": "docEnd",
						"text": "Delimiter used to signify the END of a source-code comment."
					},
					{
						"source": "@property  {boolean} [mainConf.launchWhenDone=false] \t- Launch the documentation in the browser when done?Launch the documentation in the browser when done?",
						"flag": "property",
						"after": "{boolean} [mainConf.launchWhenDone=false] \t- Launch the documentation in the browser when done?",
						"type": "boolean",
						"afterType": "[mainConf.launchWhenDone=false] \t- Launch the documentation in the browser when done?",
						"defaultVal": "false",
						"optional": true,
						"parent": "mainConf",
						"name": "launchWhenDone",
						"text": "Launch the documentation in the browser when done?"
					},
					{
						"source": "@property  {string | array} [mainConf.sourceExt=\"js\"] \t\t- The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").",
						"flag": "property",
						"after": "{string | array} [mainConf.sourceExt=\"js\"] \t\t- The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").",
						"type": "string | array",
						"afterType": "[mainConf.sourceExt=\"js\"] \t\t- The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").",
						"defaultVal": "js",
						"optional": true,
						"parent": "mainConf",
						"name": "sourceExt",
						"text": "The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\")."
					},
					{
						"source": "@property  {boolean} [mainConf.dumpData=false]\t\t- Whether or not to save intermediary data objects.Whether or not to save intermediary data objects.",
						"flag": "property",
						"after": "{boolean} [mainConf.dumpData=false]\t\t- Whether or not to save intermediary data objects.",
						"type": "boolean",
						"afterType": "[mainConf.dumpData=false]\t\t- Whether or not to save intermediary data objects.",
						"defaultVal": "false",
						"optional": true,
						"parent": "mainConf",
						"name": "dumpData",
						"text": "Whether or not to save intermediary data objects."
					},
					{
						"source": "@property  {String} [mainConf.docsDirName=\"docs\"]\t- The folder name used to house the docs.The folder name used to house the docs.\n",
						"flag": "property",
						"after": "{String} [mainConf.docsDirName=\"docs\"]\t- The folder name used to house the docs.",
						"type": "String",
						"afterType": "[mainConf.docsDirName=\"docs\"]\t- The folder name used to house the docs.",
						"defaultVal": "docs",
						"optional": true,
						"parent": "mainConf",
						"name": "docsDirName",
						"text": "The folder name used to house the docs.\n"
					},
					{
						"source": "@property  {String} [mainConf.sourceRootFolder] \t\t- (derived by documon) The actual location that a given source file resides within.(derived by documon) The actual location that a given source file resides within.",
						"flag": "property",
						"after": "{String} [mainConf.sourceRootFolder] \t\t- (derived by documon) The actual location that a given source file resides within.",
						"type": "String",
						"afterType": "[mainConf.sourceRootFolder] \t\t- (derived by documon) The actual location that a given source file resides within.",
						"optional": true,
						"parent": "mainConf",
						"name": "sourceRootFolder",
						"text": "(derived by documon) The actual location that a given source file resides within."
					},
					{
						"source": "@property  {String} [mainConf.dataFolder]\t\t\t- (derived by documon) The path used to place data files.(derived by documon) The path used to place data files.",
						"flag": "property",
						"after": "{String} [mainConf.dataFolder]\t\t\t- (derived by documon) The path used to place data files.",
						"type": "String",
						"afterType": "[mainConf.dataFolder]\t\t\t- (derived by documon) The path used to place data files.",
						"optional": true,
						"parent": "mainConf",
						"name": "dataFolder",
						"text": "(derived by documon) The path used to place data files."
					},
					{
						"source": "@property  {String} [mainConf.more]\t\t\t\t\t- The path to a folder containing addition markdown (.md) files to include.The path to a folder containing addition markdown (.md) files to include.",
						"flag": "property",
						"after": "{String} [mainConf.more]\t\t\t\t\t- The path to a folder containing addition markdown (.md) files to include.",
						"type": "String",
						"afterType": "[mainConf.more]\t\t\t\t\t- The path to a folder containing addition markdown (.md) files to include.",
						"optional": true,
						"parent": "mainConf",
						"name": "more",
						"text": "The path to a folder containing addition markdown (.md) files to include."
					},
					{
						"source": "@property  {String} [mainConf.indexShortcutName=__LAUNCH.html]\t- The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.",
						"flag": "property",
						"after": "{String} [mainConf.indexShortcutName=__LAUNCH.html]\t- The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.",
						"type": "String",
						"afterType": "[mainConf.indexShortcutName=__LAUNCH.html]\t- The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.",
						"defaultVal": "__LAUNCH.html",
						"optional": true,
						"parent": "mainConf",
						"name": "indexShortcutName",
						"text": "The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs."
					},
					{
						"source": "@property  {String} [mainConf.moreQuirkDelimiter=\".\"]\t- More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.",
						"flag": "property",
						"after": "{String} [mainConf.moreQuirkDelimiter=\".\"]\t- More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.",
						"type": "String",
						"afterType": "[mainConf.moreQuirkDelimiter=\".\"]\t- More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.",
						"defaultVal": ".",
						"optional": true,
						"parent": "mainConf",
						"name": "moreQuirkDelimiter",
						"text": "More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.\n"
					}
				]
			}
		],
		"source": "\nNOTE: // sourceRootFolder and dataFolder are injected into the \"mainConf\" by documon.\n\nExample link [other class to root.documon.dirutils.makedir](root.documon.dirutils.makedir)\nExample link [other class to documon.dirutils.makedir](documon.dirutils.makedir)\nExample link [other class to documon.dirutils](documon.dirutils)\nExample link [local to #run](#run)\n\n@property  {Object} mainConf \t\t\t\t\t\t- Used to store user supplied config settings.\n@property  {string} mainConf.projectName \t\t\t- The title of the project (displayed in the title of the docs).\n@property  {string | array} mainConf.files \t\t\t\t\t- The location of the source file or folder to process.\n@property  {string} [mainConf.outputFolder] \t\t\t- Where the docs will be written to. Defaults to be parallel to source folder.\n@property  {array} [mainConf.ignoreList] \t\t\t- A list of source files or folders to ignore.\n@property  {string} [mainConf.templateFolder] \t\t- The path to the template folder (defaults to the main documon/template folder)\n@property  {string} [mainConf.projectVersion] \t\t- Your product's version\n@property  {string} [mainConf.docBegin=\"&#47;**\"] \t- Delimiter used to signify the START of a source-code comment. \n@property  {string} [mainConf.docEnd=\"*&#47;\"] \t\t- Delimiter used to signify the END of a source-code comment.\n@property  {boolean} [mainConf.launchWhenDone=false] \t- Launch the documentation in the browser when done?\n@property  {string | array} [mainConf.sourceExt=\"js\"] \t\t- The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").\n@property  {boolean} [mainConf.dumpData=false]\t\t- Whether or not to save intermediary data objects.\n@property  {String} [mainConf.docsDirName=\"docs\"]\t- The folder name used to house the docs.\n\n@property  {String} [mainConf.sourceRootFolder] \t\t- (derived by documon) The actual location that a given source file resides within.\n@property  {String} [mainConf.dataFolder]\t\t\t- (derived by documon) The path used to place data files.\n@property  {String} [mainConf.more]\t\t\t\t\t- The path to a folder containing addition markdown (.md) files to include.\n@property  {String} [mainConf.indexShortcutName=__LAUNCH.html]\t- The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.\n@property  {String} [mainConf.moreQuirkDelimiter=\".\"]\t- More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.\n",
		"id": "documon.documon.mainConf"
	},
	{
		"text": "",
		"start": 83,
		"end": 85,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@property  {array} extensions - The list of extensions to search for source code.",
				"flag": "property",
				"after": "{array} extensions - The list of extensions to search for source code.",
				"type": "array",
				"afterType": "extensions - The list of extensions to search for source code.",
				"name": "extensions",
				"text": "The list of extensions to search for source code."
			}
		],
		"source": "@property  {array} extensions - The list of extensions to search for source code.",
		"id": "documon.documon.extensions"
	},
	{
		"text": "",
		"start": 88,
		"end": 96,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@property  {array} ignoreList - A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:",
				"flag": "property",
				"after": "{array} ignoreList - A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:",
				"type": "array",
				"afterType": "ignoreList - A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:",
				"name": "ignoreList",
				"text": "A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:\n\n\t\t'\\/\\.'\n\t\t'\\.git'\n\t\t'node_modules'\n\n\tConfiguration will concat this list with the user provied list."
			}
		],
		"source": "@property  {array} ignoreList - A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:\n\n\t\t'\\/\\.'\n\t\t'\\.git'\n\t\t'node_modules'\n\n\tConfiguration will concat this list with the user provied list.",
		"id": "documon.documon.ignoreList"
	},
	{
		"text": "git', 'node_modules'];\n",
		"start": 108,
		"end": 110,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [],
		"source": "git', 'node_modules'];"
	},
	{
		"text": "",
		"start": 112,
		"end": 114,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@property  {boolean} quiet=false - Supress stdout messages.",
				"flag": "property",
				"after": "{boolean} quiet=false - Supress stdout messages.",
				"type": "boolean",
				"afterType": "quiet=false - Supress stdout messages.",
				"defaultVal": "false",
				"name": "quiet",
				"text": "Supress stdout messages."
			}
		],
		"source": "@property  {boolean} quiet=false - Supress stdout messages.",
		"id": "documon.documon.quiet"
	},
	{
		"text": "",
		"start": 117,
		"end": 119,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@property  {boolean} dumpData=false - Whether or not to write intermediary files used during processing to the output data folder.",
				"flag": "property",
				"after": "{boolean} dumpData=false - Whether or not to write intermediary files used during processing to the output data folder.",
				"type": "boolean",
				"afterType": "dumpData=false - Whether or not to write intermediary files used during processing to the output data folder.",
				"defaultVal": "false",
				"name": "dumpData",
				"text": "Whether or not to write intermediary files used during processing to the output data folder."
			}
		],
		"source": "@property  {boolean} dumpData=false - Whether or not to write intermediary files used during processing to the output data folder.",
		"id": "documon.documon.dumpData"
	},
	{
		"text": "",
		"start": 122,
		"end": 124,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@property  {string} indexRedirectName - The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.",
				"flag": "property",
				"after": "{string} indexRedirectName - The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.",
				"type": "string",
				"afterType": "indexRedirectName - The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.",
				"name": "indexRedirectName",
				"text": "The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file."
			}
		],
		"source": "@property  {string} indexRedirectName - The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.",
		"id": "documon.documon.indexRedirectName"
	},
	{
		"text": "Simplify file write for text or json.\n\n",
		"start": 132,
		"end": 140,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@method     writeDatawriteData",
				"flag": "method",
				"after": "writeData",
				"afterType": "writeData",
				"name": "writeData",
				"single": true,
				"text": "writeData"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}       fpath    - The path to save to.The path to save to.",
				"flag": "param",
				"after": "{string}       fpath    - The path to save to.",
				"type": "string",
				"afterType": "fpath    - The path to save to.",
				"name": "fpath",
				"text": "The path to save to."
			},
			{
				"source": "@param      {string}       data     - The string to saveThe string to save",
				"flag": "param",
				"after": "{string}       data     - The string to save",
				"type": "string",
				"afterType": "data     - The string to save",
				"name": "data",
				"text": "The string to save"
			},
			{
				"source": "@param      {boolean}      json     - Whether the data should be serialized to JSON or not.",
				"flag": "param",
				"after": "{boolean}      json     - Whether the data should be serialized to JSON or not.",
				"type": "boolean",
				"afterType": "json     - Whether the data should be serialized to JSON or not.",
				"name": "json",
				"text": "Whether the data should be serialized to JSON or not."
			}
		],
		"source": "Simplify file write for text or json.\n\n@method     writeData\n@private\n@param      {string}       fpath    - The path to save to.\n@param      {string}       data     - The string to save\n@param      {boolean}      json     - Whether the data should be serialized to JSON or not.",
		"id": "documon.documon.writeData"
	},
	{
		"text": "Determines if the file has the proper extension based on the acceptable extensions defined in this modules static \"extensions\" array.\n",
		"start": 145,
		"end": 151,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@method     filterFileTypesfilterFileTypes",
				"flag": "method",
				"after": "filterFileTypes",
				"afterType": "filterFileTypes",
				"name": "filterFileTypes",
				"single": true,
				"text": "filterFileTypes"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}             fpath    - The path or full file name.The path or full file name.",
				"flag": "param",
				"after": "{string}             fpath    - The path or full file name.",
				"type": "string",
				"afterType": "fpath    - The path or full file name.",
				"name": "fpath",
				"text": "The path or full file name."
			},
			{
				"source": "@return     {boolean}                     - Whether or not it's an OK extension.",
				"flag": "return",
				"after": "{boolean}                     - Whether or not it's an OK extension.",
				"type": "boolean",
				"afterType": "Whether or not it's an OK extension.",
				"text": "Whether or not it's an OK extension."
			}
		],
		"source": "Determines if the file has the proper extension based on the acceptable extensions defined in this modules static \"extensions\" array.\n@method     filterFileTypes\n@private\n@param      {string}             fpath    - The path or full file name.\n@return     {boolean}                     - Whether or not it's an OK extension.",
		"id": "documon.documon.filterFileTypes"
	},
	{
		"text": "Initializes Documan based on the configuration settings\n\n- Parses configuration\n- Finds source files\n- Creates output folder\n- Copies template assets to output folder\n- Initializes main templates\n\n",
		"start": 172,
		"end": 186,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@method initinit",
				"flag": "method",
				"after": "init",
				"afterType": "init",
				"name": "init",
				"single": true,
				"text": "init"
			},
			{
				"source": "@private\n",
				"flag": "private",
				"after": "",
				"text": "\n"
			},
			{
				"source": "@param  {object} conf - See (run)[run], as this configuration object is simply passed through.See (run)[run], as this configuration object is simply passed through.",
				"flag": "param",
				"after": "{object} conf - See (run)[run], as this configuration object is simply passed through.",
				"type": "object",
				"afterType": "conf - See (run)[run], as this configuration object is simply passed through.",
				"name": "conf",
				"text": "See (run)[run], as this configuration object is simply passed through."
			},
			{
				"source": "@returns {boolean} - False when there's an error or misconfiguration. True when everything seems cool.",
				"flag": "returns",
				"after": "{boolean} - False when there's an error or misconfiguration. True when everything seems cool.",
				"type": "boolean",
				"afterType": "False when there's an error or misconfiguration. True when everything seems cool.",
				"text": "False when there's an error or misconfiguration. True when everything seems cool."
			}
		],
		"source": "Initializes Documan based on the configuration settings\n\n- Parses configuration\n- Finds source files\n- Creates output folder\n- Copies template assets to output folder\n- Initializes main templates\n\n@method init\n@private\n\n@param  {object} conf - See (run)[run], as this configuration object is simply passed through.\n@returns {boolean} - False when there's an error or misconfiguration. True when everything seems cool.",
		"id": "documon.documon.init"
	},
	{
		"text": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).\n\n- Generates data files (if dumpData enabled)\n\n",
		"start": 464,
		"end": 473,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@method shouldIgnoreshouldIgnore",
				"flag": "method",
				"after": "shouldIgnore",
				"afterType": "shouldIgnore",
				"name": "shouldIgnore",
				"single": true,
				"text": "shouldIgnore"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param  {string} item - The path to the file.The path to the file.",
				"flag": "param",
				"after": "{string} item - The path to the file.",
				"type": "string",
				"afterType": "item - The path to the file.",
				"name": "item",
				"text": "The path to the file."
			},
			{
				"source": "@returns {boolean} - true = ignore this file, false = don't ignore.",
				"flag": "returns",
				"after": "{boolean} - true = ignore this file, false = don't ignore.",
				"type": "boolean",
				"afterType": "true = ignore this file, false = don't ignore.",
				"text": "true = ignore this file, false = don't ignore."
			}
		],
		"source": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).\n\n- Generates data files (if dumpData enabled)\n\n@method shouldIgnore\n@private\n@param  {string} item - The path to the file.\n@returns {boolean} - true = ignore this file, false = don't ignore.",
		"id": "documon.documon.shouldIgnore"
	},
	{
		"text": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).\n\n- Generates data files (if dumpData enabled)\n\n",
		"start": 506,
		"end": 515,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@method seederseeder",
				"flag": "method",
				"after": "seeder",
				"afterType": "seeder",
				"name": "seeder",
				"single": true,
				"text": "seeder"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param  {string} file - The path to the file.The path to the file.",
				"flag": "param",
				"after": "{string} file - The path to the file.",
				"type": "string",
				"afterType": "file - The path to the file.",
				"name": "file",
				"text": "The path to the file."
			},
			{
				"source": "@returns {object} - The file's search data as computed by tag.js",
				"flag": "returns",
				"after": "{object} - The file's search data as computed by tag.js",
				"type": "object",
				"afterType": "The file's search data as computed by tag.js",
				"text": "The file's search data as computed by tag.js"
			}
		],
		"source": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).\n\n- Generates data files (if dumpData enabled)\n\n@method seeder\n@private\n@param  {string} file - The path to the file.\n@returns {object} - The file's search data as computed by tag.js",
		"id": "documon.documon.seeder"
	},
	{
		"text": "The main processing loop that executes and manages the main flow control of parsing, evaluating and  \nconstruction of the documentation.\n\nAfter [init](#init) configures things based on the settings, and generates a list of files to process\nthis method process and sends each file to the [seeder](#seeder) of evaluation and processing.\n\n- Generates HTML pages\n- Generates _menuData.js\n\n",
		"start": 608,
		"end": 621,
		"file": "/Volumes/Drives/projects/documon/documon/src/documon.js",
		"flags": [
			{
				"source": "@method runrun\n",
				"flag": "method",
				"after": "run",
				"afterType": "run",
				"name": "run",
				"single": true,
				"text": "run\n"
			},
			{
				"source": "@param  {object} conf \t\t\t\t\t- The configuration object. See [mainConf](#mainConf)",
				"flag": "param",
				"after": "{object} conf \t\t\t\t\t- The configuration object. See [mainConf](#mainConf)",
				"type": "object",
				"afterType": "conf \t\t\t\t\t- The configuration object. See [mainConf](#mainConf)",
				"name": "conf",
				"text": "The configuration object. See [mainConf](#mainConf)"
			}
		],
		"source": "The main processing loop that executes and manages the main flow control of parsing, evaluating and  \nconstruction of the documentation.\n\nAfter [init](#init) configures things based on the settings, and generates a list of files to process\nthis method process and sends each file to the [seeder](#seeder) of evaluation and processing.\n\n- Generates HTML pages\n- Generates _menuData.js\n\n@method run\n\n@param  {object} conf \t\t\t\t\t- The configuration object. See [mainConf](#mainConf)",
		"id": "documon.documon.run"
	}
]