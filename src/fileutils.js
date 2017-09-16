/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */


/**
 * Basic, common and simplified asyncronous file methods.
 *
 * @package documon
 * @class  fileutils
 */
var fs = require('fs');
var path = require('./npath');
var du = require('./dirutils');

/**
 * Copies a file from one location to another.
 * 
 * @method     copy
 * @param      {string}    src     - The source file path.
 * @param      {string}    dest    - The destination to copy the source to.
 */
function copy(src, dest){
	if (!exists(src)) {
		return false;
	}
	var data = fs.readFileSync(src, "UTF-8");
	if( du.exists(dest) ){
		var name = path.basename(src);
		dest = path.removeTrailingSlash(dest) + "/" + name;
	}
	
	fs.writeFileSync(dest, data, "UTF-8");
}


/**
 * Reads the entire file as a string. NOTE: This is an alias for [read](#read).
 * 
 * @method     Open
 * @param      {string}    src    - The source file path.
 * @return     {string}           description
 */

/**
 * Reads the entire file as a string.
 * 
 * @method     read
 * @param      {string}    src    - The source file path.
 * @return     {string}           description
 */
function read(src){
	if (!fs.existsSync(src)) {
		return false;
	}
	return fs.readFileSync(src, "UTF-8");
}


/**
 * Saves text data to a file. Overwrites entire file with provided data. NOTE:  This is an alias for [write](#write).
 * 
 * @method     save
 * @param      {string}    src    - The source file path.
 * @param      {string}    data    - The text data to save.
 */

/**
 * Saves text data to a file. Overwrites entire file with provided data.
 * 
 * @method     write
 * @param      {string}    src    - The source file path.
 * @param      {string}    data    - The text data to save.
 */
function write(src, data){
	fs.writeFileSync(src, data, "UTF-8");
}

/**
 * Deletes a file from the system.
 * @method     remove
 * @param      {string}    src    - The source file path.
 */
function remove(src){
	fs.unlinkSync(src);
}

/**
 * Cehcsk to see if a file exists. Note this also checks if a folder of the same name exists too.
 * @method     exists
 * @private
 * @param      {type}    src    - The source file path.
 * @return     {boolean}           - True if exists, false if no file nor folder exists.
 */
function exists(src){
	return fs.existsSync(src) || du.exists(src)
}

module.exports = {
	copy 	: copy,
	read 	: read,
	open 	: read, // alias
	write 	: write,
	save 	: write,  // alias
	remove 	: remove,
	exists 	: exists
}