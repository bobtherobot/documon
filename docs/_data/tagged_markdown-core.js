{
	"line": 32,
	"name": "markdown-core",
	"shortText": "This is essentially [Pagedown](http://code.google.com/p/pagedown/wiki/PageDown) with some slight modifications.\r",
	"shortHtml": "<p>This is essentially <a href=\"http://code.google.com/p/pagedown/wiki/PageDown\">Pagedown</a> with some slight modifications.</p>",
	"text": "\r\nThis is essentially [Pagedown](http://code.google.com/p/pagedown/wiki/PageDown) with some slight modifications.\r\nhttp://code.google.com/p/pagedown/wiki/PageDown\r\n\r\nModifications:\r\n- Work with configurable pretty code processor, \r\n- Opened the configuration object so it can pull configs down into processing channels.\r\n- Fixed some character encoding issues.\r\n- Made MarkdownExtra's a little easier to get running.\r\n- Many subtle problem children were placed in straight-suits.\r\n\r\n",
	"html": "<p>This is essentially <a href=\"http://code.google.com/p/pagedown/wiki/PageDown\">Pagedown</a> with some slight modifications. <br>\n<a href=\"http://code.google.com/p/pagedown/wiki/PageDown\">http://code.google.com/p/pagedown/wiki/PageDown</a></p>\n\n<p>Modifications: <br>\n- Work with configurable pretty code processor,  <br>\n- Opened the configuration object so it can pull configs down into processing channels. <br>\n- Fixed some character encoding issues. <br>\n- Made MarkdownExtra's a little easier to get running. <br>\n- Many subtle problem children were placed in straight-suits.</p>",
	"entity": "class",
	"flagSearchText": " markdown-core documon \n\r\n\tvar markdownC = require(\"./markdown\").Converter;\r\n\tvar converter = new markdownC();\r\n\tvar markdownExtra = require(\"./markdown-extra\");\r\n\tmarkdownExtra.init(converter);\r\n\r\n\tvar myHtml = converter.makeHtml( decodeHtmlEntities(text), opts );\r\n\r",
	"package": "documon",
	"access": "private",
	"example": [
		{
			"text": "\n\r\n\tvar markdownC = require(\"./markdown\").Converter;\r\n\tvar converter = new markdownC();\r\n\tvar markdownExtra = require(\"./markdown-extra\");\r\n\tmarkdownExtra.init(converter);\r\n\r\n\tvar myHtml = converter.makeHtml( decodeHtmlEntities(text), opts );\r\n\r",
			"html": "<pre class=\"prettyprint\">var markdownC = require(\"./markdown\").Converter;\nvar converter = new markdownC();\nvar markdownExtra = require(\"./markdown-extra\");\nmarkdownExtra.init(converter);\n\nvar myHtml = converter.makeHtml( decodeHtmlEntities(text), opts );</pre>"
		}
	],
	"file": "documon/src/markdown-core.js",
	"filename": "markdown-core.js",
	"klass": "markdown-core",
	"docfile": "documon.markdown-core.html",
	"id": "documon.markdown-core",
	"methods": [
		{
			"line": 190,
			"name": "Converter",
			"shortText": "Creates a usable converter.",
			"shortHtml": "<p>Creates a usable converter.</p>",
			"text": "Creates a usable converter.\r\n\r\n",
			"html": "<p>Creates a usable converter.</p>",
			"entity": "method",
			"flagSearchText": " Converter \n\r\n\t\tvar markdown = require(\"markdown\");\r\n\t\tvar converter = new markdown.Converter();\r\n\t\t\r",
			"konstructor": true,
			"example": [
				{
					"text": "\n\r\n\t\tvar markdown = require(\"markdown\");\r\n\t\tvar converter = new markdown.Converter();\r\n\t\t\r",
					"html": "<pre class=\"prettyprint\">    var markdown = require(\"markdown\");\n    var converter = new markdown.Converter();</pre>"
				}
			],
			"file": "documon/src/markdown-core.js",
			"filename": "markdown-core.js",
			"klass": "markdown-core",
			"package": "documon",
			"docfile": "documon.markdown-core.html",
			"id": "documon.markdown-core.Converter"
		},
		{
			"line": 122,
			"name": "HookCollection",
			"shortText": "[HookCollection description]",
			"shortHtml": "<p>[HookCollection description]</p>",
			"text": "[HookCollection description]\r\n\r\n",
			"html": "<p>[HookCollection description]</p>",
			"entity": "method",
			"flagSearchText": " HookCollection",
			"access": "private",
			"konstructor": true,
			"file": "documon/src/markdown-core.js",
			"filename": "markdown-core.js",
			"klass": "markdown-core",
			"package": "documon",
			"docfile": "documon.markdown-core.html",
			"id": "documon.markdown-core.HookCollection"
		},
		{
			"line": 168,
			"name": "SaveHash",
			"shortText": "// g_urls and g_titles allow arbitrary user-entered strings as keys. This\r",
			"shortHtml": "<p>// g_urls and g_titles allow arbitrary user-entered strings as keys. This</p>",
			"text": "\n// g_urls and g_titles allow arbitrary user-entered strings as keys. This\r\n// caused an exception (and hence stopped the rendering) when the user entered\r\n// e.g. [push] or [__proto__]. Adding a prefix to the actual key prevents this\r\n// (since no builtin property starts with \"s_\"). See\r\n// http://meta.stackoverflow.com/questions/64655/strange-wmd-bug\r\n// (granted, switching from Array() to Object() alone would have left only __proto__\r\n// to be a problem)\r\n\r\n",
			"html": "<p>// g_urls and g_titles allow arbitrary user-entered strings as keys. This <br>\n// caused an exception (and hence stopped the rendering) when the user entered <br>\n// e.g. [push] or [<strong>proto</strong>]. Adding a prefix to the actual key prevents this <br>\n// (since no builtin property starts with \"s_\"). See <br>\n// <a href=\"http://meta.stackoverflow.com/questions/64655/strange-wmd-bug\">http://meta.stackoverflow.com/questions/64655/strange-wmd-bug</a> <br>\n// (granted, switching from Array() to Object() alone would have left only <strong>proto</strong> <br>\n// to be a problem)</p>",
			"entity": "method",
			"flagSearchText": " SaveHash",
			"file": "documon/src/markdown-core.js",
			"filename": "markdown-core.js",
			"klass": "markdown-core",
			"package": "documon",
			"docfile": "documon.markdown-core.html",
			"id": "documon.markdown-core.SaveHash"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "0.0.1",
	"search": {
		"documon.markdown-core": "markdown-core : This essentially Pagedown http code google pagedown wiki PageDown with some slight modifications http code google pagedown wiki PageDown Modifications Work with configurable pretty code processor Opened configuration object pull configs down into processing channels Fixed some character encoding issues Made MarkdownExtra little easier running Many subtle problem children were placed straight suitsmarkdown core documon markdownC require markdown Converter converter markdownC markdownExtra require markdown extra markdownExtra init converter myHtml converter makeHtml decodeHtmlEntities text opts",
		"documon.markdown-core.HookCollection": "HookCollection : HookCollection description",
		"documon.markdown-core.SaveHash": "SaveHash : urls titles allow arbitrary user entered strings keys This caused exception hence stopped rendering when user entered push proto Adding prefix actual prevents this since builtin property starts with http meta stackoverflow questions 64655 strange granted switching from Array Object alone would have left only proto problem",
		"documon.markdown-core.Converter": "Converter : Creates usable converterConverter markdown require markdown converter markdown Converter"
	}
}