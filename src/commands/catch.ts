import type { State } from "../types/index.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Please provide a pokemon name");
    return;
  }

  const pokemonName = args[0];
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
  const catchChance = 1 - pokemon.base_experience / 300;
  if (Math.random() < catchChance) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex[pokemonName] = pokemon;
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}
