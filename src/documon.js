/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/*
# run
cd /Volumes/Drives/projects/docs
node ./main.js

 */

/**
 * The main entry point and processor for Documon, which allows you to run Documon directly from Node.
 *
 * @module  documon
 * @package documon
 * @example
 * 
 * 		var myDocumon = require("path/to/documon/src/documon.js");
 * 		myDocumon.run({
 *   		src : "path/to/src",
 *   		out : "path/to/docs"
 * 		});
 *
 * Note that run() takes the same keys as the public entry point -- `src`, `out`, `name`
 * and the rest. ("files" is the internal name init() rewrites `src` into; passing it
 * here yields "No files to parse.") Most callers should require the package itself
 * rather than this module:
 *
 * 		var documon = require("documon");
 * 		documon({ src : "path/to/src", out : "path/to/docs" });
 * 		
 */



var fs = require('fs');
var path = require("./npath");;

var opn = require('./opn');

var log = require('./log');
var utils = require('./utils');
var du = require('./dirutils');
var extract = require('./extract');
var parse = require('./parse');
var splitParsed = require('./splitParsed');
var tag = require('./tag');
var organizer = require('./organizer');
var menuBuilder = require('./menuBuilder');
var more = require('./more');
var ignoreModule = require('./ignore');
var llms = require('./llms');
var checkTags = require('./check');
var tagAliases = require('./aliases');
//var minimatch = require("minimatch");

// We'll require these dynamically because the user may have defined some other template folder.
var Tindex;
var Tpage;
var TindexShortcut;

/**
 *
 * NOTE: // sourceRootFolder and dataFolder are injected into the "mainConf" by documon.
 *
 * Example link [other class to documon.dirutils.makedir](documon.dirutils.makedir)
 * Example link [other class to documon.dirutils](documon.dirutils)
 * Example link [local to #run](#run)
 * 
 * @property  {Object} mainConf 						- Used to store user supplied config settings.
 * @property  {string} mainConf.projectName 			- The title of the project (displayed in the title of the docs).
 * @property  {string | array} mainConf.files 					- The location of the source file or folder to process.
 * @property  {string} [mainConf.outputFolder] 			- Where the docs will be written to. Defaults to be parallel to source folder.
 * @property  {array} [mainConf.ignoreList] 			- A list of source files or folders to ignore.
 * @property  {string} [mainConf.templateFolder] 		- The path to the template folder (defaults to the main documon/template folder)
 * @property  {string} [mainConf.projectVersion] 		- Your product's version
 * @property  {string} [mainConf.docBegin="&#47;**"] 	- Delimiter used to signify the START of a source-code comment. 
 * @property  {string} [mainConf.docEnd="*&#47;"] 		- Delimiter used to signify the END of a source-code comment.
 * @property  {boolean} [mainConf.launchWhenDone=false] 	- Launch the documentation in the browser when done?
 * @property  {string | array} [mainConf.sourceExt="js"] 		- The extension of your source code files to parse. For multiple kinds, use a space delimited string (e.g. "js jsx py php").
 * @property  {boolean} [mainConf.dumpData=false]		- Whether or not to save intermediary data objects.
 * @property  {String} [mainConf.docsDirName="docs"]	- The folder name used to house the docs.

 * @property  {String} [mainConf.sourceRootFolder] 		- (derived by documon) The actual location that a given source file resides within.
 * @property  {String} [mainConf.dataFolder]			- (derived by documon) The path used to place data files.
 * @property  {String} [mainConf.more]					- The path to a folder containing addition markdown (.md) files to include.
 * @property  {String} [mainConf.indexShortcutName=__LAUNCH.html]	- The name of the index shortcut file to push it to the top of the folder so you don't have to scroll and hunt andpeck for hte "index.html" file to launch the docs.
 * @property  {String} [mainConf.moreQuirkDelimiter="."]	- More quirk delimiter. The character(s) used to separate the "more" page numbering system from page titles.
 * @property  {String} [mainConf.projectDescription]	- One-line description, used in the page meta tags and in llms.txt.
 * @property  {String} [mainConf.baseUrl]				- Public base URL of the published docs. Produces canonical links and absolute URLs in llms.txt.
 * @property  {String} [mainConf.gati]					- Google Analytics Tracking ID. When set, pages include the tracking snippet.
 * @property  {boolean} [mainConf.emitLlms=true]		- Write llms.txt and llms-full.txt.
 * @property  {boolean} [mainConf.emitModel=true]		- Write model.json, and embed the same record in each page as JSON-LD.
 * @property  {boolean} [mainConf.quiet=false]			- Suppress stdout. Derived from `print` (and forced on by `--json`), not set directly.
 * @property  {String} [mainConf.templateAssetsFolder]	- (derived by documon) The template's assets folder.
 * @property  {String} [mainConf.outputAssetsFolder]	- (derived by documon) Where those assets are copied to.
 * @property  {array} [mainConf.ignorePatterns]		- (derived by documon) The resolved ignore patterns, defaults included.

 */
