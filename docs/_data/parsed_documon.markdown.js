[
	{
		"text": "Converts markdown to HTML, with the \"definition list\" extension from markdown-extra\nwired in.\n\nUsed for comment descriptions and for the markdown files in the \"more\" folder.\n\n",
		"start": 6,
		"end": 18,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown.js",
		"flags": [
			{
				"source": "@module  markdownmarkdown",
				"flag": "module",
				"after": "markdown",
				"afterType": "markdown",
				"name": "markdown",
				"single": true,
				"text": "markdown"
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
				"text": "\n\n\t\tvar markdown = require(\"./markdown\");\n\t\tvar html = markdown(\"Some **bold** text.\");"
			}
		],
		"source": "Converts markdown to HTML, with the \"definition list\" extension from markdown-extra\nwired in.\n\nUsed for comment descriptions and for the markdown files in the \"more\" folder.\n\n@module  markdown\n@package documon\n@example\n\n\t\tvar markdown = require(\"./markdown\");\n\t\tvar html = markdown(\"Some **bold** text.\");",
		"meta": [],
		"id": "documon.markdown"
	},
	{
		"text": "Converts a markdown string to HTML.\n\n",
		"start": 25,
		"end": 31,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown.js",
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
				"source": "@param   {string}  str - The markdown source.The markdown source.",
				"flag": "param",
				"after": "{string}  str - The markdown source.",
				"type": "string",
				"afterType": "str - The markdown source.",
				"name": "str",
				"text": "The markdown source."
			},
			{
				"source": "@return  {string}      - The rendered HTML.",
				"flag": "return",
				"after": "{string}      - The rendered HTML.",
				"type": "string",
				"afterType": "The rendered HTML.",
				"text": "The rendered HTML."
			}
		],
		"source": "Converts a markdown string to HTML.\n\n@method  run\n@param   {string}  str - The markdown source.\n@return  {string}      - The rendered HTML.",
		"meta": [],
		"id": "documon.markdown.run"
	},
	{
		"text": "Find and convert markdown extra definition lists into html.\n\n",
		"start": 50,
		"end": 58,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown.js",
		"flags": [
			{
				"source": "@method  definitionListsdefinitionLists",
				"flag": "method",
				"after": "definitionLists",
				"afterType": "definitionLists",
				"name": "definitionLists",
				"single": true,
				"text": "definitionLists"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}           text  descriptiondescription\n",
				"flag": "param",
				"after": "{type}           text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n"
			},
			{
				"source": "@return  {type}                 description",
				"flag": "return",
				"after": "{type}                 description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Find and convert markdown extra definition lists into html.\n\n@method  definitionLists\n@private\n@param   {type}           text  description\n\n@return  {type}                 description",
		"meta": [],
		"id": "documon.markdown.definitionLists"
	},
	{
		"text": "Process the contents of a single definition list, splitting it\ninto individual term and definition list items.\n\n",
		"start": 117,
		"end": 126,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown.js",
		"flags": [
			{
				"source": "@method  processDefListItemsprocessDefListItems",
				"flag": "method",
				"after": "processDefListItems",
				"afterType": "processDefListItems",
				"name": "processDefListItems",
				"single": true,
				"text": "processDefListItems"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}               listStr  descriptiondescription\n",
				"flag": "param",
				"after": "{type}               listStr  description",
				"type": "type",
				"afterType": "listStr  description",
				"name": "listStr",
				"text": "description\n"
			},
			{
				"source": "@return  {type}                        description",
				"flag": "return",
				"after": "{type}                        description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Process the contents of a single definition list, splitting it\ninto individual term and definition list items.\n\n@method  processDefListItems\n@private\n@param   {type}               listStr  description\n\n@return  {type}                        description",
		"meta": [],
		"id": "documon.markdown.processDefListItems"
	}
]