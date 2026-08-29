import { filterCatalog } from "./filter.js";
import { formatEntry } from "./format.js";

export function summarizeCatalog(catalog, prefix) {
  const matchingEntries = filterCatalog(catalog, prefix);
  return Object.keys(matchingEntries).map((name) =>
    formatEntry(name, matchingEntries[name]),
  );
}
