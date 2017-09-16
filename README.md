# About Documon

Generates a searchable documentation website based on [JavaDoc](https://en.wikipedia.org/wiki/Javadoc) style comments found within source code. It is similar to [YUIdoc](http://yui.github.io/yuidoc/), but doesn't infer __*anything*__ from the source code or directory stucture.

Example + Documentation: http://www.documon.net 

## Get It

Install via NPM:

	npm install documon

Or [&#x02186; download Documon][1] directly and use it "stand alone" (via Node).



### Benefits

Comment tags are soley responsible for organizing the resulting heirarchy (inheritence and membership).

- Built for mortals, runs on Node.
- Use within any Node build system.
- Zero dependancies.
- Use with any programming language.
- Plain-text + markdown based.
- JavaDoc syntax.
- Structure is derived soley from the comments.
- Direct control over final structure of the resulting website.
- Great for small and large projects.
- Search enabled (low overhead, no database)
- Auto inheritance cross fill and referencing (links to and fills children classes with inherited methods, props and events).

## Documon does NOT:

- Actual source code not required.
- Doesn't interpret / execute source code.
- No over-arching code organization required.
- Doesn't infer inheritence / membership from the directory structure.
- Doesn't infer property / method names, arguments, etc, from the source code.

As a result, comment blocks must be robust and include all pertinent details required to generate documentation.

## Get Involved

- Documon on Github.

## Platforms

Documon is written in Javascript and runs on the [Node](https://www.nodejs.com) platform, which runs on Linux, Mac, and Windows systems. Documon can be installed using [NPM](https://www.npmjs.com/documon), or [&#x02186; downloaded directly][1].

## Templates
Templating is handled through vanilla javascript modules, leveraging ES6's [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). This provides the highest level of flexability with zero-dependancies, unlimited logic constraints, and nothing new to learn.

Of course, since templates are JS, you can always roll some other templating system, such as Twig, or Handlebars, into your custom template.

## Dependancies
Documon's only dependancy is Node, no additional modules are needed.

## Author and Copyright
Documon was written by [Mike Gieson](http:www.gieson.com), who is sole owner of the intellectual property, and the purveyor of the application and Copyright. Documon is released under the MIT license.


[1]: http://www.documon.net/downloads/documon.zip
.
