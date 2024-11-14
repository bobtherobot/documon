/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

var utils = require("./utils");
var markdown = require("./markdown");
var searchPrep = require("./searchPrep");


/**
 *
 * Processes the following flags
 *
- property
- package, namespace
- 
- property
- method
- event
- class
- module
- 
- private
- protected
- static
- public
- readonly
- 
- overrides
- impliments
- extends
- inherits
- 
- constructor
- example
- param
- return, returns
- 
- type
- order
- optional
- header
- defaultVal, default
- see
- requires

 * 
 * Fills the flags object
 *
 * "Source Item", are manufactured from the [parseFlag](parseFlag) class, and generally provided to many of the methods as the "item" argument, and they contain the following fields:
 *
 *		Source Item {
 *			source 		// Entire first line inlcuding the @flag (only first line)
 *		 	after		// Everything after the @flag
 *			name		// One word following {type}. Or first word after the @flag definition when no {type}.
 *			children	// name.kid - Array of children
 *			parent		// if am a child, this is my parent.
 *			flag		// @flag token with @ stripped
 *			defaultVal	// name=val
 *			afterType	// first line after
 *			text		// 
 *		}
 *
 * @class  tag
 * @package  documon
 * 
 */

module.exports = (function() {

	// This is a cheap way to circumvent a constructor (having to do "new Tag(foo)" )
	// Since the model is created for each tag() call, and since all of the functions 
	// in this module are self-contained (they don't reference any varibles in
	// this scope -- asside from this "model" var), we can get away with this 
	// cheesy hackish approach.
	var model;


    function tag(VsourceList, conf, Vbasename) {

    	// model
    	model = {
    		basename 	: Vbasename,
    		srcFolder	: conf.sourceRootFolder,
			file 		: conf.file,
			filename 	: conf.filename,
			prettyLangs	: [], // where we store example lang defs for prettyprint
			//baseid 		: null,
			package 	: null,
			klass 		: null,
			search		: {}
    	};

    	var re = new RegExp("^" + model.srcFolder);
    	model.file = conf.file.replace(re, "");

		model.klassItemSource = getItemsByFlag(sameAsClassList, VsourceList, true);
		if(model.klassItemSource){
			var val = getFlagValue(model.klassItemSource, sameAsClassList, "name");
			if(val){
				model.klass = val;
			}
		}

		findPackage(VsourceList);
		
		var methodItemsSource = getItemsByFlag("method", VsourceList);
		var propertyItemsSource = getItemsByFlag("property", VsourceList);
		var eventItemsSource = getItemsByFlag("event", VsourceList);

		var output;
		if(model.klass){
			output = processOne(model.klassItemSource);
		}


		if( ! output ){
			output = {};
			fillMain(output);
		}

		// Set top-level object to just use base id.
		//output.id = baseid;

		if(methodItemsSource){
			output.methods = processItems(methodItemsSource);
		}

		if(propertyItemsSource){
			output.properties = processItems(propertyItemsSource);
		}

		if(eventItemsSource){
			output.events = processItems(eventItemsSource);
		}

		output.prettyLangs = model.prettyLangs;

		utils.sortOn(output.methods, ["name", "order"]);
		utils.sortOn(output.events, ["name", "order"]);
		utils.sortOn(output.properties, ["name", "order"]);
		output.projectName = conf.projectName;
		output.projectVersion = conf.projectVersion;

		output.search = model.search;
		
		//output.name = model.klass;
		return output;


    }

    var sameAsClassList = ["class", "module"];
    var sameAsPackageList = ["package", "namespace"];

    function pinch(val){
    	if(val && typeof val == 'string'){
			val = val.trim();
		}
		return val;
    }

    function findPackage(VsourceList){

    	// Maybe a stand alone comment somewhere in any one of the page's comments.


		// Maybe a part of the class definition?
		// e.g. @class Foo
		//		@package bar

		if( model.klass ){
			var val = pinch( getFlagValue(model.klassItemSource, sameAsPackageList, "after") );
			
			if(val){
				model.package = val;
			}
		}

		if( ! model.package ){
			var nsObj = getItemsByFlag(sameAsPackageList, VsourceList, true);

	    	if( nsObj ){
	    		var val = pinch( getFlagValue(nsObj, sameAsPackageList, "after") );
	    		if(val){
					model.package = val;
				}
	    	}
		}

		if( ! model.package){
			model.package = "root";
		}

		/*
		var Abaseid = [];
		if( model.package){
			model.package = model.package.toLowerCase();
			Abaseid.push(model.package);
		}

		if(model.klass){
			Abaseid.push(model.klass);
		}

		if(Abaseid.length < 1){
			Abaseid.push("root");
		}

		model.baseid = Abaseid.join(".");
		*/

    }

    function getFlagValue(obj, flagList, flagPropStr){
    	if(obj){
    		var flags = obj.flags;
	    	if( ! flags ){
	    		return null;
	    	} else {

	    		// convert single string to array.
	    		if( ! Array.isArray(flagList) ) {
	    			flagList = [flagList];
	    		}
	    		for(var f=0; f<flags.length; f++){
					var flagItem = flags[f];
					if(flagList.indexOf(flagItem.flag) > -1){
						return flagItem[flagPropStr];
					}
				}
	    	}
    	}

	    return null;
    	
    }

    function getItemsByFlag(flagStr, list, justOne){
    	var results = [];

    	// convert single string to array.
    	if( ! Array.isArray(flagStr) ){
    		flagStr = [flagStr];
    	}

    	for(var i=0; i<list.length; i++){
    		var item = list[i];
    		var flags = item.flags;
    		if( flags ){
    			for(var f=0; f<flags.length; f++){
    				var flagItem = flags[f];
    				//if( flagItem.flag == flagStr){
    				if( flagStr.indexOf( flagItem.flag ) > -1 ){
    					if(justOne){
    						return item;
    					} else {
    						results.push( item );
    					}
    					break;
    				}
    			}
    		}
    	}

    	if(justOne || results.length < 1){
    		return null;
    	}

    	return results;
    }


    /**
     *		
     * @method  processOne
     * @param  {Source Object} 		item 	- the source item as parsed from comments
     * @return {object} 			- An object containing flag data
     */
   	function processOne(item){
   		
   		if( !item ){
   			return null;
   		}
		var flags = item.flags;

		var obj = {};
		if(item.end){
			obj.line = item.end + 1; // assume comment is directly above actual code.
		}

		if(flags){

			

			for(var f=0; f<flags.length; f++){
				var flagItem = flags[f];
				fillFlag(flagItem, obj);
			}

			if(item.text){

				obj.shortText = getShortText( item.text );
				obj.shortHtml = getShortText( item.text, true );
				obj.text = item.text;
				obj.html = doMarkdown( item.text );
			}

			
		}


		fillMain(obj);

		// back-fill the source item
		item.id = obj.id;
		item.source.id = obj.id;


		// Compile text to searsch fields.
		var searchText = searchPrep(obj.text);
		var flagSearchText = searchPrep(obj.flagSearchText);
		if(searchText || flagSearchText){
			model.search[obj.id] = obj.name + " : " + searchText + flagSearchText;
		}

		return obj;

   	}



   	/**
   	 * Process flags for an entire list of items
   	 *
   	 * @private
   	 * @method processItems
   	 * @param  {array} Vlist
   	 */
    function processItems(Vlist){
    	var list = Vlist;
    	var results = [];
    	for(var i=0; i<list.length; i++){
    		var one = processOne(list[i]);
    		if(one){
    			results.push(one);
    		}
    	}

    	return results;
    }



 	var truths = ["private", "protected", "static", "public", "readonly"];

 	// Same list in template extendish.jst
 	var extendish = ["overrides", "impliments", "extends", "inherits"];
 	

 	


    function patchType(item){
    	// Properties should usually always have a type.
		// 
		// Sometimes we use brackets when defining properties, and sometimes we don't.
		// e.g. @type {foo}  	<-- this will appear in the proper "type" field.
		// 		@type foo		<-- this will appear in the "name" field;
		// 		@type foo | bar <-- this will cause "foo" to be in the "name" field and "bar" to be in the text field
		var type = item.type;
		if( ! type ){

			// the "name" field will contain the single type definition
			type = item.name;

			// If there is stuff in the text field, 
			if( item.text){

				var clean = item.text.replace(/[^A-Za-z0-9-_]/g, " ").trim();
				var Aclean = clean.split(" ");

				// Add the "name" into the front of the list
				//if(type){
				//	Aclean.unshift(type);
				//}

				// Clean up each entry
				var Atypes = [];
				for(var i=0; i<Aclean.length; i++){
					var t = Aclean[i].trim();
					// Only add if not empty
					if(t){
						Atypes.push(t);
					}
				}

				type = Atypes.join(" | ");
			}
		}


		return type;
    }

    var basicKinds = ["property", "method", "event", "class", "module"]; // api


    /*
    
	fillFlag receives a "Source Item"

	Source Item {
		source 		// Entire first line inlcuding the @flag (only first line)
		after		// Everything after the @flag
		name		// One word following {type}. Or first word after the @flag definition when no {type}.
		children	// name.kid - Array of children
		parent		// if am a child, this is my parent.
		flag		// @flag token with @ stripped
		defaultVal	// name=val
		afterType	// first line after {type}
		text		// 
	}

     */

     /**
      * [fillFlag description]
      *
      * @method  fillFlag
      *
      * @param   {type}    item  description
      * @param   {type}    obj   description
      *
      * @return  {type}          description
      */
    function fillFlag(item, obj){

    	var flag = item.flag;

    	if(basicKinds.indexOf(flag) > -1){

    		if(item.name){

				obj.name = item.name;
	    		
	    		// Allow properties to be written as parameters, rather than the long form.
	    		// ------------
	    		// Long form:
	    		// ------------
	    		// Description
	    		// @property foo
	    		// @type string
	    		// 
	    		// ------------
	    		// Param form
	    		// ------------
	    		// @property {string} foo - Description

	    		// We can be more leient and do this for methods too
	    		// @method foo - This does xyz.

	    		//if(flag == "property"){ 
	    			fillParam(item, obj);
	    		//}

	    		obj.entity = flag;

	    	}

    		

    	// ------------------------------------------------
		// package, namespace
    	} else if( sameAsPackageList.indexOf(flag) > -1 ){

			obj.package = item.after;
		
		// ------------------------------------------------
		// constructor
		} else if(flag == "constructor"){

			obj.konstructor = true;
		

		// ------------------------------------------------
		// example
		} else if(flag == "example"){

			if( ! obj.example ){
				obj.example = [];
			}

			// convert existing single object to an array
			if( ! Array.isArray(obj.example) ){
				obj.example = [obj.example];
			}

			obj.example.push( processExample(item) )


		// ------------------------------------------------
		// param
		} else if(flag == "param"){
			if( ! obj.params ){
				obj.params = [];
			}

			// convert existing single object to an array
			if( ! Array.isArray(obj.params) ){
				obj.params = [obj.params];
			}

			var pobj = {};
			fillParam(item, pobj);

			obj.params.push(pobj);


		// ------------------------------------------------
		// Truths (private, public, etc)
		} else if(truths.indexOf(flag) > -1){
			obj[flag] = item.value;

			obj.access = flag.trim();
		

		// ------------------------------------------------
		// Extendish (extends, impliments, inherits, etc)
		} else if(extendish.indexOf(flag) > -1){
			obj[flag] = (item.name || item.type).trim();
		

		// ------------------------------------------------
		// Return(s) justify. We all think differently.
		} else if(flag == "return" || flag == "returns"){

			// @returns shouldn't have a name, and parse.js is kinda dumb, so we've gotta fix it up. 
			var fixText = attachNameTextAfter(item) || "";
			var shortText = getShortText(fixText, true);
			obj.returns = {
				type : item.type,
				text : fixText,
				html : doMarkdown(fixText),
				shortText : shortText,
				shortHtml : doMarkdown(shortText)
			};

		} else if(flag == "type"){
			obj.type = patchType(item);

		} else if(flag == "order" && typeof item.name != "undefined"){

			var num = parseFloat(item.name);
			if(num == item.name){
				obj.order = num;
			}

		} else if(flag == "optional"){

			obj.optional = true;

		} else if(flag == "header"){

			obj.name = item.afterType;
			obj.order = -1;

		} else if(flag == "defaultVal" || flag == "default" || flag == "defaultValue"){

			obj.defaultVal = item.defaultVal;

		} else if(flag == "see"){

			if( ! obj.see ){
				obj.see = [];
			}
			obj.see.push(  doMarkdown( item.after.trim() )  );

		} else if(flag == "requires"){
			
			if( ! obj.requires ){
				obj.requires = [];
			}

			// convert existing single object to an array
			if( ! Array.isArray(obj.requires) ){
				obj.requires = [obj.requires];
			}
			
			obj.requires.push(  item.after.trim() );
		
		} else {

			// text s/b the only place where markdown exists in a flag.
			var text;
			if(item.text){
				item.shortText = getShortText(item.text);
				item.shortHtml = doMarkdown( getShortText(item.text, true) );
				item.text = item.text.trim();
				item.html = doMarkdown( item.text )
			}

			if(typeof obj[flag] == 'undefined'){

				obj[flag] = item;

			} else {

				// Convert to an array if there are multiple flags of this kind.
				if( ! Array.isArray(obj[flag]) ){
					var original = obj[flag];
					obj[flag] = [original];
				}

				obj[flag].push(item);
				
			}
		}

		if(item.text){
			if( ! obj.flagSearchText ){
				obj.flagSearchText = "";
			}
			obj.flagSearchText += " " + item.text;
		}



    }



    // For flags that can span multiple lines and may or may not have a name and/or typte.
    // Typically the @return and @example flags.
    //
    // For example, uf the author wrote something like:
    //
	//			@returns this is the descrition
	//
	// 		The the word "this" will be extracted as the "name"
	// 		So we've got to glue everything back together.

    function attachNameTextAfter(item){
    	var str;
		if(item.text){
			str = item.text;
			if(item.name){
				str = item.name + " " + str;
			}
		}
		return str;
    }



    function doMarkdown(text, opts){
    	if(text){
			var opts = opts || {
				codePreAtts : 'class="prettyprint"'
			};
    		//return converter.makeHtml( text, opts );
    		return markdown( text, opts );
    	} else {
    		return "";
    	}
    }

    function hasWords(str){
    	if( ! str){
    		return false;
    	}
    	return str.match(/[A-Za-z0-9]/);
    }

    function getShortText(str, doMark){
    	if( ! str ){
    		return str;
    	}
    	//if(doMark){
    	//	return doMarkdown(str);
    	//}
    	var Astr = str.trim().split("\n");
    	
    	for(var i=0; i<Astr.length; i++){
    		var line = Astr[i];
    		if( hasWords(line) ){
    			if(doMark){
    				return doMarkdown(line);
    			} else {
    				return line;
    			}
    			
    		}
    	}
    	
    	return "";
    }

    function fillParam(item, obj){
    	obj.name = item.name;
    	obj.shortText = getShortText( item.text );
    	obj.shortHtml = getShortText( item.text, true );
    	obj.text = item.text;
    	obj.html = doMarkdown( item.text );
    	obj.type = item.type;

    	if(item.optional){
    		obj.optional = true;
    	}

    	if(item.defaultVal){
    		obj.defaultVal = item.defaultVal;
    	}

    	var kids = item.children;
    	if(kids){
    		obj.children = [];
    		var myKids = obj.children;

    		for(var i=0; i<kids.length; i++){
    			var kid = kids[i];
    			var kobj = {};
    			fillParam(kid, kobj);
    			myKids.push(kobj);
    		}
    	}
    }



    function fillMain(obj){

    	obj.file = model.file;
    	obj.filename = model.filename;

    	if( ! model.package){
    		model.package = "root";
    	}

		if(model.klass){
			obj.klass = model.klass;
		}
		//if(model.package){
			obj.package = model.package;
		//}

		var Aid = [];
		//if(model.package){
			Aid.push( model.package );
		//}

		if(model.klass){
			Aid.push( model.klass );
		}

		var baseid = Aid.join(".");
		/*
		if( ! baseid ){
			baseid = "root";
			Aid = [baseid];
		}
		*/

    	obj.docfile = baseid + ".html"
		

		var useName;
		if(model.klass){
			if(model.klass != obj.name){
				useName = obj.name;
			}
		} else {
			useName = obj.name;
		}

		if(useName){
			Aid.push(useName);
		}

		obj.id = Aid.join(".");

    }

    var prettyprintExtTypes = [ "apollo","basic","clj","css","dart","erlang","go","hs","lasso","lisp","llvm","logtalk","lua","matlab","ml","mumps","n","pascal","proto","r","rd","rust","scala","sql","swift","tcl","tex","vb","vhdl","wiki","xq","yaml"];


    function processExample(item){

		var str = attachNameTextAfter(item);

		/*
		if(str){
    		if( str.charAt(0) == "\n" ){
    			return str.substring(1);
	    		//return doMarkdown( str.substring(1) );
	    	}
    	}
    	*/

		
	

		var codeType = item.type;
		if(codeType){
			opts.codeWrapInnerFront = '<code class="language-' + codeType + '">';
			opts.codeWrapInnerBack = '</code>';
			if(prettyprintExtTypes.indexOf(codeType) > -1){
				model.prettyLangs.push( item.type );
			}
		}

		return {
			text : str,
			html : doMarkdown( str ),
			type : codeType
		};


    }



    return tag;

})();
