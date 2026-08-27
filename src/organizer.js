/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */


/**
Organizes the parsed source-code data into a single object that takes the following form:

	organ = {

		// There will always be a root node with an absolute ID of "root"
		id : "root",
		name : "root",
		file : "root.html",
		docfile : "root.html",

		packages : [

				{ 
					packages : foo

					// Classes included in this package
					classes : [

						{	
							class : "foo"
							methods : [],
							properties : [],
							events : []
						},

						... etc ... 
					],

					// Loose stuff found in this package
					methods : [],
					properties : [],
					events : []
				}
		
		],

		// Independent classes that are not part of any package
		classes : [
			{	
				class : "foo"
				methods : [],
				properties : [],
				events : []
			}
			... etc ... 
		],

		// Loose stuff that's not part of any package or class, assumed to be accessible "this" (e.g. in javascript it would be the "window" scope)
		methods : [],
		properties : [],
		events : [],

	};
 

All source code hangs off of the "root" node and is organized according to its relationship to a package or class.

This organizer is initialized prior to parsing source code, and as each file is parsed, it is added to the organizer. After all the source-code is finished parsing, the organizer wires up and cross references inheritance.

@class organizer
@package documon

 */

var utils = require('./utils');
var fs = require('fs');



/**
 * @property  {Object} mainConf - A reference to the main configuration object. See [documon.documon.mainConf](documon.documon.mainConf).
 */
var mainConf;

/**
 * @property  {Object} organ - The primary object we store all data into.
 */
var organ;

/**
 * @property  {Template} Tpackage - The package template processor (jst file).
 */
var Tpackage;

/**
 * @property  {Template} Tclass - The class template processor (jst file).
 */
var Tclass;

/**
 * @property  {Object} flatClassList - We maintain a "flat list" as a means to cross reference items that are stuffed into the main array.
 */
var flatClassList = {};


/**
 * @property  {Array} sectionNames - The complete list of sections a class or package can contain.
 */
var sectionNames = ["methods", "properties", "events"];


/**
 * Cross-fills every documented class with the members it inherits.
 *
 * Run once, after every file has been added, because a child can be parsed before its
 * parent and the whole tree has to exist before it can be walked.
 *
 * **Only `@extends` is acted on.** `@implements`, `@inherits` and `@overrides` are
 * carried onto the entity and rendered as a meta link by `extendish.jst`, but they pull
 * nothing in -- a class declaring only `@implements` shows the link and an otherwise
 * empty member list. The manual claimed all four cross-filled for years; they do not.
 *
 * @method  processInheritance
 */
function processInheritance(){
	for(var prop in flatClassList){
		var item = flatClassList[prop];
		applyInheritance(item);
		
	}
}

/**
 * Rewrites a cloned member's id strings from the parent's id to the child's, in place.
 *
 * A cross-filled member is a deep copy of the parent's, so every id inside it -- the
 * member id, anchors, links the template already built -- still names the parent. Walks
 * the object recursively and swaps them.
 *
 * @method     swapIds
 * @private
 * @param      {object}  fromObj - The cloned member, modified in place.
 * @param      {string}  fromId  - The parent's id.
 * @param      {string}  toId    - The child's id.
 */
function swapIds(fromObj, fromId, toId){
	for(var prop in fromObj){
		var val = fromObj[prop];
		var type = typeof val;
		if(type == 'string'){
			fromObj[prop] = val.replace(fromId, toId);
		} else if (type == 'object'){
			swapIds(val, fromId, toId);
		} else if ( Array.isArray( val ) ){
			for(var i=0; i<val.length; i++){
				var item = val[i];
				var type = typeof val;
				if(type == 'string'){
					item = item.replace(fromId, toId);
				} else if (type == 'object'){
					swapIds(item, fromId, toId);
				}
			}
		}
	}
	
}

/**
 * Copies one of the parent's members onto the child.
 *
 * The copy is re-idded under the child and marked with `inherits`, which is the flag
 * `menuBuilder`, `flags.jst` and `model.json` all read to show it as inherited and link
 * back to where it came from.
 *
 * @method     cloneInherited
 * @private
 * @param      {object}  parent      - The parent entity.
 * @param      {object}  parentItem  - The member being inherited.
 * @param      {object}  target      - The child entity receiving it.
 * @return     {object}              - The re-idded copy.
 */
function cloneInherited(parent, parentItem, target){

	var IparentClone = utils.clone( parentItem );
	swapIds(IparentClone, parent.id, target.id)
	IparentClone.id = target.id + "." + IparentClone.name;
	IparentClone.inherits = parent.id;

	return IparentClone;

}

