/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Emits machine-readable companions alongside the generated HTML:
 *
 * - `llms.txt`      -- the [llms.txt convention](https://llmstxt.org): a short, linkable
 *                      index of the documentation, meant to be read by a language model
 *                      rather than rendered in a browser.
 * - `llms-full.txt` -- every page's prose concatenated into one plain-text file, so a
 *                      model can ingest the whole manual in a single fetch.
 * - `model.json`    -- the structured documentation model (packages, classes, members,
 *                      params, types), so other tools can consume Documon output as data
 *                      instead of scraping HTML.
 *
 * All three are written to the output folder. Disable with `emitLlms:false` /
 * `emitModel:false`.
 *
 * @module  llms
 * @package documon
 */

var fs = require('fs');
var utils = require('./utils');

/**
 * Strips HTML tags and collapses whitespace, leaving readable plain text.
 *
 * @method     deHtml
 * @private
 * @param      {string}  html - Source HTML.
 * @return     {string}       - Plain text.
 */
function deHtml(html){

	if( ! html ){
		return "";
	}

	return String(html)
		.replace(/<script[\s\S]*?<\/script>/gi, "")
		.replace(/<style[\s\S]*?<\/style>/gi, "")
		.replace(/<\/(p|div|li|h[1-6]|tr|pre)>/gi, "\n")
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<[^>]+>/g, "")
		// The comment-escape entities are real characters in the page, not markup. Flag
		// default values never pass through markdown, so this is the only place they get
		// decoded on the way to llms.txt -- without it, docBegin="&#47;**" shipped as "**".
		.replace(/&#0*47;/g, "/")
		.replace(/&#0*64;/g, "@")
		// Any remaining numeric entity is dropped here, before "&amp;" is decoded below.
		// The other order swallowed a deliberately literal "&amp;#47;", because decoding
		// it first produced a "&#47;" that this rule then deleted.
		.replace(/&#x?[0-9a-f]+;/gi, "")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/[ \t]+/g, " ")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}

/**
 * Joins a base URL and a page filename.
 *
 * @method     joinUrl
 * @private
 * @param      {string}  base - Base URL, may be empty.
 * @param      {string}  file - Page filename.
 * @return     {string}       - A URL or bare filename.
 */
function joinUrl(base, file){

	if( ! base ){
		return file;
	}

	return base.replace(/\/+$/, "") + "/" + file;
}

/**
 * Reduces a built page into the flat record used by `model.json`.
 *
 * @method     modelPage
 * @private
 * @param      {object}  page - A page produced by `organizer.buildPages()`.
 * @return     {object}       - A serializable record.
 */
/**
 * Normalizes a metadata entry (@deprecated, @throws, @since ...) for the model.
 *
 * @method     metaEntry
 * @private
 * @param      {object}  entry - A collected metadata tag.
 * @return     {object}        - `{ tag, label, text }`.
 */
// Comment text reaches the model raw -- it never passes through markdown, which is where
// the encoded "*/" and "@tag" escapes are normally decoded. Without this, a default value
// written as "&#47;**" shipped to llms.txt, model.json and the pages' JSON-LD verbatim.
function modelText(str){
	return utils.decodeCommentEscapes(String(str || "")).trim();
}

function metaEntry(entry){
	return {
		tag   : entry.flag,
		label : entry.label,
		text  : modelText(entry.text)
	};
}

/**
 * Reduces one parameter -- and its sub-properties -- to the record used by `model.json`.
 *
 * Documon documents the shape of an object argument with a dotted name, and
 * `parseFlag.js` files those under the parent as `children`. This used to flatten a
 * parameter to name/type/description only, so `@param {string} opts.timeout` was parsed,
 * rendered into the HTML by `methodArgs.jst`, and then dropped on the way to
 * `model.json`, `llms-full.txt` and the pages' JSON-LD -- exactly the readers that cannot
 * go and look at the HTML instead.
 *
 * `optional` and `defaultVal` were missing for the same reason. `write()` already had a
 * branch that printed "(optional)" and could never fire.
 *
 * @method     modelParam
 * @private
 * @param      {object}  prm - A tagged parameter.
 * @return     {object}      - `{ name, type, description, optional, default, children }`.
 */
function modelParam(prm){
	return {
		name        : prm.name || null,
		type        : prm.type || null,
		description : modelText(prm.text),
		optional    : prm.optional ? true : false,
		"default"   : typeof prm.defaultVal === "undefined" ? null : prm.defaultVal,
		children    : (prm.children || []).map(modelParam)
	};
}

function modelPage(page){

	var ctx = page.ctx || {};

	var record = {
		id          : ctx.id || page.id,
		name        : ctx.klass || ctx.name || page.id,
		kind        : ctx.entity || "package",
		package     : ctx.package || null,
		description : modelText(ctx.text),
		file        : ctx.file || null,
		line        : typeof ctx.line === "number" ? ctx.line : null,
		meta        : (ctx.meta || []).map(metaEntry),
		members     : []
	};

	var buckets = [
		  { key : "properties", kind : "property" }
		, { key : "methods",    kind : "method"   }
		, { key : "events",     kind : "event"    }
	];

	for(var b=0; b<buckets.length; b++){

		var bucket = ctx[ buckets[b].key ];

		if( ! bucket || ! bucket.length ){
			continue;
		}

		for(var i=0; i<bucket.length; i++){

			var m = bucket[i];

			record.members.push({
				id          : m.id || null,
				kind        : m.entity || buckets[b].kind,
				name        : m.name,
				type        : m.type || null,
				access      : m.access || "public",
				line        : typeof m.line === "number" ? m.line : null,
				// organizer.cloneInherited() marks a cross-filled member with "inherits",
				// and that is the name menuBuilder and every template read. This used to
				// look for "inheritedFrom"/"inherited", neither of which is ever set, so
				// model.json reported inherited:null for every member.
				inherited   : m.inherits || null,
				description : modelText(m.text),
				meta        : (m.meta || []).map(metaEntry),
				params      : (m.params || []).map(modelParam),
				returns     : m.returns ? {
					type        : m.returns.type || null,
					description : modelText(m.returns.text)
				} : null
			});
		}
	}

	return record;
}

/**
 * Flattens the menu tree into a list of linkable pages.
 *
 * @method     flattenMenu
 * @private
 * @param      {array}  nodes - Menu nodes.
 * @param      {array}  out   - Accumulator.
 * @return     {array}        - Flat page records.
 */
function flattenMenu(nodes, out){

	if( ! nodes ){
		return out;
	}

	for(var i=0; i<nodes.length; i++){
		var node = nodes[i];
		if(node && node.id){
			out.push({
				id    : node.id,
				// Menu labels keep the source filename for some "more" pages, which reads
				// as noise in a link list.
				title : String(node.label || node.name || node.id).replace(/\.md$/i, ""),
				url   : node.url || (node.id + ".html"),
				kind  : node.kind || "page"
			});
		}
		if(node && node.children){
			flattenMenu(node.children, out);
		}
	}

	return out;
}

/**
 * Collects the markdown of the "more" folder, in menu order, for `llms-full.txt`.
 *
 * The prose pages are usually the part a reader most needs -- guides, concepts, tag
 * references -- and they are already plain text, so they go in verbatim.
 *
 * @method     readMore
 * @private
 * @param      {string}  folder - The "more" folder.
 * @return     {array}          - `{ name, body }` records, in filename order.
 */
function readMore(folder){

	var out = [];

	if( ! folder ){
		return out;
	}

	function walk(dir){

		var entries;

		try {
			entries = fs.readdirSync(dir).sort();
		} catch(e) {
			return;
		}

		for(var i=0; i<entries.length; i++){

			var name = entries[i];

			if(name.charAt(0) === "."){
				continue;
			}

			var full = dir + "/" + name;
			var stat;

			try {
				stat = fs.statSync(full);
			} catch(e) {
				continue;
			}

			if(stat.isDirectory()){
				walk(full);
			} else if( /\.md$/i.test(name) ){
				try {
					out.push({
						name : name.replace(/\.md$/i, "").replace(/^[\d]+[.\-_ ]*/, ""),
						body : fs.readFileSync(full, 'utf8')
					});
				} catch(e) { /* skip unreadable */ }
			}
		}
	}

	walk(folder.replace(/\/+$/, ""));

	return out;
}

/**
 * Appends a parameter list to `llms-full.txt`, indenting sub-properties under their parent.
 *
 * @method     pushParams
 * @private
 * @param      {array}   out    - The accumulating lines.
 * @param      {array}   params - Parameter records from `modelParam()`.
 * @param      {string}  indent - Leading whitespace for this level.
 */
function pushParams(out, params, indent){

	for(var i=0; i<params.length; i++){

		var prm = params[i];

		out.push(indent + "- param " + prm.name
			+ (prm.type ? " {" + prm.type + "}" : "")
			+ (prm.optional ? " (optional)" : "")
			+ (prm["default"] ? " (default: " + prm["default"] + ")" : "")
			+ (prm.description ? " - " + prm.description : ""));

		if(prm.children && prm.children.length){
			pushParams(out, prm.children, indent + "  ");
		}
	}
}

/**
 * Writes `llms.txt`, `llms-full.txt` and `model.json`.
 *
 * @method  write
 * @param   {object}  conf   - The resolved `mainConf`.
 * @param   {array}   pages  - Pages from `organizer.buildPages()`.
 * @param   {object}  log    - The logger.
 * @param   {array}   [menu] - The final menu, so hand-written "more" pages are indexed too.
 * @return  {object}         - `{ llms, llmsFull, model }` -- paths written, or nulls.
 */
function write(conf, pages, log, menu){

	var out     = conf.outputFolder;
	var base    = conf.baseUrl || "";
	var name    = conf.projectName || "Documentation";
	var version = conf.projectVersion ? (" v" + conf.projectVersion) : "";
	var desc    = conf.projectDescription || "";
	var quiet   = conf.quiet;

	var written = { llms : null, llmsFull : null, model : null };

	var records = [];
	for(var i=0; i<pages.length; i++){
		records.push( modelPage(pages[i]) );
	}

	// ------------------------------
	// llms.txt
	// ------------------------------
	if(conf.emitLlms !== false){

		var lines = [];
		lines.push("# " + name + version);
		lines.push("");
		if(desc){
			lines.push("> " + desc);
			lines.push("");
		}
		lines.push("Generated by Documon (https://www.documon.net). The API reference below is");
		lines.push("derived entirely from source-code comment tags.");
		lines.push("");
		// Hand-written pages first: guides and concepts are what a reader needs before
		// the API listing.
		var known = {};
		for(var k=0; k<records.length; k++){
			known[ records[k].id ] = true;
		}

		var extras = flattenMenu(menu, []).filter(function(node){
			return ! known[node.id];
		});

		if(extras.length){
			lines.push("## Guides");
			lines.push("");
			for(var x=0; x<extras.length; x++){
				lines.push("- [" + extras[x].title + "](" + joinUrl(base, extras[x].url) + ")");
			}
			lines.push("");
		}

		lines.push("## Reference");
		lines.push("");

		for(var r=0; r<records.length; r++){
			var rec = records[r];
			var summary = rec.description.split("\n")[0];
			if(summary.length > 160){
				summary = summary.substring(0, 157) + "...";
			}
			lines.push("- [" + rec.name + "](" + joinUrl(base, rec.id + ".html") + ")"
				+ (summary ? ": " + summary : ""));
		}

		lines.push("");
		lines.push("## Optional");
		lines.push("");
		lines.push("- [Full text](" + joinUrl(base, "llms-full.txt") + "): every page as plain text.");
		lines.push("- [Structured model](" + joinUrl(base, "model.json") + "): the documentation as JSON.");
		lines.push("");

		var llmsPath = out + "llms.txt";
		fs.writeFileSync(llmsPath, lines.join("\n"), 'utf8');
		written.llms = llmsPath;
		log("    " + llmsPath, null, quiet);

		// ------------------------------
		// llms-full.txt
		// ------------------------------
		var full = [];
		full.push("# " + name + version);
		if(desc){
			full.push("");
			full.push(desc);
		}

		var prose = readMore(conf.moreFolder);
		for(var pr=0; pr<prose.length; pr++){
			full.push("");
			full.push("---");
			full.push("");
			// The "more" markdown is read straight off disk rather than rendered, so the
			// escapes still have to be decoded here the way markdown.js does for pages.
			full.push(modelText(prose[pr].body));
		}

		if(prose.length){
			full.push("");
			full.push("---");
			full.push("");
			full.push("# API Reference");
		}

		for(var f=0; f<records.length; f++){
			var page = records[f];
			full.push("");
			full.push("---");
			full.push("");
			full.push("## " + page.name + " (" + page.kind + ")");
			if(page.description){
				full.push("");
				full.push(page.description);
			}
			for(var m=0; m<page.members.length; m++){
				var mem = page.members[m];
				full.push("");
				full.push("### " + mem.name + " (" + mem.kind + ")"
					+ (mem.type ? " -> " + mem.type : "")
					+ (mem.access !== "public" ? " [" + mem.access + "]" : ""));
				for(var mt=0; mt<mem.meta.length; mt++){
					full.push("");
					full.push(mem.meta[mt].label.toUpperCase() + ": " + mem.meta[mt].text);
				}
				if(mem.description){
					full.push("");
					full.push(mem.description);
				}
				if(mem.params.length){
					full.push("");
					pushParams(full, mem.params, "");
				}
				if(mem.returns){
					full.push("- returns"
						+ (mem.returns.type ? " {" + mem.returns.type + "}" : "")
						+ (mem.returns.description ? " - " + mem.returns.description : ""));
				}
			}
		}

		var fullPath = out + "llms-full.txt";
		fs.writeFileSync(fullPath, full.join("\n"), 'utf8');
		written.llmsFull = fullPath;
		log("    " + fullPath, null, quiet);
	}

	// ------------------------------
	// model.json
	// ------------------------------
	if(conf.emitModel !== false){

		var model = {
			generator   : "documon",
			project     : name,
			version     : conf.projectVersion || null,
			description : desc || null,
			baseUrl     : base || null,
			pages       : records
		};

		var modelPath = out + "model.json";
		fs.writeFileSync(modelPath, JSON.stringify(model, null, "\t"), 'utf8');
		written.model = modelPath;
		log("    " + modelPath, null, quiet);
	}

	return written;
}

module.exports = {
	write     : write,
	deHtml    : deHtml,
	modelPage : modelPage
};
