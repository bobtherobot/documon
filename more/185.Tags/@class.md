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
	
	

You can use a class tag within the context of a PME, which will allow that entity to be assigned to the specific class, however, defining the class tag at the top of page is the preferred method for incorporating all of the PME
s into the class. 

Common practice is to use one file per class, and that's why we assume that all the MPE's are part of that class.

When more than one @class tag appears within a page, the page will essentially get 
if there are more than two class preferences page  I am not sure what happensOkay
