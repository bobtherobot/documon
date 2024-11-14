[
	{
		"text": "Processes the following flags\n\n- property\n- package, namespace\n- \n- property\n- method\n- event\n- class\n- module\n- \n- private\n- protected\n- static\n- public\n- readonly\n- \n- overrides\n- impliments\n- extends\n- inherits\n- \n- constructor\n- example\n- param\n- return, returns\n- \n- type\n- order\n- optional\n- header\n- defaultVal, default\n- see\n- requires\n\n\nFills the flags object\n\n\"Source Item\", are manufactured from the [parseFlag](parseFlag) class, and generally provided to many of the methods as the \"item\" argument, and they contain the following fields:\n\n\t\tSource Item {\n\t\t\tsource \t\t// Entire first line inlcuding the @flag (only first line)\n\t\t \tafter\t\t// Everything after the @flag\n\t\t\tname\t\t// One word following {type}. Or first word after the @flag definition when no {type}.\n\t\t\tchildren\t// name.kid - Array of children\n\t\t\tparent\t\t// if am a child, this is my parent.\n\t\t\tflag\t\t// @flag token with @ stripped\n\t\t\tdefaultVal\t// name=val\n\t\t\tafterType\t// first line after\n\t\t\ttext\t\t// \n\t\t}\n\n",
		"start": 11,
		"end": 68,
		"file": "/Volumes/Drives/projects/documon/documon/src/tag.js",
		"flags": [
			{
				"source": "@class  tagtag",
				"flag": "class",
				"after": "tag",
				"afterType": "tag",
				"name": "tag",
				"single": true,
				"text": "tag"
			},
			{
				"source": "@package  documon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon\n"
			}
		],
		"source": "\nProcesses the following flags\n\n- property\n- package, namespace\n- \n- property\n- method\n- event\n- class\n- module\n- \n- private\n- protected\n- static\n- public\n- readonly\n- \n- overrides\n- impliments\n- extends\n- inherits\n- \n- constructor\n- example\n- param\n- return, returns\n- \n- type\n- order\n- optional\n- header\n- defaultVal, default\n- see\n- requires\n\n\nFills the flags object\n\n\"Source Item\", are manufactured from the [parseFlag](parseFlag) class, and generally provided to many of the methods as the \"item\" argument, and they contain the following fields:\n\n\t\tSource Item {\n\t\t\tsource \t\t// Entire first line inlcuding the @flag (only first line)\n\t\t \tafter\t\t// Everything after the @flag\n\t\t\tname\t\t// One word following {type}. Or first word after the @flag definition when no {type}.\n\t\t\tchildren\t// name.kid - Array of children\n\t\t\tparent\t\t// if am a child, this is my parent.\n\t\t\tflag\t\t// @flag token with @ stripped\n\t\t\tdefaultVal\t// name=val\n\t\t\tafterType\t// first line after\n\t\t\ttext\t\t// \n\t\t}\n\n@class  tag\n@package  documon\n",
		"id": "documon.tag"
	},
	{
		"text": "",
		"start": 275,
		"end": 280,
		"file": "/Volumes/Drives/projects/documon/documon/src/tag.js",
		"flags": [
			{
				"source": "@method  processOneprocessOne",
				"flag": "method",
				"after": "processOne",
				"afterType": "processOne",
				"name": "processOne",
				"single": true,
				"text": "processOne"
			},
			{
				"source": "@param  {Source Object} \t\titem \t- the source item as parsed from commentsthe source item as parsed from comments",
				"flag": "param",
				"after": "{Source Object} \t\titem \t- the source item as parsed from comments",
				"type": "Source Object",
				"afterType": "item \t- the source item as parsed from comments",
				"name": "item",
				"text": "the source item as parsed from comments"
			},
			{
				"source": "@return {object} \t\t\t- An object containing flag data",
				"flag": "return",
				"after": "{object} \t\t\t- An object containing flag data",
				"type": "object",
				"afterType": "An object containing flag data",
				"text": "An object containing flag data"
			}
		],
		"source": "\t\t\n@method  processOne\n@param  {Source Object} \t\titem \t- the source item as parsed from comments\n@return {object} \t\t\t- An object containing flag data",
		"id": "documon.tag.processOne"
	},
	{
		"text": "Process flags for an entire list of items\n\n",
		"start": 334,
		"end": 340,
		"file": "/Volumes/Drives/projects/documon/documon/src/tag.js",
		"flags": [
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@method processItemsprocessItems",
				"flag": "method",
				"after": "processItems",
				"afterType": "processItems",
				"name": "processItems",
				"single": true,
				"text": "processItems"
			},
			{
				"source": "@param  {array} Vlist",
				"flag": "param",
				"after": "{array} Vlist",
				"type": "array",
				"afterType": "Vlist",
				"name": "Vlist",
				"single": true,
				"text": "Vlist"
			}
		],
		"source": "Process flags for an entire list of items\n\n@private\n@method processItems\n@param  {array} Vlist",
		"id": "documon.tag.processItems"
	},
	{
		"text": "[fillFlag description]\n\n",
		"start": 428,
		"end": 437,
		"file": "/Volumes/Drives/projects/documon/documon/src/tag.js",
		"flags": [
			{
				"source": "@method  fillFlagfillFlag\n",
				"flag": "method",
				"after": "fillFlag",
				"afterType": "fillFlag",
				"name": "fillFlag",
				"single": true,
				"text": "fillFlag\n"
			},
			{
				"source": "@param   {type}    item  descriptiondescription",
				"flag": "param",
				"after": "{type}    item  description",
				"type": "type",
				"afterType": "item  description",
				"name": "item",
				"text": "description"
			},
			{
				"source": "@param   {type}    obj   descriptiondescription\n",
				"flag": "param",
				"after": "{type}    obj   description",
				"type": "type",
				"afterType": "obj   description",
				"name": "obj",
				"text": "description\n"
			},
			{
				"source": "@return  {type}          description",
				"flag": "return",
				"after": "{type}          description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "[fillFlag description]\n\n@method  fillFlag\n\n@param   {type}    item  description\n@param   {type}    obj   description\n\n@return  {type}          description",
		"id": "documon.tag.fillFlag"
	}
]