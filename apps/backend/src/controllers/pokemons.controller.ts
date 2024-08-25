import { Request, Response } from 'express';
import { enrichPokemonsWithUserFavorites, readPokemons } from '../services/pokemons.service.js';
import { getUserByToken } from '../services/auth.service';
import { isNullOrUndefined } from '../utils/types';
import { StatusCodes } from 'http-status-codes';

export const getPokemons = async (req: Request, res: Response) => {
  const accessToken = req.cookies.access_token;

  try {
    const pokemons = await readPokemons();
    const user = await getUserByToken(accessToken);

    if (isNullOrUndefined(user)) {
      return res.json(pokemons);
    }

    const pokemonsWithFavorites = await enrichPokemonsWithUserFavorites(pokemons, user.id);
    return res.json(pokemonsWithFavorites);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
