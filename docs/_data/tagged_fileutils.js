{
	"line": 13,
	"package": "documon",
	"flagSearchText": " documon fileutils",
	"name": "fileutils",
	"shortText": "Basic, common and simplified asyncronous file methods.",
	"shortHtml": "<p>Basic, common and simplified asyncronous file methods.</p>",
	"text": "Basic, common and simplified asyncronous file methods.\n\n",
	"html": "<p>Basic, common and simplified asyncronous file methods.</p>",
	"entity": "class",
	"file": "documon/src/fileutils.js",
	"filename": "fileutils.js",
	"klass": "fileutils",
	"docfile": "documon.fileutils.html",
	"id": "documon.fileutils",
	"methods": [
		{
			"line": 24,
			"name": "copy",
			"shortText": "Copies a file from one location to another.",
			"shortHtml": "<p>Copies a file from one location to another.</p>",
			"text": "Copies a file from one location to another.\n\n",
			"html": "<p>Copies a file from one location to another.</p>",
			"entity": "method",
			"flagSearchText": " copy The source file path. The destination to copy the source to.",
			"params": [
				{
					"name": "src",
					"shortText": "The source file path.",
					"shortHtml": "<p>The source file path.</p>",
					"text": "The source file path.",
					"html": "<p>The source file path.</p>",
					"type": "string"
				},
				{
					"name": "dest",
					"shortText": "The destination to copy the source to.",
					"shortHtml": "<p>The destination to copy the source to.</p>",
					"text": "The destination to copy the source to.",
					"html": "<p>The destination to copy the source to.</p>",
					"type": "string"
				}
			],
			"file": "documon/src/fileutils.js",
			"filename": "fileutils.js",
			"klass": "fileutils",
			"package": "documon",
			"docfile": "documon.fileutils.html",
			"id": "documon.fileutils.copy"
		},
		{
			"line": 96,
			"name": "exists",
			"shortText": "Cehcsk to see if a file exists. Note this also checks if a folder of the same name exists too.",
			"shortHtml": "<p>Cehcsk to see if a file exists. Note this also checks if a folder of the same name exists too.</p>",
			"text": "Cehcsk to see if a file exists. Note this also checks if a folder of the same name exists too.\n",
			"html": "<p>Cehcsk to see if a file exists. Note this also checks if a folder of the same name exists too.</p>",
			"entity": "method",
			"flagSearchText": " exists The source file path. True if exists, false if no file nor folder exists.",
			"access": "private",
			"params": [
				{
					"name": "src",
					"shortText": "The source file path.",
					"shortHtml": "<p>The source file path.</p>",
					"text": "The source file path.",
					"html": "<p>The source file path.</p>",
					"type": "type"
				}
			],
			"returns": {
				"type": "boolean",
				"text": "True if exists, false if no file nor folder exists.",
				"html": "<p>True if exists, false if no file nor folder exists.</p>",
				"shortText": "<p>True if exists, false if no file nor folder exists.</p>",
				"shortHtml": "<p>True if exists, false if no file nor folder exists.</p>"
			},
			"file": "documon/src/fileutils.js",
			"filename": "fileutils.js",
			"klass": "fileutils",
			"package": "documon",
			"docfile": "documon.fileutils.html",
			"id": "documon.fileutils.exists"
		},
		{
			"line": 45,
			"name": "Open",
			"shortText": "Reads the entire file as a string. NOTE: This is an alias for [read](#read).",
			"shortHtml": "<p>Reads the entire file as a string. NOTE: This is an alias for <a href=\"#read\">read</a>.</p>",
			"text": "Reads the entire file as a string. NOTE: This is an alias for [read](#read).\n\n",
			"html": "<p>Reads the entire file as a string. NOTE: This is an alias for <a href=\"#read\">read</a>.</p>",
			"entity": "method",
			"flagSearchText": " Open The source file path. description",
			"params": [
				{
					"name": "src",
					"shortText": "The source file path.",
					"shortHtml": "<p>The source file path.</p>",
					"text": "The source file path.",
					"html": "<p>The source file path.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"file": "documon/src/fileutils.js",
			"filename": "fileutils.js",
			"klass": "fileutils",
			"package": "documon",
			"docfile": "documon.fileutils.html",
			"id": "documon.fileutils.Open"
		},
		{
			"line": 53,
			"name": "read",
			"shortText": "Reads the entire file as a string.",
			"shortHtml": "<p>Reads the entire file as a string.</p>",
			"text": "Reads the entire file as a string.\n\n",
			"html": "<p>Reads the entire file as a string.</p>",
			"entity": "method",
			"flagSearchText": " read The source file path. description",
			"params": [
				{
					"name": "src",
					"shortText": "The source file path.",
					"shortHtml": "<p>The source file path.</p>",
					"text": "The source file path.",
					"html": "<p>The source file path.</p>",
					"type": "string"
				}
			],
			"returns": {
				"type": "string",
				"text": "description description",
				"html": "<p>description description</p>",
				"shortText": "<p>description description</p>",
				"shortHtml": "<p>description description</p>"
			},
			"file": "documon/src/fileutils.js",
			"filename": "fileutils.js",
			"klass": "fileutils",
			"package": "documon",
			"docfile": "documon.fileutils.html",
			"id": "documon.fileutils.read"
		},
		{
			"line": 85,
			"name": "remove",
			"shortText": "Deletes a file from the system.",
			"shortHtml": "<p>Deletes a file from the system.</p>",
			"text": "Deletes a file from the system.\n",
			"html": "<p>Deletes a file from the system.</p>",
			"entity": "method",
			"flagSearchText": " remove The source file path.",
			"params": [
				{
					"name": "src",
					"shortText": "The source file path.",
					"shortHtml": "<p>The source file path.</p>",
					"text": "The source file path.",
					"html": "<p>The source file path.</p>",
					"type": "string"
				}
			],
			"file": "documon/src/fileutils.js",
			"filename": "fileutils.js",
			"klass": "fileutils",
			"package": "documon",
			"docfile": "documon.fileutils.html",
			"id": "documon.fileutils.remove"
		},
		{
			"line": 68,
			"name": "save",
			"shortText": "Saves text data to a file. Overwrites entire file with provided data. NOTE:  This is an alias for [write](#write).",
			"shortHtml": "<p>Saves text data to a file. Overwrites entire file with provided data. NOTE:  This is an alias for <a href=\"#write\">write</a>.</p>",
			"text": "Saves text data to a file. Overwrites entire file with provided data. NOTE:  This is an alias for [write](#write).\n\n",
			"html": "<p>Saves text data to a file. Overwrites entire file with provided data. NOTE:  This is an alias for <a href=\"#write\">write</a>.</p>",
			"entity": "method",
			"flagSearchText": " save The source file path. The text data to save.",
			"params": [
				{
					"name": "src",
					"shortText": "The source file path.",
					"shortHtml": "<p>The source file path.</p>",
					"text": "The source file path.",
					"html": "<p>The source file path.</p>",
					"type": "string"
				},
				{
					"name": "data",
					"shortText": "The text data to save.",
					"shortHtml": "<p>The text data to save.</p>",
					"text": "The text data to save.",
					"html": "<p>The text data to save.</p>",
					"type": "string"
				}
			],
			"file": "documon/src/fileutils.js",
			"filename": "fileutils.js",
			"klass": "fileutils",
			"package": "documon",
			"docfile": "documon.fileutils.html",
			"id": "documon.fileutils.save"
		},
		{
			"line": 76,
			"name": "write",
			"shortText": "Saves text data to a file. Overwrites entire file with provided data.",
			"shortHtml": "<p>Saves text data to a file. Overwrites entire file with provided data.</p>",
			"text": "Saves text data to a file. Overwrites entire file with provided data.\n\n",
			"html": "<p>Saves text data to a file. Overwrites entire file with provided data.</p>",
			"entity": "method",
			"flagSearchText": " write The source file path. The text data to save.",
			"params": [
				{
					"name": "src",
					"shortText": "The source file path.",
					"shortHtml": "<p>The source file path.</p>",
					"text": "The source file path.",
					"html": "<p>The source file path.</p>",
					"type": "string"
				},
				{
					"name": "data",
					"shortText": "The text data to save.",
					"shortHtml": "<p>The text data to save.</p>",
					"text": "The text data to save.",
					"html": "<p>The text data to save.</p>",
					"type": "string"
				}
			],
			"file": "documon/src/fileutils.js",
			"filename": "fileutils.js",
			"klass": "fileutils",
			"package": "documon",
			"docfile": "documon.fileutils.html",
			"id": "documon.fileutils.write"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.5.5",
	"search": {
		"documon.fileutils": "fileutils : Basic common simplified asyncronous file methodsdocumon fileutils",
		"documon.fileutils.copy": "copy : Copies file from location anothercopy source file path destination copy source",
		"documon.fileutils.Open": "Open : Reads entire file string NOTE This alias read readOpen source file path description",
		"documon.fileutils.read": "read : Reads entire file stringread source file path description",
		"documon.fileutils.save": "save : Saves text data file Overwrites entire file with provided data NOTE This alias write writesave source file path text data save",
		"documon.fileutils.write": "write : Saves text data file Overwrites entire file with provided datawrite source file path text data save",
		"documon.fileutils.remove": "remove : Deletes file from systemremove source file path",
		"documon.fileutils.exists": "exists : Cehcsk file exists Note this also checks folder same name existsexists source file path True exists false file folder exists"
	}
}