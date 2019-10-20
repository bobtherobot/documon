[
	{
		"start": 15,
		"end": 36,
		"data": "Makes a DOM Element draggable. NOTE: This is a stand-alone implementation. The jbeeb.utils.Draggable class is used for jbeeb objects. Whereas this class can be used on any DOM element (outside of jbeeb).\n\n@class Draggable\n@param {Object} params - Configuration settings.\n@param {string | DOM Element} params.target\t\t- The element to move. String = the ID of the element, or send in the DOM element directly.\n@param {function} params.callback\t\t\t\t- A function to ping for each kind of operation. See (callback)[#callback] for details.\t\t\t\n@param {string} params.constrain\t\t\t\t\t- Constrain movement along the \"x\" or \"y\" axis. Both constrain and constrainRect can be used together or independantly.\n@param {Object} params.constrainRect\t\t\t\t- Constrain movement within a rectangle. The rectangle can be any object (including a DisplayObject) that contains the following properties `x, y, width, height`\n@param {number} params.threshold=5\t\t\t\t- The pixel threshold for issuing the \"didMove\" flag on \"end\"\n@param {any} params.arg\t\t\t\t\t\t\t- A custom argument to be delivered to the (callback)[#callback].\n\n@example\n\n\t\tvar myDrag = new documon.Draggable({\n\t\t\t  target\t: obj \n\t\t\t, callback\t: fn\n\t\t\t, constrain\t: \"x\"\n\t\t\t, constrainRect\t: obj\n\t\t\t, threshold : 5\n\t\t});"
	},
	{
		"start": 41,
		"end": 47,
		"data": "Shortcut to set the style position.\n@private \n@method setX\n@param {DOM Element} evt - The element to move.\n@param {number} val - The x position in pixels."
	},
	{
		"start": 52,
		"end": 58,
		"data": "Shortcut to set the style position.\n@private \n@method setY\n@param {DOM Element} evt - The element to move.\n@param {number} val - The y position in pixels."
	},
	{
		"start": 63,
		"end": 70,
		"data": "Shortcut to set the style position.\n@private \n@method setXY\n@param {DOM Element} evt - The element to move.\n@param {number} x - The x position in pixels.\n@param {number} x - The y position in pixels."
	},
	{
		"start": 77,
		"end": 82,
		"data": "Gets the CSS position (releative) of a DOM Element.\n@private \n@method parsePos\n@param {DOM Element} elem - The element"
	},
	{
		"start": 116,
		"end": 119,
		"data": "@private\n@property {DOM Element} _target - The object we're going to drag."
	},
	{
		"start": 122,
		"end": 125,
		"data": "@private\n@property {function} _callback - Configured callback"
	},
	{
		"start": 128,
		"end": 131,
		"data": "@private\n@property {function} _callbackArg - Configured argument to send to the (callback)[#callback]."
	},
	{
		"start": 134,
		"end": 137,
		"data": "@private\n@property {object} _constrain"
	},
	{
		"start": 140,
		"end": 143,
		"data": "@private\n@property {object} _constrainRect"
	},
	{
		"start": 146,
		"end": 149,
		"data": "@private\n@property {object} _startX"
	},
	{
		"start": 153,
		"end": 156,
		"data": "@private\n@property {object} _startY"
	},
	{
		"start": 159,
		"end": 162,
		"data": "@private\n@property {object} _startMouseX"
	},
	{
		"start": 166,
		"end": 169,
		"data": "@private\n@property {object} _startMouseY"
	},
	{
		"start": 172,
		"end": 175,
		"data": "@private\n@property {object} _didMove"
	},
	{
		"start": 179,
		"end": 182,
		"data": "@private\n@property {object} _didMoveFudge"
	},
	{
		"start": 185,
		"end": 188,
		"data": "@private\n@property {object} _didInitMove"
	},
	{
		"start": 191,
		"end": 194,
		"data": "@private\n@property {function} _didMoveThreshold=5 - The pixel threshold for issuing the \"didMove\" flag on \"end\""
	},
	{
		"start": 197,
		"end": 200,
		"data": "@private\n@property {object} _down_bound"
	},
	{
		"start": 204,
		"end": 207,
		"data": "@private\n@property {object} _up_bound"
	},
	{
		"start": 210,
		"end": 213,
		"data": "@private\n@property {object} _move_bound"
	},
	{
		"start": 216,
		"end": 219,
		"data": "@private\n@property {DOM Element} _mask - The overlay masking object used to reject mouse events on underlaying DOM elements."
	},
	{
		"start": 223,
		"end": 228,
		"data": "Initialize\n@protected \n@method init\n@param {object} params - See main class description for details."
	},
	{
		"start": 247,
		"end": 256,
		"data": "The function to ping when an operation occurs.\n@method callback\n@protected\n@param {object} obj - The internal object we use to manage the \n@param {object} pos - An object with the following properties: left, top\n@param {string} kind - The kind of operation that occured. Can be \"start\" | \"end\" | \"move\"\n@param {boolean} didmove - Indicates if the item was simply clicked, or if it was dragged. Only issued when event == \"end\"\n@param {any} arg - The argument that was defined during initialization."
	},
	{
		"start": 262,
		"end": 267,
		"data": "The mouse \"down\" listener function\n@private \n@method _down\n@param {MouseEvent} evt"
	},
	{
		"start": 279,
		"end": 284,
		"data": "A one-time setup to extablish the starting position and create the (mask)[#maks].\n@private \n@method _initMove\n@param {MouseEvent} evt - Transfered from teh \"move\" listener."
	},
	{
		"start": 319,
		"end": 324,
		"data": "The mouse \"move\" listener function\n@private \n@method _move\n@param {MouseEvent} evt"
	},
	{
		"start": 392,
		"end": 397,
		"data": "The mouse \"up\" listener function\n@private \n@method _up\n@param {MouseEvent} evt"
	},
	{
		"start": 420,
		"end": 424,
		"data": "Sets the rectangle used to for the boundaries that the item can move within.\n@method setConstrainRect\n@param {Object} val - An object containing the following properties: `x, y, width, height`. Use \"null\" or no argument to clear contstraint."
	},
	{
		"start": 429,
		"end": 433,
		"data": "Causes the movement to be contrained along the X or Y axis.\n@method setConstrain\n@param {string} val - Use \"x\" or \"y\". Use \"null\" or no argument to clear contstraint."
	},
	{
		"start": 438,
		"end": 441,
		"data": "Destroys and removes listeners.\n@method destroy"
	}
]