[
	{
		"start": 13,
		"end": 25,
		"data": "The main entry point and processor for Documon, which allows you to run Documon directly from Node.\n\n@module  documon\n@package documon\n@example\n\n\t\tvar myDocumon = require(\"path/to/documon/src/documon.js\");\n\t\tmyDocumon.run({\n  \t\tfiles : \"path/to/src\"\n\t\t});\n\t\t"
	},
	{
		"start": 51,
		"end": 80,
		"data": "\nNOTE: // sourceRootFolder and dataFolder are injected into the \"mainConf\" by documon.\n\nExample link [other class to root.documon.dirutils.makedir](root.documon.dirutils.makedir)\nExample link [other class to documon.dirutils.makedir](documon.dirutils.makedir)\nExample link [other class to documon.dirutils](documon.dirutils)\nExample link [local to #run](#run)\n\n@property  {Object} mainConf \t\t\t\t\t\t- Used to store user supplied config settings.\n@property  {string} mainConf.projectName \t\t\t- The title of the project (displayed in the title of the docs).\n@property  {string | array} mainConf.files \t\t\t\t\t- The location of the source file or folder to process.\n@property  {string} [mainConf.outputFolder] \t\t\t- Where the docs will be written to. Defaults to be parallel to source folder.\n@property  {array} [mainConf.ignoreList] \t\t\t- A list of source files or folders to ignore.\n@property  {string} [mainConf.templateFolder] \t\t- The path to the template folder (defaults to the main documon/template folder)\n@property  {string} [mainConf.projectVersion] \t\t- Your product's version\n@property  {string} [mainConf.docBegin=\"&#47;**\"] \t- Delimiter used to signify the START of a source-code comment. \n@property  {string} [mainConf.docEnd=\"*&#47;\"] \t\t- Delimiter used to signify the END of a source-code comment.\n@property  {boolean} [mainConf.launchWhenDone=false] \t- Launch the documentation in the browser when done?\n@property  {string | array} [mainConf.sourceExt=\"js\"] \t\t- The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. \"js jsx py php\").\n@property  {boolean} [mainConf.dumpData=false]\t\t- Whether or not to save intermediary data objects.\n@property  {String} [mainConf.docsDirName=\"docs\"]\t- The folder name used to house the docs.\n\n@property  {String} [mainConf.sourceRootFolder] \t\t- (derived by documon) The actual location that a given source file resides within.\n@property  {String} [mainConf.dataFolder]\t\t\t- (derived by documon) The path used to place data files.\n@property  {String} [mainConf.more]\t\t\t\t\t- The path to a folder containing addition markdown (.md) files to include.\n@property  {String} [mainConf.indexShortcutName=__LAUNCH.html]\t- The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte \"index.html\" file to launch the docs.\n@property  {String} [mainConf.moreQuirkDelimiter=\".\"]\t- More quirk delimiter. The character(s) use to seperate the \"more\" page numbering system from page titles.\n"
	},
	{
		"start": 83,
		"end": 85,
		"data": "@property  {array} extensions - The list of extensions to search for source code."
	},
	{
		"start": 88,
		"end": 96,
		"data": "@property  {array} ignoreList - A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:\n\n\t\t'\\/\\.'\n\t\t'\\.git'\n\t\t'node_modules'\n\n\tConfiguration will concat this list with the user provied list."
	},
	{
		"start": 106,
		"end": 107,
		"data": ""
	},
	{
		"start": 108,
		"end": 110,
		"data": "git', 'node_modules'];"
	},
	{
		"start": 112,
		"end": 114,
		"data": "@property  {boolean} quiet=false - Supress stdout messages."
	},
	{
		"start": 117,
		"end": 119,
		"data": "@property  {boolean} dumpData=false - Whether or not to write intermediary files used during processing to the output data folder."
	},
	{
		"start": 122,
		"end": 124,
		"data": "@property  {string} indexRedirectName - The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file."
	},
	{
		"start": 132,
		"end": 140,
		"data": "Simplify file write for text or json.\n\n@method     writeData\n@private\n@param      {string}       fpath    - The path to save to.\n@param      {string}       data     - The string to save\n@param      {boolean}      json     - Whether the data should be serialized to JSON or not."
	},
	{
		"start": 145,
		"end": 151,
		"data": "Determines if the file has the proper extension based on the acceptable extensions defined in this modules static \"extensions\" array.\n@method     filterFileTypes\n@private\n@param      {string}             fpath    - The path or full file name.\n@return     {boolean}                     - Whether or not it's an OK extension."
	},
	{
		"start": 172,
		"end": 186,
		"data": "Initializes Documan based on the configuration settings\n\n- Parses configuration\n- Finds source files\n- Creates output folder\n- Copies template assets to output folder\n- Initializes main templates\n\n@method init\n@private\n\n@param  {object} conf - See (run)[run], as this configuration object is simply passed through.\n@returns {boolean} - False when there's an error or misconfiguration. True when everything seems cool."
	},
	{
		"start": 232,
		"end": 233,
		"data": ""
	},
	{
		"start": 464,
		"end": 473,
		"data": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).\n\n- Generates data files (if dumpData enabled)\n\n@method shouldIgnore\n@private\n@param  {string} item - The path to the file.\n@returns {boolean} - true = ignore this file, false = don't ignore."
	},
	{
		"start": 506,
		"end": 515,
		"data": "Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).\n\n- Generates data files (if dumpData enabled)\n\n@method seeder\n@private\n@param  {string} file - The path to the file.\n@returns {object} - The file's search data as computed by tag.js"
	},
	{
		"start": 608,
		"end": 621,
		"data": "The main processing loop that executes and manages the main flow control of parsing, evaluating and  \nconstruction of the documentation.\n\nAfter [init](#init) configures things based on the settings, and generates a list of files to process\nthis method process and sends each file to the [seeder](#seeder) of evaluation and processing.\n\n- Generates HTML pages\n- Generates _menuData.js\n\n@method run\n\n@param  {object} conf \t\t\t\t\t- The configuration object. See [mainConf](#mainConf)"
	}
]