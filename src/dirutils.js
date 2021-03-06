/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * A collection of utilities for manipulating directories syncronously.
 *
 * @module  dirutils
 * @package  documon
 */


var fs = require('fs');
var path = require('./npath');

// 1. makedir ("/foo/bar/qwer")  <-- not exist
//    |    2. makedir ("/foo/bar") <-- not exist
//    |       |    3. makedir ("/foo") <-- not exist
//    |       |       |    4. makedir ("/") <-- not likely to be able to write here, so fs.mkdir will probably fail
//    |       |       |	          5. fs.mkdir now runs waiting stack:
//    |       |       |--------------> fs.mkdir ("/foo") 		   <-- waiting
//    |       |----------------------> fs.mkdir ("/foo/bar") 	   <-- waiting
//    |------------------------------> fs.mkdir ("/foo/bar/qwer") <-- waiting

/**
 * Creates a folder at the specified location. The sub-folder heirarchy is
 constructed as needed.

 For example if a folder exists here:

 	/path/to/folder

 ... but the following sub-folders don't exists:

	/path/to/folder/sub/one/two/three

  ... Then the "sub/one/two/three" tree will be constructed inside "/path/to/folder")

 * @method makedir
 * @param  {string}  dest="path/to/make" The destination folder to create
 */

function makedir(dest) {
    dest = path.resolve(dest);
    if (!fs.existsSync(dest)) {
        makedir(path.dirname(dest));
        fs.mkdirSync(dest); // adds to wait stack
    }
};

/*
{ 
	by : "ext",
	accept : ["js", "html"],
	reject : ["js", "html"]
}
 */

/**
 * Collects files from a folder based on the specified extension (or
 extensions). Can be used to search recursively through all sub-folders, and can
 search multiple extensions.

 Provided as shortcut for [readdir](#readdir) with your own
 extension-checking filter.

 * @method readExt
 *
 * @param  {string}		from 		- The path to search
 * @param  {string | array} [exts] 	- The extension to look for (e.g. "jpg"). To
 search for multiple extensions, use an array e.g. ["jpg", "png", "gif"]
 * @param  {boolean}	[recursive] - Find all matching files in all
 sub-folders.
 *
 * @return {array} - The resulting array contains only files that mathc the
 specified extension(s).
 */

function readExt(from, exts, recursive){

	var filter;
	if( Array.isArray(exts) ){
		filter = function(isFolder, file, stats){
			if( isFolder ){
				return false;
			} else {
				var item = path.parse( file );
				return exts.indexOf(item.ext.substr(1)) > -1;
			}
		}
	} else {
		filter = function(isFolder, file, stats){
			if( isFolder ){
				return false;
			} else {
				var item = path.parse( file );
				return item.ext.substr(1) == exts;
			}
		}
	}

	var obj = readdir(from, filter, recursive);

	return obj.files;
}

/**
 * Read a folder and returns an object containing all of the files and
 folder in arrays.

 * @method readdir
 *
 * @param  {string}  	from      	- The path to the folder to read.
 * @param  {function}  	filter   	- A custom filter funciton.
 * @param  {boolean}  	recursive 	- Should we retrieve sub-folders too?
 * @param  {object}  	store     	- Used internally to store recursive findings.
 Note that you may also provide this argument and readdir will populate your
 existing files/folder list. But is recommended to leave this argument alone.
 *
 * @return {object} - An object containing a list of "files" and "folders" 
 (as properties of the returned list), where each is an array.
 * 
@example
 	var contents = readdir("/path/to/folder", null, true);
 	// yeids contents {
	// 		files : [
	// 					"/path/to/folder/1.foo",
	// 					"/path/to/folder/2.bar",
	// 					"/path/to/folder/3.png",
	//					"/path/to/folder/sub1/1.foo",
	// 					"/path/to/folder/sub2/2.bar",
	// 					"/path/to/folder/sub3/3.png"
	// 				],
	// 		dirs : [
	// 					"/path/to/folder/sub1",
	// 					"/path/to/folder/sub2",
	// 					"/path/to/folder/sub3"
	// 
	// 				]
	// }

 */

