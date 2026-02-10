import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Please provide a location area name");
    return;
  }

  const locationName = args[0];
  console.log(`Exploring ${locationName}...`);

  const location = await state.pokeAPI.fetchLocation(locationName);
  console.log("Found Pokemon:");
  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
