/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */



/*
# -----------------
# run tests
# -----------------
cd /Volumes/Drives/projects/documon/node_modules/documon/src/
node ./parseFlag.js



var tests = [

  // name after type
        "@foo {object | string} name - description is here",
        "@foo {object | string} name.kid - description is here",
        "@foo {object | string} name.kid - description is here",
        "@foo {object | string} name=\"bar\" - description with {other} bracket @with at sign here",
        "@foo 	{object | string} name = \"bar\" - description with {other} bracket @with at sign here",
        "@foo  	 {object | string} name 	= \"bar\" - description with {other} bracket @with at sign here",
        "@foo  	 {object | string} name 	= \"bar\"",
        "@foo {object | string} name",
        "@foo {object | string}",
        "@foo {object} name - description is here", // name - desc
        "@foo {object}	 name - description is here", // } tab space name - desc
        "@foo {object} 	name - description is here", // } space tab name - desc
        "@foo {} name - description is here", // name - desc
        "@foo 	{object} name - description is here", // name - desc
        "@foo {object} name 	- description is here", // name space tab(s) - desc
        "@foo {object} name		description is here", // name tab(s) desc
        "@foo {object} name 	description is here", // name space tab desc
        "@foo {object} name 	 description is here", // name space tab space desc
        "@foo {object} description is here",
        "@foo {object} 		- 	description is here",
        "@foo 	{object} description",
        "@foo 	object=\"val\"",
        "@foo object description is here",
        "@foo object - description is here",
        "@foo description is here",
        "@foo - description is here",
        "@foo",
        "@foo	",
        "@foo ",
    
// name before type
        "@foo name {object | string}  - description is here",
        "@foo name.kid {object | string}  - description is here",
        "@foo name.kid {object | string}  - description is here",
        "@foo name=\"bar\" {object | string}  - description with {other} bracket @with at sign here",
        "@foo name = \"bar\"	{object | string}  - description with {other} bracket @with at sign here",
        "@foo  name 	= \"bar\"	 {object | string}  - description with {other} bracket @with at sign here",
    
    "@foo  name 	= \"bar\"	 {object | string} ",
       "@foo name {object | string} ",


       "@foo {object | string}",
       "@foo name {object}  - description is here", // name - desc
       "@foo name {object}	  - description is here", // } tab space name - desc
       "@foo name {object} 	 - description is here", // } space tab name - desc
       "@foo name {}  - description is here", // name - desc
       "@foo name	{object}  - description is here", // name - desc
       "@foo name {object}  	- description is here", // name space tab(s) - desc
       "@foo name{object} 		description is here", // name tab(s) desc
        "@foo name {object}  	description is here", // name space tab desc
       "@foo name {object}  	 description is here", // name space tab space desc
       "@foo {object} description is here",
       "@foo {object} 		- 	description is here",
       "@foo 	{object} description",
       "@foo 	object=\"val\"",
       "@foo object description is here",
       "@foo object - description is here",
       "@foo description is here",
       "@foo - description is here",
       "@foo",
       "@foo	",
       "@foo ",

];

var output = {
    flags: []
}

for (var i = 0; i < tests.length; i++) {
    var obj = {};
    var line = tests[i];
    parseFlag(line, output.flags);
}

function testResults(obj, tab) {
    tab = tab || "";
    for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        con sole.log(tab + "-----------------------------------");
        for (var prop in item) {
            var addTab = "";
            if (prop.length < 6) {
                addTab = "\t";
            }
            cons ole.log(tab + prop + " : \t" + addTab + item[prop]);

            if (prop == "children") {
                testResults(item[prop], "\t")
            }
        }
    }
}

testResults(output.flags)
*/


// ----------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Docs ------------------------------------------------------------ 
// ----------------------------------------------------------------------------------------------------------




