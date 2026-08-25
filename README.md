# Documon

A documentation system for mortals. Use with any language.

Generates a static, searchable JSDoc style documentation from source code. Uses a customizable template system, and will process a markdown folder (aka "more" folder) where auxiliary documentation (outside of source code) can reside.

Since documon doesn't infer anything from the source code (all methods and arguments must be tagged manually), you maintain full control over the final output structure.

Run from CLI, or integrate into node project.

Because structure comes only from the comments you write, the output is fully determined
by the text in your source -- there is no inference engine deciding what your comments
"really" meant. That makes Documon predictable to write for, by hand or with an assistant.
See [AGENTS.md](AGENTS.md) and the one-page [TAGS.md](TAGS.md).

## Full Documentation

See full documentation at:
https://www.documon.net


![](https://www.documon.net/assets/screenshot1.jpg)


## Get It

NPM: https://www.npmjs.com/package/documon

Github: https://github.com/bobtherobot/documon

Directly: https://www.documon.net  (as "stand alone" )


### Quick Start

__From the command line__

	npx documon ./src ./          # writes ./docs

	# or install it
	npm install --save-dev documon
	documon -i ./src -o ./ -n "My Project" -v 1.0 -p

__In Node (javascript)__

	var documon = require("documon");

	var result = documon({
		src         : "/path/to/src/code",
		out         : "/path/to/docs/output",
		more        : "/where/are/more/markdowns",
		name        : "My Project",
		version     : "1.0.0",
		description : "One line about the project.",
		baseUrl     : "https://example.com/docs",
		ignore      : ["*.test.js", "vendor/**"],
		sourceExt   : ["js"],
		launch      : false,
		print       : true
	});

	if( ! result.ok ){
		process.exit(result.exitCode);
	}

__With a config file__

Put a `documon.json` beside your `package.json` and just run `documon`. It is found from
anywhere in the project tree, and a `documon` key inside `package.json` works too.

	{
		"src"         : "./src",
		"out"         : "./",
		"name"        : "My Project",
		"version"     : "1.0.0",
		"description" : "One line about the project."
	}

`name`, `version` and `description` fall back to the nearest `package.json`, so they only
need to live in one place.

__Check before you build__

Documon derives structure only from your comments, so an untagged symbol is invisible and
a misspelled tag is silently dropped. `--check` tells you before you ship:

	documon --check -i ./src            # exits 2 if anything is wrong
	documon --check --json -i ./src     # machine-readable findings
	documon --check --coverage -i ./src # plus undocumented-symbol advisory

Exit codes: `0` success, `1` configuration error, `2` check found problems.

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
- Built-in validator (`--check`) with machine-readable findings.
- Emits `llms.txt`, `llms-full.txt` and `model.json`, so the docs are consumable as data.
- Real exit codes, so it behaves in CI and in scripts.

## Documon does NOT:

- Actual source code not required.
- Doesn't interpret / execute source code.
- No over-arching code organization required.
- Doesn't infer inheritence / membership from the directory structure.
- Doesn't infer property / method names, arguments, etc, from the source code.

As a result, comment blocks must be robust and include all pertinent details required to generate documentation.

## Machine Readable Output

Every build also writes, next to the HTML:

- `llms.txt` -- an [llms.txt](https://llmstxt.org) index of every page.
- `llms-full.txt` -- the entire manual as plain text, in one file.
- `model.json` -- the documentation as structured data (packages, classes, members,
  params, types, access).

So anything that wants to build on your docs can read them as data instead of scraping
HTML. Disable with `--no-emitLlms` / `--no-emitModel`.

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
v2.7.0 - 2026-08-25
- Accept the common JSDoc tag spellings as exact synonyms (`@function`, `@arg`, `@prop`,
  `@augments`, `@implements`, `@const`, `@access`, and the description tags), plus inline
  `{@link}`. Previously these were dropped, which silently cost the whole entity.
- Keep `@deprecated`, `@throws`, `@since`, `@author`, `@license` and `@todo` as rendered
  metadata instead of discarding them.
- Builds now print a one-line summary of any tags they ignored.
- Added a `bin` entry, so `npx documon` and a global `documon` command work.
- The output folder is now created when missing, instead of erroring.
- Real exit codes: 0 success, 1 configuration error, 2 `--check` findings.
- Added `--check`, a validator for comment tags, with `--strict` and `--coverage`.
- Added `--json` for machine-readable check and build output.
- Every build now emits `llms.txt`, `llms-full.txt` and `model.json`.
- Added config file discovery (`documon.json`, `.documonrc`, a `documon` key in
  `package.json`) and long-form flags (`--src`, `--out`, ...).
- Project `name`, `version` and `description` now default to the nearest `package.json`.
- Added `description` and `baseUrl` options; generated pages now carry a real meta
  description, canonical link and Open Graph tags instead of a hard-coded string.
- Fixed the ignore system, which never worked: the matcher returned after testing one
  pattern, and that pattern was not a valid regular expression, so `node_modules`, `.git`,
  the template folder, the output folder and every user-supplied ignore were all walked.
  Simple globs are now supported.
- Fixed path validation reporting "not specified" for paths that plainly existed.
- Added a dependency-free test suite (`npm test`).
- Trimmed the published package; it no longer ships Documon's own generated docs.

v2.6.1 - 2026-03-17 @ 21:41:02
- fixed fatal flaw in markdown.js, reference to require "showdown" needed local "./showdown.min.js"

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
