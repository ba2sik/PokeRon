import { URL_ID_SEGMENT_INDEX } from '../types/api';
import { extractUrlPathSegment } from '../utils/urlExtractor';
import { prismaClient, redisClient } from '../index';
import { FavoriteCard, Prisma } from '@prisma/client';
import { Pokemon } from '@repo/shared-types';
import { SetOptions } from 'redis';
import { isNotNullOrUndefined } from '../utils/types';
import { hashes } from '../constants/redis';
import { PokemonApi, PokemonSummary } from '@repo/poke-client';

const api = new PokemonApi();

const setCacheConfig: SetOptions = {
  EX: 24 * 60 * 60, // 1 day
};

const POKEMONS_COUNT = 1000;

export default {
  getPokemons,
  addUserFavoritePokemons,
  addFavoritePokemon,
  deleteFavoritePokemon,
};

async function getPokemons(): Promise<Pokemon[]> {
  try {
    const ttl = await redisClient.ttl('pokemons');

    // EXPIRED OR KEY DOES NOT EXIST
    if (ttl === -2) {
      const {
        data: { results: pokemonsSummaries = [] },
      } = await api.pokemonList(POKEMONS_COUNT);

      const pokemons = pokemonsSummaries.map(mapPokemonSummaryToPokemon);
      await redisClient.set(hashes.pokemonsList, JSON.stringify(pokemons), setCacheConfig);

      return pokemons;
    }

    const storedPokemons = await redisClient.get(hashes.pokemonsList);

    if (isNotNullOrUndefined(storedPokemons)) {
      return JSON.parse(storedPokemons);
    } else {
      throw new Error('Pokemons do not exist on redis');
    }
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

const mapPokemonSummaryToPokemon = (pokemonSummary: PokemonSummary): Pokemon => {
  const pokemonId = extractUrlPathSegment(pokemonSummary.url, URL_ID_SEGMENT_INDEX);

  return {
    name: pokemonSummary.name,
    id: Number(pokemonId),
    isFavorite: false,
  };
};