/**

Fills the output object with the following properties (if they exist)

		object {
			source 		// Entire first line inlcuding the @flag (only first line)
			after		// Everything after the @flag
			name		// One word following {type}. Or first word after the @flag definition when no {type}.
			children	// name.kid - Array of children
			parent		// if am a child, this is my parent.
			flag		// @flag token with @ stripped
			defaultVal	// name=val
			afterType	// first line after
			text		// 
		}

Here's an expanded and exmple'd definition list

source
: The entire comment block

after
: Everything after the @flag token "as is" (kinda like source)

- __source__ : The entire comment block
- __after__ : 		Everything after the @flag token "as is" (kinda like source)

	e.g. in this line:
			\@foo {type} name descr
		 after yields:
		 	{type} name descr

- __name__ : 		The first word following the {type} definition. Or the first word after the @flag definition

- __children__ : 	If a name is written as foo.bar then foo is the parent and bar is a child. Future processing fills the array forming a heirarchy.
- __parent__ : 		The parent flag of a child. This property only exists on children flags.
- __defaultVal__ : 	When name=foo then default value will be foo. Note that quotes are stripped.
				e.g. foo="bar" sets default property to "bar" (without the quotes) and name property to "foo".
- __flag__ : 		The flag kind - the @ is stripped
- __afterType__ : 	Everything after the {type} definition
				e.g. @flag {type} name - descr
					... yields:
					name - descr
- __text__ : 		The description for the paramter. Note that additional description text can be provided below the @flag.
					e.g. @flag {type} name - description
					more description
					below the flag here



		\@flag {kind} name.child=defaultVal - description \n stuff on next line \n and other next lines...
		|flag|
		                       |defaultVal|
		                 |child|
		            |parent|
		            |name|
		                                     |text ------------------------------------------------------|
		            |afterType ---------------------------|
		      |after -------------------------------------|
		|source ------------------------------------------|



@class parseFlags
@package documon
 */

/*


 */


var re_optional = /[\[\]]/g;

/**
 * @property {array} DOTTED_CHILD_TAGS - Tags where a dotted name means "member of",
 * rather than a fully qualified id. Only these get parent/child treatment.
 */
var DOTTED_CHILD_TAGS = ["param", "property"];

