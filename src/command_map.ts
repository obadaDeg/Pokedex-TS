import type { State } from "./state.js";

export async function commandMap(state: State) {
  state.pokeAPI
    .fetchLocations()
    .then(async (locations) => {
      console.log(locations.results)
      for (const location of locations.results) {
        console.log(location.name);
        const locationData = await state.pokeAPI.fetchLocation(location.name);
        
      }
    })
    .catch((error) => {
      console.error("Error fetching locations:", error);
    });
}
