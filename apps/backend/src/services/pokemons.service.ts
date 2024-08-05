import * as pokeClient from '@repo/poke-client';
import { PokemonSummary } from '@repo/poke-client';
import { BasicPokemon } from 'client/src/types/pokemons';
import { URL_ID_SEGMENT_INDEX } from '../types/api';
import { extractUrlPathSegment } from '../utils/urlExtractor';

// @ts-expect-error weird ass usage
const api = new pokeClient.default.PokemonApi();

const POKEMONS_COUNT = 1000;

export const getAllPokemons = async (): Promise<PokemonSummary[]> => {
  try {
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
