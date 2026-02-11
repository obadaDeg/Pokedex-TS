import { describe, expect, test, vi } from "vitest";
import type { State } from "./state";
import type { Pokemon } from "./pokeapi";
import { commandCatch } from "./command_catch";
import { commandExplore } from "./command_explore";
import { commandInspect } from "./inspect_command";
import { commandPokdex } from "./command_pokedex";
import { commandMapb } from "./command_mapb";

const mockPokemon: Pokemon = {
  id: 25,
  name: "pikachu",
  base_experience: 112,
  height: 4,
  weight: 60,
  stats: [
    { base_stat: 35, effort: 0, stat: { name: "hp", url: "" } },
    { base_stat: 55, effort: 0, stat: { name: "attack", url: "" } },
    { base_stat: 40, effort: 0, stat: { name: "defense", url: "" } },
  ],
  types: [
    { slot: 1, type: { name: "electric", url: "" } },
  ],
};

function createMockState(overrides?: Partial<State>): State {
  return {
    rl: {} as any,
    commands: {
      test: { name: "test", description: "A test command", callback: async () => {} },
    },
    pokeAPI: {
      fetchPokemon: vi.fn().mockResolvedValue(mockPokemon),
      fetchLocations: vi.fn().mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: [{ name: "test-area", url: "" }],
      }),
      fetchLocation: vi.fn().mockResolvedValue({
        id: 1,
        name: "test-area",
        game_index: 1,
        location: { name: "test", url: "" },
        names: [],
        pokemon_encounters: [
          { pokemon: { name: "bulbasaur", url: "" }, version_details: [] },
          { pokemon: { name: "charmander", url: "" }, version_details: [] },
        ],
      }),
    } as any,
    nextLocationURL: null,
    prevLocationURL: null,
    pokedex: {},
    ...overrides,
  };
}

describe("commandCatch", () => {
  test("prints message when no pokemon name given", async () => {
    const state = createMockState();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await commandCatch(state);
    expect(spy).toHaveBeenCalledWith("Please provide a pokemon name");
    spy.mockRestore();
  });

  test("adds pokemon to pokedex on successful catch", async () => {
    const state = createMockState();
    vi.spyOn(Math, "random").mockReturnValue(0); // guarantees catch
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandCatch(state, "pikachu");

    expect(spy).toHaveBeenCalledWith("Throwing a Pokeball at pikachu...");
    expect(spy).toHaveBeenCalledWith("pikachu was caught!");
    expect(state.pokedex["pikachu"]).toBe(mockPokemon);

    spy.mockRestore();
    vi.spyOn(Math, "random").mockRestore();
  });

  test("does not add pokemon to pokedex on failed catch", async () => {
    const state = createMockState();
    vi.spyOn(Math, "random").mockReturnValue(0.99); // guarantees escape
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandCatch(state, "pikachu");

    expect(spy).toHaveBeenCalledWith("Throwing a Pokeball at pikachu...");
    expect(spy).toHaveBeenCalledWith("pikachu escaped!");
    expect(state.pokedex["pikachu"]).toBeUndefined();

    spy.mockRestore();
    vi.spyOn(Math, "random").mockRestore();
  });
});

describe("commandExplore", () => {
  test("prints message when no location name given", async () => {
    const state = createMockState();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await commandExplore(state);
    expect(spy).toHaveBeenCalledWith("Please provide a location area name");
    spy.mockRestore();
  });

  test("lists pokemon in the location area", async () => {
    const state = createMockState();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandExplore(state, "test-area");

    expect(spy).toHaveBeenCalledWith("Exploring test-area...");
    expect(spy).toHaveBeenCalledWith("Found Pokemon:");
    expect(spy).toHaveBeenCalledWith(" - bulbasaur");
    expect(spy).toHaveBeenCalledWith(" - charmander");
    spy.mockRestore();
  });
});

describe("commandInspect", () => {
  test("prints message when no pokemon name given", async () => {
    const state = createMockState();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await commandInspect(state);
    expect(spy).toHaveBeenCalledWith("Please provide a pokemon name to inspect.");
    spy.mockRestore();
  });

  test("prints not caught message for unknown pokemon", async () => {
    const state = createMockState();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await commandInspect(state, "mewtwo");
    expect(spy).toHaveBeenCalledWith("you have not caught that pokemon");
    spy.mockRestore();
  });

  test("displays pokemon details when caught", async () => {
    const state = createMockState({ pokedex: { pikachu: mockPokemon } });
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandInspect(state, "pikachu");

    expect(spy).toHaveBeenCalledWith("Name: pikachu");
    expect(spy).toHaveBeenCalledWith("Height: 4");
    expect(spy).toHaveBeenCalledWith("Weight: 60");
    expect(spy).toHaveBeenCalledWith("Stats:");
    expect(spy).toHaveBeenCalledWith("  hp: 35 (effort: 0)");
    expect(spy).toHaveBeenCalledWith("Types:");
    expect(spy).toHaveBeenCalledWith("  electric");
    spy.mockRestore();
  });
});

describe("commandPokdex", () => {
  test("lists caught pokemon", async () => {
    const state = createMockState({
      pokedex: {
        pikachu: mockPokemon,
        bulbasaur: { ...mockPokemon, name: "bulbasaur" },
      },
    });
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandPokdex(state);

    expect(spy).toHaveBeenCalledWith("Your Pokedex:");
    expect(spy).toHaveBeenCalledWith(" - pikachu");
    expect(spy).toHaveBeenCalledWith(" - bulbasaur");
    spy.mockRestore();
  });

  test("shows empty pokedex", async () => {
    const state = createMockState();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandPokdex(state);

    expect(spy).toHaveBeenCalledWith("Your Pokedex:");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});

describe("commandMapb", () => {
  test("prints first page message when no previous URL", async () => {
    const state = createMockState();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandMapb(state);

    expect(spy).toHaveBeenCalledWith("you're on the first page");
    expect(state.pokeAPI.fetchLocations).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test("fetches and displays previous page", async () => {
    const state = createMockState({ prevLocationURL: "https://pokeapi.co/api/v2/location-area?offset=0" });
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandMapb(state);

    expect(state.pokeAPI.fetchLocations).toHaveBeenCalledWith("https://pokeapi.co/api/v2/location-area?offset=0");
    expect(spy).toHaveBeenCalledWith("test-area");
    spy.mockRestore();
  });
});
