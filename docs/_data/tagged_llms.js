{
	"line": 24,
	"name": "llms",
	"shortText": "Emits machine-readable companions alongside the generated HTML:",
	"shortHtml": "<p>Emits machine-readable companions alongside the generated HTML:</p>",
	"text": "Emits machine-readable companions alongside the generated HTML:\n\n- `llms.txt`      -- the [llms.txt convention](https://llmstxt.org): a short, linkable\n                     index of the documentation, meant to be read by a language model\n                     rather than rendered in a browser.\n- `llms-full.txt` -- every page's prose concatenated into one plain-text file, so a\n                     model can ingest the whole manual in a single fetch.\n- `model.json`    -- the structured documentation model (packages, classes, members,\n                     params, types), so other tools can consume Documon output as data\n                     instead of scraping HTML.\n\nAll three are written to the output folder. Disable with `emitLlms:false` /\n`emitModel:false`.\n\n",
	"html": "<p>Emits machine-readable companions alongside the generated HTML:</p>\n<ul>\n<li><code>llms.txt</code>      -- the <a href=\"https://llmstxt.org\">llms.txt convention</a>: a short, linkable<br />\n                 index of the documentation, meant to be read by a language model<br />\n                 rather than rendered in a browser.</li>\n<li><code>llms-full.txt</code> -- every page's prose concatenated into one plain-text file, so a<br />\n                 model can ingest the whole manual in a single fetch.</li>\n<li><code>model.json</code>    -- the structured documentation model (packages, classes, members,<br />\n                 params, types), so other tools can consume Documon output as data<br />\n                 instead of scraping HTML.</li>\n</ul>\n<p>All three are written to the output folder. Disable with <code>emitLlms:false</code> /<br />\n<code>emitModel:false</code>.</p>",
	"entity": "module",
	"flagSearchText": " llms documon",
	"package": "documon",
	"file": "src/llms.js",
	"filename": "llms.js",
	"klass": "llms",
	"docfile": "documon.llms.html",
	"id": "documon.llms",
	"methods": [
		{
			"line": 35,
			"name": "deHtml",
			"shortText": "Strips HTML tags and collapses whitespace, leaving readable plain text.",
			"shortHtml": "<p>Strips HTML tags and collapses whitespace, leaving readable plain text.</p>",
			"text": "Strips HTML tags and collapses whitespace, leaving readable plain text.\n\n",
			"html": "<p>Strips HTML tags and collapses whitespace, leaving readable plain text.</p>",
			"entity": "method",
			"flagSearchText": " deHtml Source HTML. Plain text.",
			"access": "private",
			"params": [
				{
					"name": "html",
					"shortText": "Source HTML.",
					"shortHtml": "<p>Source HTML.</p>",
					"text": "Source HTML.",
					"html": "<p>Source HTML.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "Plain text.",
				"html": "<p>Plain text.</p>",
				"shortText": "<p>Plain text.</p>",
				"shortHtml": "<p>Plain text.</p>"
			},
			"file": "src/llms.js",
			"filename": "llms.js",
			"klass": "llms",
			"package": "documon",
			"docfile": "documon.llms.html",
			"id": "documon.llms.deHtml"
		},
		{
			"line": 153,
			"name": "flattenMenu",
			"shortText": "Flattens the menu tree into a list of linkable pages.",
			"shortHtml": "<p>Flattens the menu tree into a list of linkable pages.</p>",
			"text": "Flattens the menu tree into a list of linkable pages.\n\n",
			"html": "<p>Flattens the menu tree into a list of linkable pages.</p>",
			"entity": "method",
			"flagSearchText": " flattenMenu Menu nodes. Accumulator. Flat page records.",
			"access": "private",
			"params": [
				{
					"name": "nodes",
					"shortText": "Menu nodes.",
					"shortHtml": "<p>Menu nodes.</p>",
					"text": "Menu nodes.",
					"html": "<p>Menu nodes.</p>",
					"type": "array"
				},
				{
					"name": "out",
					"shortText": "Accumulator.",
					"shortHtml": "<p>Accumulator.</p>",
					"text": "Accumulator.",
					"html": "<p>Accumulator.</p>",
					"type": "array"
				}
			],
			"returns": {
				"type": "array",
				"text": "Flat page records.",
				"html": "<p>Flat page records.</p>",
				"shortText": "<p>Flat page records.</p>",
				"shortHtml": "<p>Flat page records.</p>"
			},
			"file": "src/llms.js",
			"filename": "llms.js",
			"klass": "llms",
			"package": "documon",
			"docfile": "documon.llms.html",
			"id": "documon.llms.flattenMenu"
		},
		{
			"line": 67,
			"name": "joinUrl",
			"shortText": "Joins a base URL and a page filename.",
			"shortHtml": "<p>Joins a base URL and a page filename.</p>",
			"text": "Joins a base URL and a page filename.\n\n",
			"html": "<p>Joins a base URL and a page filename.</p>",
			"entity": "method",
			"flagSearchText": " joinUrl Base URL, may be empty. Page filename. A URL or bare filename.",
			"access": "private",
			"params": [
				{
					"name": "base",
					"shortText": "Base URL, may be empty.",
					"shortHtml": "<p>Base URL, may be empty.</p>",
					"text": "Base URL, may be empty.",
					"html": "<p>Base URL, may be empty.</p>",
					"type": "string"
				},
				{
					"name": "file",
					"shortText": "Page filename.",
					"shortHtml": "<p>Page filename.</p>",
					"text": "Page filename.",
					"html": "<p>Page filename.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "A URL or bare filename.",
				"html": "<p>A URL or bare filename.</p>",
				"shortText": "<p>A URL or bare filename.</p>",
				"shortHtml": "<p>A URL or bare filename.</p>"
			},
			"file": "src/llms.js",
			"filename": "llms.js",
			"klass": "llms",
			"package": "documon",
			"docfile": "documon.llms.html",
			"id": "documon.llms.joinUrl"
		},
		{
			"line": 84,
			"name": "modelPage",
			"shortText": "Reduces a built page into the flat record used by `model.json`.",
			"shortHtml": "<p>Reduces a built page into the flat record used by <code>model.json</code>.</p>",
			"text": "Reduces a built page into the flat record used by `model.json`.\n\n",
			"html": "<p>Reduces a built page into the flat record used by <code>model.json</code>.</p>",
			"entity": "method",
			"flagSearchText": " modelPage A page produced by `organizer.buildPages()`. A serializable record.",
			"access": "private",
			"params": [
				{
					"name": "page",
					"shortText": "A page produced by `organizer.buildPages()`.",
					"shortHtml": "<p>A page produced by <code>organizer.buildPages()</code>.</p>",
					"text": "A page produced by `organizer.buildPages()`.",
					"html": "<p>A page produced by <code>organizer.buildPages()</code>.</p>",
					"type": "object"
				}
			],
			"returns": {
				"type": "object",
				"text": "A serializable record.",
				"html": "<p>A serializable record.</p>",
				"shortText": "<p>A serializable record.</p>",
				"shortHtml": "<p>A serializable record.</p>"
			},
			"file": "src/llms.js",
			"filename": "llms.js",
			"klass": "llms",
			"package": "documon",
			"docfile": "documon.llms.html",
			"id": "documon.llms.modelPage"
		},
		{
			"line": 190,
			"name": "readMore",
			"shortText": "Collects the markdown of the \"more\" folder, in menu order, for `llms-full.txt`.",
			"shortHtml": "<p>Collects the markdown of the \"more\" folder, in menu order, for <code>llms-full.txt</code>.</p>",
			"text": "Collects the markdown of the \"more\" folder, in menu order, for `llms-full.txt`.\n\nThe prose pages are usually the part a reader most needs -- guides, concepts, tag\nreferences -- and they are already plain text, so they go in verbatim.\n\n",
			"html": "<p>Collects the markdown of the \"more\" folder, in menu order, for <code>llms-full.txt</code>.</p>\n<p>The prose pages are usually the part a reader most needs -- guides, concepts, tag<br />\nreferences -- and they are already plain text, so they go in verbatim.</p>",
			"entity": "method",
			"flagSearchText": " readMore The \"more\" folder. `{ name, body }` records, in filename order.",
			"access": "private",
			"params": [
				{
					"name": "folder",
					"shortText": "The \"more\" folder.",
					"shortHtml": "<p>The \"more\" folder.</p>",
					"text": "The \"more\" folder.",
					"html": "<p>The \"more\" folder.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "array",
				"text": "`{ name, body }` records, in filename order.",
				"html": "<p><code>{ name, body }</code> records, in filename order.</p>",
				"shortText": "<p><code>{ name, body }</code> records, in filename order.</p>",
				"shortHtml": "<p><code>{ name, body }</code> records, in filename order.</p>"
			},
			"file": "src/llms.js",
			"filename": "llms.js",
			"klass": "llms",
			"package": "documon",
			"docfile": "documon.llms.html",
			"id": "documon.llms.readMore"
		},
		{
			"line": 253,
			"name": "write",
			"shortText": "Writes `llms.txt`, `llms-full.txt` and `model.json`.",
			"shortHtml": "<p>Writes <code>llms.txt</code>, <code>llms-full.txt</code> and <code>model.json</code>.</p>",
			"text": "Writes `llms.txt`, `llms-full.txt` and `model.json`.\n\n",
			"html": "<p>Writes <code>llms.txt</code>, <code>llms-full.txt</code> and <code>model.json</code>.</p>",
			"entity": "method",
			"flagSearchText": " write The resolved `mainConf`. Pages from `organizer.buildPages()`. The logger. The final menu, so hand-written \"more\" pages are indexed too. `{ llms, llmsFull, model }` -- paths written, or nulls.",
			"params": [
				{
					"name": "conf",
					"shortText": "The resolved `mainConf`.",
					"shortHtml": "<p>The resolved <code>mainConf</code>.</p>",
					"text": "The resolved `mainConf`.",
					"html": "<p>The resolved <code>mainConf</code>.</p>",
					"type": "object"
				},
				{
					"name": "pages",
					"shortText": "Pages from `organizer.buildPages()`.",
					"shortHtml": "<p>Pages from <code>organizer.buildPages()</code>.</p>",
					"text": "Pages from `organizer.buildPages()`.",
					"html": "<p>Pages from <code>organizer.buildPages()</code>.</p>",
					"type": "array"
				},
				{
					"name": "log",
					"shortText": "The logger.",
					"shortHtml": "<p>The logger.</p>",
					"text": "The logger.",
					"html": "<p>The logger.</p>",
					"type": "object"
				},
				{
					"name": "menu",
					"shortText": "The final menu, so hand-written \"more\" pages are indexed too.",
					"shortHtml": "<p>The final menu, so hand-written \"more\" pages are indexed too.</p>",
					"text": "The final menu, so hand-written \"more\" pages are indexed too.",
					"html": "<p>The final menu, so hand-written \"more\" pages are indexed too.</p>",
					"type": "array",
					"optional": true
				}
			],
			"returns": {
				"type": "object",
				"text": "`{ llms, llmsFull, model }` -- paths written, or nulls.",
				"html": "<p><code>{ llms, llmsFull, model }</code> -- paths written, or nulls.</p>",
				"shortText": "<p><code>{ llms, llmsFull, model }</code> -- paths written, or nulls.</p>",
				"shortHtml": "<p><code>{ llms, llmsFull, model }</code> -- paths written, or nulls.</p>"
			},
			"file": "src/llms.js",
			"filename": "llms.js",
			"klass": "llms",
			"package": "documon",
			"docfile": "documon.llms.html",
			"id": "documon.llms.write"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.7.0",
	"search": {
		"documon.llms": "llms : Emits machine readable companions alongside generated HTML llms llms convention https llmstxt short linkable index documentation meant read language model rather than rendered browser llms full every page prose concatenated into plain text file model ingest whole manual single fetch model json structured documentation model packages classes members params types other tools consume Documon output data instead scraping HTML three written output folder Disable with emitLlms false emitModel falsellms documon",
		"documon.llms.deHtml": "deHtml : Strips HTML tags collapses whitespace leaving readable plain textdeHtml Source HTML Plain text",
		"documon.llms.joinUrl": "joinUrl : Joins base page filenamejoinUrl Base empty Page filename bare filename",
		"documon.llms.modelPage": "modelPage : Reduces built page into flat record used model jsonmodelPage page produced organizer buildPages serializable record",
		"documon.llms.flattenMenu": "flattenMenu : Flattens menu tree into list linkable pagesflattenMenu Menu nodes Accumulator Flat page records",
		"documon.llms.readMore": "readMore : Collects markdown more folder menu order llms full prose pages usually part reader most needs guides concepts references they already plain text they verbatimreadMore more folder name body records filename order",
		"documon.llms.write": "write : Writes llms llms full model jsonwrite resolved mainConf Pages from organizer buildPages logger final menu hand written more pages indexed llms llmsFull model paths written nulls"
	}
}