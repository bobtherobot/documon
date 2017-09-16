/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Clean text so it has:
 * - only alpha numeric characters
 * - strips newlines and tabs.
 * - single word results ignored
 *
 * Used by [tag.js](root.documon.tag) and [more.js](root.documon.more)
 *
 *
 * @class searchPrep
 * @package documon
 * @private
 * @param  {string} text
 * @returns {string} - The clean text
 */
	

module.exports = function (text){
	if(text){

		text = text.replace(/[^A-Za-z0-9]/g, " ") // strip non alpha-numeric characters
										.replace(/\b[A-Za-z0-9]{1,3}\b/g, "") // strip {1,3} one-three character words.
										.replace(/\s\s+/g, ' ');  // remove spacial gaps (big     gaps   between     words).
		text = text.trim();
		
		// don't allow single-word stuff
		if(text && text.indexOf(" ") > -1){
			return text;
		}
	}
	return "";
}