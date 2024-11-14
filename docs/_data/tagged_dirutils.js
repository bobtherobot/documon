{
	"line": 12,
	"name": "dirutils",
	"shortText": "A collection of utilities for manipulating directories syncronously.",
	"shortHtml": "<p>A collection of utilities for manipulating directories syncronously.</p>",
	"text": "A collection of utilities for manipulating directories syncronously.\n\n",
	"html": "<p>A collection of utilities for manipulating directories syncronously.</p>",
	"entity": "module",
	"flagSearchText": " dirutils documon",
	"package": "documon",
	"file": "documon/src/dirutils.js",
	"filename": "dirutils.js",
	"klass": "dirutils",
	"docfile": "documon.dirutils.html",
	"id": "documon.dirutils",
	"methods": [
		{
			"line": 193,
			"name": "copydir",
			"shortText": "Copies the entire folder's heirarchy folder from one location to another. If the other location doesn't exists, it will be constructed.",
			"shortHtml": "<p>Copies the entire folder's heirarchy folder from one location to another. If the other location doesn't exists, it will be constructed.</p>",
			"text": "Copies the entire folder's heirarchy folder from one location to another. If the other location doesn't exists, it will be constructed.\n\n",
			"html": "<p>Copies the entire folder's heirarchy folder from one location to another. If the other location doesn't exists, it will be constructed.</p>",
			"entity": "method",
			"flagSearchText": " copydir\n The source folder The destination folder (get's created if not exist)",
			"params": [
				{
					"name": "from",
					"shortText": "The source folder",
					"shortHtml": "<p>The source folder</p>",
					"text": "The source folder",
					"html": "<p>The source folder</p>",
					"type": "string"
				},
				{
					"name": "to",
					"shortText": "The destination folder (get's created if not exist)",
					"shortHtml": "<p>The destination folder (get's created if not exist)</p>",
					"text": "The destination folder (get's created if not exist)",
					"html": "<p>The destination folder (get's created if not exist)</p>",
					"type": "string"
				}
			],
			"file": "documon/src/dirutils.js",
			"filename": "dirutils.js",
			"klass": "dirutils",
			"package": "documon",
			"docfile": "documon.dirutils.html",
			"id": "documon.dirutils.copydir"
		},
		{
			"line": 224,
			"name": "emptydir",
			"shortText": "Recursively empties a folder of all it's contents (and all the sub-folder's contents), but leaves the source folder.",
			"shortHtml": "<p>Recursively empties a folder of all it's contents (and all the sub-folder's contents), but leaves the source folder.</p>",
			"text": "Recursively empties a folder of all it's contents (and all the sub-folder's contents), but leaves the source folder.\n\n",
			"html": "<p>Recursively empties a folder of all it's contents (and all the sub-folder's contents), but leaves the source folder.</p>",
			"entity": "method",
			"flagSearchText": " emptydir\n The source folder Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.\n An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true)",
			"params": [
				{
					"name": "who",
					"shortText": "The source folder",
					"shortHtml": "<p>The source folder</p>",
					"text": "The source folder",
					"html": "<p>The source folder</p>",
					"type": "string"
				},
				{
					"name": "dryRun",
					"shortText": "Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.",
					"shortHtml": "<p>Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.</p>",
					"text": "Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.\n",
					"html": "<p>Prevents actual deletion, but still allows the return list to display what \"will\" be deleted.</p>",
					"type": "boolean"
				}
			],
			"returns": {
				"type": "array",
				"text": "An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true)",
				"html": "<p>An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true)</p>",
				"shortText": "<p>An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true)</p>",
				"shortHtml": "<p>An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true)</p>"
			},
			"file": "documon/src/dirutils.js",
			"filename": "dirutils.js",
			"klass": "dirutils",
			"package": "documon",
			"docfile": "documon.dirutils.html",
			"id": "documon.dirutils.emptydir"
		},
		{
			"line": 283,
			"name": "exists",
			"shortText": "Checks to see if a folder exists.",
			"shortHtml": "<p>Checks to see if a folder exists.</p>",
			"text": "Checks to see if a folder exists.\n\n",
			"html": "<p>Checks to see if a folder exists.</p>",
			"entity": "method",
			"flagSearchText": " exists\n The path to the folder.\n duh",
			"params": [
				{
					"name": "who",
					"shortText": "The path to the folder.",
					"shortHtml": "<p>The path to the folder.</p>",
					"text": "The path to the folder.\n",
					"html": "<p>The path to the folder.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "boolean",
				"text": "duh duh",
				"html": "<p>duh duh</p>",
				"shortText": "<p>duh duh</p>",
				"shortHtml": "<p>duh duh</p>"
			},
			"file": "documon/src/dirutils.js",
			"filename": "dirutils.js",
			"klass": "dirutils",
			"package": "documon",
			"docfile": "documon.dirutils.html",
			"id": "documon.dirutils.exists"
		},
		{
			"line": 43,
			"name": "makedir",
			"shortText": "Creates a folder at the specified location. The sub-folder heirarchy is",
			"shortHtml": "<p>Creates a folder at the specified location. The sub-folder heirarchy is</p>",
			"text": "Creates a folder at the specified location. The sub-folder heirarchy is\n constructed as needed.\n\n For example if a folder exists here:\n\n \t/path/to/folder\n\n ... but the following sub-folders don't exists:\n\n\t/path/to/folder/sub/one/two/three\n\n  ... Then the \"sub/one/two/three\" tree will be constructed inside \"/path/to/folder\")\n\n",
			"html": "<p>Creates a folder at the specified location. The sub-folder heirarchy is\n constructed as needed.</p>\n<p>For example if a folder exists here:</p>\n<pre><code> /path/to/folder\n</code></pre>\n<p>… but the following sub-folders don't exists:</p>\n<pre><code>/path/to/folder/sub/one/two/three\n</code></pre>\n<p>… Then the \"sub/one/two/three\" tree will be constructed inside \"/path/to/folder\")</p>",
			"entity": "method",
			"flagSearchText": " makedir The destination folder to create",
			"params": [
				{
					"name": "dest",
					"shortText": "The destination folder to create",
					"shortHtml": "<p>The destination folder to create</p>",
					"text": "The destination folder to create",
					"html": "<p>The destination folder to create</p>",
					"type": "string",
					"defaultVal": "path/to/make"
				}
			],
			"file": "documon/src/dirutils.js",
			"filename": "dirutils.js",
			"klass": "dirutils",
			"package": "documon",
			"docfile": "documon.dirutils.html",
			"id": "documon.dirutils.makedir"
		},
		{
			"line": 144,
			"name": "readdir",
			"shortText": "Read a folder and returns an object containing all of the files and",
			"shortHtml": "<p>Read a folder and returns an object containing all of the files and</p>",
			"text": "Read a folder and returns an object containing all of the files and\n folder in arrays.\n\n",
			"html": "<p>Read a folder and returns an object containing all of the files and\n folder in arrays.</p>",
			"entity": "method",
			"flagSearchText": " readdir\n The path to the folder to read. A custom filter funciton. Should we retrieve sub-folders too? Used internally to store recursive findings.\n Note that you may also provide this argument and readdir will populate your\n existing files/folder list. But is recommended to leave this argument alone.\n An object containing a list of \"files\" and \"folders\"\n (as properties of the returned list), where each is an array.\n \n \tvar contents = readdir(\"/path/to/folder\", null, true);\n \t// yeids contents {\n\t// \t\tfiles : [\n\t// \t\t\t\t\t\"/path/to/folder/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/3.png\",\n\t//\t\t\t\t\t\"/path/to/folder/sub1/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3/3.png\"\n\t// \t\t\t\t],\n\t// \t\tdirs : [\n\t// \t\t\t\t\t\"/path/to/folder/sub1\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3\"\n\t// \n\t// \t\t\t\t]\n\t// }\n",
			"params": [
				{
					"name": "from",
					"shortText": "The path to the folder to read.",
					"shortHtml": "<p>The path to the folder to read.</p>",
					"text": "The path to the folder to read.",
					"html": "<p>The path to the folder to read.</p>",
					"type": "string"
				},
				{
					"name": "filter",
					"shortText": "A custom filter funciton.",
					"shortHtml": "<p>A custom filter funciton.</p>",
					"text": "A custom filter funciton.",
					"html": "<p>A custom filter funciton.</p>",
					"type": "function"
				},
				{
					"name": "recursive",
					"shortText": "Should we retrieve sub-folders too?",
					"shortHtml": "<p>Should we retrieve sub-folders too?</p>",
					"text": "Should we retrieve sub-folders too?",
					"html": "<p>Should we retrieve sub-folders too?</p>",
					"type": "boolean"
				},
				{
					"name": "store",
					"shortText": "Used internally to store recursive findings.",
					"shortHtml": "<p>Used internally to store recursive findings.</p>",
					"text": "Used internally to store recursive findings.\n Note that you may also provide this argument and readdir will populate your\n existing files/folder list. But is recommended to leave this argument alone.\n",
					"html": "<p>Used internally to store recursive findings.\n Note that you may also provide this argument and readdir will populate your\n existing files/folder list. But is recommended to leave this argument alone.</p>",
					"type": "object"
				}
			],
			"returns": {
				"type": "object",
				"text": "An object containing a list of \"files\" and \"folders\"\n (as properties of the returned list), where each is an array.\n",
				"html": "<p>An object containing a list of \"files\" and \"folders\"\n (as properties of the returned list), where each is an array.</p>",
				"shortText": "<p>An object containing a list of \"files\" and \"folders\"</p>",
				"shortHtml": "<p>An object containing a list of \"files\" and \"folders\"</p>"
			},
			"example": [
				{
					"text": "\n \tvar contents = readdir(\"/path/to/folder\", null, true);\n \t// yeids contents {\n\t// \t\tfiles : [\n\t// \t\t\t\t\t\"/path/to/folder/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/3.png\",\n\t//\t\t\t\t\t\"/path/to/folder/sub1/1.foo\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2/2.bar\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3/3.png\"\n\t// \t\t\t\t],\n\t// \t\tdirs : [\n\t// \t\t\t\t\t\"/path/to/folder/sub1\",\n\t// \t\t\t\t\t\"/path/to/folder/sub2\",\n\t// \t\t\t\t\t\"/path/to/folder/sub3\"\n\t// \n\t// \t\t\t\t]\n\t// }\n",
					"html": "<pre><code> var contents = readdir(\"/path/to/folder\", null, true);\n // yeids contents {\n//      files : [\n//                  \"/path/to/folder/1.foo\",\n//                  \"/path/to/folder/2.bar\",\n//                  \"/path/to/folder/3.png\",\n//                  \"/path/to/folder/sub1/1.foo\",\n//                  \"/path/to/folder/sub2/2.bar\",\n//                  \"/path/to/folder/sub3/3.png\"\n//              ],\n//      dirs : [\n//                  \"/path/to/folder/sub1\",\n//                  \"/path/to/folder/sub2\",\n//                  \"/path/to/folder/sub3\"\n// \n//              ]\n// }\n</code></pre>"
				}
			],
			"file": "documon/src/dirutils.js",
			"filename": "dirutils.js",
			"klass": "dirutils",
			"package": "documon",
			"docfile": "documon.dirutils.html",
			"id": "documon.dirutils.readdir"
		},
		{
			"line": 79,
			"name": "readExt",
			"shortText": "Collects files from a folder based on the specified extension (or",
			"shortHtml": "<p>Collects files from a folder based on the specified extension (or</p>",
			"text": "Collects files from a folder based on the specified extension (or\n extensions). Can be used to search recursively through all sub-folders, and can\n search multiple extensions.\n\n Provided as shortcut for [readdir](#readdir) with your own\n extension-checking filter.\n\n",
			"html": "<p>Collects files from a folder based on the specified extension (or\n extensions). Can be used to search recursively through all sub-folders, and can\n search multiple extensions.</p>\n<p>Provided as shortcut for <a href=\"#readdir\">readdir</a> with your own\n extension-checking filter.</p>",
			"entity": "method",
			"flagSearchText": " readExt\n The path to search The extension to look for (e.g. \"jpg\"). To\n search for multiple extensions, use an array e.g. [\"jpg\", \"png\", \"gif\"] Find all matching files in all\n sub-folders.\n The resulting array contains only files that mathc the\n specified extension(s).",
			"params": [
				{
					"name": "from",
					"shortText": "The path to search",
					"shortHtml": "<p>The path to search</p>",
					"text": "The path to search",
					"html": "<p>The path to search</p>",
					"type": "string"
				},
				{
					"name": "exts",
					"shortText": "The extension to look for (e.g. \"jpg\"). To",
					"shortHtml": "<p>The extension to look for (e.g. \"jpg\"). To</p>",
					"text": "The extension to look for (e.g. \"jpg\"). To\n search for multiple extensions, use an array e.g. [\"jpg\", \"png\", \"gif\"]",
					"html": "<p>The extension to look for (e.g. \"jpg\"). To\n search for multiple extensions, use an array e.g. [\"jpg\", \"png\", \"gif\"]</p>",
					"type": "string | array",
					"optional": true
				},
				{
					"name": "recursive",
					"shortText": "Find all matching files in all",
					"shortHtml": "<p>Find all matching files in all</p>",
					"text": "Find all matching files in all\n sub-folders.\n",
					"html": "<p>Find all matching files in all\n sub-folders.</p>",
					"type": "boolean",
					"optional": true
				}
			],
			"returns": {
				"type": "array",
				"text": "The resulting array contains only files that mathc the\n specified extension(s).",
				"html": "<p>The resulting array contains only files that mathc the\n specified extension(s).</p>",
				"shortText": "<p>The resulting array contains only files that mathc the</p>",
				"shortHtml": "<p>The resulting array contains only files that mathc the</p>"
			},
			"file": "documon/src/dirutils.js",
			"filename": "dirutils.js",
			"klass": "dirutils",
			"package": "documon",
			"docfile": "documon.dirutils.html",
			"id": "documon.dirutils.readExt"
		},
		{
			"line": 261,
			"name": "removedir",
			"shortText": "Recursively removes a folder and all of it's sub-folders as well.",
			"shortHtml": "<p>Recursively removes a folder and all of it's sub-folders as well.</p>",
			"text": "Recursively removes a folder and all of it's sub-folders as well.\n\n",
			"html": "<p>Recursively removes a folder and all of it's sub-folders as well.</p>",
			"entity": "method",
			"flagSearchText": " removedir\n The path to the folder Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.\n An array of all the items that were deleted (or \"will be\" deleted if dryrun is true.",
			"params": [
				{
					"name": "who",
					"shortText": "The path to the folder",
					"shortHtml": "<p>The path to the folder</p>",
					"text": "The path to the folder",
					"html": "<p>The path to the folder</p>",
					"type": "string"
				},
				{
					"name": "dryRun",
					"shortText": "Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.",
					"shortHtml": "<p>Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.</p>",
					"text": "Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.\n",
					"html": "<p>Prevents actual deletion, but still allows the return to return the list of items that \"will\" be deleted.</p>",
					"type": "boolean"
				}
			],
			"returns": {
				"type": "array",
				"text": "An array of all the items that were deleted (or \"will be\" deleted if dryrun is true.",
				"html": "<p>An array of all the items that were deleted (or \"will be\" deleted if dryrun is true.</p>",
				"shortText": "<p>An array of all the items that were deleted (or \"will be\" deleted if dryrun is true.</p>",
				"shortHtml": "<p>An array of all the items that were deleted (or \"will be\" deleted if dryrun is true.</p>"
			},
			"file": "documon/src/dirutils.js",
			"filename": "dirutils.js",
			"klass": "dirutils",
			"package": "documon",
			"docfile": "documon.dirutils.html",
			"id": "documon.dirutils.removedir"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.0.0",
	"search": {
		"documon.dirutils": "dirutils : collection utilities manipulating directories syncronouslydirutils documon",
		"documon.dirutils.makedir": "makedir : Creates folder specified location folder heirarchy constructed needed example folder exists here path folder following folders exists path folder three Then three tree will constructed inside path foldermakedir destination folder create",
		"documon.dirutils.readExt": "readExt : Collects files from folder based specified extension extensions used search recursively through folders search multiple extensions Provided shortcut readdir readdir with your extension checking filterreadExt path search extension look search multiple extensions array Find matching files folders resulting array contains only files that mathc specified extension",
		"documon.dirutils.readdir": "readdir : Read folder returns object containing files folder arraysreaddir path folder read custom filter funciton Should retrieve folders Used internally store recursive findings Note that also provide this argument readdir will populate your existing files folder list recommended leave this argument alone object containing list files folders properties returned list where each array contents readdir path folder null true yeids contents files path folder path folder path folder path folder sub1 path folder sub2 path folder sub3 dirs path folder sub1 path folder sub2 path folder sub3",
		"documon.dirutils.copydir": "copydir : Copies entire folder heirarchy folder from location another other location doesn exists will constructedcopydir source folder destination folder created exist",
		"documon.dirutils.emptydir": "emptydir : Recursively empties folder contents folder contents leaves source folderemptydir source folder Prevents actual deletion still allows return list display what will deleted array containing list paths files folders that deleted will deleted when dryrun true",
		"documon.dirutils.removedir": "removedir : Recursively removes folder folders wellremovedir path folder Prevents actual deletion still allows return return list items that will deleted array items that were deleted will deleted dryrun true",
		"documon.dirutils.exists": "exists : Checks folder existsexists path folder"
	}
}