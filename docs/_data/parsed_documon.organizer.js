[
	{
		"text": "Organizes the parsed source-code data into a single object that takes the following form:\n\n\torgan = {\n\n\t\t// There will always be a root node with an absolute ID of \"root\"\n\t\tid : \"root\",\n\t\tname : \"root\",\n\t\tfile : \"root.html\",\n\t\tdocfile : \"root.html\",\n\n\t\tpackages : [\n\n\t\t\t\t{ \n\t\t\t\t\tpackages : foo\n\n\t\t\t\t\t// Classes included in this package\n\t\t\t\t\tclasses : [\n\n\t\t\t\t\t\t{\t\n\t\t\t\t\t\t\tclass : \"foo\"\n\t\t\t\t\t\t\tmethods : [],\n\t\t\t\t\t\t\tproperties : [],\n\t\t\t\t\t\t\tevents : []\n\t\t\t\t\t\t},\n\n\t\t\t\t\t\t... etc ... \n\t\t\t\t\t],\n\n\t\t\t\t\t// Loose stuff found in this package\n\t\t\t\t\tmethods : [],\n\t\t\t\t\tproperties : [],\n\t\t\t\t\tevents : []\n\t\t\t\t}\n\t\t\n\t\t],\n\n\t\t// Independent classes that are not part of any package\n\t\tclasses : [\n\t\t\t{\t\n\t\t\t\tclass : \"foo\"\n\t\t\t\tmethods : [],\n\t\t\t\tproperties : [],\n\t\t\t\tevents : []\n\t\t\t}\n\t\t\t... etc ... \n\t\t],\n\n\t\t// Loose stuff that's not part of any package or class, assumed to be accessible \"this\" (e.g. in javascript it would be the \"window\" scope)\n\t\tmethods : [],\n\t\tproperties : [],\n\t\tevents : [],\n\n\t};\n \n\nAll source code hangs off of the \"root\" node and is organized according it's relationship to a package or class.\n\nThis organizer is initialized prior to parsing source code, and as each file is parsed, it is added to the organizer. After all the source-code is finished parsing, the organizer wires up adn cross references inheritance.\n\n",
		"start": 7,
		"end": 70,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@class organizerorganizer",
				"flag": "class",
				"after": "organizer",
				"afterType": "organizer",
				"name": "organizer",
				"single": true,
				"text": "organizer"
			},
			{
				"source": "@package documon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon\n"
			}
		],
		"source": "Organizes the parsed source-code data into a single object that takes the following form:\n\n\torgan = {\n\n\t\t// There will always be a root node with an absolute ID of \"root\"\n\t\tid : \"root\",\n\t\tname : \"root\",\n\t\tfile : \"root.html\",\n\t\tdocfile : \"root.html\",\n\n\t\tpackages : [\n\n\t\t\t\t{ \n\t\t\t\t\tpackages : foo\n\n\t\t\t\t\t// Classes included in this package\n\t\t\t\t\tclasses : [\n\n\t\t\t\t\t\t{\t\n\t\t\t\t\t\t\tclass : \"foo\"\n\t\t\t\t\t\t\tmethods : [],\n\t\t\t\t\t\t\tproperties : [],\n\t\t\t\t\t\t\tevents : []\n\t\t\t\t\t\t},\n\n\t\t\t\t\t\t... etc ... \n\t\t\t\t\t],\n\n\t\t\t\t\t// Loose stuff found in this package\n\t\t\t\t\tmethods : [],\n\t\t\t\t\tproperties : [],\n\t\t\t\t\tevents : []\n\t\t\t\t}\n\t\t\n\t\t],\n\n\t\t// Independent classes that are not part of any package\n\t\tclasses : [\n\t\t\t{\t\n\t\t\t\tclass : \"foo\"\n\t\t\t\tmethods : [],\n\t\t\t\tproperties : [],\n\t\t\t\tevents : []\n\t\t\t}\n\t\t\t... etc ... \n\t\t],\n\n\t\t// Loose stuff that's not part of any package or class, assumed to be accessible \"this\" (e.g. in javascript it would be the \"window\" scope)\n\t\tmethods : [],\n\t\tproperties : [],\n\t\tevents : [],\n\n\t};\n \n\nAll source code hangs off of the \"root\" node and is organized according it's relationship to a package or class.\n\nThis organizer is initialized prior to parsing source code, and as each file is parsed, it is added to the organizer. After all the source-code is finished parsing, the organizer wires up adn cross references inheritance.\n\n@class organizer\n@package documon\n",
		"id": "documon.organizer"
	},
	{
		"text": "",
		"start": 77,
		"end": 79,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@property  {Object} mainConf - A reference to the main configuration object. See [documon.mainConf](documon.mainConf).",
				"flag": "property",
				"after": "{Object} mainConf - A reference to the main configuration object. See [documon.mainConf](documon.mainConf).",
				"type": "Object",
				"afterType": "mainConf - A reference to the main configuration object. See [documon.mainConf](documon.mainConf).",
				"name": "mainConf",
				"text": "A reference to the main configuration object. See [documon.mainConf](documon.mainConf)."
			}
		],
		"source": "@property  {Object} mainConf - A reference to the main configuration object. See [documon.mainConf](documon.mainConf).",
		"id": "documon.organizer.mainConf"
	},
	{
		"text": "",
		"start": 82,
		"end": 84,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@property  {Object} organ - The primary object we store all data into.",
				"flag": "property",
				"after": "{Object} organ - The primary object we store all data into.",
				"type": "Object",
				"afterType": "organ - The primary object we store all data into.",
				"name": "organ",
				"text": "The primary object we store all data into."
			}
		],
		"source": "@property  {Object} organ - The primary object we store all data into.",
		"id": "documon.organizer.organ"
	},
	{
		"text": "",
		"start": 87,
		"end": 89,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@property  {Template} Tpackage - The package template processor (jst file).",
				"flag": "property",
				"after": "{Template} Tpackage - The package template processor (jst file).",
				"type": "Template",
				"afterType": "Tpackage - The package template processor (jst file).",
				"name": "Tpackage",
				"text": "The package template processor (jst file)."
			}
		],
		"source": "@property  {Template} Tpackage - The package template processor (jst file).",
		"id": "documon.organizer.Tpackage"
	},
	{
		"text": "",
		"start": 92,
		"end": 94,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@property  {Template} Tclass - The class template processor (jst file).",
				"flag": "property",
				"after": "{Template} Tclass - The class template processor (jst file).",
				"type": "Template",
				"afterType": "Tclass - The class template processor (jst file).",
				"name": "Tclass",
				"text": "The class template processor (jst file)."
			}
		],
		"source": "@property  {Template} Tclass - The class template processor (jst file).",
		"id": "documon.organizer.Tclass"
	},
	{
		"text": "",
		"start": 97,
		"end": 99,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@property  {Object} flatClassList - We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array.",
				"flag": "property",
				"after": "{Object} flatClassList - We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array.",
				"type": "Object",
				"afterType": "flatClassList - We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array.",
				"name": "flatClassList",
				"text": "We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array."
			}
		],
		"source": "@property  {Object} flatClassList - We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array.",
		"id": "documon.organizer.flatClassList"
	},
	{
		"text": "",
		"start": 103,
		"end": 105,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@property  {Array} sectionNames - The complete list of sections a class or package can contain.",
				"flag": "property",
				"after": "{Array} sectionNames - The complete list of sections a class or package can contain.",
				"type": "Array",
				"afterType": "sectionNames - The complete list of sections a class or package can contain.",
				"name": "sectionNames",
				"text": "The complete list of sections a class or package can contain."
			}
		],
		"source": "@property  {Array} sectionNames - The complete list of sections a class or package can contain.",
		"id": "documon.organizer.sectionNames"
	},
	{
		"text": "Initializes the the \"organ\", which is an object that we'll be inserting all the tagged data into.\n\nWe'll also be grabbing the templates needed based on the location defined in the params.\n\n",
		"start": 300,
		"end": 308,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@method  initinit",
				"flag": "method",
				"after": "init",
				"afterType": "init",
				"name": "init",
				"single": true,
				"text": "init"
			},
			{
				"source": "@param   {type}  params  - The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.",
				"flag": "param",
				"after": "{type}  params  - The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.",
				"type": "type",
				"afterType": "params  - The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.",
				"name": "params",
				"text": "The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.",
				"children": [
					{
						"source": "@param   {type}  params.templateFolder -  The base path to the template folder.",
						"flag": "param",
						"after": "{type}  params.templateFolder -  The base path to the template folder.",
						"type": "type",
						"afterType": "params.templateFolder -  The base path to the template folder.",
						"parent": "params",
						"name": "templateFolder",
						"text": "The base path to the template folder."
					}
				]
			}
		],
		"source": "Initializes the the \"organ\", which is an object that we'll be inserting all the tagged data into.\n\nWe'll also be grabbing the templates needed based on the location defined in the params.\n\n@method  init\n@param   {type}  params  - The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.\n@param   {type}  params.templateFolder -  The base path to the template folder.",
		"id": "documon.organizer.init"
	},
	{
		"text": "A classic array merge routine.\n\n",
		"start": 370,
		"end": 380,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@method  mergemerge\n",
				"flag": "method",
				"after": "merge",
				"afterType": "merge",
				"name": "merge",
				"single": true,
				"text": "merge\n"
			},
			{
				"source": "@param   {array}  a     - The array that we will add items to if \"prop\"The array that we will add items to if \"prop\"",
				"flag": "param",
				"after": "{array}  a     - The array that we will add items to if \"prop\"",
				"type": "array",
				"afterType": "a     - The array that we will add items to if \"prop\"",
				"name": "a",
				"text": "The array that we will add items to if \"prop\""
			},
			{
				"source": "@param   {array}  b     - The array we will merge into A if one of it's item[prop] doesn't exists in A.The array we will merge into A if one of it's item[prop] doesn't exists in A.",
				"flag": "param",
				"after": "{array}  b     - The array we will merge into A if one of it's item[prop] doesn't exists in A.",
				"type": "array",
				"afterType": "b     - The array we will merge into A if one of it's item[prop] doesn't exists in A.",
				"name": "b",
				"text": "The array we will merge into A if one of it's item[prop] doesn't exists in A."
			},
			{
				"source": "@param   {string}  prop  - The property used to validate if items in B need to be merged into A.The property used to validate if items in B need to be merged into A.\n",
				"flag": "param",
				"after": "{string}  prop  - The property used to validate if items in B need to be merged into A.",
				"type": "string",
				"afterType": "prop  - The property used to validate if items in B need to be merged into A.",
				"name": "prop",
				"text": "The property used to validate if items in B need to be merged into A.\n"
			},
			{
				"source": "@return  {array} - A new array containing all unique elements from A and B.",
				"flag": "return",
				"after": "{array} - A new array containing all unique elements from A and B.",
				"type": "array",
				"afterType": "A new array containing all unique elements from A and B.",
				"text": "A new array containing all unique elements from A and B."
			}
		],
		"source": "A classic array merge routine.\n\n@method  merge\n\n@param   {array}  a     - The array that we will add items to if \"prop\"\n@param   {array}  b     - The array we will merge into A if one of it's item[prop] doesn't exists in A.\n@param   {string}  prop  - The property used to validate if items in B need to be merged into A.\n\n@return  {array} - A new array containing all unique elements from A and B.",
		"id": "documon.organizer.merge"
	},
	{
		"text": "Adds a class or package to the class or package object.\n\n",
		"start": 429,
		"end": 436,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@method  appendPageappendPage\n",
				"flag": "method",
				"after": "appendPage",
				"afterType": "appendPage",
				"name": "appendPage",
				"single": true,
				"text": "appendPage\n"
			},
			{
				"source": "@param   {type}      existingObj  - The object ot add the thing to.The object ot add the thing to.",
				"flag": "param",
				"after": "{type}      existingObj  - The object ot add the thing to.",
				"type": "type",
				"afterType": "existingObj  - The object ot add the thing to.",
				"name": "existingObj",
				"text": "The object ot add the thing to."
			},
			{
				"source": "@param   {type}      newObj       - THe thing we're adding.",
				"flag": "param",
				"after": "{type}      newObj       - THe thing we're adding.",
				"type": "type",
				"afterType": "newObj       - THe thing we're adding.",
				"name": "newObj",
				"text": "THe thing we're adding."
			}
		],
		"source": "Adds a class or package to the class or package object.\n\n@method  appendPage\n\n@param   {type}      existingObj  - The object ot add the thing to.\n@param   {type}      newObj       - THe thing we're adding.",
		"id": "documon.organizer.appendPage"
	},
	{
		"text": "Adds a new package to the main packages list. Creates a namespace (package) if not exist.\n\n",
		"start": 472,
		"end": 479,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@method  addToPackageListaddToPackageList\n",
				"flag": "method",
				"after": "addToPackageList",
				"afterType": "addToPackageList",
				"name": "addToPackageList",
				"single": true,
				"text": "addToPackageList\n"
			},
			{
				"source": "@param   {type}            list        - The main package list to add the package to.The main package list to add the package to.",
				"flag": "param",
				"after": "{type}            list        - The main package list to add the package to.",
				"type": "type",
				"afterType": "list        - The main package list to add the package to.",
				"name": "list",
				"text": "The main package list to add the package to."
			},
			{
				"source": "@param   {type}            taggedPage  - The package data.",
				"flag": "param",
				"after": "{type}            taggedPage  - The package data.",
				"type": "type",
				"afterType": "taggedPage  - The package data.",
				"name": "taggedPage",
				"text": "The package data."
			}
		],
		"source": "Adds a new package to the main packages list. Creates a namespace (package) if not exist.\n\n@method  addToPackageList\n\n@param   {type}            list        - The main package list to add the package to.\n@param   {type}            taggedPage  - The package data.",
		"id": "documon.organizer.addToPackageList"
	},
	{
		"text": "Adds tagged data to a class array. Ensures this item is only addded once, and also place a refernce to the item in the flat list for future processing.\n\n",
		"start": 514,
		"end": 521,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@method  addToClassListaddToClassList\n",
				"flag": "method",
				"after": "addToClassList",
				"afterType": "addToClassList",
				"name": "addToClassList",
				"single": true,
				"text": "addToClassList\n"
			},
			{
				"source": "@param   {type}          list        - The class array to add the item to.The class array to add the item to.",
				"flag": "param",
				"after": "{type}          list        - The class array to add the item to.",
				"type": "type",
				"afterType": "list        - The class array to add the item to.",
				"name": "list",
				"text": "The class array to add the item to."
			},
			{
				"source": "@param   {type}          taggedPage  - The data to add.",
				"flag": "param",
				"after": "{type}          taggedPage  - The data to add.",
				"type": "type",
				"afterType": "taggedPage  - The data to add.",
				"name": "taggedPage",
				"text": "The data to add."
			}
		],
		"source": "Adds tagged data to a class array. Ensures this item is only addded once, and also place a refernce to the item in the flat list for future processing.\n\n@method  addToClassList\n\n@param   {type}          list        - The class array to add the item to.\n@param   {type}          taggedPage  - The data to add.",
		"id": "documon.organizer.addToClassList"
	},
	{
		"text": "Adds source-code data to the organ. The data needs to be formated from the \"tag.js\" processor. By reading the data we determine where it is to be added to the main organ.\n\n",
		"start": 544,
		"end": 549,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@method  addadd",
				"flag": "method",
				"after": "add",
				"afterType": "add",
				"name": "add",
				"single": true,
				"text": "add"
			},
			{
				"source": "@param   {type}  VtaggedPage  - Source-code data parse by the tag.js processor.",
				"flag": "param",
				"after": "{type}  VtaggedPage  - Source-code data parse by the tag.js processor.",
				"type": "type",
				"afterType": "VtaggedPage  - Source-code data parse by the tag.js processor.",
				"name": "VtaggedPage",
				"text": "Source-code data parse by the tag.js processor."
			}
		],
		"source": "Adds source-code data to the organ. The data needs to be formated from the \"tag.js\" processor. By reading the data we determine where it is to be added to the main organ.\n\n@method  add\n@param   {type}  VtaggedPage  - Source-code data parse by the tag.js processor.",
		"id": "documon.organizer.add"
	},
	{
		"text": "Sorts all main sections of an organ on a given key. By default sorting is conducted on the \"id\" key.\n\n",
		"start": 577,
		"end": 584,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@method  sortObjsortObj\n",
				"flag": "method",
				"after": "sortObj",
				"afterType": "sortObj",
				"name": "sortObj",
				"single": true,
				"text": "sortObj\n"
			},
			{
				"source": "@param   {object}   obj   - The object to sortThe object to sort",
				"flag": "param",
				"after": "{object}   obj   - The object to sort",
				"type": "object",
				"afterType": "obj   - The object to sort",
				"name": "obj",
				"text": "The object to sort"
			},
			{
				"source": "@param   {string}   [prop=\"id\"]  - The key to sort on.",
				"flag": "param",
				"after": "{string}   [prop=\"id\"]  - The key to sort on.",
				"type": "string",
				"afterType": "[prop=\"id\"]  - The key to sort on.",
				"defaultVal": "id",
				"optional": true,
				"name": "prop",
				"text": "The key to sort on."
			}
		],
		"source": "Sorts all main sections of an organ on a given key. By default sorting is conducted on the \"id\" key.\n\n@method  sortObj\n\n@param   {object}   obj   - The object to sort\n@param   {string}   [prop=\"id\"]  - The key to sort on.",
		"id": "documon.organizer.sortObj"
	},
	{
		"text": "Generates a copy of the main organ that is sorted alphabetically, suitable for use wiht [menuBuilder](documon.menuBuilder)\n\n",
		"start": 625,
		"end": 631,
		"file": "/Volumes/Drives/projects/documon/documon/src/organizer.js",
		"flags": [
			{
				"source": "@method  buildMenubuildMenu\n",
				"flag": "method",
				"after": "buildMenu",
				"afterType": "buildMenu",
				"name": "buildMenu",
				"single": true,
				"text": "buildMenu\n"
			},
			{
				"source": "@return  {type}     description",
				"flag": "return",
				"after": "{type}     description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Generates a copy of the main organ that is sorted alphabetically, suitable for use wiht [menuBuilder](documon.menuBuilder)\n\n@method  buildMenu\n\n@return  {type}     description",
		"id": "documon.organizer.buildMenu"
	}
]