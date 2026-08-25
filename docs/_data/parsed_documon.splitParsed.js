[
	{
		"text": "Splits one file's parsed comments into independent groups, so a file containing several\nclasses behaves like several one-class files.\n\n`tag.js` assumes everything handed to it belongs to a single page, so the split has to\nhappen first.\n\n",
		"start": 6,
		"end": 15,
		"file": "/Volumes/Drives/projects/documon/documon/src/splitParsed.js",
		"flags": [
			{
				"source": "@module  splitParsedsplitParsed",
				"flag": "module",
				"after": "splitParsed",
				"afterType": "splitParsed",
				"name": "splitParsed",
				"single": true,
				"text": "splitParsed"
			},
			{
				"source": "@package documon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
			}
		],
		"source": "Splits one file's parsed comments into independent groups, so a file containing several\nclasses behaves like several one-class files.\n\n`tag.js` assumes everything handed to it belongs to a single page, so the split has to\nhappen first.\n\n@module  splitParsed\n@package documon",
		"meta": [],
		"id": "documon.splitParsed"
	},
	{
		"text": "",
		"start": 17,
		"end": 19,
		"file": "/Volumes/Drives/projects/documon/documon/src/splitParsed.js",
		"flags": [
			{
				"source": "@property {array} spliton - Tags that begin a new group.",
				"flag": "property",
				"after": "{array} spliton - Tags that begin a new group.",
				"type": "array",
				"afterType": "spliton - Tags that begin a new group.",
				"name": "spliton",
				"text": "Tags that begin a new group."
			}
		],
		"source": "@property {array} spliton - Tags that begin a new group.",
		"meta": [],
		"id": "documon.splitParsed.spliton"
	},
	{
		"text": "",
		"start": 22,
		"end": 24,
		"file": "/Volumes/Drives/projects/documon/documon/src/splitParsed.js",
		"flags": [
			{
				"source": "@property {array} packageTags - Tags that declare the enclosing package.",
				"flag": "property",
				"after": "{array} packageTags - Tags that declare the enclosing package.",
				"type": "array",
				"afterType": "packageTags - Tags that declare the enclosing package.",
				"name": "packageTags",
				"text": "Tags that declare the enclosing package."
			}
		],
		"source": "@property {array} packageTags - Tags that declare the enclosing package.",
		"meta": [],
		"id": "documon.splitParsed.packageTags"
	},
	{
		"text": "Finds the package a group declares for itself, if any.\n\n",
		"start": 27,
		"end": 34,
		"file": "/Volumes/Drives/projects/documon/documon/src/splitParsed.js",
		"flags": [
			{
				"source": "@method     declaredPackagedeclaredPackage",
				"flag": "method",
				"after": "declaredPackage",
				"afterType": "declaredPackage",
				"name": "declaredPackage",
				"single": true,
				"text": "declaredPackage"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {array}   chunk - A group of parsed comment blocks.A group of parsed comment blocks.",
				"flag": "param",
				"after": "{array}   chunk - A group of parsed comment blocks.",
				"type": "array",
				"afterType": "chunk - A group of parsed comment blocks.",
				"name": "chunk",
				"text": "A group of parsed comment blocks."
			},
			{
				"source": "@return     {string}        - The package name, or null.",
				"flag": "return",
				"after": "{string}        - The package name, or null.",
				"type": "string",
				"afterType": "The package name, or null.",
				"text": "The package name, or null."
			}
		],
		"source": "Finds the package a group declares for itself, if any.\n\n@method     declaredPackage\n@private\n@param      {array}   chunk - A group of parsed comment blocks.\n@return     {string}        - The package name, or null.",
		"meta": [],
		"id": "documon.splitParsed.declaredPackage"
	},
	{
		"text": "Carries a file's `@package` forward into later groups.\n\nSplitting on `@class` means a second class in a file starts a group of its own, and\nthat group contains no `@package` tag -- the file declared it once, at the top. Without\nthis, `tag.js` finds nothing and falls back to the `root` package, so a file like\n\n\t\t&#47;** &#64;module thing &#64;package app *&#47;\n\t\t&#47;** &#64;class Good *&#47;\n\nproduced `app.thing` and `root.Good` rather than `app.thing` and `app.Good` -- and any\n`&#64;extends app.Good` elsewhere then failed to resolve.\n\nA group that declares its own `@package` is left alone, so an explicit declaration\nalways wins and a file can still switch packages part way down.\n\n",
		"start": 52,
		"end": 72,
		"file": "/Volumes/Drives/projects/documon/documon/src/splitParsed.js",
		"flags": [
			{
				"source": "@method     propagatePackagepropagatePackage",
				"flag": "method",
				"after": "propagatePackage",
				"afterType": "propagatePackage",
				"name": "propagatePackage",
				"single": true,
				"text": "propagatePackage"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			},
			{
				"source": "@param      {array}  chunks - Groups, in source order.Groups, in source order.",
				"flag": "param",
				"after": "{array}  chunks - Groups, in source order.",
				"type": "array",
				"afterType": "chunks - Groups, in source order.",
				"name": "chunks",
				"text": "Groups, in source order."
			},
			{
				"source": "@return     {array}         - The same groups, with inherited packages filled in.",
				"flag": "return",
				"after": "{array}         - The same groups, with inherited packages filled in.",
				"type": "array",
				"afterType": "The same groups, with inherited packages filled in.",
				"text": "The same groups, with inherited packages filled in."
			}
		],
		"source": "Carries a file's `@package` forward into later groups.\n\nSplitting on `@class` means a second class in a file starts a group of its own, and\nthat group contains no `@package` tag -- the file declared it once, at the top. Without\nthis, `tag.js` finds nothing and falls back to the `root` package, so a file like\n\n\t\t&#47;** &#64;module thing &#64;package app *&#47;\n\t\t&#47;** &#64;class Good *&#47;\n\nproduced `app.thing` and `root.Good` rather than `app.thing` and `app.Good` -- and any\n`&#64;extends app.Good` elsewhere then failed to resolve.\n\nA group that declares its own `@package` is left alone, so an explicit declaration\nalways wins and a file can still switch packages part way down.\n\n@method     propagatePackage\n@private\n@param      {array}  chunks - Groups, in source order.\n@return     {array}         - The same groups, with inherited packages filled in.",
		"meta": [],
		"id": "documon.splitParsed.propagatePackage"
	},
	{
		"text": "Splits a file's parsed comments into groups.\n\n",
		"start": 112,
		"end": 118,
		"file": "/Volumes/Drives/projects/documon/documon/src/splitParsed.js",
		"flags": [
			{
				"source": "@method  splitsplit",
				"flag": "method",
				"after": "split",
				"afterType": "split",
				"name": "split",
				"single": true,
				"text": "split"
			},
			{
				"source": "@param   {array}  parsed - Parsed comment blocks, in source order.Parsed comment blocks, in source order.",
				"flag": "param",
				"after": "{array}  parsed - Parsed comment blocks, in source order.",
				"type": "array",
				"afterType": "parsed - Parsed comment blocks, in source order.",
				"name": "parsed",
				"text": "Parsed comment blocks, in source order."
			},
			{
				"source": "@return  {array}         - An array of groups.",
				"flag": "return",
				"after": "{array}         - An array of groups.",
				"type": "array",
				"afterType": "An array of groups.",
				"text": "An array of groups."
			}
		],
		"source": "Splits a file's parsed comments into groups.\n\n@method  split\n@param   {array}  parsed - Parsed comment blocks, in source order.\n@return  {array}         - An array of groups.",
		"meta": [],
		"id": "documon.splitParsed.split"
	}
]