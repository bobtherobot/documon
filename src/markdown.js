
var showdown = require("showdown");



function run(str){
    var converter = new showdown.Converter({
        extensions: ['def_list']
    });
    return converter.makeHtml(str)
}




/**
 * Find and convert markdown extra definition lists into html.
 *
 * @method  definitionLists
 * @private
 * @param   {type}           text  description
 *
 * @return  {type}                 description
 */
function definitionLists (text) {
    var wholeList = new RegExp(
        ['(\\x02\\n?|\\n\\n)',
            '(?:',
            '(', // $1 = whole list
            '(', // $2
            '[ ]{0,3}',
            '((?:[ \\t]*\\S.*\\n)+)', // $3 = defined term
            '\\n?',
            '[ ]{0,3}:[ ]+', // colon starting definition
            ')',
            '([\\s\\S]+?)',
            '(', // $4
            '(?=\\0x03)', // \z
            '|',
            '(?=',
            '\\n{2,}',
            '(?=\\S)',
            '(?!', // Negative lookahead for another term
            '[ ]{0,3}',
            '(?:\\S.*\\n)+?', // defined term
            '\\n?',
            '[ ]{0,3}:[ ]+', // colon starting definition
            ')',
            '(?!', // Negative lookahead for another definition
            '[ ]{0,3}:[ ]+', // colon starting definition
            ')',
            ')',
            ')',
            ')',
            ')'
        ].join(''),
        'gm'
    );

    //var self = this;
    //text = addAnchors(text);

    text = text.replace(wholeList, function(match, pre, list) {
        var result = trim(processDefListItems(list));
        result = "<dl>\n" + result + "\n</dl>";
        //return pre + self.hashExtraBlock(result) + "\n\n";
        return pre + result + "\n\n";
    });

    //return removeAnchors(text);
    return text;
};

function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

function rtrim(str) {
    return str.replace(/\s+$/g, '');
}


/**
 * Process the contents of a single definition list, splitting it
 * into individual term and definition list items.
 *
 * @method  processDefListItems
 * @private
 * @param   {type}               listStr  description
 *
 * @return  {type}                        description
 */
function processDefListItems (listStr) {

    var dt = new RegExp(
        ['(\\x02\\n?|\\n\\n+)', // leading line
            '(', // definition terms = $1
            '[ ]{0,3}', // leading whitespace
            '(?![:][ ]|[ ])', // negative lookahead for a definition
            //   mark (colon) or more whitespace
            '(?:\\S.*\\n)+?', // actual term (not whitespace)
            ')',
            '(?=\\n?[ ]{0,3}:[ ])' // lookahead for following line feed
        ].join(''), //   with a definition mark
        'gm'
    );

    var dd = new RegExp(
        ['\\n(\\n+)?', // leading line = $1
            '(', // marker space = $2
            '[ ]{0,3}', // whitespace before colon
            '[:][ ]+', // definition mark (colon)
            ')',
            '([\\s\\S]+?)', // definition text = $3
            '(?=\\n*', // stop at next definition mark,
            '(?:', // next term or end of text
            '\\n[ ]{0,3}[:][ ]|',
            '<dt>|\\x03', // \z
            ')',
            ')'
        ].join(''),
        'gm'
    );

    //listStr = addAnchors(listStr);
    // trim trailing blank lines:
    listStr = listStr.replace(/\n{2,}(?=\\x03)/, "\n");

    // Process definition terms.
    listStr = listStr.replace(dt, function(match, pre, termsStr) {
        var terms = trim(termsStr).split("\n");
        var text = '';
        for (var i = 0; i < terms.length; i++) {
            var term = terms[i];
            // process spans inside dt
            //term = convertSpans(trim(term), self);
            term = trim(term);
            text += "\n<dt>" + term + "</dt>";
        }
        return text + "\n";
    });

    // Process actual definitions.
    listStr = listStr.replace(dd, function(match, leadingLine, markerSpace, def) {
        if (leadingLine || def.match(/\n{2,}/)) {
            // replace marker with the appropriate whitespace indentation
            def = Array(markerSpace.length + 1).join(' ') + def;
            // process markdown inside definition
            // TODO?: currently doesn't apply extensions
            def = outdent(def) + "\n\n";
            //def = "\n" + convertAll(def, self) + "\n";
            def = "\n" + def + "\n";
        } else {
            // convert span-level markdown inside definition
            def = rtrim(def);
            //def = convertSpans(outdent(def), self);
            def = outdent(def);
        }

        return "\n<dd>" + def + "</dd>\n";
    });

    //return removeAnchors(listStr);
    return listStr;
};

