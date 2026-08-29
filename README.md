# Software Factory Integration E2E
## Scenario output

This repository is used for real parallel integration verification.

## Catalog

`hasCatalogKey(catalog, key)` is an exported function that returns a boolean. It
returns `true` only when `key` (a string or symbol) identifies an own enumerable
property of `catalog`; inherited, non-enumerable, and absent properties return
`false`. The check does not modify the supplied catalog.

`listCatalogValues(catalog, prefix = "")` is an exported function that returns
a new array containing values for own enumerable string keys whose text begins
with `prefix`. Matching keys are ordered lexicographically (ascending JavaScript
string order) before their values are returned. Omitting `prefix` defaults to an
empty prefix and therefore selects every eligible key. Inherited,
non-enumerable, and symbol-keyed properties are excluded, and the supplied
catalog is never modified.
