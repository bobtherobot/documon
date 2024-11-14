/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * 
 * Takes the source context object (which contains the entire resolved documentation data) and extracts meta data adn refactors / organizes it into an object formatted for "MenuTree.js".
 *
 * Constructs a multi-dimensional object/array that represents the menu tree ultimately resulting in the output "out/_menuData.js" file, which is formatted for and picked up by the "MenuTree.js" on the index.html page.
 * 
 * @class  		menuBuilder
 * @package  	documon
 * @private
 * 
 */

var sectionProps = ["packages", "classes", "properties", "events", "methods"];


/**
 * Checks the provided context to see if an array of items exists for the associated major kind of sections (packages, classes, property, events, methods).
 *
 * For example, the provided context will take the form of:
 *
 * 		context : {
 * 			classes 	: [ a, b, c ]
 * 			properties 	: [ a, b, c ]
 * 			etc
 * 		}
 *
 * If the array exists, we build out that major kind as a section
 *
 * Builds the context's major sections into the target array (kds)
 * 
 * @method  buildSections
 * @private
 * @param   {object}	ctx   	- The parsed documentation object.
 * @param   {type}		target  - The array to put any childeren into.
 *
 * @return  {type}               description
 */
function buildSections(ctx, target){
	
	// Only the main menu get's a class, and is shown by default, otherwise no style and hidden;

    

	for(var i=0; i<sectionProps.length; i++){
		var prop = sectionProps[i]
		var item = ctx[ prop ];
		// Only when it exists and has stuff
		if(item && item.length > 0){
        //if(item){
			target.push( section(ctx, prop) );
		}
	}
	
}


/*
var packageList = {};
function mapPackages(ctx){
    var list = ctx.packages;

    if(list){
        for(var i=0; i<list.length; i++){
            var item = list[i];
            var pk = item.package;

            if( ! packageList[pk] ) {
                packageList[pk] = [];
            }

            var Apk = pk.split(".");
            var Aseg = [];
            for( var ii=0; ii < Apk.length; ii++) {
                Aseg.push(Apk[ii]);
                var seg = Aseg.join(".");
                if( ! packageList[seg] ) {
                    packageList[seg] = [];
                }
            }
            
            // if(pk){
            // seg.push( pk.shift() );
            // var Sseg = seg.join(".")
            // if( ! packageList[Sseg] ) {
            //     packageList[Sseg] = [];
            // }
        }
        console.log(pk)
    }

    console.log("packageList", packageList)
}
*/

/**
 * Checks to see if a major type exists.
 *
 * @method  hasAnyPart
 * @private
 * @param   {type}      item  description
 * @return  {Boolean} 
 */
function hasAnyPart(item){
	for(var i=0; i<sectionProps.length; i++){
		var prop = sectionProps[i]
		var list = item[ prop ];
		if(list && list.length > 0){
			return true;
		}
	}
	return false;
}


/**
 * Builds an indiviual items containing pertenint meta data required by MenuBuilder to display the item in the tree and click-to-open the associated file.
 *
 * @method  section
 * @private
 * @param   {object}   ctx   - The context to parse. Each level down the tree has it's own unique and seperate context.
 * @param   {string}   prop  - The key for the part of the context we are going to process.
 * @return  {type} - A simplified (meta-only) object that represents the provided context.
 *
 * Example of returned 
 * 		{
			"id": "packageName.className-propMethodEventEtcName",
			"url": "packageName.className.html#propMethodEventEtcName",
			"label": "propMethodEventEtcName",
			"kind": "propMethodEvent",
			"children": [ ] <-- only added when needed
		}
 */

var existlist = {};
function section(ctx, prop){
	
	var obj = {
		id : ctx.id + "-" + prop,
		url : ctx.docfile + "#" + prop,
		label : prop,
		kind : prop
	}

    // var exists = false;
    // if( ! existlist[obj.id] ){
    //     existlist[obj.id] = obj;
    // } else {
    //     exists = existlist[obj.id];
    // }

	// If there are items for thei property (and array of children), then build-out the children, and expand the limbs of the tree.
	var list = ctx[prop];
	if(list && list.length){

		var kids = [];
		obj.children = kids;

		for (var i=0; i<list.length; i++){

			var item = list[i];


            var itemObj = {
                id 			: item.id,
                url 		: item.docfile + "#" + item.id,
                label 		: item.name,
                kind 		: prop + "-item",
                access 		: item.access ? item.access : "public",
                inherits 	: item.inherits ? 1 : 0
            }

			// Check if children exist, if so, build them in.
			if( hasAnyPart(item) ){
                itemObj.children = [];
				buildSections(item, itemObj.children);
			}

            kids.push(itemObj);
			

		}
	
	}

	//prune(obj);

	return obj;

	
}


function prune(obj){
	for(var i=obj.length; i--;){
		var item = obj[i];
		if(item.children && item.children.length < 1){
			obj.splice(i, 1);
		}
	}
}


/**
 * The main entry point for processing. Builds each section on the "root" node if methods and properties are not associated with classes. Meaning that anything avaialble on the root will reside int eh "window" scope. So they just dnagle out there on the tree.
 *
 * @method  render
 *
 * @param   {array}  ctx  description
 *
 * @return  {array}       description
 */
function render(ctx){

    //mapPackages(ctx);
    //console.log("packageList", packageList);

	var menuObj = [];
	buildSections(ctx, menuObj);
	//prune(menuObj);
	return menuObj;
}

module.exports = render;
