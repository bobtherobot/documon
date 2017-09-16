/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * A front-end for the markdown processor that provides a simple interface so markdown processors can be swapped out fairly easily.
 *
 * @module  markdown
 * @package  documon
 * @private
 */

//*
// --------------------
// Pagedown -- (no dependancies -- but may be a little wonky in unknown parts, BUT, has def lists and tables.)
// --------------------
var markdownC = require("./markdown-core").Converter;
var converter = new markdownC();
var markdownExtra = require("./markdown-extra");

//markdownExtra.init(converter);
// All available extensions (defaults to ["all"]):
// ["tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes", "smartypants", "strikethrough", "newlines"]
// We're removing smartypants to prevent smartquotes.
markdownExtra.init(converter, {
	highlighter: "prettify",
	extensions : ["tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes", "strikethrough", "newlines"]
} );


module.exports = converter.makeHtml;

//*/




/*
// --------------------
// MarkdownIt -- lots of overhead
// --------------------

//var hljs = require('highlight.js'); // https://highlightjs.org/

var highlighter = "prettify"; // Google Code Prettify
//var highlighter = "hjs"; // Highlight JS


// node.js, "classic" way:
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt({
	html:         true,        	// Enable HTML tags in source
	xhtmlOut:     false,        // Use '/' to close single tags (<br />).
	                          	// This is only for full CommonMark compatibility.
	breaks:       true,        	// Convert '\n' in paragraphs into <br>
	//langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
	                          	// useful for external highlighters.
	linkify:      false,        // Autoconvert URL-like text to links

	// Enable some language-neutral replacement + quotes beautification
	typographer:  false,

	// Double + single quotes replacement pairs, when typographer enabled,
	// and smartquotes on. Could be either a String or an Array.
	//
	// For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	// and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	//quotes: '“”‘’',

	// Highlighter function. Should return escaped HTML,
	// or '' if the source string is not changed and should be escaped externaly.
	// If result starts with <pre... internal wrapper is skipped.
	//highlight: function (str, lang) { return ''; }

	highlight: function (str, lang) {

		var preclass = highlighter == "prettify" ? ' class="prettyprint"' : '';
		var codeclass = '';
		if (lang) {
		    // use html5 language- class names. supported by both prettify and highlight.js
		    codeclass = ' class="language-' + lang + '"';
		}

		return '<pre class="prettyprint"><code' + codeclass + '>' + md.utils.escapeHtml(str) + '</code></pre>';

	}

}).use(require('markdown-it-deflist'));




function run(str){
	return md.render(str);
}


module.exports = run;

//*/






/*
function encodeCode(code) {
    code = code.replace(/&/g, "&amp;");
    code = code.replace(/</g, "&lt;");
    code = code.replace(/>/g, "&gt;");
    // These were escaped by PageDown before postNormalization 
    //code = code.replace(/~D/g, "$$");
    //code = code.replace(/~T/g, "~");
    return code;
}
*/

