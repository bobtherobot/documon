/**
 * A fixture with deliberate problems.
 *
 * @module  bad
 * @package fixture
 */

/**
 * Uses a tag Documon does not implement and deliberately does not alias.
 *
 * @method  wrong
 * @typedef {string} NameLike - No type registry to put this in.
 */
function wrong(name){ }

/**
 * Extends something that was never documented.
 *
 * @class   Orphan
 * @extends fixture.DoesNotExist
 */
function Orphan(){ }

/**
 * Has tags but never says what it is.
 *
 * @param {string} x - Nothing will render this.
 */
function nameless(x){ }