var mainConf = {};

/**
 * @property  {array} extensions - The list of extensions to search for source code.
 */
var extensions;

/**
 * @property  {array} ignoreList - A list of strings representing regex patterns for files/folders to ignore. By default the following patterns are already included:
 *
 * 		'\/\.'
 * 		'\.git'
 * 		'node_modules'
 *
 * 	Configuration will concat this list with the user provied list.
 */

// Ignore handling lives in src/ignore.js, shared with --check so the builder and the
// validator always agree on which files are part of the project. Simple globs
// ("*.test.js", "src/**/tmp") are translated there, so the old "no glob" caveat no
// longer applies.
var ignoreList = [];

/**
 * @property {object} matcher - The compiled ignore matcher, built during init from the
 * default patterns plus whatever the caller supplied.
 */
var matcher = null;

/**
 * @property {object} tally - Counts of tags that were normalized or ignored during a
 * build, reported as a single line when the build finishes.
 */
var tally = { unknown : 0, normalized : 0, unknownNames : utils.dict(), retired : utils.dict() };

/**
 * @property  {boolean} quiet=false - Supress stdout messages.
 */
var quiet = false;

/**
 * @property  {boolean} dumpData=false - Whether or not to write intermediary files used during processing to the output data folder.
 */
var dumpData = false;

/**
 * @property  {string} indexRedirectName - The filename for the shortcut to the index.html file. Use a name that will push the name to the top of the folder for quicker access to the index.hrml file.
 */
var indexRedirectName = "__LAUNCH.html"




// Helper methods.

/**
 * Simplify file write for text or json.
 * 
 * @method     writeData
 * @private
 * @param      {string}       fpath    - The path to save to.
 * @param      {string}       data     - The string to save
 * @param      {boolean}      json     - Whether the data should be serialized to JSON or not.
 */
function writeData(fpath, data, json){
	fs.writeFileSync(path.normalize(fpath), json ? JSON.stringify(data, null, "\t") : data, 'utf8');
}

/**
 * Determines if the file has the proper extension based on the acceptable extensions defined in this modules static "extensions" array.
 * @method     filterFileTypes
 * @private
 * @param      {string}             fpath    - The path or full file name.
 * @return     {boolean}                     - Whether or not it's an OK extension.
 */
function filterFileTypes(fpath){

	// path.parse('/home/user/dir/file.txt')
	// Returns:
	// {
	//    root : "/",
	//    dir : "/home/user/dir",
	//    base : "file.txt",
	//    ext : ".txt",
	//    name : "file"
	// }

	var item = path.parse( fpath );
    // path.substr(1) == path.substring(1)
	return extensions.indexOf(item.ext.substring(1)) > -1;
}





