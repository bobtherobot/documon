{
	"line": 96,
	"name": "extract",
	"entity": "class",
	"flagSearchText": " extract documon the entire file as a string The string is used to \"open\" a comment. The string is used to \"close\" a comment. An array of comments, or multi-dimentional array oaf page comments.\n",
	"package": "documon",
	"params": [
		{
			"name": "text",
			"shortText": "the entire file as a string",
			"shortHtml": "<p>the entire file as a string</p>",
			"text": "the entire file as a string",
			"html": "<p>the entire file as a string</p>",
			"type": "string"
		},
		{
			"name": "beginDoc",
			"shortText": "The string is used to \"open\" a comment.",
			"shortHtml": "<p>The string is used to \"open\" a comment.</p>",
			"text": "The string is used to \"open\" a comment.",
			"html": "<p>The string is used to \"open\" a comment.</p>",
			"type": "string",
			"optional": true,
			"defaultVal": "&#47;**"
		},
		{
			"name": "endDoc",
			"shortText": "The string is used to \"close\" a comment.",
			"shortHtml": "<p>The string is used to \"close\" a comment.</p>",
			"text": "The string is used to \"close\" a comment.",
			"html": "<p>The string is used to \"close\" a comment.</p>",
			"type": "string",
			"optional": true,
			"defaultVal": "*&#47;"
		}
	],
	"returns": {
		"type": "array",
		"text": "An array of comments, or multi-dimentional array oaf page comments.\n",
		"html": "<p>An array of comments, or multi-dimentional array oaf page comments.</p>",
		"shortText": "<p>An array of comments, or multi-dimentional array oaf page comments.</p>",
		"shortHtml": "<p>An array of comments, or multi-dimentional array oaf page comments.</p>"
	},
	"shortText": "Extracts comments from a file into an array or mulit-dementional array when the \"text\" arg contains mulitple __package__ or __namepsace__ definitions.",
	"shortHtml": "<p>Extracts comments from a file into an array or mulit-dementional array when the \"text\" arg contains mulitple <strong>package</strong> or <strong>namepsace</strong> definitions.</p>",
	"text": "Extracts comments from a file into an array or mulit-dementional array when the \"text\" arg contains mulitple __package__ or __namepsace__ definitions.\n\nEach entry in the returned array will be an object containing 3 properties\n - __start__ : The line number that the comment started on\n - __end__ : The line number that the comment ended on\n - __data__ : The contents of the comment\n\n\tvar myComments = extract(str);\n\tyields : [\n\t\t\t\t{ \n\t\t\t\t\tstart : 12,\n\t\t\t\t\tend : 32,\n\t\t\t\t\tdata : \"the descript\"\n\t\t\t\t},\n\t\t\t\t{ \n\t\t\t\t\tstart : 12,\n\t\t\t\t\tend : 32,\n\t\t\t\t\tdata : \"the descript\"\n\t\t\t\t}\n\t\t]\n\n## A few things of note:\n- The data will NOT include the beginDoc, nor the endDoc strings.\n- Comment prefixing is stripped \n\t\t- *  [star space]\n\t\t- tabs\n\t\t- spaces\n- Code blocks maintain indentation.\n- Splitting on __package__ or __namespace__. When a single file contains mulitple references to a \"__package__\" or \"__namespace__\" comments will split into multiple arrays -- treating the single source file as being mulitple files. \n\nSplit __Example__:\n\n\t&#47;**\n\t* Class A\n\t* @package foo <-- this designates a new \"page\"\n\t*&#47;\n\n\t&#47;**\n\t* Something for A\n\t* @method something\n\t*&#47;\n \n\t&#47;**\n\t* Class B\n\t* @package bar <-- this designates a new \"page\"\n\t*&#47;\n \n\t&#47;**\n\t* Something for B\n\t* @method something\n\t*&#47;\n\t\n\tvar myComments = extract(str);\n\tyields : [\n\t\t\t\t[ // the first \"page\"\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 12,\n\t\t\t\t\t\tend : 32,\n\t\t\t\t\t\tdata : \"Class A ... \"\n\t\t\t\t\t},\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 12,\n\t\t\t\t\t\tend : 32,\n\t\t\t\t\t\tdata : \"Something for A ...\"\n\t\t\t\t\t},\n\t\t\n\t\t\t\t],\n\t\t\t\t[ // the second \"page\"\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 64,\n\t\t\t\t\t\tend : 96,\n\t\t\t\t\t\tdata : \"Class B ... \"\n\t\t\t\t\t},\n\t\t\t\t\t{ \n\t\t\t\t\t\tstart : 128,\n\t\t\t\t\t\tend : 142,\n\t\t\t\t\t\tdata : \"Something for B ...\"\n\t\t\t\t\t},\n\t\t\t\t,\n\t\t\t]\n\n",
	"html": "<p>Extracts comments from a file into an array or mulit-dementional array when the \"text\" arg contains mulitple <strong>package</strong> or <strong>namepsace</strong> definitions.</p>\n\n<p>Each entry in the returned array will be an object containing 3 properties <br>\n - <strong>start</strong> : The line number that the comment started on <br>\n - <strong>end</strong> : The line number that the comment ended on <br>\n - <strong>data</strong> : The contents of the comment</p>\n\n<pre class=\"prettyprint\">var myComments = extract(str);\nyields : [\n            { \n                start : 12,\n                end : 32,\n                data : \"the descript\"\n            },\n            { \n                start : 12,\n                end : 32,\n                data : \"the descript\"\n            }\n    ]</pre>\n\n<h2>A few things of note:</h2>\n\n<ul>\n<li>The data will NOT include the beginDoc, nor the endDoc strings.</li>\n<li>Comment prefixing is stripped  <br>\n    - *  [star space] <br>\n    - tabs <br>\n    - spaces</li>\n<li>Code blocks maintain indentation.</li>\n<li>Splitting on <strong>package</strong> or <strong>namespace</strong>. When a single file contains mulitple references to a \"<strong>package</strong>\" or \"<strong>namespace</strong>\" comments will split into multiple arrays -- treating the single source file as being mulitple files. </li>\n</ul>\n\n<p>Split <strong>Example</strong>:</p>\n\n<pre class=\"prettyprint\">/**\n* Class A\n* @package foo &lt;-- this designates a new \"page\"\n*/\n\n/**\n* Something for A\n* @method something\n*/\n\n/**\n* Class B\n* @package bar &lt;-- this designates a new \"page\"\n*/\n\n/**\n* Something for B\n* @method something\n*/\n\nvar myComments = extract(str);\nyields : [\n            [ // the first \"page\"\n                { \n                    start : 12,\n                    end : 32,\n                    data : \"Class A ... \"\n                },\n                { \n                    start : 12,\n                    end : 32,\n                    data : \"Something for A ...\"\n                },\n\n            ],\n            [ // the second \"page\"\n                { \n                    start : 64,\n                    end : 96,\n                    data : \"Class B ... \"\n                },\n                { \n                    start : 128,\n                    end : 142,\n                    data : \"Something for B ...\"\n                },\n            ,\n        ]</pre>",
	"file": "documon/src/extract.js",
	"filename": "extract.js",
	"klass": "extract",
	"docfile": "documon.extract.html",
	"id": "documon.extract",
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "0.0.1",
	"search": {
		"documon.extract": "extract : Extracts comments from file into array mulit dementional array when text contains mulitple package namepsace definitions Each entry returned array will object containing properties start line number that comment started line number that comment ended data contents comment myComments extract yields start data descript start data descript things note data will include beginDoc endDoc strings Comment prefixing stripped star space tabs spaces Code blocks maintain indentation Splitting package namespace When single file contains mulitple references package namespace comments will split into multiple arrays treating single source file being mulitple files Split Example Class package this designates page Something method something Class package this designates page Something method something myComments extract yields first page start data Class start data Something second page start data Class start data Somethingextract documon entire file string string used open comment string used close comment array comments multi dimentional array page comments"
	}
}