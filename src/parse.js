/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

var parseFlag = require("./parseFlag");
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


    return output;
}



module.exports = parse;