/**
 * @property {array} didApplyInheritance - Ids already processed. Module-level, and **not**
 * reset by [init](#init) -- a second run in the same process sees the first run's ids.
 * `t.fresh("organizer")` exists in the test harness for exactly this reason.
 * @private
 */
var didApplyInheritance = [];
var inheritanceProps = ["methods", "properties", "events"];

/**
 * Cross-fills one entity from its `@extends` parent, recursing up the chain first.
 *
 * A bare parent name is qualified with the entity's own package, so `@extends Base`
 * inside `@package demo` resolves to `demo.Base` -- the short form the manual teaches.
 * (`check.js:resolveExtends()` mirrors this; when the two disagreed, source that built
 * perfectly failed `--check`.)
 *
 * A member the child already declares is not replaced. It gets `overrides` set to the
 * parent's id instead, which is where that flag comes from -- authors rarely write
 * `@overrides` themselves.
 *
 * @method     applyInheritance
 * @private
 * @param      {object}  item - The entity to fill, modified in place.
 */
function applyInheritance(item){
	var ext = item.extends;
	didApplyInheritance.push(item.id);

	// User did define @extends
	if(ext){

		// If user defines as "@extends Foo" assume "Foo" is a class in the same package. 
		// Allows user to reference just the base name when in the same package
		if(ext.indexOf(".") < 0){
			ext = item.package + "." + ext;
			item.extends = ext;
		}

		var extObj = flatClassList[ext];
		if(extObj){

			// run down the tree to determine if the extObj is extending something else.
			if( didApplyInheritance.indexOf(extObj.id) < 0 ){
				applyInheritance(extObj);
			}

			for(var i=0; i<sectionNames.length; i++){
				var prop = sectionNames[i];
				var parentSect = extObj[prop];
				var itemSect = item[prop];
				if(parentSect){
					if( ! itemSect ){
						itemSect = [];
						item[prop] = itemSect;
					}
					for(var p=0; p<parentSect.length; p++){
						var Iparent = parentSect[p];

						var exists = false;
						
						for(var ii=0; ii<itemSect.length; ii++){
							var Iitem = itemSect[ii];
							if( Iitem.name === Iparent.name ){
								Iitem.overrides = Iparent.id;
								exists = true;
								break;
							}
						}

						if( ! exists ){
							itemSect.push( cloneInherited(extObj, Iparent, item)  );
						}
						
					}
				}
				

			}

			/*
			for(var i=0; i<sectionNames.length; i++){
				var prop = sectionNames[i];
				var Amine = item[prop];

				if(Amine && Amine.length){
					var Aparent = extObj[prop];

					if(Aparent && Aparent.length){
						for(var m=0; m<Amine.length; m++){
							var myItem = Amine[m];
							var mName = myItem.name;
							for(var p=0; p<Aparent.length; p++){

								if(Aparent[p].name == mName){
									var parentItem = Aparent[p];
									myItem.overrides = parentItem.id;
									//myItem.overrides = `<a href="${extObj.docfile}#${parentItem.id}">${parentItem.id}</a>`
									break;
								}
							}
						}
					}
				}
			}
			*/
		}
	}
}

/**
 * Wraps an entity in the render context a page template receives.
 *
 * The whole of `mainConf` is copied on first, so a template can reach project name,
 * version, baseUrl and the rest; the entity itself lands on `ctx`.
 *
 * @method     prepPage
 * @private
 * @param      {object}  item - A package or class entity.
 * @return     {object}       - `{ ...mainConf, id, name, file, docfile, line, ctx }`.
 */
function prepPage(item){
	var obj = {};
	for(var prop in mainConf){
		obj[prop] = mainConf[prop];
	}


	obj.id = item.id;
	obj.name = item.name;
	obj.file = item.file;
	obj.docfile = item.docfile;
	obj.line = item.line;

	obj.ctx = item;

	return obj;
}

/**
 * Renders a package's own page, then a page for each class it contains.
 *
 * @method     buildPackage
 * @private
 * @param      {object}  item   - The package entity.
 * @param      {array}   output - Accumulator of page records.
 */
function buildPackage (item, output){

	var obj = prepPage(item);
	obj.html = Tpackage(item);

	output.push( obj );

	var classes = item.classes;
	if(classes && classes.length){

		for(var i=0; i<classes.length; i++){
			var class_item = classes[i];

			var cobj = prepPage(class_item);
			var html = Tclass(class_item);

			cobj.html = html

			output.push( cobj );

		}
		
	}
}

