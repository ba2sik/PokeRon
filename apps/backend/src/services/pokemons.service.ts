import * as pokeClient from '@repo/poke-client';
import { PokemonSummary } from '@repo/poke-client';
import { Pokemon } from 'client/src/types/pokemons';
import { URL_ID_SEGMENT_INDEX } from '../types/api';
import { extractUrlPathSegment } from '../utils/urlExtractor';
import { prismaClient } from '../index';
import { FavoriteCard, Prisma } from '@prisma/client';

// @ts-expect-error weird ass usage
const api = new pokeClient.default.PokemonApi();

const POKEMONS_COUNT = 1000;

export default {
  getPokemons,
  addUserFavoritePokemons,
  addFavoritePokemon,
  deleteFavoritePokemon,
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
    const favoriteCards = await prismaClient.favoriteCard.findMany({
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

async function addFavoritePokemon(favoriteCard: FavoriteCard): Promise<FavoriteCard> {
  try {
    return await prismaClient.favoriteCard.create({
      data: favoriteCard,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error(
        `The pokemon ${favoriteCard.pokemon_id} is already a favorite for user ${favoriteCard.user_id}`,
      );
    }
    throw error;
  }
}

async function deleteFavoritePokemon(favoriteCard: FavoriteCard): Promise<FavoriteCard> {
  try {
    return await prismaClient.favoriteCard.delete({
      where: {
        user_id_pokemon_id: {
          user_id: favoriteCard.user_id,
          pokemon_id: favoriteCard.pokemon_id,
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new Error(
        `Record not found for pokemon_id: ${favoriteCard.pokemon_id} and user: ${favoriteCard.user_id}`,
      );
    }
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
