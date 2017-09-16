[
	{
		"text": "This is essentially [pagedown-extra](https://github.com/jmcmanus/pagedown-extra), ported to run as a simple node module.\r\nhttps://github.com/jmcmanus/pagedown-extra\r\n\r\n",
		"start": 6,
		"end": 14,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@module  markdown-extramarkdown-extra",
				"flag": "module",
				"after": "markdown-extra",
				"afterType": "markdown-extra",
				"name": "markdown-extra",
				"single": true,
				"text": "markdown-extra"
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
				"after": "",
				"text": "\n\r"
			}
		],
		"source": "This is essentially [pagedown-extra](https://github.com/jmcmanus/pagedown-extra), ported to run as a simple node module.\r\nhttps://github.com/jmcmanus/pagedown-extra\r\n\r\n@module  markdown-extra\r\n@package documon\r\n@private\r\n\r",
		"id": "documon.markdown-extra"
	},
	{
		"text": "Hooks into the main Markdown Converter to do pre and post processing on the source markdown-to-HTML conversions.\r\n\r\n",
		"start": 180,
		"end": 200,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  initinit\n\r",
				"flag": "method",
				"after": "init",
				"afterType": "init",
				"name": "init",
				"single": true,
				"text": "init\n\r"
			},
			{
				"source": "@param   {Markdown.Converter}  \tconverter  - A handle to a MarkdownConverter instance.A handle to a MarkdownConverter instance.",
				"flag": "param",
				"after": "{Markdown.Converter}  \tconverter  - A handle to a MarkdownConverter instance.",
				"type": "Markdown.Converter",
				"afterType": "converter  - A handle to a MarkdownConverter instance.",
				"name": "converter",
				"text": "A handle to a MarkdownConverter instance."
			},
			{
				"source": "@param   {object} options    - Things you can do.Things you can do.",
				"flag": "param",
				"after": "{object} options    - Things you can do.",
				"type": "object",
				"afterType": "options    - Things you can do.",
				"name": "options",
				"text": "Things you can do.",
				"children": [
					{
						"source": "@param   {array} [options.extensions=\"all\"] : (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:: (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:\n\t - tables\r\n\t - fenced_code_gfm\r\n\t - def_list\r\n\t - attr_list\r\n\t - footnotes\r\n\t - smartypants\r\n\t - strikethrough\r\n\t - newlines\r",
						"flag": "param",
						"after": "{array} [options.extensions=\"all\"] : (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:",
						"type": "array",
						"afterType": "[options.extensions=\"all\"] : (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:",
						"optional": true,
						"parent": "options",
						"defaultVal": "all",
						"name": "extensions",
						"text": ": (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:\n\t - tables\r\n\t - fenced_code_gfm\r\n\t - def_list\r\n\t - attr_list\r\n\t - footnotes\r\n\t - smartypants\r\n\t - strikethrough\r\n\t - newlines\r"
					},
					{
						"source": "@param   {array} [options.highlighter] : (string) The preferred syntax highlighter. Two options are available: prettify ([google prettify](https://github.com/google/code-prettify)) or \"highlight\" ([highlightJs](https://highlightjs.org/). You'll have to include the script of your choice into your pages manually!: (string) The preferred syntax highlighter. Two options are available: prettify ([google prettify](https://github.com/google/code-prettify)) or \"highlight\" ([highlightJs](https://highlightjs.org/). You'll have to include the script of your choice into your pages manually!",
						"flag": "param",
						"after": "{array} [options.highlighter] : (string) The preferred syntax highlighter. Two options are available: prettify ([google prettify](https://github.com/google/code-prettify)) or \"highlight\" ([highlightJs](https://highlightjs.org/). You'll have to include the script of your choice into your pages manually!",
						"type": "array",
						"afterType": "[options.highlighter] : (string) The preferred syntax highlighter. Two options are available: prettify ([google prettify](https://github.com/google/code-prettify)) or \"highlight\" ([highlightJs](https://highlightjs.org/). You'll have to include the script of your choice into your pages manually!",
						"optional": true,
						"parent": "options",
						"name": "highlighter",
						"text": ": (string) The preferred syntax highlighter. Two options are available: prettify ([google prettify](https://github.com/google/code-prettify)) or \"highlight\" ([highlightJs](https://highlightjs.org/). You'll have to include the script of your choice into your pages manually!"
					},
					{
						"source": "@param   {array} [options.table_class] : (string) The CSS class to apply to tables.: (string) The CSS class to apply to tables.\n\r",
						"flag": "param",
						"after": "{array} [options.table_class] : (string) The CSS class to apply to tables.",
						"type": "array",
						"afterType": "[options.table_class] : (string) The CSS class to apply to tables.",
						"optional": true,
						"parent": "options",
						"name": "table_class",
						"text": ": (string) The CSS class to apply to tables.\n\r"
					}
				]
			},
			{
				"source": "@return  {MarkdownExtra} - An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.",
				"flag": "return",
				"after": "{MarkdownExtra} - An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.",
				"type": "MarkdownExtra",
				"afterType": "An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.",
				"text": "An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes."
			}
		],
		"source": "Hooks into the main Markdown Converter to do pre and post processing on the source markdown-to-HTML conversions.\r\n\r\n@method  init\r\n\r\n@param   {Markdown.Converter}  \tconverter  - A handle to a MarkdownConverter instance.\r\n@param   {object} options    - Things you can do.\r\n@param   {array} [options.extensions=\"all\"] : (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:\r\n\t - tables\r\n\t - fenced_code_gfm\r\n\t - def_list\r\n\t - attr_list\r\n\t - footnotes\r\n\t - smartypants\r\n\t - strikethrough\r\n\t - newlines\r\n@param   {array} [options.highlighter] : (string) The preferred syntax highlighter. Two options are available: prettify ([google prettify](https://github.com/google/code-prettify)) or \"highlight\" ([highlightJs](https://highlightjs.org/). You'll have to include the script of your choice into your pages manually!\r\n@param   {array} [options.table_class] : (string) The CSS class to apply to tables.\r\n\r\n@return  {MarkdownExtra} - An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.\r",
		"id": "documon.markdown-extra.init"
	},
	{
		"text": "Do transformations\r\n\r\n",
		"start": 292,
		"end": 300,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  doTransformdoTransform",
				"flag": "method",
				"after": "doTransform",
				"afterType": "doTransform",
				"name": "doTransform",
				"single": true,
				"text": "doTransform"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {array}\t\ttransformationstransformations",
				"flag": "param",
				"after": "{array}\t\ttransformations",
				"type": "array",
				"afterType": "transformations",
				"name": "transformations",
				"single": true,
				"text": "transformations"
			},
			{
				"source": "@param   {string}\ttexttext",
				"flag": "param",
				"after": "{string}\ttext",
				"type": "string",
				"afterType": "text",
				"name": "text",
				"single": true,
				"text": "text"
			},
			{
				"source": "@return  {string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "Do transformations\r\n\r\n@method  doTransform\r\n@private\r\n@param   {array}\t\ttransformations\r\n@param   {string}\ttext \r\n@return  {string}\r",
		"id": "documon.markdown-extra.doTransform"
	},
	{
		"text": "Return a placeholder containing a key, which is the block's index in the\r\nhashBlocks array. We wrap our output in a <p> tag here so Pagedown won't.\r\n\r\n",
		"start": 309,
		"end": 317,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  hashExtraBlockhashExtraBlock",
				"flag": "method",
				"after": "hashExtraBlock",
				"afterType": "hashExtraBlock",
				"name": "hashExtraBlock",
				"single": true,
				"text": "hashExtraBlock"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {string} blockblock",
				"flag": "param",
				"after": "{string} block",
				"type": "string",
				"afterType": "block",
				"name": "block",
				"single": true,
				"text": "block"
			},
			{
				"source": "@return  {string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "Return a placeholder containing a key, which is the block's index in the\r\nhashBlocks array. We wrap our output in a <p> tag here so Pagedown won't.\r\n\r\n@method  hashExtraBlock\r\n@private\r\n@param   {string} block\r\n@return  {string}\r",
		"id": "documon.markdown-extra.hashExtraBlock"
	},
	{
		"text": "",
		"start": 322,
		"end": 327,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  hashExtraInlinehashExtraInline",
				"flag": "method",
				"after": "hashExtraInline",
				"afterType": "hashExtraInline",
				"name": "hashExtraInline",
				"single": true,
				"text": "hashExtraInline"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {string} blockblock",
				"flag": "param",
				"after": "{string} block",
				"type": "string",
				"afterType": "block",
				"name": "block",
				"single": true,
				"text": "block"
			},
			{
				"source": "@return  {string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "@method  hashExtraInline\r\n@private\r\n@param   {string} block\r\n@return  {string}\r",
		"id": "documon.markdown-extra.hashExtraInline"
	},
	{
		"text": "Replace placeholder blocks in `text` with their corresponding\r\nhtml blocks in the hashBlocks array.\r\n",
		"start": 334,
		"end": 341,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  unHashExtraBlocksunHashExtraBlocks",
				"flag": "method",
				"after": "unHashExtraBlocks",
				"afterType": "unHashExtraBlocks",
				"name": "unHashExtraBlocks",
				"single": true,
				"text": "unHashExtraBlocks"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {string} texttext",
				"flag": "param",
				"after": "{string} text",
				"type": "string",
				"afterType": "text",
				"name": "text",
				"single": true,
				"text": "text"
			},
			{
				"source": "@return  {string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "Replace placeholder blocks in `text` with their corresponding\r\nhtml blocks in the hashBlocks array.\r\n@method  unHashExtraBlocks\r\n@private\r\n@param   {string} text\r\n@return  {string}\r",
		"id": "documon.markdown-extra.unHashExtraBlocks"
	},
	{
		"text": "Wrap headers to make sure they won't be in def lists\r\n\r\n",
		"start": 360,
		"end": 367,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  wrapHeaderswrapHeaders",
				"flag": "method",
				"after": "wrapHeaders",
				"afterType": "wrapHeaders",
				"name": "wrapHeaders",
				"single": true,
				"text": "wrapHeaders"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {string} texttext",
				"flag": "param",
				"after": "{string} text",
				"type": "string",
				"afterType": "text",
				"name": "text",
				"single": true,
				"text": "text"
			},
			{
				"source": "@return  {string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "Wrap headers to make sure they won't be in def lists\r\n\r\n@method  wrapHeaders\r\n@private\r\n@param   {string} text\r\n@return  {string}\r",
		"id": "documon.markdown-extra.wrapHeaders"
	},
	{
		"text": "Extract headers attribute blocks, move them above the element they will be applied to, and hash them for later.\r\n\r\n",
		"start": 393,
		"end": 401,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  hashHeaderAttributeBlockshashHeaderAttributeBlocks",
				"flag": "method",
				"after": "hashHeaderAttributeBlocks",
				"afterType": "hashHeaderAttributeBlocks",
				"name": "hashHeaderAttributeBlocks",
				"single": true,
				"text": "hashHeaderAttributeBlocks"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}                     text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}                     text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}                           description",
				"flag": "return",
				"after": "{type}                           description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Extract headers attribute blocks, move them above the element they will be applied to, and hash them for later.\r\n\r\n@method  hashHeaderAttributeBlocks\r\n@private\r\n@param   {type}                     text  description\r\n\r\n@return  {type}                           description\r",
		"id": "documon.markdown-extra.hashHeaderAttributeBlocks"
	},
	{
		"text": "Extract FCB attribute blocks, move them above the element they will be applied to, and hash them for later.\r\n\r\n",
		"start": 415,
		"end": 423,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  hashFcbAttributeBlockshashFcbAttributeBlocks",
				"flag": "method",
				"after": "hashFcbAttributeBlocks",
				"afterType": "hashFcbAttributeBlocks",
				"name": "hashFcbAttributeBlocks",
				"single": true,
				"text": "hashFcbAttributeBlocks"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}                  text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}                  text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
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
		"source": "Extract FCB attribute blocks, move them above the element they will be applied to, and hash them for later.\r\n\r\n@method  hashFcbAttributeBlocks\r\n@private\r\n@param   {type}                  text  description\r\n\r\n@return  {type}                        description\r",
		"id": "documon.markdown-extra.hashFcbAttributeBlocks"
	},
	{
		"text": "[applyAttributeBlocks description]\r\n\r\n",
		"start": 437,
		"end": 445,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  applyAttributeBlocksapplyAttributeBlocks",
				"flag": "method",
				"after": "applyAttributeBlocks",
				"afterType": "applyAttributeBlocks",
				"name": "applyAttributeBlocks",
				"single": true,
				"text": "applyAttributeBlocks"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}                text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}                text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}                      description",
				"flag": "return",
				"after": "{type}                      description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "[applyAttributeBlocks description]\r\n\r\n@method  applyAttributeBlocks\r\n@private\r\n@param   {type}                text  description\r\n\r\n@return  {type}                      description\r",
		"id": "documon.markdown-extra.applyAttributeBlocks"
	},
	{
		"text": "Find and convert Markdown Extra tables into html.\r\n\r\n",
		"start": 484,
		"end": 492,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  tablestables",
				"flag": "method",
				"after": "tables",
				"afterType": "tables",
				"name": "tables",
				"single": true,
				"text": "tables"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}  text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}  text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}        description",
				"flag": "return",
				"after": "{type}        description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Find and convert Markdown Extra tables into html.\r\n\r\n@method  tables\r\n@private\r\n@param   {type}  text  description\r\n\r\n@return  {type}        description\r",
		"id": "documon.markdown-extra.tables"
	},
	{
		"text": "Strip footnote, store in hashes.\r\n\r\n",
		"start": 608,
		"end": 616,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  stripFootnoteDefinitionsstripFootnoteDefinitions",
				"flag": "method",
				"after": "stripFootnoteDefinitions",
				"afterType": "stripFootnoteDefinitions",
				"name": "stripFootnoteDefinitions",
				"single": true,
				"text": "stripFootnoteDefinitions"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}                    text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}                    text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}                          description",
				"flag": "return",
				"after": "{type}                          description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Strip footnote, store in hashes.\r\n\r\n@method  stripFootnoteDefinitions\r\n@private\r\n@param   {type}                    text  description\r\n\r\n@return  {type}                          description\r",
		"id": "documon.markdown-extra.stripFootnoteDefinitions"
	},
	{
		"text": "Find and convert footnotes references.\r\n\r\n",
		"start": 634,
		"end": 642,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  doFootnotesdoFootnotes",
				"flag": "method",
				"after": "doFootnotes",
				"afterType": "doFootnotes",
				"name": "doFootnotes",
				"single": true,
				"text": "doFootnotes"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}       text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}       text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}             description",
				"flag": "return",
				"after": "{type}             description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Find and convert footnotes references.\r\n\r\n@method  doFootnotes\r\n@private\r\n@param   {type}       text  description\r\n\r\n@return  {type}             description\r",
		"id": "documon.markdown-extra.doFootnotes"
	},
	{
		"text": "Print footnotes at the end of the document\r\n\r\n",
		"start": 665,
		"end": 673,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  printFootnotesprintFootnotes",
				"flag": "method",
				"after": "printFootnotes",
				"afterType": "printFootnotes",
				"name": "printFootnotes",
				"single": true,
				"text": "printFootnotes"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}          text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}          text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}                description",
				"flag": "return",
				"after": "{type}                description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Print footnotes at the end of the document\r\n\r\n@method  printFootnotes\r\n@private\r\n@param   {type}          text  description\r\n\r\n@return  {type}                description\r",
		"id": "documon.markdown-extra.printFootnotes"
	},
	{
		"text": "Find and convert gfm-inspired fenced code blocks into html.\r\n\r\n",
		"start": 700,
		"end": 708,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  fencedCodeBlocksfencedCodeBlocks",
				"flag": "method",
				"after": "fencedCodeBlocks",
				"afterType": "fencedCodeBlocks",
				"name": "fencedCodeBlocks",
				"single": true,
				"text": "fencedCodeBlocks"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}            text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}            text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}                  description",
				"flag": "return",
				"after": "{type}                  description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Find and convert gfm-inspired fenced code blocks into html.\r\n\r\n@method  fencedCodeBlocks\r\n@private\r\n@param   {type}            text  description\r\n\r\n@return  {type}                  description\r",
		"id": "documon.markdown-extra.fencedCodeBlocks"
	},
	{
		"text": "[educatePants description]\r\n\r\n",
		"start": 753,
		"end": 761,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  educatePantseducatePants",
				"flag": "method",
				"after": "educatePants",
				"afterType": "educatePants",
				"name": "educatePants",
				"single": true,
				"text": "educatePants"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}        text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}        text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}              description",
				"flag": "return",
				"after": "{type}              description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "[educatePants description]\r\n\r\n@method  educatePants\r\n@private\r\n@param   {type}        text  description\r\n\r\n@return  {type}              description\r",
		"id": "documon.markdown-extra.educatePants"
	},
	{
		"text": "[revertPants description]\r\n\r\n",
		"start": 791,
		"end": 800,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  revertPantsrevertPants",
				"flag": "method",
				"after": "revertPants",
				"afterType": "revertPants",
				"name": "revertPants",
				"single": true,
				"text": "revertPants"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}       wholeMatch  descriptiondescription",
				"flag": "param",
				"after": "{type}       wholeMatch  description",
				"type": "type",
				"afterType": "wholeMatch  description",
				"name": "wholeMatch",
				"text": "description"
			},
			{
				"source": "@param   {type}       m1          descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}       m1          description",
				"type": "type",
				"afterType": "m1          description",
				"name": "m1",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}                   description",
				"flag": "return",
				"after": "{type}                   description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "[revertPants description]\r\n\r\n@method  revertPants\r\n@private\r\n@param   {type}       wholeMatch  description\r\n@param   {type}       m1          description\r\n\r\n@return  {type}                   description\r",
		"id": "documon.markdown-extra.revertPants"
	},
	{
		"text": "[applyPants description]\r\n\r\n",
		"start": 813,
		"end": 821,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  applyPantsapplyPants",
				"flag": "method",
				"after": "applyPants",
				"afterType": "applyPants",
				"name": "applyPants",
				"single": true,
				"text": "applyPants"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}      text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}      text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}            description",
				"flag": "return",
				"after": "{type}            description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "[applyPants description]\r\n\r\n@method  applyPants\r\n@private\r\n@param   {type}      text  description\r\n\r\n@return  {type}            description\r",
		"id": "documon.markdown-extra.applyPants"
	},
	{
		"text": "Find and convert markdown extra definition lists into html.\r\n\r\n",
		"start": 880,
		"end": 888,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  runSmartyPantsrunSmartyPants",
				"flag": "method",
				"after": "runSmartyPants",
				"afterType": "runSmartyPants",
				"name": "runSmartyPants",
				"single": true,
				"text": "runSmartyPants"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}          text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}          text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}                description",
				"flag": "return",
				"after": "{type}                description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Find and convert markdown extra definition lists into html.\r\n\r\n@method  runSmartyPants\r\n@private\r\n@param   {type}          text  description\r\n\r\n@return  {type}                description\r",
		"id": "documon.markdown-extra.runSmartyPants"
	},
	{
		"text": "Find and convert markdown extra definition lists into html.\r\n\r\n",
		"start": 901,
		"end": 909,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
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
				"source": "@param   {type}           text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}           text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
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
		"source": "Find and convert markdown extra definition lists into html.\r\n\r\n@method  definitionLists\r\n@private\r\n@param   {type}           text  description\r\n\r\n@return  {type}                 description\r",
		"id": "documon.markdown-extra.definitionLists"
	},
	{
		"text": "Process the contents of a single definition list, splitting it\r\ninto individual term and definition list items.\r\n\r\n",
		"start": 958,
		"end": 967,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
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
				"source": "@param   {type}               listStr  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}               listStr  description",
				"type": "type",
				"afterType": "listStr  description",
				"name": "listStr",
				"text": "description\n\r"
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
		"source": "Process the contents of a single definition list, splitting it\r\ninto individual term and definition list items.\r\n\r\n@method  processDefListItems\r\n@private\r\n@param   {type}               listStr  description\r\n\r\n@return  {type}                        description\r",
		"id": "documon.markdown-extra.processDefListItems"
	},
	{
		"text": "[strikethrough description]\r\n\r\n",
		"start": 1044,
		"end": 1052,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  strikethroughstrikethrough",
				"flag": "method",
				"after": "strikethrough",
				"afterType": "strikethrough",
				"name": "strikethrough",
				"single": true,
				"text": "strikethrough"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}         text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}         text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}               description",
				"flag": "return",
				"after": "{type}               description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "[strikethrough description]\r\n\r\n@method  strikethrough\r\n@private\r\n@param   {type}         text  description\r\n\r\n@return  {type}               description\r",
		"id": "documon.markdown-extra.strikethrough"
	},
	{
		"text": "[newlines description]\r\n\r\n",
		"start": 1064,
		"end": 1072,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-extra.js",
		"flags": [
			{
				"source": "@method  newlinesnewlines",
				"flag": "method",
				"after": "newlines",
				"afterType": "newlines",
				"name": "newlines",
				"single": true,
				"text": "newlines"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}    text  descriptiondescription\n\r",
				"flag": "param",
				"after": "{type}    text  description",
				"type": "type",
				"afterType": "text  description",
				"name": "text",
				"text": "description\n\r"
			},
			{
				"source": "@return  {type}          description",
				"flag": "return",
				"after": "{type}          description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "[newlines description]\r\n\r\n@method  newlines\r\n@private\r\n@param   {type}    text  description\r\n\r\n@return  {type}          description\r",
		"id": "documon.markdown-extra.newlines"
	}
]