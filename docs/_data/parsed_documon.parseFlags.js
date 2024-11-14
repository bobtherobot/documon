[
	{
		"text": "Fills the output object with the following properties (if they exist)\n\n\t\tobject {\n\t\t\tsource \t\t// Entire first line inlcuding the @flag (only first line)\n\t\t\tafter\t\t// Everything after the @flag\n\t\t\tname\t\t// One word following {type}. Or first word after the @flag definition when no {type}.\n\t\t\tchildren\t// name.kid - Array of children\n\t\t\tparent\t\t// if am a child, this is my parent.\n\t\t\tflag\t\t// @flag token with @ stripped\n\t\t\tdefaultVal\t// name=val\n\t\t\tafterType\t// first line after\n\t\t\ttext\t\t// \n\t\t}\n\nHere's an expanded and exmple'd definition list\n\nsource\n: The entire comment block\n\nafter\n: Everything after the @flag token \"as is\" (kinda like source)\n\n- __source__ : The entire comment block\n- __after__ : \t\tEverything after the @flag token \"as is\" (kinda like source)\n\n\te.g. in this line:\n",
		"start": 126,
		"end": 191,
		"file": "/Volumes/Drives/projects/documon/documon/src/parseFlag.js",
		"flags": [
			{
				"source": "@foo {type} name descrdescr\n\t\t after yields:\n\t\t \t{type} name descr\n\n- __name__ : \t\tThe first word following the {type} definition. Or the first word after the @flag definition\n\n- __children__ : \tIf a name is written as foo.bar then foo is the parent and bar is a child. Future processing fills the array forming a heirarchy.\n- __parent__ : \t\tThe parent flag of a child. This property only exists on children flags.\n- __defaultVal__ : \tWhen name=foo then default value will be foo. Note that quotes are stripped.\n\t\t\t\te.g. foo=\"bar\" sets default property to \"bar\" (without the quotes) and name property to \"foo\".\n- __flag__ : \t\tThe flag kind - the @ is stripped\n- __afterType__ : \tEverything after the {type} definition\n\t\t\t\te.g. @flag {type} name - descr\n\t\t\t\t\t... yields:\n\t\t\t\t\tname - descr\n- __text__ : \t\tThe description for the paramter. Note that additional description text can be provided below the @flag.\n\t\t\t\t\te.g. @flag {type} name - description\n\t\t\t\t\tmore description\n\t\t\t\t\tbelow the flag here\n\n\n",
				"flag": "foo",
				"after": "{type} name descr",
				"type": "type",
				"afterType": "name descr",
				"name": "name",
				"text": "descr\n\t\t after yields:\n\t\t \t{type} name descr\n\n- __name__ : \t\tThe first word following the {type} definition. Or the first word after the @flag definition\n\n- __children__ : \tIf a name is written as foo.bar then foo is the parent and bar is a child. Future processing fills the array forming a heirarchy.\n- __parent__ : \t\tThe parent flag of a child. This property only exists on children flags.\n- __defaultVal__ : \tWhen name=foo then default value will be foo. Note that quotes are stripped.\n\t\t\t\te.g. foo=\"bar\" sets default property to \"bar\" (without the quotes) and name property to \"foo\".\n- __flag__ : \t\tThe flag kind - the @ is stripped\n- __afterType__ : \tEverything after the {type} definition\n\t\t\t\te.g. @flag {type} name - descr\n\t\t\t\t\t... yields:\n\t\t\t\t\tname - descr\n- __text__ : \t\tThe description for the paramter. Note that additional description text can be provided below the @flag.\n\t\t\t\t\te.g. @flag {type} name - description\n\t\t\t\t\tmore description\n\t\t\t\t\tbelow the flag here",
				"children": [
					{
						"source": "@flag {kind} name.child=defaultVal - description \\n stuff on next line \\n and other next lines...description \\n stuff on next line \\n and other next lines...\n\t\t|flag|\n\t\t                       |defaultVal|\n\t\t                 |child|\n\t\t            |parent|\n\t\t            |name|\n\t\t                                     |text ------------------------------------------------------|\n\t\t            |afterType ---------------------------|\n\t\t      |after -------------------------------------|\n\t\t|source ------------------------------------------|\n\n\n",
						"flag": "flag",
						"after": "{kind} name.child=defaultVal - description \\n stuff on next line \\n and other next lines...",
						"type": "kind",
						"afterType": "name.child=defaultVal - description \\n stuff on next line \\n and other next lines...",
						"defaultVal": "defaultVal",
						"parent": "name",
						"name": "child",
						"text": "description \\n stuff on next line \\n and other next lines...\n\t\t|flag|\n\t\t                       |defaultVal|\n\t\t                 |child|\n\t\t            |parent|\n\t\t            |name|\n\t\t                                     |text ------------------------------------------------------|\n\t\t            |afterType ---------------------------|\n\t\t      |after -------------------------------------|\n\t\t|source ------------------------------------------|\n\n\n"
					}
				],
				"shortText": "descr",
				"shortHtml": "<p>descr</p>",
				"html": "<p>descr<br />\n         after yields:<br />\n            {type} name descr</p>\n<ul>\n<li><p><strong>name</strong> :         The first word following the {type} definition. Or the first word after the <a href=\"https://github.com/flag\">@flag</a> definition</p></li>\n<li><p><strong>children</strong> :     If a name is written as foo.bar then foo is the parent and bar is a child. Future processing fills the array forming a heirarchy.</p></li>\n<li><p><strong>parent</strong> :         The parent flag of a child. This property only exists on children flags.</p></li>\n<li><p><strong>defaultVal</strong> :     When name=foo then default value will be foo. Note that quotes are stripped.<br />\n            e.g. foo=\"bar\" sets default property to \"bar\" (without the quotes) and name property to \"foo\".</p></li>\n<li><p><strong>flag</strong> :         The flag kind - the @ is stripped</p></li>\n<li><p><strong>afterType</strong> :     Everything after the {type} definition<br />\n            e.g. <a href=\"https://github.com/flag\">@flag</a> {type} name - descr<br />\n                … yields:<br />\n                name - descr</p></li>\n<li><p><strong>text</strong> :         The description for the paramter. Note that additional description text can be provided below the <a href=\"https://github.com/flag\">@flag</a>.<br />\n                e.g. <a href=\"https://github.com/flag\">@flag</a> {type} name - description<br />\n                more description<br />\n                below the flag here</p></li>\n</ul>"
			},
			{
				"source": "@class parseFlagsparseFlags",
				"flag": "class",
				"after": "parseFlags",
				"afterType": "parseFlags",
				"name": "parseFlags",
				"single": true,
				"text": "parseFlags"
			},
			{
				"source": "@package documon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
			}
		],
		"source": "\nFills the output object with the following properties (if they exist)\n\n\t\tobject {\n\t\t\tsource \t\t// Entire first line inlcuding the @flag (only first line)\n\t\t\tafter\t\t// Everything after the @flag\n\t\t\tname\t\t// One word following {type}. Or first word after the @flag definition when no {type}.\n\t\t\tchildren\t// name.kid - Array of children\n\t\t\tparent\t\t// if am a child, this is my parent.\n\t\t\tflag\t\t// @flag token with @ stripped\n\t\t\tdefaultVal\t// name=val\n\t\t\tafterType\t// first line after\n\t\t\ttext\t\t// \n\t\t}\n\nHere's an expanded and exmple'd definition list\n\nsource\n: The entire comment block\n\nafter\n: Everything after the @flag token \"as is\" (kinda like source)\n\n- __source__ : The entire comment block\n- __after__ : \t\tEverything after the @flag token \"as is\" (kinda like source)\n\n\te.g. in this line:\n\t\t\t@foo {type} name descr\n\t\t after yields:\n\t\t \t{type} name descr\n\n- __name__ : \t\tThe first word following the {type} definition. Or the first word after the @flag definition\n\n- __children__ : \tIf a name is written as foo.bar then foo is the parent and bar is a child. Future processing fills the array forming a heirarchy.\n- __parent__ : \t\tThe parent flag of a child. This property only exists on children flags.\n- __defaultVal__ : \tWhen name=foo then default value will be foo. Note that quotes are stripped.\n\t\t\t\te.g. foo=\"bar\" sets default property to \"bar\" (without the quotes) and name property to \"foo\".\n- __flag__ : \t\tThe flag kind - the @ is stripped\n- __afterType__ : \tEverything after the {type} definition\n\t\t\t\te.g. @flag {type} name - descr\n\t\t\t\t\t... yields:\n\t\t\t\t\tname - descr\n- __text__ : \t\tThe description for the paramter. Note that additional description text can be provided below the @flag.\n\t\t\t\t\te.g. @flag {type} name - description\n\t\t\t\t\tmore description\n\t\t\t\t\tbelow the flag here\n\n\n\n\t\t@flag {kind} name.child=defaultVal - description \\n stuff on next line \\n and other next lines...\n\t\t|flag|\n\t\t                       |defaultVal|\n\t\t                 |child|\n\t\t            |parent|\n\t\t            |name|\n\t\t                                     |text ------------------------------------------------------|\n\t\t            |afterType ---------------------------|\n\t\t      |after -------------------------------------|\n\t\t|source ------------------------------------------|\n\n\n\n@class parseFlags\n@package documon",
		"id": "documon.parseFlags"
	}
]