# Documon for AI Agents

Guidance for automated tools (Claude Code, Cursor, Copilot, CI bots) generating or
maintaining documentation with Documon.

## Why Documon suits an automated writer

Documon derives structure **exclusively** from comment tags. It never parses or executes
source code. There is no inference engine to fight and no hidden heuristic deciding what
your comments "really" meant — what you write is what ships. That makes output fully
determined by the text you emit, which is exactly the property an automated writer wants.

The cost is that untagged code is invisible. Use `--check` so silence isn't mistaken for
success.

## Install and run

```bash
npx documon --help                    # no install needed
npm install --save-dev documon        # or as a project dependency
```

```bash
documon ./src ./                      # build ./docs from ./src
documon -i ./src -o ./ -n "My Project" -v 1.0
documon --check -i ./src              # validate, write nothing
```

Zero runtime dependencies; Node >= 12; works on any language via `-e` and
`--docBegin` / `--docEnd`.

## The loop

```bash
documon --check --json -i ./src   # 1. what's broken?
#    ... write or repair comments ...
documon --check -i ./src          # 2. exits 0 when clean
documon -i ./src -o ./ -p         # 3. build
```

Exit codes: `0` success · `1` configuration error, nothing built · `2` `--check` found
problems.

### Machine-readable findings

`--check --json` emits:

```json
{
  "ok": false,
  "counts": { "error": 1, "warning": 2, "info": 5 },
  "stats": { "files": 25, "comments": 117, "entities": 111 },
  "findings": [
    {
      "level": "error",
      "rule": "unresolved-inheritance",
      "file": "src/menu.js",
      "line": 42,
      "message": "@extends \"Bass\" does not match any documented id.",
      "fix": "Use the fully qualified id (package.Class), or document the parent."
    }
  ]
}
```

Act on `level: "error"` first — those break the build's structure. Warnings mean something
you wrote is being silently discarded. Info is advisory.

Rules you'll hit most: `unknown-tag` (a JSDoc tag Documon doesn't implement — the `fix`
field names the right one), `duplicate-id`, `unresolved-inheritance`, `no-kind`,
`missing-name`, `broken-link`, `placeholder-doc`.

`placeholder-doc` is the one to watch when generating documentation: a literal `{type}`, a
description that is just the word "description", or a `[name description]` stub renders on
the page verbatim and looks finished. Fill it in or drop the tag.

Pass `-m ./more` (or set `more` in the config) and `broken-link` also validates the
cross-references in your prose markdown, reported against the `.md` file and line. Links
inside code blocks are skipped, so teaching examples don't trip it.

### Coverage

`--check --coverage` adds `undocumented-symbol` findings and a coverage percentage. It is
an advisory shallow scan only; it never influences generated output.

## Writing the comments

The complete tag grammar is in **[TAGS.md](TAGS.md)** — one file, read it before writing
tags. The essentials:

```js
/**
 * What it does. Markdown works here.
 *
 * @method  methodName
 * @param   {string}  name         - Description.
 * @param   {number}  [count=0]    - Optional with a default.
 * @return  {boolean}              - Description.
 */
```

### Coming from JSDoc

Most JSDoc spellings are accepted and mapped automatically — `@function`, `@arg`, `@prop`,
`@augments`, `@returns`, `@const`, `@access`, and the description tags
(`@desc`, `@description`, `@classdesc`, `@fileoverview`) all work, as does inline
`{@link target}`. Type expressions pass through untouched, including `{string|number}`,
`{Array<string>}`, `{*}`, `{?string}` and `{...number}`. `--check` reports what it
normalized at `info` level.

`@deprecated`, `@throws`, `@since`, `@author`, `@license` and `@todo` are rendered as
metadata rows rather than discarded.

A few tags are deliberately **not** accepted, because their meaning differs — `--check`
explains each rather than suggesting a wrong replacement:

- `@fires` / `@emits` — documents which event a method *emits*; `@event` declares the
  event itself. Declare the event separately.
- `@memberof` — Documon scopes by `@package` plus the enclosing `@class`/`@module`.
- `@typedef`, `@callback`, `@enum`, `@inheritdoc` — no equivalent concept.

Still worth knowing:

- Ids are `package.container.member` and double as filenames.
- `@param` on a `@class` or `@module` renders a parameter table on that page, which is
  how you document constructor arguments. On a `@property` it is parsed and dropped, and
  `--check` reports `param-on-non-method`.
- A second `@class` in a file inherits that file's `@package`. An explicit `@package`
  still wins and becomes the package for everything after it.
- Only `@extends` cross-fills inherited members. `@implements` and `@inherits` are
  recorded as links and pull nothing in. A bare parent name resolves against the block's
  own `@package`, so `@extends Base` works within a package.

## Configuration file

Drop a `documon.json` beside `package.json` and Documon finds it from anywhere in the
tree (it also reads a `documon` key inside `package.json`):

```json
{
  "src": "./src",
  "out": "./",
  "name": "My Project",
  "version": "1.0.0",
  "description": "One line, used in meta tags and llms.txt.",
  "baseUrl": "https://example.com/docs",
  "sourceExt": ["js"],
  "ignore": ["*.test.js", "vendor/**"]
}
```

Then just `documon` — or `documon --check`.

`name`, `version` and `description` default to the nearest `package.json`, so don't
restate them unless you need to override. Never hard-code a version into a build script;
it will go stale.

## Consuming Documon output

Every build writes machine-readable companions next to the HTML:

| File | Contents |
|---|---|
| `llms.txt` | [llms.txt convention](https://llmstxt.org): a linkable index of every page. |
| `llms-full.txt` | The entire manual as plain text — one fetch, no scraping. |
| `model.json` | The structured model: packages, classes, members, params, types, access. |

Read `model.json` rather than parsing HTML. Shape:

```json
{
  "generator": "documon",
  "project": "Documon",
  "pages": [
    {
      "id": "documon.dirutils",
      "name": "dirutils",
      "kind": "module",
      "package": "documon",
      "description": "...",
      "members": [
        {
          "kind": "method",
          "name": "make",
          "access": "public",
          "params": [ { "name": "dest", "type": "string", "description": "..." } ],
          "returns": { "type": "boolean", "description": "..." }
        }
      ]
    }
  ]
}
```

Disable with `--no-emitLlms` / `--no-emitModel`.

## Don'ts

- Don't hand-edit anything in the output folder — it is emptied on every build.
- Don't expect Documon to discover undocumented code. It won't, by design.
- Don't add `@tags` from other systems hoping they'll work; run `--check`.
