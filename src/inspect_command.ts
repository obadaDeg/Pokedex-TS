import { State } from "./state";

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length === 0) {
        console.log("Please provide a pokemon name to inspect.");
        return;
    }

    const pokemonName = args[0];
    const pokemon = state.pokedex[pokemonName];

    if (!pokemon) {
        console.log(`you have not caught that pokemon`);
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    pokemon.stats.forEach((stat: any) => {
        console.log(`  ${stat.stat.name}: ${stat.base_stat} (effort: ${stat.effort})`);
    });

    console.log("Types:");
    pokemon.types.forEach((type: any) => {
        console.log(`  ${type.type.name}`);
    });

}