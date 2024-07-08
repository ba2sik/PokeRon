export type BasicPokemon = {
  name: string;
  url: URL;
};

export type BasicPokemonList = {
  count: number;
  next: URL;
  previous: URL | null;
  results: BasicPokemon[];
};
