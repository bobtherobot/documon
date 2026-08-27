/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Extracts every documentation comment from a file into a flat, in-order array.
 * 
 * Each entry in the returned array will be an object containing 3 properties
 *  - __start__ : The line number that the comment started on
 *  - __end__ : The line number that the comment ended on
 *  - __data__ : The contents of the comment
 * 
```
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
```
 *
 * ## A few things of note:
 * - The data will NOT include the beginDoc, nor the endDoc strings.
 * - Comment prefixing is stripped 
 * 		- *  [star space]
 * 		- tabs
 * 		- spaces
 * - Code blocks maintain indentation.
 * - A beginDoc sequence inside a quoted string, or after a "//" line comment, is code --
 *   not the start of a doc block. Treating it as one swallowed every comment that
 *   followed, so those entities went missing rather than merely rendering wrong.
 *
 * ## What this does NOT do
 *
 * It does not split a file into pages. A file carrying several __package__ or
 * __namespace__ declarations is still returned as one flat array here; splitting it into
 * one group per package happens later, in [splitParsed](documon.splitParsed), which
 * [documon.js::seeder](documon.documon.seeder) calls on the *parsed* comments. This block
 * described the splitting for years after it moved, and promised a multi-dimensional
 * return value that never arrives.
 *
 * @class extract
 * @package documon
 * @param {string} text - the entire file as a string
 * @param {string} [beginDoc="&#47;**"] - The string is used to "open" a comment.
 * @param {string} [endDoc="*&#47;"] - The string is used to "close" a comment.
 * @returns {array} - A flat array of `{ start, end, data }` objects, in file order.
 * 
 */

var LINE_COMMENT = "//";

/*
Finds the column of a real comment opener on a single line, or -1.

A beginDoc sequence that sits inside a quoted string, or after a "//" line
comment, is code -- not the start of a doc block. Treating it as an opener
swallows every comment that follows it, so those entities go missing rather
than merely rendering wrong.

String state is per line: a beginDoc inside a template literal that spans
lines is still read as an opener.
*/
function findOpener(line, beginDoc, skipLineComments) {

	var quote = 0; // the open quote character, or 0 when outside a string
	var len = line.length;
	var i = 0;
	var ch;

	while (i < len) {
		ch = line.charAt(i);

		if (quote) {
			if (ch === "\\") {
				i += 2;
				continue;
			}
			if (ch === quote) {
				quote = 0;
			}
			i++;
			continue;
		}

		if (line.startsWith(beginDoc, i)) {
			return i;
		}

		if (skipLineComments && line.startsWith(LINE_COMMENT, i)) {
			return -1;
		}

		if (ch === '"' || ch === "'" || ch === "`") {
			quote = ch;
		}

		i++;
	}

	return -1;
}

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

    // "//" only means "line comment" for C-style delimiters.
    var skipLineComments = beginDoc.indexOf("/*") === 0;

    for (i = 0; i < len; i++) {
        line = ref[i];
        if ( ! inside) {
            depth = findOpener(line, beginDoc, skipLineComments);
            if (depth >= 0) {
                idx = line.indexOf(endDoc, depth + beginDoc.length);
                if (idx >= 0) {
                    // Opened and closed on the same line: /** ... */
                    result.push({
                    	start : i,
                    	end : i,
                    	data : line.substring(depth + beginDoc.length, idx).trim()
                    });
                    continue;
                }
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
