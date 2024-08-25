import { Request, Response } from 'express';
import { enrichPokemonsWithUserFavorites, readPokemons } from '../services/pokemons.service.js';
import { getUserByToken } from '../services/auth.service';
import { isNotNullOrUndefined } from '../utils/types';
import { StatusCodes } from 'http-status-codes';

export const getPokemons = async (req: Request, res: Response) => {
  const accessToken = req.cookies.access_token;

  try {
    const pokemons = await readPokemons();

    if (isNotNullOrUndefined(accessToken)) {
      const user = await getUserByToken(accessToken);
      if (user) {
        const pokemonsWithFavorites = await enrichPokemonsWithUserFavorites(pokemons, user.id);
        return res.json(pokemonsWithFavorites);
      }
    }

    return res.json(pokemons);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
