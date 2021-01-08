export interface BasicInfo {
  name: string;
  url: string;
}

export interface PokemonDTO {
  count: number;
  next: string;
  previous: string;
  results: BasicInfo[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: any[];
  forms: any[];
  game_indices: any[];
  held_items: any[];
  location_area_encounters: string;
  moves: PokemonMove[];
  sprites: any;
  species: any;
  stats: PokemonStat[];
  types: PokemonType[];
}

export interface PokemonMove {
  move: any;
  version_group_details: any[];
}

export interface PokemonStat {
  stat: any;
  effort: number;
  base_stat: number;
}

export interface PokemonType {
  slot: number;
  type: any;
}
