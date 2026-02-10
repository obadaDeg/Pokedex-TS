export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = `${PokeAPI.baseURL}/pokemon?}`;
    const response = await fetch(pageURL || url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }
    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/pokemon/${locationName}/encounters`;
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
  location_area: {
    name: string;
    url: string;
  };
  version_details: {
    version: {
      name: string;
      url: string;
    };
    encounter_details: {
      min_level: number;
      max_level: number;
      condition_values: {
        name: string;
        url: string;
      }[];
      chance: number;
    }[];
  }[];
};
