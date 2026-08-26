import assert from "node:assert/strict";
import test from "node:test";

import { formatEntry } from "../src/format.js";

test("formats a named string value", () => {
  assert.equal(formatEntry("status", "active"), "status: active");
});

test("preserves empty strings in the concatenated entry", () => {
  assert.equal(formatEntry("", "value"), ": value");
  assert.equal(formatEntry("name", ""), "name: ");
});

test("coerces numeric values using JavaScript concatenation", () => {
  assert.equal(formatEntry("count", 42), "count: 42");
});