/**
 * Initializes Documon based on the configuration settings
 * 
 * - Parses configuration
 * - Finds source files
 * - Creates output folder
 * - Copies template assets to output folder
 * - Initializes main templates
 *
 * @method init
 * @private
 * 
 * @param  {object} conf - See (run)[run], as this configuration object is simply passed through.
 * @returns {boolean} - False when there's an error or misconfiguration. True when everything seems cool.
 */

function init(conf){

	quiet = conf.print ? false : true;

	if( ! conf ){
		log("ERROR: (4) Configuration object not defined.", null, quiet);
		return false;
	}
	// ---------------------------------------------
	// Copy user defined options to our global "main" options
	// ---------------------------------------------
	if( ! conf.template ){
		conf.template = path.resolve(__dirname + "/../template/");
	}

	if( ! conf.ignore ){
		conf.ignore = null;
	}

	if( ! conf.out ){
		conf.out = null;
	}

	if( ! conf.name ){
		conf.name = null;
	}

	if( ! conf.version ){
		conf.version = null;
	}

	var docsDirName = (conf.docsDirName || "").trim();

	if( ! docsDirName ){
		conf.docsDirName = "docs";
	}

	mainConf = {
		files 				: conf.src,
		outputFolder 		: conf.out,
		ignoreList 			: conf.ignore,
		templateFolder 		: conf.template,
		projectName 		: conf.name || "Documon",
		projectVersion 		: conf.version || "",
		docBegin 			: conf.docBegin || "/**", 
		docEnd 				: conf.docEnd || "*/",
		launchWhenDone 		: conf.launch,
		sourceExt 			: conf.sourceExt || "js",
		dumpData			: conf.dumpData || false,
		docsDirName			: conf.docsDirName,
		moreFolder			: conf.more,
		indexShortcutName	: conf.indexShortcutName || indexRedirectName,
		gati				: conf.gati,
		projectDescription	: conf.description || "",
		baseUrl				: conf.baseUrl || "",
		emitLlms			: conf.emitLlms === false ? false : true,
		emitModel			: conf.emitModel === false ? false : true
	}



	var sourceExt = mainConf.sourceExt;
	if(typeof sourceExt == "string"){
		if(sourceExt.indexOf(" ") > -1){
			sourceExt = sourceExt.split(" ");
		} else {
			sourceExt = [sourceExt];
		}
	}
	extensions = sourceExt;

	dumpData = mainConf.dumpData;


	// ---------------------------------------------
	// Expand file(s) list
	// ---------------------------------------------
	var originalSourceFileList = [];
	var todoList = [];
	var userList = mainConf.files;
	if(typeof userList == 'string'){
		userList = [userList];
	}

	userList.sort();

	for(var i=0; i<userList.length; i++){
		var item = path.normalize( userList[i] );
		
		if( ! fs.existsSync( item ) ){
			log("ERROR: (1) File doesn't exists: " + item, null, quiet);
		
		} else {

			if( du.exists(item) ){
				var templist = du.readExt(item, extensions, true);
				todoList = todoList.concat(templist);
			
			} else {
				if( filterFileTypes( item ) ){
					todoList.push(item);
				}
			}
		}
		
	}
	

	// ---------------------------------------------
	// Base folder
	// ---------------------------------------------
	var fpath = userList[0];
	var Afpath;
	// parrallel to the folder containing the source

	// Not sure if the item is a folder or a file...
	// We know it exists, but just want to see if it's a folder
	if( du.exists(fpath) ){

		// Remove trailing slash to prep for popping. 
		if( fpath.slice(-1) == "/" ){
			fpath = fpath.slice(0, -1);
		}

		Afpath = fpath.split("/");
		Afpath.pop(); // pop parent.

		//
		// ... starting with:
		// /sally/foo/bar
		// ... will place "docs" folder here:
		// /sally/foo/docs

		// 
		// /sally/foo/bar			<-- pop dir name
		// /sally/foo 				<-- result
		// 


	} else {
		
		// remove file name
		Afpath = fpath.split("/");
		Afpath.pop(); // pop file name
		Afpath.pop(); // pop wrapping folder

		//
		// ... starting with:
		// /sally/foo/bar/file.js
		// ... will place "docs" folder here:
		// /sally/foo/docs

		// 
		// /sally/foo/bar/file.js	<-- pop file name
		// /sally/foo/bar 			<-- pop wrapping folder
		// /sally/foo 				<-- result
		// 

	}

	var sourceRootFolder = path.normalize( Afpath.join("/") );
	mainConf.sourceRootFolder = sourceRootFolder;
		
	// ---------------------------------------------
	// Output folder
	// ---------------------------------------------

	// If output folder not defined, place parrallel to source folder.
	mainConf.outputFolder = mainConf.outputFolder ?  path.normalize( mainConf.outputFolder ) : sourceRootFolder;

	utils.normalizeConfTrailingSlash(mainConf, "remove");

	if ( ! du.exists(mainConf.outputFolder) ){
	    du.make(mainConf.outputFolder);
	}

	// SAFTEY
	// -------
	// Put into a sub folder... This is a MUST to protect
	// against deleting anything that "we" didn't create.
	mainConf.outputFolder +=  "/" + mainConf.docsDirName;

	if ( ! du.exists(mainConf.outputFolder) ){
	    du.make(mainConf.outputFolder);
	}

	// Only empty if we've been here before:
	if( du.exists(mainConf.outputFolder) ){
		var see = du.empty(mainConf.outputFolder); // 2nd arg = dry run, this function returns a list of things that were deleted
		//con sole.log(see);
	}

	// ---------------------------------------------
	// Data folder
	// ---------------------------------------------
	if(dumpData){

		dataFolder = mainConf.outputFolder + "/_data";

		// Since we just emptied, the _data folder will be gone.
		if ( ! du.exists(dataFolder) ){
		    fs.mkdirSync(dataFolder);
		}
		
		mainConf.dataFolder = dataFolder;

	}

	// Add trailing slash afterwards:
	// - makes things easy (se we dont' ahve to continually do + "/" + )
	utils.normalizeConfTrailingSlash(mainConf, "add");

	var templateFolder = path.addTrailingSlash(mainConf.templateFolder);
	mainConf.templateFolder = templateFolder;

	var TconfFile = templateFolder + "_config.js";
	var assetsFolder = "assets";
	var madeAssetsFolder = false;
	if ( fs.existsSync(TconfFile) ){
	    var Tconf = require(TconfFile);
		if ( Tconf.assetsFolder ){
			assetsFolder = path.removeTrailingSlash(Tconf.assetsFolder);
			if ( fs.existsSync(templateFolder + assetsFolder) ){
				madeAssetsFolder = true;
				du.copy(templateFolder + assetsFolder, mainConf.outputFolder + assetsFolder);
			}
		}
	}

	mainConf.templateAssetsFolder = templateFolder + assetsFolder;
	mainConf.outputAssetsFolder = mainConf.outputFolder + assetsFolder;
	if ( ! madeAssetsFolder ){
		fs.mkdirSync(mainConf.outputAssetsFolder);
	}

	// Setup templates
	Tindex = require( templateFolder + "index.jst");
	Tpage = require( templateFolder + "page.jst");
	TindexShortcut = require( templateFolder + "indexShortcut.jst");

	// ---------------------------------------------
	// Ignore list (used by shouldIgnore, a globalist function.
	// - Kinda want to do this at the end so we can ignore folders we're writing to (in case we're writing into a place where source files exists).
	// ---------------------------------------------
	matcher = ignoreModule.create( mainConf.ignoreList, [
		  templateFolder
		, mainConf.dataFolder
		, mainConf.outputFolder
	]);

	ignoreList = matcher.patterns;
	mainConf.ignorePatterns = ignoreList;

	// Weed out anything we need/want to ignore
	var todoGlobber = [];
	for(var i=0; i<todoList.length; i++){
		var item = todoList[i];
		if( ! shouldIgnore(item) ){
			todoGlobber.push(item);
		}
	}


	todoList = todoGlobber;

	if(todoList.length < 1 ){
		log("ERROR: (2) No files to parse. Maybe files moved or can't find parsable file extensions in folder?", null, quiet);
		return false;
	}
	mainConf.files = todoList;

	return true;


}

