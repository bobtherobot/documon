/**
 * A clickable button.
 *
 * Inherits everything from [Widget](acme.Widget).
 *
 * @class    Button
 * @package  acme
 * @extends  acme.Widget
 * @requires acme.Widget
 */
function Button(label){}

/**
 * Clicks the button.
 *
 * @method  click
 * @param   {number} [times=1] - How many times.
 * @return  {number}           - The new click count.
 */
Button.prototype.click = function(times){};

/**
 * Draws the button. Overrides the base implementation.
 *
 * @method  draw
 * @param   {object} opts - Drawing options.
 * @return  {boolean}     - True when anything was drawn.
 */
Button.prototype.draw = function(opts){};
