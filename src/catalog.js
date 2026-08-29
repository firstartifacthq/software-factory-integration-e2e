export const catalog = {
  alpha: "baseline-alpha",
  beta: "baseline-beta",
  gamma: "parallel-gamma",
  delta: "parallel-delta",
};

export function lookupCatalog(name) {
  return catalog[name] ?? null;
}

export const lookup = lookupCatalog;

export function hasCatalogKey(catalog, key) {
  return Object.prototype.propertyIsEnumerable.call(catalog, key);
}

export function listCatalogKeys(catalog, prefix) {
  return Object.keys(catalog)
    .filter((key) => key.startsWith(prefix))
    .sort();
}

export function listCatalogValues(catalog, prefix = "") {
  return listCatalogKeys(catalog, prefix).map((key) => catalog[key]);
}
