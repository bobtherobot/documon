[
	{
		"start": 0,
		"end": 15,
		"data": "@license\nCopyright (C) 2013 Google Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n     http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License."
	},
	{
		"start": 17,
		"end": 61,
		"data": "@fileoverview\n<div style=\"white-space: pre\">\nLooks at query parameters to decide which language handlers and style-sheets\nto load.\n\nQuery Parameter     Format           Effect                        Default\n+------------------+---------------+------------------------------+--------+\n| autorun=         | true | false  | If true then prettyPrint()   | \"true\" |\n|                  |               | is called on page load.      |        |\n+------------------+---------------+------------------------------+--------+\n| lang=            | language name | Loads the language handler   | Can    |\n|                  |               | named \"lang-<NAME>.js\".      | appear |\n|                  |               | See available handlers at    | many   |\n|                  |               | https://github.com/google/   | times. |\n|                  |               | code-prettify/tree/master/   |        |\n|                  |               | src                          |        |\n+------------------+---------------+------------------------------+--------+\n| skin=            | skin name     | Loads the skin stylesheet    | none.  |\n|                  |               | named \"<NAME>.css\".          |        |\n|                  |               | https://cdn.rawgit.com/      |        |\n|                  |               | google/code-prettify/master/ |        |\n|                  |               | styles/index.html            |        |\n+------------------+---------------+------------------------------+--------+\n| callback=        | JS identifier | When \"prettyPrint\" finishes  | none   |\n|                  |               | window.exports[js_ident] is  |        |\n|                  |               | called.                      |        |\n|                  |               | The callback must be under   |        |\n|                  |               | exports to reduce the risk   |        |\n|                  |               | of XSS via query parameter   |        |\n|                  |               | injection.                   |        |\n+------------------+---------------+------------------------------+--------+\n\nExmaples\n.../run_prettify.js?lang=css&skin=sunburst\n  1. Loads the CSS language handler which can be used to prettify CSS\n     stylesheets, HTML <style> element bodies and style=\"...\" attributes\n     values.\n  2. Loads the sunburst.css stylesheet instead of the default prettify.css\n     stylesheet.\n     A gallery of stylesheets is available at\n     https://cdn.rawgit.com/google/code-prettify/master/styles/index.html\n  3. Since autorun=false is not specified, calls prettyPrint() on page load.\n</div>"
	},
	{
		"start": 63,
		"end": 67,
		"data": "@typedef {!Array.<number|string>}\nAlternating indices and the decorations that should be inserted there.\nThe indices are monotonically increasing."
	},
	{
		"start": 70,
		"end": 94,
		"data": "@typedef {!{\n  sourceNode: !Element,\n  pre: !(number|boolean),\n  langExtension: ?string,\n  numberLines: ?(number|boolean),\n  sourceCode: ?string,\n  spans: ?(Array.<number|Node>),\n  basePos: ?number,\n  decorations: ?DecorationsT\n}}\n<dl>\n <dt>sourceNode<dd>the element containing the source\n <dt>sourceCode<dd>source as plain text\n <dt>pre<dd>truthy if white-space in text nodes\n    should be considered significant.\n <dt>spans<dd> alternating span start indices into source\n    and the text node or element (e.g. {@code <BR>}) corresponding to that\n    span.\n <dt>decorations<dd>an array of style classes preceded\n    by the position at which they start in job.sourceCode in order\n <dt>basePos<dd>integer position of this.sourceCode in the larger chunk of\n    source.\n</dl>"
	},
	{
		"start": 97,
		"end": 108,
		"data": "@typedef {!{\n  sourceCode: string,\n  spans: !(Array.<number|Node>)\n}}\n<dl>\n <dt>sourceCode<dd>source as plain text\n <dt>spans<dd> alternating span start indices into source\n    and the text node or element (e.g. {@code <BR>}) corresponding to that\n    span.\n</dl>"
	},
	{
		"start": 111,
		"end": 294,
		"data": "var IN_GLOBAL_SCOPE = false;\n\n(function () {\n  \"use strict\";\n\n  var win = window;\n  var doc = document;\n  var root = doc.documentElement;\n  var head = doc['head'] || doc.getElementsByTagName(\"head\")[0] || root;\n\n  // From http://javascript.nwbox.com/ContentLoaded/contentloaded.js\n  // Author: Diego Perini (diego.perini at gmail.com)\n  // Summary: cross-browser wrapper for DOMContentLoaded\n  // Updated: 20101020\n  // License: MIT\n  // Version: 1.2\n  function contentLoaded(callback) {\n    var addEventListener = doc['addEventListener'];\n    var done = false, top = true,\n        add = addEventListener ? 'addEventListener' : 'attachEvent',\n        rem = addEventListener ? 'removeEventListener' : 'detachEvent',\n        pre = addEventListener ? '' : 'on',\n\n        init = function(e) {\n          if (e.type == 'readystatechange' && doc.readyState != 'complete') {\n            return;\n          }\n          (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);\n          if (!done && (done = true)) { callback.call(win, e.type || e); }\n        },\n\n        poll = function() {\n          try {\n            root.doScroll('left');\n          } catch(e) {\n            win.setTimeout(poll, 50);\n            return;\n          }\n          init('poll');\n        };\n\n    if (doc.readyState == 'complete') {\n      callback.call(win, 'lazy');\n    } else {\n      if (doc.createEventObject && root.doScroll) {\n        try { top = !win.frameElement; } catch(e) { }\n        if (top) { poll(); }\n      }\n      doc[add](pre + 'DOMContentLoaded', init, false);\n      doc[add](pre + 'readystatechange', init, false);\n      win[add](pre + 'load', init, false);\n    }\n  }\n\n  // Given a list of URLs to stylesheets, loads the first that loads without\n  // triggering an error event.\n  function loadStylesheetsFallingBack(stylesheets) {\n    var n = stylesheets.length;\n    function load(i) {\n      if (i === n) { return; }\n      var link = doc.createElement('link');\n      link.rel = 'stylesheet';\n      link.type = 'text/css';\n      if (i + 1 < n) {\n        // http://pieisgood.org/test/script-link-events/ indicates that many\n        // versions of IE do not support onerror on <link>s, though\n        // http://msdn.microsoft.com/en-us/library/ie/ms535848(v=vs.85).aspx\n        // indicates that recent IEs do support error.\n        link.error = link.onerror = function () { load(i + 1); };\n      }\n      link.href = stylesheets[i];\n      head.appendChild(link);\n    }\n    load(0);\n  }\n\n  var scriptQuery = '';\n  // Look for the <script> node that loads this script to get its parameters.\n  // This starts looking at the end instead of just considering the last\n  // because deferred and async scripts run out of order.\n  // If the script is loaded twice, then this will run in reverse order.\n  var scripts = doc.getElementsByTagName('script');\n  for (var i = scripts.length; --i >= 0;) {\n    var script = scripts[i];\n    var match = script.src.match(\n        /^[^?#]*\\/run_prettify\\.js(\\?[^#]*)?(?:#.*)?$/);\n    if (match) {\n      scriptQuery = match[1] || '';\n      // Remove the script from the DOM so that multiple runs at least run\n      // multiple times even if parameter sets are interpreted in reverse\n      // order.\n      script.parentNode.removeChild(script);\n      break;\n    }\n  }\n\n  // Pull parameters into local variables.\n  var autorun = true;\n  var langs = [];\n  var skins = [];\n  var callbacks = [];\n  scriptQuery.replace(\n      /[?&]([^&=]+)=([^&]+)/g,\n      function (_, name, value) {\n        value = decodeURIComponent(value);\n        name = decodeURIComponent(name);\n        if (name == 'autorun')   { autorun = !/^[0fn]/i.test(value); } else\n        if (name == 'lang')      { langs.push(value);                } else\n        if (name == 'skin')      { skins.push(value);                } else\n        if (name == 'callback')  { callbacks.push(value);            }\n      });\n\n  // Use https to avoid mixed content warnings in client pages and to\n  // prevent a MITM from rewrite prettify mid-flight.\n  // This only works if this script is loaded via https : something\n  // over which we exercise no control.\n  var LOADER_BASE_URL =\n     'https://cdn.rawgit.com/google/code-prettify/master/loader';\n\n  for (var i = 0, n = langs.length; i < n; ++i) (function (lang) {\n    var script = doc.createElement(\"script\");\n\n    // Excerpted from jQuery.ajaxTransport(\"script\") to fire events when\n    // a script is finished loading.\n    // Attach handlers for each script\n    script.onload = script.onerror = script.onreadystatechange = function () {\n      if (script && (\n            !script.readyState || /loaded|complete/.test(script.readyState))) {\n        // Handle memory leak in IE\n        script.onerror = script.onload = script.onreadystatechange = null;\n\n        --pendingLanguages;\n        checkPendingLanguages();\n\n        // Remove the script\n        if (script.parentNode) {\n          script.parentNode.removeChild(script);\n        }\n\n        script = null;\n      }\n    };\n\n    script.type = 'text/javascript';\n    script.src = LOADER_BASE_URL\n      + '/lang-' + encodeURIComponent(langs[i]) + '.js';\n\n    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending\n    head.insertBefore(script, head.firstChild);\n  })(langs[i]);\n\n  var pendingLanguages = langs.length;\n  function checkPendingLanguages() {\n    if (!pendingLanguages) {\n      win.setTimeout(onLangsLoaded, 0);\n    }\n  }\n\n  var skinUrls = [];\n  for (var i = 0, n = skins.length; i < n; ++i) {\n    skinUrls.push(LOADER_BASE_URL\n        + '/skins/' + encodeURIComponent(skins[i]) + '.css');\n  }\n  skinUrls.push(LOADER_BASE_URL + '/prettify.css');\n  loadStylesheetsFallingBack(skinUrls);\n\n  var prettyPrint = (function () {\n    /**\n@license\nCopyright (C) 2006 Google Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n     http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License."
	},
	{
		"start": 296,
		"end": 333,
		"data": "@fileoverview\nsome functions for browser-side pretty printing of code contained in html.\n\n<p>\nFor a fairly comprehensive set of languages see the\n<a href=\"https://github.com/google/code-prettify#for-which-languages-does-it-work\">README</a>\nfile that came with this source.  At a minimum, the lexer should work on a\nnumber of languages including C and friends, Java, Python, Bash, SQL, HTML,\nXML, CSS, Javascript, and Makefiles.  It works passably on Ruby, PHP and Awk\nand a subset of Perl, but, because of commenting conventions, doesn't work on\nSmalltalk, Lisp-like, or CAML-like languages without an explicit lang class.\n<p>\nUsage: <ol>\n<li> include this source file in an html page via\n  {@code <script type=\"text/javascript\" src=\"/path/to/prettify.js\"></script>}\n<li> define style rules.  See the example page for examples.\n<li> mark the {@code <pre>} and {@code <code>} tags in your source with\n   {@code class=prettyprint.}\n   You can also use the (html deprecated) {@code <xmp>} tag, but the pretty\n   printer needs to do more substantial DOM manipulations to support that, so\n   some css styles may not be preserved.\n</ol>\nThat's it.  I wanted to keep the API as simple as possible, so there's no\nneed to specify which language the code is in, but if you wish, you can add\nanother class to the {@code <pre>} or {@code <code>} element to specify the\nlanguage, as in {@code <pre class=\"prettyprint lang-java\">}.  Any class that\nstarts with \"lang-\" followed by a file extension, specifies the file type.\nSee the \"lang-*.js\" files in this directory for code that implements\nper-language file handlers.\n<p>\nChange log:<br>\ncbeust, 2006/08/22\n<blockquote>\n  Java annotations (start with \"@\") are now captured as literals (\"lit\")\n</blockquote>\n@requires console"
	},
	{
		"start": 341,
		"end": 363,
		"data": "{@type !{\n  'createSimpleLexer': function (Array, Array): (function (JobT)),\n  'registerLangHandler': function (function (JobT), Array.<string>),\n  'PR_ATTRIB_NAME': string,\n  'PR_ATTRIB_NAME': string,\n  'PR_ATTRIB_VALUE': string,\n  'PR_COMMENT': string,\n  'PR_DECLARATION': string,\n  'PR_KEYWORD': string,\n  'PR_LITERAL': string,\n  'PR_NOCODE': string,\n  'PR_PLAIN': string,\n  'PR_PUNCTUATION': string,\n  'PR_SOURCE': string,\n  'PR_STRING': string,\n  'PR_TAG': string,\n  'PR_TYPE': string,\n  'prettyPrintOne': function (string, string, number|boolean),\n  'prettyPrint': function (?function, ?(HTMLElement|HTMLDocument))\n}}\n@const"
	},
	{
		"start": 366,
		"end": 370,
		"data": "Split {@code prettyPrint} into multiple timeouts so as not to interfere with\nUI events.\nIf set to {@code false}, {@code prettyPrint()} is synchronous."
	},
	{
		"start": 373,
		"end": 381,
		"data": "Pretty print a chunk of code.\n@param {string} sourceCodeHtml The HTML to pretty print.\n@param {string} opt_langExtension The language name to use.\n    Typically, a filename extension like 'cpp' or 'java'.\n@param {number|boolean} opt_numberLines True to number lines,\n    or the 1-indexed number of the first line in sourceCodeHtml.\n@return {string} code as html, but prettier"
	},
	{
		"start": 383,
		"end": 391,
		"data": "Find all the {@code <pre>} and {@code <code>} tags in the DOM with\n{@code class=prettyprint} and prettify them.\n\n@param {Function} opt_whenDone called when prettifying is done.\n@param {HTMLElement|HTMLDocument} opt_root an element or document\n  containing all the elements to pretty print.\n  Defaults to {@code document.body}."
	},
	{
		"start": 447,
		"end": 450,
		"data": "token style for a string literal\n@const"
	},
	{
		"start": 452,
		"end": 455,
		"data": "token style for a keyword\n@const"
	},
	{
		"start": 457,
		"end": 460,
		"data": "token style for a comment\n@const"
	},
	{
		"start": 462,
		"end": 465,
		"data": "token style for a type\n@const"
	},
	{
		"start": 467,
		"end": 470,
		"data": "token style for a literal value.  e.g. 1, null, true.\n@const"
	},
	{
		"start": 472,
		"end": 475,
		"data": "token style for a punctuation string.\n@const"
	},
	{
		"start": 477,
		"end": 480,
		"data": "token style for plain text.\n@const"
	},
	{
		"start": 483,
		"end": 486,
		"data": "token style for an sgml tag.\n@const"
	},
	{
		"start": 488,
		"end": 491,
		"data": "token style for a markup declaration such as a DOCTYPE.\n@const"
	},
	{
		"start": 493,
		"end": 496,
		"data": "token style for embedded source.\n@const"
	},
	{
		"start": 498,
		"end": 501,
		"data": "token style for an sgml attribute name.\n@const"
	},
	{
		"start": 503,
		"end": 506,
		"data": "token style for an sgml attribute value.\n@const"
	},
	{
		"start": 509,
		"end": 513,
		"data": "A class that indicates a section of markup that is not code, e.g. to allow\nembedding of line numbers within code listings.\n@const"
	},
	{
		"start": 518,
		"end": 536,
		"data": "A set of tokens that can precede a regular expression literal in\njavascript\nhttp://web.archive.org/web/20070717142515/http://www.mozilla.org/js/language/js20/rationale/syntax.html\nhas the full list, but I've removed ones that might be problematic when\nseen in languages that don't support regular expression literals.\n\n<p>Specifically, I've removed any keywords that can't precede a regexp\nliteral in a syntactically legal javascript program, and I've removed the\n\"in\" keyword since it's not a keyword in many languages, and might be used\nas a count of inches.\n\n<p>The link above does not accurately describe EcmaScript rules since\nit fails to distinguish between (a=++/b/i) and (a++/b/i) but it works\nvery well in practice.\n\n@private\n@const"
	},
	{
		"start": 545,
		"end": 552,
		"data": "Given a group of {@link RegExp}s, returns a {@code RegExp} that globally\nmatches the union of the sets of strings matched by the input RegExp.\nSince it matches globally, if the input strings have a start-of-input\nanchor (/^.../), it is ignored for the purposes of unioning.\n@param {Array.<RegExp>} regexs non multiline, non-global regexs.\n@return {RegExp} a global regex."
	},
	{
		"start": 786,
		"end": 830,
		"data": "Split markup into a string of source code and an array mapping ranges in\nthat string to the text nodes in which they appear.\n\n<p>\nThe HTML DOM structure:</p>\n<pre>\n(Element   \"p\"\n  (Element \"b\"\n    (Text  \"print \"))       ; #1\n  (Text    \"'Hello '\")      ; #2\n  (Element \"br\")            ; #3\n  (Text    \"  + 'World';\")) ; #4\n</pre>\n<p>\ncorresponds to the HTML\n{@code <p><b>print </b>'Hello '<br>  + 'World';</p>}.</p>\n\n<p>\nIt will produce the output:</p>\n<pre>\n{\n  sourceCode: \"print 'Hello '\\n  + 'World';\",\n  //                     1          2\n  //           012345678901234 5678901234567\n  spans: [0, #1, 6, #2, 14, #3, 15, #4]\n}\n</pre>\n<p>\nwhere #1 is a reference to the {@code \"print \"} text node above, and so\non for the other text nodes.\n</p>\n\n<p>\nThe {@code} spans array is an array of pairs.  Even elements are the start\nindices of substrings, and odd elements are the text nodes (or BR elements)\nthat contain the text for those substrings.\nSubstrings continue until the next index or the end of the source.\n</p>\n\n@param {Node} node an HTML DOM subtree containing source-code.\n@param {boolean|number} isPreformatted truthy if white-space in\n   text nodes should be considered significant.\n@return {SourceSpansT} source code and the nodes in which they occur."
	},
	{
		"start": 877,
		"end": 886,
		"data": "Apply the given language handler to sourceCode and add the resulting\ndecorations to out.\n@param {!Element} sourceNode\n@param {number} basePos the index of sourceCode within the chunk of source\n   whose decorations are already present on out.\n@param {string} sourceCode\n@param {function(JobT)} langHandler\n@param {DecorationsT} out"
	},
	{
		"start": 890,
		"end": 917,
		"data": "var job = {\n  sourceNode: sourceNode,\n  pre: 1,\n  langExtension: null,\n  numberLines: null,\n  sourceCode: sourceCode,\n  spans: null,\n  basePos: basePos,\n  decorations: null\n};\nlangHandler(job);\nout.push.apply(out, job.decorations);\n\n\nr notWs = /\\S/;\n\n\n Given an element, if it contains only one child element and any text nodes\n it contains contain only space characters, return the sole child element.\n Otherwise returns undefined.\n <p>\n This is meant to return the CODE element in {@code <pre><code ...>} when\n there is a single child element that contains all the non-space textual\n content, but not to return anything where there are multiple child elements\n as in {@code <pre><code>...</code><code>...</code></pre>} or when there\n is textual content."
	},
	{
		"start": 931,
		"end": 976,
		"data": "The lexing function interprets the patterns to find token boundaries and\nreturns a decoration list of the form\n[index_0, style_0, index_1, style_1, ..., index_n, style_n]\nwhere index_n is an index into the sourceCode, and style_n is a style\nconstant like PR_PLAIN.  index_n-1 <= index_n, and style_n-1 applies to\nall characters in sourceCode[index_n-1:index_n].\n\nThe stylePatterns is a list whose elements have the form\n[style : string, pattern : RegExp, DEPRECATED, shortcut : string].\n\nStyle is a style constant like PR_PLAIN, or can be a string of the\nform 'lang-FOO', where FOO is a language extension describing the\nlanguage of the portion of the token in $1 after pattern executes.\nE.g., if style is 'lang-lisp', and group 1 contains the text\n'(hello (world))', then that portion of the token will be passed to the\nregistered lisp handler for formatting.\nThe text before and after group 1 will be restyled using this decorator\nso decorators should take care that this doesn't result in infinite\nrecursion.  For example, the HTML lexer rule for SCRIPT elements looks\nsomething like ['lang-js', /<[s]cript>(.+?)<\\/script>/].  This may match\n'<script>foo()<\\/script>', which would cause the current decorator to\nbe called with '<script>' which would not match the same rule since\ngroup 1 must not be empty, so it would be instead styled as PR_TAG by\nthe generic tag rule.  The handler registered for the 'js' extension would\nthen be called with 'foo()', and finally, the current decorator would\nbe called with '<\\/script>' which would not match the original rule and\nso the generic tag rule would identify it as a tag.\n\nPattern must only match prefixes, and if it matches a prefix, then that\nmatch is considered a token with the same style.\n\nContext is applied to the last non-whitespace, non-comment token\nrecognized.\n\nShortcut is an optional string of characters, any of which, if the first\ncharacter, gurantee that this pattern and only this pattern matches.\n\n@param {Array} shortcutStylePatterns patterns that always start with\n  a known character.  Must have a shortcut string.\n@param {Array} fallthroughStylePatterns patterns that will be tried in\n  order if the shortcut ones fail.  May have shortcuts.\n\n@return {function (JobT)} a function that takes an undecorated job and\n  attaches a list of decorations."
	},
	{
		"start": 1005,
		"end": 1011,
		"data": "Lexes job.sourceCode and attaches an output array job.decorations of\nstyle classes preceded by the position at which they start in\njob.sourceCode in order.\n\n@type{function (JobT)}"
	},
	{
		"start": 1015,
		"end": 1019,
		"data": "are style markers (e.g., PR_COMMENT) that run from that position until\nthe end.\n@type {DecorationsT}"
	},
	{
		"start": 1105,
		"end": 1120,
		"data": "\nThis code treats \", ', and ` as string delimiters, and \\ as a string\nescape.  It does not recognize perl's qq() style strings.\nIt has no special handling for double delimiter escapes as in basic, or\nthe tripled delimiters used in python, but should work on those regardless\nalthough in those cases a single string literal may be broken up into\nmultiple adjacent string literals.\n\nIt recognizes C, C++, and shell style comments.\n\n@param {Object} options a set of optional parameters.\n@return {function (JobT)} a function that examines the source code\n    in the input job and builds a decoration list which it attaches to\n    the job."
	},
	{
		"start": 1173,
		"end": 1175,
		"data": "@const"
	},
	{
		"start": 1179,
		"end": 1181,
		"data": "@const"
	},
	{
		"start": 1183,
		"end": 1185,
		"data": "@const"
	},
	{
		"start": 1296,
		"end": 1310,
		"data": "Given a DOM subtree, wraps it in a list, and puts each line into its own\nlist item.\n\n@param {Node} node modified in place.  Its content is pulled into an\n    HTMLOListElement, and each line is moved into a separate list item.\n    This requires cloning elements, so the input might not have unique\n    IDs after numbering.\n@param {number|null|boolean} startLineNum\n    If truthy, coerced to an integer which is the 1-indexed line number\n    of the first line of code.  The number of the first line will be\n    attached to the list.\n@param {boolean} isPreformatted true iff white-space in text nodes should\n    be treated as significant."
	},
	{
		"start": 1434,
		"end": 1439,
		"data": "Breaks {@code job.sourceCode} around style boundaries in\n{@code job.decorations} and modifies {@code job.sourceNode} in place.\n@param {JobT} job\n@private"
	},
	{
		"start": 1500,
		"end": 1507,
		"data": "ength;\n\necorations[decorationIndex + 2] || sourceLength;\n\n.min(spanEnd, decEnd);\n"
	},
	{
		"start": 1551,
		"end": 1558,
		"data": "var langHandlerRegistry = {};\n/** Register a language handler for the given file extensions.\n@param {function (JobT)} handler a function from source code to a list\n     of decorations.  Takes a single argument job which describes the\n     state of the computation and attaches the decorations to it.\n@param {Array.<string>} fileExtensions"
	},
	{
		"start": 1679,
		"end": 1686,
		"data": "function applyDecorator(job) {\n  var opt_langExtension = job.langExtension;\n\n  try {\n    // Extract tags, and convert the source code to plain text.\n    var sourceAndSpans = extractSourceSpans(job.sourceNode, job.pre);"
	},
	{
		"start": 1705,
		"end": 1712,
		"data": "Pretty print a chunk of code.\n@param sourceCodeHtml {string} The HTML to pretty print.\n@param opt_langExtension {string} The language name to use.\n    Typically, a filename extension like 'cpp' or 'java'.\n@param opt_numberLines {number|boolean} True to number lines,\n    or the 1-indexed number of the first line in sourceCodeHtml."
	},
	{
		"start": 1714,
		"end": 1716,
		"data": "var nl = opt_numberLines || false;"
	},
	{
		"start": 1718,
		"end": 1728,
		"data": "var container = document.createElement('div');\n// This could cause images to load and onload listeners to fire.\n// E.g. <img onerror=\"alert(1337)\" src=\"nosuchimage.png\">.\n// We assume that the inner HTML is from a trusted source.\n// The pre-tag is required for IE8 which strips newlines from innerHTML\n// when it is injected into a <pre> tag.\n// http://stackoverflow.com/questions/451486/pre-tag-loses-line-breaks-when-setting-innerhtml-in-ie\n// http://stackoverflow.com/questions/195363/inserting-a-newline-into-a-pre-tag-ie-javascript\ncontainer.innerHTML = '<pre>' + sourceCodeHtml + '</pre>';"
	},
	{
		"start": 1733,
		"end": 1756,
		"data": "var job = {\n  langExtension: langExtension,\n  numberLines: nl,\n  sourceNode: container,\n  pre: 1,\n  sourceCode: null,\n  basePos: null,\n  spans: null,\n  decorations: null\n};\napplyDecorator(job);\nreturn container.innerHTML;\n\n\n*\nFind all the {@code <pre>} and {@code <code>} tags in the DOM with\n{@code class=prettyprint} and prettify them.\n\n@param {Function} opt_whenDone called when prettifying is done.\n@param {HTMLElement|HTMLDocument} opt_root an element or document\n  containing all the elements to pretty print.\n  Defaults to {@code document.body}."
	},
	{
		"start": 1920,
		"end": 1923,
		"data": "Contains functions for creating and registering new language handlers.\n@type {Object}"
	}
]