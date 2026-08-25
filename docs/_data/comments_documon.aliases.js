[
	{
		"start": 6,
		"end": 37,
		"data": "Accepts the tag spellings people (and tools trained on other documentation systems)\nactually write, and maps them onto Documon's vocabulary.\n\n### Why\n\nDocumon derives structure exclusively from tags, which means an unrecognised tag isn't\na cosmetic problem -- it's a missing page. A block written as\n\n\t\t&#64;function area\n\t\t&#64;arg {number} r - Radius.\n\nhas no kind tag as far as Documon is concerned, so the whole entity silently disappears.\nSince `&#64;function` and `&#64;arg` are exact JSDoc synonyms for `&#64;method` and\n`&#64;param`, refusing them buys nothing and costs a page.\n\nAliasing does not weaken the \"structure comes only from comments\" rule: an alias is\nstill an explicit tag, just spelled differently.\n\n### What is deliberately NOT aliased\n\nTags whose meaning differs, even slightly, are left alone so they surface in `--check`\nrather than producing quietly wrong documentation:\n\n- `&#64;fires` / `&#64;emits` -- documents which events a method *emits*. That is not\n  the same as `&#64;event`, which declares an event entity.\n- `&#64;memberof` -- re-parents an entity; Documon scopes by `&#64;package` instead.\n- `&#64;typedef`, `&#64;callback`, `&#64;enum`, `&#64;inheritdoc` -- no equivalent concept.\n\n@module  aliases\n@package documon"
	},
	{
		"start": 39,
		"end": 42,
		"data": "@property {object} TAGS - Exact synonyms. The key is what was written, the value is the\nDocumon tag it becomes."
	},
	{
		"start": 72,
		"end": 76,
		"data": "@property {array} DESCRIPTION_TAGS - Tags whose content is really just the description.\nDocumon takes the description from the free text above the tags, so these are folded\ninto it rather than dropped."
	},
	{
		"start": 79,
		"end": 83,
		"data": "@property {object} META_TAGS - Tags with genuine meaning and no Documon equivalent.\nRather than discarding them, they are collected and rendered in the page's meta\nsection. The value is the label shown to the reader."
	},
	{
		"start": 95,
		"end": 98,
		"data": "@property {array} ACCESS_VALUES - Legal values of an `@access` tag, each of which maps\nonto a Documon visibility flag of the same name."
	},
	{
		"start": 101,
		"end": 111,
		"data": "Resolves a written tag name to its Documon equivalent.\n\n@method  resolve\n@param   {string}  flag - The tag as written, without the leading \"@\".\n@return  {string}       - The Documon tag name, or the input unchanged.\n@example\n\n\t\taliases.resolve(\"function\");  // \"method\"\n\t\taliases.resolve(\"method\");    // \"method\""
	},
	{
		"start": 123,
		"end": 129,
		"data": "Whether a tag is an alias of something else (used to report normalizations).\n\n@method  isAlias\n@param   {string}   flag - The tag as written.\n@return  {boolean}       - True when `resolve()` would change it."
	},
	{
		"start": 134,
		"end": 140,
		"data": "Whether a tag's content should be folded into the description.\n\n@method  isDescription\n@param   {string}   flag - The tag as written.\n@return  {boolean}"
	},
	{
		"start": 145,
		"end": 151,
		"data": "The display label for a metadata tag, or null when it isn't one.\n\n@method  metaLabel\n@param   {string}  flag - The tag as written.\n@return  {string}       - Label, or null."
	},
	{
		"start": 156,
		"end": 169,
		"data": "Rewrites JSDoc's inline link syntax as the markdown Documon already understands.\n\nHandles `{@link target}`, `{@link target|label}`, `{@link target label}`, and the\n`linkcode` / `linkplain` / `tutorial` variants.\n\n@method  inlineLinks\n@param   {string}  text - Text possibly containing inline links.\n@return  {string}       - Text with markdown links.\n@example\n\n\t\taliases.inlineLinks(\"See {@link geo.Circle}.\");\n\t\t// \"See [geo.Circle](geo.Circle).\""
	}
]