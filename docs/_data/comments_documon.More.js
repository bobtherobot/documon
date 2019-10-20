[
	{
		"start": 7,
		"end": 31,
		"data": "\nDiscovers, parses, converts markdown to HTML and injects menu with \"more\" docs.\n\nProcesses the \"more\" markdown folder by:\n- Building the menu to reflect the \"more folder\" directory structure.\n- Translates markdown into HTML\n\n\n@class More\n@package documon\n@private\n@param      {object}    params\t\t\t\t\t\t\t\t- The primary documon configuration [documon.js::mainConf](documon.documon.mainConf), which should contain:\n@param      {object}    [params.moreQuirkDelimiter=\".\"] \t- Set's the [quirkDelimiter](#quirkDelimiter).\n@param      {object}    params.outputAssetsFolder \t\t\t- The asset folder to copy into the final documentation. The More pages may refer to assets outside of the template, such as css, images, etc.\n@param      {object}    params.moreFolder \t\t\t\t\t- The folder to process.\n@param      {object}    params.templateFolder  \t\t\t\t- The path to the template folder.\n@param      {object}    params.outputFolder \t\t\t\t- THe destination folder.\n@param      {object}    params.gati \t\t\t\t\t\t- Your Google Analytics Tracking ID\n\n@param      {object}    sourceDocsMenu\t\t\t\t\t- The menu for the parsed source code documentation. We'll merge it into the \"more\" menu.\n@param      {object}    searchDB\t\t\t\t\t\t- The searchData (local to documon's [run](documon.documon.run) function, as generated by [seeder](documon.documon.seeder) ), we'll include our \"more\" docs for searching.\n@return     {menu | undefined}\t\t\t\t\t\t\t- Serves 2 purposes, when returning __undefined__ notifies callee that there aren't any \"more\" docs. Otherwise the modified menu is return with the original sourceDocsMenu either tacked onto the end of the \"more\" menu, or incorporated into the \"more\" menu at the \"DOCS-GO-HERE\" injection point.\n"
	},
	{
		"start": 42,
		"end": 45,
		"data": "@property {string} flat - A place to store generated page objects with a direct reference to their ID via flat[id].\n@private"
	},
	{
		"start": 49,
		"end": 52,
		"data": "@property {string} quirkDelimiter - Used to mark where filename numbering terminates and the \"title\" begins. User configurable via the [moreQuirkDelimiter option](more.options).\n@private"
	},
	{
		"start": 57,
		"end": 59,
		"data": "@property {string} metaString - The delimiting string used to seperate the meta JSON from normal markdown."
	},
	{
		"start": 62,
		"end": 65,
		"data": "@property {string} docGoesHereStr - The string used as the flag as to where to insert the parsed source documents into the menu.\n@private"
	},
	{
		"start": 68,
		"end": 71,
		"data": "@property {string} metaRx - The regular expression use to split the doc on the [metaString](#metaString)\n@private"
	},
	{
		"start": 76,
		"end": 96,
		"data": "Opens, catalogs and builds a new page from the provided file path.\n@method     newItem\n@private\n@param      {string}     url         - The path to the markdown file.\n@param      {boolean}    amFolder    - Process as a folder?\n@return     {object}                 - An object containing structured data:\n\n\t \t{\n\t\t\t  id\n\t\t\t, url // as originally provided \n\t\t\t, label // Cleaned up (no numbering) filename\n\t\t\t, name : // same as label but the page.jst template needs the \"name\" property.\n\t\t\t, kind : // The CSS class used on the icon( amFolder ? \"more-folder\" : \"more-file\" )\n\t\t\t, amFolder : // is a folder?\n\t\t\t, basepath : // The parent folder.\n\t\t\t, parentID : // The parent's id (e.g.more.foo)\n\t\t\t, children : // Folders have a children array\n\t\t}\n"
	},
	{
		"start": 183,
		"end": 190,
		"data": "Cleans the ID so the ID only contains lapha-numeric characters. Non-alphanumeric characters are translated into an underscore character.\n@method     cleanID\n@private\n@param      {type}     id          description\n@param      {type}     amFolder    description\n@return     {type}                 description"
	},
	{
		"start": 196,
		"end": 203,
		"data": "splits the numbering off of eight filename and returns the filename with out numbering\n@method     quirkyName\n@private\n@param      {type}        filename    description\n@param      {type}        amFolder    description\n@return     {type}                    description"
	},
	{
		"start": 231,
		"end": 237,
		"data": "A safe replacement for standard JSON parsing that mitigates errors.\n@method     parseJSON\n@private\n@param      {string}       val\n@return     {any}"
	},
	{
		"start": 250,
		"end": 253,
		"data": "See class description.\n@method     init"
	}
]