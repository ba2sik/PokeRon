import { PokemonApi, PokemonSummary } from '@repo/poke-client';
import { extractUrlPathSegment } from '../utils/urlExtractor';
import { URL_ID_SEGMENT_INDEX } from '../constants/api';
import { BasicPokemon } from '../types/pokemons';

export const getBasicPokemons = async () => {
  const api = new PokemonApi();
  const {
    data: { results: pokemonsSummaries = [] },
  } = await api.pokemonList();

  return pokemonsSummaries.map(mapPokemonSummaryToBasicPokemon);
};

const mapPokemonSummaryToBasicPokemon = (pokemonSummary: PokemonSummary): BasicPokemon => ({
  name: pokemonSummary.name,
  id: extractUrlPathSegment(pokemonSummary.url, URL_ID_SEGMENT_INDEX),
});
