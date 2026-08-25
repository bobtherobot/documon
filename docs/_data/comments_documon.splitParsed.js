[
	{
		"start": 6,
		"end": 15,
		"data": "Splits one file's parsed comments into independent groups, so a file containing several\nclasses behaves like several one-class files.\n\n`tag.js` assumes everything handed to it belongs to a single page, so the split has to\nhappen first.\n\n@module  splitParsed\n@package documon"
	},
	{
		"start": 17,
		"end": 19,
		"data": "@property {array} spliton - Tags that begin a new group."
	},
	{
		"start": 22,
		"end": 24,
		"data": "@property {array} packageTags - Tags that declare the enclosing package."
	},
	{
		"start": 27,
		"end": 34,
		"data": "Finds the package a group declares for itself, if any.\n\n@method     declaredPackage\n@private\n@param      {array}   chunk - A group of parsed comment blocks.\n@return     {string}        - The package name, or null."
	},
	{
		"start": 52,
		"end": 72,
		"data": "Carries a file's `@package` forward into later groups.\n\nSplitting on `@class` means a second class in a file starts a group of its own, and\nthat group contains no `@package` tag -- the file declared it once, at the top. Without\nthis, `tag.js` finds nothing and falls back to the `root` package, so a file like\n\n\t\t&#47;** &#64;module thing &#64;package app *&#47;\n\t\t&#47;** &#64;class Good *&#47;\n\nproduced `app.thing` and `root.Good` rather than `app.thing` and `app.Good` -- and any\n`&#64;extends app.Good` elsewhere then failed to resolve.\n\nA group that declares its own `@package` is left alone, so an explicit declaration\nalways wins and a file can still switch packages part way down.\n\n@method     propagatePackage\n@private\n@param      {array}  chunks - Groups, in source order.\n@return     {array}         - The same groups, with inherited packages filled in."
	},
	{
		"start": 112,
		"end": 118,
		"data": "Splits a file's parsed comments into groups.\n\n@method  split\n@param   {array}  parsed - Parsed comment blocks, in source order.\n@return  {array}         - An array of groups."
	}
]