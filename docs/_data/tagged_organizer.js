{
	"line": 71,
	"name": "organizer",
	"shortText": "Organizes the parsed source-code data into a single object that takes the following form:",
	"shortHtml": "<p>Organizes the parsed source-code data into a single object that takes the following form:</p>",
	"text": "Organizes the parsed source-code data into a single object that takes the following form:\n\n\torgan = {\n\n\t\t// There will always be a root node with an absolute ID of \"root\"\n\t\tid : \"root\",\n\t\tname : \"root\",\n\t\tfile : \"root.html\",\n\t\tdocfile : \"root.html\",\n\n\t\tpackages : [\n\n\t\t\t\t{ \n\t\t\t\t\tpackages : foo\n\n\t\t\t\t\t// Classes included in this package\n\t\t\t\t\tclasses : [\n\n\t\t\t\t\t\t{\t\n\t\t\t\t\t\t\tclass : \"foo\"\n\t\t\t\t\t\t\tmethods : [],\n\t\t\t\t\t\t\tproperties : [],\n\t\t\t\t\t\t\tevents : []\n\t\t\t\t\t\t},\n\n\t\t\t\t\t\t... etc ... \n\t\t\t\t\t],\n\n\t\t\t\t\t// Loose stuff found in this package\n\t\t\t\t\tmethods : [],\n\t\t\t\t\tproperties : [],\n\t\t\t\t\tevents : []\n\t\t\t\t}\n\t\t\n\t\t],\n\n\t\t// Independent classes that are not part of any package\n\t\tclasses : [\n\t\t\t{\t\n\t\t\t\tclass : \"foo\"\n\t\t\t\tmethods : [],\n\t\t\t\tproperties : [],\n\t\t\t\tevents : []\n\t\t\t}\n\t\t\t... etc ... \n\t\t],\n\n\t\t// Loose stuff that's not part of any package or class, assumed to be accessible \"this\" (e.g. in javascript it would be the \"window\" scope)\n\t\tmethods : [],\n\t\tproperties : [],\n\t\tevents : [],\n\n\t};\n \n\nAll source code hangs off of the \"root\" node and is organized according it's relationship to a package or class.\n\nThis organizer is initialized prior to parsing source code, and as each file is parsed, it is added to the organizer. After all the source-code is finished parsing, the organizer wires up adn cross references inheritance.\n\n",
	"html": "<p>Organizes the parsed source-code data into a single object that takes the following form:</p>\n\n<pre class=\"prettyprint\">organ = {\n\n    // There will always be a root node with an absolute ID of \"root\"\n    id : \"root\",\n    name : \"root\",\n    file : \"root.html\",\n    docfile : \"root.html\",\n\n    packages : [\n\n            { \n                packages : foo\n\n                // Classes included in this package\n                classes : [\n\n                    {   \n                        class : \"foo\"\n                        methods : [],\n                        properties : [],\n                        events : []\n                    },\n\n                    ... etc ... \n                ],\n\n                // Loose stuff found in this package\n                methods : [],\n                properties : [],\n                events : []\n            }\n\n    ],\n\n    // Independent classes that are not part of any package\n    classes : [\n        {   \n            class : \"foo\"\n            methods : [],\n            properties : [],\n            events : []\n        }\n        ... etc ... \n    ],\n\n    // Loose stuff that's not part of any package or class, assumed to be accessible \"this\" (e.g. in javascript it would be the \"window\" scope)\n    methods : [],\n    properties : [],\n    events : [],\n\n};</pre>\n\n<p>All source code hangs off of the \"root\" node and is organized according it's relationship to a package or class.</p>\n\n<p>This organizer is initialized prior to parsing source code, and as each file is parsed, it is added to the organizer. After all the source-code is finished parsing, the organizer wires up adn cross references inheritance.</p>",
	"entity": "class",
	"flagSearchText": " organizer documon\n",
	"package": "documon",
	"file": "documon/src/organizer.js",
	"filename": "organizer.js",
	"klass": "organizer",
	"docfile": "documon.organizer.html",
	"id": "documon.organizer",
	"methods": [
		{
			"line": 550,
			"name": "add",
			"shortText": "Adds source-code data to the organ. The data needs to be formated from the \"tag.js\" processor. By reading the data we determine where it is to be added to the main organ.",
			"shortHtml": "<p>Adds source-code data to the organ. The data needs to be formated from the \"tag.js\" processor. By reading the data we determine where it is to be added to the main organ.</p>",
			"text": "Adds source-code data to the organ. The data needs to be formated from the \"tag.js\" processor. By reading the data we determine where it is to be added to the main organ.\n\n",
			"html": "<p>Adds source-code data to the organ. The data needs to be formated from the \"tag.js\" processor. By reading the data we determine where it is to be added to the main organ.</p>",
			"entity": "method",
			"flagSearchText": " add Source-code data parse by the tag.js processor.",
			"params": [
				{
					"name": "VtaggedPage",
					"shortText": "Source-code data parse by the tag.js processor.",
					"shortHtml": "<p>Source-code data parse by the tag.js processor.</p>",
					"text": "Source-code data parse by the tag.js processor.",
					"html": "<p>Source-code data parse by the tag.js processor.</p>",
					"type": "type"
				}
			],
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.add"
		},
		{
			"line": 522,
			"name": "addToClassList",
			"shortText": "Adds tagged data to a class array. Ensures this item is only addded once, and also place a refernce to the item in the flat list for future processing.",
			"shortHtml": "<p>Adds tagged data to a class array. Ensures this item is only addded once, and also place a refernce to the item in the flat list for future processing.</p>",
			"text": "Adds tagged data to a class array. Ensures this item is only addded once, and also place a refernce to the item in the flat list for future processing.\n\n",
			"html": "<p>Adds tagged data to a class array. Ensures this item is only addded once, and also place a refernce to the item in the flat list for future processing.</p>",
			"entity": "method",
			"flagSearchText": " addToClassList\n The class array to add the item to. The data to add.",
			"params": [
				{
					"name": "list",
					"shortText": "The class array to add the item to.",
					"shortHtml": "<p>The class array to add the item to.</p>",
					"text": "The class array to add the item to.",
					"html": "<p>The class array to add the item to.</p>",
					"type": "type"
				},
				{
					"name": "taggedPage",
					"shortText": "The data to add.",
					"shortHtml": "<p>The data to add.</p>",
					"text": "The data to add.",
					"html": "<p>The data to add.</p>",
					"type": "type"
				}
			],
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.addToClassList"
		},
		{
			"line": 480,
			"name": "addToPackageList",
			"shortText": "Adds a new package to the main packages list. Creates a namespace (package) if not exist.",
			"shortHtml": "<p>Adds a new package to the main packages list. Creates a namespace (package) if not exist.</p>",
			"text": "Adds a new package to the main packages list. Creates a namespace (package) if not exist.\n\n",
			"html": "<p>Adds a new package to the main packages list. Creates a namespace (package) if not exist.</p>",
			"entity": "method",
			"flagSearchText": " addToPackageList\n The main package list to add the package to. The package data.",
			"params": [
				{
					"name": "list",
					"shortText": "The main package list to add the package to.",
					"shortHtml": "<p>The main package list to add the package to.</p>",
					"text": "The main package list to add the package to.",
					"html": "<p>The main package list to add the package to.</p>",
					"type": "type"
				},
				{
					"name": "taggedPage",
					"shortText": "The package data.",
					"shortHtml": "<p>The package data.</p>",
					"text": "The package data.",
					"html": "<p>The package data.</p>",
					"type": "type"
				}
			],
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.addToPackageList"
		},
		{
			"line": 437,
			"name": "appendPage",
			"shortText": "Adds a class or package to the class or package object.",
			"shortHtml": "<p>Adds a class or package to the class or package object.</p>",
			"text": "Adds a class or package to the class or package object.\n\n",
			"html": "<p>Adds a class or package to the class or package object.</p>",
			"entity": "method",
			"flagSearchText": " appendPage\n The object ot add the thing to. THe thing we're adding.",
			"params": [
				{
					"name": "existingObj",
					"shortText": "The object ot add the thing to.",
					"shortHtml": "<p>The object ot add the thing to.</p>",
					"text": "The object ot add the thing to.",
					"html": "<p>The object ot add the thing to.</p>",
					"type": "type"
				},
				{
					"name": "newObj",
					"shortText": "THe thing we're adding.",
					"shortHtml": "<p>THe thing we're adding.</p>",
					"text": "THe thing we're adding.",
					"html": "<p>THe thing we're adding.</p>",
					"type": "type"
				}
			],
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.appendPage"
		},
		{
			"line": 632,
			"name": "buildMenu",
			"shortText": "Generates a copy of the main organ that is sorted alphabetically, suitable for use wiht [menuBuilder](documon.menuBuilder)",
			"shortHtml": "<p>Generates a copy of the main organ that is sorted alphabetically, suitable for use wiht <a href=\"documon.menuBuilder\">menuBuilder</a></p>",
			"text": "Generates a copy of the main organ that is sorted alphabetically, suitable for use wiht [menuBuilder](documon.menuBuilder)\n\n",
			"html": "<p>Generates a copy of the main organ that is sorted alphabetically, suitable for use wiht <a href=\"documon.menuBuilder\">menuBuilder</a></p>",
			"entity": "method",
			"flagSearchText": " buildMenu\n description",
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.buildMenu"
		},
		{
			"line": 309,
			"name": "init",
			"shortText": "Initializes the the \"organ\", which is an object that we'll be inserting all the tagged data into.",
			"shortHtml": "<p>Initializes the the \"organ\", which is an object that we'll be inserting all the tagged data into.</p>",
			"text": "Initializes the the \"organ\", which is an object that we'll be inserting all the tagged data into.\n\nWe'll also be grabbing the templates needed based on the location defined in the params.\n\n",
			"html": "<p>Initializes the the \"organ\", which is an object that we'll be inserting all the tagged data into.</p>\n\n<p>We'll also be grabbing the templates needed based on the location defined in the params.</p>",
			"entity": "method",
			"flagSearchText": " init The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.",
			"params": [
				{
					"name": "params",
					"shortText": "The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.",
					"shortHtml": "<p>The configuration options sent in by the user during <a href=\"documon.mainConf\">documon.mainConf</a>. We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.</p>",
					"text": "The configuration options sent in by the user during [documon.mainConf](documon.mainConf). We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.",
					"html": "<p>The configuration options sent in by the user during <a href=\"documon.mainConf\">documon.mainConf</a>. We keep a refence here so we know where to put things. Note that documon derives some additional properties onto the object.</p>",
					"type": "type",
					"children": [
						{
							"name": "templateFolder",
							"shortText": "The base path to the template folder.",
							"shortHtml": "<p>The base path to the template folder.</p>",
							"text": "The base path to the template folder.",
							"html": "<p>The base path to the template folder.</p>",
							"type": "type"
						}
					]
				}
			],
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.init"
		},
		{
			"line": 381,
			"name": "merge",
			"shortText": "A classic array merge routine.",
			"shortHtml": "<p>A classic array merge routine.</p>",
			"text": "A classic array merge routine.\n\n",
			"html": "<p>A classic array merge routine.</p>",
			"entity": "method",
			"flagSearchText": " merge\n The array that we will add items to if \"prop\" The array we will merge into A if one of it's item[prop] doesn't exists in A. The property used to validate if items in B need to be merged into A.\n A new array containing all unique elements from A and B.",
			"params": [
				{
					"name": "a",
					"shortText": "The array that we will add items to if \"prop\"",
					"shortHtml": "<p>The array that we will add items to if \"prop\"</p>",
					"text": "The array that we will add items to if \"prop\"",
					"html": "<p>The array that we will add items to if \"prop\"</p>",
					"type": "array"
				},
				{
					"name": "b",
					"shortText": "The array we will merge into A if one of it's item[prop] doesn't exists in A.",
					"shortHtml": "<p>The array we will merge into A if one of it's item[prop] doesn't exists in A.</p>",
					"text": "The array we will merge into A if one of it's item[prop] doesn't exists in A.",
					"html": "<p>The array we will merge into A if one of it's item[prop] doesn't exists in A.</p>",
					"type": "array"
				},
				{
					"name": "prop",
					"shortText": "The property used to validate if items in B need to be merged into A.",
					"shortHtml": "<p>The property used to validate if items in B need to be merged into A.</p>",
					"text": "The property used to validate if items in B need to be merged into A.\n",
					"html": "<p>The property used to validate if items in B need to be merged into A.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "array",
				"text": "A new array containing all unique elements from A and B.",
				"html": "<p>A new array containing all unique elements from A and B.</p>",
				"shortText": "<p>A new array containing all unique elements from A and B.</p>",
				"shortHtml": "<p>A new array containing all unique elements from A and B.</p>"
			},
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.merge"
		},
		{
			"line": 585,
			"name": "sortObj",
			"shortText": "Sorts all main sections of an organ on a given key. By default sorting is conducted on the \"id\" key.",
			"shortHtml": "<p>Sorts all main sections of an organ on a given key. By default sorting is conducted on the \"id\" key.</p>",
			"text": "Sorts all main sections of an organ on a given key. By default sorting is conducted on the \"id\" key.\n\n",
			"html": "<p>Sorts all main sections of an organ on a given key. By default sorting is conducted on the \"id\" key.</p>",
			"entity": "method",
			"flagSearchText": " sortObj\n The object to sort The key to sort on.",
			"params": [
				{
					"name": "obj",
					"shortText": "The object to sort",
					"shortHtml": "<p>The object to sort</p>",
					"text": "The object to sort",
					"html": "<p>The object to sort</p>",
					"type": "object"
				},
				{
					"name": "prop",
					"shortText": "The key to sort on.",
					"shortHtml": "<p>The key to sort on.</p>",
					"text": "The key to sort on.",
					"html": "<p>The key to sort on.</p>",
					"type": "string",
					"optional": true,
					"defaultVal": "\"id\"]"
				}
			],
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.sortObj"
		}
	],
	"properties": [
		{
			"line": 100,
			"name": "flatClassList",
			"shortText": "We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array.",
			"shortHtml": "<p>We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array.</p>",
			"text": "We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array.",
			"html": "<p>We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array.</p>",
			"type": "Object",
			"entity": "property",
			"flagSearchText": " We maintain a \"flat list\" as a means to cross reference items that are stuffed into the main array.",
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.flatClassList"
		},
		{
			"line": 80,
			"name": "mainConf",
			"shortText": "A reference to the main configuration object. See [documon.mainConf](documon.mainConf).",
			"shortHtml": "<p>A reference to the main configuration object. See <a href=\"documon.mainConf\">documon.mainConf</a>.</p>",
			"text": "A reference to the main configuration object. See [documon.mainConf](documon.mainConf).",
			"html": "<p>A reference to the main configuration object. See <a href=\"documon.mainConf\">documon.mainConf</a>.</p>",
			"type": "Object",
			"entity": "property",
			"flagSearchText": " A reference to the main configuration object. See [documon.mainConf](documon.mainConf).",
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.mainConf"
		},
		{
			"line": 85,
			"name": "organ",
			"shortText": "The primary object we store all data into.",
			"shortHtml": "<p>The primary object we store all data into.</p>",
			"text": "The primary object we store all data into.",
			"html": "<p>The primary object we store all data into.</p>",
			"type": "Object",
			"entity": "property",
			"flagSearchText": " The primary object we store all data into.",
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.organ"
		},
		{
			"line": 106,
			"name": "sectionNames",
			"shortText": "The complete list of sections a class or package can contain.",
			"shortHtml": "<p>The complete list of sections a class or package can contain.</p>",
			"text": "The complete list of sections a class or package can contain.",
			"html": "<p>The complete list of sections a class or package can contain.</p>",
			"type": "Array",
			"entity": "property",
			"flagSearchText": " The complete list of sections a class or package can contain.",
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.sectionNames"
		},
		{
			"line": 95,
			"name": "Tclass",
			"shortText": "The class template processor (jst file).",
			"shortHtml": "<p>The class template processor (jst file).</p>",
			"text": "The class template processor (jst file).",
			"html": "<p>The class template processor (jst file).</p>",
			"type": "Template",
			"entity": "property",
			"flagSearchText": " The class template processor (jst file).",
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.Tclass"
		},
		{
			"line": 90,
			"name": "Tpackage",
			"shortText": "The package template processor (jst file).",
			"shortHtml": "<p>The package template processor (jst file).</p>",
			"text": "The package template processor (jst file).",
			"html": "<p>The package template processor (jst file).</p>",
			"type": "Template",
			"entity": "property",
			"flagSearchText": " The package template processor (jst file).",
			"file": "documon/src/organizer.js",
			"filename": "organizer.js",
			"klass": "organizer",
			"package": "documon",
			"docfile": "documon.organizer.html",
			"id": "documon.organizer.Tpackage"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "0.0.1",
	"search": {
		"documon.organizer": "organizer : Organizes parsed source code data into single object that takes following form organ There will always root node with absolute root root name root file root html docfile root html packages packages Classes included this package classes class methods properties events Loose stuff found this package methods properties events Independent classes that part package classes class methods properties events Loose stuff that part package class assumed accessible this javascript would window scope methods properties events source code hangs root node organized according relationship package class This organizer initialized prior parsing source code each file parsed added organizer After source code finished parsing organizer wires cross references inheritanceorganizer documon",
		"documon.organizer.init": "init : Initializes organ which object that inserting tagged data into also grabbing templates needed based location defined paramsinit configuration options sent user during documon mainConf documon mainConf keep refence here know where things Note that documon derives some additional properties onto object",
		"documon.organizer.merge": "merge : classic array merge routinemerge array that will items prop array will merge into item prop doesn exists property used validate items need merged into array containing unique elements from",
		"documon.organizer.appendPage": "appendPage : Adds class package class package objectappendPage object thing thing adding",
		"documon.organizer.addToPackageList": "addToPackageList : Adds package main packages list Creates namespace package existaddToPackageList main package list package package data",
		"documon.organizer.addToClassList": "addToClassList : Adds tagged data class array Ensures this item only addded once also place refernce item flat list future processingaddToClassList class array item data",
		"documon.organizer.add": "add : Adds source code data organ data needs formated from processor reading data determine where added main organSource code data parse processor",
		"documon.organizer.sortObj": "sortObj : Sorts main sections organ given default sorting conductedsortObj object sort sort",
		"documon.organizer.buildMenu": "buildMenu : Generates copy main organ that sorted alphabetically suitable wiht menuBuilder documon menuBuilderbuildMenu description",
		"documon.organizer.mainConf": "mainConf : reference main configuration object documon mainConf documon mainConfreference main configuration object documon mainConf documon mainConf",
		"documon.organizer.organ": "organ : primary object store data intoprimary object store data into",
		"documon.organizer.Tpackage": "Tpackage : package template processor filepackage template processor file",
		"documon.organizer.Tclass": "Tclass : class template processor fileclass template processor file",
		"documon.organizer.flatClassList": "flatClassList : maintain flat list means cross reference items that stuffed into main arraymaintain flat list means cross reference items that stuffed into main array",
		"documon.organizer.sectionNames": "sectionNames : complete list sections class package containcomplete list sections class package contain"
	}
}