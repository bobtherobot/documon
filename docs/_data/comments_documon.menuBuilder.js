[
	{
		"start": 6,
		"end": 16,
		"data": "\nTakes the source context object (which contains the entire resolved documentation data) and extracts meta data adn refactors / organizes it into an object formatted for \"MenuTree.js\".\n\nConstructs a multi-dimensional object/array that represents the menu tree ultimately resulting in the output \"out/_menuData.js\" file, which is formatted for and picked up by the \"MenuTree.js\" on the index.html page.\n\n@class  \t\tmenuBuilder\n@package  \tdocumon\n@private\n"
	},
	{
		"start": 21,
		"end": 42,
		"data": "Checks the provided context to see if an array of items exists for the associated major kind of sections (packages, classes, property, events, methods).\n\nFor example, the provided context will take the form of:\n\n\t\tcontext : {\n\t\t\tclasses \t: [ a, b, c ]\n\t\t\tproperties \t: [ a, b, c ]\n\t\t\tetc\n\t\t}\n\nIf the array exists, we build out that major kind as a section\n\nBuilds the context's major sections into the target array (kds)\n\n@method  buildSections\n@private\n@param   {object}\tctx   \t- The parsed documentation object.\n@param   {type}\t\ttarget  - The array to put any childeren into.\n\n@return  {type}               description"
	},
	{
		"start": 58,
		"end": 65,
		"data": "Checks to see if a major type exists.\n\n@method  hasAnyPart\n@private\n@param   {type}      item  description\n@return  {Boolean} "
	},
	{
		"start": 77,
		"end": 94,
		"data": "Builds an indiviual items containing pertenint meta data required by MenuBuilder to display the item in the tree and click-to-open the associated file.\n\n@method  section\n@private\n@param   {object}   ctx   - The context to parse. Each level down the tree has it's own unique and seperate context.\n@param   {string}   prop  - The key for the part of the context we are going to process.\n@return  {type} - A simplified (meta-only) object that represents the provided context.\n\nExample of returned \n\t\t{\n\t\t\t\"id\": \"packageName.className-propMethodEventEtcName\",\n\t\t\t\"url\": \"packageName.className.html#propMethodEventEtcName\",\n\t\t\t\"label\": \"propMethodEventEtcName\",\n\t\t\t\"kind\": \"propMethodEvent\",\n\t\t\t\"children\": [ ] <-- only added when needed\n\t\t}"
	},
	{
		"start": 143,
		"end": 151,
		"data": "The main entry point for processing. Builds each section on the \"root\" node if methods and properties are not associated with classes. Meaning that anything avaialble on the root will reside int eh \"window\" scope. So they just dnagle out there on the tree.\n\n@method  render\n\n@param   {array}  ctx  description\n\n@return  {array}       description"
	}
]