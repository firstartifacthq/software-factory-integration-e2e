import assert from "node:assert/strict";
import test from "node:test";

import { catalog, lookupCatalog } from "../src/catalog.js";

test("looks up known catalog entries", () => {
  assert.equal(lookupCatalog("alpha"), "baseline-alpha");
  assert.equal(lookupCatalog("beta"), "baseline-beta");
  assert.equal(lookupCatalog("gamma"), "parallel-gamma");
  assert.equal(lookupCatalog("delta"), "parallel-delta");
});

test("returns null for an unknown entry", () => {
  assert.equal(lookupCatalog("missing"), null);
  assert.deepEqual(Object.keys(catalog), ["alpha", "beta", "gamma", "delta"]);
});
