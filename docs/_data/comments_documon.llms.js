[
	{
		"start": 6,
		"end": 23,
		"data": "Emits machine-readable companions alongside the generated HTML:\n\n- `llms.txt`      -- the [llms.txt convention](https://llmstxt.org): a short, linkable\n                     index of the documentation, meant to be read by a language model\n                     rather than rendered in a browser.\n- `llms-full.txt` -- every page's prose concatenated into one plain-text file, so a\n                     model can ingest the whole manual in a single fetch.\n- `model.json`    -- the structured documentation model (packages, classes, members,\n                     params, types), so other tools can consume Documon output as data\n                     instead of scraping HTML.\n\nAll three are written to the output folder. Disable with `emitLlms:false` /\n`emitModel:false`.\n\n@module  llms\n@package documon"
	},
	{
		"start": 27,
		"end": 34,
		"data": "Strips HTML tags and collapses whitespace, leaving readable plain text.\n\n@method     deHtml\n@private\n@param      {string}  html - Source HTML.\n@return     {string}       - Plain text."
	},
	{
		"start": 58,
		"end": 66,
		"data": "Joins a base URL and a page filename.\n\n@method     joinUrl\n@private\n@param      {string}  base - Base URL, may be empty.\n@param      {string}  file - Page filename.\n@return     {string}       - A URL or bare filename."
	},
	{
		"start": 76,
		"end": 83,
		"data": "Reduces a built page into the flat record used by `model.json`.\n\n@method     modelPage\n@private\n@param      {object}  page - A page produced by `organizer.buildPages()`.\n@return     {object}       - A serializable record."
	},
	{
		"start": 144,
		"end": 152,
		"data": "Flattens the menu tree into a list of linkable pages.\n\n@method     flattenMenu\n@private\n@param      {array}  nodes - Menu nodes.\n@param      {array}  out   - Accumulator.\n@return     {array}        - Flat page records."
	},
	{
		"start": 179,
		"end": 189,
		"data": "Collects the markdown of the \"more\" folder, in menu order, for `llms-full.txt`.\n\nThe prose pages are usually the part a reader most needs -- guides, concepts, tag\nreferences -- and they are already plain text, so they go in verbatim.\n\n@method     readMore\n@private\n@param      {string}  folder - The \"more\" folder.\n@return     {array}          - `{ name, body }` records, in filename order."
	},
	{
		"start": 243,
		"end": 252,
		"data": "Writes `llms.txt`, `llms-full.txt` and `model.json`.\n\n@method  write\n@param   {object}  conf   - The resolved `mainConf`.\n@param   {array}   pages  - Pages from `organizer.buildPages()`.\n@param   {object}  log    - The logger.\n@param   {array}   [menu] - The final menu, so hand-written \"more\" pages are indexed too.\n@return  {object}         - `{ llms, llmsFull, model }` -- paths written, or nulls."
	}
]