/**
 * Decides whether a file or folder is excluded from this build.
 *
 * Delegates to the matcher built during [init](#init) from `src/ignore.js`, which is the
 * same matcher `--check` uses -- so the builder and the validator always agree on which
 * files are part of the project.
 *
 * @method shouldIgnore
 * @private
 * @param  {string} item - The path to test.
 * @returns {boolean} - true = ignore this file, false = don't ignore.
 */

function shouldIgnore(item){

	// Delegates to the shared matcher (src/ignore.js). The previous inline version
	// returned false for every path -- see the notes in that module.
	if( ! matcher ){
		matcher = ignoreModule.create(null, null);
	}

	return matcher.test(item);

}


/**
 * Extracts, parses and tags comments from one source file and stuffs the result into [organizer](#organizer).
 *
 * - Generates data files (if dumpData enabled)
 * 
 * @method seeder
 * @private
 * @param  {string} file - The path to the file.
 * @returns {object} - The file's search data as computed by tag.js
 */

function seeder(file){

	var searchData = {};

	if(file && fs.existsSync( file ) ){
		var fileConf = {};
		for(var prop in mainConf){
			fileConf[prop] = mainConf[prop];
		}

		var parts = path.parse(file);
		var basename = parts.name
		fileConf.file = file;
		fileConf.filename = parts.base;
		fileConf.basename = basename;

		var fileContents = fs.readFileSync(file, 'utf8');

		// ----------------
		// extract
		var comments = extract(fileContents, mainConf.docBegin, mainConf.docEnd);

		// ----------------
		// parse
		var parsed = [];
		for(var i=0; i<comments.length; i++){
			var com = parse( comments[i], file );
			if(com){
				com.file = file;
				parsed.push(com);

				// Count tags that will be silently discarded. A build that drops half the
				// project used to look identical to one that worked.
				for(var t=0; t<com.flags.length; t++){
					var flg = com.flags[t];
					if(flg.writtenFlag && flg.writtenFlag !== flg.flag){
						tally.normalized++;
					} else if( tagAliases.deprecatedFor(flg.flag) ){
						tally.retired[flg.flag] = tagAliases.deprecatedFor(flg.flag);
					} else if( checkTags.KNOWN_TAGS.indexOf(flg.flag) === -1 ){
						tally.unknown++;
						if( ! tally.unknownNames[flg.flag] ){
							tally.unknownNames[flg.flag] = true;
						}
					}
				}
			}
		}

		// Some files may have 2 or more class definitions in there.
		var split = splitParsed(parsed);

		var slen = split.length
		for(var i=0; i<slen; i++){

			var list = split[i];

			// ----------------
			// tag

			// Otherwise we'll overwrite previous "tagged_foo.js" with the next split.
			var tackSplitCount = "";
			if(slen > 1){
				tackSplitCount = "_" + i;
			}

			fileConf.splitLen = slen;
			fileConf.splitNum = i;
			var tagged = tag(list, fileConf );

			searchData = tagged.search;

			if(dumpData){
				writeData(mainConf.outputFolder + "_data/tagged_" + basename + tackSplitCount + ".js", tagged, true);
			}

			organizer.add(tagged, fileConf);

		}
		
		if(dumpData){

			if(parsed.length){
				var first = parsed[0];
				var id;

				if( ! first ){
					console.log("no first: " + basename);
					id = basename;
				} else {
					id = first.id;
				}
				

				writeData(mainConf.outputFolder + "_data/comments_" + id + ".js", comments, true);
				writeData(mainConf.outputFolder + "_data/parsed_" + id + ".js", parsed, true);
			}
			
		}

	}

	return searchData;
	

}

