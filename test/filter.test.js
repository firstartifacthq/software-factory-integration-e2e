import assert from "node:assert/strict";
import test from "node:test";

import { filterCatalog } from "../src/filter.js";

test("filters catalog entries by a matching prefix", () => {
  const catalog = {
    alpha: "baseline-alpha",
    alpine: "baseline-alpine",
    beta: "baseline-beta",
    alphabet: "baseline-alphabet",
  };

  assert.deepEqual(filterCatalog(catalog, "alp"), {
    alpha: "baseline-alpha",
    alpine: "baseline-alpine",
    alphabet: "baseline-alphabet",
  });
});

test("supports one, zero, and all matching entries", () => {
  const catalog = { alpha: 1, beta: 2, gamma: 3 };

  assert.deepEqual(filterCatalog(catalog, "bet"), { beta: 2 });
  assert.deepEqual(filterCatalog(catalog, "z"), {});
  assert.deepEqual(filterCatalog(catalog, ""), catalog);
});

test("does not change the source catalog and returns a new object", () => {
  const catalog = { alpha: 1, beta: 2 };
  const before = { ...catalog };

  const result = filterCatalog(catalog, "a");

  assert.deepEqual(catalog, before);
  assert.notStrictEqual(result, catalog);
});
