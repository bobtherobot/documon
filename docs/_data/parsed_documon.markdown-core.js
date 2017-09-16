[
	{
		"text": "\r\nThis is essentially [Pagedown](http://code.google.com/p/pagedown/wiki/PageDown) with some slight modifications.\r\nhttp://code.google.com/p/pagedown/wiki/PageDown\r\n\r\nModifications:\r\n- Work with configurable pretty code processor, \r\n- Opened the configuration object so it can pull configs down into processing channels.\r\n- Fixed some character encoding issues.\r\n- Made MarkdownExtra's a little easier to get running.\r\n- Many subtle problem children were placed in straight-suits.\r\n\r\n",
		"start": 7,
		"end": 31,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-core.js",
		"flags": [
			{
				"source": "@class markdown-coremarkdown-core",
				"flag": "class",
				"after": "markdown-core",
				"afterType": "markdown-core",
				"name": "markdown-core",
				"single": true,
				"text": "markdown-core"
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
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\r\n\tvar markdownC = require(\"./markdown\").Converter;\r\n\tvar converter = new markdownC();\r\n\tvar markdownExtra = require(\"./markdown-extra\");\r\n\tmarkdownExtra.init(converter);\r\n\r\n\tvar myHtml = converter.makeHtml( decodeHtmlEntities(text), opts );\r\n\r"
			}
		],
		"source": "\r\nThis is essentially [Pagedown](http://code.google.com/p/pagedown/wiki/PageDown) with some slight modifications.\r\nhttp://code.google.com/p/pagedown/wiki/PageDown\r\n\r\nModifications:\r\n- Work with configurable pretty code processor, \r\n- Opened the configuration object so it can pull configs down into processing channels.\r\n- Fixed some character encoding issues.\r\n- Made MarkdownExtra's a little easier to get running.\r\n- Many subtle problem children were placed in straight-suits.\r\n\r\n@class markdown-core\r\n@package documon\r\n@private\r\n@example\r\n\r\n\tvar markdownC = require(\"./markdown\").Converter;\r\n\tvar converter = new markdownC();\r\n\tvar markdownExtra = require(\"./markdown-extra\");\r\n\tmarkdownExtra.init(converter);\r\n\r\n\tvar myHtml = converter.makeHtml( decodeHtmlEntities(text), opts );\r\n\r",
		"id": "documon.markdown-core"
	},
	{
		"text": "[HookCollection description]\r\n\r\n",
		"start": 115,
		"end": 121,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-core.js",
		"flags": [
			{
				"source": "@method  HookCollectionHookCollection",
				"flag": "method",
				"after": "HookCollection",
				"afterType": "HookCollection",
				"name": "HookCollection",
				"single": true,
				"text": "HookCollection"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@constructor",
				"flag": "constructor",
				"after": ""
			}
		],
		"source": "[HookCollection description]\r\n\r\n@method  HookCollection\r\n@private\r\n@constructor\r",
		"id": "documon.markdown-core.HookCollection"
	},
	{
		"text": "\n// g_urls and g_titles allow arbitrary user-entered strings as keys. This\r\n// caused an exception (and hence stopped the rendering) when the user entered\r\n// e.g. [push] or [__proto__]. Adding a prefix to the actual key prevents this\r\n// (since no builtin property starts with \"s_\"). See\r\n// http://meta.stackoverflow.com/questions/64655/strange-wmd-bug\r\n// (granted, switching from Array() to Object() alone would have left only __proto__\r\n// to be a problem)\r\n\r\n",
		"start": 156,
		"end": 167,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-core.js",
		"flags": [
			{
				"source": "@method  SaveHash",
				"flag": "method",
				"after": "SaveHash",
				"afterType": "SaveHash",
				"name": "SaveHash",
				"single": true,
				"text": "SaveHash"
			}
		],
		"source": "\n// g_urls and g_titles allow arbitrary user-entered strings as keys. This\r\n// caused an exception (and hence stopped the rendering) when the user entered\r\n// e.g. [push] or [__proto__]. Adding a prefix to the actual key prevents this\r\n// (since no builtin property starts with \"s_\"). See\r\n// http://meta.stackoverflow.com/questions/64655/strange-wmd-bug\r\n// (granted, switching from Array() to Object() alone would have left only __proto__\r\n// to be a problem)\r\n\r\n@method  SaveHash\r",
		"id": "documon.markdown-core.SaveHash"
	},
	{
		"text": "Creates a usable converter.\r\n\r\n",
		"start": 179,
		"end": 189,
		"file": "/Volumes/Drives/projects/documon/documon/src/markdown-core.js",
		"flags": [
			{
				"source": "@method  ConverterConverter",
				"flag": "method",
				"after": "Converter",
				"afterType": "Converter",
				"name": "Converter",
				"single": true,
				"text": "Converter"
			},
			{
				"source": "@constructor",
				"flag": "constructor",
				"after": ""
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\r\n\t\tvar markdown = require(\"markdown\");\r\n\t\tvar converter = new markdown.Converter();\r\n\t\t\r"
			}
		],
		"source": "Creates a usable converter.\r\n\r\n@method  Converter\r\n@constructor\r\n@example\r\n\r\n\t\tvar markdown = require(\"markdown\");\r\n\t\tvar converter = new markdown.Converter();\r\n\t\t\r",
		"id": "documon.markdown-core.Converter"
	}
]