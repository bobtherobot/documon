[
	{
		"start": 6,
		"end": 18,
		"data": "Converts markdown to HTML, with the \"definition list\" extension from markdown-extra\nwired in.\n\nUsed for comment descriptions and for the markdown files in the \"more\" folder.\n\n@module  markdown\n@package documon\n@example\n\n\t\tvar markdown = require(\"./markdown\");\n\t\tvar html = markdown(\"Some **bold** text.\");"
	},
	{
		"start": 25,
		"end": 31,
		"data": "Converts a markdown string to HTML.\n\n@method  run\n@param   {string}  str - The markdown source.\n@return  {string}      - The rendered HTML."
	},
	{
		"start": 50,
		"end": 58,
		"data": "Find and convert markdown extra definition lists into html.\n\n@method  definitionLists\n@private\n@param   {type}           text  description\n\n@return  {type}                 description"
	},
	{
		"start": 117,
		"end": 126,
		"data": "Process the contents of a single definition list, splitting it\ninto individual term and definition list items.\n\n@method  processDefListItems\n@private\n@param   {type}               listStr  description\n\n@return  {type}                        description"
	}
]