
# @optional

Marks a property or method parameter as optional by wrapping the name in square brackets.

	@param {object} [foo]

When the value also has a default, keep the default inside the brackets:

	@param {object} [foo="bar"]

Documon renders an "optional" flag beside the entry. There is also a standalone
`@optional` tag, which does the same thing for the block it appears in:

	/**
	 * @property foo
	 * @type     object
	 * @optional
	 */

See [Optional Values](more.comment_authoring_guide.optional_values).
