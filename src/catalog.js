export const catalog = {
  alpha: "baseline-alpha",
  beta: "baseline-beta",
};

export function lookup(name) {
  return catalog[name] ?? null;
}
