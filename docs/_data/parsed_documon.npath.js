[
	{
		"text": "A drop-in replacement for path, that provides cross-playform normalization. Easing the development of cross-platform modules.\n\nEssentially what we're doing is pre-processing all methods with a path normalization -- always enforcing forward slashes.\n\n",
		"start": 6,
		"end": 14,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@module npathnpath",
				"flag": "module",
				"after": "npath",
				"afterType": "npath",
				"name": "npath",
				"single": true,
				"text": "npath"
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
		"source": "A drop-in replacement for path, that provides cross-playform normalization. Easing the development of cross-platform modules.\n\nEssentially what we're doing is pre-processing all methods with a path normalization -- always enforcing forward slashes.\n\n@module npath\n@package  documon\n",
		"id": "documon.npath"
	},
	{
		"text": "Platform environment PATH delimiter.\n\nExample of how PATH appears on Windows:\n\n\t\t'C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\node\\'\n\nExample of how PATH appears on POSIX systems (Mac Unix):\n\n\t\t'/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'\n\nRead the PATH with Node:\n\n\t\tconsole.log(process.env.PATH)\n\n\t\tWindows \t= ;\n  \tPOSIX\t= : \n\n",
		"start": 25,
		"end": 44,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@property {string} delimiter",
				"flag": "property",
				"after": "{string} delimiter",
				"type": "string",
				"afterType": "delimiter",
				"name": "delimiter",
				"single": true,
				"text": "delimiter"
			}
		],
		"source": "Platform environment PATH delimiter.\n\nExample of how PATH appears on Windows:\n\n\t\t'C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\node\\'\n\nExample of how PATH appears on POSIX systems (Mac Unix):\n\n\t\t'/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'\n\nRead the PATH with Node:\n\n\t\tconsole.log(process.env.PATH)\n\n\t\tWindows \t= ;\n  \tPOSIX\t= : \n\n@property {string} delimiter",
		"id": "documon.npath.delimiter"
	},
	{
		"text": "Normalizes slashes by converting double \\\\ to single \\ and / to \\\\ or \\\\ tp / based on the current platform requirements.\n\n",
		"start": 50,
		"end": 58,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method cleanclean\n",
				"flag": "method",
				"after": "clean",
				"afterType": "clean",
				"name": "clean",
				"single": true,
				"text": "clean\n"
			},
			{
				"source": "@param  {string | array} argarg\n",
				"flag": "param",
				"after": "{string | array} arg",
				"type": "string | array",
				"afterType": "arg",
				"name": "arg",
				"single": true,
				"text": "arg\n"
			},
			{
				"source": "@return {string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "Normalizes slashes by converting double \\\\ to single \\ and / to \\\\ or \\\\ tp / based on the current platform requirements.\n\n@method clean\n\n@param  {string | array} arg\n\n@return {string}",
		"id": "documon.npath.clean"
	},
	{
		"text": "\t\tnpath.basename(\"/foo/bar/bob.txt\") --> \"bob.txt\"\n  \tnpath.basename(\"/foo/bar/bob.txt\", \".txt\") --> \"bob\"\n\n",
		"start": 98,
		"end": 106,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method basenamebasename",
				"flag": "method",
				"after": "basename",
				"afterType": "basename",
				"name": "basename",
				"single": true,
				"text": "basename"
			},
			{
				"source": "@param  {string} path - The full pathThe full path",
				"flag": "param",
				"after": "{string} path - The full path",
				"type": "string",
				"afterType": "path - The full path",
				"name": "path",
				"text": "The full path"
			},
			{
				"source": "@param  {string} ext - Lops off the extension if it matches.Lops off the extension if it matches.",
				"flag": "param",
				"after": "{string} ext - Lops off the extension if it matches.",
				"type": "string",
				"afterType": "ext - Lops off the extension if it matches.",
				"name": "ext",
				"text": "Lops off the extension if it matches."
			},
			{
				"source": "@return {string} - The last portion of a path, generally the \"filename\".",
				"flag": "return",
				"after": "{string} - The last portion of a path, generally the \"filename\".",
				"type": "string",
				"afterType": "The last portion of a path, generally the \"filename\".",
				"text": "The last portion of a path, generally the \"filename\"."
			}
		],
		"source": "\t\tnpath.basename(\"/foo/bar/bob.txt\") --> \"bob.txt\"\n  \tnpath.basename(\"/foo/bar/bob.txt\", \".txt\") --> \"bob\"\n\n@method basename\n@param  {string} path - The full path\n@param  {string} ext - Lops off the extension if it matches.\n@return {string} - The last portion of a path, generally the \"filename\".",
		"id": "documon.npath.basename"
	},
	{
		"text": "Returns the path to the parent folder that the item resides within.\n\t\n\t\tnpath.dirname(\"/foo/bar/bob.txt\") --> \"/foo/bar\"\n  \tnpath.dirname(\"/foo/sally/yoyo/boob\") --> \"/foo/sally/yoyo\"\n\n",
		"start": 112,
		"end": 121,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method dirnamedirname",
				"flag": "method",
				"after": "dirname",
				"afterType": "dirname",
				"name": "dirname",
				"single": true,
				"text": "dirname"
			},
			{
				"source": "@param  {string} Vpath - The path to parse.The path to parse.",
				"flag": "param",
				"after": "{string} Vpath - The path to parse.",
				"type": "string",
				"afterType": "Vpath - The path to parse.",
				"name": "Vpath",
				"text": "The path to parse."
			},
			{
				"source": "@return {string} - The path to the file/folder.",
				"flag": "return",
				"after": "{string} - The path to the file/folder.",
				"type": "string",
				"afterType": "The path to the file/folder.",
				"text": "The path to the file/folder."
			}
		],
		"source": "Returns the path to the parent folder that the item resides within.\n\t\n\t\tnpath.dirname(\"/foo/bar/bob.txt\") --> \"/foo/bar\"\n  \tnpath.dirname(\"/foo/sally/yoyo/boob\") --> \"/foo/sally/yoyo\"\n\n@method dirname\n@param  {string} Vpath - The path to parse.\n@return {string} - The path to the file/folder.",
		"id": "documon.npath.dirname"
	},
	{
		"text": "Yes, this includes the dot.\n\n\t\tnpath.extname(\"/foo/bar/bob.txt\") --> \".txt\"\n  \tnpath.extname(\"/foo/sally/yoyo/boob\") --> \"\"\n\n",
		"start": 126,
		"end": 135,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method extnameextname",
				"flag": "method",
				"after": "extname",
				"afterType": "extname",
				"name": "extname",
				"single": true,
				"text": "extname"
			},
			{
				"source": "@param  {string} Vpath - The path to parse.The path to parse.",
				"flag": "param",
				"after": "{string} Vpath - The path to parse.",
				"type": "string",
				"afterType": "Vpath - The path to parse.",
				"name": "Vpath",
				"text": "The path to parse."
			},
			{
				"source": "@return {string} - The extension (if exists), including the dot.",
				"flag": "return",
				"after": "{string} - The extension (if exists), including the dot.",
				"type": "string",
				"afterType": "The extension (if exists), including the dot.",
				"text": "The extension (if exists), including the dot."
			}
		],
		"source": "Yes, this includes the dot.\n\n\t\tnpath.extname(\"/foo/bar/bob.txt\") --> \".txt\"\n  \tnpath.extname(\"/foo/sally/yoyo/boob\") --> \"\"\n\n@method extname\n@param  {string} Vpath - The path to parse.\n@return {string} - The extension (if exists), including the dot.",
		"id": "documon.npath.extname"
	},
	{
		"text": "Determines if path is an absolute path.\n\n",
		"start": 141,
		"end": 147,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method  isAbsoluteisAbsolute",
				"flag": "method",
				"after": "isAbsolute",
				"afterType": "isAbsolute",
				"name": "isAbsolute",
				"single": true,
				"text": "isAbsolute"
			},
			{
				"source": "@param   {string} Vpath - The path to parse.The path to parse.",
				"flag": "param",
				"after": "{string} Vpath - The path to parse.",
				"type": "string",
				"afterType": "Vpath - The path to parse.",
				"name": "Vpath",
				"text": "The path to parse."
			},
			{
				"source": "@return  {Boolean}",
				"flag": "return",
				"after": "{Boolean}",
				"type": "Boolean"
			}
		],
		"source": "Determines if path is an absolute path.\n\n@method  isAbsolute\n@param   {string} Vpath - The path to parse.\n@return  {Boolean}",
		"id": "documon.npath.isAbsolute"
	},
	{
		"text": "Resolves \"..\" and \".\" portions of a path.\nReduces double slashes to single (e.g. // -> /  )\nForces back-slashes to forward slashes (e.g. \\ -> /  )\n\nRetains trailing slash if exists.\n\t\t\n  \tnpath.normalize(\"/foo/////bar\") --> \"/foo/bar\"\n  \tnpath.normalize(\"/foo/bar/../boob\") --> \"/foo/boob\"\n  \tnpath.normalize(\"./foo/\") --> \"/current/working/dir/foo/\"\n\n",
		"start": 152,
		"end": 166,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method  normalizenormalize",
				"flag": "method",
				"after": "normalize",
				"afterType": "normalize",
				"name": "normalize",
				"single": true,
				"text": "normalize"
			},
			{
				"source": "@param   {string} Vpath - The path to parse.The path to parse.",
				"flag": "param",
				"after": "{string} Vpath - The path to parse.",
				"type": "string",
				"afterType": "Vpath - The path to parse.",
				"name": "Vpath",
				"text": "The path to parse."
			},
			{
				"source": "@return  {string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "Resolves \"..\" and \".\" portions of a path.\nReduces double slashes to single (e.g. // -> /  )\nForces back-slashes to forward slashes (e.g. \\ -> /  )\n\nRetains trailing slash if exists.\n\t\t\n  \tnpath.normalize(\"/foo/////bar\") --> \"/foo/bar\"\n  \tnpath.normalize(\"/foo/bar/../boob\") --> \"/foo/boob\"\n  \tnpath.normalize(\"./foo/\") --> \"/current/working/dir/foo/\"\n\n@method  normalize\n@param   {string} Vpath - The path to parse.\n@return  {string}",
		"id": "documon.npath.normalize"
	},
	{
		"text": "Extracts basic path and file parts.\n\n\tpath.parse('/home/user/dir/file.txt')\n\n\t// Yeilds\n\t{\n\t\troot : \"/\",\n\t\tdir : \"/home/user/dir\",\n\t\tbase : \"file.txt\",\n\t\text : \".txt\",\n\t\tname : \"file\"\n\t}\n\n",
		"start": 173,
		"end": 198,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method  parseparse",
				"flag": "method",
				"after": "parse",
				"afterType": "parse",
				"name": "parse",
				"single": true,
				"text": "parse"
			},
			{
				"source": "@param   {string}  Vpath - The path to parse.The path to parse.",
				"flag": "param",
				"after": "{string}  Vpath - The path to parse.",
				"type": "string",
				"afterType": "Vpath - The path to parse.",
				"name": "Vpath",
				"text": "The path to parse."
			},
			{
				"source": "@return  {object} - An object containing the following properties:",
				"flag": "return",
				"after": "{object} - An object containing the following properties:",
				"type": "object",
				"afterType": "An object containing the following properties:",
				"text": "An object containing the following properties:\n\n\t{\n\t\troot : \"/\",\n\t\tdir : \"/home/user/dir\",\n\t\tbase : \"file.txt\",\n\t\text : \".txt\",\n\t\tname : \"file\"\n\t}"
			}
		],
		"source": "Extracts basic path and file parts.\n\n\tpath.parse('/home/user/dir/file.txt')\n\n\t// Yeilds\n\t{\n\t\troot : \"/\",\n\t\tdir : \"/home/user/dir\",\n\t\tbase : \"file.txt\",\n\t\text : \".txt\",\n\t\tname : \"file\"\n\t}\n\n@method  parse\n@param   {string}  Vpath - The path to parse.\n@return  {object} - An object containing the following properties:\n\n\t{\n\t\troot : \"/\",\n\t\tdir : \"/home/user/dir\",\n\t\tbase : \"file.txt\",\n\t\text : \".txt\",\n\t\tname : \"file\"\n\t}",
		"id": "documon.npath.parse"
	},
	{
		"text": "Creates a relative path between `from` adn `to`.\n\n\t\tpath.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')\n\t\t// Returns: '../../impl/bbb'\n\n",
		"start": 204,
		"end": 216,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method  relativerelative\n",
				"flag": "method",
				"after": "relative",
				"afterType": "relative",
				"name": "relative",
				"single": true,
				"text": "relative\n"
			},
			{
				"source": "@param   {string}    [from]  - When null, the cwd is used for this value.When null, the cwd is used for this value.",
				"flag": "param",
				"after": "{string}    [from]  - When null, the cwd is used for this value.",
				"type": "string",
				"afterType": "[from]  - When null, the cwd is used for this value.",
				"optional": true,
				"name": "from",
				"text": "When null, the cwd is used for this value."
			},
			{
				"source": "@param   {string}    [to]    - When null, the cwd is used for this value.When null, the cwd is used for this value.\n",
				"flag": "param",
				"after": "{string}    [to]    - When null, the cwd is used for this value.",
				"type": "string",
				"afterType": "[to]    - When null, the cwd is used for this value.",
				"optional": true,
				"name": "to",
				"text": "When null, the cwd is used for this value.\n"
			},
			{
				"source": "@return  {string}\t- The relative path between `from` and `to`",
				"flag": "return",
				"after": "{string}\t- The relative path between `from` and `to`",
				"type": "string",
				"afterType": "The relative path between `from` and `to`",
				"text": "The relative path between `from` and `to`"
			}
		],
		"source": "Creates a relative path between `from` adn `to`.\n\n\t\tpath.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')\n\t\t// Returns: '../../impl/bbb'\n\n@method  relative\n\n@param   {string}    [from]  - When null, the cwd is used for this value.\n@param   {string}    [to]    - When null, the cwd is used for this value.\n\n@return  {string}\t- The relative path between `from` and `to`",
		"id": "documon.npath.relative"
	},
	{
		"text": "The opposite of path.parse().\n\nCombines the elements of an object into a string. \n\nExample:\n\t\t\n\t\t{\n\t\t\troot : \"/\",\n\t\t\tdir : \"/home/user/dir\",\n\t\t\tbase : \"file.txt\",\n\t\t\text : \".txt\",\n\t\t\tname : \"file\"\n\t\t}\n\t\t\n\t... is converted to\n\n\t\t/home/user/dir/file.txt\n\t\t\n\n",
		"start": 221,
		"end": 244,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method  formatformat",
				"flag": "method",
				"after": "format",
				"afterType": "format",
				"name": "format",
				"single": true,
				"text": "format"
			},
			{
				"source": "@param   {object}  obj  - The object containing some of the required keys to formulate a path.The object containing some of the required keys to formulate a path.",
				"flag": "param",
				"after": "{object}  obj  - The object containing some of the required keys to formulate a path.",
				"type": "object",
				"afterType": "obj  - The object containing some of the required keys to formulate a path.",
				"name": "obj",
				"text": "The object containing some of the required keys to formulate a path."
			},
			{
				"source": "@return  {type} - The string representaiton of the object.",
				"flag": "return",
				"after": "{type} - The string representaiton of the object.",
				"type": "type",
				"afterType": "The string representaiton of the object.",
				"text": "The string representaiton of the object."
			}
		],
		"source": "The opposite of path.parse().\n\nCombines the elements of an object into a string. \n\nExample:\n\t\t\n\t\t{\n\t\t\troot : \"/\",\n\t\t\tdir : \"/home/user/dir\",\n\t\t\tbase : \"file.txt\",\n\t\t\text : \".txt\",\n\t\t\tname : \"file\"\n\t\t}\n\t\t\n\t... is converted to\n\n\t\t/home/user/dir/file.txt\n\t\t\n\n@method  format\n@param   {object}  obj  - The object containing some of the required keys to formulate a path.\n@return  {type} - The string representaiton of the object.",
		"id": "documon.npath.format"
	},
	{
		"text": "Joins path segments and resolves relativity.\n\n\t\tpath.join('/foo', 'bar', 'baz/asdf', 'quux', '..')\n\t\tReturns: '/foo/bar/baz/asdf'\n\n\n",
		"start": 250,
		"end": 260,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method  joinjoin",
				"flag": "method",
				"after": "join",
				"afterType": "join",
				"name": "join",
				"single": true,
				"text": "join"
			},
			{
				"source": "@param\t{string} paths... - All arguments are evaluated as paths for constructionAll arguments are evaluated as paths for construction",
				"flag": "param",
				"after": "{string} paths... - All arguments are evaluated as paths for construction",
				"type": "string",
				"afterType": "paths... - All arguments are evaluated as paths for construction",
				"name": "paths...",
				"text": "All arguments are evaluated as paths for construction"
			},
			{
				"source": "@return  {type}  description",
				"flag": "return",
				"after": "{type}  description",
				"type": "type",
				"afterType": "description",
				"name": "description",
				"single": true,
				"text": "description"
			}
		],
		"source": "Joins path segments and resolves relativity.\n\n\t\tpath.join('/foo', 'bar', 'baz/asdf', 'quux', '..')\n\t\tReturns: '/foo/bar/baz/asdf'\n\n\n@method  join\n@param\t{string} paths... - All arguments are evaluated as paths for construction\n@return  {type}  description",
		"id": "documon.npath.join"
	},
	{
		"text": "Generates an absolute path based on thenprovided arguments.\n\nPath construction occurs from right < to < left\n\n\t\tresolve(\"/a\", \"b\", \"c\"); // yields: \"/a/b/c\"\n\nIf an absolute path is resolved during construction, the items to the left are ignored.\n\n\t\tresolve(\"a\", \"/b\", \"c\"); // yields: \"/b/c\" (\"a\" is ignored)\n\nIf an absolute path is not resolved after constructing all arguments, the CWD is inserted.\n\n\t\tresolve(\"a\", \"b\", \"c\"); // yields: \"/current/working/dir/a/b/c\"\n\nRelative paths are automatically resolved:\n\n\t\tresolve(\"/a\", \"../b\", \"c\"); // yields \"/a/c\"\n\n\n\n",
		"start": 267,
		"end": 291,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method\tresolveresolve",
				"flag": "method",
				"after": "resolve",
				"afterType": "resolve",
				"name": "resolve",
				"single": true,
				"text": "resolve"
			},
			{
				"source": "@param\t{string} [path...] - All arguments are evaluated as paths for construction.All arguments are evaluated as paths for construction.",
				"flag": "param",
				"after": "{string} [path...] - All arguments are evaluated as paths for construction.",
				"type": "string",
				"afterType": "[path...] - All arguments are evaluated as paths for construction.",
				"optional": true,
				"name": "path...",
				"text": "All arguments are evaluated as paths for construction."
			},
			{
				"source": "@return \t{string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "Generates an absolute path based on thenprovided arguments.\n\nPath construction occurs from right < to < left\n\n\t\tresolve(\"/a\", \"b\", \"c\"); // yields: \"/a/b/c\"\n\nIf an absolute path is resolved during construction, the items to the left are ignored.\n\n\t\tresolve(\"a\", \"/b\", \"c\"); // yields: \"/b/c\" (\"a\" is ignored)\n\nIf an absolute path is not resolved after constructing all arguments, the CWD is inserted.\n\n\t\tresolve(\"a\", \"b\", \"c\"); // yields: \"/current/working/dir/a/b/c\"\n\nRelative paths are automatically resolved:\n\n\t\tresolve(\"/a\", \"../b\", \"c\"); // yields \"/a/c\"\n\n\n\n@method\tresolve\n@param\t{string} [path...] - All arguments are evaluated as paths for construction.\n@return \t{string}",
		"id": "documon.npath.resolve"
	},
	{
		"text": "Removes a trailing slash from path (if exists).\n\n",
		"start": 297,
		"end": 303,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method  removeTrailingSlashremoveTrailingSlash",
				"flag": "method",
				"after": "removeTrailingSlash",
				"afterType": "removeTrailingSlash",
				"name": "removeTrailingSlash",
				"single": true,
				"text": "removeTrailingSlash"
			},
			{
				"source": "@param   {string} pathpath",
				"flag": "param",
				"after": "{string} path",
				"type": "string",
				"afterType": "path",
				"name": "path",
				"single": true,
				"text": "path"
			},
			{
				"source": "@return  {string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "Removes a trailing slash from path (if exists).\n\n@method  removeTrailingSlash\n@param   {string} path\n@return  {string} ",
		"id": "documon.npath.removeTrailingSlash"
	},
	{
		"text": "Adds a trailing slash from path (if doesn't exist).\n\n",
		"start": 312,
		"end": 318,
		"file": "/Volumes/Drives/projects/documon/documon/src/npath.js",
		"flags": [
			{
				"source": "@method  addTrailingSlashaddTrailingSlash",
				"flag": "method",
				"after": "addTrailingSlash",
				"afterType": "addTrailingSlash",
				"name": "addTrailingSlash",
				"single": true,
				"text": "addTrailingSlash"
			},
			{
				"source": "@param   {string} pathpath",
				"flag": "param",
				"after": "{string} path",
				"type": "string",
				"afterType": "path",
				"name": "path",
				"single": true,
				"text": "path"
			},
			{
				"source": "@return  {string}",
				"flag": "return",
				"after": "{string}",
				"type": "string"
			}
		],
		"source": "Adds a trailing slash from path (if doesn't exist).\n\n@method  addTrailingSlash\n@param   {string} path\n@return  {string} ",
		"id": "documon.npath.addTrailingSlash"
	}
]