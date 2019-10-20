[
	{
		"text": "Makes a DOM Element draggable. NOTE: This is a stand-alone implementation. The jbeeb.utils.Draggable class is used for jbeeb objects. Whereas this class can be used on any DOM element (outside of jbeeb).\n\n",
		"start": 15,
		"end": 36,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@class DraggableDraggable",
				"flag": "class",
				"after": "Draggable",
				"afterType": "Draggable",
				"name": "Draggable",
				"single": true,
				"text": "Draggable"
			},
			{
				"source": "@param {Object} params - Configuration settings.Configuration settings.",
				"flag": "param",
				"after": "{Object} params - Configuration settings.",
				"type": "Object",
				"afterType": "params - Configuration settings.",
				"name": "params",
				"text": "Configuration settings.",
				"children": [
					{
						"source": "@param {string | DOM Element} params.target\t\t- The element to move. String = the ID of the element, or send in the DOM element directly.The element to move. String = the ID of the element, or send in the DOM element directly.",
						"flag": "param",
						"after": "{string | DOM Element} params.target\t\t- The element to move. String = the ID of the element, or send in the DOM element directly.",
						"type": "string | DOM Element",
						"afterType": "params.target\t\t- The element to move. String = the ID of the element, or send in the DOM element directly.",
						"parent": "params",
						"name": "target",
						"text": "The element to move. String = the ID of the element, or send in the DOM element directly."
					},
					{
						"source": "@param {function} params.callback\t\t\t\t- A function to ping for each kind of operation. See (callback)[#callback] for details.A function to ping for each kind of operation. See (callback)[#callback] for details.",
						"flag": "param",
						"after": "{function} params.callback\t\t\t\t- A function to ping for each kind of operation. See (callback)[#callback] for details.",
						"type": "function",
						"afterType": "params.callback\t\t\t\t- A function to ping for each kind of operation. See (callback)[#callback] for details.",
						"parent": "params",
						"name": "callback",
						"text": "A function to ping for each kind of operation. See (callback)[#callback] for details."
					},
					{
						"source": "@param {string} params.constrain\t\t\t\t\t- Constrain movement along the \"x\" or \"y\" axis. Both constrain and constrainRect can be used together or independantly.Constrain movement along the \"x\" or \"y\" axis. Both constrain and constrainRect can be used together or independantly.",
						"flag": "param",
						"after": "{string} params.constrain\t\t\t\t\t- Constrain movement along the \"x\" or \"y\" axis. Both constrain and constrainRect can be used together or independantly.",
						"type": "string",
						"afterType": "params.constrain\t\t\t\t\t- Constrain movement along the \"x\" or \"y\" axis. Both constrain and constrainRect can be used together or independantly.",
						"parent": "params",
						"name": "constrain",
						"text": "Constrain movement along the \"x\" or \"y\" axis. Both constrain and constrainRect can be used together or independantly."
					},
					{
						"source": "@param {Object} params.constrainRect\t\t\t\t- Constrain movement within a rectangle. The rectangle can be any object (including a DisplayObject) that contains the following properties `x, y, width, height`Constrain movement within a rectangle. The rectangle can be any object (including a DisplayObject) that contains the following properties `x, y, width, height`",
						"flag": "param",
						"after": "{Object} params.constrainRect\t\t\t\t- Constrain movement within a rectangle. The rectangle can be any object (including a DisplayObject) that contains the following properties `x, y, width, height`",
						"type": "Object",
						"afterType": "params.constrainRect\t\t\t\t- Constrain movement within a rectangle. The rectangle can be any object (including a DisplayObject) that contains the following properties `x, y, width, height`",
						"parent": "params",
						"name": "constrainRect",
						"text": "Constrain movement within a rectangle. The rectangle can be any object (including a DisplayObject) that contains the following properties `x, y, width, height`"
					},
					{
						"source": "@param {number} params.threshold=5\t\t\t\t- The pixel threshold for issuing the \"didMove\" flag on \"end\"The pixel threshold for issuing the \"didMove\" flag on \"end\"",
						"flag": "param",
						"after": "{number} params.threshold=5\t\t\t\t- The pixel threshold for issuing the \"didMove\" flag on \"end\"",
						"type": "number",
						"afterType": "params.threshold=5\t\t\t\t- The pixel threshold for issuing the \"didMove\" flag on \"end\"",
						"defaultVal": "5",
						"parent": "params",
						"name": "threshold",
						"text": "The pixel threshold for issuing the \"didMove\" flag on \"end\""
					},
					{
						"source": "@param {any} params.arg\t\t\t\t\t\t\t- A custom argument to be delivered to the (callback)[#callback].A custom argument to be delivered to the (callback)[#callback].\n",
						"flag": "param",
						"after": "{any} params.arg\t\t\t\t\t\t\t- A custom argument to be delivered to the (callback)[#callback].",
						"type": "any",
						"afterType": "params.arg\t\t\t\t\t\t\t- A custom argument to be delivered to the (callback)[#callback].",
						"parent": "params",
						"name": "arg",
						"text": "A custom argument to be delivered to the (callback)[#callback].\n"
					}
				]
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\n\t\tvar myDrag = new documon.Draggable({\n\t\t\t  target\t: obj \n\t\t\t, callback\t: fn\n\t\t\t, constrain\t: \"x\"\n\t\t\t, constrainRect\t: obj\n\t\t\t, threshold : 5\n\t\t});"
			}
		],
		"source": "Makes a DOM Element draggable. NOTE: This is a stand-alone implementation. The jbeeb.utils.Draggable class is used for jbeeb objects. Whereas this class can be used on any DOM element (outside of jbeeb).\n\n@class Draggable\n@param {Object} params - Configuration settings.\n@param {string | DOM Element} params.target\t\t- The element to move. String = the ID of the element, or send in the DOM element directly.\n@param {function} params.callback\t\t\t\t- A function to ping for each kind of operation. See (callback)[#callback] for details.\t\t\t\n@param {string} params.constrain\t\t\t\t\t- Constrain movement along the \"x\" or \"y\" axis. Both constrain and constrainRect can be used together or independantly.\n@param {Object} params.constrainRect\t\t\t\t- Constrain movement within a rectangle. The rectangle can be any object (including a DisplayObject) that contains the following properties `x, y, width, height`\n@param {number} params.threshold=5\t\t\t\t- The pixel threshold for issuing the \"didMove\" flag on \"end\"\n@param {any} params.arg\t\t\t\t\t\t\t- A custom argument to be delivered to the (callback)[#callback].\n\n@example\n\n\t\tvar myDrag = new documon.Draggable({\n\t\t\t  target\t: obj \n\t\t\t, callback\t: fn\n\t\t\t, constrain\t: \"x\"\n\t\t\t, constrainRect\t: obj\n\t\t\t, threshold : 5\n\t\t});",
		"id": "root.Draggable"
	},
	{
		"text": "Shortcut to set the style position.\n",
		"start": 41,
		"end": 47,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@method setXsetX",
				"flag": "method",
				"after": "setX",
				"afterType": "setX",
				"name": "setX",
				"single": true,
				"text": "setX"
			},
			{
				"source": "@param {DOM Element} evt - The element to move.The element to move.",
				"flag": "param",
				"after": "{DOM Element} evt - The element to move.",
				"type": "DOM Element",
				"afterType": "evt - The element to move.",
				"name": "evt",
				"text": "The element to move."
			},
			{
				"source": "@param {number} val - The x position in pixels.",
				"flag": "param",
				"after": "{number} val - The x position in pixels.",
				"type": "number",
				"afterType": "val - The x position in pixels.",
				"name": "val",
				"text": "The x position in pixels."
			}
		],
		"source": "Shortcut to set the style position.\n@private \n@method setX\n@param {DOM Element} evt - The element to move.\n@param {number} val - The x position in pixels.",
		"id": "root.Draggable.setX"
	},
	{
		"text": "Shortcut to set the style position.\n",
		"start": 52,
		"end": 58,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@method setYsetY",
				"flag": "method",
				"after": "setY",
				"afterType": "setY",
				"name": "setY",
				"single": true,
				"text": "setY"
			},
			{
				"source": "@param {DOM Element} evt - The element to move.The element to move.",
				"flag": "param",
				"after": "{DOM Element} evt - The element to move.",
				"type": "DOM Element",
				"afterType": "evt - The element to move.",
				"name": "evt",
				"text": "The element to move."
			},
			{
				"source": "@param {number} val - The y position in pixels.",
				"flag": "param",
				"after": "{number} val - The y position in pixels.",
				"type": "number",
				"afterType": "val - The y position in pixels.",
				"name": "val",
				"text": "The y position in pixels."
			}
		],
		"source": "Shortcut to set the style position.\n@private \n@method setY\n@param {DOM Element} evt - The element to move.\n@param {number} val - The y position in pixels.",
		"id": "root.Draggable.setY"
	},
	{
		"text": "Shortcut to set the style position.\n",
		"start": 63,
		"end": 70,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@method setXYsetXY",
				"flag": "method",
				"after": "setXY",
				"afterType": "setXY",
				"name": "setXY",
				"single": true,
				"text": "setXY"
			},
			{
				"source": "@param {DOM Element} evt - The element to move.The element to move.",
				"flag": "param",
				"after": "{DOM Element} evt - The element to move.",
				"type": "DOM Element",
				"afterType": "evt - The element to move.",
				"name": "evt",
				"text": "The element to move."
			},
			{
				"source": "@param {number} x - The x position in pixels.The x position in pixels.",
				"flag": "param",
				"after": "{number} x - The x position in pixels.",
				"type": "number",
				"afterType": "x - The x position in pixels.",
				"name": "x",
				"text": "The x position in pixels."
			},
			{
				"source": "@param {number} x - The y position in pixels.",
				"flag": "param",
				"after": "{number} x - The y position in pixels.",
				"type": "number",
				"afterType": "x - The y position in pixels.",
				"name": "x",
				"text": "The y position in pixels."
			}
		],
		"source": "Shortcut to set the style position.\n@private \n@method setXY\n@param {DOM Element} evt - The element to move.\n@param {number} x - The x position in pixels.\n@param {number} x - The y position in pixels.",
		"id": "root.Draggable.setXY"
	},
	{
		"text": "Gets the CSS position (releative) of a DOM Element.\n",
		"start": 77,
		"end": 82,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@method parsePosparsePos",
				"flag": "method",
				"after": "parsePos",
				"afterType": "parsePos",
				"name": "parsePos",
				"single": true,
				"text": "parsePos"
			},
			{
				"source": "@param {DOM Element} elem - The element",
				"flag": "param",
				"after": "{DOM Element} elem - The element",
				"type": "DOM Element",
				"afterType": "elem - The element",
				"name": "elem",
				"text": "The element"
			}
		],
		"source": "Gets the CSS position (releative) of a DOM Element.\n@private \n@method parsePos\n@param {DOM Element} elem - The element",
		"id": "root.Draggable.parsePos"
	},
	{
		"text": "",
		"start": 116,
		"end": 119,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {DOM Element} _target - The object we're going to drag.",
				"flag": "property",
				"after": "{DOM Element} _target - The object we're going to drag.",
				"type": "DOM Element",
				"afterType": "_target - The object we're going to drag.",
				"name": "_target",
				"text": "The object we're going to drag."
			}
		],
		"source": "@private\n@property {DOM Element} _target - The object we're going to drag.",
		"id": "root.Draggable._target"
	},
	{
		"text": "",
		"start": 122,
		"end": 125,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {function} _callback - Configured callback",
				"flag": "property",
				"after": "{function} _callback - Configured callback",
				"type": "function",
				"afterType": "_callback - Configured callback",
				"name": "_callback",
				"text": "Configured callback"
			}
		],
		"source": "@private\n@property {function} _callback - Configured callback",
		"id": "root.Draggable._callback"
	},
	{
		"text": "",
		"start": 128,
		"end": 131,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {function} _callbackArg - Configured argument to send to the (callback)[#callback].",
				"flag": "property",
				"after": "{function} _callbackArg - Configured argument to send to the (callback)[#callback].",
				"type": "function",
				"afterType": "_callbackArg - Configured argument to send to the (callback)[#callback].",
				"name": "_callbackArg",
				"text": "Configured argument to send to the (callback)[#callback]."
			}
		],
		"source": "@private\n@property {function} _callbackArg - Configured argument to send to the (callback)[#callback].",
		"id": "root.Draggable._callbackArg"
	},
	{
		"text": "",
		"start": 134,
		"end": 137,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _constrain",
				"flag": "property",
				"after": "{object} _constrain",
				"type": "object",
				"afterType": "_constrain",
				"name": "_constrain",
				"single": true,
				"text": "_constrain"
			}
		],
		"source": "@private\n@property {object} _constrain",
		"id": "root.Draggable._constrain"
	},
	{
		"text": "",
		"start": 140,
		"end": 143,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _constrainRect",
				"flag": "property",
				"after": "{object} _constrainRect",
				"type": "object",
				"afterType": "_constrainRect",
				"name": "_constrainRect",
				"single": true,
				"text": "_constrainRect"
			}
		],
		"source": "@private\n@property {object} _constrainRect",
		"id": "root.Draggable._constrainRect"
	},
	{
		"text": "",
		"start": 146,
		"end": 149,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _startX",
				"flag": "property",
				"after": "{object} _startX",
				"type": "object",
				"afterType": "_startX",
				"name": "_startX",
				"single": true,
				"text": "_startX"
			}
		],
		"source": "@private\n@property {object} _startX",
		"id": "root.Draggable._startX"
	},
	{
		"text": "",
		"start": 153,
		"end": 156,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _startY",
				"flag": "property",
				"after": "{object} _startY",
				"type": "object",
				"afterType": "_startY",
				"name": "_startY",
				"single": true,
				"text": "_startY"
			}
		],
		"source": "@private\n@property {object} _startY",
		"id": "root.Draggable._startY"
	},
	{
		"text": "",
		"start": 159,
		"end": 162,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _startMouseX",
				"flag": "property",
				"after": "{object} _startMouseX",
				"type": "object",
				"afterType": "_startMouseX",
				"name": "_startMouseX",
				"single": true,
				"text": "_startMouseX"
			}
		],
		"source": "@private\n@property {object} _startMouseX",
		"id": "root.Draggable._startMouseX"
	},
	{
		"text": "",
		"start": 166,
		"end": 169,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _startMouseY",
				"flag": "property",
				"after": "{object} _startMouseY",
				"type": "object",
				"afterType": "_startMouseY",
				"name": "_startMouseY",
				"single": true,
				"text": "_startMouseY"
			}
		],
		"source": "@private\n@property {object} _startMouseY",
		"id": "root.Draggable._startMouseY"
	},
	{
		"text": "",
		"start": 172,
		"end": 175,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _didMove",
				"flag": "property",
				"after": "{object} _didMove",
				"type": "object",
				"afterType": "_didMove",
				"name": "_didMove",
				"single": true,
				"text": "_didMove"
			}
		],
		"source": "@private\n@property {object} _didMove",
		"id": "root.Draggable._didMove"
	},
	{
		"text": "",
		"start": 179,
		"end": 182,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _didMoveFudge",
				"flag": "property",
				"after": "{object} _didMoveFudge",
				"type": "object",
				"afterType": "_didMoveFudge",
				"name": "_didMoveFudge",
				"single": true,
				"text": "_didMoveFudge"
			}
		],
		"source": "@private\n@property {object} _didMoveFudge",
		"id": "root.Draggable._didMoveFudge"
	},
	{
		"text": "",
		"start": 185,
		"end": 188,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _didInitMove",
				"flag": "property",
				"after": "{object} _didInitMove",
				"type": "object",
				"afterType": "_didInitMove",
				"name": "_didInitMove",
				"single": true,
				"text": "_didInitMove"
			}
		],
		"source": "@private\n@property {object} _didInitMove",
		"id": "root.Draggable._didInitMove"
	},
	{
		"text": "",
		"start": 191,
		"end": 194,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {function} _didMoveThreshold=5 - The pixel threshold for issuing the \"didMove\" flag on \"end\"",
				"flag": "property",
				"after": "{function} _didMoveThreshold=5 - The pixel threshold for issuing the \"didMove\" flag on \"end\"",
				"type": "function",
				"afterType": "_didMoveThreshold=5 - The pixel threshold for issuing the \"didMove\" flag on \"end\"",
				"defaultVal": "5",
				"name": "_didMoveThreshold",
				"text": "The pixel threshold for issuing the \"didMove\" flag on \"end\""
			}
		],
		"source": "@private\n@property {function} _didMoveThreshold=5 - The pixel threshold for issuing the \"didMove\" flag on \"end\"",
		"id": "root.Draggable._didMoveThreshold"
	},
	{
		"text": "",
		"start": 197,
		"end": 200,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _down_bound",
				"flag": "property",
				"after": "{object} _down_bound",
				"type": "object",
				"afterType": "_down_bound",
				"name": "_down_bound",
				"single": true,
				"text": "_down_bound"
			}
		],
		"source": "@private\n@property {object} _down_bound",
		"id": "root.Draggable._down_bound"
	},
	{
		"text": "",
		"start": 204,
		"end": 207,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _up_bound",
				"flag": "property",
				"after": "{object} _up_bound",
				"type": "object",
				"afterType": "_up_bound",
				"name": "_up_bound",
				"single": true,
				"text": "_up_bound"
			}
		],
		"source": "@private\n@property {object} _up_bound",
		"id": "root.Draggable._up_bound"
	},
	{
		"text": "",
		"start": 210,
		"end": 213,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {object} _move_bound",
				"flag": "property",
				"after": "{object} _move_bound",
				"type": "object",
				"afterType": "_move_bound",
				"name": "_move_bound",
				"single": true,
				"text": "_move_bound"
			}
		],
		"source": "@private\n@property {object} _move_bound",
		"id": "root.Draggable._move_bound"
	},
	{
		"text": "",
		"start": 216,
		"end": 219,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@property {DOM Element} _mask - The overlay masking object used to reject mouse events on underlaying DOM elements.",
				"flag": "property",
				"after": "{DOM Element} _mask - The overlay masking object used to reject mouse events on underlaying DOM elements.",
				"type": "DOM Element",
				"afterType": "_mask - The overlay masking object used to reject mouse events on underlaying DOM elements.",
				"name": "_mask",
				"text": "The overlay masking object used to reject mouse events on underlaying DOM elements."
			}
		],
		"source": "@private\n@property {DOM Element} _mask - The overlay masking object used to reject mouse events on underlaying DOM elements.",
		"id": "root.Draggable._mask"
	},
	{
		"text": "Initialize\n",
		"start": 223,
		"end": 228,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@protected",
				"flag": "protected",
				"after": ""
			},
			{
				"source": "@method initinit",
				"flag": "method",
				"after": "init",
				"afterType": "init",
				"name": "init",
				"single": true,
				"text": "init"
			},
			{
				"source": "@param {object} params - See main class description for details.",
				"flag": "param",
				"after": "{object} params - See main class description for details.",
				"type": "object",
				"afterType": "params - See main class description for details.",
				"name": "params",
				"text": "See main class description for details."
			}
		],
		"source": "Initialize\n@protected \n@method init\n@param {object} params - See main class description for details.",
		"id": "root.Draggable.init"
	},
	{
		"text": "The function to ping when an operation occurs.\n",
		"start": 247,
		"end": 256,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@method callbackcallback",
				"flag": "method",
				"after": "callback",
				"afterType": "callback",
				"name": "callback",
				"single": true,
				"text": "callback"
			},
			{
				"source": "@protected",
				"flag": "protected",
				"after": ""
			},
			{
				"source": "@param {object} obj - The internal object we use to manage theThe internal object we use to manage the",
				"flag": "param",
				"after": "{object} obj - The internal object we use to manage the",
				"type": "object",
				"afterType": "obj - The internal object we use to manage the",
				"name": "obj",
				"text": "The internal object we use to manage the"
			},
			{
				"source": "@param {object} pos - An object with the following properties: left, topAn object with the following properties: left, top",
				"flag": "param",
				"after": "{object} pos - An object with the following properties: left, top",
				"type": "object",
				"afterType": "pos - An object with the following properties: left, top",
				"name": "pos",
				"text": "An object with the following properties: left, top"
			},
			{
				"source": "@param {string} kind - The kind of operation that occured. Can be \"start\" | \"end\" | \"move\"The kind of operation that occured. Can be \"start\" | \"end\" | \"move\"",
				"flag": "param",
				"after": "{string} kind - The kind of operation that occured. Can be \"start\" | \"end\" | \"move\"",
				"type": "string",
				"afterType": "kind - The kind of operation that occured. Can be \"start\" | \"end\" | \"move\"",
				"name": "kind",
				"text": "The kind of operation that occured. Can be \"start\" | \"end\" | \"move\""
			},
			{
				"source": "@param {boolean} didmove - Indicates if the item was simply clicked, or if it was dragged. Only issued when event == \"end\"Indicates if the item was simply clicked, or if it was dragged. Only issued when event == \"end\"",
				"flag": "param",
				"after": "{boolean} didmove - Indicates if the item was simply clicked, or if it was dragged. Only issued when event == \"end\"",
				"type": "boolean",
				"afterType": "didmove - Indicates if the item was simply clicked, or if it was dragged. Only issued when event == \"end\"",
				"name": "didmove",
				"text": "Indicates if the item was simply clicked, or if it was dragged. Only issued when event == \"end\""
			},
			{
				"source": "@param {any} arg - The argument that was defined during initialization.",
				"flag": "param",
				"after": "{any} arg - The argument that was defined during initialization.",
				"type": "any",
				"afterType": "arg - The argument that was defined during initialization.",
				"name": "arg",
				"text": "The argument that was defined during initialization."
			}
		],
		"source": "The function to ping when an operation occurs.\n@method callback\n@protected\n@param {object} obj - The internal object we use to manage the \n@param {object} pos - An object with the following properties: left, top\n@param {string} kind - The kind of operation that occured. Can be \"start\" | \"end\" | \"move\"\n@param {boolean} didmove - Indicates if the item was simply clicked, or if it was dragged. Only issued when event == \"end\"\n@param {any} arg - The argument that was defined during initialization.",
		"id": "root.Draggable.callback"
	},
	{
		"text": "The mouse \"down\" listener function\n",
		"start": 262,
		"end": 267,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@method _down_down",
				"flag": "method",
				"after": "_down",
				"afterType": "_down",
				"name": "_down",
				"single": true,
				"text": "_down"
			},
			{
				"source": "@param {MouseEvent} evt",
				"flag": "param",
				"after": "{MouseEvent} evt",
				"type": "MouseEvent",
				"afterType": "evt",
				"name": "evt",
				"single": true,
				"text": "evt"
			}
		],
		"source": "The mouse \"down\" listener function\n@private \n@method _down\n@param {MouseEvent} evt",
		"id": "root.Draggable._down"
	},
	{
		"text": "A one-time setup to extablish the starting position and create the (mask)[#maks].\n",
		"start": 279,
		"end": 284,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@method _initMove_initMove",
				"flag": "method",
				"after": "_initMove",
				"afterType": "_initMove",
				"name": "_initMove",
				"single": true,
				"text": "_initMove"
			},
			{
				"source": "@param {MouseEvent} evt - Transfered from teh \"move\" listener.",
				"flag": "param",
				"after": "{MouseEvent} evt - Transfered from teh \"move\" listener.",
				"type": "MouseEvent",
				"afterType": "evt - Transfered from teh \"move\" listener.",
				"name": "evt",
				"text": "Transfered from teh \"move\" listener."
			}
		],
		"source": "A one-time setup to extablish the starting position and create the (mask)[#maks].\n@private \n@method _initMove\n@param {MouseEvent} evt - Transfered from teh \"move\" listener.",
		"id": "root.Draggable._initMove"
	},
	{
		"text": "The mouse \"move\" listener function\n",
		"start": 319,
		"end": 324,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@method _move_move",
				"flag": "method",
				"after": "_move",
				"afterType": "_move",
				"name": "_move",
				"single": true,
				"text": "_move"
			},
			{
				"source": "@param {MouseEvent} evt",
				"flag": "param",
				"after": "{MouseEvent} evt",
				"type": "MouseEvent",
				"afterType": "evt",
				"name": "evt",
				"single": true,
				"text": "evt"
			}
		],
		"source": "The mouse \"move\" listener function\n@private \n@method _move\n@param {MouseEvent} evt",
		"id": "root.Draggable._move"
	},
	{
		"text": "The mouse \"up\" listener function\n",
		"start": 392,
		"end": 397,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@method _up_up",
				"flag": "method",
				"after": "_up",
				"afterType": "_up",
				"name": "_up",
				"single": true,
				"text": "_up"
			},
			{
				"source": "@param {MouseEvent} evt",
				"flag": "param",
				"after": "{MouseEvent} evt",
				"type": "MouseEvent",
				"afterType": "evt",
				"name": "evt",
				"single": true,
				"text": "evt"
			}
		],
		"source": "The mouse \"up\" listener function\n@private \n@method _up\n@param {MouseEvent} evt",
		"id": "root.Draggable._up"
	},
	{
		"text": "Sets the rectangle used to for the boundaries that the item can move within.\n",
		"start": 420,
		"end": 424,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@method setConstrainRectsetConstrainRect",
				"flag": "method",
				"after": "setConstrainRect",
				"afterType": "setConstrainRect",
				"name": "setConstrainRect",
				"single": true,
				"text": "setConstrainRect"
			},
			{
				"source": "@param {Object} val - An object containing the following properties: `x, y, width, height`. Use \"null\" or no argument to clear contstraint.",
				"flag": "param",
				"after": "{Object} val - An object containing the following properties: `x, y, width, height`. Use \"null\" or no argument to clear contstraint.",
				"type": "Object",
				"afterType": "val - An object containing the following properties: `x, y, width, height`. Use \"null\" or no argument to clear contstraint.",
				"name": "val",
				"text": "An object containing the following properties: `x, y, width, height`. Use \"null\" or no argument to clear contstraint."
			}
		],
		"source": "Sets the rectangle used to for the boundaries that the item can move within.\n@method setConstrainRect\n@param {Object} val - An object containing the following properties: `x, y, width, height`. Use \"null\" or no argument to clear contstraint.",
		"id": "root.Draggable.setConstrainRect"
	},
	{
		"text": "Causes the movement to be contrained along the X or Y axis.\n",
		"start": 429,
		"end": 433,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@method setConstrainsetConstrain",
				"flag": "method",
				"after": "setConstrain",
				"afterType": "setConstrain",
				"name": "setConstrain",
				"single": true,
				"text": "setConstrain"
			},
			{
				"source": "@param {string} val - Use \"x\" or \"y\". Use \"null\" or no argument to clear contstraint.",
				"flag": "param",
				"after": "{string} val - Use \"x\" or \"y\". Use \"null\" or no argument to clear contstraint.",
				"type": "string",
				"afterType": "val - Use \"x\" or \"y\". Use \"null\" or no argument to clear contstraint.",
				"name": "val",
				"text": "Use \"x\" or \"y\". Use \"null\" or no argument to clear contstraint."
			}
		],
		"source": "Causes the movement to be contrained along the X or Y axis.\n@method setConstrain\n@param {string} val - Use \"x\" or \"y\". Use \"null\" or no argument to clear contstraint.",
		"id": "root.Draggable.setConstrain"
	},
	{
		"text": "Destroys and removes listeners.\n",
		"start": 438,
		"end": 441,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Draggable.js",
		"flags": [
			{
				"source": "@method destroy",
				"flag": "method",
				"after": "destroy",
				"afterType": "destroy",
				"name": "destroy",
				"single": true,
				"text": "destroy"
			}
		],
		"source": "Destroys and removes listeners.\n@method destroy",
		"id": "root.Draggable.destroy"
	}
]