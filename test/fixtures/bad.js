/**
 * A fixture with deliberate problems.
 *
 * @module  bad
 * @package fixture
 */

/**
 * Uses a JSDoc tag Documon does not implement.
 *
 * @method  wrong
 * @arg     {string} name - Should be @param.
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
