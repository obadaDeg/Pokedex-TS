import type { State } from "../types/index.js";

export async function commandMapb(state: State) {
  if (!state.prevLocationURL) {
    console.log("you're on the first page");
    return;
  }

  const locations = await state.pokeAPI.fetchLocations(state.prevLocationURL);
  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;

  for (const location of locations.results) {
    console.log(location.name);
  }
}
