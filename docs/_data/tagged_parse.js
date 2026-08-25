{
	"file": "src/parse.js",
	"filename": "parse.js",
	"package": "root",
	"docfile": "root.html",
	"id": "root",
	"methods": [
		{
			"line": 100,
			"name": "flagBody",
			"shortText": "Recovers the full text a tag carried.",
			"shortHtml": "<p>Recovers the full text a tag carried.</p>",
			"text": "Recovers the full text a tag carried.\n\n`after` holds everything on the tag's own line; `text` holds the parsed description of\nthat line *plus* any continuation lines appended afterwards. Concatenating them\nduplicates the first line, so take `after` for line one and only the continuations from\n`text`.\n\n",
			"html": "<p>Recovers the full text a tag carried.</p>\n<p><code>after</code> holds everything on the tag's own line; <code>text</code> holds the parsed description of<br />\nthat line <em>plus</em> any continuation lines appended afterwards. Concatenating them<br />\nduplicates the first line, so take <code>after</code> for line one and only the continuations from<br />\n<code>text</code>.</p>",
			"entity": "method",
			"flagSearchText": " flagBody A parsed flag. The tag's full text.",
			"access": "private",
			"params": [
				{
					"name": "f",
					"shortText": "A parsed flag.",
					"shortHtml": "<p>A parsed flag.</p>",
					"text": "A parsed flag.",
					"html": "<p>A parsed flag.</p>",
					"type": "object"
				}
			],
			"returns": {
				"type": "string",
				"text": "The tag's full text.",
				"html": "<p>The tag's full text.</p>",
				"shortText": "<p>The tag's full text.</p>",
				"shortHtml": "<p>The tag's full text.</p>"
			},
			"file": "src/parse.js",
			"filename": "parse.js",
			"package": "root",
			"docfile": "root.html",
			"id": "root.flagBody"
		},
		{
			"line": 129,
			"name": "normalize",
			"shortText": "Post-parse cleanup for tags that don't map one-to-one onto a Documon tag.",
			"shortHtml": "<p>Post-parse cleanup for tags that don't map one-to-one onto a Documon tag.</p>",
			"text": "Post-parse cleanup for tags that don't map one-to-one onto a Documon tag.\n\n- Description tags (`@desc`, `@description`, `@classdesc`, `@fileoverview` ...) have no\n  Documon equivalent because the description is simply the free text above the tags.\n  Their content is folded into that text instead of being thrown away.\n- `@access private` becomes the `@private` flag, and so on.\n- `@const` / `@constant` becomes a read-only `@property`.\n- Metadata tags (`@deprecated`, `@throws`, `@since` ...) are collected onto `meta` so\n  the template can render them, rather than vanishing.\n\n",
			"html": "<p>Post-parse cleanup for tags that don't map one-to-one onto a Documon tag.</p>\n<ul>\n<li>Description tags (<code>@desc</code>, <code>@description</code>, <code>@classdesc</code>, <code>@fileoverview</code> …) have no<br />\nDocumon equivalent because the description is simply the free text above the tags.<br />\nTheir content is folded into that text instead of being thrown away.</li>\n<li><code>@access private</code> becomes the <code>@private</code> flag, and so on.</li>\n<li><code>@const</code> / <code>@constant</code> becomes a read-only <code>@property</code>.</li>\n<li>Metadata tags (<code>@deprecated</code>, <code>@throws</code>, <code>@since</code> …) are collected onto <code>meta</code> so<br />\nthe template can render them, rather than vanishing.</li>\n</ul>",
			"entity": "method",
			"flagSearchText": " normalize The parsed comment block, modified in place.",
			"access": "private",
			"params": [
				{
					"name": "output",
					"shortText": "The parsed comment block, modified in place.",
					"shortHtml": "<p>The parsed comment block, modified in place.</p>",
					"text": "The parsed comment block, modified in place.",
					"html": "<p>The parsed comment block, modified in place.</p>",
					"type": "object"
				}
			],
			"file": "src/parse.js",
			"filename": "parse.js",
			"package": "root",
			"docfile": "root.html",
			"id": "root.normalize"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.7.0",
	"search": {
		"root.flagBody": "flagBody : Recovers full text carried after holds everything line text holds parsed description that line plus continuation lines appended afterwards Concatenating them duplicates first line take after line only continuations from textflagBody parsed flag full text",
		"root.normalize": "normalize : Post parse cleanup tags that onto Documon Description tags desc description classdesc fileoverview have Documon equivalent because description simply free text above tags Their content folded into that text instead being thrown away access private becomes private flag const constant becomes read only property Metadata tags deprecated throws since collected onto meta template render them rather than vanishingnormalize parsed comment block modified place"
	}
}