import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationURL: string | null;
  prevLocationURL: string | null;
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
    }
  };

  const pokeAPI = new PokeAPI();
  return { rl, commands, pokeAPI, nextLocationURL: null, prevLocationURL: null };
}