// Remove one level of indentation from text. Indent is 4 spaces.
function outdent(text) {
    return text.replace(new RegExp('^(\\t|[ ]{1,4})', 'gm'), '');
}

var def_list = {
    type: 'lang',
    filter: definitionLists
};

showdown.extension('def_list', def_list);

module.exports = run;

// //=== simple markdown parser
// function simpleMarkdown(mdText) {

//     // first, handle syntax for code-block
//     mdText = mdText.replace(/\r\n/gm, '\n')
//     mdText = mdText.replace(/\n~~~ *(.*?)\n([\s\S]*?)\n~~~/gm, '<pre><code>$2</code></pre>' );
//     mdText = mdText.replace(/\n``` *(.*?)\n([\s\S]*?)\n```/gm, '<pre><code>$2</code></pre>' );
  
//     // split by "pre>", skip for code-block and process normal text
//     var mdHTML = ''
//     var mdCode = mdText.split( 'pre>')
  
//     for (var i=0; i<mdCode.length; i++) {
//       if ( mdCode[i].substr(-2) == '</' ) {
//         mdHTML += '<pre>' + mdCode[i] + 'pre>'
//       } else {
//         mdHTML += mdCode[i].replace(/(.*)<$/, '$1')
//           .replace(/^##### (.*?)\s*#*$/gm, '<h5>$1</h5>')
//           .replace(/^#### (.*?)\s*#*$/gm, '<h4>$1</h4>')
//           .replace(/^### (.*?)\s*#*$/gm, '<h3>$1</h3>')
//           .replace(/^## (.*?)\s*#*$/gm, '<h2>$1</h2>')
//           .replace(/^# (.*?)\s*#*$/gm, '<h1>$1</h1>')    
//           .replace(/^-{3,}|^\_{3,}|^\*{3,}/gm, '<hr/>')    
//           .replace(/``(.*?)``/gm, '<code>$1</code>' )
//           .replace(/`(.*?)`/gm, '<code>$1</code>' )
//           .replace(/^\>> (.*$)/gm, '<blockquote><blockquote>$1</blockquote></blockquote>')
//           .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
//           .replace(/<\/blockquote\>\n<blockquote\>/g, '\n<br>' )
//           .replace(/<\/blockquote\>\n<br\><blockquote\>/g, '\n<br>' )
//           .replace(/!\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<img alt="$1" src="$2" $3 />')
//           .replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" />')
//           .replace(/\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<a href="$2" title="$3">$1</a>')
//           .replace(/<http(.*?)\>/gm, '<a href="http$1">http$1</a>')
//           .replace(/\[(.*?)\]\(\)/gm, '<a href="$1">$1</a>')
//           .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
//           .replace(/^[\*|+|-][ |.](.*)/gm, '<ul><li>$1</li></ul>' ).replace(/<\/ul\>\n<ul\>/g, '\n' )
//           .replace(/^\d[ |.](.*)/gm, '<ol><li>$1</li></ol>' ).replace(/<\/ol\>\n<ol\>/g, '\n' )
//           .replace(/\*\*\*(.*)\*\*\*/gm, '<b><em>$1</em></b>')
//           .replace(/\*\*(.*)\*\*/gm, '<b>$1</b>')
//           .replace(/\*([\w \d]*)\*/gm, '<em>$1</em>')
//           .replace(/___(.*)___/gm, '<b><em>$1</em></b>')
//           .replace(/__(.*)__/gm, '<u>$1</u>')
//           .replace(/_([\w \d]*)_/gm, '<em>$1</em>')
//           .replace(/~~(.*)~~/gm, '<del>$1</del>')
//           .replace(/\^\^(.*)\^\^/gm, '<ins>$1</ins>')
//           .replace(/ +\n/g, '\n<br/>')
//           .replace(/\n\s*\n/g, '\n<p>\n')
//           .replace(/^ {4,}(.*)/gm, '<pre><code>$1</code></pre>' )
//           .replace(/^\t(.*)/gm, '<pre><code>$1</code></pre>' )
//           .replace(/<\/code\><\/pre\>\n<pre\><code\>/g, '\n' )
//           .replace(/\\([`_\\\*\+\-\.\(\)\[\]\{\}])/gm, '$1' )
//       }  
//     }
  
//     return mdHTML.trim()
//   }



//module.exports = simpleMarkdown;