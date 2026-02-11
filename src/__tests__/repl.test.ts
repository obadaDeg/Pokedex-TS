import { cleanInput } from "../repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "map",
    expected: ["map"],
  },
  {
    input: "   ",
    expected: ["   "],
  },
  {
    input: "explore pastoria-city-area",
    expected: ["explore", "pastoria-city-area"],
  },
  {
    input: "  CATCH  PIKACHU  ",
    expected: ["catch", "pikachu"],
  },
  {
    input: "help",
    expected: ["help"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
