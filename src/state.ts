import { createInterface } from "readline";
import { commandExit } from "./commands/exit.js";
import { commandHelp } from "./commands/help.js";
import { commandMap } from "./commands/map.js";
import { commandMapb } from "./commands/mapb.js";
import { commandExplore } from "./commands/explore.js";
import { commandCatch } from "./commands/catch.js";
import { commandInspect } from "./commands/inspect.js";
import { commandPokedex } from "./commands/pokedex.js";
import { PokeAPI } from "./api/pokeapi.js";
import type { CLICommand, State } from "./types/index.js";

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands: Record<string, CLICommand> = {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: async (state: State) => await commandExit(state),
    },
    help: {
      name: "help",
      description: "Shows this help message",
      callback: async (state: State) => await commandHelp(state),
    },
    map: {
      name: "map",
      description: "Shows the map of the pokedex",
      callback: async (state: State) => await commandMap(state),
    },
    mapb: {
      name: "mapb",
      description: "Shows the previous map of the pokedex",
      callback: async (state: State) => await commandMapb(state),
    },
    explore: {
      name: "explore",
      description: "Explore a location",
      callback: async (state: State, ...args: string[]) => await commandExplore(state, ...args),
    },
    catch: {
      name: "catch",
      description: "Catch a pokemon",
      callback: async (state: State, ...args: string[]) => await commandCatch(state, ...args),
    },
    inspect: {
      name: "inspect",
      description: "Inspect a pokemon in your pokedex",
      callback: async (state: State, ...args: string[]) => await commandInspect(state, ...args),
    },
    pokedex: {
      name: "pokedex",
      description: "Shows the pokedex",
      callback: async (state: State) => await commandPokedex(state),
    },
  };

  const pokeAPI = new PokeAPI();
  return { rl, commands, pokeAPI, nextLocationURL: null, prevLocationURL: null, pokedex: {} };
}
