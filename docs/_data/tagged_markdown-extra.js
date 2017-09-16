{
	"line": 15,
	"name": "markdown-extra",
	"entity": "module",
	"flagSearchText": " markdown-extra documon \n\r",
	"package": "documon",
	"access": "private",
	"shortText": "This is essentially [pagedown-extra](https://github.com/jmcmanus/pagedown-extra), ported to run as a simple node module.\r",
	"shortHtml": "<p>This is essentially <a href=\"https://github.com/jmcmanus/pagedown-extra\">pagedown-extra</a>, ported to run as a simple node module.</p>",
	"text": "This is essentially [pagedown-extra](https://github.com/jmcmanus/pagedown-extra), ported to run as a simple node module.\r\nhttps://github.com/jmcmanus/pagedown-extra\r\n\r\n",
	"html": "<p>This is essentially <a href=\"https://github.com/jmcmanus/pagedown-extra\">pagedown-extra</a>, ported to run as a simple node module. <br>\n<a href=\"https://github.com/jmcmanus/pagedown-extra\">https://github.com/jmcmanus/pagedown-extra</a></p>",
	"file": "documon/src/markdown-extra.js",
	"filename": "markdown-extra.js",
	"klass": "markdown-extra",
	"docfile": "documon.markdown-extra.html",
	"id": "documon.markdown-extra",
	"methods": [
		{
			"line": 201,
			"name": "init",
			"entity": "method",
			"flagSearchText": " init\n\r A handle to a MarkdownConverter instance. Things you can do. An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.",
			"params": [
				{
					"name": "converter",
					"shortText": "A handle to a MarkdownConverter instance.",
					"shortHtml": "<p>A handle to a MarkdownConverter instance.</p>",
					"text": "A handle to a MarkdownConverter instance.",
					"html": "<p>A handle to a MarkdownConverter instance.</p>",
					"type": "Markdown.Converter"
				},
				{
					"name": "options",
					"shortText": "Things you can do.",
					"shortHtml": "<p>Things you can do.</p>",
					"text": "Things you can do.",
					"html": "<p>Things you can do.</p>",
					"type": "object",
					"children": [
						{
							"name": "extensions",
							"shortText": ": (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:",
							"shortHtml": "<p>: (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:</p>",
							"text": ": (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:\n\t - tables\r\n\t - fenced_code_gfm\r\n\t - def_list\r\n\t - attr_list\r\n\t - footnotes\r\n\t - smartypants\r\n\t - strikethrough\r\n\t - newlines\r",
							"html": "<p>: (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are: <br>\n     - tables <br>\n     - fenced_code_gfm <br>\n     - def_list <br>\n     - attr_list <br>\n     - footnotes <br>\n     - smartypants <br>\n     - strikethrough <br>\n     - newlines</p>",
							"type": "array",
							"optional": true,
							"defaultVal": "all"
						},
						{
							"name": "highlighter",
							"shortText": ": (string) The preferred syntax highlighter. Two options are available: prettify ([google prettify](https://github.com/google/code-prettify)) or \"highlight\" ([highlightJs](https://highlightjs.org/). You'll have to include the script of your choice into your pages manually!",
							"shortHtml": "<p>: (string) The preferred syntax highlighter. Two options are available: prettify (<a href=\"https://github.com/google/code-prettify\">google prettify</a>) or \"highlight\" (<a href=\"https://highlightjs.org/\">highlightJs</a>. You'll have to include the script of your choice into your pages manually!</p>",
							"text": ": (string) The preferred syntax highlighter. Two options are available: prettify ([google prettify](https://github.com/google/code-prettify)) or \"highlight\" ([highlightJs](https://highlightjs.org/). You'll have to include the script of your choice into your pages manually!",
							"html": "<p>: (string) The preferred syntax highlighter. Two options are available: prettify (<a href=\"https://github.com/google/code-prettify\">google prettify</a>) or \"highlight\" (<a href=\"https://highlightjs.org/\">highlightJs</a>. You'll have to include the script of your choice into your pages manually!</p>",
							"type": "array",
							"optional": true
						},
						{
							"name": "table_class",
							"shortText": ": (string) The CSS class to apply to tables.",
							"shortHtml": "<p>: (string) The CSS class to apply to tables.</p>",
							"text": ": (string) The CSS class to apply to tables.\n\r",
							"html": "<p>: (string) The CSS class to apply to tables.</p>",
							"type": "array",
							"optional": true
						}
					]
				}
			],
			"returns": {
				"type": "MarkdownExtra",
				"text": "An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.",
				"html": "<p>An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.</p>",
				"shortText": "<p>An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.</p>",
				"shortHtml": "<p>An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.</p>"
			},
			"shortText": "Hooks into the main Markdown Converter to do pre and post processing on the source markdown-to-HTML conversions.",
			"shortHtml": "<p>Hooks into the main Markdown Converter to do pre and post processing on the source markdown-to-HTML conversions.</p>",
			"text": "Hooks into the main Markdown Converter to do pre and post processing on the source markdown-to-HTML conversions.\r\n\r\n",
			"html": "<p>Hooks into the main Markdown Converter to do pre and post processing on the source markdown-to-HTML conversions.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.init"
		},
		{
			"line": 446,
			"name": "applyAttributeBlocks",
			"entity": "method",
			"flagSearchText": " applyAttributeBlocks description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "[applyAttributeBlocks description]",
			"shortHtml": "<p>[applyAttributeBlocks description]</p>",
			"text": "[applyAttributeBlocks description]\r\n\r\n",
			"html": "<p>[applyAttributeBlocks description]</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.applyAttributeBlocks"
		},
		{
			"line": 910,
			"name": "definitionLists",
			"entity": "method",
			"flagSearchText": " definitionLists description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Find and convert markdown extra definition lists into html.",
			"shortHtml": "<p>Find and convert markdown extra definition lists into html.</p>",
			"text": "Find and convert markdown extra definition lists into html.\r\n\r\n",
			"html": "<p>Find and convert markdown extra definition lists into html.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.definitionLists"
		},
		{
			"line": 643,
			"name": "doFootnotes",
			"entity": "method",
			"flagSearchText": " doFootnotes description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Find and convert footnotes references.",
			"shortHtml": "<p>Find and convert footnotes references.</p>",
			"text": "Find and convert footnotes references.\r\n\r\n",
			"html": "<p>Find and convert footnotes references.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.doFootnotes"
		},
		{
			"line": 301,
			"name": "doTransform",
			"entity": "method",
			"flagSearchText": " doTransform transformations text",
			"access": "private",
			"params": [
				{
					"name": "transformations",
					"shortText": "transformations",
					"shortHtml": "<p>transformations</p>",
					"text": "transformations",
					"html": "<p>transformations</p>",
					"type": "array"
				},
				{
					"name": "text",
					"shortText": "text",
					"shortHtml": "<p>text</p>",
					"text": "text",
					"html": "<p>text</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"shortText": "Do transformations",
			"shortHtml": "<p>Do transformations</p>",
			"text": "Do transformations\r\n\r\n",
			"html": "<p>Do transformations</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.doTransform"
		},
		{
			"line": 762,
			"name": "educatePants",
			"entity": "method",
			"flagSearchText": " educatePants description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "[educatePants description]",
			"shortHtml": "<p>[educatePants description]</p>",
			"text": "[educatePants description]\r\n\r\n",
			"html": "<p>[educatePants description]</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.educatePants"
		},
		{
			"line": 709,
			"name": "fencedCodeBlocks",
			"entity": "method",
			"flagSearchText": " fencedCodeBlocks description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Find and convert gfm-inspired fenced code blocks into html.",
			"shortHtml": "<p>Find and convert gfm-inspired fenced code blocks into html.</p>",
			"text": "Find and convert gfm-inspired fenced code blocks into html.\r\n\r\n",
			"html": "<p>Find and convert gfm-inspired fenced code blocks into html.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.fencedCodeBlocks"
		},
		{
			"line": 318,
			"name": "hashExtraBlock",
			"entity": "method",
			"flagSearchText": " hashExtraBlock block",
			"access": "private",
			"params": [
				{
					"name": "block",
					"shortText": "block",
					"shortHtml": "<p>block</p>",
					"text": "block",
					"html": "<p>block</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"shortText": "Return a placeholder containing a key, which is the block's index in the\r",
			"shortHtml": "<p>Return a placeholder containing a key, which is the block's index in the</p>",
			"text": "Return a placeholder containing a key, which is the block's index in the\r\nhashBlocks array. We wrap our output in a <p> tag here so Pagedown won't.\r\n\r\n",
			"html": "<p>Return a placeholder containing a key, which is the block's index in the <br>\nhashBlocks array. We wrap our output in a <p> tag here so Pagedown won't.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.hashExtraBlock"
		},
		{
			"line": 328,
			"name": "hashExtraInline",
			"entity": "method",
			"flagSearchText": " hashExtraInline block",
			"access": "private",
			"params": [
				{
					"name": "block",
					"shortText": "block",
					"shortHtml": "<p>block</p>",
					"text": "block",
					"html": "<p>block</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.hashExtraInline"
		},
		{
			"line": 424,
			"name": "hashFcbAttributeBlocks",
			"entity": "method",
			"flagSearchText": " hashFcbAttributeBlocks description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Extract FCB attribute blocks, move them above the element they will be applied to, and hash them for later.",
			"shortHtml": "<p>Extract FCB attribute blocks, move them above the element they will be applied to, and hash them for later.</p>",
			"text": "Extract FCB attribute blocks, move them above the element they will be applied to, and hash them for later.\r\n\r\n",
			"html": "<p>Extract FCB attribute blocks, move them above the element they will be applied to, and hash them for later.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.hashFcbAttributeBlocks"
		},
		{
			"line": 402,
			"name": "hashHeaderAttributeBlocks",
			"entity": "method",
			"flagSearchText": " hashHeaderAttributeBlocks description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Extract headers attribute blocks, move them above the element they will be applied to, and hash them for later.",
			"shortHtml": "<p>Extract headers attribute blocks, move them above the element they will be applied to, and hash them for later.</p>",
			"text": "Extract headers attribute blocks, move them above the element they will be applied to, and hash them for later.\r\n\r\n",
			"html": "<p>Extract headers attribute blocks, move them above the element they will be applied to, and hash them for later.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.hashHeaderAttributeBlocks"
		},
		{
			"line": 822,
			"name": "applyPants",
			"entity": "method",
			"flagSearchText": " applyPants description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "[applyPants description]",
			"shortHtml": "<p>[applyPants description]</p>",
			"text": "[applyPants description]\r\n\r\n",
			"html": "<p>[applyPants description]</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.applyPants"
		},
		{
			"line": 1073,
			"name": "newlines",
			"entity": "method",
			"flagSearchText": " newlines description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "[newlines description]",
			"shortHtml": "<p>[newlines description]</p>",
			"text": "[newlines description]\r\n\r\n",
			"html": "<p>[newlines description]</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.newlines"
		},
		{
			"line": 674,
			"name": "printFootnotes",
			"entity": "method",
			"flagSearchText": " printFootnotes description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Print footnotes at the end of the document",
			"shortHtml": "<p>Print footnotes at the end of the document</p>",
			"text": "Print footnotes at the end of the document\r\n\r\n",
			"html": "<p>Print footnotes at the end of the document</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.printFootnotes"
		},
		{
			"line": 968,
			"name": "processDefListItems",
			"entity": "method",
			"flagSearchText": " processDefListItems description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "listStr",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Process the contents of a single definition list, splitting it\r",
			"shortHtml": "<p>Process the contents of a single definition list, splitting it</p>",
			"text": "Process the contents of a single definition list, splitting it\r\ninto individual term and definition list items.\r\n\r\n",
			"html": "<p>Process the contents of a single definition list, splitting it <br>\ninto individual term and definition list items.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.processDefListItems"
		},
		{
			"line": 801,
			"name": "revertPants",
			"entity": "method",
			"flagSearchText": " revertPants description description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "wholeMatch",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description",
					"html": "<p>description</p>",
					"type": "type"
				},
				{
					"name": "m1",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "[revertPants description]",
			"shortHtml": "<p>[revertPants description]</p>",
			"text": "[revertPants description]\r\n\r\n",
			"html": "<p>[revertPants description]</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.revertPants"
		},
		{
			"line": 889,
			"name": "runSmartyPants",
			"entity": "method",
			"flagSearchText": " runSmartyPants description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Find and convert markdown extra definition lists into html.",
			"shortHtml": "<p>Find and convert markdown extra definition lists into html.</p>",
			"text": "Find and convert markdown extra definition lists into html.\r\n\r\n",
			"html": "<p>Find and convert markdown extra definition lists into html.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.runSmartyPants"
		},
		{
			"line": 1053,
			"name": "strikethrough",
			"entity": "method",
			"flagSearchText": " strikethrough description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "[strikethrough description]",
			"shortHtml": "<p>[strikethrough description]</p>",
			"text": "[strikethrough description]\r\n\r\n",
			"html": "<p>[strikethrough description]</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.strikethrough"
		},
		{
			"line": 617,
			"name": "stripFootnoteDefinitions",
			"entity": "method",
			"flagSearchText": " stripFootnoteDefinitions description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Strip footnote, store in hashes.",
			"shortHtml": "<p>Strip footnote, store in hashes.</p>",
			"text": "Strip footnote, store in hashes.\r\n\r\n",
			"html": "<p>Strip footnote, store in hashes.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.stripFootnoteDefinitions"
		},
		{
			"line": 493,
			"name": "tables",
			"entity": "method",
			"flagSearchText": " tables description\n\r description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n\r",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"shortText": "Find and convert Markdown Extra tables into html.",
			"shortHtml": "<p>Find and convert Markdown Extra tables into html.</p>",
			"text": "Find and convert Markdown Extra tables into html.\r\n\r\n",
			"html": "<p>Find and convert Markdown Extra tables into html.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.tables"
		},
		{
			"line": 342,
			"name": "unHashExtraBlocks",
			"entity": "method",
			"flagSearchText": " unHashExtraBlocks text",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "text",
					"shortHtml": "<p>text</p>",
					"text": "text",
					"html": "<p>text</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"shortText": "Replace placeholder blocks in `text` with their corresponding\r",
			"shortHtml": "<p>Replace placeholder blocks in <pre class=\"prettyprint\">text</pre> with their corresponding</p>",
			"text": "Replace placeholder blocks in `text` with their corresponding\r\nhtml blocks in the hashBlocks array.\r\n",
			"html": "<p>Replace placeholder blocks in <pre class=\"prettyprint\">text</pre> with their corresponding <br>\nhtml blocks in the hashBlocks array.</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.unHashExtraBlocks"
		},
		{
			"line": 368,
			"name": "wrapHeaders",
			"entity": "method",
			"flagSearchText": " wrapHeaders text",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "text",
					"shortHtml": "<p>text</p>",
					"text": "text",
					"html": "<p>text</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"shortText": "Wrap headers to make sure they won't be in def lists",
			"shortHtml": "<p>Wrap headers to make sure they won't be in def lists</p>",
			"text": "Wrap headers to make sure they won't be in def lists\r\n\r\n",
			"html": "<p>Wrap headers to make sure they won't be in def lists</p>",
			"file": "documon/src/markdown-extra.js",
			"filename": "markdown-extra.js",
			"klass": "markdown-extra",
			"package": "documon",
			"docfile": "documon.markdown-extra.html",
			"id": "documon.markdown-extra.wrapHeaders"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "0.0.1",
	"search": {
		"documon.markdown-extra": "markdown-extra : This essentially pagedown extra https github jmcmanus pagedown extra ported simple node module https github jmcmanus pagedown extramarkdown extra documon",
		"documon.markdown-extra.init": "init : Hooks into main Markdown Converter post processing source markdown HTML conversionsinit handle MarkdownConverter instance Things instance MarkdownExtra really needed anything other than testing development purposes",
		"documon.markdown-extra.doTransform": "doTransform : doTransform transformations text",
		"documon.markdown-extra.hashExtraBlock": "hashExtraBlock : Return placeholder containing which block index hashBlocks array wrap output here PagedownhashExtraBlock block",
		"documon.markdown-extra.hashExtraInline": "hashExtraInline : hashExtraInline block",
		"documon.markdown-extra.unHashExtraBlocks": "unHashExtraBlocks : Replace placeholder blocks text with their corresponding html blocks hashBlocks arrayunHashExtraBlocks text",
		"documon.markdown-extra.wrapHeaders": "wrapHeaders : Wrap headers make sure they listswrapHeaders text",
		"documon.markdown-extra.hashHeaderAttributeBlocks": "hashHeaderAttributeBlocks : Extract headers attribute blocks move them above element they will applied hash them laterhashHeaderAttributeBlocks description description",
		"documon.markdown-extra.hashFcbAttributeBlocks": "hashFcbAttributeBlocks : Extract attribute blocks move them above element they will applied hash them laterhashFcbAttributeBlocks description description",
		"documon.markdown-extra.applyAttributeBlocks": "applyAttributeBlocks : applyAttributeBlocks descriptionapplyAttributeBlocks description description",
		"documon.markdown-extra.tables": "tables : Find convert Markdown Extra tables into htmltables description description",
		"documon.markdown-extra.stripFootnoteDefinitions": "stripFootnoteDefinitions : Strip footnote store hashesstripFootnoteDefinitions description description",
		"documon.markdown-extra.doFootnotes": "doFootnotes : Find convert footnotes referencesdoFootnotes description description",
		"documon.markdown-extra.printFootnotes": "printFootnotes : Print footnotes documentprintFootnotes description description",
		"documon.markdown-extra.fencedCodeBlocks": "fencedCodeBlocks : Find convert inspired fenced code blocks into htmlfencedCodeBlocks description description",
		"documon.markdown-extra.educatePants": "educatePants : educatePants descriptioneducatePants description description",
		"documon.markdown-extra.revertPants": "revertPants : revertPants descriptionrevertPants description description description",
		"documon.markdown-extra.applyPants": "applyPants : applyPants descriptionapplyPants description description",
		"documon.markdown-extra.runSmartyPants": "runSmartyPants : Find convert markdown extra definition lists into htmlrunSmartyPants description description",
		"documon.markdown-extra.definitionLists": "definitionLists : Find convert markdown extra definition lists into htmldefinitionLists description description",
		"documon.markdown-extra.processDefListItems": "processDefListItems : Process contents single definition list splitting into individual term definition list itemsprocessDefListItems description description",
		"documon.markdown-extra.strikethrough": "strikethrough : strikethrough descriptionstrikethrough description description",
		"documon.markdown-extra.newlines": "newlines : newlines descriptionnewlines description description"
	}
}