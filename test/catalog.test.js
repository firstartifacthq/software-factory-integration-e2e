import assert from "node:assert/strict";
import test from "node:test";

import {
  catalog,
  hasCatalogKey,
  listCatalogKeys,
  lookupCatalog,
} from "../src/catalog.js";

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

test("checks only own enumerable string and symbol keys", () => {
  const inherited = { inherited: true };
  const entries = Object.create(inherited);
  const symbol = Symbol("visible");
  entries.visible = true;
  entries[symbol] = true;
  Object.defineProperty(entries, "hidden", { value: true, enumerable: false });

  assert.equal(hasCatalogKey(entries, "visible"), true);
  assert.equal(hasCatalogKey(entries, symbol), true);
  assert.equal(hasCatalogKey(entries, "inherited"), false);
  assert.equal(hasCatalogKey(entries, "hidden"), false);
  assert.equal(hasCatalogKey(entries, "missing"), false);
});

test("does not mutate the catalog while checking a key", () => {
  const reference = { nested: true };
  const prototype = { inherited: reference };
  const entries = Object.create(prototype);
  const symbol = Symbol("key");
  Object.defineProperty(entries, "visible", {
    value: reference,
    enumerable: true,
    writable: false,
    configurable: false,
  });
  Object.defineProperty(entries, "hidden", {
    value: reference,
    enumerable: false,
    writable: false,
    configurable: false,
  });
  Object.defineProperty(entries, symbol, { value: reference, enumerable: true });
  const beforePrototype = Object.getPrototypeOf(entries);
  const beforeKeys = Reflect.ownKeys(entries);
  const beforeDescriptors = Object.getOwnPropertyDescriptors(entries);
  const beforeValues = beforeKeys.map((key) => entries[key]);

  assert.equal(hasCatalogKey(entries, "visible"), true);
  assert.equal(hasCatalogKey(entries, "missing"), false);
  assert.equal(hasCatalogKey(entries, "inherited"), false);

  assert.equal(Object.getPrototypeOf(entries), beforePrototype);
  assert.deepEqual(Reflect.ownKeys(entries), beforeKeys);
  assert.deepEqual(Object.getOwnPropertyDescriptors(entries), beforeDescriptors);
  assert.deepEqual(beforeKeys.map((key) => entries[key]), beforeValues);
});

test("lists matching own enumerable keys in UTF-16 lexicographic order", () => {
  const inherited = { prefixInherited: true };
  const entries = Object.create(inherited);
  Object.defineProperties(entries, {
    "pre10": { value: 10, enumerable: true },
    "pre2": { value: 2, enumerable: true },
    "PreUpper": { value: 1, enumerable: true },
    "preLower": { value: 1, enumerable: true },
    other: { value: 1, enumerable: true },
    hidden: { value: 1, enumerable: false },
  });
  const symbol = Symbol("pre-symbol");
  entries[symbol] = true;

  assert.equal(typeof listCatalogKeys, "function");
  assert.deepEqual(listCatalogKeys(entries, "pre"), ["pre10", "pre2", "preLower"]);
  assert.deepEqual(listCatalogKeys(entries, ""), ["PreUpper", "other", "pre10", "pre2", "preLower"]);
  assert.deepEqual(listCatalogKeys(entries, "missing"), []);
});

test("does not mutate the catalog while listing keys", () => {
  const reference = { nested: true };
  const prototype = { inherited: reference };
  const entries = Object.create(prototype);
  Object.defineProperty(entries, "preHidden", {
    value: reference,
    enumerable: false,
    writable: false,
    configurable: false,
  });
  Object.defineProperty(entries, "preVisible", {
    value: reference,
    enumerable: true,
    writable: false,
    configurable: false,
  });
  const symbol = Symbol("key");
  Object.defineProperty(entries, symbol, { value: reference, enumerable: true });
  const beforeKeys = Reflect.ownKeys(entries);
  const beforeDescriptors = Object.getOwnPropertyDescriptors(entries);

  const result = listCatalogKeys(entries, "pre");

  assert.deepEqual(result, ["preVisible"]);
  assert.notEqual(result, beforeKeys);
  assert.equal(Object.getPrototypeOf(entries), prototype);
  assert.deepEqual(Reflect.ownKeys(entries), beforeKeys);
  assert.deepEqual(Object.getOwnPropertyDescriptors(entries), beforeDescriptors);
  assert.equal(entries.preVisible, reference);
});
