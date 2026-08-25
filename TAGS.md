# Documon Tag Reference

Everything Documon knows about your project comes from comment tags. It never reads,
parses, or executes your source code. An untagged function is invisible; a misspelled tag
is silently dropped. That is the trade: **you control the output structure completely.**

Run `documon --check` to find tags that won't work before you build.

---

## The shape of a comment block

```js
/**
 * One-line summary. Markdown is supported here.
 *
 * Longer description, still markdown.
 *
 * @method  doThing
 * @param   {string}  name  - What it's for.
 * @return  {boolean}       - What comes back.
 */
```

- Blocks open with `/**` and close with `*/` (configurable via `--docBegin` / `--docEnd`,
  which is how you document non-C-style languages).
- Free text **before** the first `@tag` is the description.
- Text on lines after a tag belongs to that tag.
- Every block needs exactly one *kind* tag (below), or it renders nothing.

Two argument orders are both accepted:

```
@param {string} name - description      <- type first
@param name {string} - description      <- name first
```

---

## Kind tags — what the thing *is*

One per block. Without one, the block is discarded.

| Tag | Purpose | Example |
|---|---|---|
| `@module` | A file-level unit. Renders as a page. | `@module dirutils` |
| `@class` | A class. Renders as a page. | `@class MenuTree` |
| `@method` | A callable member. | `@method readExt` |
| `@property` | A data member. | `@property {array} extensions` |
| `@event` | An emitted event. | `@event change` |

`@module` and `@class` are treated identically; both appear as "class" in the output.

## Scope tags — where it lives

| Tag | Purpose | Example |
|---|---|---|
| `@package` | Groups pages under a namespace. Usually one per file. | `@package documon` |
| `@namespace` | Synonym for `@package`. | `@namespace documon` |

Ids are built as `package.container.member`, which is also the generated filename:
`@package documon` + `@module dirutils` produces `documon.dirutils.html`. Use that dotted
id when cross-referencing.

## Signature tags

| Tag | Syntax |
|---|---|
| `@param` | `@param {type} name - description` |
| `@param` (optional) | `@param {type} [name] - description` |
| `@param` (default) | `@param {type} [name="fallback"] - description` |
| `@param` (child) | `@param {type} name.child - description` |
| `@return` / `@returns` | `@return {type} - description` |
| `@type` | `@type {string}` |
| `@default` | `@default 0` (also `@defaultVal`, `@defaultValue`) |
| `@optional` | Marks the item optional. |

Parameters render on `@method`, on `@event`, and on the `@class` or `@module` that heads a
page — a module exporting a single function documents its signature there. On any other kind
(`@property`, `@namespace`, `@package`) they are parsed but never displayed; put that
information in the description instead.

## Visibility tags

`@private` · `@protected` · `@public` · `@static` · `@readonly`

Flags, no value. The generated site can filter on these.

## Inheritance tags

| Tag | Meaning |
|---|---|
| `@extends` | Parent whose members are cross-filled into this page. |
| `@inherits` | Synonym for `@extends`. |
| `@overrides` | This member replaces the parent's. |
| `@implements` | Interface conformance. |

The value must be a documented id: `@extends documon.Base`. `--check` reports targets
that don't resolve.

## Supporting tags

| Tag | Meaning |
|---|---|
| `@constructor` | Marks a constructor; usually paired with `@class`. |
| `@example` | A code example. Repeatable — each renders separately. |
| `@requires` | A dependency, e.g. `@requires documon.utils`. |
| `@see` | A related item or URL. |
| `@order` | Sort weight within its section. |
| `@header` | Section heading in the rendered page. |

---

## Cross-linking

Markdown link syntax, with a dotted id as the target:

```
[the dirutils module](documon.dirutils)
[makedir](documon.dirutils.makedir)
[jump to run on this page](#run)
```

`--check` flags dotted targets that match no documented id.

---

## Tags borrowed from other systems

Documon accepts the common JSDoc spellings and maps them onto its own vocabulary, so a
comment written the JSDoc way still produces a page. These are exact synonyms — nothing is
guessed.

| You write | Documon reads it as |
|---|---|
| `@function`, `@func` | `@method` |
| `@arg`, `@argument`, `@parameter` | `@param` |
| `@prop`, `@member`, `@var` | `@property` |
| `@augments` | `@extends` |
| `@returns`, `@yields` | `@return` |
| `@constructs` | `@constructor` |
| `@const`, `@constant` | `@property` + `@readonly` |
| `@access private` | `@private` (same for `protected`, `public`) |
| `@desc`, `@description`, `@summary`, `@classdesc`, `@fileoverview` | folded into the description |

`{@link target}`, `{@link target|label}` and `{@link target label}` are rewritten as
markdown links, so inline cross-references work too.

`--check` reports each of these at `info` level so you can converge on one spelling if you
care. The documentation builds correctly either way.

## Retired spellings

| Retired | Use |
|---|---|
| `@impliments` | `@implements` |

`@impliments` was Documon's own misspelling. It was retired in v3.0.0 rather than kept as
a silent alias, so the typo doesn't spread into new projects. `--check` reports it as an
error and names the replacement; a build prints a line about it too.

## Tags that are kept, but shown as metadata

These have real meaning and no structural place in Documon, so rather than dropping them
they render as labelled rows on the member:

`@deprecated` · `@throws` / `@exception` · `@since` · `@author` · `@license` ·
`@copyright` · `@todo`

## Tags that genuinely do NOT work

These are **not** aliased, because their meaning differs from anything Documon has.
`--check` explains each one rather than suggesting a bogus replacement.

| Tag | Why not |
|---|---|
| `@fires`, `@emits` | Documents which event a method *emits*. `@event` declares the event itself — not the same thing. Declare the event with `@event` and mention it in the description. |
| `@memberof` | Documon scopes by `@package` plus the enclosing `@class`/`@module`. |
| `@typedef`, `@callback` | No type registry. Describe the shape, or document it as a `@class`. |
| `@enum` | Document each value as a `@property`. |
| `@inheritdoc` | Use `@extends`; Documon cross-fills inherited members automatically. |
| `@async`, `@abstract`, `@global`, `@inner`, `@mixin` | No equivalent. Fold into the description. |

## Worked example

```js
/**
 * Directory helpers.
 *
 * @module  dirutils
 * @package documon
 */

/**
 * Creates a folder, including any missing parents.
 *
 * @method  make
 * @param   {string}   dest        - Absolute path to create.
 * @param   {boolean}  [quiet=false] - Suppress logging.
 * @return  {boolean}              - True when the folder exists afterwards.
 * @example
 *
 * 		dirutils.make("/tmp/a/b/c");
 */
function makedir(dest, quiet){ ... }
```

Produces `documon.dirutils.html` containing a `make` method with two parameters, one
optional with a default, plus a return type and a runnable example.

---

## Checklist before you build

1. Every file that should produce a page has a `@package` and a `@module` or `@class`.
2. Every documented member has a kind tag and a name.
3. Every `@param` has `{type}` and a name.
4. Every `@extends` target is a real, documented id.
5. `documon --check` exits 0.

Type expressions pass through untouched, including `{string|number}`, `{Array<string>}`,
`{*}`, `{?string}` and `{...number}`.
