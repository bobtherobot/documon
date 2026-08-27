
# @requires

Lists a dependency that a class or module needs in order to run. It appears in the page's
"meta" section rather than as a member.

	/**
	 * @class    Player
	 * @package  media
	 * @requires media.Codec
	 * @requires media.audio.Buffer
	 */

Use as many `@requires` tags as you need -- each one becomes its own entry, linked to the
named entity. The value is treated as an id, so use the fully qualified `package.Class`
form for anything outside the current package.
