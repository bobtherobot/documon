[
	{
		"text": "Builds a menu based on a \"menu array\". The menu array must conform to the following structure:\n\n\tvar myMenuData = [\n\t\t{\n\t\t\t\"id\"\t\t: \"foo\", \t\t// Unique ID used to identify a menu list item.\n\t\t\t\"url\"\t\t: \"foo.html\",\t// (optional) The URL to open when the menu item is clicked.\n\t\t\t\"label\"\t\t: \"foo\",\t\t// The display text for the menu item.\n\t\t\t\"kind\"\t\t: \"myCssRule\",\t// The CSS class to apply to the item -- good for including icons!\n\t\t\t\"children\"\t: []\t\t\t// An array of menu item just like this one.\n\t\t}\n\t\t... etc...\n\t];\n\nWhen an item has children, a sub-menu will be constructed as the immediate \"nextSibling\" UL, \nwhich will house all the items within the \"children\" array. Thus, one may have as many sub-menus as needed.\n\nThe menu will be build using the following HTML structure:\n\t\n\t<ul>\n\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t<ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li>\n\t\t</ul>\n\t\t<li>foo</li>\n\t\t<li>foo</li>\n\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t<ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t\t<ul>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t</ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li>\n\t\t</ul>\n\t</ul>\n\n\n\n",
		"start": 7,
		"end": 68,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/menutree/MenuTree.js",
		"flags": [
			{
				"source": "@class MenuTreeMenuTree",
				"flag": "class",
				"after": "MenuTree",
				"afterType": "MenuTree",
				"name": "MenuTree",
				"single": true,
				"text": "MenuTree"
			},
			{
				"source": "@package giesongieson",
				"flag": "package",
				"after": "gieson",
				"afterType": "gieson",
				"name": "gieson",
				"single": true,
				"text": "gieson"
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\n\t// For now, the only action we ping is \"select\"\n\tfunction opHandler(action, item){\n\t\tif(action == \"select\"){\n\t\t\t//con sole.log(item);\n\t\t}\n\n\t}\n\tvar myMenu = new gieson.MenuTree({\n\t\t\t\tcallback : opHandler,\n\t\t\t\tmenuData : MenuData // MenuData should be located on the window object, since it is loaded in via <script src=\"_menuData.js\">\n\t\t});\n\n"
			}
		],
		"source": "Builds a menu based on a \"menu array\". The menu array must conform to the following structure:\n\n\tvar myMenuData = [\n\t\t{\n\t\t\t\"id\"\t\t: \"foo\", \t\t// Unique ID used to identify a menu list item.\n\t\t\t\"url\"\t\t: \"foo.html\",\t// (optional) The URL to open when the menu item is clicked.\n\t\t\t\"label\"\t\t: \"foo\",\t\t// The display text for the menu item.\n\t\t\t\"kind\"\t\t: \"myCssRule\",\t// The CSS class to apply to the item -- good for including icons!\n\t\t\t\"children\"\t: []\t\t\t// An array of menu item just like this one.\n\t\t}\n\t\t... etc...\n\t];\n\nWhen an item has children, a sub-menu will be constructed as the immediate \"nextSibling\" UL, \nwhich will house all the items within the \"children\" array. Thus, one may have as many sub-menus as needed.\n\nThe menu will be build using the following HTML structure:\n\t\n\t<ul>\n\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t<ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li>\n\t\t</ul>\n\t\t<li>foo</li>\n\t\t<li>foo</li>\n\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t<ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t\t<ul>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t</ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li>\n\t\t</ul>\n\t</ul>\n\n\n\n@class MenuTree\n@package gieson\n@example\n\n\t// For now, the only action we ping is \"select\"\n\tfunction opHandler(action, item){\n\t\tif(action == \"select\"){\n\t\t\t//con sole.log(item);\n\t\t}\n\n\t}\n\tvar myMenu = new gieson.MenuTree({\n\t\t\t\tcallback : opHandler,\n\t\t\t\tmenuData : MenuData // MenuData should be located on the window object, since it is loaded in via <script src=\"_menuData.js\">\n\t\t});\n\n",
		"id": "gieson.MenuTree"
	},
	{
		"text": "TODO: We should convert the items we store in the list to a seperate class. For berevity we've just inlined it during development.\nA data store for each menu item. The keys for the listData refer to item ID's. Each item consists of the following:\n\n\t \titem = {\n\t \t\tid\t\t\t// Optional (will be assigned unique one if none)\n\t\t\tchildren\t// A list of other items.\n\t\t\taccess\t\t// Specific to documon\n\t\t\tinherits\t// Specific to documon\n\t\t\tkind\t\t// Applies a CSS class to the item\n\t\t\tlabel\t\t// What the user sees\n\n\t\t\t// This is created and managed by MenuTree\n\t\t\t$mt - {\n\n\t\t\t\t\t\tmiid \t\t// Menu item id.\n\t\t\t\t\t\tliid\t\t// The ID of the actual <li> HTML element created for this item \n\t\t\t\t\t\tulid\t\t// The ID of the parent <ul> element (this LI is a child of this UL)\n\t\t\t\t\t\topen\t\t// (boolean) Current state.\n\t\t\t\t\t\tparentMiid\t// The parent menu item.\n\t\t\t\t\t\topenerid\t// The opener element's ID\n\t\t\t\t\t\tliElem\t\t// The actual <li> element (only stored when interacted with)\n\t\t\t\t\t\tulElem\t\t// The actual parent <ul> element (only stored when interacted with)\n\t\t\t\t\t\topenerElem\t// The actual opener triangle doo-dad element (only stored when interacted with)\n\t\t\t\t\t\tulOriginalDisplay // The source node's original css style.display kind (for open/close so we go back to normal -- defaults to \"block\" when not set in CSS)\n\n\t\t\t}\n\t\t}\n\n\n\n",
		"start": 160,
		"end": 192,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/menutree/MenuTree.js",
		"flags": [
			{
				"source": "@property  {Object} listdata",
				"flag": "property",
				"after": "{Object} listdata",
				"type": "Object",
				"afterType": "listdata",
				"name": "listdata",
				"single": true,
				"text": "listdata"
			}
		],
		"source": "TODO: We should convert the items we store in the list to a seperate class. For berevity we've just inlined it during development.\nA data store for each menu item. The keys for the listData refer to item ID's. Each item consists of the following:\n\n\t \titem = {\n\t \t\tid\t\t\t// Optional (will be assigned unique one if none)\n\t\t\tchildren\t// A list of other items.\n\t\t\taccess\t\t// Specific to documon\n\t\t\tinherits\t// Specific to documon\n\t\t\tkind\t\t// Applies a CSS class to the item\n\t\t\tlabel\t\t// What the user sees\n\n\t\t\t// This is created and managed by MenuTree\n\t\t\t$mt - {\n\n\t\t\t\t\t\tmiid \t\t// Menu item id.\n\t\t\t\t\t\tliid\t\t// The ID of the actual <li> HTML element created for this item \n\t\t\t\t\t\tulid\t\t// The ID of the parent <ul> element (this LI is a child of this UL)\n\t\t\t\t\t\topen\t\t// (boolean) Current state.\n\t\t\t\t\t\tparentMiid\t// The parent menu item.\n\t\t\t\t\t\topenerid\t// The opener element's ID\n\t\t\t\t\t\tliElem\t\t// The actual <li> element (only stored when interacted with)\n\t\t\t\t\t\tulElem\t\t// The actual parent <ul> element (only stored when interacted with)\n\t\t\t\t\t\topenerElem\t// The actual opener triangle doo-dad element (only stored when interacted with)\n\t\t\t\t\t\tulOriginalDisplay // The source node's original css style.display kind (for open/close so we go back to normal -- defaults to \"block\" when not set in CSS)\n\n\t\t\t}\n\t\t}\n\n\n\n@property  {Object} listdata",
		"id": "gieson.MenuTree.listdata"
	},
	{
		"text": "Used to toggle via mouse click. Toggles an item open/closed and prevents any further mouse bubbling.\n\n",
		"start": 197,
		"end": 203,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/menutree/MenuTree.js",
		"flags": [
			{
				"source": "@method  toggleClicktoggleClick",
				"flag": "method",
				"after": "toggleClick",
				"afterType": "toggleClick",
				"name": "toggleClick",
				"single": true,
				"text": "toggleClick"
			},
			{
				"source": "@param   {Event}  evt  - The mouse event object.The mouse event object.",
				"flag": "param",
				"after": "{Event}  evt  - The mouse event object.",
				"type": "Event",
				"afterType": "evt  - The mouse event object.",
				"name": "evt",
				"text": "The mouse event object."
			},
			{
				"source": "@param   {string}  id  - The menu item id.",
				"flag": "param",
				"after": "{string}  id  - The menu item id.",
				"type": "string",
				"afterType": "id  - The menu item id.",
				"name": "id",
				"text": "The menu item id."
			}
		],
		"source": "Used to toggle via mouse click. Toggles an item open/closed and prevents any further mouse bubbling.\n\n@method  toggleClick\n@param   {Event}  evt  - The mouse event object.\n@param   {string}  id  - The menu item id.",
		"id": "gieson.MenuTree.toggleClick"
	},
	{
		"text": "Toggles an item open/closed.\n\n",
		"start": 209,
		"end": 215,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/menutree/MenuTree.js",
		"flags": [
			{
				"source": "@api toggletoggle",
				"flag": "api",
				"after": "toggle",
				"afterType": "toggle",
				"name": "toggle",
				"single": true,
				"text": "toggle",
				"shortText": "toggle",
				"shortHtml": "<p>toggle</p>",
				"html": "<p>toggle</p>"
			},
			{
				"source": "@method  toggletoggle",
				"flag": "method",
				"after": "toggle",
				"afterType": "toggle",
				"name": "toggle",
				"single": true,
				"text": "toggle"
			},
			{
				"source": "@param   {string}  id  - The menu item id.",
				"flag": "param",
				"after": "{string}  id  - The menu item id.",
				"type": "string",
				"afterType": "id  - The menu item id.",
				"name": "id",
				"text": "The menu item id."
			}
		],
		"source": "Toggles an item open/closed.\n\n@api toggle\n@method  toggle\n@param   {string}  id  - The menu item id.",
		"id": "gieson.MenuTree.toggle"
	},
	{
		"text": "Opens and/or highlights an item in the menu when user physically clicks.\n\n",
		"start": 225,
		"end": 231,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/menutree/MenuTree.js",
		"flags": [
			{
				"source": "@method  selectClickselectClick",
				"flag": "method",
				"after": "selectClick",
				"afterType": "selectClick",
				"name": "selectClick",
				"single": true,
				"text": "selectClick"
			},
			{
				"source": "@param   {Event}  evt  - The mouse event object.The mouse event object.",
				"flag": "param",
				"after": "{Event}  evt  - The mouse event object.",
				"type": "Event",
				"afterType": "evt  - The mouse event object.",
				"name": "evt",
				"text": "The mouse event object."
			},
			{
				"source": "@param   {string}  id  - The menu item id.",
				"flag": "param",
				"after": "{string}  id  - The menu item id.",
				"type": "string",
				"afterType": "id  - The menu item id.",
				"name": "id",
				"text": "The menu item id."
			}
		],
		"source": "Opens and/or highlights an item in the menu when user physically clicks.\n\n@method  selectClick\n@param   {Event}  evt  - The mouse event object.\n@param   {string}  id  - The menu item id.",
		"id": "gieson.MenuTree.selectClick"
	},
	{
		"text": "Opens and/or highlights an item in the menu.\n\n",
		"start": 245,
		"end": 251,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/menutree/MenuTree.js",
		"flags": [
			{
				"source": "@api selectselect",
				"flag": "api",
				"after": "select",
				"afterType": "select",
				"name": "select",
				"single": true,
				"text": "select",
				"shortText": "select",
				"shortHtml": "<p>select</p>",
				"html": "<p>select</p>"
			},
			{
				"source": "@method  selectselect",
				"flag": "method",
				"after": "select",
				"afterType": "select",
				"name": "select",
				"single": true,
				"text": "select"
			},
			{
				"source": "@param   {string}  id  - The menu item id.",
				"flag": "param",
				"after": "{string}  id  - The menu item id.",
				"type": "string",
				"afterType": "id  - The menu item id.",
				"name": "id",
				"text": "The menu item id."
			}
		],
		"source": "Opens and/or highlights an item in the menu.\n\n@api select\n@method  select\n@param   {string}  id  - The menu item id.",
		"id": "gieson.MenuTree.select"
	},
	{
		"text": "Opens all decendants of a branch.\n\n",
		"start": 361,
		"end": 370,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/menutree/MenuTree.js",
		"flags": [
			{
				"source": "@api openByIdopenById",
				"flag": "api",
				"after": "openById",
				"afterType": "openById",
				"name": "openById",
				"single": true,
				"text": "openById",
				"shortText": "openById",
				"shortHtml": "<p>openById</p>",
				"html": "<p>openById</p>"
			},
			{
				"source": "@method  openByIdopenById",
				"flag": "method",
				"after": "openById",
				"afterType": "openById",
				"name": "openById",
				"single": true,
				"text": "openById"
			},
			{
				"source": "@param   {string}  \tid  \t\t\t\t\t- The menu item id.The menu item id.",
				"flag": "param",
				"after": "{string}  \tid  \t\t\t\t\t- The menu item id.",
				"type": "string",
				"afterType": "id  \t\t\t\t\t- The menu item id.",
				"name": "id",
				"text": "The menu item id."
			},
			{
				"source": "@param   {boolean}  \t[andSelect=false]  \t\t- Should the item be highlighted?Should the item be highlighted?",
				"flag": "param",
				"after": "{boolean}  \t[andSelect=false]  \t\t- Should the item be highlighted?",
				"type": "boolean",
				"afterType": "[andSelect=false]  \t\t- Should the item be highlighted?",
				"defaultVal": "false]",
				"optional": true,
				"name": "andSelect",
				"text": "Should the item be highlighted?"
			},
			{
				"source": "@param   {boolean}  \t[scrollIntoView=false]  - Should the menu scroll to show the item?Should the menu scroll to show the item?",
				"flag": "param",
				"after": "{boolean}  \t[scrollIntoView=false]  - Should the menu scroll to show the item?",
				"type": "boolean",
				"afterType": "[scrollIntoView=false]  - Should the menu scroll to show the item?",
				"defaultVal": "false]",
				"optional": true,
				"name": "scrollIntoView",
				"text": "Should the menu scroll to show the item?"
			},
			{
				"source": "@returns {object} - The item's source data as provided during init.",
				"flag": "returns",
				"after": "{object} - The item's source data as provided during init.",
				"type": "object",
				"afterType": "The item's source data as provided during init.",
				"text": "The item's source data as provided during init."
			}
		],
		"source": "Opens all decendants of a branch.\n\n@api openById\n@method  openById\n@param   {string}  \tid  \t\t\t\t\t- The menu item id.\n@param   {boolean}  \t[andSelect=false]  \t\t- Should the item be highlighted?\n@param   {boolean}  \t[scrollIntoView=false]  - Should the menu scroll to show the item?\n@returns {object} - The item's source data as provided during init.",
		"id": "gieson.MenuTree.openById"
	},
	{
		"text": "Gets the item's source data as provided during init. Convient way to retrive source data without navigating the source tree becuase we maintain a flat-list cross reference. This methods simply hooks into the cross reference.\n\n",
		"start": 380,
		"end": 387,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/menutree/MenuTree.js",
		"flags": [
			{
				"source": "@api getDataByIdgetDataById",
				"flag": "api",
				"after": "getDataById",
				"afterType": "getDataById",
				"name": "getDataById",
				"single": true,
				"text": "getDataById",
				"shortText": "getDataById",
				"shortHtml": "<p>getDataById</p>",
				"html": "<p>getDataById</p>"
			},
			{
				"source": "@method  getDataByIdgetDataById",
				"flag": "method",
				"after": "getDataById",
				"afterType": "getDataById",
				"name": "getDataById",
				"single": true,
				"text": "getDataById"
			},
			{
				"source": "@param   {string}  \tid  - The menu item id.The menu item id.",
				"flag": "param",
				"after": "{string}  \tid  - The menu item id.",
				"type": "string",
				"afterType": "id  - The menu item id.",
				"name": "id",
				"text": "The menu item id."
			},
			{
				"source": "@returns {object} \t\t- The item's source data as provided during init.",
				"flag": "returns",
				"after": "{object} \t\t- The item's source data as provided during init.",
				"type": "object",
				"afterType": "The item's source data as provided during init.",
				"text": "The item's source data as provided during init."
			}
		],
		"source": "Gets the item's source data as provided during init. Convient way to retrive source data without navigating the source tree becuase we maintain a flat-list cross reference. This methods simply hooks into the cross reference.\n\n@api getDataById\n@method  getDataById\n@param   {string}  \tid  - The menu item id.\n@returns {object} \t\t- The item's source data as provided during init.",
		"id": "gieson.MenuTree.getDataById"
	}
]