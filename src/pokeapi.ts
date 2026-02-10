export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = `${PokeAPI.baseURL}/location-area`;
    const response = await fetch(pageURL || url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }
    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }
    return response.json();
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  location: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      version: {
        name: string;
        url: string;
      };
      max_chance: number;
      encounter_details: {
        min_level: number;
        max_level: number;
        chance: number;
        method: {
          name: string;
          url: string;
        };
        condition_values: {
          name: string;
          url: string;
        }[];
      }[];
    }[];
  }[];
};
