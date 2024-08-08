import * as pokeClient from '@repo/poke-client';
import { PokemonSummary } from '@repo/poke-client';
import { Pokemon } from 'client/src/types/pokemons';
import { URL_ID_SEGMENT_INDEX } from '../types/api';
import { extractUrlPathSegment } from '../utils/urlExtractor';
import { prisma } from '../index';

// @ts-expect-error weird ass usage
const api = new pokeClient.default.PokemonApi();

const POKEMONS_COUNT = 1000;

export default {
  getPokemons,
  addUserFavoritePokemons,
};

async function getPokemons(): Promise<Pokemon[]> {
  try {
    const {
      data: { results: pokemonsSummaries = [] },
    } = await api.pokemonList(POKEMONS_COUNT);

    return pokemonsSummaries.map(mapPokemonSummaryToBasicPokemon);
  } catch (error) {
    console.error('Error fetching pokemons', error);
    throw error;
  }
}

async function addUserFavoritePokemons(pokemons: Pokemon[], userId: string): Promise<Pokemon[]> {
  try {
    console.log(userId);
    const favoriteCards = await prisma.favoriteCard.findMany({
      where: {
        user_id: userId,
      },
    });

    for (const favoriteCard of favoriteCards) {
      pokemons[favoriteCard.pokemon_id - 1].isFavorite = true;
    }

    return pokemons;
  } catch (error) {
    console.error('Error fetching favorite cards', error);
    throw error;
  }
}

const mapPokemonSummaryToBasicPokemon = (pokemonSummary: PokemonSummary): Pokemon => {
  const pokemonId = extractUrlPathSegment(pokemonSummary.url, URL_ID_SEGMENT_INDEX);

  return {
    name: pokemonSummary.name,
    id: Number(pokemonId),
    isFavorite: false,
  };
};