function processName(name, obj, output) {

    var parent;

    // --------------
    // MUST BE FIRST - because the default value may contain a bracket or dot!
    // --------------
    // Look for defautl value:  name=1 or name="1" and strip quotes
    // e.g. 
    if (name.indexOf("=") > -1) {
        var Aname = name.split("=");
        name = Aname.shift();
        
        //obj.defaultVal = Aname.join("=").trim().replace(/^["'](.*)["']$/g, '$1'); // strip surrounding quotes
        obj.defaultVal = Aname.join("=").trim().replace(/("|'|\[|\])/g, ''); // strip quotes and brackets

    }

    // See if optional
    var hasBrackets = name.match(re_optional);
    if (hasBrackets) {
    	obj.optional = true;
    	name = name.replace(/[\[\]]/g, "");
    }

    // Look for sub.property
    //
    // A dot means two different things depending on the tag. On @param and @property it
    // marks a member of an object ("opts.timeout" belongs under "opts"). On a reference
    // tag it is part of a fully qualified id ("app.Iface" IS the name).
    //
    // Treating every dot as parent/child broke qualified references twice over:
    // "@extends app.Iface" had its name truncated to "Iface", and when the same block
    // also declared "@package app" the flag was re-parented as a child of that package
    // tag and disappeared from the block altogether. Inheritance written the way the
    // docs recommend silently did nothing.
    if (name.indexOf(".") > -1 && DOTTED_CHILD_TAGS.indexOf(obj.flag) > -1) {

    	// Allow REST notation for args... 
    	if(name.indexOf("...") < 0){
    		// TODO: probably want to allow many more depths. For now, just one will do.
	        var Aname = name.split(".");
	        parent = Aname.shift();
	        obj.parent = parent;
	        name = Aname.join(".");
    	}
        
    }



    obj.name = name;

    if (parent) {
        for (var i = 0; i < output.length; i++) {
            var item = output[i];
            if (item.name === parent) {
                if (!item.children) {
                    item.children = [];
                }
                return item.children; // the object to put the flag into
            }
        }

    }

    return output;


}



var aliases = require("./aliases");

function parseFlag(line, output) {
    line = line.trim();
    var source = line;
    var obj = {
        source: line
    };

    // -------------
    // flag
    var flag = line.match(/^@(.*?)(?:\s|$)/)[1];

    // Accept the spellings other documentation systems use. An unrecognised tag isn't a
    // cosmetic issue here -- it can cost the entire entity -- and the aliases are exact
    // synonyms. See src/aliases.js for what is deliberately not aliased.
    var resolved = aliases.resolve(flag);
    if(resolved !== flag){
        obj.writtenFlag = flag;
    }

    obj.flag = resolved;

    // chop @foo
    line = line.replace(/^@.*?(?:\s|$)/, "").trim();
    obj.after = line;

    // after flag
    if (line) {

        // parse name before type
        // e.g. @foo name {type} descr
        var frontName = line.match(/^(.*?)(?:\{)/);
        if (frontName) {
            if (frontName[1]) {
                frontName = frontName[1].trim();
                frontName = frontName.replace(/[\s].*?(=).*?(?=[\S])/, "$1");

                line = line.replace(/^(.*?)(?=\{)/, "").trim();

            } else {
                frontName = null;
            }

        }

        // -------------
        // type
        // TODO also allow type to be defined in square-brackets e.g. @foo [type] name - descr
        if (line.charAt(0) == "{") {
            var types = line.match(/^\{(.*?)\}/);
            if (types && types.length) {
                obj.type = types[1];
            }


            // chop {object}
            line = line.replace(/^\{.*?\}/, "").trim();

        }

        // after type
        if (line) {

            // ------------
            // name
            // 
            var Aline = line.split(/\s/);
            var name = Aline[0].trim();

            // Useful for things like @returns {object} - description
            var afterType = line;
            if (afterType.charAt(0) == "-") {
                afterType = afterType.substr(1).trim();
            }
            obj.afterType = afterType;

            var skipName = false;
            if (line.charAt(0) != "-") {

                if (frontName && ! Aline.length) {

                    output = processName(frontName, obj, output);

                    obj.single = true;

                    // When only a single word at the front of the line.
                } else if (Aline.length === 1) {

                    // Altering output if this is a child (processName puts this flag into the parent'd children array)
                    output = processName(name, obj, output);

                    // flag a single word, since some things don't have a "name", and may have:
                    // - a single word description
                    // - a {type} definition without brackets.
                    // - 
                    obj.single = true;

                    // after name
                } else {

                    if (frontName) {
                        output = processName(frontName, obj, output);

                    } else {

                        // grab first word and assume it's the name
                        var first = line.match(/^(.*?)(?:\s|$)/)[1];
                        output = processName(first, obj, output);

                        // store everything after the 
                        // lop'd off the first word
                        line = line.replace(/^(.*?)(?:\s|$)/, "").trim();

                        // Look for and equal sign that was seperated from the name:
                        // name = "foo"
                        if (line.charAt(0) == "=") {

                            // I'm not smart enough to regex the space between "=" and "foo":
                            // 	= "foo" description here
                            // 	
                            // So just chop off the = sign
                            line = line.substring(1).trim();

                            // ... and grab the first word, which is the value. (same "var first..." above)
                            var val = line.match(/^(.*?)(?:\s|$)/)[1];

                            if (val) {
                                // ... then glue things back together as they "should be" (name="foo")
                                name = name + "=" + val;
                                output = processName(name, obj, output);

                                // extract the "val" from the line
                                line = line.replace(/^(.*?)(?:\s|$)/, "").trim();
                            }

                        }

                    }



                }

            } else {

                if (frontName) {
                    output = processName(frontName, obj, output);
                }

            }




            // description
            if (line) {

                if (line.charAt(0) == "-") {
                    line = line.substring(1).trim();
                }

                obj.text = line;
            }

        } else {

            if (frontName) {
                output = processName(frontName, obj, output);
            }

        }


    }

    output.push(obj);

    return obj;


}

module.exports = parseFlag;