/**
 * Renders every page: the root, then each package and its classes.
 *
 * Call after [processInheritance](#processInheritance), or the pages will be written
 * without their inherited members.
 *
 * @method  buildPages
 * @return  {array} - Page records, each `{ id, html, ctx, ... }`, ready to write.
 */
function buildPages(){

	var result = [];

	buildPackage( organ, result);

	var packages = organ.packages;
	for(var prop in packages){
		buildPackage( packages[prop], result);
	}

	return result;

}

/**
 * Initializes the the "organ", which is an object that we'll be inserting all the tagged data into.
 *
 * We'll also be grabbing the templates needed based on the location defined in the params.
 *
 * @method  init
 * @param   {object}  params  - The configuration options sent in by the user during [documon.documon.mainConf](documon.documon.mainConf). We keep a reference here so we know where to put things. Note that documon derives some additional properties onto the object.
 * @param   {string}  params.templateFolder -  The base path to the template folder.
 */
function init(params){

	mainConf = params;

	Tpackage = require(params.templateFolder + "package.jst");
	Tclass = require(params.templateFolder + "class.jst");

	organ = {

		id : "root",
		name : "root",
		file : "root.html",
		docfile : "root.html",

		// same as namespace in javascript
		packages : [

				/* --------- EXAMPLE ----------
				{ 
					packages : foo
					// Independent classes
					classes : [
						{	
							class : "foo"
							methods : [],
							properties : [],
							events : []
						}
					],

					// loose inside the packages
					methods : [],
					properties : [],
					events : []
				}
				*/
		
		],

		// Independent classes
		classes : [
			/* --------- EXAMPLE ----------
			{	
				class : "foo"
				methods : [],
				properties : [],
				events : []
			}
			*/
		],

		// loose inside "this" (or window)
		methods : [],
		properties : [],
		events : [],

	};

}


/**
 * A classic array merge routine.
 *
 * @method  merge
 *
 * @param   {array}  a     - The array that we will add items to if "prop"
 * @param   {array}  b     - The array we will merge into A if one of it's item[prop] doesn't exists in A.
 * @param   {string}  prop  - The property used to validate if items in B need to be merged into A.
 *
 * @return  {array} - A new array containing all unique elements from A and B.
 */
function merge(a, b, prop){
	var reduced = [];
	for(var i=a.length; i--; ){
		var aitem = a[i];
		var aval = aitem[prop];

		var found = false;
		for(var k=0; k<b.length; k++){
			var bitem = b[k];
			if( aval == bitem[prop] ){
				found = true;
				break;
			}
		}

		if( ! found){
			reduced.push(aitem);
		}
	}

	return reduced.concat(b);
}
/*
// ES5 using Array.filter and Array.find
function merge(a, b, prop){
  var reduced = a.filter(function(aitem){


    return ! b.find(function(bitem){
  			var found = aitem.name === bitem.name && aitem.package === bitem.package;
  			if(found){
  				// if b doesn't have text, but a does, put a's text into b.
  				if(aitem.text && !bitem.text){
  					bitem.text = aitem.text;
  				}
  			}
          	return found;
      });
  });
  return reduced.concat(b);
}
*/

// one-liner, but not as much control (and not as clear)
//var merge = (a, b, p) => a.filter( aa => ! b.find ( bb => aa[p] === bb[p]) ).concat(b);



/**
 * Adds a class or package to the class or package object.
 *
 * @method  appendPage
 *
 * @param   {object}    existingObj  - The package or class to add to.
 * @param   {object}    newObj       - The tagged page being added.
 */
function appendPage(existingObj, newObj){

	if(newObj.klass){

		if( ! existingObj.classes ) {
			existingObj.classes = [];
		}
		addToClassList(existingObj.classes, newObj)

		

	} else {
		for(var i=0; i<sectionNames.length; i++){
			var sect = sectionNames[i];

			var newSect = newObj[sect];
			var exSect = existingObj[sect];

			// initialize anyway... because ::add may call addToClassList on a package at any point.
			if( ! exSect ) {
				existingObj[sect] = [];
			}

			// Now add / merge if we must.
			//
			// merge() takes the key to compare on. Calling it without one meant every
			// comparison was `aitem[undefined] == bitem[undefined]`, which is
			// `undefined == undefined` -- true for every pair. Every already-collected
			// member was therefore treated as a duplicate of the incoming batch and
			// dropped, so when two files both contributed members to the same package
			// only the last file's survived, with no error and no warning. Class members
			// were unaffected; this only ever hit members hanging directly off a package.
			if(newSect){
				existingObj[sect] =  ! exSect ? newSect : merge(exSect, newSect, "id");
				//existingObj[sect] = newSect.concat(exSect ? exSect : []);
			}
		}
	}

	

}