/**
 * The main processing loop that executes and manages the main flow control of parsing, evaluating and  
 * construction of the documentation.
 * 
 * After [init](#init) configures things based on the settings, and generates a list of files to process
 * this method process and sends each file to the [seeder](#seeder) of evaluation and processing.
 * 
 * - Generates HTML pages
 * - Generates _menuData.js
 * 
 * @method run
 *
 * @param  {object} conf 					- The configuration object. See [mainConf](#mainConf)
 * @return {object} - A summary of what was built, or **null** when nothing could be
 * built (most commonly "no files to parse"). `index.js` branches on that null to set a
 * non-zero exit code, so callers should not ignore it:
 *
 * 		{
 * 			outputFolder   : "/path/to/docs/",
 * 			index          : "/path/to/docs/index.html",
 * 			pages          : 24,   // pages written
 * 			files          : 22,   // source files parsed
 * 			emitted        : { llms : "...", llmsFull : "...", model : "..." },
 * 			unknownTags    : 0,    // tags dropped as unrecognised
 * 			normalizedTags : 3     // tags accepted under another spelling
 * 		}
 */

function run(conf){

	var result = null;

	// dict() rather than {}: keyed on tag names the user wrote, so a stray @toString
	// would otherwise read as already-recorded and vanish from the ignored-tags summary.
	tally = { unknown : 0, normalized : 0, unknownNames : utils.dict(), retired : utils.dict() };

	if(conf){

		// initializes mainConf (among other things)
		var ok = init(conf);

		if( ok ){

			var files = mainConf.files;
			
			if( ! files ){
				
				log("ERROR: (1) File(s) not specified.", null, quiet);

			} else {

				var searchData = {};

				log(null, "Running", quiet);



				// -------------
				// Organize
				log(" - initializing organizer", null, quiet);
				organizer.init(mainConf);

				// All the heavy lifting (extract, parse, tag, add to organizer
				log(" - seeding (" + files.length + ") comments.", null, quiet);
				for(var i=0; i<files.length; i++){
					var file = files[i];
					var itemSearchData = seeder(file);
					for(var prop in itemSearchData){
						searchData[prop] = itemSearchData[prop];
					}
				}

				// -------------
				// Inheritance
				log(" - processing inheritance", null, quiet);
				organizer.processInheritance();

				// -------------
				// Menu
				log(" - building menu", null, quiet);
				var org = organizer.buildMenu();

				var outFolder = mainConf.outputFolder;

				var menuObj = menuBuilder(org);

				// -------------
				// More
				log(" - building more: " + mainConf.moreFolder, null, quiet);
				var moreData = null;
				if(mainConf.moreFolder){

					if( du.exists(mainConf.moreFolder) ){

						moreMenu = more(mainConf, menuObj, searchData, shouldIgnore);

						if(moreMenu){
							menuObj = moreMenu;
						}
						/*
						// returns:
						// {
						// 	menu : flat.more.children,
						// 	docTarget : docTarget
						// }
						
						if(moreData.docTarget){
							console.log("moreData.docTarget", moreData.docTarget);
							var flop = menuObj
							moreData.docTarget.children = flop;
							menuObj = moreData.menu;
						} else {
							menuObj = menuObj.concat(moreData.menu);
						}
						*/

					}

				}

				var menuStr = "var MenuData = " + JSON.stringify(menuObj, null, "\t");
				var searchStr = "var SearchData = " + JSON.stringify(searchData, null, "\t");
				fs.writeFileSync(outFolder + "_menuData.js", menuStr, 'utf8');
				fs.writeFileSync(outFolder + "_searchData.js", searchStr, 'utf8');



				// -------------
				// Pages

				var indexed = organizer.buildPages();
				log(" - building (" + indexed.length + ") pages", null, quiet);
				
				for(var i=0; i<indexed.length; i++){
					var page = indexed[i];
					
					// Values the page template needs that don't come through the tagger.
					page.ctx.gati = mainConf.gati;
					page.ctx.baseUrl = mainConf.baseUrl;
					page.ctx.projectDescription = mainConf.projectDescription;

					// The same record that goes into model.json, handed to the template so
					// it can embed it as JSON-LD. model.json only helps a reader who knows
					// to go looking for it; a page carrying its own structure helps whoever
					// lands on that one URL. Built here rather than in the template so the
					// derivation stays in one place, and so a custom template folder does
					// not have to reach into src/.
					//
					// Gated on emitModel, because embedding the model in every page while
					// being told not to emit it would be a surprising reading of the flag.
					if(mainConf.emitModel !== false){
						page.ctx.model = llms.modelPage(page);
					}

					var str = Tpage(page.ctx, page.html);
					var htmlFile = outFolder + page.id + ".html";
					fs.writeFileSync(htmlFile, str, 'utf8');
					log("    " + htmlFile, null, quiet);
				}

				/*
				// ------------------
				// Home page
				// ------------------
				log(" - writing home", null, quiet);
				var html = Tindex(mainConf);
				var homePagePath = outFolder + "home.html"
				fs.writeFileSync(homePagePath, html, 'utf8');
				
				log(mainConf.outputFolder, "DONE mon! Docs ready at:", quiet);

				log("\n", null, quiet);

				if(mainConf.launchWhenDone){
					opn( homePagePath, {wait : false});
				}
				*/

				// ------------------
				// Index page
				// ------------------
				log(" - writing index", null, quiet);
				var html = Tindex(mainConf);
				var homePagePath = outFolder + "index.html"
				fs.writeFileSync(homePagePath, html, 'utf8');

				// Index shortcut
				fs.writeFileSync(outFolder + mainConf.indexShortcutName, TindexShortcut(page.ctx), 'utf8');
				

				// ------------------
				// Machine-readable companions (llms.txt, llms-full.txt, model.json)
				// ------------------
				var emitted = {};
				if(mainConf.emitLlms !== false || mainConf.emitModel !== false){
					log(" - writing machine-readable companions", null, quiet);
					emitted = llms.write(mainConf, indexed, log, menuObj);
				}

				// Retired spellings get their own line: they used to work, so a generic
				// "unrecognized tag" would undersell the breakage.
				var retiredNames = Object.keys(tally.retired);
				if(retiredNames.length){
					for(var rn=0; rn<retiredNames.length; rn++){
						log(" ! @" + retiredNames[rn] + " was retired -- rename it to @"
							+ tally.retired[ retiredNames[rn] ], null, quiet);
					}
				}

				// One-line summary of anything that didn't make it into the output.
				if(tally.unknown){
					var names = Object.keys(tally.unknownNames).map(function(n){ return "@" + n; });
					log(" ! " + tally.unknown + " unrecognized tag"
						+ (tally.unknown === 1 ? "" : "s") + " ignored ("
						+ names.slice(0, 6).join(", ")
						+ (names.length > 6 ? ", ..." : "")
						+ ") -- run with --check for detail", null, quiet);
				}

				// Done
				log(mainConf.outputFolder, "DONE mon! Docs ready at:", quiet);

				log("\n", null, quiet);

				// Launch
				if(mainConf.launchWhenDone){
					opn( homePagePath, {wait : false});
				}

				result = {
					outputFolder : mainConf.outputFolder,
					pages        : indexed.length,
					files        : files.length,
					index        : homePagePath,
					emitted      : emitted,
					unknownTags  : tally.unknown,
					normalizedTags : tally.normalized
				};
				
			}

		}
		
	
	} else {
		log("ERROR: (3) Configuration not specified.", null, quiet);
	}

	return result;

}

module.exports = {
	run : run
};


