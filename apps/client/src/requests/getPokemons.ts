import { PokemonApi, PokemonSummary } from '@repo/poke-client';
import { extractUrlPathSegment } from '../utils/urlExtractor';
import { URL_ID_SEGMENT_INDEX } from '../constants/api';
import { BasicPokemon } from '../types/pokemons';

const FETCH_ALL_POKEMONS_LIMIT = -1;

export const getBasicPokemons = async () => {
  const api = new PokemonApi();
  try {
    const {
      data: { results: pokemonsSummaries = [] },
    } = await api.pokemonList(FETCH_ALL_POKEMONS_LIMIT);
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
