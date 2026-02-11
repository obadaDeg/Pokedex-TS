import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationURL: string | null;
  prevLocationURL: string | null;
  pokedex: Record<string, Pokemon>;
};

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
    }
  };

  const pokeAPI = new PokeAPI();
  return { rl, commands, pokeAPI, nextLocationURL: null, prevLocationURL: null, pokedex: {} };
}
