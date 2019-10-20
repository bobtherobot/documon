[
	{
		"start": 7,
		"end": 68,
		"data": "Builds a menu based on a \"menu array\". The menu array must conform to the following structure:\n\n\tvar myMenuData = [\n\t\t{\n\t\t\t\"id\"\t\t: \"foo\", \t\t// Unique ID used to identify a menu list item.\n\t\t\t\"url\"\t\t: \"foo.html\",\t// (optional) The URL to open when the menu item is clicked.\n\t\t\t\"label\"\t\t: \"foo\",\t\t// The display text for the menu item.\n\t\t\t\"kind\"\t\t: \"myCssRule\",\t// The CSS class to apply to the item -- good for including icons!\n\t\t\t\"children\"\t: []\t\t\t// An array of menu item just like this one.\n\t\t}\n\t\t... etc...\n\t];\n\nWhen an item has children, a sub-menu will be constructed as the immediate \"nextSibling\" UL, \nwhich will house all the items within the \"children\" array. Thus, one may have as many sub-menus as needed.\n\nThe menu will be build using the following HTML structure:\n\t\n\t<ul>\n\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t<ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li>\n\t\t</ul>\n\t\t<li>foo</li>\n\t\t<li>foo</li>\n\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t<ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t\t<ul>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t</ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li>\n\t\t</ul>\n\t</ul>\n\n\n\n@class MenuTree\n@package gieson\n@example\n\n\t// For now, the only action we ping is \"select\"\n\tfunction opHandler(action, item){\n\t\tif(action == \"select\"){\n\t\t\t//con sole.log(item);\n\t\t}\n\n\t}\n\tvar myMenu = new gieson.MenuTree({\n\t\t\t\tcallback : opHandler,\n\t\t\t\tmenuData : MenuData // MenuData should be located on the window object, since it is loaded in via <script src=\"_menuData.js\">\n\t\t});\n\n"
	},
	{
		"start": 160,
		"end": 192,
		"data": "TODO: We should convert the items we store in the list to a seperate class. For berevity we've just inlined it during development.\nA data store for each menu item. The keys for the listData refer to item ID's. Each item consists of the following:\n\n\t \titem = {\n\t \t\tid\t\t\t// Optional (will be assigned unique one if none)\n\t\t\tchildren\t// A list of other items.\n\t\t\taccess\t\t// Specific to documon\n\t\t\tinherits\t// Specific to documon\n\t\t\tkind\t\t// Applies a CSS class to the item\n\t\t\tlabel\t\t// What the user sees\n\n\t\t\t// This is created and managed by MenuTree\n\t\t\t$mt - {\n\n\t\t\t\t\t\tmiid \t\t// Menu item id.\n\t\t\t\t\t\tliid\t\t// The ID of the actual <li> HTML element created for this item \n\t\t\t\t\t\tulid\t\t// The ID of the parent <ul> element (this LI is a child of this UL)\n\t\t\t\t\t\topen\t\t// (boolean) Current state.\n\t\t\t\t\t\tparentMiid\t// The parent menu item.\n\t\t\t\t\t\topenerid\t// The opener element's ID\n\t\t\t\t\t\tliElem\t\t// The actual <li> element (only stored when interacted with)\n\t\t\t\t\t\tulElem\t\t// The actual parent <ul> element (only stored when interacted with)\n\t\t\t\t\t\topenerElem\t// The actual opener triangle doo-dad element (only stored when interacted with)\n\t\t\t\t\t\tulOriginalDisplay // The source node's original css style.display kind (for open/close so we go back to normal -- defaults to \"block\" when not set in CSS)\n\n\t\t\t}\n\t\t}\n\n\n\n@property  {Object} listdata"
	},
	{
		"start": 197,
		"end": 203,
		"data": "Used to toggle via mouse click. Toggles an item open/closed and prevents any further mouse bubbling.\n\n@method  toggleClick\n@param   {Event}  evt  - The mouse event object.\n@param   {string}  id  - The menu item id."
	},
	{
		"start": 209,
		"end": 215,
		"data": "Toggles an item open/closed.\n\n@api toggle\n@method  toggle\n@param   {string}  id  - The menu item id."
	},
	{
		"start": 225,
		"end": 231,
		"data": "Opens and/or highlights an item in the menu when user physically clicks.\n\n@method  selectClick\n@param   {Event}  evt  - The mouse event object.\n@param   {string}  id  - The menu item id."
	},
	{
		"start": 245,
		"end": 251,
		"data": "Opens and/or highlights an item in the menu.\n\n@api select\n@method  select\n@param   {string}  id  - The menu item id."
	},
	{
		"start": 361,
		"end": 370,
		"data": "Opens all decendants of a branch.\n\n@api openById\n@method  openById\n@param   {string}  \tid  \t\t\t\t\t- The menu item id.\n@param   {boolean}  \t[andSelect=false]  \t\t- Should the item be highlighted?\n@param   {boolean}  \t[scrollIntoView=false]  - Should the menu scroll to show the item?\n@returns {object} - The item's source data as provided during init."
	},
	{
		"start": 380,
		"end": 387,
		"data": "Gets the item's source data as provided during init. Convient way to retrive source data without navigating the source tree becuase we maintain a flat-list cross reference. This methods simply hooks into the cross reference.\n\n@api getDataById\n@method  getDataById\n@param   {string}  \tid  - The menu item id.\n@returns {object} \t\t- The item's source data as provided during init."
	}
]