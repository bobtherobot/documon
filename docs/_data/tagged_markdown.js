{
	"line": 19,
	"name": "markdown",
	"shortText": "Converts markdown to HTML, with the \"definition list\" extension from markdown-extra",
	"shortHtml": "<p>Converts markdown to HTML, with the \"definition list\" extension from markdown-extra</p>",
	"text": "Converts markdown to HTML, with the \"definition list\" extension from markdown-extra\nwired in.\n\nUsed for comment descriptions and for the markdown files in the \"more\" folder.\n\n",
	"html": "<p>Converts markdown to HTML, with the \"definition list\" extension from markdown-extra<br />\nwired in.</p>\n<p>Used for comment descriptions and for the markdown files in the \"more\" folder.</p>",
	"entity": "module",
	"flagSearchText": " markdown documon \n\n\t\tvar markdown = require(\"./markdown\");\n\t\tvar html = markdown(\"Some **bold** text.\");",
	"package": "documon",
	"example": [
		{
			"text": "\n\n\t\tvar markdown = require(\"./markdown\");\n\t\tvar html = markdown(\"Some **bold** text.\");",
			"html": "<pre><code>    var markdown = require(\"./markdown\");\n    var html = markdown(\"Some **bold** text.\");</code></pre>"
		}
	],
	"file": "src/markdown.js",
	"filename": "markdown.js",
	"klass": "markdown",
	"docfile": "documon.markdown.html",
	"id": "documon.markdown",
	"methods": [
		{
			"line": 59,
			"name": "definitionLists",
			"shortText": "Find and convert markdown extra definition lists into html.",
			"shortHtml": "<p>Find and convert markdown extra definition lists into html.</p>",
			"text": "Find and convert markdown extra definition lists into html.\n\n",
			"html": "<p>Find and convert markdown extra definition lists into html.</p>",
			"entity": "method",
			"flagSearchText": " definitionLists description\n description",
			"access": "private",
			"params": [
				{
					"name": "text",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n",
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
			"file": "src/markdown.js",
			"filename": "markdown.js",
			"klass": "markdown",
			"package": "documon",
			"docfile": "documon.markdown.html",
			"id": "documon.markdown.definitionLists"
		},
		{
			"line": 127,
			"name": "processDefListItems",
			"shortText": "Process the contents of a single definition list, splitting it",
			"shortHtml": "<p>Process the contents of a single definition list, splitting it</p>",
			"text": "Process the contents of a single definition list, splitting it\ninto individual term and definition list items.\n\n",
			"html": "<p>Process the contents of a single definition list, splitting it<br />\ninto individual term and definition list items.</p>",
			"entity": "method",
			"flagSearchText": " processDefListItems description\n description",
			"access": "private",
			"params": [
				{
					"name": "listStr",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n",
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
			"file": "src/markdown.js",
			"filename": "markdown.js",
			"klass": "markdown",
			"package": "documon",
			"docfile": "documon.markdown.html",
			"id": "documon.markdown.processDefListItems"
		},
		{
			"line": 32,
			"name": "run",
			"shortText": "Converts a markdown string to HTML.",
			"shortHtml": "<p>Converts a markdown string to HTML.</p>",
			"text": "Converts a markdown string to HTML.\n\n",
			"html": "<p>Converts a markdown string to HTML.</p>",
			"entity": "method",
			"flagSearchText": " run The markdown source. The rendered HTML.",
			"params": [
				{
					"name": "str",
					"shortText": "The markdown source.",
					"shortHtml": "<p>The markdown source.</p>",
					"text": "The markdown source.",
					"html": "<p>The markdown source.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "The rendered HTML.",
				"html": "<p>The rendered HTML.</p>",
				"shortText": "<p>The rendered HTML.</p>",
				"shortHtml": "<p>The rendered HTML.</p>"
			},
			"file": "src/markdown.js",
			"filename": "markdown.js",
			"klass": "markdown",
			"package": "documon",
			"docfile": "documon.markdown.html",
			"id": "documon.markdown.run"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.7.0",
	"search": {
		"documon.markdown": "markdown : Converts markdown HTML with definition list extension from markdown extra wired Used comment descriptions markdown files more foldermarkdown documon markdown require markdown html markdown Some bold text",
		"documon.markdown.run": "run : Converts markdown string HTMLmarkdown source rendered HTML",
		"documon.markdown.definitionLists": "definitionLists : Find convert markdown extra definition lists into htmldefinitionLists description description",
		"documon.markdown.processDefListItems": "processDefListItems : Process contents single definition list splitting into individual term definition list itemsprocessDefListItems description description"
	}
}