{
	"line": 32,
	"name": "log",
	"shortText": "Writes to the console. Will accept an object or array as well as string, boolena and other and prepare them for proper presentation to the console.",
	"shortHtml": "<p>Writes to the console. Will accept an object or array as well as string, boolena and other and prepare them for proper presentation to the console.</p>",
	"text": "Writes to the console. Will accept an object or array as well as string, boolena and other and prepare them for proper presentation to the console.\n\n",
	"html": "<p>Writes to the console. Will accept an object or array as well as string, boolena and other and prepare them for proper presentation to the console.</p>",
	"entity": "module",
	"flagSearchText": " log documon\n A string, array or object to output A title for the message Disables logging (prevents console output.\n \n\n\tvar log = require(\"log\");\n\tlog([\"foo\", \"bar\"], \"Some Title\", false);\n\nprints:\n\n\t\t--------------------\n\t\tSome Title\n\t\t--------------------\n\t\t[\n\t\t\t'foo',\n\t\t\t'bar'\n\t\t]\n\t\t",
	"package": "documon",
	"params": [
		{
			"name": "data",
			"shortText": "A string, array or object to output",
			"shortHtml": "<p>A string, array or object to output</p>",
			"text": "A string, array or object to output",
			"html": "<p>A string, array or object to output</p>",
			"type": "any"
		},
		{
			"name": "title",
			"shortText": "A title for the message",
			"shortHtml": "<p>A title for the message</p>",
			"text": "A title for the message",
			"html": "<p>A title for the message</p>",
			"type": "string"
		},
		{
			"name": "quiet",
			"shortText": "Disables logging (prevents console output.",
			"shortHtml": "<p>Disables logging (prevents console output.</p>",
			"text": "Disables logging (prevents console output.\n",
			"html": "<p>Disables logging (prevents console output.</p>",
			"type": "type"
		}
	],
	"example": [
		{
			"text": "\n\n\tvar log = require(\"log\");\n\tlog([\"foo\", \"bar\"], \"Some Title\", false);\n\nprints:\n\n\t\t--------------------\n\t\tSome Title\n\t\t--------------------\n\t\t[\n\t\t\t'foo',\n\t\t\t'bar'\n\t\t]\n\t\t",
			"html": "<pre class=\"prettyprint\">var log = require(\"log\");\nlog([\"foo\", \"bar\"], \"Some Title\", false);</pre>\n\n<p>prints:</p>\n\n<pre class=\"prettyprint\">    --------------------\n    Some Title\n    --------------------\n    [\n        'foo',\n        'bar'\n    ]</pre>"
		}
	],
	"file": "documon/src/log.js",
	"filename": "log.js",
	"klass": "log",
	"docfile": "documon.log.html",
	"id": "documon.log",
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "0.0.1",
	"search": {
		"documon.log": "log : Writes console Will accept object array well string boolena other prepare them proper presentation consoledocumon string array object output title message Disables logging prevents console output require Some Title false prints Some Title"
	}
}