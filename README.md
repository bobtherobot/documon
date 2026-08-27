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
v3.0.1 - 2026-08-27

A documentation-accuracy release. Reading `more/` line by line against the source turned
up five places where the code did not do what the manual said. In every case the manual
was describing the intent and the code was quietly falling short, so the code moved.

Added:
- `--check` validates the cross-references in your `more` markdown, not just the ones in
  source comments, reported against the `.md` file and line. Links inside code blocks --
  fenced, indented, or indented inside a blockquote -- are skipped, for the same reason
  `@example` content is skipped: a manual teaches the shape of an id with links that were
  never meant to resolve. Every stale id in Documon's own manual survived because this
  pass did not exist.
- New `placeholder-doc` rule: a literal `{type}`, a description that is just the word
  "description", or a `[name description]` stub. Nothing caught these before --
  `no-description` only fires on an empty block and `param-no-type` only on a missing
  type -- which is how they reached the published pages of seven modules. Reported once
  per distinct stub per block, so a stubbed file gives a readable report.

Fixed:
- The `__meta__` header on a "more" page was only read on every *other* page. `metaRx` is
  module-level and carried the `g` flag, and `test()` on a global regular expression is
  stateful -- it matched, left `lastIndex` past the boundary, missed on the next page,
  reset, and matched again. A page whose header went unread lost its menu icon and its
  external url and rendered the raw JSON as visible body text. Documon's own site shipped
  that way; the page documenting the feature was one of the casualties.
- `--check` rejected the same-package short form the manual teaches. `@extends Base`
  inside `@package demo` builds correctly -- `applyInheritance()` qualifies a bare name
  with the block's own package -- but the validator compared the written target against
  fully qualified ids only and reported `unresolved-inheritance`. Source that built
  perfectly failed `--check`, which broke the `documon --check && documon` recipe the docs
  recommend. The two now resolve identically. A bare name that matches nothing, or that
  matches only in some other package, is still an error.
- A parameter's sub-properties never reached `model.json`. `@param {string} opts.timeout`
  was parsed and rendered into the HTML, then dropped from `model.json`, `llms-full.txt`
  and each page's embedded JSON-LD. Parameters now carry `children`, at any depth, plus
  `optional` and `default` -- which also makes the `(optional)` branch in `llms-full.txt`
  reachable for the first time.
- The `@deprecated` badge in `flags.jst` could never fire: `parse.js` moves the tag onto
  `meta` and drops the flag. `meta.jst` renders it; the dead branch is gone.
- Three `console.log` calls removed from `Linker.js`, one of them firing on every page load.

Documentation:
- **Only `@extends` cross-fills inherited members.** `more/`, `TAGS.md` and `AGENTS.md`
  all claimed `@implements`, `@inherits` and `@overrides` did too. They do not -- they are
  recorded and rendered as a meta link, and nothing is pulled in. `@overrides` is normally
  set for you when a child redefines an inherited member, not written by hand.
- `AGENTS.md` corrected on two more counts: `@param` on a `@class`/`@module` does render a
  parameter table (that is how constructor arguments are documented), and a second
  `@class` in a file does inherit that file's `@package` -- both changed in 3.0.0 without
  the agent notes following.
- `104.Options.md` no longer shows a `quiet` option; there isn't one, it is derived from
  `print`. `--config`/`-c` and `-V` documented.
- `106.Validating.md` gains the four rules it was missing (`retired-tag`, `no-files`,
  `unreadable-file`, `undocumented-symbol`); `param-on-non-method` only ever fires for
  `@property`, not for `@package`/`@namespace` as claimed.
- `107.Machine Readable Output.md` samples brought up to date -- the `Guides` and
  `Optional` sections of `llms.txt`, and every field a real `model.json` record carries.
- `180.Supported Tags.md` documents the aliases that were implemented but unlisted
  (`@parameter`, `@var`, `@yields`/`@yield`, `@defaultvalue`, `@exception`, `@file`,
  `@overview`), and now explains the tags Documon deliberately refuses to alias.
- `150.Templates.md`: the template example used double quotes around `${ctx.id}`, which
  does not interpolate. Backticks. Also documents `defaultExampleCode`.
- Nine broken cross-references repaired, two tag pages that carried the wrong title
  (`@optional` read "@order", `@requires` read "@type"), an unfinished paragraph published
  mid-sentence on `@class`, a malformed link on the More Docs page, and roughly seventy
  spelling corrections.
- The `.md`-in-the-label quirk is now documented rather than hidden: a prose file with no
  numeric prefix keeps its extension in both its menu label and its id. Number your files.
- Source JSDoc: `documon.js`'s module example passed `files:` where `run()` reads `src`,
  and would have produced "No files to parse."; `shouldIgnore()` carried `seeder()`'s
  description; half of `extract.js`'s block described multi-dimensional splitting that
  moved to `splitParsed.js` long ago. `organizer.js`'s inheritance engine -- including the
  public `processInheritance()` -- is documented for the first time, and the literal
  `{type}` / `description` placeholders that were rendering on the live site are gone.

v3.0.0 - 2026-08-25

Breaking:
- `@impliments` was Documon's own misspelling and has been retired. Use `@implements`.
  It is not aliased back, so the typo doesn't propagate into new projects. `--check`
  reports the old spelling by name as an error, and builds print a line about it, so the
  change cannot fail silently.
