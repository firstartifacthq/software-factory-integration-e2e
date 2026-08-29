export function countCatalog(catalog, prefix) {
  return Object.keys(catalog).filter((key) => key.startsWith(prefix)).length;
}
