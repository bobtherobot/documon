# @implements

Declares that a class conforms to an interface.

	/**
	 * @class    Circle
	 * @package  geo
	 * @implements geo.Drawable
	 */

The value must be a fully qualified id — `package.Class` — matching a documented entity.
`documon --check` reports targets that don't resolve.

Unlike [@extends](more.tags._extends), `@implements` does **not** cross-fill the
interface's members into this page. It is recorded and rendered as a link in the page's
meta section, so a reader can follow it to the interface. Cross-filling is what
`@extends` is for; if you want `Circle` to display `Drawable`'s members, extend it.

> **Renamed in v3.0.0.** Documon previously spelled this tag `@impliments`. That was a
> typo in Documon itself, and it has been retired rather than kept as an alias — leaving
> it in place would have propagated the misspelling into new projects indefinitely.
> `documon --check` reports the old spelling by name and tells you to rename it.
