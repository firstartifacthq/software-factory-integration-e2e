import assert from "node:assert/strict";
import test from "node:test";

import { catalog, lookup } from "../src/catalog.js";

test("looks up known catalog entries", () => {
  assert.equal(lookup("alpha"), "baseline-alpha");
  assert.equal(lookup("beta"), "baseline-beta");
});

test("returns null for an unknown entry", () => {
  assert.equal(lookup("missing"), null);
  assert.deepEqual(Object.keys(catalog), ["alpha", "beta"]);
});
