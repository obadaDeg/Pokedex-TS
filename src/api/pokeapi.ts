import { Cache } from "./pokecache.js";
import type { ShallowLocations, Location, Pokemon } from "../types/index.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor() {
    this.cache = new Cache(60000); // 60 second cache
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }
    const data: ShallowLocations = await response.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon: ${response.statusText}`);
    }
    const data: Pokemon = await response.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }
    const data: Location = await response.json();
    this.cache.add(url, data);
    return data;
  }
}
