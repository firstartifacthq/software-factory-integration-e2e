export const catalog = {
  alpha: "baseline-alpha",
  beta: "baseline-beta",
  gamma: "parallel-gamma",
};

export function lookupCatalog(name) {
  return catalog[name] ?? null;
}

export const lookup = lookupCatalog;
