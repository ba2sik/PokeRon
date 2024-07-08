import { PokemonApi } from '@repo/poke-client';

export const getPokemonsSummaries = async () => {
  const api = new PokemonApi();
  const {
    data: { results: pokemonsSummaries = [] },
  } = await api.pokemonList();

  return pokemonsSummaries;
};
