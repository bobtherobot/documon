# @package

Documon is based on the package concept, the resulting hierarchy that Documon generates revolves around the package concept.

The @package (or @namespace) tag provides two functionalities:

1. We split source files whenever a solo @package or @namespace appears. Therefore all classes or modules listed below the @package definition will automatically get assigned to the package. By splitting files on solo @package definitions we're causing a source file to be treated as multiple source files. This allows you to define multiple packages within a single file -- without having to incorporate the @package flag into each class, method, property or event definition.

2. We can assigned stuff to a specific @package within a comment block.


A simple trick is to use a stand-alone comment at the top of your file:

	/**
	 * @package foo.bar
	 */

Then further down the same file, you could include another @package definition...

	/**
	 * @package bob.sally
	 */


... or incorporate a package into a class (or any other) definition:

	/**
	 * @class sally
	 * @package foo.bar
	 */

... and all the classes / methods / events / properties between these @package entries will be grouped together under each @package "section".

Just be aware that if put @package definitions all over the place, you could get lost real fast. Use @package and @namespace sparingly.


FYI: "package" is more common across programming languages. The idea being that a larger framework or application has files lumped together that all support a common theme. Traditionally classes that are related to the theme all reside in the same folder and the folder name describes the "theme". Thus, the folder acts as a "package" for a group of common classes. These "package" folders are further organized heirarchically within the overall framework or applicaiton structure.

	app
	app.display
	app.display.bitmap
	app.display.vector
	app.db
	app.db.models
	app.db.models.sql
	app.db.models.json
	app.media
	app.media.audio
	app.media.audio.player
	app.media.audio.codecs

## @package @namepsace
Documon treats the concepts of "Package" and "Namespace" identically, because they're both generally used to organize code according to similar functionalities or over-arching task. You are free to use whichever term suits you, but in the documentation (and in our code), we use the term "package" or the @package tag exclusively to addresses both concepts.

Can be a stand alone comment or integrated into either the module or class comment:

	/**
	 * @namespace foo
	 */

	/**
	 * My cool class
	 * @class Cool
	 * @namespace window
	 */

	/**
	 * My cool module
	 * @class Cool
	 * @namespace path.to.access
	 */

The following will be treated exactly the same as above:

	/**
	 * @package foo
	 */

	/**
	 * My cool class
	 * @module Cool
	 * @package window
	 */

	/**
	 * My cool module
	 * @module Cool
	 * @package path.to.access
	 */

