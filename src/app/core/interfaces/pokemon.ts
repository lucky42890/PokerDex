export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDTO {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
