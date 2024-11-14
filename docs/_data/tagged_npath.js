{
	"line": 15,
	"name": "npath",
	"shortText": "A drop-in replacement for path, that provides cross-playform normalization. Easing the development of cross-platform modules.",
	"shortHtml": "<p>A drop-in replacement for path, that provides cross-playform normalization. Easing the development of cross-platform modules.</p>",
	"text": "A drop-in replacement for path, that provides cross-playform normalization. Easing the development of cross-platform modules.\n\nEssentially what we're doing is pre-processing all methods with a path normalization -- always enforcing forward slashes.\n\n",
	"html": "<p>A drop-in replacement for path, that provides cross-playform normalization. Easing the development of cross-platform modules.</p>\n<p>Essentially what we're doing is pre-processing all methods with a path normalization -- always enforcing forward slashes.</p>",
	"entity": "module",
	"flagSearchText": " npath documon\n",
	"package": "documon",
	"file": "documon/src/npath.js",
	"filename": "npath.js",
	"klass": "npath",
	"docfile": "documon.npath.html",
	"id": "documon.npath",
	"methods": [
		{
			"line": 321,
			"name": "addTrailingSlash",
			"shortText": "Adds a trailing slash from path (if doesn't exist).",
			"shortHtml": "<p>Adds a trailing slash from path (if doesn't exist).</p>",
			"text": "Adds a trailing slash from path (if doesn't exist).\n\n",
			"html": "<p>Adds a trailing slash from path (if doesn't exist).</p>",
			"entity": "method",
			"flagSearchText": " addTrailingSlash path",
			"params": [
				{
					"name": "path",
					"shortText": "path",
					"shortHtml": "<p>path</p>",
					"text": "path",
					"html": "<p>path</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.addTrailingSlash"
		},
		{
			"line": 108,
			"name": "basename",
			"shortText": "npath.basename(\"/foo/bar/bob.txt\") --> \"bob.txt\"",
			"shortHtml": "<p>npath.basename(\"/foo/bar/bob.txt\") --&gt; \"bob.txt\"</p>",
			"text": "   npath.basename(\"/foo/bar/bob.txt\") --> \"bob.txt\"\n   npath.basename(\"/foo/bar/bob.txt\", \".txt\") --> \"bob\"\n\n",
			"html": "<p>npath.basename(\"/foo/bar/bob.txt\") --&gt; \"bob.txt\"<br />\n   npath.basename(\"/foo/bar/bob.txt\", \".txt\") --&gt; \"bob\"</p>",
			"entity": "method",
			"flagSearchText": " basename The full path Lops off the extension if it matches. The last portion of a path, generally the \"filename\".",
			"params": [
				{
					"name": "path",
					"shortText": "The full path",
					"shortHtml": "<p>The full path</p>",
					"text": "The full path",
					"html": "<p>The full path</p>",
					"type": "string"
				},
				{
					"name": "ext",
					"shortText": "Lops off the extension if it matches.",
					"shortHtml": "<p>Lops off the extension if it matches.</p>",
					"text": "Lops off the extension if it matches.",
					"html": "<p>Lops off the extension if it matches.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "The last portion of a path, generally the \"filename\".",
				"html": "<p>The last portion of a path, generally the \"filename\".</p>",
				"shortText": "<p>The last portion of a path, generally the \"filename\".</p>",
				"shortHtml": "<p>The last portion of a path, generally the \"filename\".</p>"
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.basename"
		},
		{
			"line": 59,
			"name": "clean",
			"shortText": "Normalizes slashes by converting double \\\\ to single \\ and / to \\\\ or \\\\ tp / based on the current platform requirements.",
			"shortHtml": "<p>Normalizes slashes by converting double \\ to single \\ and / to \\ or \\ tp / based on the current platform requirements.</p>",
			"text": "Normalizes slashes by converting double \\\\ to single \\ and / to \\\\ or \\\\ tp / based on the current platform requirements.\n\n",
			"html": "<p>Normalizes slashes by converting double \\ to single \\ and / to \\ or \\ tp / based on the current platform requirements.</p>",
			"entity": "method",
			"flagSearchText": " clean\n arg\n",
			"params": [
				{
					"name": "arg",
					"shortText": "arg",
					"shortHtml": "<p>arg</p>",
					"text": "arg\n",
					"html": "<p>arg</p>",
					"type": "string | array"
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.clean"
		},
		{
			"line": 123,
			"name": "dirname",
			"shortText": "Returns the path to the parent folder that the item resides within.",
			"shortHtml": "<p>Returns the path to the parent folder that the item resides within.</p>",
			"text": "Returns the path to the parent folder that the item resides within.\n\t\n\t\tnpath.dirname(\"/foo/bar/bob.txt\") --> \"/foo/bar\"\n  \tnpath.dirname(\"/foo/sally/yoyo/boob\") --> \"/foo/sally/yoyo\"\n\n",
			"html": "<p>Returns the path to the parent folder that the item resides within.</p>\n<pre><code>    npath.dirname(\"/foo/bar/bob.txt\") --&gt; \"/foo/bar\"\n  npath.dirname(\"/foo/sally/yoyo/boob\") --&gt; \"/foo/sally/yoyo\"</code></pre>",
			"entity": "method",
			"flagSearchText": " dirname The path to parse. The path to the file/folder.",
			"params": [
				{
					"name": "Vpath",
					"shortText": "The path to parse.",
					"shortHtml": "<p>The path to parse.</p>",
					"text": "The path to parse.",
					"html": "<p>The path to parse.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "The path to the file/folder.",
				"html": "<p>The path to the file/folder.</p>",
				"shortText": "<p>The path to the file/folder.</p>",
				"shortHtml": "<p>The path to the file/folder.</p>"
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.dirname"
		},
		{
			"line": 137,
			"name": "extname",
			"shortText": "Yes, this includes the dot.",
			"shortHtml": "<p>Yes, this includes the dot.</p>",
			"text": "Yes, this includes the dot.\n\n\t\tnpath.extname(\"/foo/bar/bob.txt\") --> \".txt\"\n  \tnpath.extname(\"/foo/sally/yoyo/boob\") --> \"\"\n\n",
			"html": "<p>Yes, this includes the dot.</p>\n<pre><code>    npath.extname(\"/foo/bar/bob.txt\") --&gt; \".txt\"\n  npath.extname(\"/foo/sally/yoyo/boob\") --&gt; \"\"</code></pre>",
			"entity": "method",
			"flagSearchText": " extname The path to parse. The extension (if exists), including the dot.",
			"params": [
				{
					"name": "Vpath",
					"shortText": "The path to parse.",
					"shortHtml": "<p>The path to parse.</p>",
					"text": "The path to parse.",
					"html": "<p>The path to parse.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "The extension (if exists), including the dot.",
				"html": "<p>The extension (if exists), including the dot.</p>",
				"shortText": "<p>The extension (if exists), including the dot.</p>",
				"shortHtml": "<p>The extension (if exists), including the dot.</p>"
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.extname"
		},
		{
			"line": 247,
			"name": "format",
			"shortText": "The opposite of path.parse().",
			"shortHtml": "<p>The opposite of path.parse().</p>",
			"text": "The opposite of path.parse().\n\nCombines the elements of an object into a string. \n\nExample:\n\t\t\n\t    {\n\t        root : \"/\",\n\t        dir : \"/home/user/dir\",\n\t        base : \"file.txt\",\n\t        ext : \".txt\",\n\t        name : \"file\"\n\t    }\n\n\nIs converted to\n\n\t    /home/user/dir/file.txt\n\n\n",
			"html": "<p>The opposite of path.parse().</p>\n<p>Combines the elements of an object into a string. </p>\n<p>Example:</p>\n<pre><code>    {\n        root : \"/\",\n        dir : \"/home/user/dir\",\n        base : \"file.txt\",\n        ext : \".txt\",\n        name : \"file\"\n    }</code></pre>\n<p>Is converted to</p>\n<pre><code>    /home/user/dir/file.txt</code></pre>",
			"entity": "method",
			"flagSearchText": " format The object containing some of the required keys to formulate a path. The string representaiton of the object.",
			"params": [
				{
					"name": "obj",
					"shortText": "The object containing some of the required keys to formulate a path.",
					"shortHtml": "<p>The object containing some of the required keys to formulate a path.</p>",
					"text": "The object containing some of the required keys to formulate a path.",
					"html": "<p>The object containing some of the required keys to formulate a path.</p>",
					"type": "object"
				}
			],
			"returns": {
				"type": "type",
				"text": "The string representaiton of the object.",
				"html": "<p>The string representaiton of the object.</p>",
				"shortText": "<p>The string representaiton of the object.</p>",
				"shortHtml": "<p>The string representaiton of the object.</p>"
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.format"
		},
		{
			"line": 149,
			"name": "isAbsolute",
			"shortText": "Determines if path is an absolute path.",
			"shortHtml": "<p>Determines if path is an absolute path.</p>",
			"text": "Determines if path is an absolute path.\n\n",
			"html": "<p>Determines if path is an absolute path.</p>",
			"entity": "method",
			"flagSearchText": " isAbsolute The path to parse.",
			"params": [
				{
					"name": "Vpath",
					"shortText": "The path to parse.",
					"shortHtml": "<p>The path to parse.</p>",
					"text": "The path to parse.",
					"html": "<p>The path to parse.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "Boolean",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.isAbsolute"
		},
		{
			"line": 263,
			"name": "join",
			"shortText": "Joins path segments and resolves relativity.",
			"shortHtml": "<p>Joins path segments and resolves relativity.</p>",
			"text": "Joins path segments and resolves relativity.\n\n\t\tpath.join('/foo', 'bar', 'baz/asdf', 'quux', '..')\n\t\tReturns: '/foo/bar/baz/asdf'\n\n\n",
			"html": "<p>Joins path segments and resolves relativity.</p>\n<pre><code>    path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')\n    Returns: '/foo/bar/baz/asdf'</code></pre>",
			"entity": "method",
			"flagSearchText": " join All arguments are evaluated as paths for construction description",
			"params": [
				{
					"name": "paths...",
					"shortText": "All arguments are evaluated as paths for construction",
					"shortHtml": "<p>All arguments are evaluated as paths for construction</p>",
					"text": "All arguments are evaluated as paths for construction",
					"html": "<p>All arguments are evaluated as paths for construction</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "type",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.join"
		},
		{
			"line": 168,
			"name": "normalize",
			"shortText": "Resolves \"..\" and \".\" portions of a path.",
			"shortHtml": "<p>Resolves \"..\" and \".\" portions of a path.</p>",
			"text": "Resolves \"..\" and \".\" portions of a path.\nReduces double slashes to single (e.g. // -> /  )\nForces back-slashes to forward slashes (e.g. \\ -> /  )\n\nRetains trailing slash if exists.\n\t\t\n  \tnpath.normalize(\"/foo/////bar\") --> \"/foo/bar\"\n  \tnpath.normalize(\"/foo/bar/../boob\") --> \"/foo/boob\"\n  \tnpath.normalize(\"./foo/\") --> \"/current/working/dir/foo/\"\n\n",
			"html": "<p>Resolves \"..\" and \".\" portions of a path.<br />\nReduces double slashes to single (e.g. // -&gt; /  )<br />\nForces back-slashes to forward slashes (e.g. \\ -&gt; /  )</p>\n<p>Retains trailing slash if exists.</p>\n<pre><code>  npath.normalize(\"/foo/////bar\") --&gt; \"/foo/bar\"\n  npath.normalize(\"/foo/bar/../boob\") --&gt; \"/foo/boob\"\n  npath.normalize(\"./foo/\") --&gt; \"/current/working/dir/foo/\"</code></pre>",
			"entity": "method",
			"flagSearchText": " normalize The path to parse.",
			"params": [
				{
					"name": "Vpath",
					"shortText": "The path to parse.",
					"shortHtml": "<p>The path to parse.</p>",
					"text": "The path to parse.",
					"html": "<p>The path to parse.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.normalize"
		},
		{
			"line": 200,
			"name": "parse",
			"shortText": "Extracts basic path and file parts.",
			"shortHtml": "<p>Extracts basic path and file parts.</p>",
			"text": "Extracts basic path and file parts.\n\n\tpath.parse('/home/user/dir/file.txt')\n\n\t// Yeilds\n\t{\n\t\troot : \"/\",\n\t\tdir : \"/home/user/dir\",\n\t\tbase : \"file.txt\",\n\t\text : \".txt\",\n\t\tname : \"file\"\n\t}\n\n",
			"html": "<p>Extracts basic path and file parts.</p>\n<pre><code>path.parse('/home/user/dir/file.txt')\n\n// Yeilds\n{\n    root : \"/\",\n    dir : \"/home/user/dir\",\n    base : \"file.txt\",\n    ext : \".txt\",\n    name : \"file\"\n}</code></pre>",
			"entity": "method",
			"flagSearchText": " parse The path to parse. An object containing the following properties:\n\n\t{\n\t\troot : \"/\",\n\t\tdir : \"/home/user/dir\",\n\t\tbase : \"file.txt\",\n\t\text : \".txt\",\n\t\tname : \"file\"\n\t}",
			"params": [
				{
					"name": "Vpath",
					"shortText": "The path to parse.",
					"shortHtml": "<p>The path to parse.</p>",
					"text": "The path to parse.",
					"html": "<p>The path to parse.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "object",
				"text": "An object containing the following properties:\n\n\t{\n\t\troot : \"/\",\n\t\tdir : \"/home/user/dir\",\n\t\tbase : \"file.txt\",\n\t\text : \".txt\",\n\t\tname : \"file\"\n\t}",
				"html": "<p>An object containing the following properties:</p>\n<pre><code>{\n    root : \"/\",\n    dir : \"/home/user/dir\",\n    base : \"file.txt\",\n    ext : \".txt\",\n    name : \"file\"\n}</code></pre>",
				"shortText": "<p>An object containing the following properties:</p>",
				"shortHtml": "<p>An object containing the following properties:</p>"
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.parse"
		},
		{
			"line": 218,
			"name": "relative",
			"shortText": "Creates a relative path between `from` adn `to`.",
			"shortHtml": "<p>Creates a relative path between <code>from</code> adn <code>to</code>.</p>",
			"text": "Creates a relative path between `from` adn `to`.\n\n\t\tpath.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')\n\t\t// Returns: '../../impl/bbb'\n\n",
			"html": "<p>Creates a relative path between <code>from</code> adn <code>to</code>.</p>\n<pre><code>    path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')\n    // Returns: '../../impl/bbb'</code></pre>",
			"entity": "method",
			"flagSearchText": " relative\n When null, the cwd is used for this value. When null, the cwd is used for this value.\n The relative path between `from` and `to`",
			"params": [
				{
					"name": "from",
					"shortText": "When null, the cwd is used for this value.",
					"shortHtml": "<p>When null, the cwd is used for this value.</p>",
					"text": "When null, the cwd is used for this value.",
					"html": "<p>When null, the cwd is used for this value.</p>",
					"type": "string",
					"optional": true
				},
				{
					"name": "to",
					"shortText": "When null, the cwd is used for this value.",
					"shortHtml": "<p>When null, the cwd is used for this value.</p>",
					"text": "When null, the cwd is used for this value.\n",
					"html": "<p>When null, the cwd is used for this value.</p>",
					"type": "string",
					"optional": true
				}
			],
			"returns": {
				"type": "string",
				"text": "The relative path between `from` and `to`",
				"html": "<p>The relative path between <code>from</code> and <code>to</code></p>",
				"shortText": "<p>The relative path between <code>from</code> and <code>to</code></p>",
				"shortHtml": "<p>The relative path between <code>from</code> and <code>to</code></p>"
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.relative"
		},
		{
			"line": 306,
			"name": "removeTrailingSlash",
			"shortText": "Removes a trailing slash from path (if exists).",
			"shortHtml": "<p>Removes a trailing slash from path (if exists).</p>",
			"text": "Removes a trailing slash from path (if exists).\n\n",
			"html": "<p>Removes a trailing slash from path (if exists).</p>",
			"entity": "method",
			"flagSearchText": " removeTrailingSlash path",
			"params": [
				{
					"name": "path",
					"shortText": "path",
					"shortHtml": "<p>path</p>",
					"text": "path",
					"html": "<p>path</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.removeTrailingSlash"
		},
		{
			"line": 294,
			"name": "resolve",
			"shortText": "Generates an absolute path based on thenprovided arguments.",
			"shortHtml": "<p>Generates an absolute path based on thenprovided arguments.</p>",
			"text": "Generates an absolute path based on thenprovided arguments.\n\nPath construction occurs from right < to < left\n\n\t\tresolve(\"/a\", \"b\", \"c\"); // yields: \"/a/b/c\"\n\nIf an absolute path is resolved during construction, the items to the left are ignored.\n\n\t\tresolve(\"a\", \"/b\", \"c\"); // yields: \"/b/c\" (\"a\" is ignored)\n\nIf an absolute path is not resolved after constructing all arguments, the CWD is inserted.\n\n\t\tresolve(\"a\", \"b\", \"c\"); // yields: \"/current/working/dir/a/b/c\"\n\nRelative paths are automatically resolved:\n\n\t\tresolve(\"/a\", \"../b\", \"c\"); // yields \"/a/c\"\n\n\n\n",
			"html": "<p>Generates an absolute path based on thenprovided arguments.</p>\n<p>Path construction occurs from right &lt; to &lt; left</p>\n<pre><code>    resolve(\"/a\", \"b\", \"c\"); // yields: \"/a/b/c\"</code></pre>\n<p>If an absolute path is resolved during construction, the items to the left are ignored.</p>\n<pre><code>    resolve(\"a\", \"/b\", \"c\"); // yields: \"/b/c\" (\"a\" is ignored)</code></pre>\n<p>If an absolute path is not resolved after constructing all arguments, the CWD is inserted.</p>\n<pre><code>    resolve(\"a\", \"b\", \"c\"); // yields: \"/current/working/dir/a/b/c\"</code></pre>\n<p>Relative paths are automatically resolved:</p>\n<pre><code>    resolve(\"/a\", \"../b\", \"c\"); // yields \"/a/c\"</code></pre>",
			"entity": "method",
			"flagSearchText": " resolve All arguments are evaluated as paths for construction.",
			"params": [
				{
					"name": "path...",
					"shortText": "All arguments are evaluated as paths for construction.",
					"shortHtml": "<p>All arguments are evaluated as paths for construction.</p>",
					"text": "All arguments are evaluated as paths for construction.",
					"html": "<p>All arguments are evaluated as paths for construction.</p>",
					"type": "string",
					"optional": true
				}
			],
			"returns": {
				"type": "string",
				"text": "",
				"html": "",
				"shortText": "",
				"shortHtml": ""
			},
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.resolve"
		}
	],
	"properties": [
		{
			"line": 45,
			"name": "delimiter",
			"shortText": "Platform environment PATH delimiter.",
			"shortHtml": "<p>Platform environment PATH delimiter.</p>",
			"text": "Platform environment PATH delimiter.\n\nExample of how PATH appears on Windows:\n\n\t\t'C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\node\\'\n\nExample of how PATH appears on POSIX systems (Mac Unix):\n\n\t\t'/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'\n\nRead the PATH with Node:\n\n\t\tconsole.log(process.env.PATH)\n\n\t\tWindows \t= ;\n  \tPOSIX\t= : \n\n",
			"html": "<p>Platform environment PATH delimiter.</p>\n<p>Example of how PATH appears on Windows:</p>\n<pre><code>    'C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\node\\'</code></pre>\n<p>Example of how PATH appears on POSIX systems (Mac Unix):</p>\n<pre><code>    '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'</code></pre>\n<p>Read the PATH with Node:</p>\n<pre><code>    console.log(process.env.PATH)\n\n    Windows     = ;\n  POSIX   = : </code></pre>",
			"type": "string",
			"entity": "property",
			"flagSearchText": " delimiter",
			"file": "documon/src/npath.js",
			"filename": "npath.js",
			"klass": "npath",
			"package": "documon",
			"docfile": "documon.npath.html",
			"id": "documon.npath.delimiter"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.5.5",
	"search": {
		"documon.npath": "npath : drop replacement path that provides cross playform normalization Easing development cross platform modules Essentially what doing processing methods with path normalization always enforcing forward slashesnpath documon",
		"documon.npath.clean": "clean : Normalizes slashes converting double single based current platform requirements",
		"documon.npath.basename": "basename : npath basename npath basenamebasename full path Lops extension matches last portion path generally filename",
		"documon.npath.dirname": "dirname : Returns path parent folder that item resides within npath dirname npath dirname sally yoyo boob sally yoyodirname path parse path file folder",
		"documon.npath.extname": "extname : this includes npath extname npath extname sally yoyo boobextname path parse extension exists including",
		"documon.npath.isAbsolute": "isAbsolute : Determines path absolute pathisAbsolute path parse",
		"documon.npath.normalize": "normalize : Resolves portions path Reduces double slashes single Forces back slashes forward slashes Retains trailing slash exists npath normalize npath normalize boob boob npath normalize current workingnormalize path parse",
		"documon.npath.parse": "parse : Extracts basic path file parts path parse home user file Yeilds root home user base file name fileparse path parse object containing following properties root home user base file name file",
		"documon.npath.relative": "relative : Creates relative path between from path relative data orandea test data orandea impl Returns implrelative When null used this value When null used this value relative path between from",
		"documon.npath.format": "format : opposite path parse Combines elements object into string Example root home user base file name file converted home user fileformat object containing some required keys formulate path string representaiton object",
		"documon.npath.join": "join : Joins path segments resolves relativity path join asdf quux Returns asdfjoin arguments evaluated paths construction description",
		"documon.npath.resolve": "resolve : Generates absolute path based thenprovided arguments Path construction occurs from right left resolve yields absolute path resolved during construction items left ignored resolve yields ignored absolute path resolved after constructing arguments inserted resolve yields current working Relative paths automatically resolved resolve yieldsresolve arguments evaluated paths construction",
		"documon.npath.removeTrailingSlash": "removeTrailingSlash : Removes trailing slash from path existsremoveTrailingSlash path",
		"documon.npath.addTrailingSlash": "addTrailingSlash : Adds trailing slash from path doesn existaddTrailingSlash path",
		"documon.npath.delimiter": "delimiter : Platform environment PATH delimiter Example PATH appears Windows Windows system32 Windows Program Files node Example PATH appears POSIX systems Unix sbin sbin local Read PATH with Node console process PATH Windows POSIX"
	}
}