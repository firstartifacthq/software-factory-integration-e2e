import assert from "node:assert/strict";
import test from "node:test";

import { filterCatalog } from "../src/filter.js";

test("returns every entry with a matching prefix", () => {
  const catalog = {
    alpha: "a",
    alpine: "c",
    beta: "b",
    alphabet: "d",
  };

  assert.deepEqual(filterCatalog(catalog, "al"), {
    alpha: "a",
    alpine: "c",
    alphabet: "d",
  });
});

test("handles one, zero, and all matching entries", () => {
  const catalog = { alpha: "a", beta: "b", gamma: "c" };

  assert.deepEqual(filterCatalog(catalog, "bet"), { beta: "b" });
  assert.deepEqual(filterCatalog(catalog, "z"), {});
  assert.deepEqual(filterCatalog(catalog, ""), catalog);
});

test("does not modify or alias the source catalog", () => {
  const catalog = { alpha: "a", beta: "b" };
  const before = structuredClone(catalog);

  const result = filterCatalog(catalog, "");

  assert.notEqual(result, catalog);
  assert.deepEqual(catalog, before);
});
