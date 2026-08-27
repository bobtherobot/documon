/*
A fixture library, written the way the README tells people to write one.
Nothing here is real code -- Documon reads only the comments.
*/

/**
 * The base widget every control derives from.
 *
 * Widgets own a **label** and can be shown or hidden.
 *
 * @class   Widget
 * @package acme
 * @see     acme.Button
 */
function Widget(label){ this.label = label; }

/**
 * Draws the widget.
 *
 * @method  draw
 * @param   {object}  opts          - Drawing options.
 * @param   {number}  [opts.depth=1] - How many levels to draw.
 * @param   {boolean} [opts.force]   - Draw even when hidden.
 * @return  {boolean}                - True when anything was drawn.
 * @example
 *
 * 		widget.draw({ depth : 2 });
 */
Widget.prototype.draw = function(opts){};

/**
 * Hides the widget.
 *
 * @method     hide
 * @protected
 * @deprecated Use visible instead.
 * @since      2.0.0
 */
Widget.prototype.hide = function(){};

/**
 * Whether the widget is currently visible.
 *
 * @property {boolean} visible=true
 */
Widget.prototype.visible = true;

/**
 * Fired after the widget is drawn.
 *
 * @event drawn
 */
