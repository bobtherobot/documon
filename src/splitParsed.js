/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Splits one file's parsed comments into independent groups, so a file containing several
 * classes behaves like several one-class files.
 *
 * `tag.js` assumes everything handed to it belongs to a single page, so the split has to
 * happen first.
 *
 * @module  splitParsed
 * @package documon
 */

/**
 * @property {array} spliton - Tags that begin a new group.
 */
var spliton = ["package", "namespace", "module", "class"];

/**
 * @property {array} packageTags - Tags that declare the enclosing package.
 */
var packageTags = ["package", "namespace"];

/**
 * Finds the package a group declares for itself, if any.
 *
 * @method     declaredPackage
 * @private
 * @param      {array}   chunk - A group of parsed comment blocks.
 * @return     {string}        - The package name, or null.
 */
function declaredPackage(chunk){

	for(var i=0; i<chunk.length; i++){
		var flags = chunk[i].flags || [];
		for(var f=0; f<flags.length; f++){
			if( packageTags.indexOf(flags[f].flag) > -1 ){
				var val = (flags[f].after || flags[f].name || "").trim();
				if(val){
					return val;
				}
			}
		}
	}

	return null;
}

/**
 * Carries a file's `@package` forward into later groups.
 *
 * Splitting on `@class` means a second class in a file starts a group of its own, and
 * that group contains no `@package` tag -- the file declared it once, at the top. Without
 * this, `tag.js` finds nothing and falls back to the `root` package, so a file like
 *
 * 		&#47;** &#64;module thing &#64;package app *&#47;
 * 		&#47;** &#64;class Good *&#47;
 *
 * produced `app.thing` and `root.Good` rather than `app.thing` and `app.Good` -- and any
 * `&#64;extends app.Good` elsewhere then failed to resolve.
 *
 * A group that declares its own `@package` is left alone, so an explicit declaration
 * always wins and a file can still switch packages part way down.
 *
 * @method     propagatePackage
 * @private
 * @param      {array}  chunks - Groups, in source order.
 * @return     {array}         - The same groups, with inherited packages filled in.
 */
function propagatePackage(chunks){

	var current = null;

	for(var i=0; i<chunks.length; i++){

		var chunk = chunks[i];

		if( ! chunk.length ){
			continue;
		}

		var declared = declaredPackage(chunk);

		if(declared){
			current = declared;
			continue;
		}

		if( ! current ){
			continue;
		}

		// Attach to the first block of the group. `tag.js` reads the package off the
		// class/module block itself, which is the same shape as writing
		// "@class Foo" and "@package bar" together by hand.
		chunk[0].flags = chunk[0].flags || [];
		chunk[0].flags.push({
			flag        : "package",
			after       : current,
			name        : current,
			source      : "@package " + current,
			inherited   : true
		});
	}

	return chunks;
}

/**
 * Splits a file's parsed comments into groups.
 *
 * @method  split
 * @param   {array}  parsed - Parsed comment blocks, in source order.
 * @return  {array}         - An array of groups.
 */
function split(parsed){

	var ret = [];
	var chunk = [];

	for(var i=0; i<parsed.length; i++){

		var item = parsed[i];
		var flags = item.flags;

		for(var f=0; f<flags.length; f++){
			var flagList = flags[f];
			if(spliton.indexOf(flagList.flag) > -1){
				if(chunk.length){
					ret.push(chunk);
					chunk = [];
					break;
				}
			}
		}

		chunk.push(item);
	}

	ret.push(chunk);

	return propagatePackage(ret);
}

module.exports = split;
