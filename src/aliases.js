/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Accepts the tag spellings people (and tools trained on other documentation systems)
 * actually write, and maps them onto Documon's vocabulary.
 *
 * ### Why
 *
 * Documon derives structure exclusively from tags, which means an unrecognised tag isn't
 * a cosmetic problem -- it's a missing page. A block written as
 *
 * 		&#64;function area
 * 		&#64;arg {number} r - Radius.
 *
 * has no kind tag as far as Documon is concerned, so the whole entity silently disappears.
 * Since `&#64;function` and `&#64;arg` are exact JSDoc synonyms for `&#64;method` and
 * `&#64;param`, refusing them buys nothing and costs a page.
 *
 * Aliasing does not weaken the "structure comes only from comments" rule: an alias is
 * still an explicit tag, just spelled differently.
 *
 * ### What is deliberately NOT aliased
 *
 * Tags whose meaning differs, even slightly, are left alone so they surface in `--check`
 * rather than producing quietly wrong documentation:
 *
 * - `&#64;fires` / `&#64;emits` -- documents which events a method *emits*. That is not
 *   the same as `&#64;event`, which declares an event entity.
 * - `&#64;memberof` -- re-parents an entity; Documon scopes by `&#64;package` instead.
 * - `&#64;typedef`, `&#64;callback`, `&#64;enum`, `&#64;inheritdoc` -- no equivalent concept.
 *
 * @module  aliases
 * @package documon
 */

/**
 * @property {object} TAGS - Exact synonyms. The key is what was written, the value is the
 * Documon tag it becomes.
 */
var TAGS = {

	// Callables
	  "function"    : "method"
	, "func"        : "method"

	// Parameters
	, "arg"         : "param"
	, "argument"    : "param"
	, "parameter"   : "param"

	// Data members
	, "prop"        : "property"
	, "member"      : "property"
	, "var"         : "property"

	// Inheritance
	, "augments"    : "extends"
	, "implements"  : "impliments"   // Documon's canonical spelling carries the typo

	// Returns
	, "yields"      : "return"
	, "yield"       : "return"

	// Misc
	, "constructs"  : "constructor"
	, "defaultvalue": "default"
};

/**
 * @property {array} DESCRIPTION_TAGS - Tags whose content is really just the description.
 * Documon takes the description from the free text above the tags, so these are folded
 * into it rather than dropped.
 */
var DESCRIPTION_TAGS = ["desc", "description", "summary", "classdesc", "fileoverview", "file", "overview"];

/**
 * @property {object} META_TAGS - Tags with genuine meaning and no Documon equivalent.
 * Rather than discarding them, they are collected and rendered in the page's meta
 * section. The value is the label shown to the reader.
 */
var META_TAGS = {
	  "deprecated" : "Deprecated"
	, "throws"     : "Throws"
	, "exception"  : "Throws"
	, "since"      : "Since"
	, "author"     : "Author"
	, "license"    : "License"
	, "copyright"  : "Copyright"
	, "todo"       : "To do"
};

/**
 * @property {array} ACCESS_VALUES - Legal values of an `@access` tag, each of which maps
 * onto a Documon visibility flag of the same name.
 */
var ACCESS_VALUES = ["private", "protected", "public"];

/**
 * Resolves a written tag name to its Documon equivalent.
 *
 * @method  resolve
 * @param   {string}  flag - The tag as written, without the leading "@".
 * @return  {string}       - The Documon tag name, or the input unchanged.
 * @example
 *
 * 		aliases.resolve("function");  // "method"
 * 		aliases.resolve("method");    // "method"
 */
function resolve(flag){

	if( ! flag ){
		return flag;
	}

	var key = String(flag).toLowerCase();

	return TAGS[key] || flag;
}

/**
 * Whether a tag is an alias of something else (used to report normalizations).
 *
 * @method  isAlias
 * @param   {string}   flag - The tag as written.
 * @return  {boolean}       - True when `resolve()` would change it.
 */
function isAlias(flag){
	return !!(flag && TAGS[ String(flag).toLowerCase() ]);
}

/**
 * Whether a tag's content should be folded into the description.
 *
 * @method  isDescription
 * @param   {string}   flag - The tag as written.
 * @return  {boolean}
 */
function isDescription(flag){
	return DESCRIPTION_TAGS.indexOf( String(flag || "").toLowerCase() ) > -1;
}

/**
 * The display label for a metadata tag, or null when it isn't one.
 *
 * @method  metaLabel
 * @param   {string}  flag - The tag as written.
 * @return  {string}       - Label, or null.
 */
function metaLabel(flag){
	return META_TAGS[ String(flag || "").toLowerCase() ] || null;
}

/**
 * Rewrites JSDoc's inline link syntax as the markdown Documon already understands.
 *
 * Handles `{@link target}`, `{@link target|label}`, `{@link target label}`, and the
 * `linkcode` / `linkplain` / `tutorial` variants.
 *
 * @method  inlineLinks
 * @param   {string}  text - Text possibly containing inline links.
 * @return  {string}       - Text with markdown links.
 * @example
 *
 * 		aliases.inlineLinks("See {@link geo.Circle}.");
 * 		// "See [geo.Circle](geo.Circle)."
 */
function inlineLinks(text){

	if( ! text || String(text).indexOf("{@") === -1 ){
		return text;
	}

	return String(text).replace(
		/\{@(?:link|linkcode|linkplain|tutorial)\s+([^}\s|]+)(?:\s*[|\s]\s*([^}]+))?\}/g,
		function(all, target, label){
			return "[" + ((label || "").trim() || target) + "](" + target + ")";
		}
	);
}

module.exports = {
	  resolve          : resolve
	, isAlias          : isAlias
	, isDescription    : isDescription
	, metaLabel        : metaLabel
	, inlineLinks      : inlineLinks
	, TAGS             : TAGS
	, DESCRIPTION_TAGS : DESCRIPTION_TAGS
	, META_TAGS        : META_TAGS
	, ACCESS_VALUES    : ACCESS_VALUES
};
