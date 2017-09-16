[
	{
		"start": 6,
		"end": 14,
		"data": "This is essentially [pagedown-extra](https://github.com/jmcmanus/pagedown-extra), ported to run as a simple node module.\r\nhttps://github.com/jmcmanus/pagedown-extra\r\n\r\n@module  markdown-extra\r\n@package documon\r\n@private\r\n\r"
	},
	{
		"start": 180,
		"end": 200,
		"data": "Hooks into the main Markdown Converter to do pre and post processing on the source markdown-to-HTML conversions.\r\n\r\n@method  init\r\n\r\n@param   {Markdown.Converter}  \tconverter  - A handle to a MarkdownConverter instance.\r\n@param   {object} options    - Things you can do.\r\n@param   {array} [options.extensions=\"all\"] : (array) A list of extras to process. By default all extras are processed. This option allows you to only process specific kinds of extras. The full list of available extras are:\r\n\t - tables\r\n\t - fenced_code_gfm\r\n\t - def_list\r\n\t - attr_list\r\n\t - footnotes\r\n\t - smartypants\r\n\t - strikethrough\r\n\t - newlines\r\n@param   {array} [options.highlighter] : (string) The preferred syntax highlighter. Two options are available: prettify ([google prettify](https://github.com/google/code-prettify)) or \"highlight\" ([highlightJs](https://highlightjs.org/). You'll have to include the script of your choice into your pages manually!\r\n@param   {array} [options.table_class] : (string) The CSS class to apply to tables.\r\n\r\n@return  {MarkdownExtra} - An instance of MarkdownExtra. Not really needed for anything other than for testing and development purposes.\r"
	},
	{
		"start": 292,
		"end": 300,
		"data": "Do transformations\r\n\r\n@method  doTransform\r\n@private\r\n@param   {array}\t\ttransformations\r\n@param   {string}\ttext \r\n@return  {string}\r"
	},
	{
		"start": 309,
		"end": 317,
		"data": "Return a placeholder containing a key, which is the block's index in the\r\nhashBlocks array. We wrap our output in a <p> tag here so Pagedown won't.\r\n\r\n@method  hashExtraBlock\r\n@private\r\n@param   {string} block\r\n@return  {string}\r"
	},
	{
		"start": 322,
		"end": 327,
		"data": "@method  hashExtraInline\r\n@private\r\n@param   {string} block\r\n@return  {string}\r"
	},
	{
		"start": 334,
		"end": 341,
		"data": "Replace placeholder blocks in `text` with their corresponding\r\nhtml blocks in the hashBlocks array.\r\n@method  unHashExtraBlocks\r\n@private\r\n@param   {string} text\r\n@return  {string}\r"
	},
	{
		"start": 360,
		"end": 367,
		"data": "Wrap headers to make sure they won't be in def lists\r\n\r\n@method  wrapHeaders\r\n@private\r\n@param   {string} text\r\n@return  {string}\r"
	},
	{
		"start": 393,
		"end": 401,
		"data": "Extract headers attribute blocks, move them above the element they will be applied to, and hash them for later.\r\n\r\n@method  hashHeaderAttributeBlocks\r\n@private\r\n@param   {type}                     text  description\r\n\r\n@return  {type}                           description\r"
	},
	{
		"start": 415,
		"end": 423,
		"data": "Extract FCB attribute blocks, move them above the element they will be applied to, and hash them for later.\r\n\r\n@method  hashFcbAttributeBlocks\r\n@private\r\n@param   {type}                  text  description\r\n\r\n@return  {type}                        description\r"
	},
	{
		"start": 437,
		"end": 445,
		"data": "[applyAttributeBlocks description]\r\n\r\n@method  applyAttributeBlocks\r\n@private\r\n@param   {type}                text  description\r\n\r\n@return  {type}                      description\r"
	},
	{
		"start": 484,
		"end": 492,
		"data": "Find and convert Markdown Extra tables into html.\r\n\r\n@method  tables\r\n@private\r\n@param   {type}  text  description\r\n\r\n@return  {type}        description\r"
	},
	{
		"start": 608,
		"end": 616,
		"data": "Strip footnote, store in hashes.\r\n\r\n@method  stripFootnoteDefinitions\r\n@private\r\n@param   {type}                    text  description\r\n\r\n@return  {type}                          description\r"
	},
	{
		"start": 634,
		"end": 642,
		"data": "Find and convert footnotes references.\r\n\r\n@method  doFootnotes\r\n@private\r\n@param   {type}       text  description\r\n\r\n@return  {type}             description\r"
	},
	{
		"start": 665,
		"end": 673,
		"data": "Print footnotes at the end of the document\r\n\r\n@method  printFootnotes\r\n@private\r\n@param   {type}          text  description\r\n\r\n@return  {type}                description\r"
	},
	{
		"start": 700,
		"end": 708,
		"data": "Find and convert gfm-inspired fenced code blocks into html.\r\n\r\n@method  fencedCodeBlocks\r\n@private\r\n@param   {type}            text  description\r\n\r\n@return  {type}                  description\r"
	},
	{
		"start": 753,
		"end": 761,
		"data": "[educatePants description]\r\n\r\n@method  educatePants\r\n@private\r\n@param   {type}        text  description\r\n\r\n@return  {type}              description\r"
	},
	{
		"start": 791,
		"end": 800,
		"data": "[revertPants description]\r\n\r\n@method  revertPants\r\n@private\r\n@param   {type}       wholeMatch  description\r\n@param   {type}       m1          description\r\n\r\n@return  {type}                   description\r"
	},
	{
		"start": 813,
		"end": 821,
		"data": "[applyPants description]\r\n\r\n@method  applyPants\r\n@private\r\n@param   {type}      text  description\r\n\r\n@return  {type}            description\r"
	},
	{
		"start": 880,
		"end": 888,
		"data": "Find and convert markdown extra definition lists into html.\r\n\r\n@method  runSmartyPants\r\n@private\r\n@param   {type}          text  description\r\n\r\n@return  {type}                description\r"
	},
	{
		"start": 901,
		"end": 909,
		"data": "Find and convert markdown extra definition lists into html.\r\n\r\n@method  definitionLists\r\n@private\r\n@param   {type}           text  description\r\n\r\n@return  {type}                 description\r"
	},
	{
		"start": 958,
		"end": 967,
		"data": "Process the contents of a single definition list, splitting it\r\ninto individual term and definition list items.\r\n\r\n@method  processDefListItems\r\n@private\r\n@param   {type}               listStr  description\r\n\r\n@return  {type}                        description\r"
	},
	{
		"start": 1044,
		"end": 1052,
		"data": "[strikethrough description]\r\n\r\n@method  strikethrough\r\n@private\r\n@param   {type}         text  description\r\n\r\n@return  {type}               description\r"
	},
	{
		"start": 1064,
		"end": 1072,
		"data": "[newlines description]\r\n\r\n@method  newlines\r\n@private\r\n@param   {type}    text  description\r\n\r\n@return  {type}          description\r"
	}
]