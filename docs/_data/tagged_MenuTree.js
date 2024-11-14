{
	"line": 69,
	"name": "MenuTree",
	"shortText": "Builds a menu based on a \"menu array\". The menu array must conform to the following structure:",
	"shortHtml": "<p>Builds a menu based on a \"menu array\". The menu array must conform to the following structure:</p>",
	"text": "Builds a menu based on a \"menu array\". The menu array must conform to the following structure:\n\n\tvar myMenuData = [\n\t\t{\n\t\t\t\"id\"\t\t: \"foo\", \t\t// Unique ID used to identify a menu list item.\n\t\t\t\"url\"\t\t: \"foo.html\",\t// (optional) The URL to open when the menu item is clicked.\n\t\t\t\"label\"\t\t: \"foo\",\t\t// The display text for the menu item.\n\t\t\t\"kind\"\t\t: \"myCssRule\",\t// The CSS class to apply to the item -- good for including icons!\n\t\t\t\"children\"\t: []\t\t\t// An array of menu item just like this one.\n\t\t}\n\t\t... etc...\n\t];\n\nWhen an item has children, a sub-menu will be constructed as the immediate \"nextSibling\" UL, \nwhich will house all the items within the \"children\" array. Thus, one may have as many sub-menus as needed.\n\nThe menu will be build using the following HTML structure:\n\t\n\t<ul>\n\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t<ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li>\n\t\t</ul>\n\t\t<li>foo</li>\n\t\t<li>foo</li>\n\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t<ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li> <-- opener - used to open/close the next immediate sibling UL\n\t\t\t<ul>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t\t<li>foo</li>\n\t\t\t</ul>\n\t\t\t<li>foo</li>\n\t\t\t<li>foo</li>\n\t\t</ul>\n\t</ul>\n\n\n\n",
	"html": "<p>Builds a menu based on a \"menu array\". The menu array must conform to the following structure:</p>\n<pre><code>var myMenuData = [\n    {\n        \"id\"        : \"foo\",        // Unique ID used to identify a menu list item.\n        \"url\"       : \"foo.html\",   // (optional) The URL to open when the menu item is clicked.\n        \"label\"     : \"foo\",        // The display text for the menu item.\n        \"kind\"      : \"myCssRule\",  // The CSS class to apply to the item -- good for including icons!\n        \"children\"  : []            // An array of menu item just like this one.\n    }\n    ... etc...\n];\n</code></pre>\n<p>When an item has children, a sub-menu will be constructed as the immediate \"nextSibling\" UL, \nwhich will house all the items within the \"children\" array. Thus, one may have as many sub-menus as needed.</p>\n<p>The menu will be build using the following HTML structure:</p>\n<pre><code>&lt;ul&gt;\n    &lt;li&gt;foo&lt;/li&gt; &lt;-- opener - used to open/close the next immediate sibling UL\n    &lt;ul&gt;\n        &lt;li&gt;foo&lt;/li&gt;\n        &lt;li&gt;foo&lt;/li&gt;\n    &lt;/ul&gt;\n    &lt;li&gt;foo&lt;/li&gt;\n    &lt;li&gt;foo&lt;/li&gt;\n    &lt;li&gt;foo&lt;/li&gt; &lt;-- opener - used to open/close the next immediate sibling UL\n    &lt;ul&gt;\n        &lt;li&gt;foo&lt;/li&gt;\n        &lt;li&gt;foo&lt;/li&gt; &lt;-- opener - used to open/close the next immediate sibling UL\n        &lt;ul&gt;\n            &lt;li&gt;foo&lt;/li&gt;\n            &lt;li&gt;foo&lt;/li&gt;\n            &lt;li&gt;foo&lt;/li&gt;\n            &lt;li&gt;foo&lt;/li&gt;\n        &lt;/ul&gt;\n        &lt;li&gt;foo&lt;/li&gt;\n        &lt;li&gt;foo&lt;/li&gt;\n    &lt;/ul&gt;\n&lt;/ul&gt;\n</code></pre>",
	"entity": "class",
	"flagSearchText": " MenuTree gieson \n\n\t// For now, the only action we ping is \"select\"\n\tfunction opHandler(action, item){\n\t\tif(action == \"select\"){\n\t\t\t//con sole.log(item);\n\t\t}\n\n\t}\n\tvar myMenu = new gieson.MenuTree({\n\t\t\t\tcallback : opHandler,\n\t\t\t\tmenuData : MenuData // MenuData should be located on the window object, since it is loaded in via <script src=\"_menuData.js\">\n\t\t});\n\n",
	"package": "gieson",
	"example": [
		{
			"text": "\n\n\t// For now, the only action we ping is \"select\"\n\tfunction opHandler(action, item){\n\t\tif(action == \"select\"){\n\t\t\t//con sole.log(item);\n\t\t}\n\n\t}\n\tvar myMenu = new gieson.MenuTree({\n\t\t\t\tcallback : opHandler,\n\t\t\t\tmenuData : MenuData // MenuData should be located on the window object, since it is loaded in via <script src=\"_menuData.js\">\n\t\t});\n\n",
			"html": "<pre><code>// For now, the only action we ping is \"select\"\nfunction opHandler(action, item){\n    if(action == \"select\"){\n        //con sole.log(item);\n    }\n\n}\nvar myMenu = new gieson.MenuTree({\n            callback : opHandler,\n            menuData : MenuData // MenuData should be located on the window object, since it is loaded in via &lt;script src=\"_menuData.js\"&gt;\n    });\n</code></pre>"
		}
	],
	"file": "documon/template/assets/js/documon/menutree/MenuTree.js",
	"filename": "MenuTree.js",
	"klass": "MenuTree",
	"docfile": "gieson.MenuTree.html",
	"id": "gieson.MenuTree",
	"methods": [
		{
			"line": 388,
			"api": {
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
			"flagSearchText": " getDataById getDataById The menu item id. The item's source data as provided during init.",
			"name": "getDataById",
			"shortText": "Gets the item's source data as provided during init. Convient way to retrive source data without navigating the source tree becuase we maintain a flat-list cross reference. This methods simply hooks into the cross reference.",
			"shortHtml": "<p>Gets the item's source data as provided during init. Convient way to retrive source data without navigating the source tree becuase we maintain a flat-list cross reference. This methods simply hooks into the cross reference.</p>",
			"text": "Gets the item's source data as provided during init. Convient way to retrive source data without navigating the source tree becuase we maintain a flat-list cross reference. This methods simply hooks into the cross reference.\n\n",
			"html": "<p>Gets the item's source data as provided during init. Convient way to retrive source data without navigating the source tree becuase we maintain a flat-list cross reference. This methods simply hooks into the cross reference.</p>",
			"entity": "method",
			"params": [
				{
					"name": "id",
					"shortText": "The menu item id.",
					"shortHtml": "<p>The menu item id.</p>",
					"text": "The menu item id.",
					"html": "<p>The menu item id.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "object",
				"text": "The item's source data as provided during init.",
				"html": "<p>The item's source data as provided during init.</p>",
				"shortText": "<p>The item's source data as provided during init.</p>",
				"shortHtml": "<p>The item's source data as provided during init.</p>"
			},
			"file": "documon/template/assets/js/documon/menutree/MenuTree.js",
			"filename": "MenuTree.js",
			"klass": "MenuTree",
			"package": "gieson",
			"docfile": "gieson.MenuTree.html",
			"id": "gieson.MenuTree.getDataById"
		},
		{
			"line": 371,
			"api": {
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
			"flagSearchText": " openById openById The menu item id. Should the item be highlighted? Should the menu scroll to show the item? The item's source data as provided during init.",
			"name": "openById",
			"shortText": "Opens all decendants of a branch.",
			"shortHtml": "<p>Opens all decendants of a branch.</p>",
			"text": "Opens all decendants of a branch.\n\n",
			"html": "<p>Opens all decendants of a branch.</p>",
			"entity": "method",
			"params": [
				{
					"name": "id",
					"shortText": "The menu item id.",
					"shortHtml": "<p>The menu item id.</p>",
					"text": "The menu item id.",
					"html": "<p>The menu item id.</p>",
					"type": "string"
				},
				{
					"name": "andSelect",
					"shortText": "Should the item be highlighted?",
					"shortHtml": "<p>Should the item be highlighted?</p>",
					"text": "Should the item be highlighted?",
					"html": "<p>Should the item be highlighted?</p>",
					"type": "boolean",
					"optional": true,
					"defaultVal": "false"
				},
				{
					"name": "scrollIntoView",
					"shortText": "Should the menu scroll to show the item?",
					"shortHtml": "<p>Should the menu scroll to show the item?</p>",
					"text": "Should the menu scroll to show the item?",
					"html": "<p>Should the menu scroll to show the item?</p>",
					"type": "boolean",
					"optional": true,
					"defaultVal": "false"
				}
			],
			"returns": {
				"type": "object",
				"text": "The item's source data as provided during init.",
				"html": "<p>The item's source data as provided during init.</p>",
				"shortText": "<p>The item's source data as provided during init.</p>",
				"shortHtml": "<p>The item's source data as provided during init.</p>"
			},
			"file": "documon/template/assets/js/documon/menutree/MenuTree.js",
			"filename": "MenuTree.js",
			"klass": "MenuTree",
			"package": "gieson",
			"docfile": "gieson.MenuTree.html",
			"id": "gieson.MenuTree.openById"
		},
		{
			"line": 252,
			"api": {
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
			"flagSearchText": " select select The menu item id.",
			"name": "select",
			"shortText": "Opens and/or highlights an item in the menu.",
			"shortHtml": "<p>Opens and/or highlights an item in the menu.</p>",
			"text": "Opens and/or highlights an item in the menu.\n\n",
			"html": "<p>Opens and/or highlights an item in the menu.</p>",
			"entity": "method",
			"params": [
				{
					"name": "id",
					"shortText": "The menu item id.",
					"shortHtml": "<p>The menu item id.</p>",
					"text": "The menu item id.",
					"html": "<p>The menu item id.</p>",
					"type": "string"
				}
			],
			"file": "documon/template/assets/js/documon/menutree/MenuTree.js",
			"filename": "MenuTree.js",
			"klass": "MenuTree",
			"package": "gieson",
			"docfile": "gieson.MenuTree.html",
			"id": "gieson.MenuTree.select"
		},
		{
			"line": 232,
			"name": "selectClick",
			"shortText": "Opens and/or highlights an item in the menu when user physically clicks.",
			"shortHtml": "<p>Opens and/or highlights an item in the menu when user physically clicks.</p>",
			"text": "Opens and/or highlights an item in the menu when user physically clicks.\n\n",
			"html": "<p>Opens and/or highlights an item in the menu when user physically clicks.</p>",
			"entity": "method",
			"flagSearchText": " selectClick The mouse event object. The menu item id.",
			"params": [
				{
					"name": "evt",
					"shortText": "The mouse event object.",
					"shortHtml": "<p>The mouse event object.</p>",
					"text": "The mouse event object.",
					"html": "<p>The mouse event object.</p>",
					"type": "Event"
				},
				{
					"name": "id",
					"shortText": "The menu item id.",
					"shortHtml": "<p>The menu item id.</p>",
					"text": "The menu item id.",
					"html": "<p>The menu item id.</p>",
					"type": "string"
				}
			],
			"file": "documon/template/assets/js/documon/menutree/MenuTree.js",
			"filename": "MenuTree.js",
			"klass": "MenuTree",
			"package": "gieson",
			"docfile": "gieson.MenuTree.html",
			"id": "gieson.MenuTree.selectClick"
		},
		{
			"line": 216,
			"api": {
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
			"flagSearchText": " toggle toggle The menu item id.",
			"name": "toggle",
			"shortText": "Toggles an item open/closed.",
			"shortHtml": "<p>Toggles an item open/closed.</p>",
			"text": "Toggles an item open/closed.\n\n",
			"html": "<p>Toggles an item open/closed.</p>",
			"entity": "method",
			"params": [
				{
					"name": "id",
					"shortText": "The menu item id.",
					"shortHtml": "<p>The menu item id.</p>",
					"text": "The menu item id.",
					"html": "<p>The menu item id.</p>",
					"type": "string"
				}
			],
			"file": "documon/template/assets/js/documon/menutree/MenuTree.js",
			"filename": "MenuTree.js",
			"klass": "MenuTree",
			"package": "gieson",
			"docfile": "gieson.MenuTree.html",
			"id": "gieson.MenuTree.toggle"
		},
		{
			"line": 204,
			"name": "toggleClick",
			"shortText": "Used to toggle via mouse click. Toggles an item open/closed and prevents any further mouse bubbling.",
			"shortHtml": "<p>Used to toggle via mouse click. Toggles an item open/closed and prevents any further mouse bubbling.</p>",
			"text": "Used to toggle via mouse click. Toggles an item open/closed and prevents any further mouse bubbling.\n\n",
			"html": "<p>Used to toggle via mouse click. Toggles an item open/closed and prevents any further mouse bubbling.</p>",
			"entity": "method",
			"flagSearchText": " toggleClick The mouse event object. The menu item id.",
			"params": [
				{
					"name": "evt",
					"shortText": "The mouse event object.",
					"shortHtml": "<p>The mouse event object.</p>",
					"text": "The mouse event object.",
					"html": "<p>The mouse event object.</p>",
					"type": "Event"
				},
				{
					"name": "id",
					"shortText": "The menu item id.",
					"shortHtml": "<p>The menu item id.</p>",
					"text": "The menu item id.",
					"html": "<p>The menu item id.</p>",
					"type": "string"
				}
			],
			"file": "documon/template/assets/js/documon/menutree/MenuTree.js",
			"filename": "MenuTree.js",
			"klass": "MenuTree",
			"package": "gieson",
			"docfile": "gieson.MenuTree.html",
			"id": "gieson.MenuTree.toggleClick"
		}
	],
	"properties": [
		{
			"line": 193,
			"name": "listdata",
			"shortText": "TODO: We should convert the items we store in the list to a seperate class. For berevity we've just inlined it during development.",
			"shortHtml": "<p>TODO: We should convert the items we store in the list to a seperate class. For berevity we've just inlined it during development.</p>",
			"text": "TODO: We should convert the items we store in the list to a seperate class. For berevity we've just inlined it during development.\nA data store for each menu item. The keys for the listData refer to item ID's. Each item consists of the following:\n\n\t \titem = {\n\t \t\tid\t\t\t// Optional (will be assigned unique one if none)\n\t\t\tchildren\t// A list of other items.\n\t\t\taccess\t\t// Specific to documon\n\t\t\tinherits\t// Specific to documon\n\t\t\tkind\t\t// Applies a CSS class to the item\n\t\t\tlabel\t\t// What the user sees\n\n\t\t\t// This is created and managed by MenuTree\n\t\t\t$mt - {\n\n\t\t\t\t\t\tmiid \t\t// Menu item id.\n\t\t\t\t\t\tliid\t\t// The ID of the actual <li> HTML element created for this item \n\t\t\t\t\t\tulid\t\t// The ID of the parent <ul> element (this LI is a child of this UL)\n\t\t\t\t\t\topen\t\t// (boolean) Current state.\n\t\t\t\t\t\tparentMiid\t// The parent menu item.\n\t\t\t\t\t\topenerid\t// The opener element's ID\n\t\t\t\t\t\tliElem\t\t// The actual <li> element (only stored when interacted with)\n\t\t\t\t\t\tulElem\t\t// The actual parent <ul> element (only stored when interacted with)\n\t\t\t\t\t\topenerElem\t// The actual opener triangle doo-dad element (only stored when interacted with)\n\t\t\t\t\t\tulOriginalDisplay // The source node's original css style.display kind (for open/close so we go back to normal -- defaults to \"block\" when not set in CSS)\n\n\t\t\t}\n\t\t}\n\n\n\n",
			"html": "<p>TODO: We should convert the items we store in the list to a seperate class. For berevity we've just inlined it during development.\nA data store for each menu item. The keys for the listData refer to item ID's. Each item consists of the following:</p>\n<pre><code>    item = {\n        id          // Optional (will be assigned unique one if none)\n        children    // A list of other items.\n        access      // Specific to documon\n        inherits    // Specific to documon\n        kind        // Applies a CSS class to the item\n        label       // What the user sees\n\n        // This is created and managed by MenuTree\n        $mt - {\n\n                    miid        // Menu item id.\n                    liid        // The ID of the actual &lt;li&gt; HTML element created for this item \n                    ulid        // The ID of the parent &lt;ul&gt; element (this LI is a child of this UL)\n                    open        // (boolean) Current state.\n                    parentMiid  // The parent menu item.\n                    openerid    // The opener element's ID\n                    liElem      // The actual &lt;li&gt; element (only stored when interacted with)\n                    ulElem      // The actual parent &lt;ul&gt; element (only stored when interacted with)\n                    openerElem  // The actual opener triangle doo-dad element (only stored when interacted with)\n                    ulOriginalDisplay // The source node's original css style.display kind (for open/close so we go back to normal -- defaults to \"block\" when not set in CSS)\n\n        }\n    }\n</code></pre>",
			"type": "Object",
			"entity": "property",
			"flagSearchText": " listdata",
			"file": "documon/template/assets/js/documon/menutree/MenuTree.js",
			"filename": "MenuTree.js",
			"klass": "MenuTree",
			"package": "gieson",
			"docfile": "gieson.MenuTree.html",
			"id": "gieson.MenuTree.listdata"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.5.0",
	"search": {
		"gieson.MenuTree": "MenuTree : Builds menu based menu array menu array must conform following structure myMenuData Unique used identify menu list item html optional open when menu item clicked label display text menu item kind myCssRule class apply item good including icons children array menu item just like this When item children menu will constructed immediate nextSibling which will house items within children array Thus have many menus needed menu will build using following HTML structure opener used open close next immediate sibling opener used open close next immediate sibling opener used open close next immediate siblingMenuTree gieson only action ping select function opHandler action item action select sole item myMenu gieson MenuTree callback opHandler menuData MenuData MenuData should located window object since loaded script menuData",
		"gieson.MenuTree.toggleClick": "toggleClick : Used toggle mouse click Toggles item open closed prevents further mouse bubblingtoggleClick mouse event object menu item",
		"gieson.MenuTree.toggle": "toggle : Toggles item open closedtoggle toggle menu item",
		"gieson.MenuTree.selectClick": "selectClick : Opens highlights item menu when user physically clicksselectClick mouse event object menu item",
		"gieson.MenuTree.select": "select : Opens highlights item menuselect select menu item",
		"gieson.MenuTree.openById": "openById : Opens decendants branchopenById openById menu item Should item highlighted Should menu scroll show item item source data provided during init",
		"gieson.MenuTree.getDataById": "getDataById : Gets item source data provided during init Convient retrive source data without navigating source tree becuase maintain flat list cross reference This methods simply hooks into cross referencegetDataById getDataById menu item item source data provided during init",
		"gieson.MenuTree.listdata": "listdata : TODO should convert items store list seperate class berevity just inlined during development data store each menu item keys listData refer item Each item consists following item Optional will assigned unique none children list other items access Specific documon inherits Specific documon kind Applies class item label What user sees This created managed MenuTree miid Menu item liid actual HTML element created this item ulid parent element this child this open boolean Current state parentMiid parent menu item openerid opener element liElem actual element only stored when interacted with ulElem actual parent element only stored when interacted with openerElem actual opener triangle element only stored when interacted with ulOriginalDisplay source node original style display kind open close back normal defaults block when"
	}
}