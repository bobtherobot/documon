/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Extracts comments from a file into an array or mulit-dementional array when the "text" arg contains mulitple __package__ or __namepsace__ definitions.
 * 
 * Each entry in the returned array will be an object containing 3 properties
 *  - __start__ : The line number that the comment started on
 *  - __end__ : The line number that the comment ended on
 *  - __data__ : The contents of the comment
 * 
	var myComments = extract(str);
	yields : [
				{ 
					start : 12,
					end : 32,
					data : "the descript"
				},
				{ 
					start : 12,
					end : 32,
					data : "the descript"
				}
		]
 *
 * ## A few things of note:
 * - The data will NOT include the beginDoc, nor the endDoc strings.
 * - Comment prefixing is stripped 
 * 		- *  [star space]
 * 		- tabs
 * 		- spaces
 * - Code blocks maintain indentation.
 * - Splitting on __package__ or __namespace__. When a single file contains mulitple references to a "__package__" or "__namespace__" comments will split into multiple arrays -- treating the single source file as being mulitple files. 
 * 
 * Split __Example__:
 *
 * 	&#47;**
 * 	* Class A
 * 	* @package foo <-- this designates a new "page"
 * 	*&#47;
 * 
 * 	&#47;**
 * 	* Something for A
 * 	* @method something
 * 	*&#47;
 *  
 * 	&#47;**
 * 	* Class B
 * 	* @package bar <-- this designates a new "page"
 * 	*&#47;
 *  
 * 	&#47;**
 * 	* Something for B
 * 	* @method something
 * 	*&#47;
	
	var myComments = extract(str);
	yields : [
				[ // the first "page"
					{ 
						start : 12,
						end : 32,
						data : "Class A ... "
					},
					{ 
						start : 12,
						end : 32,
						data : "Something for A ..."
					},
		
				],
				[ // the second "page"
					{ 
						start : 64,
						end : 96,
						data : "Class B ... "
					},
					{ 
						start : 128,
						end : 142,
						data : "Something for B ..."
					},
				,
			]

 * @class extract
 * @package documon
 * @param {string} text - the entire file as a string
 * @param {string} [beginDoc="&#47;**"] - The string is used to "open" a comment.
 * @param {string} [endDoc="*&#47;"] - The string is used to "close" a comment.
 * @returns {array} - An array of comments, or multi-dimentional array oaf page comments.
 * 
 */

module.exports = function(text, beginDoc, endDoc) {

	//var re_lead = /^([\s\*]*[^\S])/g
	//var re_lead = /^([\s])*(\*)/g;
	var re_lead = /^([\s])*(\* |\*)/g;

	beginDoc = beginDoc || "/**";
	endDoc = endDoc || "*/";

    var ref = text.split('\n');
    var idx;
    var line;
    var search;
    var substr;
    var result = [];
    var depth = 0;
    var subdepth = 0;
    var inside = false;
    var i;
    var len = ref.length;

    var lead;

    var section;
    var lineStart = 0;
    var lineEnd = 0;

    for (i = 0; i < len; i++) {
        line = ref[i];
        if ( ! inside) {
            depth = line.indexOf(beginDoc);
            if (depth >= 0) {
                inside = true;
                section = [];
                lineStart = i;
            }
        } else {
            idx = line.indexOf(endDoc);
            if (idx >= 0) {
                inside = false;
                result.push({
                	start : lineStart,
                	end : i,
                	data : section.join('\n')
                });
            } else {
                //substr = line.substr(depth);
                substr = line.substring(depth);
                search = substr.match(re_lead);
                if( search ){
                	substr = substr.replace(re_lead, "")
                }
                section.push(substr);
            }
        }
    }


    return result;
};
