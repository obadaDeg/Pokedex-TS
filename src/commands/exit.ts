import type { State } from "../types/index.js";

export async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  state.rl.close();
  process.exit(0);
}
