[
	{
		"start": 7,
		"end": 12,
		"data": "Basic, common and simplified asyncronous file methods.\n\n@package documon\n@class  fileutils"
	},
	{
		"start": 17,
		"end": 23,
		"data": "Copies a file from one location to another.\n\n@method     copy\n@param      {string}    src     - The source file path.\n@param      {string}    dest    - The destination to copy the source to."
	},
	{
		"start": 38,
		"end": 44,
		"data": "Reads the entire file as a string. NOTE: This is an alias for [read](#read).\n\n@method     Open\n@param      {string}    src    - The source file path.\n@return     {string}           description"
	},
	{
		"start": 46,
		"end": 52,
		"data": "Reads the entire file as a string.\n\n@method     read\n@param      {string}    src    - The source file path.\n@return     {string}           description"
	},
	{
		"start": 61,
		"end": 67,
		"data": "Saves text data to a file. Overwrites entire file with provided data. NOTE:  This is an alias for [write](#write).\n\n@method     save\n@param      {string}    src    - The source file path.\n@param      {string}    data    - The text data to save."
	},
	{
		"start": 69,
		"end": 75,
		"data": "Saves text data to a file. Overwrites entire file with provided data.\n\n@method     write\n@param      {string}    src    - The source file path.\n@param      {string}    data    - The text data to save."
	},
	{
		"start": 80,
		"end": 84,
		"data": "Deletes a file from the system.\n@method     remove\n@param      {string}    src    - The source file path."
	},
	{
		"start": 89,
		"end": 95,
		"data": "Cehcsk to see if a file exists. Note this also checks if a folder of the same name exists too.\n@method     exists\n@private\n@param      {type}    src    - The source file path.\n@return     {boolean}           - True if exists, false if no file nor folder exists."
	}
]