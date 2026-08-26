export const catalog = {
  alpha: "baseline-alpha",
  beta: "baseline-beta",
  delta: "parallel-delta",
};

export function lookupCatalog(name) {
  return catalog[name] ?? null;
}

export const lookup = lookupCatalog;
