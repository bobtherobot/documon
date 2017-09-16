
# @event

When establishing an event, include a simple name after the @event tag.

Example:
	
	@event foo

Since events often ping a function, the @event block can contain @params, which are identical in nature to [@method](more.tags.method) param tags -- all the same rules apply.

Example:
	
	@event foo
	@param {string) arg1 - the first arg.
	@param {string) arg2 - the second arg.
	@example
	
		function myHandler($arg1, $arg2){
			print $arg1 . $arg2
		}
		
		something.on("foo", myHandler);
	
	
