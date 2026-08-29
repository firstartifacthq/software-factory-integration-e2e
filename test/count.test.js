import assert from "node:assert/strict";
import test from "node:test";

import { countCatalog } from "../src/count.js";

test("returns exact counts for matching prefixes", () => {
  const catalog = {
    alpha: "a",
    alpine: "c",
    beta: "b",
    alphabet: "d",
  };

  assert.equal(countCatalog(catalog, "al"), 3);
  assert.equal(countCatalog(catalog, "bet"), 1);
  assert.equal(countCatalog(catalog, "z"), 0);
  assert.equal(countCatalog(catalog, "beta"), 1);
  assert.equal(countCatalog(catalog, ""), 4);
});

test("matches keys case-sensitively and ignores values", () => {
  const catalog = {
    Alpha: "al",
    alpha: null,
    alpine: { prefix: "no" },
    beta: undefined,
  };

  assert.equal(countCatalog(catalog, "Al"), 1);
  assert.equal(countCatalog(catalog, "al"), 2);
});

test("counts only own enumerable string-keyed properties", () => {
  const inherited = { ancestor: "inherited" };
  const catalog = Object.create(inherited);
  Object.defineProperties(catalog, {
    alpha: { value: "visible", enumerable: true },
    alpine: { value: "hidden", enumerable: false },
  });
  const symbolKey = Symbol("alpha");
  catalog[symbolKey] = "symbol";

  assert.equal(countCatalog(catalog, "al"), 1);
  assert.equal(countCatalog(catalog, ""), 1);
});

test("does not mutate a protected caller-owned catalog", () => {
  const prototype = { inherited: "unchanged" };
  const referencedValue = { nested: true };
  const catalog = Object.create(prototype);
  Object.defineProperty(catalog, "alpha", {
    value: referencedValue,
    enumerable: true,
    writable: false,
    configurable: false,
  });
  Object.defineProperty(catalog, "alpine", {
    value: "hidden",
    enumerable: false,
    writable: false,
    configurable: false,
  });
  const symbolKey = Symbol("entry");
  Object.defineProperty(catalog, symbolKey, {
    value: "symbol",
    enumerable: true,
    writable: false,
    configurable: false,
  });

  const identity = catalog;
  const ownKeys = Reflect.ownKeys(catalog);
  const descriptors = Object.getOwnPropertyDescriptors(catalog);
  const beforeValue = catalog.alpha;

  assert.equal(countCatalog(catalog, "al"), 1);
  assert.strictEqual(catalog, identity);
  assert.strictEqual(Object.getPrototypeOf(catalog), prototype);
  assert.deepEqual(Reflect.ownKeys(catalog), ownKeys);
  assert.deepEqual(Object.getOwnPropertyDescriptors(catalog), descriptors);
  assert.strictEqual(catalog.alpha, beforeValue);
  assert.strictEqual(catalog.alpha, referencedValue);
});
