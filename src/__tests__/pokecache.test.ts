import { describe, expect, test } from "vitest";
import { Cache } from "../api/pokecache";

describe("Cache", () => {
  test("add and get a value", () => {
    const cache = new Cache(60000);
    cache.add("key1", "value1");
    expect(cache.get("key1")).toBe("value1");
    cache.stopReapLoop();
  });

  test("get returns undefined for missing key", () => {
    const cache = new Cache(60000);
    expect(cache.get("missing")).toBeUndefined();
    cache.stopReapLoop();
  });

  test("overwrite existing key", () => {
    const cache = new Cache(60000);
    cache.add("key", "first");
    cache.add("key", "second");
    expect(cache.get("key")).toBe("second");
    cache.stopReapLoop();
  });

  test("multiple independent keys", () => {
    const cache = new Cache(60000);
    cache.add("a", 1);
    cache.add("b", 2);
    cache.add("c", 3);
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
    cache.stopReapLoop();
  });

  test("caches objects by reference", () => {
    const cache = new Cache(60000);
    const obj = { name: "pikachu", id: 25 };
    cache.add("pokemon", obj);
    expect(cache.get("pokemon")).toBe(obj);
    cache.stopReapLoop();
  });

  test.concurrent.each([
    { interval: 200, waitMs: 500, expectFound: false },
    { interval: 5000, waitMs: 100, expectFound: true },
  ])(
    "reap removes entry after $interval ms (wait $waitMs ms)",
    async ({ interval, waitMs, expectFound }) => {
      const cache = new Cache(interval);
      cache.add("key", "val");

      await new Promise((resolve) => setTimeout(resolve, waitMs));

      if (expectFound) {
        expect(cache.get("key")).toBe("val");
      } else {
        expect(cache.get("key")).toBeUndefined();
      }
      cache.stopReapLoop();
    }
  );
});
