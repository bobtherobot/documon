{
	"line": 69,
	"name": "tag",
	"shortText": "Processes the following flags",
	"shortHtml": "<p>Processes the following flags</p>",
	"text": "Processes the following flags\n\n- property\n- package, namespace\n- \n- property\n- method\n- event\n- class\n- module\n- \n- private\n- protected\n- static\n- public\n- readonly\n- \n- overrides\n- impliments\n- extends\n- inherits\n- \n- constructor\n- example\n- param\n- return, returns\n- \n- type\n- order\n- optional\n- header\n- defaultVal, default\n- see\n- requires\n\n\nFills the flags object\n\n\"Source Item\", are manufactured from the [parseFlag](parseFlag) class, and generally provided to many of the methods as the \"item\" argument, and they contain the following fields:\n\n\t\tSource Item {\n\t\t\tsource \t\t// Entire first line inlcuding the @flag (only first line)\n\t\t \tafter\t\t// Everything after the @flag\n\t\t\tname\t\t// One word following {type}. Or first word after the @flag definition when no {type}.\n\t\t\tchildren\t// name.kid - Array of children\n\t\t\tparent\t\t// if am a child, this is my parent.\n\t\t\tflag\t\t// @flag token with @ stripped\n\t\t\tdefaultVal\t// name=val\n\t\t\tafterType\t// first line after\n\t\t\ttext\t\t// \n\t\t}\n\n",
	"html": "<p>Processes the following flags</p>\n<ul>\n<li>property</li>\n</ul>\n<h2 id=\"--package-namespace\">- package, namespace</h2>\n<ul>\n<li>property</li>\n<li>method</li>\n<li>event</li>\n<li>class</li>\n</ul>\n<h2 id=\"--module\">- module</h2>\n<ul>\n<li>private</li>\n<li>protected</li>\n<li>static</li>\n<li>public</li>\n</ul>\n<h2 id=\"--readonly\">- readonly</h2>\n<ul>\n<li>overrides</li>\n<li>impliments</li>\n<li>extends</li>\n</ul>\n<h2 id=\"--inherits\">- inherits</h2>\n<ul>\n<li>constructor</li>\n<li>example</li>\n<li>param</li>\n</ul>\n<h2 id=\"--return-returns\">- return, returns</h2>\n<ul>\n<li>type</li>\n<li>order</li>\n<li>optional</li>\n<li>header</li>\n<li>defaultVal, default</li>\n<li>see</li>\n<li>requires</li>\n</ul>\n<p>Fills the flags object</p>\n<p>\"Source Item\", are manufactured from the <a href=\"parseFlag\">parseFlag</a> class, and generally provided to many of the methods as the \"item\" argument, and they contain the following fields:</p>\n<pre><code>    Source Item {\n        source      // Entire first line inlcuding the @flag (only first line)\n        after       // Everything after the @flag\n        name        // One word following {type}. Or first word after the @flag definition when no {type}.\n        children    // name.kid - Array of children\n        parent      // if am a child, this is my parent.\n        flag        // @flag token with @ stripped\n        defaultVal  // name=val\n        afterType   // first line after\n        text        // \n    }</code></pre>",
	"entity": "class",
	"flagSearchText": " tag documon\n",
	"package": "documon",
	"file": "documon/src/tag.js",
	"filename": "tag.js",
	"klass": "tag",
	"docfile": "documon.tag.html",
	"id": "documon.tag",
	"methods": [
		{
			"line": 438,
			"name": "fillFlag",
			"shortText": "[fillFlag description]",
			"shortHtml": "<p>[fillFlag description]</p>",
			"text": "[fillFlag description]\n\n",
			"html": "<p>[fillFlag description]</p>",
			"entity": "method",
			"flagSearchText": " fillFlag\n description description\n description",
			"params": [
				{
					"name": "item",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description",
					"html": "<p>description</p>",
					"type": "type"
				},
				{
					"name": "obj",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"file": "documon/src/tag.js",
			"filename": "tag.js",
			"klass": "tag",
			"package": "documon",
			"docfile": "documon.tag.html",
			"id": "documon.tag.fillFlag"
		},
		{
			"line": 341,
			"access": "private",
			"name": "processItems",
			"shortText": "Process flags for an entire list of items",
			"shortHtml": "<p>Process flags for an entire list of items</p>",
			"text": "Process flags for an entire list of items\n\n",
			"html": "<p>Process flags for an entire list of items</p>",
			"entity": "method",
			"flagSearchText": " processItems Vlist",
			"params": [
				{
					"name": "Vlist",
					"shortText": "Vlist",
					"shortHtml": "<p>Vlist</p>",
					"text": "Vlist",
					"html": "<p>Vlist</p>",
					"type": "array"
				}
			],
			"file": "documon/src/tag.js",
			"filename": "tag.js",
			"klass": "tag",
			"package": "documon",
			"docfile": "documon.tag.html",
			"id": "documon.tag.processItems"
		},
		{
			"line": 281,
			"name": "processOne",
			"shortText": "processOne",
			"shortHtml": "<p>processOne</p>",
			"text": "processOne",
			"html": "<p>processOne</p>",
			"entity": "method",
			"flagSearchText": " processOne the source item as parsed from comments An object containing flag data",
			"params": [
				{
					"name": "item",
					"shortText": "the source item as parsed from comments",
					"shortHtml": "<p>the source item as parsed from comments</p>",
					"text": "the source item as parsed from comments",
					"html": "<p>the source item as parsed from comments</p>",
					"type": "Source Object"
				}
			],
			"returns": {
				"type": "object",
				"text": "An object containing flag data",
				"html": "<p>An object containing flag data</p>",
				"shortText": "<p>An object containing flag data</p>",
				"shortHtml": "<p>An object containing flag data</p>"
			},
			"file": "documon/src/tag.js",
			"filename": "tag.js",
			"klass": "tag",
			"package": "documon",
			"docfile": "documon.tag.html",
			"id": "documon.tag.processOne"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.5.0",
	"search": {
		"documon.tag": "tag : Processes following flags property package namespace property method event class module private protected static public readonly overrides impliments extends inherits constructor example param return returns type order optional header defaultVal default requires Fills flags object Source Item manufactured from parseFlag parseFlag class generally provided many methods item argument they contain following fields Source Item source Entire first line inlcuding flag only first line after Everything after flag name word following type first word after flag definition when type children name Array children parent child this parent flag flag token with stripped defaultVal name afterType first line after text",
		"documon.tag.processOne": "processOne : processOne source item parsed from comments object containing flag data",
		"documon.tag.processItems": "processItems : Process flags entire list itemsprocessItems Vlist",
		"documon.tag.fillFlag": "fillFlag : fillFlag descriptionfillFlag description description description"
	}
}