- Dotted names now mean parent/child only on `@param` and `@property`. Previously *every*
  dotted name was split, which silently destroyed qualified references: `@extends
  app.Base` had its name truncated to `Base` and matched no id, and when the same block
  also declared `@package app` the tag was re-parented as a child of the package tag and
  vanished entirely. Inheritance written the way the docs recommend did nothing at all.
  Nested `@param opts.timeout` and `@property conf.host` are unchanged.
- A second `@class` in a file now inherits that file's `@package` instead of falling into
  `root`. A file declaring `@module thing` / `@package app` produced `app.thing` and
  `root.Good`; it now produces `app.thing` and `app.Good`. An explicit `@package` still
  wins and becomes the package for everything after it.

Added:
- Accept the common JSDoc tag spellings as exact synonyms -- `@function`/`@func`,
  `@arg`/`@argument`/`@parameter`, `@prop`/`@member`/`@var`, `@augments`,
  `@returns`/`@yields`, `@constructs`, `@const`/`@constant`, `@access private` -- plus the
  description tags (`@desc`, `@description`, `@summary`, `@classdesc`, `@fileoverview`)
  and inline `{@link target}`. These were previously dropped, which cost the whole entity,
  not just the tag.
- `@deprecated`, `@throws`, `@since`, `@author`, `@license`, `@copyright` and `@todo` are
  rendered as metadata rows instead of being discarded, and appear in `model.json` and
  `llms-full.txt`.
- Tags whose meaning differs are deliberately *not* aliased -- `@fires`/`@emits`,
  `@memberof`, `@typedef`, `@callback`, `@enum`, `@inheritdoc`. `--check` explains each
  rather than suggesting a wrong replacement.
- `--check` reports normalizations at info level (`normalized-tag`) and retired spellings
  as errors (`retired-tag`).
- Builds print a one-line summary of any tags they ignored.

Fixed:
- `--check` no longer scans `@example` content for cross-references; examples legitimately
  contain ids that were never meant to resolve.
- A comment opener inside a string literal or after a `//` line comment no longer starts a
  comment block. The extractor matched `/**` anywhere on a line, so a line like
  `var s = "/** ..."` opened a block that swallowed every comment after it until the next
  `*/` -- the entities did not render wrong, they disappeared. Documon was losing entries
  from its own source this way.
- A comment opened and closed on one line (`/** @method foo */`) now ends on that line.
  Previously it stayed open and consumed the code and comments that followed.
- Cross-references to `more` pages (`[the options](more.options)`) resolve in `--check`.
  Those pages come from markdown rather than comments, so every link into the manual was
  reported as broken.
- Generated pages now carry a document outline. The entity a page documents is its `<h1>`,
  each section (Properties, Events, Methods) is an `<h2>` and each member an `<h3>` --
  previously a page was `<div>`s from top to bottom with no heading elements at all, so
  nothing reading it could tell where one member ended and the next began. Appearance is
  unchanged; the styling comes from the same classes as before. Members also carry an `id`
  alongside the existing `name` anchor, so existing links keep working.
- Every page now embeds its own record as JSON-LD (`schema.org` `APIReference`, with each
  member as a part linking to its anchor; prose pages as `TechArticle`, the index as
  `WebSite`). `llms.txt` and `model.json` only help a reader that knows to look for them;
  a page that carries its own structure helps whoever arrives at that one URL. The
  embedded record is the same one `model.json` holds, so `--no-emitModel` turns both off
  together.
- `llms.txt` and `model.json` are now advertised with `rel="alternate"` from every page,
  not only from the index.
- Fixed two `<span>` elements in the class/module meta block that were opened and never
  closed, so everything after them nested one level deeper than intended.
- Open Graph tags now appear on every generated page, not only on `index.html`. The
  2.7.0 note claiming "generated pages" carry them was only ever true of the index --
  which is the one page nobody links to directly. Class, module, package and prose pages
  now each carry `og:type`, `og:title`, `og:description`, `og:site_name` and, when
  `baseUrl` is set, an absolute `og:url`. Names are escaped, so a quote or an ampersand
  in a `@class` name no longer ends the attribute early and mangles the head.
- Pages from the `more` folder now carry the project's identity, like every other page.
  Their tab title, canonical link and `og:site_name` were blank, and their description
  was the page id (`more.overview`) rather than anything from the markdown body -- so a
  prose page previewed as nothing when shared and read as nothing in search results.
- `--check` no longer warns about `@param` on a `@class` or `@module`. Those pages are
  rendered through the same template path as methods and *do* show a signature, a parameter
  table and a returns block -- the rule was sending authors to delete documentation that
  works. It still fires for kinds that genuinely drop parameters (`@property`,
  `@namespace`, `@package`).
- The `&#47;` and `&#64;` escapes now render as `/` and `@`. A comment cannot contain a
  literal `*/` or `@tag` without ending the comment or declaring a tag, so those are
  written HTML-encoded -- but nothing ever decoded them. It happened to work in prose,
  where the browser decodes the entity, and failed everywhere it mattered: showdown
  escapes `&` inside code spans and code blocks, so every escape written inside a code
  example rendered as a literal `&#47;`. Decoding now happens after extraction and
  parsing, where a `/` or `@` is just a character. The machine-readable outputs are fixed
  too -- `model.json`, `llms.txt`, `llms-full.txt` and the embedded JSON-LD are built from
  the raw comment text, which never passes through markdown, so a default value written
  as `&#47;**` shipped to them verbatim (and `deHtml` deleted it outright on the way to
  `llms.txt`, turning `docBegin="/**"` into `docBegin="**"`).

v2.7.0 - 2026-08-25
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
