[
	{
		"text": "Accepts the tag spellings people (and tools trained on other documentation systems)\nactually write, and maps them onto Documon's vocabulary.\n\n### Why\n\nDocumon derives structure exclusively from tags, which means an unrecognised tag isn't\na cosmetic problem -- it's a missing page. A block written as\n\n\t\t&#64;function area\n\t\t&#64;arg {number} r - Radius.\n\nhas no kind tag as far as Documon is concerned, so the whole entity silently disappears.\nSince `&#64;function` and `&#64;arg` are exact JSDoc synonyms for `&#64;method` and\n`&#64;param`, refusing them buys nothing and costs a page.\n\nAliasing does not weaken the \"structure comes only from comments\" rule: an alias is\nstill an explicit tag, just spelled differently.\n\n### What is deliberately NOT aliased\n\nTags whose meaning differs, even slightly, are left alone so they surface in `--check`\nrather than producing quietly wrong documentation:\n\n- `&#64;fires` / `&#64;emits` -- documents which events a method *emits*. That is not\n  the same as `&#64;event`, which declares an event entity.\n- `&#64;memberof` -- re-parents an entity; Documon scopes by `&#64;package` instead.\n- `&#64;typedef`, `&#64;callback`, `&#64;enum`, `&#64;inheritdoc` -- no equivalent concept.\n\n",
		"start": 6,
		"end": 37,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@module  aliasesaliases",
				"flag": "module",
				"after": "aliases",
				"afterType": "aliases",
				"name": "aliases",
				"single": true,
				"text": "aliases"
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
		"source": "Accepts the tag spellings people (and tools trained on other documentation systems)\nactually write, and maps them onto Documon's vocabulary.\n\n### Why\n\nDocumon derives structure exclusively from tags, which means an unrecognised tag isn't\na cosmetic problem -- it's a missing page. A block written as\n\n\t\t&#64;function area\n\t\t&#64;arg {number} r - Radius.\n\nhas no kind tag as far as Documon is concerned, so the whole entity silently disappears.\nSince `&#64;function` and `&#64;arg` are exact JSDoc synonyms for `&#64;method` and\n`&#64;param`, refusing them buys nothing and costs a page.\n\nAliasing does not weaken the \"structure comes only from comments\" rule: an alias is\nstill an explicit tag, just spelled differently.\n\n### What is deliberately NOT aliased\n\nTags whose meaning differs, even slightly, are left alone so they surface in `--check`\nrather than producing quietly wrong documentation:\n\n- `&#64;fires` / `&#64;emits` -- documents which events a method *emits*. That is not\n  the same as `&#64;event`, which declares an event entity.\n- `&#64;memberof` -- re-parents an entity; Documon scopes by `&#64;package` instead.\n- `&#64;typedef`, `&#64;callback`, `&#64;enum`, `&#64;inheritdoc` -- no equivalent concept.\n\n@module  aliases\n@package documon",
		"meta": [],
		"id": "documon.aliases"
	},
	{
		"text": "",
		"start": 39,
		"end": 42,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@property {object} TAGS - Exact synonyms. The key is what was written, the value is the",
				"flag": "property",
				"after": "{object} TAGS - Exact synonyms. The key is what was written, the value is the",
				"type": "object",
				"afterType": "TAGS - Exact synonyms. The key is what was written, the value is the",
				"name": "TAGS",
				"text": "Exact synonyms. The key is what was written, the value is the\nDocumon tag it becomes."
			}
		],
		"source": "@property {object} TAGS - Exact synonyms. The key is what was written, the value is the\nDocumon tag it becomes.",
		"meta": [],
		"id": "documon.aliases.TAGS"
	},
	{
		"text": "",
		"start": 71,
		"end": 79,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@property {object} DEPRECATED - Spellings that Documon used to accept and no longer",
				"flag": "property",
				"after": "{object} DEPRECATED - Spellings that Documon used to accept and no longer",
				"type": "object",
				"afterType": "DEPRECATED - Spellings that Documon used to accept and no longer",
				"name": "DEPRECATED",
				"text": "Spellings that Documon used to accept and no longer\ndoes. These are **not** aliased -- they are listed so `--check` and the build summary\ncan name the replacement instead of reporting a generic \"unknown tag\".\n\n`@impliments` was Documon's own misspelling of `@implements` and was corrected in\nv2.7.0. Since structure comes only from tags, leaving it as a silent alias would have\nmeant the typo propagating into new projects forever."
			}
		],
		"source": "@property {object} DEPRECATED - Spellings that Documon used to accept and no longer\ndoes. These are **not** aliased -- they are listed so `--check` and the build summary\ncan name the replacement instead of reporting a generic \"unknown tag\".\n\n`@impliments` was Documon's own misspelling of `@implements` and was corrected in\nv2.7.0. Since structure comes only from tags, leaving it as a silent alias would have\nmeant the typo propagating into new projects forever.",
		"meta": [],
		"id": "documon.aliases.DEPRECATED"
	},
	{
		"text": "",
		"start": 84,
		"end": 88,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@property {array} DESCRIPTION_TAGS - Tags whose content is really just the description.",
				"flag": "property",
				"after": "{array} DESCRIPTION_TAGS - Tags whose content is really just the description.",
				"type": "array",
				"afterType": "DESCRIPTION_TAGS - Tags whose content is really just the description.",
				"name": "DESCRIPTION_TAGS",
				"text": "Tags whose content is really just the description.\nDocumon takes the description from the free text above the tags, so these are folded\ninto it rather than dropped."
			}
		],
		"source": "@property {array} DESCRIPTION_TAGS - Tags whose content is really just the description.\nDocumon takes the description from the free text above the tags, so these are folded\ninto it rather than dropped.",
		"meta": [],
		"id": "documon.aliases.DESCRIPTION_TAGS"
	},
	{
		"text": "",
		"start": 91,
		"end": 95,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@property {object} META_TAGS - Tags with genuine meaning and no Documon equivalent.",
				"flag": "property",
				"after": "{object} META_TAGS - Tags with genuine meaning and no Documon equivalent.",
				"type": "object",
				"afterType": "META_TAGS - Tags with genuine meaning and no Documon equivalent.",
				"name": "META_TAGS",
				"text": "Tags with genuine meaning and no Documon equivalent.\nRather than discarding them, they are collected and rendered in the page's meta\nsection. The value is the label shown to the reader."
			}
		],
		"source": "@property {object} META_TAGS - Tags with genuine meaning and no Documon equivalent.\nRather than discarding them, they are collected and rendered in the page's meta\nsection. The value is the label shown to the reader.",
		"meta": [],
		"id": "documon.aliases.META_TAGS"
	},
	{
		"text": "",
		"start": 107,
		"end": 110,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@property {array} ACCESS_VALUES - Legal values of an `@access` tag, each of which maps",
				"flag": "property",
				"after": "{array} ACCESS_VALUES - Legal values of an `@access` tag, each of which maps",
				"type": "array",
				"afterType": "ACCESS_VALUES - Legal values of an `@access` tag, each of which maps",
				"name": "ACCESS_VALUES",
				"text": "Legal values of an `@access` tag, each of which maps\nonto a Documon visibility flag of the same name."
			}
		],
		"source": "@property {array} ACCESS_VALUES - Legal values of an `@access` tag, each of which maps\nonto a Documon visibility flag of the same name.",
		"meta": [],
		"id": "documon.aliases.ACCESS_VALUES"
	},
	{
		"text": "Resolves a written tag name to its Documon equivalent.\n\n",
		"start": 113,
		"end": 123,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@method  resolveresolve",
				"flag": "method",
				"after": "resolve",
				"afterType": "resolve",
				"name": "resolve",
				"single": true,
				"text": "resolve"
			},
			{
				"source": "@param   {string}  flag - The tag as written, without the leading \"@\".The tag as written, without the leading \"@\".",
				"flag": "param",
				"after": "{string}  flag - The tag as written, without the leading \"@\".",
				"type": "string",
				"afterType": "flag - The tag as written, without the leading \"@\".",
				"name": "flag",
				"text": "The tag as written, without the leading \"@\"."
			},
			{
				"source": "@return  {string}       - The Documon tag name, or the input unchanged.The Documon tag name, or the input unchanged.",
				"flag": "return",
				"after": "{string}       - The Documon tag name, or the input unchanged.",
				"type": "string",
				"afterType": "The Documon tag name, or the input unchanged.",
				"text": "The Documon tag name, or the input unchanged."
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\n\t\taliases.resolve(\"function\");  // \"method\"\n\t\taliases.resolve(\"method\");    // \"method\""
			}
		],
		"source": "Resolves a written tag name to its Documon equivalent.\n\n@method  resolve\n@param   {string}  flag - The tag as written, without the leading \"@\".\n@return  {string}       - The Documon tag name, or the input unchanged.\n@example\n\n\t\taliases.resolve(\"function\");  // \"method\"\n\t\taliases.resolve(\"method\");    // \"method\"",
		"meta": [],
		"id": "documon.aliases.resolve"
	},
	{
		"text": "The current spelling of a retired tag, or null when the tag was never retired.\n\n",
		"start": 135,
		"end": 144,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@method  deprecatedFordeprecatedFor",
				"flag": "method",
				"after": "deprecatedFor",
				"afterType": "deprecatedFor",
				"name": "deprecatedFor",
				"single": true,
				"text": "deprecatedFor"
			},
			{
				"source": "@param   {string}  flag - The tag as written.The tag as written.",
				"flag": "param",
				"after": "{string}  flag - The tag as written.",
				"type": "string",
				"afterType": "flag - The tag as written.",
				"name": "flag",
				"text": "The tag as written."
			},
			{
				"source": "@return  {string}       - The replacement tag name, or null.The replacement tag name, or null.",
				"flag": "return",
				"after": "{string}       - The replacement tag name, or null.",
				"type": "string",
				"afterType": "The replacement tag name, or null.",
				"text": "The replacement tag name, or null."
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\n\t\taliases.deprecatedFor(\"impliments\");  // \"implements\""
			}
		],
		"source": "The current spelling of a retired tag, or null when the tag was never retired.\n\n@method  deprecatedFor\n@param   {string}  flag - The tag as written.\n@return  {string}       - The replacement tag name, or null.\n@example\n\n\t\taliases.deprecatedFor(\"impliments\");  // \"implements\"",
		"meta": [],
		"id": "documon.aliases.deprecatedFor"
	},
	{
		"text": "Whether a tag is an alias of something else (used to report normalizations).\n\n",
		"start": 149,
		"end": 155,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@method  isAliasisAlias",
				"flag": "method",
				"after": "isAlias",
				"afterType": "isAlias",
				"name": "isAlias",
				"single": true,
				"text": "isAlias"
			},
			{
				"source": "@param   {string}   flag - The tag as written.The tag as written.",
				"flag": "param",
				"after": "{string}   flag - The tag as written.",
				"type": "string",
				"afterType": "flag - The tag as written.",
				"name": "flag",
				"text": "The tag as written."
			},
			{
				"source": "@return  {boolean}       - True when `resolve()` would change it.",
				"flag": "return",
				"after": "{boolean}       - True when `resolve()` would change it.",
				"type": "boolean",
				"afterType": "True when `resolve()` would change it.",
				"text": "True when `resolve()` would change it."
			}
		],
		"source": "Whether a tag is an alias of something else (used to report normalizations).\n\n@method  isAlias\n@param   {string}   flag - The tag as written.\n@return  {boolean}       - True when `resolve()` would change it.",
		"meta": [],
		"id": "documon.aliases.isAlias"
	},
	{
		"text": "Whether a tag's content should be folded into the description.\n\n",
		"start": 160,
		"end": 166,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@method  isDescriptionisDescription",
				"flag": "method",
				"after": "isDescription",
				"afterType": "isDescription",
				"name": "isDescription",
				"single": true,
				"text": "isDescription"
			},
			{
				"source": "@param   {string}   flag - The tag as written.The tag as written.",
				"flag": "param",
				"after": "{string}   flag - The tag as written.",
				"type": "string",
				"afterType": "flag - The tag as written.",
				"name": "flag",
				"text": "The tag as written."
			},
			{
				"source": "@return  {boolean}",
				"flag": "return",
				"after": "{boolean}",
				"type": "boolean"
			}
		],
		"source": "Whether a tag's content should be folded into the description.\n\n@method  isDescription\n@param   {string}   flag - The tag as written.\n@return  {boolean}",
		"meta": [],
		"id": "documon.aliases.isDescription"
	},
	{
		"text": "The display label for a metadata tag, or null when it isn't one.\n\n",
		"start": 171,
		"end": 177,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@method  metaLabelmetaLabel",
				"flag": "method",
				"after": "metaLabel",
				"afterType": "metaLabel",
				"name": "metaLabel",
				"single": true,
				"text": "metaLabel"
			},
			{
				"source": "@param   {string}  flag - The tag as written.The tag as written.",
				"flag": "param",
				"after": "{string}  flag - The tag as written.",
				"type": "string",
				"afterType": "flag - The tag as written.",
				"name": "flag",
				"text": "The tag as written."
			},
			{
				"source": "@return  {string}       - Label, or null.",
				"flag": "return",
				"after": "{string}       - Label, or null.",
				"type": "string",
				"afterType": "Label, or null.",
				"text": "Label, or null."
			}
		],
		"source": "The display label for a metadata tag, or null when it isn't one.\n\n@method  metaLabel\n@param   {string}  flag - The tag as written.\n@return  {string}       - Label, or null.",
		"meta": [],
		"id": "documon.aliases.metaLabel"
	},
	{
		"text": "Rewrites JSDoc's inline link syntax as the markdown Documon already understands.\n\nHandles `{@link target}`, `{@link target|label}`, `{@link target label}`, and the\n`linkcode` / `linkplain` / `tutorial` variants.\n\n",
		"start": 182,
		"end": 195,
		"file": "/Volumes/Drives/projects/documon/documon/src/aliases.js",
		"flags": [
			{
				"source": "@method  inlineLinksinlineLinks",
				"flag": "method",
				"after": "inlineLinks",
				"afterType": "inlineLinks",
				"name": "inlineLinks",
				"single": true,
				"text": "inlineLinks"
			},
			{
				"source": "@param   {string}  text - Text possibly containing inline links.Text possibly containing inline links.",
				"flag": "param",
				"after": "{string}  text - Text possibly containing inline links.",
				"type": "string",
				"afterType": "text - Text possibly containing inline links.",
				"name": "text",
				"text": "Text possibly containing inline links."
			},
			{
				"source": "@return  {string}       - Text with markdown links.Text with markdown links.",
				"flag": "return",
				"after": "{string}       - Text with markdown links.",
				"type": "string",
				"afterType": "Text with markdown links.",
				"text": "Text with markdown links."
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\n\t\taliases.inlineLinks(\"See {@link geo.Circle}.\");\n\t\t// \"See [geo.Circle](geo.Circle).\""
			}
		],
		"source": "Rewrites JSDoc's inline link syntax as the markdown Documon already understands.\n\nHandles `{@link target}`, `{@link target|label}`, `{@link target label}`, and the\n`linkcode` / `linkplain` / `tutorial` variants.\n\n@method  inlineLinks\n@param   {string}  text - Text possibly containing inline links.\n@return  {string}       - Text with markdown links.\n@example\n\n\t\taliases.inlineLinks(\"See {@link geo.Circle}.\");\n\t\t// \"See [geo.Circle](geo.Circle).\"",
		"meta": [],
		"id": "documon.aliases.inlineLinks"
	}
]