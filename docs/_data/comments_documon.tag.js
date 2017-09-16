[
	{
		"start": 11,
		"end": 68,
		"data": "\nProcesses the following flags\n\n- property\n- package, namespace\n- \n- property\n- method\n- event\n- class\n- module\n- \n- private\n- protected\n- static\n- public\n- readonly\n- \n- overrides\n- impliments\n- extends\n- inherits\n- \n- constructor\n- example\n- param\n- return, returns\n- \n- type\n- order\n- optional\n- header\n- defaultVal, default\n- see\n- requires\n\n\nFills the flags object\n\n\"Source Item\", are manufactured from the [parseFlag](parseFlag) class, and generally provided to many of the methods as the \"item\" argument, and they contain the following fields:\n\n\t\tSource Item {\n\t\t\tsource \t\t// Entire first line inlcuding the @flag (only first line)\n\t\t \tafter\t\t// Everything after the @flag\n\t\t\tname\t\t// One word following {type}. Or first word after the @flag definition when no {type}.\n\t\t\tchildren\t// name.kid - Array of children\n\t\t\tparent\t\t// if am a child, this is my parent.\n\t\t\tflag\t\t// @flag token with @ stripped\n\t\t\tdefaultVal\t// name=val\n\t\t\tafterType\t// first line after\n\t\t\ttext\t\t// \n\t\t}\n\n@class  tag\n@package  documon\n"
	},
	{
		"start": 275,
		"end": 280,
		"data": "\t\t\n@method  processOne\n@param  {Source Object} \t\titem \t- the source item as parsed from comments\n@return {object} \t\t\t- An object containing flag data"
	},
	{
		"start": 334,
		"end": 340,
		"data": "Process flags for an entire list of items\n\n@private\n@method processItems\n@param  {array} Vlist"
	},
	{
		"start": 428,
		"end": 437,
		"data": "[fillFlag description]\n\n@method  fillFlag\n\n@param   {type}    item  description\n@param   {type}    obj   description\n\n@return  {type}          description"
	}
]