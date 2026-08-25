{
	"line": 16,
	"name": "splitParsed",
	"shortText": "Splits one file's parsed comments into independent groups, so a file containing several",
	"shortHtml": "<p>Splits one file's parsed comments into independent groups, so a file containing several</p>",
	"text": "Splits one file's parsed comments into independent groups, so a file containing several\nclasses behaves like several one-class files.\n\n`tag.js` assumes everything handed to it belongs to a single page, so the split has to\nhappen first.\n\n",
	"html": "<p>Splits one file's parsed comments into independent groups, so a file containing several<br />\nclasses behaves like several one-class files.</p>\n<p><code>tag.js</code> assumes everything handed to it belongs to a single page, so the split has to<br />\nhappen first.</p>",
	"entity": "module",
	"flagSearchText": " splitParsed documon",
	"package": "documon",
	"file": "src/splitParsed.js",
	"filename": "splitParsed.js",
	"klass": "splitParsed",
	"docfile": "documon.splitParsed.html",
	"id": "documon.splitParsed",
	"methods": [
		{
			"line": 35,
			"name": "declaredPackage",
			"shortText": "Finds the package a group declares for itself, if any.",
			"shortHtml": "<p>Finds the package a group declares for itself, if any.</p>",
			"text": "Finds the package a group declares for itself, if any.\n\n",
			"html": "<p>Finds the package a group declares for itself, if any.</p>",
			"entity": "method",
			"flagSearchText": " declaredPackage A group of parsed comment blocks. The package name, or null.",
			"access": "private",
			"params": [
				{
					"name": "chunk",
					"shortText": "A group of parsed comment blocks.",
					"shortHtml": "<p>A group of parsed comment blocks.</p>",
					"text": "A group of parsed comment blocks.",
					"html": "<p>A group of parsed comment blocks.</p>",
					"type": "array"
				}
			],
			"returns": {
				"type": "string",
				"text": "The package name, or null.",
				"html": "<p>The package name, or null.</p>",
				"shortText": "<p>The package name, or null.</p>",
				"shortHtml": "<p>The package name, or null.</p>"
			},
			"file": "src/splitParsed.js",
			"filename": "splitParsed.js",
			"klass": "splitParsed",
			"package": "documon",
			"docfile": "documon.splitParsed.html",
			"id": "documon.splitParsed.declaredPackage"
		},
		{
			"line": 73,
			"name": "propagatePackage",
			"shortText": "Carries a file's `@package` forward into later groups.",
			"shortHtml": "<p>Carries a file's <code>@package</code> forward into later groups.</p>",
			"text": "Carries a file's `@package` forward into later groups.\n\nSplitting on `@class` means a second class in a file starts a group of its own, and\nthat group contains no `@package` tag -- the file declared it once, at the top. Without\nthis, `tag.js` finds nothing and falls back to the `root` package, so a file like\n\n\t\t&#47;** &#64;module thing &#64;package app *&#47;\n\t\t&#47;** &#64;class Good *&#47;\n\nproduced `app.thing` and `root.Good` rather than `app.thing` and `app.Good` -- and any\n`&#64;extends app.Good` elsewhere then failed to resolve.\n\nA group that declares its own `@package` is left alone, so an explicit declaration\nalways wins and a file can still switch packages part way down.\n\n",
			"html": "<p>Carries a file's <code>@package</code> forward into later groups.</p>\n<p>Splitting on <code>@class</code> means a second class in a file starts a group of its own, and<br />\nthat group contains no <code>@package</code> tag -- the file declared it once, at the top. Without<br />\nthis, <code>tag.js</code> finds nothing and falls back to the <code>root</code> package, so a file like</p>\n<pre><code>    &amp;#47;** &amp;#64;module thing &amp;#64;package app *&amp;#47;\n    &amp;#47;** &amp;#64;class Good *&amp;#47;</code></pre>\n<p>produced <code>app.thing</code> and <code>root.Good</code> rather than <code>app.thing</code> and <code>app.Good</code> -- and any<br />\n<code>&amp;#64;extends app.Good</code> elsewhere then failed to resolve.</p>\n<p>A group that declares its own <code>@package</code> is left alone, so an explicit declaration<br />\nalways wins and a file can still switch packages part way down.</p>",
			"entity": "method",
			"flagSearchText": " propagatePackage Groups, in source order. The same groups, with inherited packages filled in.",
			"access": "private",
			"params": [
				{
					"name": "chunks",
					"shortText": "Groups, in source order.",
					"shortHtml": "<p>Groups, in source order.</p>",
					"text": "Groups, in source order.",
					"html": "<p>Groups, in source order.</p>",
					"type": "array"
				}
			],
			"returns": {
				"type": "array",
				"text": "The same groups, with inherited packages filled in.",
				"html": "<p>The same groups, with inherited packages filled in.</p>",
				"shortText": "<p>The same groups, with inherited packages filled in.</p>",
				"shortHtml": "<p>The same groups, with inherited packages filled in.</p>"
			},
			"file": "src/splitParsed.js",
			"filename": "splitParsed.js",
			"klass": "splitParsed",
			"package": "documon",
			"docfile": "documon.splitParsed.html",
			"id": "documon.splitParsed.propagatePackage"
		},
		{
			"line": 119,
			"name": "split",
			"shortText": "Splits a file's parsed comments into groups.",
			"shortHtml": "<p>Splits a file's parsed comments into groups.</p>",
			"text": "Splits a file's parsed comments into groups.\n\n",
			"html": "<p>Splits a file's parsed comments into groups.</p>",
			"entity": "method",
			"flagSearchText": " split Parsed comment blocks, in source order. An array of groups.",
			"params": [
				{
					"name": "parsed",
					"shortText": "Parsed comment blocks, in source order.",
					"shortHtml": "<p>Parsed comment blocks, in source order.</p>",
					"text": "Parsed comment blocks, in source order.",
					"html": "<p>Parsed comment blocks, in source order.</p>",
					"type": "array"
				}
			],
			"returns": {
				"type": "array",
				"text": "An array of groups.",
				"html": "<p>An array of groups.</p>",
				"shortText": "<p>An array of groups.</p>",
				"shortHtml": "<p>An array of groups.</p>"
			},
			"file": "src/splitParsed.js",
			"filename": "splitParsed.js",
			"klass": "splitParsed",
			"package": "documon",
			"docfile": "documon.splitParsed.html",
			"id": "documon.splitParsed.split"
		}
	],
	"properties": [
		{
			"line": 25,
			"name": "packageTags",
			"shortText": "Tags that declare the enclosing package.",
			"shortHtml": "<p>Tags that declare the enclosing package.</p>",
			"text": "Tags that declare the enclosing package.",
			"html": "<p>Tags that declare the enclosing package.</p>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " Tags that declare the enclosing package.",
			"file": "src/splitParsed.js",
			"filename": "splitParsed.js",
			"klass": "splitParsed",
			"package": "documon",
			"docfile": "documon.splitParsed.html",
			"id": "documon.splitParsed.packageTags"
		},
		{
			"line": 20,
			"name": "spliton",
			"shortText": "Tags that begin a new group.",
			"shortHtml": "<p>Tags that begin a new group.</p>",
			"text": "Tags that begin a new group.",
			"html": "<p>Tags that begin a new group.</p>",
			"type": "array",
			"entity": "property",
			"flagSearchText": " Tags that begin a new group.",
			"file": "src/splitParsed.js",
			"filename": "splitParsed.js",
			"klass": "splitParsed",
			"package": "documon",
			"docfile": "documon.splitParsed.html",
			"id": "documon.splitParsed.spliton"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.7.0",
	"search": {
		"documon.splitParsed": "splitParsed : Splits file parsed comments into independent groups file containing several classes behaves like several class files assumes everything handed belongs single page split happen firstsplitParsed documon",
		"documon.splitParsed.declaredPackage": "declaredPackage : Finds package group declares itselfdeclaredPackage group parsed comment blocks package name null",
		"documon.splitParsed.propagatePackage": "propagatePackage : Carries file package forward into later groups Splitting class means second class file starts group that group contains package file declared once Without this finds nothing falls back root package file like module thing package class Good produced thing root Good rather than thing Good extends Good elsewhere then failed resolve group that declares package left alone explicit declaration always wins file still switch packages part downpropagatePackage Groups source order same groups with inherited packages filled",
		"documon.splitParsed.split": "split : Splits file parsed comments into groupssplit Parsed comment blocks source order array groups",
		"documon.splitParsed.spliton": "spliton : Tags that begin groupTags that begin group",
		"documon.splitParsed.packageTags": "packageTags : Tags that declare enclosing packageTags that declare enclosing package"
	}
}