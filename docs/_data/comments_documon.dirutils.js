[
	{
		"start": 6,
		"end": 11,
		"data": "A collection of utilities for manipulating directories syncronously.\n\n@module  dirutils\n@package  documon"
	},
	{
		"start": 26,
		"end": 42,
		"data": "Creates a folder at the specified location. The sub-folder heirarchy is\n constructed as needed.\n\n For example if a folder exists here:\n\n \t/path/to/folder\n\n ... but the following sub-folders don't exists:\n\n\t/path/to/folder/sub/one/two/three\n\n  ... Then the \"sub/one/two/three\" tree will be constructed inside \"/path/to/folder\")\n\n@method makedir\n@param  {string}  dest=\"path/to/make\" The destination folder to create"
	},
	{
		"start": 60,
		"end": 78,
		"data": "Collects files from a folder based on the specified extension (or\n extensions). Can be used to search recursively through all sub-folders, and can\n search multiple extensions.\n\n Provided as shortcut for [readdir](#readdir) with your own\n extension-checking filter.\n\n@method readExt\n\n@param  {string}\t\tfrom \t\t- The path to search\n@param  {string | array} [exts] \t- The extension to look for (e.g. \"jpg\"). To\n search for multiple extensions, use an array e.g. [\"jpg\", \"png\", \"gif\"]\n@param  {boolean}\t[recursive] - Find all matching files in all\n sub-folders.\n\n@return {array} - The resulting array contains only files that mathc the\n specified extension(s)."
	},
	{
		"start": 108,
		"end": 143,
		"data": "Read a folder and returns an object containing all of the files and\n folder in arrays.\n\n@method readdir\n\n@param  {string}  \tfrom      \t- The path to the folder to read.\n@param  {function}  \tfilter   \t- A custom filter funciton.\n@param  {boolean}  \trecursive \t- Should we retrieve sub-folders too?\n@param  {object}  \tstore     \t- Used internally to store recursive findings.\n Note that you may also provide this argument and readdir will populate your\n existing files/folder list. But is recommended to leave this argument alone.\n\n@return {object} - An object containing a list of \"files\" and \"folders\" \n (as properties of the returned list), where each is an array.\n\n@example\n \tvar contents = readdir(\"/path/to/folder\", null, true);\n \t// yeids contents {\n\t// \t\tfiles : [\n\t// \t\t\t\t\t\"/path/to/folder/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/3.png\",\n\t//\t\t\t\t\t\"/path/to/folder/sub1/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3/3.png\"\n\t// \t\t\t\t],\n\t// \t\tdirs : [\n\t// \t\t\t\t\t\"/path/to/folder/sub1\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3\"\n\t// \n\t// \t\t\t\t]\n\t// }\n"
	},
	{
		"start": 185,
		"end": 192,
		"data": "Copies the entire folder's heirarchy folder from one location to another. If the other location doesn't exists, it will be constructed.\n\n@method copydir\n\n@param  {string}  from - The source folder\n@param  {string}  to   - The destination folder (get's created if not exist)"
	},
	{
		"start": 214,
		"end": 223,
		"data": "Recursively empties a folder of all it's contents (and all the sub-folder's contents), but leaves the source folder.\n\n@method emptydir\n\n@param  {string}   \twho    - The source folder\n@param  {boolean}   \tdryRun - Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.\n\n@return {array} - An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true) "
	},
	{
		"start": 251,
		"end": 260,
		"data": "Recursively removes a folder and all of it's sub-folders as well.\n\n@method removedir\n\n@param  {string}\t\twho    \t- The path to the folder\n@param  {boolean}\tdryRun \t- Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.\n\n@return {array} - An array of all the items that were deleted (or \"will be\" deleted if dryrun is true."
	},
	{
		"start": 274,
		"end": 282,
		"data": "Checks to see if a folder exists.\n\n@method exists\n\n@param  {string} who The path to the folder.\n\n@return {boolean} duh"
	}
]