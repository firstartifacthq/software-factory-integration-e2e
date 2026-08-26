export function filterCatalog(catalog, prefix) {
  return Object.fromEntries(
    Object.keys(catalog)
      .filter((key) => key.startsWith(prefix))
      .map((key) => [key, catalog[key]]),
  );
}
