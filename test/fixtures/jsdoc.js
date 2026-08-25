/**
 * A module written the way a JSDoc-trained writer writes.
 * @module shapes
 * @package geo
 */

/**
 * @description Computes the area.
 * @function area
 * @arg {number} r - Radius.
 * @returns {number} The area.
 * @throws {RangeError} If r is negative.
 * @deprecated Use area2 instead.
 * @since 1.2.0
 */
function area(r){}

/**
 * Union and generic types survive.
 * @method render
 * @param {string|number} id - An id.
 * @param {Array<string>} names - Names.
 * @param {*} anything - Whatever.
 * @param {...number} rest - Rest args.
 */
function render(){}

/**
 * Visibility via access.
 * @prop {boolean} visible
 * @access private
 */
var visible = true;

/**
 * Uses a tag that must not be aliased.
 * @method emitter
 * @fires geo.shapes.change
 */
function emitter(){}
