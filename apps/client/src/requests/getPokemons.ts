import { PokemonApi } from '@repo/poke-client';

export const getPokemonsSummaries = async () => {
  // CR: create pokemonClient so that it would look like:
  // const { data } = await pokemonClient.get('/pokemon');
  const api = new PokemonApi();
  const {
    data: { results: pokemonsSummaries = [] },
  } = await api.pokemonList();

  return pokemonsSummaries;
};
