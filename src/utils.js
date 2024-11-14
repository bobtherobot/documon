/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 *
 * A collection of useful helper untilities.
 *
 * @class  utils
 * @package documon
 */


var fs = require('fs');
var path = require('path');

function capitalize(str){
	if(str){
		return str.charAt(0).toUpperCase() + str.substring(1);
	}
	return str;
}


function removeTrailingSlash(str) {
    if (str && str.slice(-1) == "/") {
        str = str.slice(0, -1);
    }
    return str;
}

function addTrailingSlash(str) {
    if (str && str.slice(-1) != "/") {
        str = str + "/";
    }
    return str;
}

function normalizeConfTrailingSlash(conf, addOrRemove) {
    addOrRemove = addOrRemove || "add";
    for (var prop in conf) {
        if (prop.toLowerCase().indexOf("folder") > -1) {
            if (addOrRemove == "add") {
                conf[prop] = addTrailingSlash(conf[prop]);
            } else {
                conf[prop] = removeTrailingSlash(conf[prop]);
            }

        }
    }
}

function typeOf(input) {

    var type = ({}).toString.call(input);

    if (type === '[object Object]') {

        return 'object';

    } else if (type === '[object Array]') {

        return 'array';

    } else if (type === '[object String]') {

        return 'string';

    } else if (type === '[object Number]') {

        return 'number';

    } else if (type === '[object Function]') {

        return 'function';

    } else if (type === '[object Null]') {

        return 'null';

    }

    return 'undefined';

}

function clone(input) {

    var output = input; // if neither array nor object this will return the original
    var type = typeOf(input);
    var index;

    if (type === 'array') {

        output = [];
        var size = input.length;
        for (var index = 0; index < size; ++index) {
            output[index] = clone(input[index]);
        }

    } else if (type === 'object') {

        output = {};

        for (var index in input) {
            if (input.hasOwnProperty(index)) {
                output[index] = clone(input[index]);
            }
        }

    }

    return output;

};

function emptyNode(elem, andMe){
	while(elem.firstChild){
	    elem.removeChild(elem.firstChild);
	}
	if(andMe){
		elem.parentNode.removeChild(elem);
	}
}

function sortOn(arr, prop, reverse, numeric) {

    // Ensure there's a property
    if (!prop || !arr) {
        return arr
    }


    if (arr.length < 1) {
        return arr;
    }


    // Set up sort function
    /**
     * Description
     * @private 
     * @method sort_by
     * @param {} field
     * @param {} rev
     * @param {} num
     * @return FunctionExpression
     */
    var sort_by = function(field, rev, num) {

        var primer = num ? function(val) {
            return parseFloat(String(val).replace(/[^0-9.\-]+/g, ''));
        } : function(val) {
            return String(val).toLowerCase();
        }

        var r = rev ? -1 : 1;

        // Return the required a,b function
        return function(a, b) {

            // Reset a, b to the field
            a = primer(a[field]), b = primer(b[field]);

            // Do actual sorting, reverse as needed
            //return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
            //var result = ((a > b) - (b > a)) * ();


            if (num) {

                return (a - b) * r;
            } else {
                //return a.localeCompare(b) * r;
                return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * r;
            }

        };

    }

    // Distinguish between numeric and string to prevent 100's from coming before smaller
    // e.g.
    // 1
    // 20
    // 3
    // 4000
    // 50

    var runner = function(Vprop, Vreverse, Vnumeric){

    	if (typeof Vnumeric == 'undefined') {
	        var first = arr[0][Vprop];
	        if (typeof first == 'number') {
	            Vnumeric = true;
	        }
	    }

	    arr.sort(sort_by(Vprop, Vreverse, Vnumeric));

    }


    if(typeof prop == "object"){
    	for(var i=0; i<prop.length; i++){
    		runner(prop[i], reverse, numeric);
    	}
    } else {
    	runner(prop, reverse, numeric);
    }


}


function trace() {
    var args = Array.prototype.slice.call(arguments);
    var out = [];
    for (var i = 0; i < args.length; i++) {
        var val = args[i];
        var type = typeof val
        if (type === null) {
            out.push("null");
        } else if (type == 'string' || type == 'number') {
            out.push(val);
        } else if (type == 'boolean') {
            out.push(val.toString());
        } else if (val && type == 'object') {
            out.push(val.toString());
        }

    }
    out = out.join(" ");
    console.log(out);

}


module.exports = {
    sortOn: sortOn,
    emptyNode : emptyNode,
    removeTrailingSlash: removeTrailingSlash,
    addTrailingSlash: addTrailingSlash,
    normalizeConfTrailingSlash: normalizeConfTrailingSlash,
    clone: clone,
    trace: trace,
    capitalize : capitalize
}
