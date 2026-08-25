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
      "message": "@extends \"Base\" does not match any documented id.",
      "fix": "Use the fully qualified id (package.Class), or document the parent."
    }
  ]
}
```

Act on `level: "error"` first — those break the build's structure. Warnings mean something
you wrote is being silently discarded. Info is advisory.

Rules you'll hit most: `unknown-tag` (a JSDoc tag Documon doesn't implement — the `fix`
field names the right one), `duplicate-id`, `unresolved-inheritance`, `no-kind`,
`missing-name`, `broken-link`.

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

Rules that trip up models trained on JSDoc:

- `@impliments`, not `@implements`.
- `@method`, not `@function`. `@property`, not `@prop`.
- Description goes *before* the tags as plain text; there is no `@description`.
- Ids are `package.container.member` and double as filenames.
- `@param` on a `@class` or `@module` parses but never renders.

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
