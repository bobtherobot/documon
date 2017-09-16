[
	{
		"text": "Writes to the console. Will accept an object or array as well as string, boolena and other and prepare them for proper presentation to the console.\n\n",
		"start": 6,
		"end": 31,
		"file": "/Volumes/Drives/projects/documon/documon/src/log.js",
		"flags": [
			{
				"source": "@module loglog",
				"flag": "module",
				"after": "log",
				"afterType": "log",
				"name": "log",
				"single": true,
				"text": "log"
			},
			{
				"source": "@package  documondocumon\n",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon\n"
			},
			{
				"source": "@param  {any}  \t\tdata \t- A string, array or object to outputA string, array or object to output",
				"flag": "param",
				"after": "{any}  \t\tdata \t- A string, array or object to output",
				"type": "any",
				"afterType": "data \t- A string, array or object to output",
				"name": "data",
				"text": "A string, array or object to output"
			},
			{
				"source": "@param  {string}  \ttitle \t- A title for the messageA title for the message",
				"flag": "param",
				"after": "{string}  \ttitle \t- A title for the message",
				"type": "string",
				"afterType": "title \t- A title for the message",
				"name": "title",
				"text": "A title for the message"
			},
			{
				"source": "@param  {type}  \t\tquiet \t- Disables logging (prevents console output.Disables logging (prevents console output.\n",
				"flag": "param",
				"after": "{type}  \t\tquiet \t- Disables logging (prevents console output.",
				"type": "type",
				"afterType": "quiet \t- Disables logging (prevents console output.",
				"name": "quiet",
				"text": "Disables logging (prevents console output.\n"
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n\n\tvar log = require(\"log\");\n\tlog([\"foo\", \"bar\"], \"Some Title\", false);\n\nprints:\n\n\t\t--------------------\n\t\tSome Title\n\t\t--------------------\n\t\t[\n\t\t\t'foo',\n\t\t\t'bar'\n\t\t]\n\t\t"
			}
		],
		"source": "Writes to the console. Will accept an object or array as well as string, boolena and other and prepare them for proper presentation to the console.\n\n@module log\n@package  documon\n\n@param  {any}  \t\tdata \t- A string, array or object to output\n@param  {string}  \ttitle \t- A title for the message\n@param  {type}  \t\tquiet \t- Disables logging (prevents console output.\n\n@example\n\n\tvar log = require(\"log\");\n\tlog([\"foo\", \"bar\"], \"Some Title\", false);\n\nprints:\n\n\t\t--------------------\n\t\tSome Title\n\t\t--------------------\n\t\t[\n\t\t\t'foo',\n\t\t\t'bar'\n\t\t]\n\t\t",
		"id": "documon.log"
	}
]