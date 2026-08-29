# Software Factory Integration E2E
## Scenario output

This repository is used for real parallel integration verification.

## Catalog

`hasCatalogKey(catalog, key)` is an exported function that returns a boolean. It
returns `true` only when `key` (a string or symbol) identifies an own enumerable
property of `catalog`; inherited, non-enumerable, and absent properties return
`false`. The check does not modify the supplied catalog.

### `listCatalogValues(catalog, prefix = "")`

`listCatalogValues(catalog, prefix = "")` is an exported function with this
contract:

- It selects keys whose text begins with the supplied `prefix` (prefix
  matching).
- Eligible keys are the catalog's own enumerable string keys only. Inherited,
  non-enumerable, and symbol keys are excluded.
- Matching keys are ordered by ascending lexicographic comparison of JavaScript
  string UTF-16 code units.
- An omitted `prefix` defaults to the empty string (`""`), so every eligible
  own enumerable string key matches; an explicitly empty prefix has the same
  behavior.
- It returns a new array containing the selected values and does not mutate the
  supplied catalog: its prototype, keys, descriptors, and referenced values are
  preserved.
