[
	{
		"start": 6,
		"end": 14,
		"data": "A drop-in replacement for path, that provides cross-playform normalization. Easing the development of cross-platform modules.\n\nEssentially what we're doing is pre-processing all methods with a path normalization -- always enforcing forward slashes.\n\n@module npath\n@package  documon\n"
	},
	{
		"start": 25,
		"end": 44,
		"data": "Platform environment PATH delimiter.\n\nExample of how PATH appears on Windows:\n\n\t\t'C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\node\\'\n\nExample of how PATH appears on POSIX systems (Mac Unix):\n\n\t\t'/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'\n\nRead the PATH with Node:\n\n\t\tconsole.log(process.env.PATH)\n\n\t\tWindows \t= ;\n  \tPOSIX\t= : \n\n@property {string} delimiter"
	},
	{
		"start": 50,
		"end": 58,
		"data": "Normalizes slashes by converting double \\\\ to single \\ and / to \\\\ or \\\\ tp / based on the current platform requirements.\n\n@method clean\n\n@param  {string | array} arg\n\n@return {string}"
	},
	{
		"start": 98,
		"end": 106,
		"data": "\t\tnpath.basename(\"/foo/bar/bob.txt\") --> \"bob.txt\"\n  \tnpath.basename(\"/foo/bar/bob.txt\", \".txt\") --> \"bob\"\n\n@method basename\n@param  {string} path - The full path\n@param  {string} ext - Lops off the extension if it matches.\n@return {string} - The last portion of a path, generally the \"filename\"."
	},
	{
		"start": 112,
		"end": 121,
		"data": "Returns the path to the parent folder that the item resides within.\n\t\n\t\tnpath.dirname(\"/foo/bar/bob.txt\") --> \"/foo/bar\"\n  \tnpath.dirname(\"/foo/sally/yoyo/boob\") --> \"/foo/sally/yoyo\"\n\n@method dirname\n@param  {string} Vpath - The path to parse.\n@return {string} - The path to the file/folder."
	},
	{
		"start": 126,
		"end": 135,
		"data": "Yes, this includes the dot.\n\n\t\tnpath.extname(\"/foo/bar/bob.txt\") --> \".txt\"\n  \tnpath.extname(\"/foo/sally/yoyo/boob\") --> \"\"\n\n@method extname\n@param  {string} Vpath - The path to parse.\n@return {string} - The extension (if exists), including the dot."
	},
	{
		"start": 141,
		"end": 147,
		"data": "Determines if path is an absolute path.\n\n@method  isAbsolute\n@param   {string} Vpath - The path to parse.\n@return  {Boolean}"
	},
	{
		"start": 152,
		"end": 166,
		"data": "Resolves \"..\" and \".\" portions of a path.\nReduces double slashes to single (e.g. // -> /  )\nForces back-slashes to forward slashes (e.g. \\ -> /  )\n\nRetains trailing slash if exists.\n\t\t\n  \tnpath.normalize(\"/foo/////bar\") --> \"/foo/bar\"\n  \tnpath.normalize(\"/foo/bar/../boob\") --> \"/foo/boob\"\n  \tnpath.normalize(\"./foo/\") --> \"/current/working/dir/foo/\"\n\n@method  normalize\n@param   {string} Vpath - The path to parse.\n@return  {string}"
	},
	{
		"start": 173,
		"end": 198,
		"data": "Extracts basic path and file parts.\n\n\tpath.parse('/home/user/dir/file.txt')\n\n\t// Yeilds\n\t{\n\t\troot : \"/\",\n\t\tdir : \"/home/user/dir\",\n\t\tbase : \"file.txt\",\n\t\text : \".txt\",\n\t\tname : \"file\"\n\t}\n\n@method  parse\n@param   {string}  Vpath - The path to parse.\n@return  {object} - An object containing the following properties:\n\n\t{\n\t\troot : \"/\",\n\t\tdir : \"/home/user/dir\",\n\t\tbase : \"file.txt\",\n\t\text : \".txt\",\n\t\tname : \"file\"\n\t}"
	},
	{
		"start": 204,
		"end": 216,
		"data": "Creates a relative path between `from` adn `to`.\n\n\t\tpath.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')\n\t\t// Returns: '../../impl/bbb'\n\n@method  relative\n\n@param   {string}    [from]  - When null, the cwd is used for this value.\n@param   {string}    [to]    - When null, the cwd is used for this value.\n\n@return  {string}\t- The relative path between `from` and `to`"
	},
	{
		"start": 221,
		"end": 244,
		"data": "The opposite of path.parse().\n\nCombines the elements of an object into a string. \n\nExample:\n\t\t\n\t\t{\n\t\t\troot : \"/\",\n\t\t\tdir : \"/home/user/dir\",\n\t\t\tbase : \"file.txt\",\n\t\t\text : \".txt\",\n\t\t\tname : \"file\"\n\t\t}\n\t\t\n\t... is converted to\n\n\t\t/home/user/dir/file.txt\n\t\t\n\n@method  format\n@param   {object}  obj  - The object containing some of the required keys to formulate a path.\n@return  {type} - The string representaiton of the object."
	},
	{
		"start": 250,
		"end": 260,
		"data": "Joins path segments and resolves relativity.\n\n\t\tpath.join('/foo', 'bar', 'baz/asdf', 'quux', '..')\n\t\tReturns: '/foo/bar/baz/asdf'\n\n\n@method  join\n@param\t{string} paths... - All arguments are evaluated as paths for construction\n@return  {type}  description"
	},
	{
		"start": 267,
		"end": 291,
		"data": "Generates an absolute path based on thenprovided arguments.\n\nPath construction occurs from right < to < left\n\n\t\tresolve(\"/a\", \"b\", \"c\"); // yields: \"/a/b/c\"\n\nIf an absolute path is resolved during construction, the items to the left are ignored.\n\n\t\tresolve(\"a\", \"/b\", \"c\"); // yields: \"/b/c\" (\"a\" is ignored)\n\nIf an absolute path is not resolved after constructing all arguments, the CWD is inserted.\n\n\t\tresolve(\"a\", \"b\", \"c\"); // yields: \"/current/working/dir/a/b/c\"\n\nRelative paths are automatically resolved:\n\n\t\tresolve(\"/a\", \"../b\", \"c\"); // yields \"/a/c\"\n\n\n\n@method\tresolve\n@param\t{string} [path...] - All arguments are evaluated as paths for construction.\n@return \t{string}"
	},
	{
		"start": 297,
		"end": 303,
		"data": "Removes a trailing slash from path (if exists).\n\n@method  removeTrailingSlash\n@param   {string} path\n@return  {string} "
	},
	{
		"start": 312,
		"end": 318,
		"data": "Adds a trailing slash from path (if doesn't exist).\n\n@method  addTrailingSlash\n@param   {string} path\n@return  {string} "
	}
]