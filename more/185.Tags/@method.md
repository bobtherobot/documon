# @method

Methods consist of arguments and an optional "return". 

	/**
	* Method description
	* 	
	* @method myMethod
	* @param {type} arg1 - description
	* @param {type} arg2 - description
	* @return {type} - description
	*/
	
	function myMethod(arg1, arg2){
		return arg1 + arg2;
	}

The word after the @method tag should be identical to the function name in your source code.

	@method myMethod
	
	function myMethod(){
	
	}

> This line is essential for registering this comment block as one of the foundational kinds (package, namespace, class, module, property, method, event)

### @param

The param tag is used to explain the arguments that the function can receive. Param tags consist of 4 parts:

	   1     2     3         4
	@param {type} arg1 - description
	   

1 - @param tag
: Each param tag represents an argument, the order in which these tags are listed must match the order that they appear in the function.

2 - {type}
: The expected type that the argument should be, usually a primative such as "object" or "string". For weak typed languages where multiple types can be sent in separate types with a pipe charater.
	
		{number | string | object}
	It's questionable whether to use Initial caps (Number String, Object), so I've left that to be dealt with in the template CSS. 
	
	Documon doesn't enforce anything within the brackets, so you can put anything in ther you want.
	
		{WhatEver}
	And that's what'll get rendered.
	
	
3 - name
: The argument name should be identical to what you've used in your source code. Again, Doumon doesn't read your source code, so it's up to you to ensure a commonality.

4 - description
: The remaining text after the first word will get picked up as the description. 

	>Placing a dash in front of the description to provides visual speration between the name and the description. The dash also helps Documon differentiate between the name and the description, which may be required for some fringe cases. When used, Documon will strip out the initial dash. 

### Default Values

See [Default Values](more.writing_comments.default_values)

### Multi-dimensional object parameters.

Often times objects are sent in as arguments, and details about the properties of the object need to be explained.

To handle this use a "object.prop" pattern:

	@param {object} 	foo 		- description
	@param {string} 	foo.bar 	- description
	@param {Earthling}	foo.bob 	- description
	@param {Martian}	foo.sally	- description

The sub-properties carry all the rules of a normal @param.

### @return lines
The @return tag can be plural or singular, since no one agrees which we should use, both have valid arguments, use whichever you want:

	@return
	@returns

The @return tag is similar to a param, but shouldn't include a "name", just use a description.

You can also choose to include a {type} in the return line to indicate what kind of thign your returning.

	@return {type} - description

I've included a dash in front of the description simply for consistency sake, it's not required, but helps my weak and foolish brain.

