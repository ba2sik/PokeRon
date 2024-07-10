import { PokemonApi, PokemonSummary } from '@repo/poke-client';
import { extractUrlPathSegment } from '../utils/urlExtractor';
import { URL_ID_SEGMENT_INDEX } from '../constants/api';
import { BasicPokemon } from '../types/pokemons';

const POKEMONS_COUNT = 1000;

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const getBasicPokemons = async () => {
  const api = new PokemonApi();
  try {
    await wait(2000);
    const {
      data: { results: pokemonsSummaries = [] },
    } = await api.pokemonList(POKEMONS_COUNT);
    return pokemonsSummaries.map(mapPokemonSummaryToBasicPokemon);
  } catch (error) {
    console.error('Error fetching pokemons', error);
    throw error;
  }
};

const mapPokemonSummaryToBasicPokemon = (pokemonSummary: PokemonSummary): BasicPokemon => ({
  name: pokemonSummary.name,
  id: extractUrlPathSegment(pokemonSummary.url, URL_ID_SEGMENT_INDEX),
});
