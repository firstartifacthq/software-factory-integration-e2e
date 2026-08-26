import assert from "node:assert/strict";
import test from "node:test";

import { formatEntry } from "../src/format.js";

test("formats a named string value", () => {
  assert.equal(formatEntry("alpha", "baseline-alpha"), "alpha: baseline-alpha");
});

test("preserves empty-string concatenation semantics", () => {
  assert.equal(formatEntry("", "value"), ": value");
  assert.equal(formatEntry("name", ""), "name: ");
});

test("coerces numeric values using JavaScript concatenation", () => {
  assert.equal(formatEntry("count", 3), "count: 3");
});
