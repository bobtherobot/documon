
# @property

There are 2 ways to define properties, using the traditional JavaDoc style, or using Documon's "quick prop" one-liner. It all depends on how robust you wish to be.

Since Documon relies soley on @tags within comments, each property needs to be registered manually using the @property tag.

### Example

	/** 
	 * The width of the display object's bounding box.
	 * @property width
	 * @type Number
	 * @default 0
	 **/
	p.width = 0;

Above, we used a pretty robust definition, which is great but slow. Here are a few things that make documenting a little easier.

Set the default value by attaching an equal sign + value:

	/** 
	 * The width of the display object's bounding box.
	 * @property width=0
	 * @type Number
	 **/
	p.width = 0;

#### Use the Quick Prop One Liner

Or one-liner #1 - name after {type}

	/**
	 * @property {object} width=0 - The width of the display object's bounding box.
	 */
	p.width = 0;


Or one-liner #2 - name before {type} (unconventional, but seems more logical to me?)

	/**
	 * @property width=0 {object} - The width of the display object's bounding box.
	 */
	p.width = 0;


### Default Values

See [Default Values](more.writing_comments.default_values)
