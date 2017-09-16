/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

var spliton = ["package", "namespace", "module", "class"];

// Since the parsed array follows the flow to the page from top to bottom,
// we can split a single file into diffrent parts, where each part fo the page
// will appear to behave like an indivual file (in the traditional sense of one-class-per-file)
//
// Because when we send into tag.js it is assuming the array of comments we send into it are
// all part of the same "group" (saying group because the comments may be just a collection 
// of props and methods for a package or part of a class. 

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
					//ret.push(chunk.slice());
					ret.push(chunk);
					chunk = [];
					break;
				}
			}
		}

		chunk.push(item);
		
	}

	//ret.push(chunk.slice());
	ret.push(chunk);

	return ret;
}

module.exports = split