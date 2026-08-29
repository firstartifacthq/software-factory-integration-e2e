# Software Factory Integration E2E
## Scenario output

This repository is used for real parallel integration verification.

## Catalog

`hasCatalogKey(catalog, key)` is an exported function that returns a boolean. It
returns `true` only when `key` (a string or symbol) identifies an own enumerable
property of `catalog`; inherited, non-enumerable, and absent properties return
`false`. The check does not modify the supplied catalog.

### `listCatalogValues(catalog, prefix = "")`

This exported function performs prefix matching on the catalog's own enumerable
string keys. It returns a new array containing the values for exactly the
matching keys, with keys sorted in ascending lexicographic JavaScript string
order before values are collected. If `prefix` is omitted, it defaults to `""`
and selects every eligible key. Inherited, non-enumerable, and symbol-keyed
properties are not eligible. The supplied catalog is never modified.