function readdir(from, filter, recursive, store){
	if( ! store ){
		store = { dirs: [], files: [] };
	}
	var hasFilterFunction = typeof filter == 'function';

	var files = fs.readdirSync(from);
	var len = files.length;
	for(var i=0; i<len; i++){
		var file = path.join(from, files[i]);
      	//var stats = fs.lstatSync(file);
      	var stats = fs.statSync(file); // dereference symlinks (follows symbolic links)
		if ( stats.isDirectory() ) {
            
            if(hasFilterFunction){
        		if( filter( true, file, stats ) ){
        			store.dirs.push(file);
        		}
        	} else {
        		store.dirs.push(file);
        	}

            if(recursive){
            	readdir(file, filter, true, store);
            }
        } else if ( stats.isFile() ) {
        	if(hasFilterFunction){
        		if( filter( false, file, stats ) ){
        			store.files.push(file);
        		}
        	} else {
        		store.files.push(file);
        	}
            
        }
	}

	return store;
}

/**
 * Copies the entire folder's heirarchy folder from one location to another. If the other location doesn't exists, it will be constructed.
 *
 * @method copydir
 *
 * @param  {string}  from - The source folder
 * @param  {string}  to   - The destination folder (get's created if not exist)
 */

function copydir(from, to) {
    var list = readdir(from, null, true);

    var dirs = list.dirs.sort(); // should be a little faster if we sort
	for(var i=dirs.length; i--;){
		makedir(  path.join(to, path.relative(from, dirs[i]))  );
	}

    var files = list.files;
	for(var i=files.length; i--;){
		var file = files[i];
        fs.writeFileSync(
        		path.join(to, path.relative(from, file)), 
        		fs.readFileSync(file, 'binary'), 
        		'binary'
        	);
	}

};

/**
 * Recursively empties a folder of all it's contents (and all the sub-folder's contents), but leaves the source folder.
 *
 * @method emptydir
 *
 * @param  {string}   	who    - The source folder
 * @param  {boolean}   	dryRun - Prevents actual deletion, but still allows the return list to display what "will" be deleted.
 *
 * @return {array} - An array containing a list of paths to files and folders that we're deleted (or will be deleted when dryrun is true) 
 */

function emptydir(who, dryRun) {
    var list = readdir(who, null, true);
    var removed = [];

    var files = list.files;
	for(var i=files.length; i--;){
		var file = files[i];
		removed.push(file);
        if( ! dryRun ){
            fs.unlinkSync(file);
        }
	}

	var dirs = list.dirs.sort(); // should be a little faster if we sort
	for(var i=dirs.length; i--;){
		var dir = dirs[i]
		removed.push(dir);
		if( ! dryRun ){
            fs.rmdirSync(dir);
        }
	}

	return removed;

};

/**
 * Recursively removes a folder and all of it's sub-folders as well.
 *
 * @method removedir
 *
 * @param  {string}		who    	- The path to the folder
 * @param  {boolean}	dryRun 	- Prevents actual deletion, but still allows the return to return the list of items that "will" be deleted.
 *
 * @return {array} - An array of all the items that were deleted (or "will be" deleted if dryrun is true.
 */

function removedir(who, dryRun){
	var removed = emptydir(who, dryRun);

	removed.push(who);
    if( ! dryRun ){
       fs.rmdirSync(who);
    }

    return removed;
}


/**
 * Checks to see if a folder exists.
 *
 * @method exists
 *
 * @param  {string} who The path to the folder.
 *
 * @return {boolean} duh
 */

function exists(who){

	var val = false;
	var obj;
	try {
		//var obj = fs.lstatSync(who);
		var obj = fs.statSync(who); // dereference symlinks (follows symbolic links)
		if(obj){
			val = obj.isDirectory();
		}
		
	} catch(e){
		// ignore 
		// val = false;
	}

	return val;
	
}

module.exports = {
	make : makedir,
	copy : copydir,
	read : readdir,
	readExt : readExt,
	empty : emptydir,
	remove : removedir,
	exists : exists
}
