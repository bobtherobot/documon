[
	{
		"text": "Emits machine-readable companions alongside the generated HTML:\n\n- `llms.txt`      -- the [llms.txt convention](https://llmstxt.org): a short, linkable\n                     index of the documentation, meant to be read by a language model\n                     rather than rendered in a browser.\n- `llms-full.txt` -- every page's prose concatenated into one plain-text file, so a\n                     model can ingest the whole manual in a single fetch.\n- `model.json`    -- the structured documentation model (packages, classes, members,\n                     params, types), so other tools can consume Documon output as data\n                     instead of scraping HTML.\n\nAll three are written to the output folder. Disable with `emitLlms:false` /\n`emitModel:false`.\n\n",
		"start": 6,
		"end": 23,
		"file": "/Volumes/Drives/projects/documon/documon/src/llms.js",
		"flags": [
			{
				"source": "@module  llmsllms",
				"flag": "module",
				"after": "llms",
				"afterType": "llms",
				"name": "llms",
				"single": true,
				"text": "llms"
			},
			{
				"source": "@package documon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
			}
		],
		"source": "Emits machine-readable companions alongside the generated HTML:\n\n- `llms.txt`      -- the [llms.txt convention](https://llmstxt.org): a short, linkable\n                     index of the documentation, meant to be read by a language model\n                     rather than rendered in a browser.\n- `llms-full.txt` -- every page's prose concatenated into one plain-text file, so a\n                     model can ingest the whole manual in a single fetch.\n- `model.json`    -- the structured documentation model (packages, classes, members,\n                     params, types), so other tools can consume Documon output as data\n                     instead of scraping HTML.\n\nAll three are written to the output folder. Disable with `emitLlms:false` /\n`emitModel:false`.\n\n@module  llms\n@package documon",
		"id": "documon.llms"
	},
	{
		"text": "Strips HTML tags and collapses whitespace, leaving readable plain text.\n\n",
		"start": 27,
		"end": 34,
		"file": "/Volumes/Drives/projects/documon/documon/src/llms.js",
		"flags": [
			{
				"source": "@method     deHtmldeHtml",
				"flag": "method",
				"after": "deHtml",
				"afterType": "deHtml",
				"name": "deHtml",
				"single": true,
				"text": "deHtml"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}  html - Source HTML.Source HTML.",
				"flag": "param",
				"after": "{string}  html - Source HTML.",
				"type": "string",
				"afterType": "html - Source HTML.",
				"name": "html",
				"text": "Source HTML."
			},
			{
				"source": "@return     {string}       - Plain text.",
				"flag": "return",
				"after": "{string}       - Plain text.",
				"type": "string",
				"afterType": "Plain text.",
				"text": "Plain text."
			}
		],
		"source": "Strips HTML tags and collapses whitespace, leaving readable plain text.\n\n@method     deHtml\n@private\n@param      {string}  html - Source HTML.\n@return     {string}       - Plain text.",
		"id": "documon.llms.deHtml"
	},
	{
		"text": "Joins a base URL and a page filename.\n\n",
		"start": 58,
		"end": 66,
		"file": "/Volumes/Drives/projects/documon/documon/src/llms.js",
		"flags": [
			{
				"source": "@method     joinUrljoinUrl",
				"flag": "method",
				"after": "joinUrl",
				"afterType": "joinUrl",
				"name": "joinUrl",
				"single": true,
				"text": "joinUrl"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}  base - Base URL, may be empty.Base URL, may be empty.",
				"flag": "param",
				"after": "{string}  base - Base URL, may be empty.",
				"type": "string",
				"afterType": "base - Base URL, may be empty.",
				"name": "base",
				"text": "Base URL, may be empty."
			},
			{
				"source": "@param      {string}  file - Page filename.Page filename.",
				"flag": "param",
				"after": "{string}  file - Page filename.",
				"type": "string",
				"afterType": "file - Page filename.",
				"name": "file",
				"text": "Page filename."
			},
			{
				"source": "@return     {string}       - A URL or bare filename.",
				"flag": "return",
				"after": "{string}       - A URL or bare filename.",
				"type": "string",
				"afterType": "A URL or bare filename.",
				"text": "A URL or bare filename."
			}
		],
		"source": "Joins a base URL and a page filename.\n\n@method     joinUrl\n@private\n@param      {string}  base - Base URL, may be empty.\n@param      {string}  file - Page filename.\n@return     {string}       - A URL or bare filename.",
		"id": "documon.llms.joinUrl"
	},
	{
		"text": "Reduces a built page into the flat record used by `model.json`.\n\n",
		"start": 76,
		"end": 83,
		"file": "/Volumes/Drives/projects/documon/documon/src/llms.js",
		"flags": [
			{
				"source": "@method     modelPagemodelPage",
				"flag": "method",
				"after": "modelPage",
				"afterType": "modelPage",
				"name": "modelPage",
				"single": true,
				"text": "modelPage"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {object}  page - A page produced by `organizer.buildPages()`.A page produced by `organizer.buildPages()`.",
				"flag": "param",
				"after": "{object}  page - A page produced by `organizer.buildPages()`.",
				"type": "object",
				"afterType": "page - A page produced by `organizer.buildPages()`.",
				"name": "page",
				"text": "A page produced by `organizer.buildPages()`."
			},
			{
				"source": "@return     {object}       - A serializable record.",
				"flag": "return",
				"after": "{object}       - A serializable record.",
				"type": "object",
				"afterType": "A serializable record.",
				"text": "A serializable record."
			}
		],
		"source": "Reduces a built page into the flat record used by `model.json`.\n\n@method     modelPage\n@private\n@param      {object}  page - A page produced by `organizer.buildPages()`.\n@return     {object}       - A serializable record.",
		"id": "documon.llms.modelPage"
	},
	{
		"text": "Flattens the menu tree into a list of linkable pages.\n\n",
		"start": 144,
		"end": 152,
		"file": "/Volumes/Drives/projects/documon/documon/src/llms.js",
		"flags": [
			{
				"source": "@method     flattenMenuflattenMenu",
				"flag": "method",
				"after": "flattenMenu",
				"afterType": "flattenMenu",
				"name": "flattenMenu",
				"single": true,
				"text": "flattenMenu"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {array}  nodes - Menu nodes.Menu nodes.",
				"flag": "param",
				"after": "{array}  nodes - Menu nodes.",
				"type": "array",
				"afterType": "nodes - Menu nodes.",
				"name": "nodes",
				"text": "Menu nodes."
			},
			{
				"source": "@param      {array}  out   - Accumulator.Accumulator.",
				"flag": "param",
				"after": "{array}  out   - Accumulator.",
				"type": "array",
				"afterType": "out   - Accumulator.",
				"name": "out",
				"text": "Accumulator."
			},
			{
				"source": "@return     {array}        - Flat page records.",
				"flag": "return",
				"after": "{array}        - Flat page records.",
				"type": "array",
				"afterType": "Flat page records.",
				"text": "Flat page records."
			}
		],
		"source": "Flattens the menu tree into a list of linkable pages.\n\n@method     flattenMenu\n@private\n@param      {array}  nodes - Menu nodes.\n@param      {array}  out   - Accumulator.\n@return     {array}        - Flat page records.",
		"id": "documon.llms.flattenMenu"
	},
	{
		"text": "Collects the markdown of the \"more\" folder, in menu order, for `llms-full.txt`.\n\nThe prose pages are usually the part a reader most needs -- guides, concepts, tag\nreferences -- and they are already plain text, so they go in verbatim.\n\n",
		"start": 179,
		"end": 189,
		"file": "/Volumes/Drives/projects/documon/documon/src/llms.js",
		"flags": [
			{
				"source": "@method     readMorereadMore",
				"flag": "method",
				"after": "readMore",
				"afterType": "readMore",
				"name": "readMore",
				"single": true,
				"text": "readMore"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {string}  folder - The \"more\" folder.The \"more\" folder.",
				"flag": "param",
				"after": "{string}  folder - The \"more\" folder.",
				"type": "string",
				"afterType": "folder - The \"more\" folder.",
				"name": "folder",
				"text": "The \"more\" folder."
			},
			{
				"source": "@return     {array}          - `{ name, body }` records, in filename order.",
				"flag": "return",
				"after": "{array}          - `{ name, body }` records, in filename order.",
				"type": "array",
				"afterType": "`{ name, body }` records, in filename order.",
				"text": "`{ name, body }` records, in filename order."
			}
		],
		"source": "Collects the markdown of the \"more\" folder, in menu order, for `llms-full.txt`.\n\nThe prose pages are usually the part a reader most needs -- guides, concepts, tag\nreferences -- and they are already plain text, so they go in verbatim.\n\n@method     readMore\n@private\n@param      {string}  folder - The \"more\" folder.\n@return     {array}          - `{ name, body }` records, in filename order.",
		"id": "documon.llms.readMore"
	},
	{
		"text": "Writes `llms.txt`, `llms-full.txt` and `model.json`.\n\n",
		"start": 243,
		"end": 252,
		"file": "/Volumes/Drives/projects/documon/documon/src/llms.js",
		"flags": [
			{
				"source": "@method  writewrite",
				"flag": "method",
				"after": "write",
				"afterType": "write",
				"name": "write",
				"single": true,
				"text": "write"
			},
			{
				"source": "@param   {object}  conf   - The resolved `mainConf`.The resolved `mainConf`.",
				"flag": "param",
				"after": "{object}  conf   - The resolved `mainConf`.",
				"type": "object",
				"afterType": "conf   - The resolved `mainConf`.",
				"name": "conf",
				"text": "The resolved `mainConf`."
			},
			{
				"source": "@param   {array}   pages  - Pages from `organizer.buildPages()`.Pages from `organizer.buildPages()`.",
				"flag": "param",
				"after": "{array}   pages  - Pages from `organizer.buildPages()`.",
				"type": "array",
				"afterType": "pages  - Pages from `organizer.buildPages()`.",
				"name": "pages",
				"text": "Pages from `organizer.buildPages()`."
			},
			{
				"source": "@param   {object}  log    - The logger.The logger.",
				"flag": "param",
				"after": "{object}  log    - The logger.",
				"type": "object",
				"afterType": "log    - The logger.",
				"name": "log",
				"text": "The logger."
			},
			{
				"source": "@param   {array}   [menu] - The final menu, so hand-written \"more\" pages are indexed too.The final menu, so hand-written \"more\" pages are indexed too.",
				"flag": "param",
				"after": "{array}   [menu] - The final menu, so hand-written \"more\" pages are indexed too.",
				"type": "array",
				"afterType": "[menu] - The final menu, so hand-written \"more\" pages are indexed too.",
				"optional": true,
				"name": "menu",
				"text": "The final menu, so hand-written \"more\" pages are indexed too."
			},
			{
				"source": "@return  {object}         - `{ llms, llmsFull, model }` -- paths written, or nulls.",
				"flag": "return",
				"after": "{object}         - `{ llms, llmsFull, model }` -- paths written, or nulls.",
				"type": "object",
				"afterType": "`{ llms, llmsFull, model }` -- paths written, or nulls.",
				"text": "`{ llms, llmsFull, model }` -- paths written, or nulls."
			}
		],
		"source": "Writes `llms.txt`, `llms-full.txt` and `model.json`.\n\n@method  write\n@param   {object}  conf   - The resolved `mainConf`.\n@param   {array}   pages  - Pages from `organizer.buildPages()`.\n@param   {object}  log    - The logger.\n@param   {array}   [menu] - The final menu, so hand-written \"more\" pages are indexed too.\n@return  {object}         - `{ llms, llmsFull, model }` -- paths written, or nulls.",
		"id": "documon.llms.write"
	}
]