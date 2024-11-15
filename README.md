# Documon

A documentation system for mortals. Use with any language.

Generates a static, searchable JSDoc style documentation from source code. Uses a customizable template system, and will process a markdown folder (aka "more" folder) where auxiliary documentation (outside of source code) can reside.

Since documon doesn't infer anything from the source code (all methods and arguments must be tagged manually), you maintain full control over the final output structure.

Run from CLI, or integrate into node project.

## Full Documentation

See full documentation at:
https://www.documon.net


![](https://www.documon.net/assets/screenshot1.jpg)


## Get It

NPM: https://www.npmjs.com/package/documon

Github: https://github.com/bobtherobot/documon

Directly: https://www.documon.net  (as "stand alone" )


### Quick Start

__In Node (javascript)__

Install via NPM:

	npm install documon

Generate Docs:

	var docs = require("documon");
	doc({
        src			: "/path/to/src/code",
        out			: "/path/to/docs/output",
        more 		: "/where/are/more/markdowns",
        ignore		: [
                        '/path/to/src/dont/process/me',
                        '/path/to/src/node_modules'
                      ],
        name		: "My Project",
        version		: "1.0.0",
        launch		: false,
        print		: true,
        dumpData	: true,
        sourceExt	: ["js"],
        gati 		: 'UA-106684927-1'
    });

__From CLI__

Generate docs:

	node /path/to/documon/index.js "/path/to/source/code" "/path/to/destination"



### Benefits

Comment tags are soley responsible for organizing the resulting heirarchy (inheritence and membership).

- Built for mortals, runs on Node.
- Generates static website (no server-side stuff).
- Search enabled (low overhead, no database)
- Use within any Node build system.
- Zero dependancies.
- Use with any programming language.
- Plain-text + markdown based.
- JavaDoc syntax.
- Structure is derived soley from the comments.
- Direct control over final structure of the resulting website.
- Great for small and large projects.
- Auto inheritance cross fill and referencing (links to and fills children classes with inherited methods, props and events).

## Documon does NOT:

- Actual source code not required.
- Doesn't interpret / execute source code.
- No over-arching code organization required.
- Doesn't infer inheritence / membership from the directory structure.
- Doesn't infer property / method names, arguments, etc, from the source code.

As a result, comment blocks must be robust and include all pertinent details required to generate documentation.

## Get Involved

- [Documon on Github](https://github.com/bobtherobot/documon)
- [Documon on NPM](https://www.npmjs.com/package/documon)

## Platforms

Documon is written in Javascript and runs on the [Node](https://www.nodejs.com) platform, which runs on Linux, Mac, and Windows systems. Documon can be installed using [NPM](https://www.npmjs.com/documon), or [&#x02186; downloaded directly][1].

## Templates
Templating is handled through vanilla javascript modules, leveraging ES6's [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). This provides the highest level of flexability with zero-dependancies, unlimited logic constraints, and nothing new to learn.

Of course, since templates are JS, you can always roll some other templating system, such as Twig, or Handlebars, into your custom template.

## Dependancies
Documon's only dependancy is Node, no additional modules are needed.

## Change Log
v2.5.5 - 2024-11-14 @ 12:31:42
- updates

v1.1 - 2019-10-20 @ 13:10:18
- updates

v1.0 - 2017-01-28 @ 13:09:49
- initial release


## Author & Copyright
Copyright &copy; [Mike Gieson](http://www.gieson.com). 
Released under the MIT license.


[1]: https://www.documon.net/downloads/documon.zip
.
