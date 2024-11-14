[
	{
		"text": "\nDiscovers, parses, converts markdown to HTML and injects menu with \"more\" docs.\n\nProcesses the \"more\" markdown folder by:\n- Building the menu to reflect the \"more folder\" directory structure.\n- Translates markdown into HTML\n\n\n",
		"start": 7,
		"end": 31,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@class MoreMore",
				"flag": "class",
				"after": "More",
				"afterType": "More",
				"name": "More",
				"single": true,
				"text": "More"
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
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {object}    params\t\t\t\t\t\t\t\t- The primary documon configuration [documon.js::mainConf](documon.documon.mainConf), which should contain:The primary documon configuration [documon.js::mainConf](documon.documon.mainConf), which should contain:",
				"flag": "param",
				"after": "{object}    params\t\t\t\t\t\t\t\t- The primary documon configuration [documon.js::mainConf](documon.documon.mainConf), which should contain:",
				"type": "object",
				"afterType": "params\t\t\t\t\t\t\t\t- The primary documon configuration [documon.js::mainConf](documon.documon.mainConf), which should contain:",
				"name": "params",
				"text": "The primary documon configuration [documon.js::mainConf](documon.documon.mainConf), which should contain:",
				"children": [
					{
						"source": "@param      {object}    [params.moreQuirkDelimiter=\".\"] \t- Set's the [quirkDelimiter](#quirkDelimiter).Set's the [quirkDelimiter](#quirkDelimiter).",
						"flag": "param",
						"after": "{object}    [params.moreQuirkDelimiter=\".\"] \t- Set's the [quirkDelimiter](#quirkDelimiter).",
						"type": "object",
						"afterType": "[params.moreQuirkDelimiter=\".\"] \t- Set's the [quirkDelimiter](#quirkDelimiter).",
						"defaultVal": ".",
						"optional": true,
						"parent": "params",
						"name": "moreQuirkDelimiter",
						"text": "Set's the [quirkDelimiter](#quirkDelimiter)."
					},
					{
						"source": "@param      {object}    params.outputAssetsFolder \t\t\t- The asset folder to copy into the final documentation. The More pages may refer to assets outside of the template, such as css, images, etc.The asset folder to copy into the final documentation. The More pages may refer to assets outside of the template, such as css, images, etc.",
						"flag": "param",
						"after": "{object}    params.outputAssetsFolder \t\t\t- The asset folder to copy into the final documentation. The More pages may refer to assets outside of the template, such as css, images, etc.",
						"type": "object",
						"afterType": "params.outputAssetsFolder \t\t\t- The asset folder to copy into the final documentation. The More pages may refer to assets outside of the template, such as css, images, etc.",
						"parent": "params",
						"name": "outputAssetsFolder",
						"text": "The asset folder to copy into the final documentation. The More pages may refer to assets outside of the template, such as css, images, etc."
					},
					{
						"source": "@param      {object}    params.moreFolder \t\t\t\t\t- The folder to process.The folder to process.",
						"flag": "param",
						"after": "{object}    params.moreFolder \t\t\t\t\t- The folder to process.",
						"type": "object",
						"afterType": "params.moreFolder \t\t\t\t\t- The folder to process.",
						"parent": "params",
						"name": "moreFolder",
						"text": "The folder to process."
					},
					{
						"source": "@param      {object}    params.templateFolder  \t\t\t\t- The path to the template folder.The path to the template folder.",
						"flag": "param",
						"after": "{object}    params.templateFolder  \t\t\t\t- The path to the template folder.",
						"type": "object",
						"afterType": "params.templateFolder  \t\t\t\t- The path to the template folder.",
						"parent": "params",
						"name": "templateFolder",
						"text": "The path to the template folder."
					},
					{
						"source": "@param      {object}    params.outputFolder \t\t\t\t- THe destination folder.THe destination folder.",
						"flag": "param",
						"after": "{object}    params.outputFolder \t\t\t\t- THe destination folder.",
						"type": "object",
						"afterType": "params.outputFolder \t\t\t\t- THe destination folder.",
						"parent": "params",
						"name": "outputFolder",
						"text": "THe destination folder."
					},
					{
						"source": "@param      {object}    params.gati \t\t\t\t\t\t- Your Google Analytics Tracking IDYour Google Analytics Tracking ID\n",
						"flag": "param",
						"after": "{object}    params.gati \t\t\t\t\t\t- Your Google Analytics Tracking ID",
						"type": "object",
						"afterType": "params.gati \t\t\t\t\t\t- Your Google Analytics Tracking ID",
						"parent": "params",
						"name": "gati",
						"text": "Your Google Analytics Tracking ID\n"
					}
				]
			},
			{
				"source": "@param      {object}    sourceDocsMenu\t\t\t\t\t- The menu for the parsed source code documentation. We'll merge it into the \"more\" menu.The menu for the parsed source code documentation. We'll merge it into the \"more\" menu.",
				"flag": "param",
				"after": "{object}    sourceDocsMenu\t\t\t\t\t- The menu for the parsed source code documentation. We'll merge it into the \"more\" menu.",
				"type": "object",
				"afterType": "sourceDocsMenu\t\t\t\t\t- The menu for the parsed source code documentation. We'll merge it into the \"more\" menu.",
				"name": "sourceDocsMenu",
				"text": "The menu for the parsed source code documentation. We'll merge it into the \"more\" menu."
			},
			{
				"source": "@param      {object}    searchDB\t\t\t\t\t\t- The searchData (local to documon's [run](documon.documon.run) function, as generated by [seeder](documon.documon.seeder) ), we'll include our \"more\" docs for searching.The searchData (local to documon's [run](documon.documon.run) function, as generated by [seeder](documon.documon.seeder) ), we'll include our \"more\" docs for searching.",
				"flag": "param",
				"after": "{object}    searchDB\t\t\t\t\t\t- The searchData (local to documon's [run](documon.documon.run) function, as generated by [seeder](documon.documon.seeder) ), we'll include our \"more\" docs for searching.",
				"type": "object",
				"afterType": "searchDB\t\t\t\t\t\t- The searchData (local to documon's [run](documon.documon.run) function, as generated by [seeder](documon.documon.seeder) ), we'll include our \"more\" docs for searching.",
				"name": "searchDB",
				"text": "The searchData (local to documon's [run](documon.documon.run) function, as generated by [seeder](documon.documon.seeder) ), we'll include our \"more\" docs for searching."
			},
			{
				"source": "@return     {menu | undefined}\t\t\t\t\t\t\t- Serves 2 purposes, when returning __undefined__ notifies callee that there aren't any \"more\" docs. Otherwise the modified menu is return with the original sourceDocsMenu either tacked onto the end of the \"more\" menu, or incorporated into the \"more\" menu at the \"DOCS-GO-HERE\" injection point.",
				"flag": "return",
				"after": "{menu | undefined}\t\t\t\t\t\t\t- Serves 2 purposes, when returning __undefined__ notifies callee that there aren't any \"more\" docs. Otherwise the modified menu is return with the original sourceDocsMenu either tacked onto the end of the \"more\" menu, or incorporated into the \"more\" menu at the \"DOCS-GO-HERE\" injection point.",
				"type": "menu | undefined",
				"afterType": "Serves 2 purposes, when returning __undefined__ notifies callee that there aren't any \"more\" docs. Otherwise the modified menu is return with the original sourceDocsMenu either tacked onto the end of the \"more\" menu, or incorporated into the \"more\" menu at the \"DOCS-GO-HERE\" injection point.",
				"text": "Serves 2 purposes, when returning __undefined__ notifies callee that there aren't any \"more\" docs. Otherwise the modified menu is return with the original sourceDocsMenu either tacked onto the end of the \"more\" menu, or incorporated into the \"more\" menu at the \"DOCS-GO-HERE\" injection point.\n"
			}
		],
		"source": "\nDiscovers, parses, converts markdown to HTML and injects menu with \"more\" docs.\n\nProcesses the \"more\" markdown folder by:\n- Building the menu to reflect the \"more folder\" directory structure.\n- Translates markdown into HTML\n\n\n@class More\n@package documon\n@private\n@param      {object}    params\t\t\t\t\t\t\t\t- The primary documon configuration [documon.js::mainConf](documon.documon.mainConf), which should contain:\n@param      {object}    [params.moreQuirkDelimiter=\".\"] \t- Set's the [quirkDelimiter](#quirkDelimiter).\n@param      {object}    params.outputAssetsFolder \t\t\t- The asset folder to copy into the final documentation. The More pages may refer to assets outside of the template, such as css, images, etc.\n@param      {object}    params.moreFolder \t\t\t\t\t- The folder to process.\n@param      {object}    params.templateFolder  \t\t\t\t- The path to the template folder.\n@param      {object}    params.outputFolder \t\t\t\t- THe destination folder.\n@param      {object}    params.gati \t\t\t\t\t\t- Your Google Analytics Tracking ID\n\n@param      {object}    sourceDocsMenu\t\t\t\t\t- The menu for the parsed source code documentation. We'll merge it into the \"more\" menu.\n@param      {object}    searchDB\t\t\t\t\t\t- The searchData (local to documon's [run](documon.documon.run) function, as generated by [seeder](documon.documon.seeder) ), we'll include our \"more\" docs for searching.\n@return     {menu | undefined}\t\t\t\t\t\t\t- Serves 2 purposes, when returning __undefined__ notifies callee that there aren't any \"more\" docs. Otherwise the modified menu is return with the original sourceDocsMenu either tacked onto the end of the \"more\" menu, or incorporated into the \"more\" menu at the \"DOCS-GO-HERE\" injection point.\n",
		"id": "documon.More"
	},
	{
		"text": "",
		"start": 43,
		"end": 46,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@property {string} flat - A place to store generated page objects with a direct reference to their ID via flat[id].A place to store generated page objects with a direct reference to their ID via flat[id].",
				"flag": "property",
				"after": "{string} flat - A place to store generated page objects with a direct reference to their ID via flat[id].",
				"type": "string",
				"afterType": "flat - A place to store generated page objects with a direct reference to their ID via flat[id].",
				"name": "flat",
				"text": "A place to store generated page objects with a direct reference to their ID via flat[id]."
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			}
		],
		"source": "@property {string} flat - A place to store generated page objects with a direct reference to their ID via flat[id].\n@private",
		"id": "documon.More.flat"
	},
	{
		"text": "",
		"start": 50,
		"end": 53,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@property {string} quirkDelimiter - Used to mark where filename numbering terminates and the \"title\" begins. User configurable via the [moreQuirkDelimiter option](more.options).Used to mark where filename numbering terminates and the \"title\" begins. User configurable via the [moreQuirkDelimiter option](more.options).",
				"flag": "property",
				"after": "{string} quirkDelimiter - Used to mark where filename numbering terminates and the \"title\" begins. User configurable via the [moreQuirkDelimiter option](more.options).",
				"type": "string",
				"afterType": "quirkDelimiter - Used to mark where filename numbering terminates and the \"title\" begins. User configurable via the [moreQuirkDelimiter option](more.options).",
				"name": "quirkDelimiter",
				"text": "Used to mark where filename numbering terminates and the \"title\" begins. User configurable via the [moreQuirkDelimiter option](more.options)."
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			}
		],
		"source": "@property {string} quirkDelimiter - Used to mark where filename numbering terminates and the \"title\" begins. User configurable via the [moreQuirkDelimiter option](more.options).\n@private",
		"id": "documon.More.quirkDelimiter"
	},
	{
		"text": "",
		"start": 58,
		"end": 60,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@property {string} metaString - The delimiting string used to seperate the meta JSON from normal markdown.",
				"flag": "property",
				"after": "{string} metaString - The delimiting string used to seperate the meta JSON from normal markdown.",
				"type": "string",
				"afterType": "metaString - The delimiting string used to seperate the meta JSON from normal markdown.",
				"name": "metaString",
				"text": "The delimiting string used to seperate the meta JSON from normal markdown."
			}
		],
		"source": "@property {string} metaString - The delimiting string used to seperate the meta JSON from normal markdown.",
		"id": "documon.More.metaString"
	},
	{
		"text": "",
		"start": 63,
		"end": 66,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@property {string} docGoesHereStr - The string used as the flag as to where to insert the parsed source documents into the menu.The string used as the flag as to where to insert the parsed source documents into the menu.",
				"flag": "property",
				"after": "{string} docGoesHereStr - The string used as the flag as to where to insert the parsed source documents into the menu.",
				"type": "string",
				"afterType": "docGoesHereStr - The string used as the flag as to where to insert the parsed source documents into the menu.",
				"name": "docGoesHereStr",
				"text": "The string used as the flag as to where to insert the parsed source documents into the menu."
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			}
		],
		"source": "@property {string} docGoesHereStr - The string used as the flag as to where to insert the parsed source documents into the menu.\n@private",
		"id": "documon.More.docGoesHereStr"
	},
	{
		"text": "",
		"start": 69,
		"end": 72,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@property {string} metaRx - The regular expression use to split the doc on the [metaString](#metaString)The regular expression use to split the doc on the [metaString](#metaString)",
				"flag": "property",
				"after": "{string} metaRx - The regular expression use to split the doc on the [metaString](#metaString)",
				"type": "string",
				"afterType": "metaRx - The regular expression use to split the doc on the [metaString](#metaString)",
				"name": "metaRx",
				"text": "The regular expression use to split the doc on the [metaString](#metaString)"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			}
		],
		"source": "@property {string} metaRx - The regular expression use to split the doc on the [metaString](#metaString)\n@private",
		"id": "documon.More.metaRx"
	},
	{
		"text": "Opens, catalogs and builds a new page from the provided file path.\n",
		"start": 77,
		"end": 97,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@method     newItemnewItem",
				"flag": "method",
				"after": "newItem",
				"afterType": "newItem",
				"name": "newItem",
				"single": true,
				"text": "newItem"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}     url         - The path to the markdown file.The path to the markdown file.",
				"flag": "param",
				"after": "{string}     url         - The path to the markdown file.",
				"type": "string",
				"afterType": "url         - The path to the markdown file.",
				"name": "url",
				"text": "The path to the markdown file."
			},
			{
				"source": "@param      {boolean}    amFolder    - Process as a folder?Process as a folder?",
				"flag": "param",
				"after": "{boolean}    amFolder    - Process as a folder?",
				"type": "boolean",
				"afterType": "amFolder    - Process as a folder?",
				"name": "amFolder",
				"text": "Process as a folder?"
			},
			{
				"source": "@return     {object}                 - An object containing structured data:",
				"flag": "return",
				"after": "{object}                 - An object containing structured data:",
				"type": "object",
				"afterType": "An object containing structured data:",
				"text": "An object containing structured data:\n\n\t \t{\n\t\t\t  id\n\t\t\t, url // as originally provided \n\t\t\t, label // Cleaned up (no numbering) filename\n\t\t\t, name : // same as label but the page.jst template needs the \"name\" property.\n\t\t\t, kind : // The CSS class used on the icon( amFolder ? \"more-folder\" : \"more-file\" )\n\t\t\t, amFolder : // is a folder?\n\t\t\t, basepath : // The parent folder.\n\t\t\t, parentID : // The parent's id (e.g.more.foo)\n\t\t\t, children : // Folders have a children array\n\t\t}\n"
			}
		],
		"source": "Opens, catalogs and builds a new page from the provided file path.\n@method     newItem\n@private\n@param      {string}     url         - The path to the markdown file.\n@param      {boolean}    amFolder    - Process as a folder?\n@return     {object}                 - An object containing structured data:\n\n\t \t{\n\t\t\t  id\n\t\t\t, url // as originally provided \n\t\t\t, label // Cleaned up (no numbering) filename\n\t\t\t, name : // same as label but the page.jst template needs the \"name\" property.\n\t\t\t, kind : // The CSS class used on the icon( amFolder ? \"more-folder\" : \"more-file\" )\n\t\t\t, amFolder : // is a folder?\n\t\t\t, basepath : // The parent folder.\n\t\t\t, parentID : // The parent's id (e.g.more.foo)\n\t\t\t, children : // Folders have a children array\n\t\t}\n",
		"id": "documon.More.newItem"
	},
	{
		"text": "Cleans the ID so the ID only contains lapha-numeric characters. Non-alphanumeric characters are translated into an underscore character.\n",
		"start": 184,
		"end": 191,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@method     cleanIDcleanID",
				"flag": "method",
				"after": "cleanID",
				"afterType": "cleanID",
				"name": "cleanID",
				"single": true,
				"text": "cleanID"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {type}     id          descriptiondescription",
				"flag": "param",
				"after": "{type}     id          description",
				"type": "type",
				"afterType": "id          description",
				"name": "id",
				"text": "description"
			},
			{
				"source": "@param      {type}     amFolder    descriptiondescription",
				"flag": "param",
				"after": "{type}     amFolder    description",
				"type": "type",
				"afterType": "amFolder    description",
				"name": "amFolder",
				"text": "description"
			},
			{
				"source": "@return     {type}                 description",
				"flag": "return",
				"after": "{type}                 description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Cleans the ID so the ID only contains lapha-numeric characters. Non-alphanumeric characters are translated into an underscore character.\n@method     cleanID\n@private\n@param      {type}     id          description\n@param      {type}     amFolder    description\n@return     {type}                 description",
		"id": "documon.More.cleanID"
	},
	{
		"text": "splits the numbering off of eight filename and returns the filename with out numbering\n",
		"start": 197,
		"end": 204,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@method     quirkyNamequirkyName",
				"flag": "method",
				"after": "quirkyName",
				"afterType": "quirkyName",
				"name": "quirkyName",
				"single": true,
				"text": "quirkyName"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {type}        filename    descriptiondescription",
				"flag": "param",
				"after": "{type}        filename    description",
				"type": "type",
				"afterType": "filename    description",
				"name": "filename",
				"text": "description"
			},
			{
				"source": "@param      {type}        amFolder    descriptiondescription",
				"flag": "param",
				"after": "{type}        amFolder    description",
				"type": "type",
				"afterType": "amFolder    description",
				"name": "amFolder",
				"text": "description"
			},
			{
				"source": "@return     {type}                    description",
				"flag": "return",
				"after": "{type}                    description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "splits the numbering off of eight filename and returns the filename with out numbering\n@method     quirkyName\n@private\n@param      {type}        filename    description\n@param      {type}        amFolder    description\n@return     {type}                    description",
		"id": "documon.More.quirkyName"
	},
	{
		"text": "A safe replacement for standard JSON parsing that mitigates errors.\n",
		"start": 232,
		"end": 238,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@method     parseJSONparseJSON",
				"flag": "method",
				"after": "parseJSON",
				"afterType": "parseJSON",
				"name": "parseJSON",
				"single": true,
				"text": "parseJSON"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}       valval",
				"flag": "param",
				"after": "{string}       val",
				"type": "string",
				"afterType": "val",
				"name": "val",
				"single": true,
				"text": "val"
			},
			{
				"source": "@return     {any}",
				"flag": "return",
				"after": "{any}",
				"type": "any"
			}
		],
		"source": "A safe replacement for standard JSON parsing that mitigates errors.\n@method     parseJSON\n@private\n@param      {string}       val\n@return     {any}",
		"id": "documon.More.parseJSON"
	},
	{
		"text": "See class description.\n",
		"start": 251,
		"end": 254,
		"file": "/Volumes/Drives/projects/documon/documon/src/more.js",
		"flags": [
			{
				"source": "@method     init",
				"flag": "method",
				"after": "init",
				"afterType": "init",
				"name": "init",
				"single": true,
				"text": "init"
			}
		],
		"source": "See class description.\n@method     init",
		"id": "documon.More.init"
	}
]