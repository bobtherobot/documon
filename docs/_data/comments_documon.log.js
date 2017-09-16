[
	{
		"start": 6,
		"end": 31,
		"data": "Writes to the console. Will accept an object or array as well as string, boolena and other and prepare them for proper presentation to the console.\n\n@module log\n@package  documon\n\n@param  {any}  \t\tdata \t- A string, array or object to output\n@param  {string}  \ttitle \t- A title for the message\n@param  {type}  \t\tquiet \t- Disables logging (prevents console output.\n\n@example\n\n\tvar log = require(\"log\");\n\tlog([\"foo\", \"bar\"], \"Some Title\", false);\n\nprints:\n\n\t\t--------------------\n\t\tSome Title\n\t\t--------------------\n\t\t[\n\t\t\t'foo',\n\t\t\t'bar'\n\t\t]\n\t\t"
	}
]