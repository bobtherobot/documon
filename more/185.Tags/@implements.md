# @implements

Declares that a class conforms to an interface.

	/**
	 * @class    Circle
	 * @package  geo
	 * @implements geo.Drawable
	 */

The value must be a fully qualified id — `package.Class` — matching a documented entity.
`documon --check` reports targets that don't resolve.

Like [@extends](more.tags._extends_md), the parent's members are cross-filled into this
page so readers see the full surface in one place.

> **Renamed in v3.0.0.** Documon previously spelled this tag `@impliments`. That was a
> typo in Documon itself, and it has been retired rather than kept as an alias — leaving
> it in place would have propagated the misspelling into new projects indefinitely.
> `documon --check` reports the old spelling by name and tells you to rename it.
