{
	"line": 38,
	"name": "aliases",
	"shortText": "Accepts the tag spellings people (and tools trained on other documentation systems)",
	"shortHtml": "<p>Accepts the tag spellings people (and tools trained on other documentation systems)</p>",
	"text": "Accepts the tag spellings people (and tools trained on other documentation systems)\nactually write, and maps them onto Documon's vocabulary.\n\n### Why\n\nDocumon derives structure exclusively from tags, which means an unrecognised tag isn't\na cosmetic problem -- it's a missing page. A block written as\n\n\t\t&#64;function area\n\t\t&#64;arg {number} r - Radius.\n\nhas no kind tag as far as Documon is concerned, so the whole entity silently disappears.\nSince `&#64;function` and `&#64;arg` are exact JSDoc synonyms for `&#64;method` and\n`&#64;param`, refusing them buys nothing and costs a page.\n\nAliasing does not weaken the \"structure comes only from comments\" rule: an alias is\nstill an explicit tag, just spelled differently.\n\n### What is deliberately NOT aliased\n\nTags whose meaning differs, even slightly, are left alone so they surface in `--check`\nrather than producing quietly wrong documentation:\n\n- `&#64;fires` / `&#64;emits` -- documents which events a method *emits*. That is not\n  the same as `&#64;event`, which declares an event entity.\n- `&#64;memberof` -- re-parents an entity; Documon scopes by `&#64;package` instead.\n- `&#64;typedef`, `&#64;callback`, `&#64;enum`, `&#64;inheritdoc` -- no equivalent concept.\n\n",
	"html": "<p>Accepts the tag spellings people (and tools trained on other documentation systems)<br />\nactually write, and maps them onto Documon's vocabulary.</p>\n<h3 id=\"why\">Why</h3>\n<p>Documon derives structure exclusively from tags, which means an unrecognised tag isn't<br />\na cosmetic problem -- it's a missing page. A block written as</p>\n<pre><code>    &amp;#64;function area\n    &amp;#64;arg {number} r - Radius.</code></pre>\n<p>has no kind tag as far as Documon is concerned, so the whole entity silently disappears.<br />\nSince <code>&amp;#64;function</code> and <code>&amp;#64;arg</code> are exact JSDoc synonyms for <code>&amp;#64;method</code> and<br />\n<code>&amp;#64;param</code>, refusing them buys nothing and costs a page.</p>\n<p>Aliasing does not weaken the \"structure comes only from comments\" rule: an alias is<br />\nstill an explicit tag, just spelled differently.</p>\n<h3 id=\"what-is-deliberately-not-aliased\">What is deliberately NOT aliased</h3>\n<p>Tags whose meaning differs, even slightly, are left alone so they surface in <code>--check</code><br />\nrather than producing quietly wrong documentation:</p>\n<ul>\n<li><code>&amp;#64;fires</code> / <code>&amp;#64;emits</code> -- documents which events a method <em>emits</em>. That is not<br />\nthe same as <code>&amp;#64;event</code>, which declares an event entity.</li>\n<li><code>&amp;#64;memberof</code> -- re-parents an entity; Documon scopes by <code>&amp;#64;package</code> instead.</li>\n<li><code>&amp;#64;typedef</code>, <code>&amp;#64;callback</code>, <code>&amp;#64;enum</code>, <code>&amp;#64;inheritdoc</code> -- no equivalent concept.</li>\n</ul>",
	"entity": "module",
	"flagSearchText": " aliases documon",
	"package": "documon",
	"file": "src/aliases.js",
	"filename": "aliases.js",
	"klass": "aliases",
	"docfile": "documon.aliases.html",
	"id": "documon.aliases",
	"methods": [
		{
			"line": 170,
			"name": "inlineLinks",
			"shortText": "Rewrites JSDoc's inline link syntax as the markdown Documon already understands.",
			"shortHtml": "<p>Rewrites JSDoc's inline link syntax as the markdown Documon already understands.</p>",
			"text": "Rewrites JSDoc's inline link syntax as the markdown Documon already understands.\n\nHandles `{@link target}`, `{@link target|label}`, `{@link target label}`, and the\n`linkcode` / `linkplain` / `tutorial` variants.\n\n",
			"html": "<p>Rewrites JSDoc's inline link syntax as the markdown Documon already understands.</p>\n<p>Handles <code>[target](target)</code>, <code>[label](target)</code>, <code>[label](target)</code>, and the<br />\n<code>linkcode</code> / <code>linkplain</code> / <code>tutorial</code> variants.</p>",
			"entity": "method",
			"flagSearchText": " inlineLinks Text possibly containing inline links. Text with markdown links. \n\n\t\taliases.inlineLinks(\"See {@link geo.Circle}.\");\n\t\t// \"See [geo.Circle](geo.Circle).\"",
			"params": [
				{
					"name": "text",
					"shortText": "Text possibly containing inline links.",
					"shortHtml": "<p>Text possibly containing inline links.</p>",
					"text": "Text possibly containing inline links.",
					"html": "<p>Text possibly containing inline links.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "Text with markdown links.",
				"html": "<p>Text with markdown links.</p>",
				"shortText": "<p>Text with markdown links.</p>",
				"shortHtml": "<p>Text with markdown links.</p>"
			},
			"example": [
				{
					"text": "\n\n\t\taliases.inlineLinks(\"See {@link geo.Circle}.\");\n\t\t// \"See [geo.Circle](geo.Circle).\"",
					"html": "<pre><code>    aliases.inlineLinks(\"See [geo.Circle](geo.Circle).\");\n    // \"See [geo.Circle](geo.Circle).\"</code></pre>"
				}
			],
			"file": "src/aliases.js",
			"filename": "aliases.js",
			"klass": "aliases",
			"package": "documon",
			"docfile": "documon.aliases.html",
			"id": "documon.aliases.inlineLinks"
		},
		{
			"line": 130,
			"name": "isAlias",
			"shortText": "Whether a tag is an alias of something else (used to report normalizations).",
			"shortHtml": "<p>Whether a tag is an alias of something else (used to report normalizations).</p>",
			"text": "Whether a tag is an alias of something else (used to report normalizations).\n\n",
			"html": "<p>Whether a tag is an alias of something else (used to report normalizations).</p>",
			"entity": "method",
			"flagSearchText": " isAlias The tag as written. True when `resolve()` would change it.",
			"params": [
				{
					"name": "flag",
					"shortText": "The tag as written.",
					"shortHtml": "<p>The tag as written.</p>",
					"text": "The tag as written.",
					"html": "<p>The tag as written.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "boolean",
				"text": "True when `resolve()` would change it.",
				"html": "<p>True when <code>resolve()</code> would change it.</p>",
				"shortText": "<p>True when <code>resolve()</code> would change it.</p>",
				"shortHtml": "<p>True when <code>resolve()</code> would change it.</p>"
			},
			"file": "src/aliases.js",
			"filename": "aliases.js",
			"klass": "aliases",
			"package": "documon",
			"docfile": "documon.aliases.html",
			"id": "documon.aliases.isAlias"
		},
		{
			"line": 141,
			"name": "isDescription",
			"shortText": "Whether a tag's content should be folded into the description.",
			"shortHtml": "<p>Whether a tag's content should be folded into the description.</p>",
			"text": "Whether a tag's content should be folded into the description.\n\n",
			"html": "<p>Whether a tag's content should be folded into the description.</p>",
			"entity": "method",
			"flagSearchText": " isDescription The tag as written.",
			"params": [
				{
					"name": "flag",
					"shortText": "The tag as written.",
					"shortHtml": "<p>The tag as written.</p>",
					"text": "The tag as written.",
					"html": "<p>The tag as written.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "boolean",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"file": "src/aliases.js",
			"filename": "aliases.js",
			"klass": "aliases",
			"package": "documon",
			"docfile": "documon.aliases.html",
			"id": "documon.aliases.isDescription"
		},
		{
			"line": 152,
			"name": "metaLabel",
			"shortText": "The display label for a metadata tag, or null when it isn't one.",
			"shortHtml": "<p>The display label for a metadata tag, or null when it isn't one.</p>",
			"text": "The display label for a metadata tag, or null when it isn't one.\n\n",
			"html": "<p>The display label for a metadata tag, or null when it isn't one.</p>",
			"entity": "method",
			"flagSearchText": " metaLabel The tag as written. Label, or null.",
			"params": [
				{
					"name": "flag",
					"shortText": "The tag as written.",
					"shortHtml": "<p>The tag as written.</p>",
					"text": "The tag as written.",
					"html": "<p>The tag as written.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "Label, or null.",
				"html": "<p>Label, or null.</p>",
				"shortText": "<p>Label, or null.</p>",
				"shortHtml": "<p>Label, or null.</p>"
			},
			"file": "src/aliases.js",
			"filename": "aliases.js",
			"klass": "aliases",
			"package": "documon",
			"docfile": "documon.aliases.html",
			"id": "documon.aliases.metaLabel"
		},
		{
			"line": 112,
			"name": "resolve",
			"shortText": "Resolves a written tag name to its Documon equivalent.",
			"shortHtml": "<p>Resolves a written tag name to its Documon equivalent.</p>",
			"text": "Resolves a written tag name to its Documon equivalent.\n\n",
			"html": "<p>Resolves a written tag name to its Documon equivalent.</p>",
			"entity": "method",
			"flagSearchText": " resolve The tag as written, without the leading \"@\". The Documon tag name, or the input unchanged. \n\n\t\taliases.resolve(\"function\");  // \"method\"\n\t\taliases.resolve(\"method\");    // \"method\"",
			"params": [
				{
					"name": "flag",
					"shortText": "The tag as written, without the leading \"@\".",
					"shortHtml": "<p>The tag as written, without the leading \"@\".</p>",
					"text": "The tag as written, without the leading \"@\".",
					"html": "<p>The tag as written, without the leading \"@\".</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "The Documon tag name, or the input unchanged.",
				"html": "<p>The Documon tag name, or the input unchanged.</p>",
				"shortText": "<p>The Documon tag name, or the input unchanged.</p>",
				"shortHtml": "<p>The Documon tag name, or the input unchanged.</p>"
			},
			"example": [
				{
					"text": "\n\n\t\taliases.resolve(\"function\");  // \"method\"\n\t\taliases.resolve(\"method\");    // \"method\"",
					"html": "<pre><code>    aliases.resolve(\"function\");  // \"method\"\n    aliases.resolve(\"method\");    // \"method\"</code></pre>"
				}
			],
			"file": "src/aliases.js",
			"filename": "aliases.js",
			"klass": "aliases",
			"package": "documon",
			"docfile": "documon.aliases.html",
			"id": "documon.aliases.resolve"
		}
	],
	"properties": [
		{
			"line": 99,
			"name": "ACCESS_VALUES",
			"shortText": "Legal values of an `@access` tag, each of which maps",
			"shortHtml": "<p>Legal values of an <code>@access</code> tag, each of which maps</p>",
			"text": "Legal values of an `@access` tag, each of which maps\nonto a Documon visibility flag of the same name.",
			"html": "<p>Legal values of an <code>@access</code> tag, each of which maps<br />\nonto a Documon visibility flag of the same name.</p>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " Legal values of an `@access` tag, each of which maps\nonto a Documon visibility flag of the same name.",
			"file": "src/aliases.js",
			"filename": "aliases.js",
			"klass": "aliases",
			"package": "documon",
			"docfile": "documon.aliases.html",
			"id": "documon.aliases.ACCESS_VALUES"
		},
		{
			"line": 77,
			"name": "DESCRIPTION_TAGS",
			"shortText": "Tags whose content is really just the description.",
			"shortHtml": "<p>Tags whose content is really just the description.</p>",
			"text": "Tags whose content is really just the description.\nDocumon takes the description from the free text above the tags, so these are folded\ninto it rather than dropped.",
			"html": "<p>Tags whose content is really just the description.<br />\nDocumon takes the description from the free text above the tags, so these are folded<br />\ninto it rather than dropped.</p>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " Tags whose content is really just the description.\nDocumon takes the description from the free text above the tags, so these are folded\ninto it rather than dropped.",
			"file": "src/aliases.js",
			"filename": "aliases.js",
			"klass": "aliases",
			"package": "documon",
			"docfile": "documon.aliases.html",
			"id": "documon.aliases.DESCRIPTION_TAGS"
		},
		{
			"line": 84,
			"name": "META_TAGS",
			"shortText": "Tags with genuine meaning and no Documon equivalent.",
			"shortHtml": "<p>Tags with genuine meaning and no Documon equivalent.</p>",
			"text": "Tags with genuine meaning and no Documon equivalent.\nRather than discarding them, they are collected and rendered in the page's meta\nsection. The value is the label shown to the reader.",
			"html": "<p>Tags with genuine meaning and no Documon equivalent.<br />\nRather than discarding them, they are collected and rendered in the page's meta<br />\nsection. The value is the label shown to the reader.</p>",
			"type": "object",
			"entity": "property",
			"flagSearchText": " Tags with genuine meaning and no Documon equivalent.\nRather than discarding them, they are collected and rendered in the page's meta\nsection. The value is the label shown to the reader.",
			"file": "src/aliases.js",
			"filename": "aliases.js",
			"klass": "aliases",
			"package": "documon",
			"docfile": "documon.aliases.html",
			"id": "documon.aliases.META_TAGS"
		},
		{
			"line": 43,
			"name": "TAGS",
			"shortText": "Exact synonyms. The key is what was written, the value is the",
			"shortHtml": "<p>Exact synonyms. The key is what was written, the value is the</p>",
			"text": "Exact synonyms. The key is what was written, the value is the\nDocumon tag it becomes.",
			"html": "<p>Exact synonyms. The key is what was written, the value is the<br />\nDocumon tag it becomes.</p>",
			"type": "object",
			"entity": "property",
			"flagSearchText": " Exact synonyms. The key is what was written, the value is the\nDocumon tag it becomes.",
			"file": "src/aliases.js",
			"filename": "aliases.js",
			"klass": "aliases",
			"package": "documon",
			"docfile": "documon.aliases.html",
			"id": "documon.aliases.TAGS"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.7.0",
	"search": {
		"documon.aliases": "aliases : Accepts spellings people tools trained other documentation systems actually write maps them onto Documon vocabulary Documon derives structure exclusively from tags which means unrecognised cosmetic problem missing page block written function area number Radius kind Documon concerned whole entity silently disappears Since function exact JSDoc synonyms method param refusing them buys nothing costs page Aliasing does weaken structure comes only from comments rule alias still explicit just spelled differently What deliberately aliased Tags whose meaning differs even slightly left alone they surface check rather than producing quietly wrong documentation fires emits documents which events method emits That same event which declares event entity memberof parents entity Documon scopes package instead typedef callback enum inheritdoc equivalent conceptaliases documon",
		"documon.aliases.resolve": "resolve : Resolves written name Documon equivalentresolve written without leading Documon name input unchanged aliases resolve function method aliases resolve method method",
		"documon.aliases.isAlias": "isAlias : Whether alias something else used report normalizationsisAlias written True when resolve would change",
		"documon.aliases.isDescription": "isDescription : Whether content should folded into descriptionisDescription written",
		"documon.aliases.metaLabel": "metaLabel : display label metadata null whenmetaLabel written Label null",
		"documon.aliases.inlineLinks": "inlineLinks : Rewrites JSDoc inline link syntax markdown Documon already understands Handles link target link target label link target label linkcode linkplain tutorial variantsinlineLinks Text possibly containing inline links Text with markdown links aliases inlineLinks link Circle Circle Circle",
		"documon.aliases.TAGS": "TAGS : Exact synonyms what written value Documon becomesExact synonyms what written value Documon becomes",
		"documon.aliases.DESCRIPTION_TAGS": "DESCRIPTION_TAGS : Tags whose content really just description Documon takes description from free text above tags these folded into rather than droppedTags whose content really just description Documon takes description from free text above tags these folded into rather than dropped",
		"documon.aliases.META_TAGS": "META_TAGS : Tags with genuine meaning Documon equivalent Rather than discarding them they collected rendered page meta section value label shown readerTags with genuine meaning Documon equivalent Rather than discarding them they collected rendered page meta section value label shown reader",
		"documon.aliases.ACCESS_VALUES": "ACCESS_VALUES : Legal values access each which maps onto Documon visibility flag same nameLegal values access each which maps onto Documon visibility flag same name"
	}
}