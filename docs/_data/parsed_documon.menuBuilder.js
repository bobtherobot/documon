[
	{
		"text": "\nTakes the source context object (which contains the entire resolved documentation data) and extracts meta data adn refactors / organizes it into an object formatted for \"MenuTree.js\".\n\nConstructs a multi-dimensional object/array that represents the menu tree ultimately resulting in the output \"out/_menuData.js\" file, which is formatted for and picked up by the \"MenuTree.js\" on the index.html page.\n\n",
		"start": 6,
		"end": 16,
		"file": "/Volumes/Drives/projects/documon/documon/src/menuBuilder.js",
		"flags": [
			{
				"source": "@class  \t\tmenuBuildermenuBuilder",
				"flag": "class",
				"after": "menuBuilder",
				"afterType": "menuBuilder",
				"name": "menuBuilder",
				"single": true,
				"text": "menuBuilder"
			},
			{
				"source": "@package  \tdocumondocumon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": "",
				"text": "\n"
			}
		],
		"source": "\nTakes the source context object (which contains the entire resolved documentation data) and extracts meta data adn refactors / organizes it into an object formatted for \"MenuTree.js\".\n\nConstructs a multi-dimensional object/array that represents the menu tree ultimately resulting in the output \"out/_menuData.js\" file, which is formatted for and picked up by the \"MenuTree.js\" on the index.html page.\n\n@class  \t\tmenuBuilder\n@package  \tdocumon\n@private\n",
		"id": "documon.menuBuilder"
	},
	{
		"text": "Checks the provided context to see if an array of items exists for the associated major kind of sections (packages, classes, property, events, methods).\n\nFor example, the provided context will take the form of:\n\n\t\tcontext : {\n\t\t\tclasses \t: [ a, b, c ]\n\t\t\tproperties \t: [ a, b, c ]\n\t\t\tetc\n\t\t}\n\nIf the array exists, we build out that major kind as a section\n\nBuilds the context's major sections into the target array (kds)\n\n",
		"start": 21,
		"end": 42,
		"file": "/Volumes/Drives/projects/documon/documon/src/menuBuilder.js",
		"flags": [
			{
				"source": "@method  buildSectionsbuildSections",
				"flag": "method",
				"after": "buildSections",
				"afterType": "buildSections",
				"name": "buildSections",
				"single": true,
				"text": "buildSections"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {object}\tctx   \t- The parsed documentation object.The parsed documentation object.",
				"flag": "param",
				"after": "{object}\tctx   \t- The parsed documentation object.",
				"type": "object",
				"afterType": "ctx   \t- The parsed documentation object.",
				"name": "ctx",
				"text": "The parsed documentation object."
			},
			{
				"source": "@param   {type}\t\ttarget  - The array to put any childeren into.The array to put any childeren into.\n",
				"flag": "param",
				"after": "{type}\t\ttarget  - The array to put any childeren into.",
				"type": "type",
				"afterType": "target  - The array to put any childeren into.",
				"name": "target",
				"text": "The array to put any childeren into.\n"
			},
			{
				"source": "@return  {type}               description",
				"flag": "return",
				"after": "{type}               description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Checks the provided context to see if an array of items exists for the associated major kind of sections (packages, classes, property, events, methods).\n\nFor example, the provided context will take the form of:\n\n\t\tcontext : {\n\t\t\tclasses \t: [ a, b, c ]\n\t\t\tproperties \t: [ a, b, c ]\n\t\t\tetc\n\t\t}\n\nIf the array exists, we build out that major kind as a section\n\nBuilds the context's major sections into the target array (kds)\n\n@method  buildSections\n@private\n@param   {object}\tctx   \t- The parsed documentation object.\n@param   {type}\t\ttarget  - The array to put any childeren into.\n\n@return  {type}               description",
		"id": "documon.menuBuilder.buildSections"
	},
	{
		"text": "Checks to see if a major type exists.\n\n",
		"start": 58,
		"end": 65,
		"file": "/Volumes/Drives/projects/documon/documon/src/menuBuilder.js",
		"flags": [
			{
				"source": "@method  hasAnyParthasAnyPart",
				"flag": "method",
				"after": "hasAnyPart",
				"afterType": "hasAnyPart",
				"name": "hasAnyPart",
				"single": true,
				"text": "hasAnyPart"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {type}      item  descriptiondescription",
				"flag": "param",
				"after": "{type}      item  description",
				"type": "type",
				"afterType": "item  description",
				"name": "item",
				"text": "description"
			},
			{
				"source": "@return  {Boolean}",
				"flag": "return",
				"after": "{Boolean}",
				"type": "Boolean"
			}
		],
		"source": "Checks to see if a major type exists.\n\n@method  hasAnyPart\n@private\n@param   {type}      item  description\n@return  {Boolean} ",
		"id": "documon.menuBuilder.hasAnyPart"
	},
	{
		"text": "Builds an indiviual items containing pertenint meta data required by MenuBuilder to display the item in the tree and click-to-open the associated file.\n\n",
		"start": 77,
		"end": 94,
		"file": "/Volumes/Drives/projects/documon/documon/src/menuBuilder.js",
		"flags": [
			{
				"source": "@method  sectionsection",
				"flag": "method",
				"after": "section",
				"afterType": "section",
				"name": "section",
				"single": true,
				"text": "section"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param   {object}   ctx   - The context to parse. Each level down the tree has it's own unique and seperate context.The context to parse. Each level down the tree has it's own unique and seperate context.",
				"flag": "param",
				"after": "{object}   ctx   - The context to parse. Each level down the tree has it's own unique and seperate context.",
				"type": "object",
				"afterType": "ctx   - The context to parse. Each level down the tree has it's own unique and seperate context.",
				"name": "ctx",
				"text": "The context to parse. Each level down the tree has it's own unique and seperate context."
			},
			{
				"source": "@param   {string}   prop  - The key for the part of the context we are going to process.The key for the part of the context we are going to process.",
				"flag": "param",
				"after": "{string}   prop  - The key for the part of the context we are going to process.",
				"type": "string",
				"afterType": "prop  - The key for the part of the context we are going to process.",
				"name": "prop",
				"text": "The key for the part of the context we are going to process."
			},
			{
				"source": "@return  {type} - A simplified (meta-only) object that represents the provided context.",
				"flag": "return",
				"after": "{type} - A simplified (meta-only) object that represents the provided context.",
				"type": "type",
				"afterType": "A simplified (meta-only) object that represents the provided context.",
				"text": "A simplified (meta-only) object that represents the provided context.\n\nExample of returned \n\t\t{\n\t\t\t\"id\": \"packageName.className-propMethodEventEtcName\",\n\t\t\t\"url\": \"packageName.className.html#propMethodEventEtcName\",\n\t\t\t\"label\": \"propMethodEventEtcName\",\n\t\t\t\"kind\": \"propMethodEvent\",\n\t\t\t\"children\": [ ] <-- only added when needed\n\t\t}"
			}
		],
		"source": "Builds an indiviual items containing pertenint meta data required by MenuBuilder to display the item in the tree and click-to-open the associated file.\n\n@method  section\n@private\n@param   {object}   ctx   - The context to parse. Each level down the tree has it's own unique and seperate context.\n@param   {string}   prop  - The key for the part of the context we are going to process.\n@return  {type} - A simplified (meta-only) object that represents the provided context.\n\nExample of returned \n\t\t{\n\t\t\t\"id\": \"packageName.className-propMethodEventEtcName\",\n\t\t\t\"url\": \"packageName.className.html#propMethodEventEtcName\",\n\t\t\t\"label\": \"propMethodEventEtcName\",\n\t\t\t\"kind\": \"propMethodEvent\",\n\t\t\t\"children\": [ ] <-- only added when needed\n\t\t}",
		"id": "documon.menuBuilder.section"
	},
	{
		"text": "The main entry point for processing. Builds each section on the \"root\" node if methods and properties are not associated with classes. Meaning that anything avaialble on the root will reside int eh \"window\" scope. So they just dnagle out there on the tree.\n\n",
		"start": 143,
		"end": 151,
		"file": "/Volumes/Drives/projects/documon/documon/src/menuBuilder.js",
		"flags": [
			{
				"source": "@method  renderrender\n",
				"flag": "method",
				"after": "render",
				"afterType": "render",
				"name": "render",
				"single": true,
				"text": "render\n"
			},
			{
				"source": "@param   {array}  ctx  descriptiondescription\n",
				"flag": "param",
				"after": "{array}  ctx  description",
				"type": "array",
				"afterType": "ctx  description",
				"name": "ctx",
				"text": "description\n"
			},
			{
				"source": "@return  {array}       description",
				"flag": "return",
				"after": "{array}       description",
				"type": "array",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "The main entry point for processing. Builds each section on the \"root\" node if methods and properties are not associated with classes. Meaning that anything avaialble on the root will reside int eh \"window\" scope. So they just dnagle out there on the tree.\n\n@method  render\n\n@param   {array}  ctx  description\n\n@return  {array}       description",
		"id": "documon.menuBuilder.render"
	}
]