/**
 * Adds a new package to the main packages list. Creates a namespace (package) if not exist.
 *
 * @method  addToPackageList
 *
 * @param   {array}           list        - The main package list to add the package to.
 * @param   {object}          taggedPage  - The package data.
 */
function addToPackageList(list, taggedPage){
	var nsFound = false;
	var hasNS = taggedPage.package;

	for(var i=0; i<list.length; i++){
		var item = list[i];

		if(hasNS && item.package === hasNS){
			nsFound = true;

			appendPage(item, taggedPage);
			
		}

	}

	if( ! nsFound ){
	
		var obj = {
			  id : hasNS
			, name : hasNS
			, package : hasNS
			, docfile : hasNS + ".html"
			, classes : []
			, properties : []
			, methods : []
			, events : []
		}
		list.push(obj);
		appendPage(obj, taggedPage);
		
	}
}

/**
 * Adds tagged data to a class array. Ensures this item is only added once, and also places a reference to the item in the flat list for future processing.
 *
 * @method  addToClassList
 *
 * @param   {array}         list        - The class array to add the item to.
 * @param   {object}        taggedPage  - The data to add.
 */
function addToClassList(list, taggedPage){

	var conflict = false;
	for(var i=0; i<list.length; i++){
		var item = list[i];

		// if already exists, over-write the old with the new
		if(item.id == taggedPage.id){
			conflict = true;
			list[i] = taggedPage;
			break;
		}
	}

	if( ! conflict ){
		list.push(taggedPage);
	}

	flatClassList[taggedPage.id] = taggedPage;

}

/**
 * Adds source-code data to the organ. The data needs to be formated from the "tag.js" processor. By reading the data we determine where it is to be added to the main organ.
 *
 * @method  add
 * @param   {object}  VtaggedPage  - Source-code data parsed by the tag.js processor.
 */
function add(VtaggedPage){

	var taggedPage = VtaggedPage; //utils.clone(VtaggedPage);
	var hasPackage = taggedPage.package;
	var hasClass = taggedPage.klass;

	if(hasPackage){

		if(hasPackage == "root"){
			appendPage(organ, taggedPage);
		} else {
			addToPackageList(organ.packages, taggedPage);
		}

	} else if(hasClass){

		addToClassList(organ.classes, taggedPage)

	// shouldn't really ever get here.
	} else {

		appendPage(organ, taggedPage);

	}

}

/**
 * Sorts an entity's classes, methods, properties and events.
 *
 * Each section is sorted by "id" and then by "order", so the alphabetical default holds
 * unless an entry carries an explicit `@order`. (A `@header` block sets order to -1,
 * which is how it reaches the top of its section.)
 *
 * @method  sortObj
 *
 * @param   {object}   obj   - The entity, or an array of entities, to sort.
 */
function sortObj(obj){

	if(obj){

		if(obj.length){
		
			utils.sortOn(obj, "id");

		} else {

			if(obj.classes && obj.classes.length){
				utils.sortOn(obj.classes, "id");
				utils.sortOn(obj.classes, "order");
			}

			if(obj.methods && obj.methods.length){
				utils.sortOn(obj.methods, "id");
				utils.sortOn(obj.methods, "order");
			}

			if(obj.properties && obj.properties.length){
				utils.sortOn(obj.properties, "id");
				utils.sortOn(obj.properties, "order");
			}

			if(obj.events && obj.events.length){

				utils.sortOn(obj.events, "id");
				utils.sortOn(obj.events, "order");
			}
			
		}

	}
	

			
}

/** 
 * Generates a copy of the main organ that is sorted alphabetically, suitable for use wiht [menuBuilder](documon.menuBuilder)
 *
 * @method  buildMenu
 *
 * @return  {object}   - A sorted deep copy of the organ, safe for the menu builder to
 * reshape without disturbing the tree the pages are rendered from.
 */
function buildMenu(){
	sortObj(organ);
	sortObj(organ.packages);
	sortObj(organ.classes);

	return utils.clone(organ);
}

/*
function stripMenuRelative(menuHtml, seed){

	return menuHtml;

	var docfile = seed.docfile;
	
	if(docfile){
		var split = menuHtml.split(docfile);
		return split.join("");
	} else {
		return menuHtml;
	}
	
}
*/


module.exports = {
	  init : init
	, add : add
	, buildMenu : buildMenu
	, buildPages : buildPages
	, processInheritance : processInheritance
	//, stripMenuRelative : stripMenuRelative
};