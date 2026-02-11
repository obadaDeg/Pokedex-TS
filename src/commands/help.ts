import type { State } from "../types/index.js";

export async function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  for (const command in state.commands) {
    console.log(`- ${command}: ${state.commands[command].description}`);
  }
}
