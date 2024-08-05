import { PokemonApi, PokemonSummary } from '@repo/poke-client';

const api = new PokemonApi();

const POKEMONS_COUNT = 1000;

export const getAllPokemons = async (): Promise<PokemonSummary[]> => {
  try {
    const {
      data: { results: pokemonsSummaries = [] },
    } = await api.pokemonList(POKEMONS_COUNT);
    return pokemonsSummaries;
    // return pokemonsSummaries.map(mapPokemonSummaryToBasicPokemon);
  } catch (error) {
    console.error('Error fetching pokemons', error);
    throw error;
  }
};

// const mapPokemonSummaryToBasicPokemon = (pokemonSummary: PokemonSummary): BasicPokemon => ({
//   name: pokemonSummary.name,
//   id: extractUrlPathSegment(pokemonSummary.url, URL_ID_SEGMENT_INDEX),
// });
