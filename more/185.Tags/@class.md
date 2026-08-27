# Class

Generally a class should only appear one time per file.

A class tag is used to establish the beginning of a collection of properties, methods, and events (__PME__). 

When a class tag is incorporated into a page, Documon assumes that all the subsequent PME's that follow afterward are all part of the class above.

For example:

	/**
	@class Foo
	*/
	class Foo {
		// yada
	}
	
	/**
	@method bob
	*/
	function bob () {
		
	}
	
	/**
	@class Bar
	*/
	class Bar {
		// yada
	}
	
	/**
	@method sally
	*/
	function sally () {
		
	}
	
.. __bob__ will be part of the __Foo__ class, and
__sally__ will be part of the __Bar__ 

Documon essentially splits the source file whenever it runs across a @class tag.
	
	

You can use a class tag within the context of a PME, which will allow that entity to be
assigned to that specific class. Declaring the class at the top of the file is still the
preferred approach, because everything below it is collected automatically.

Common practice is one file per class, which is why we assume all the PME's belong to it.

There is no limit on how many `@class` tags a file may contain. Each one starts a new
page, and every PME between it and the next `@class` belongs to it -- the two-class
example above generalises to any number.
