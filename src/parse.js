/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

var parseFlag = require("./parseFlag");
var aliases = require("./aliases");
var newline = "\n";



function parse(commnetObj, file) {

    if ( ! commnetObj.data ) {
        return null;
    }
    var lead;
    var startFlags = false;
    var currentFlag;
    var Acomment = commnetObj.data.split("\n");

    
    var startIdx = 0;
    for (var i = 0; i < Acomment.length; i++) {
        var line = Acomment[i].replace(/[^A-Za-z0-9]/gm, "").trim();
        if( line ){
            startIdx = i;
            break;
        }
    }

    var output = {
        text: "",
        start : commnetObj.start,
        end : commnetObj.end,
        file: file,
        flags : [],
        source : commnetObj.data
    };

    for (var i = startIdx; i < Acomment.length; i++) {
        var line = Acomment[i];
        var hasLead = line.match(/^([\s])*\@/g);

        // maybe just some empty space?
        
        // if(hasLead){
        //     var lead = hasLead[0];
        //     lead = lead.replace(/[ \r\n\t @]/gm, "");
        //     lead = lead.trim();
        //     if(lead){
        //         hasLead = null;
        //     }
        // }
        if (hasLead) {
            startFlags = true;

            // Tack the remainder text onto the source, because parseFlag only puts the first line into the source.
            if(currentFlag){
            	currentFlag.source += currentFlag.text || "";
            }
            currentFlag = parseFlag(line, output.flags);

        } else {
            if (!startFlags) {
                output.text += line + newline;
            } else {

                if (currentFlag) {

                    if (!currentFlag.text) {
                        currentFlag.text = "";
                    }
                    currentFlag.text += newline + line;
                }
            }
        }

    }


    normalize(output);

    return output;
}

/**
 * Recovers the full text a tag carried.
 *
 * `after` holds everything on the tag's own line; `text` holds the parsed description of
 * that line *plus* any continuation lines appended afterwards. Concatenating them
 * duplicates the first line, so take `after` for line one and only the continuations from
 * `text`.
 *
 * @method     flagBody
 * @private
 * @param      {object}  f - A parsed flag.
 * @return     {string}    - The tag's full text.
 */
function flagBody(f){

	var first = (f.after || "").trim();
	var rest  = "";
	var text  = f.text || "";
	var nl    = text.indexOf(newline);

	if(nl > -1){
		rest = text.substring(nl);
	}

	return (first + rest).trim();
}

/**
 * Post-parse cleanup for tags that don't map one-to-one onto a Documon tag.
 *
 * - Description tags (`@desc`, `@description`, `@classdesc`, `@fileoverview` ...) have no
 *   Documon equivalent because the description is simply the free text above the tags.
 *   Their content is folded into that text instead of being thrown away.
 * - `@access private` becomes the `@private` flag, and so on.
 * - `@const` / `@constant` becomes a read-only `@property`.
 * - Metadata tags (`@deprecated`, `@throws`, `@since` ...) are collected onto `meta` so
 *   the template can render them, rather than vanishing.
 *
 * @method     normalize
 * @private
 * @param      {object}  output - The parsed comment block, modified in place.
 */
function normalize(output){

	var kept = [];
	var extra = [];

	output.meta = [];

	for(var i=0; i<output.flags.length; i++){

		var f = output.flags[i];
		var written = f.writtenFlag || f.flag;

		// --- description tags fold into the block description
		if( aliases.isDescription(written) ){
			var body = flagBody(f);
			if(body){
				output.text = (output.text ? output.text.trim() + newline + newline : "") + body;
			}
			continue;
		}

		// --- @access private|protected|public
		if(String(written).toLowerCase() === "access"){
			var value = String(f.after || f.name || "").trim().toLowerCase();
			if( aliases.ACCESS_VALUES.indexOf(value) > -1 ){
				f.flag = value;
				f.writtenFlag = "access";
				kept.push(f);
			}
			continue;
		}

		// --- @const / @constant -> a read-only property
		var lowered = String(written).toLowerCase();
		if(lowered === "const" || lowered === "constant"){
			f.flag = "property";
			f.writtenFlag = written;
			kept.push(f);
			extra.push({ flag : "readonly", source : f.source, after : "", writtenFlag : written });
			continue;
		}

		// --- metadata with no Documon home
		var label = aliases.metaLabel(written);
		if(label){
			output.meta.push({
				label : label,
				flag  : lowered,
				text  : flagBody(f)
			});
			continue;
		}

		kept.push(f);
	}

	output.flags = kept.concat(extra);
}



module.exports = parse;
