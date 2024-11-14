{
	"line": 17,
	"name": "menuBuilder",
	"shortText": "Takes the source context object (which contains the entire resolved documentation data) and extracts meta data adn refactors / organizes it into an object formatted for \"MenuTree.js\".",
	"shortHtml": "<p>Takes the source context object (which contains the entire resolved documentation data) and extracts meta data adn refactors / organizes it into an object formatted for \"MenuTree.js\".</p>",
	"text": "\nTakes the source context object (which contains the entire resolved documentation data) and extracts meta data adn refactors / organizes it into an object formatted for \"MenuTree.js\".\n\nConstructs a multi-dimensional object/array that represents the menu tree ultimately resulting in the output \"out/_menuData.js\" file, which is formatted for and picked up by the \"MenuTree.js\" on the index.html page.\n\n",
	"html": "<p>Takes the source context object (which contains the entire resolved documentation data) and extracts meta data adn refactors / organizes it into an object formatted for \"MenuTree.js\".</p>\n<p>Constructs a multi-dimensional object/array that represents the menu tree ultimately resulting in the output \"out/_menuData.js\" file, which is formatted for and picked up by the \"MenuTree.js\" on the index.html page.</p>",
	"entity": "class",
	"flagSearchText": " menuBuilder documon \n",
	"package": "documon",
	"access": "private",
	"file": "documon/src/menuBuilder.js",
	"filename": "menuBuilder.js",
	"klass": "menuBuilder",
	"docfile": "documon.menuBuilder.html",
	"id": "documon.menuBuilder",
	"methods": [
		{
			"line": 43,
			"name": "buildSections",
			"shortText": "Checks the provided context to see if an array of items exists for the associated major kind of sections (packages, classes, property, events, methods).",
			"shortHtml": "<p>Checks the provided context to see if an array of items exists for the associated major kind of sections (packages, classes, property, events, methods).</p>",
			"text": "Checks the provided context to see if an array of items exists for the associated major kind of sections (packages, classes, property, events, methods).\n\nFor example, the provided context will take the form of:\n\n\t\tcontext : {\n\t\t\tclasses \t: [ a, b, c ]\n\t\t\tproperties \t: [ a, b, c ]\n\t\t\tetc\n\t\t}\n\nIf the array exists, we build out that major kind as a section\n\nBuilds the context's major sections into the target array (kds)\n\n",
			"html": "<p>Checks the provided context to see if an array of items exists for the associated major kind of sections (packages, classes, property, events, methods).</p>\n<p>For example, the provided context will take the form of:</p>\n<pre><code>    context : {\n        classes     : [ a, b, c ]\n        properties  : [ a, b, c ]\n        etc\n    }\n</code></pre>\n<p>If the array exists, we build out that major kind as a section</p>\n<p>Builds the context's major sections into the target array (kds)</p>",
			"entity": "method",
			"flagSearchText": " buildSections The parsed documentation object. The array to put any childeren into.\n description",
			"access": "private",
			"params": [
				{
					"name": "ctx",
					"shortText": "The parsed documentation object.",
					"shortHtml": "<p>The parsed documentation object.</p>",
					"text": "The parsed documentation object.",
					"html": "<p>The parsed documentation object.</p>",
					"type": "object"
				},
				{
					"name": "target",
					"shortText": "The array to put any childeren into.",
					"shortHtml": "<p>The array to put any childeren into.</p>",
					"text": "The array to put any childeren into.\n",
					"html": "<p>The array to put any childeren into.</p>",
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
			"file": "documon/src/menuBuilder.js",
			"filename": "menuBuilder.js",
			"klass": "menuBuilder",
			"package": "documon",
			"docfile": "documon.menuBuilder.html",
			"id": "documon.menuBuilder.buildSections"
		},
		{
			"line": 108,
			"name": "hasAnyPart",
			"shortText": "Checks to see if a major type exists.",
			"shortHtml": "<p>Checks to see if a major type exists.</p>",
			"text": "Checks to see if a major type exists.\n\n",
			"html": "<p>Checks to see if a major type exists.</p>",
			"entity": "method",
			"flagSearchText": " hasAnyPart description",
			"access": "private",
			"params": [
				{
					"name": "item",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description",
					"html": "<p>description</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "Boolean",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"file": "documon/src/menuBuilder.js",
			"filename": "menuBuilder.js",
			"klass": "menuBuilder",
			"package": "documon",
			"docfile": "documon.menuBuilder.html",
			"id": "documon.menuBuilder.hasAnyPart"
		},
		{
			"line": 217,
			"name": "render",
			"shortText": "The main entry point for processing. Builds each section on the \"root\" node if methods and properties are not associated with classes. Meaning that anything avaialble on the root will reside int eh \"window\" scope. So they just dnagle out there on the tree.",
			"shortHtml": "<p>The main entry point for processing. Builds each section on the \"root\" node if methods and properties are not associated with classes. Meaning that anything avaialble on the root will reside int eh \"window\" scope. So they just dnagle out there on the tree.</p>",
			"text": "The main entry point for processing. Builds each section on the \"root\" node if methods and properties are not associated with classes. Meaning that anything avaialble on the root will reside int eh \"window\" scope. So they just dnagle out there on the tree.\n\n",
			"html": "<p>The main entry point for processing. Builds each section on the \"root\" node if methods and properties are not associated with classes. Meaning that anything avaialble on the root will reside int eh \"window\" scope. So they just dnagle out there on the tree.</p>",
			"entity": "method",
			"flagSearchText": " render\n description\n description",
			"params": [
				{
					"name": "ctx",
					"shortText": "description",
					"shortHtml": "<p>description</p>",
					"text": "description\n",
					"html": "<p>description</p>",
					"type": "array"
				}
			],
			"returns": {
				"type": "array",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"file": "documon/src/menuBuilder.js",
			"filename": "menuBuilder.js",
			"klass": "menuBuilder",
			"package": "documon",
			"docfile": "documon.menuBuilder.html",
			"id": "documon.menuBuilder.render"
		},
		{
			"line": 138,
			"name": "section",
			"shortText": "Builds an indiviual items containing pertenint meta data required by MenuBuilder to display the item in the tree and click-to-open the associated file.",
			"shortHtml": "<p>Builds an indiviual items containing pertenint meta data required by MenuBuilder to display the item in the tree and click-to-open the associated file.</p>",
			"text": "Builds an indiviual items containing pertenint meta data required by MenuBuilder to display the item in the tree and click-to-open the associated file.\n\n",
			"html": "<p>Builds an indiviual items containing pertenint meta data required by MenuBuilder to display the item in the tree and click-to-open the associated file.</p>",
			"entity": "method",
			"flagSearchText": " section The context to parse. Each level down the tree has it's own unique and seperate context. The key for the part of the context we are going to process. A simplified (meta-only) object that represents the provided context.\n\nExample of returned \n\t\t{\n\t\t\t\"id\": \"packageName.className-propMethodEventEtcName\",\n\t\t\t\"url\": \"packageName.className.html#propMethodEventEtcName\",\n\t\t\t\"label\": \"propMethodEventEtcName\",\n\t\t\t\"kind\": \"propMethodEvent\",\n\t\t\t\"children\": [ ] <-- only added when needed\n\t\t}",
			"access": "private",
			"params": [
				{
					"name": "ctx",
					"shortText": "The context to parse. Each level down the tree has it's own unique and seperate context.",
					"shortHtml": "<p>The context to parse. Each level down the tree has it's own unique and seperate context.</p>",
					"text": "The context to parse. Each level down the tree has it's own unique and seperate context.",
					"html": "<p>The context to parse. Each level down the tree has it's own unique and seperate context.</p>",
					"type": "object"
				},
				{
					"name": "prop",
					"shortText": "The key for the part of the context we are going to process.",
					"shortHtml": "<p>The key for the part of the context we are going to process.</p>",
					"text": "The key for the part of the context we are going to process.",
					"html": "<p>The key for the part of the context we are going to process.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "type",
				"text": "A simplified (meta-only) object that represents the provided context.\n\nExample of returned \n\t\t{\n\t\t\t\"id\": \"packageName.className-propMethodEventEtcName\",\n\t\t\t\"url\": \"packageName.className.html#propMethodEventEtcName\",\n\t\t\t\"label\": \"propMethodEventEtcName\",\n\t\t\t\"kind\": \"propMethodEvent\",\n\t\t\t\"children\": [ ] <-- only added when needed\n\t\t}",
				"html": "<p>A simplified (meta-only) object that represents the provided context.</p>\n<p>Example of returned \n        {\n            \"id\": \"packageName.className-propMethodEventEtcName\",\n            \"url\": \"packageName.className.html#propMethodEventEtcName\",\n            \"label\": \"propMethodEventEtcName\",\n            \"kind\": \"propMethodEvent\",\n            \"children\": [ ] &lt;-- only added when needed\n        }</p>",
				"shortText": "<p>A simplified (meta-only) object that represents the provided context.</p>",
				"shortHtml": "<p>A simplified (meta-only) object that represents the provided context.</p>"
			},
			"file": "documon/src/menuBuilder.js",
			"filename": "menuBuilder.js",
			"klass": "menuBuilder",
			"package": "documon",
			"docfile": "documon.menuBuilder.html",
			"id": "documon.menuBuilder.section"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.0.0",
	"search": {
		"documon.menuBuilder": "menuBuilder : Takes source context object which contains entire resolved documentation data extracts meta data refactors organizes into object formatted MenuTree Constructs multi dimensional object array that represents menu tree ultimately resulting output menuData file which formatted picked MenuTree index html pagemenuBuilder documon",
		"documon.menuBuilder.buildSections": "buildSections : Checks provided context array items exists associated major kind sections packages classes property events methods example provided context will take form context classes properties array exists build that major kind section Builds context major sections into target arraybuildSections parsed documentation object array childeren into description",
		"documon.menuBuilder.hasAnyPart": "hasAnyPart : Checks major type existshasAnyPart description",
		"documon.menuBuilder.section": "section : Builds indiviual items containing pertenint meta data required MenuBuilder display item tree click open associated filesection context parse Each level down tree unique seperate context part context going process simplified meta only object that represents provided context Example returned packageName className propMethodEventEtcName packageName className html propMethodEventEtcName label propMethodEventEtcName kind propMethodEvent children only added when needed",
		"documon.menuBuilder.render": "render : main entry point processing Builds each section root node methods properties associated with classes Meaning that anything avaialble root will reside window scope they just dnagle there treerender description description"
	}
}