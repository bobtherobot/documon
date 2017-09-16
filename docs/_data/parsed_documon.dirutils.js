[
	{
		"text": "A collection of utilities for manipulating directories syncronously.\n\n",
		"start": 6,
		"end": 11,
		"file": "/Volumes/Drives/projects/documon/documon/src/dirutils.js",
		"flags": [
			{
				"source": "@module  dirutilsdirutils",
				"flag": "module",
				"after": "dirutils",
				"afterType": "dirutils",
				"name": "dirutils",
				"single": true,
				"text": "dirutils"
			},
			{
				"source": "@package  documon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
			}
		],
		"source": "A collection of utilities for manipulating directories syncronously.\n\n@module  dirutils\n@package  documon",
		"id": "documon.dirutils"
	},
	{
		"text": "Creates a folder at the specified location. The sub-folder heirarchy is\n constructed as needed.\n\n For example if a folder exists here:\n\n \t/path/to/folder\n\n ... but the following sub-folders don't exists:\n\n\t/path/to/folder/sub/one/two/three\n\n  ... Then the \"sub/one/two/three\" tree will be constructed inside \"/path/to/folder\")\n\n",
		"start": 26,
		"end": 42,
		"file": "/Volumes/Drives/projects/documon/documon/src/dirutils.js",
		"flags": [
			{
				"source": "@method makedirmakedir",
				"flag": "method",
				"after": "makedir",
				"afterType": "makedir",
				"name": "makedir",
				"single": true,
				"text": "makedir"
			},
			{
				"source": "@param  {string}  dest=\"path/to/make\" The destination folder to create",
				"flag": "param",
				"after": "{string}  dest=\"path/to/make\" The destination folder to create",
				"type": "string",
				"afterType": "dest=\"path/to/make\" The destination folder to create",
				"defaultVal": "path/to/make",
				"name": "dest",
				"text": "The destination folder to create"
			}
		],
		"source": "Creates a folder at the specified location. The sub-folder heirarchy is\n constructed as needed.\n\n For example if a folder exists here:\n\n \t/path/to/folder\n\n ... but the following sub-folders don't exists:\n\n\t/path/to/folder/sub/one/two/three\n\n  ... Then the \"sub/one/two/three\" tree will be constructed inside \"/path/to/folder\")\n\n@method makedir\n@param  {string}  dest=\"path/to/make\" The destination folder to create",
		"id": "documon.dirutils.makedir"
	},
	{
		"text": "Collects files from a folder based on the specified extension (or\n extensions). Can be used to search recursively through all sub-folders, and can\n search multiple extensions.\n\n Provided as shortcut for [readdir](#readdir) with your own\n extension-checking filter.\n\n",
		"start": 60,
		"end": 78,
		"file": "/Volumes/Drives/projects/documon/documon/src/dirutils.js",
		"flags": [
			{
				"source": "@method readExtreadExt\n",
				"flag": "method",
				"after": "readExt",
				"afterType": "readExt",
				"name": "readExt",
				"single": true,
				"text": "readExt\n"
			},
			{
				"source": "@param  {string}\t\tfrom \t\t- The path to searchThe path to search",
				"flag": "param",
				"after": "{string}\t\tfrom \t\t- The path to search",
				"type": "string",
				"afterType": "from \t\t- The path to search",
				"name": "from",
				"text": "The path to search"
			},
			{
				"source": "@param  {string | array} [exts] \t- The extension to look for (e.g. \"jpg\"). ToThe extension to look for (e.g. \"jpg\"). To\n search for multiple extensions, use an array e.g. [\"jpg\", \"png\", \"gif\"]",
				"flag": "param",
				"after": "{string | array} [exts] \t- The extension to look for (e.g. \"jpg\"). To",
				"type": "string | array",
				"afterType": "[exts] \t- The extension to look for (e.g. \"jpg\"). To",
				"optional": true,
				"name": "exts",
				"text": "The extension to look for (e.g. \"jpg\"). To\n search for multiple extensions, use an array e.g. [\"jpg\", \"png\", \"gif\"]"
			},
			{
				"source": "@param  {boolean}\t[recursive] - Find all matching files in allFind all matching files in all\n sub-folders.\n",
				"flag": "param",
				"after": "{boolean}\t[recursive] - Find all matching files in all",
				"type": "boolean",
				"afterType": "[recursive] - Find all matching files in all",
				"optional": true,
				"name": "recursive",
				"text": "Find all matching files in all\n sub-folders.\n"
			},
			{
				"source": "@return {array} - The resulting array contains only files that mathc the",
				"flag": "return",
				"after": "{array} - The resulting array contains only files that mathc the",
				"type": "array",
				"afterType": "The resulting array contains only files that mathc the",
				"text": "The resulting array contains only files that mathc the\n specified extension(s)."
			}
		],
		"source": "Collects files from a folder based on the specified extension (or\n extensions). Can be used to search recursively through all sub-folders, and can\n search multiple extensions.\n\n Provided as shortcut for [readdir](#readdir) with your own\n extension-checking filter.\n\n@method readExt\n\n@param  {string}\t\tfrom \t\t- The path to search\n@param  {string | array} [exts] \t- The extension to look for (e.g. \"jpg\"). To\n search for multiple extensions, use an array e.g. [\"jpg\", \"png\", \"gif\"]\n@param  {boolean}\t[recursive] - Find all matching files in all\n sub-folders.\n\n@return {array} - The resulting array contains only files that mathc the\n specified extension(s).",
		"id": "documon.dirutils.readExt"
	},
	{
		"text": "Read a folder and returns an object containing all of the files and\n folder in arrays.\n\n",
		"start": 108,
		"end": 143,
		"file": "/Volumes/Drives/projects/documon/documon/src/dirutils.js",
		"flags": [
			{
				"source": "@method readdirreaddir\n",
				"flag": "method",
				"after": "readdir",
				"afterType": "readdir",
				"name": "readdir",
				"single": true,
				"text": "readdir\n"
			},
			{
				"source": "@param  {string}  \tfrom      \t- The path to the folder to read.The path to the folder to read.",
				"flag": "param",
				"after": "{string}  \tfrom      \t- The path to the folder to read.",
				"type": "string",
				"afterType": "from      \t- The path to the folder to read.",
				"name": "from",
				"text": "The path to the folder to read."
			},
			{
				"source": "@param  {function}  \tfilter   \t- A custom filter funciton.A custom filter funciton.",
				"flag": "param",
				"after": "{function}  \tfilter   \t- A custom filter funciton.",
				"type": "function",
				"afterType": "filter   \t- A custom filter funciton.",
				"name": "filter",
				"text": "A custom filter funciton."
			},
			{
				"source": "@param  {boolean}  \trecursive \t- Should we retrieve sub-folders too?Should we retrieve sub-folders too?",
				"flag": "param",
				"after": "{boolean}  \trecursive \t- Should we retrieve sub-folders too?",
				"type": "boolean",
				"afterType": "recursive \t- Should we retrieve sub-folders too?",
				"name": "recursive",
				"text": "Should we retrieve sub-folders too?"
			},
			{
				"source": "@param  {object}  \tstore     \t- Used internally to store recursive findings.Used internally to store recursive findings.\n Note that you may also provide this argument and readdir will populate your\n existing files/folder list. But is recommended to leave this argument alone.\n",
				"flag": "param",
				"after": "{object}  \tstore     \t- Used internally to store recursive findings.",
				"type": "object",
				"afterType": "store     \t- Used internally to store recursive findings.",
				"name": "store",
				"text": "Used internally to store recursive findings.\n Note that you may also provide this argument and readdir will populate your\n existing files/folder list. But is recommended to leave this argument alone.\n"
			},
			{
				"source": "@return {object} - An object containing a list of \"files\" and \"folders\"An object containing a list of \"files\" and \"folders\"\n (as properties of the returned list), where each is an array.\n",
				"flag": "return",
				"after": "{object} - An object containing a list of \"files\" and \"folders\"",
				"type": "object",
				"afterType": "An object containing a list of \"files\" and \"folders\"",
				"text": "An object containing a list of \"files\" and \"folders\"\n (as properties of the returned list), where each is an array.\n"
			},
			{
				"source": "@example",
				"flag": "example",
				"after": "",
				"text": "\n \tvar contents = readdir(\"/path/to/folder\", null, true);\n \t// yeids contents {\n\t// \t\tfiles : [\n\t// \t\t\t\t\t\"/path/to/folder/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/3.png\",\n\t//\t\t\t\t\t\"/path/to/folder/sub1/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3/3.png\"\n\t// \t\t\t\t],\n\t// \t\tdirs : [\n\t// \t\t\t\t\t\"/path/to/folder/sub1\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3\"\n\t// \n\t// \t\t\t\t]\n\t// }\n"
			}
		],
		"source": "Read a folder and returns an object containing all of the files and\n folder in arrays.\n\n@method readdir\n\n@param  {string}  \tfrom      \t- The path to the folder to read.\n@param  {function}  \tfilter   \t- A custom filter funciton.\n@param  {boolean}  \trecursive \t- Should we retrieve sub-folders too?\n@param  {object}  \tstore     \t- Used internally to store recursive findings.\n Note that you may also provide this argument and readdir will populate your\n existing files/folder list. But is recommended to leave this argument alone.\n\n@return {object} - An object containing a list of \"files\" and \"folders\" \n (as properties of the returned list), where each is an array.\n\n@example\n \tvar contents = readdir(\"/path/to/folder\", null, true);\n \t// yeids contents {\n\t// \t\tfiles : [\n\t// \t\t\t\t\t\"/path/to/folder/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/3.png\",\n\t//\t\t\t\t\t\"/path/to/folder/sub1/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3/3.png\"\n\t// \t\t\t\t],\n\t// \t\tdirs : [\n\t// \t\t\t\t\t\"/path/to/folder/sub1\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3\"\n\t// \n\t// \t\t\t\t]\n\t// }\n",
		"id": "documon.dirutils.readdir"
	},
	{
		"text": "Copies the entire folder's heirarchy folder from one location to another. If the other location doesn't exists, it will be constructed.\n\n",
		"start": 185,
		"end": 192,
		"file": "/Volumes/Drives/projects/documon/documon/src/dirutils.js",
		"flags": [
			{
				"source": "@method copydircopydir\n",
				"flag": "method",
				"after": "copydir",
				"afterType": "copydir",
				"name": "copydir",
				"single": true,
				"text": "copydir\n"
			},
			{
				"source": "@param  {string}  from - The source folderThe source folder",
				"flag": "param",
				"after": "{string}  from - The source folder",
				"type": "string",
				"afterType": "from - The source folder",
				"name": "from",
				"text": "The source folder"
			},
			{
				"source": "@param  {string}  to   - The destination folder (get's created if not exist)",
				"flag": "param",
				"after": "{string}  to   - The destination folder (get's created if not exist)",
				"type": "string",
				"afterType": "to   - The destination folder (get's created if not exist)",
				"name": "to",
				"text": "The destination folder (get's created if not exist)"
			}
		],
		"source": "Copies the entire folder's heirarchy folder from one location to another. If the other location doesn't exists, it will be constructed.\n\n@method copydir\n\n@param  {string}  from - The source folder\n@param  {string}  to   - The destination folder (get's created if not exist)",
		"id": "documon.dirutils.copydir"
	},
	{
		"text": "Recursively empties a folder of all it's contents (and all the sub-folder's contents), but leaves the source folder.\n\n",
		"start": 214,
		"end": 223,
		"file": "/Volumes/Drives/projects/documon/documon/src/dirutils.js",
		"flags": [
			{
				"source": "@method emptydiremptydir\n",
				"flag": "method",
				"after": "emptydir",
				"afterType": "emptydir",
				"name": "emptydir",
				"single": true,
				"text": "emptydir\n"
			},
			{
				"source": "@param  {string}   \twho    - The source folderThe source folder",
				"flag": "param",
				"after": "{string}   \twho    - The source folder",
				"type": "string",
				"afterType": "who    - The source folder",
				"name": "who",
				"text": "The source folder"
			},
			{
				"source": "@param  {boolean}   \tdryRun - Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.\n",
				"flag": "param",
				"after": "{boolean}   \tdryRun - Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.",
				"type": "boolean",
				"afterType": "dryRun - Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.",
				"name": "dryRun",
				"text": "Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.\n"
			},
			{
				"source": "@return {array} - An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true)",
				"flag": "return",
				"after": "{array} - An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true)",
				"type": "array",
				"afterType": "An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true)",
				"text": "An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true)"
			}
		],
		"source": "Recursively empties a folder of all it's contents (and all the sub-folder's contents), but leaves the source folder.\n\n@method emptydir\n\n@param  {string}   \twho    - The source folder\n@param  {boolean}   \tdryRun - Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.\n\n@return {array} - An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true) ",
		"id": "documon.dirutils.emptydir"
	},
	{
		"text": "Recursively removes a folder and all of it's sub-folders as well.\n\n",
		"start": 251,
		"end": 260,
		"file": "/Volumes/Drives/projects/documon/documon/src/dirutils.js",
		"flags": [
			{
				"source": "@method removedirremovedir\n",
				"flag": "method",
				"after": "removedir",
				"afterType": "removedir",
				"name": "removedir",
				"single": true,
				"text": "removedir\n"
			},
			{
				"source": "@param  {string}\t\twho    \t- The path to the folderThe path to the folder",
				"flag": "param",
				"after": "{string}\t\twho    \t- The path to the folder",
				"type": "string",
				"afterType": "who    \t- The path to the folder",
				"name": "who",
				"text": "The path to the folder"
			},
			{
				"source": "@param  {boolean}\tdryRun \t- Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.\n",
				"flag": "param",
				"after": "{boolean}\tdryRun \t- Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.",
				"type": "boolean",
				"afterType": "dryRun \t- Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.",
				"name": "dryRun",
				"text": "Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.\n"
			},
			{
				"source": "@return {array} - An array of all the items that were deleted (or \"will be\" deleted if dryrun is true.",
				"flag": "return",
				"after": "{array} - An array of all the items that were deleted (or \"will be\" deleted if dryrun is true.",
				"type": "array",
				"afterType": "An array of all the items that were deleted (or \"will be\" deleted if dryrun is true.",
				"text": "An array of all the items that were deleted (or \"will be\" deleted if dryrun is true."
			}
		],
		"source": "Recursively removes a folder and all of it's sub-folders as well.\n\n@method removedir\n\n@param  {string}\t\twho    \t- The path to the folder\n@param  {boolean}\tdryRun \t- Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.\n\n@return {array} - An array of all the items that were deleted (or \"will be\" deleted if dryrun is true.",
		"id": "documon.dirutils.removedir"
	},
	{
		"text": "Checks to see if a folder exists.\n\n",
		"start": 274,
		"end": 282,
		"file": "/Volumes/Drives/projects/documon/documon/src/dirutils.js",
		"flags": [
			{
				"source": "@method existsexists\n",
				"flag": "method",
				"after": "exists",
				"afterType": "exists",
				"name": "exists",
				"single": true,
				"text": "exists\n"
			},
			{
				"source": "@param  {string} who The path to the folder.The path to the folder.\n",
				"flag": "param",
				"after": "{string} who The path to the folder.",
				"type": "string",
				"afterType": "who The path to the folder.",
				"name": "who",
				"text": "The path to the folder.\n"
			},
			{
				"source": "@return {boolean} duh",
				"flag": "return",
				"after": "{boolean} duh",
				"type": "boolean",
				"afterType": "duh",
				"name": "duh",
				"single": true,
				"text": "duh"
			}
		],
		"source": "Checks to see if a folder exists.\n\n@method exists\n\n@param  {string} who The path to the folder.\n\n@return {boolean} duh",
		"id": "documon.dirutils.exists"
	}
]