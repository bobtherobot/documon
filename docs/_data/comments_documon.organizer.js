[
	{
		"start": 7,
		"end": 70,
		"data": "Organizes the parsed source-code data into a single object that takes the following form:\n\n\torgan = {\n\n\t\t// There will always be a root node with an absolute ID of \"root\"\n\t\tid : \"root\",\n\t\tname : \"root\",\n\t\tfile : \"root.html\",\n\t\tdocfile : \"root.html\",\n\n\t\tpackages : [\n\n\t\t\t\t{ \n\t\t\t\t\tpackages : foo\n\n\t\t\t\t\t// Classes included in this package\n\t\t\t\t\tclasses : [\n\n\t\t\t\t\t\t{\t\n\t\t\t\t\t\t\tclass : \"foo\"\n\t\t\t\t\t\t\tmethods : [],\n\t\t\t\t\t\t\tproperties : [],\n\t\t\t\t\t\t\tevents : []\n\t\t\t\t\t\t},\n\n\t\t\t\t\t\t... etc ... \n\t\t\t\t\t],\n\n\t\t\t\t\t// Loose stuff found in this package\n\t\t\t\t\tmethods : [],\n\t\t\t\t\tproperties : [],\n\t\t\t\t\tevents : []\n\t\t\t\t}\n\t\t\n\t\t],\n\n\t\t// Independent classes that are not part of any package\n\t\tclasses : [\n\t\t\t{\t\n\t\t\t\tclass : \"foo\"\n\t\t\t\tmethods : [],\n\t\t\t\tproperties : [],\n\t\t\t\tevents : []\n\t\t\t}\n\t\t\t... etc ... \n\t\t],\n\n\t\t// Loose stuff that's not part of any package or class, assumed to be accessible \"this\" (e.g. in javascript it would be the \"window\" scope)\n\t\tmethods : [],\n\t\tproperties : [],\n\t\tevents : [],\n\n\t};\n \n\nAll source code hangs off of the \"root\" node and is organized according it's relationship to a package or class.\n\nThis organizer is initialized prior to parsing source code, and as each file is parsed, it is added to the organizer. After all the source-code is finished parsing, the organizer wires up adn cross references inheritance.\n\n@class organizer\n@package documon\n"
	},
	{
		"start": 77,
		"end": 79,
		"data": "@property  {Object} mainConf - A reference to the main configuration object. See [documon.mainConf](documon.mainConf)."
	},
	{
		"start": 82,
		"end": 84,
		"data": "@property  {Object} organ - The primary object we store all data into."
	},
	{
		"start": 87,
		"end": 89,
		"data": "@property  {Template} Tpackage - The package template processor (jst file)."
	},
	{
		"start": 92,
		"end": 94,
		"data": "@property  {Template} Tclass - The class template processor (jst file)."
	},
	{
		"start": 97,
		"end": 99,
		"data": "@property  {Object} flatClassList - We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array."
	},
	{
		"start": 103,
		"end": 105,
		"data": "@property  {Array} sectionNames - The complete list of sections a class or package can contain."
	},
	{
		"start": 300,
		"end": 308,
		"data": "Initializes the the \"organ\", which is an object that we'll be inserting all the tagged data into.\n\nWe'll also be grabbing the templates needed based on the location defined in the params.\n\n@method  init\n@param   {type}  params  - The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.\n@param   {type}  params.templateFolder -  The base path to the template folder."
	},
	{
		"start": 370,
		"end": 380,
		"data": "A classic array merge routine.\n\n@method  merge\n\n@param   {array}  a     - The array that we will add items to if \"prop\"\n@param   {array}  b     - The array we will merge into A if one of it's item[prop] doesn't exists in A.\n@param   {string}  prop  - The property used to validate if items in B need to be merged into A.\n\n@return  {array} - A new array containing all unique elements from A and B."
	},
	{
		"start": 429,
		"end": 436,
		"data": "Adds a class or package to the class or package object.\n\n@method  appendPage\n\n@param   {type}      existingObj  - The object ot add the thing to.\n@param   {type}      newObj       - THe thing we're adding."
	},
	{
		"start": 472,
		"end": 479,
		"data": "Adds a new package to the main packages list. Creates a namespace (package) if not exist.\n\n@method  addToPackageList\n\n@param   {type}            list        - The main package list to add the package to.\n@param   {type}            taggedPage  - The package data."
	},
	{
		"start": 514,
		"end": 521,
		"data": "Adds tagged data to a class array. Ensures this item is only addded once, and also place a refernce to the item in the flat list for future processing.\n\n@method  addToClassList\n\n@param   {type}          list        - The class array to add the item to.\n@param   {type}          taggedPage  - The data to add."
	},
	{
		"start": 544,
		"end": 549,
		"data": "Adds source-code data to the organ. The data needs to be formated from the \"tag.js\" processor. By reading the data we determine where it is to be added to the main organ.\n\n@method  add\n@param   {type}  VtaggedPage  - Source-code data parse by the tag.js processor."
	},
	{
		"start": 577,
		"end": 584,
		"data": "Sorts all main sections of an organ on a given key. By default sorting is conducted on the \"id\" key.\n\n@method  sortObj\n\n@param   {object}   obj   - The object to sort\n@param   {string}   [prop=\"id\"]  - The key to sort on."
	},
	{
		"start": 625,
		"end": 631,
		"data": "Generates a copy of the main organ that is sorted alphabetically, suitable for use wiht [menuBuilder](documon.menuBuilder)\n\n@method  buildMenu\n\n@return  {type}     description"
	}
]