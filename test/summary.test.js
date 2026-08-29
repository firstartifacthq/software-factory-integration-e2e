import assert from "node:assert/strict";
import test from "node:test";

import { summarizeCatalog } from "../src/summary.js";

test("returns formatted entries for matching keys only", () => {
  const catalog = {
    alpha: "a",
    beta: "b",
    alpine: "c",
  };

  assert.deepEqual(summarizeCatalog(catalog, "al"), [
    "alpha: a",
    "alpine: c",
  ]);
});

test("preserves matching catalog insertion order", () => {
  const catalog = {};
  catalog.zebra = "last-looking";
  catalog.apple = "first-looking";
  catalog.zenith = "another";

  assert.deepEqual(summarizeCatalog(catalog, "z"), [
    "zebra: last-looking",
    "zenith: another",
  ]);
});

test("returns an independent empty array when nothing matches", () => {
  const catalog = { alpha: "a" };
  assert.deepEqual(summarizeCatalog(catalog, "z"), []);
});

test("does not modify the catalog and creates a new result each call", () => {
  const catalog = { alpha: "a", alpine: "c", beta: "b" };
  const before = structuredClone(catalog);

  const first = summarizeCatalog(catalog, "al");
  const second = summarizeCatalog(catalog, "al");

  assert.deepEqual(catalog, before);
  assert.notEqual(first, second);
  assert.deepEqual(first, second);
});
