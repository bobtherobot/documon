/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

this.documon = this.documon || {};

this.documon.Linker = (function(){

	function interceptClick(e) {
	    var target = e.target;
	    if (target.tagName === 'A') {

	        var href = target.getAttribute('href');

	        if(	href.match(/^(https?|ftp|file):\/\//) ){

	        	e.preventDefault();
	        	window.open(href, '_blank');

	        } else {
		        if(href.charAt(0) != "#"){
		        	e.preventDefault();
		        	// Prose ids are lower-cased by more.js:cleanID(), so a link written
		        	// as "more.Options" still finds "more.options".
		        	if(href.slice(0, 4) == 'more'){
		        		href = href.toLowerCase();
		        	}
		        	gieson.MenuTree.openById(href, true, true);
		        }

		    }

	    }
	
	}

	function init(){
		document.addEventListener('click', interceptClick);
	}

	return {
		init : init
	}

}());


/*
var handler = function(){
    ...torment kittens here...
}
for (var ls = document.links, numLinks = ls.length, i=0; i<numLinks; i++){
    ls[i].onclick= handler;
}

// ----------- or ------------------

function interceptClickEvent(e) {
    var href;
    var target = e.target || e.srcElement;
    if (target.tagName === 'A') {
        href = target.getAttribute('href');

        //put your logic here...
        if (true) {

           //tell the browser not to respond to the link click
           e.preventDefault();
        }
    }
}


//listen for link click events at the document level
if (document.addEventListener) {
    document.addEventListener('click', interceptClickEvent);
} else if (document.attachEvent) {
    document.attachEvent('onclick', interceptClickEvent);
}
 */