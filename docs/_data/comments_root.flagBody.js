[
	{
		"start": 87,
		"end": 99,
		"data": "Recovers the full text a tag carried.\n\n`after` holds everything on the tag's own line; `text` holds the parsed description of\nthat line *plus* any continuation lines appended afterwards. Concatenating them\nduplicates the first line, so take `after` for line one and only the continuations from\n`text`.\n\n@method     flagBody\n@private\n@param      {object}  f - A parsed flag.\n@return     {string}    - The tag's full text."
	},
	{
		"start": 114,
		"end": 128,
		"data": "Post-parse cleanup for tags that don't map one-to-one onto a Documon tag.\n\n- Description tags (`@desc`, `@description`, `@classdesc`, `@fileoverview` ...) have no\n  Documon equivalent because the description is simply the free text above the tags.\n  Their content is folded into that text instead of being thrown away.\n- `@access private` becomes the `@private` flag, and so on.\n- `@const` / `@constant` becomes a read-only `@property`.\n- Metadata tags (`@deprecated`, `@throws`, `@since` ...) are collected onto `meta` so\n  the template can render them, rather than vanishing.\n\n@method     normalize\n@private\n@param      {object}  output - The parsed comment block, modified in place."
	}
]