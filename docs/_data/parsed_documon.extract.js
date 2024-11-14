[
	{
		"text": "Extracts comments from a file into an array or mulit-dementional array when the \"text\" arg contains mulitple __package__ or __namepsace__ definitions.\n\nEach entry in the returned array will be an object containing 3 properties\n - __start__ : The line number that the comment started on\n - __end__ : The line number that the comment ended on\n - __data__ : The contents of the comment\n\n\tvar myComments = extract(str);\n\tyields : [\n\t\t\t\t{ \n\t\t\t\t\tstart : 12,\n\t\t\t\t\tend : 32,\n\t\t\t\t\tdata : \"the descript\"\n\t\t\t\t},\n\t\t\t\t{ \n\t\t\t\t\tstart : 12,\n\t\t\t\t\tend : 32,\n\t\t\t\t\tdata : \"the descript\"\n\t\t\t\t}\n\t\t]\n\n## A few things of note:\n- The data will NOT include the beginDoc, nor the endDoc strings.\n- Comment prefixing is stripped \n\t\t- *  [star space]\n\t\t- tabs\n\t\t- spaces\n- Code blocks maintain indentation.\n- Splitting on __package__ or __namespace__. When a single file contains mulitple references to a \"__package__\" or \"__namespace__\" comments will split into multiple arrays -- treating the single source file as being mulitple files. \n\nSplit __Example__:\n\n\t&#47;**\n\t* Class A\n\t* @package foo <-- this designates a new \"page\"\n\t*&#47;\n\n\t&#47;**\n\t* Something for A\n\t* @method something\n\t*&#47;\n \n\t&#47;**\n\t* Class B\n\t* @package bar <-- this designates a new \"page\"\n\t*&#47;\n \n\t&#47;**\n\t* Something for B\n\t* @method something\n\t*&#47;\n\t\n\tvar myComments = extract(str);\n\tyields : [\n\t\t\t\t[ // the first \"page\"\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 12,\n\t\t\t\t\t\tend : 32,\n\t\t\t\t\t\tdata : \"Class A ... \"\n\t\t\t\t\t},\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 12,\n\t\t\t\t\t\tend : 32,\n\t\t\t\t\t\tdata : \"Something for A ...\"\n\t\t\t\t\t},\n\t\t\n\t\t\t\t],\n\t\t\t\t[ // the second \"page\"\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 64,\n\t\t\t\t\t\tend : 96,\n\t\t\t\t\t\tdata : \"Class B ... \"\n\t\t\t\t\t},\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 128,\n\t\t\t\t\t\tend : 142,\n\t\t\t\t\t\tdata : \"Something for B ...\"\n\t\t\t\t\t},\n\t\t\t\t,\n\t\t\t]\n\n",
		"start": 6,
		"end": 95,
		"file": "/Volumes/Drives/projects/documon/documon/src/extract.js",
		"flags": [
			{
				"source": "@class extractextract",
				"flag": "class",
				"after": "extract",
				"afterType": "extract",
				"name": "extract",
				"single": true,
				"text": "extract"
			},
			{
				"source": "@package documondocumon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
			},
			{
				"source": "@param {string} text - the entire file as a stringthe entire file as a string",
				"flag": "param",
				"after": "{string} text - the entire file as a string",
				"type": "string",
				"afterType": "text - the entire file as a string",
				"name": "text",
				"text": "the entire file as a string"
			},
			{
				"source": "@param {string} [beginDoc=\"&#47;**\"] - The string is used to \"open\" a comment.The string is used to \"open\" a comment.",
				"flag": "param",
				"after": "{string} [beginDoc=\"&#47;**\"] - The string is used to \"open\" a comment.",
				"type": "string",
				"afterType": "[beginDoc=\"&#47;**\"] - The string is used to \"open\" a comment.",
				"defaultVal": "&#47;**",
				"optional": true,
				"name": "beginDoc",
				"text": "The string is used to \"open\" a comment."
			},
			{
				"source": "@param {string} [endDoc=\"*&#47;\"] - The string is used to \"close\" a comment.The string is used to \"close\" a comment.",
				"flag": "param",
				"after": "{string} [endDoc=\"*&#47;\"] - The string is used to \"close\" a comment.",
				"type": "string",
				"afterType": "[endDoc=\"*&#47;\"] - The string is used to \"close\" a comment.",
				"defaultVal": "*&#47;",
				"optional": true,
				"name": "endDoc",
				"text": "The string is used to \"close\" a comment."
			},
			{
				"source": "@returns {array} - An array of comments, or multi-dimentional array oaf page comments.",
				"flag": "returns",
				"after": "{array} - An array of comments, or multi-dimentional array oaf page comments.",
				"type": "array",
				"afterType": "An array of comments, or multi-dimentional array oaf page comments.",
				"text": "An array of comments, or multi-dimentional array oaf page comments.\n"
			}
		],
		"source": "Extracts comments from a file into an array or mulit-dementional array when the \"text\" arg contains mulitple __package__ or __namepsace__ definitions.\n\nEach entry in the returned array will be an object containing 3 properties\n - __start__ : The line number that the comment started on\n - __end__ : The line number that the comment ended on\n - __data__ : The contents of the comment\n\n\tvar myComments = extract(str);\n\tyields : [\n\t\t\t\t{ \n\t\t\t\t\tstart : 12,\n\t\t\t\t\tend : 32,\n\t\t\t\t\tdata : \"the descript\"\n\t\t\t\t},\n\t\t\t\t{ \n\t\t\t\t\tstart : 12,\n\t\t\t\t\tend : 32,\n\t\t\t\t\tdata : \"the descript\"\n\t\t\t\t}\n\t\t]\n\n## A few things of note:\n- The data will NOT include the beginDoc, nor the endDoc strings.\n- Comment prefixing is stripped \n\t\t- *  [star space]\n\t\t- tabs\n\t\t- spaces\n- Code blocks maintain indentation.\n- Splitting on __package__ or __namespace__. When a single file contains mulitple references to a \"__package__\" or \"__namespace__\" comments will split into multiple arrays -- treating the single source file as being mulitple files. \n\nSplit __Example__:\n\n\t&#47;**\n\t* Class A\n\t* @package foo <-- this designates a new \"page\"\n\t*&#47;\n\n\t&#47;**\n\t* Something for A\n\t* @method something\n\t*&#47;\n \n\t&#47;**\n\t* Class B\n\t* @package bar <-- this designates a new \"page\"\n\t*&#47;\n \n\t&#47;**\n\t* Something for B\n\t* @method something\n\t*&#47;\n\t\n\tvar myComments = extract(str);\n\tyields : [\n\t\t\t\t[ // the first \"page\"\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 12,\n\t\t\t\t\t\tend : 32,\n\t\t\t\t\t\tdata : \"Class A ... \"\n\t\t\t\t\t},\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 12,\n\t\t\t\t\t\tend : 32,\n\t\t\t\t\t\tdata : \"Something for A ...\"\n\t\t\t\t\t},\n\t\t\n\t\t\t\t],\n\t\t\t\t[ // the second \"page\"\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 64,\n\t\t\t\t\t\tend : 96,\n\t\t\t\t\t\tdata : \"Class B ... \"\n\t\t\t\t\t},\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 128,\n\t\t\t\t\t\tend : 142,\n\t\t\t\t\t\tdata : \"Something for B ...\"\n\t\t\t\t\t},\n\t\t\t\t,\n\t\t\t]\n\n@class extract\n@package documon\n@param {string} text - the entire file as a string\n@param {string} [beginDoc=\"&#47;**\"] - The string is used to \"open\" a comment.\n@param {string} [endDoc=\"*&#47;\"] - The string is used to \"close\" a comment.\n@returns {array} - An array of comments, or multi-dimentional array oaf page comments.\n",
		"id": "documon.extract"
	}
]