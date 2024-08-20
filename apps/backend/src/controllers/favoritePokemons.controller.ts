import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import pokemonsService from '../services/pokemons.service';
import { isNotNullOrUndefined, isNullOrUndefined } from '../utils/types';

export const deleteFavoritePokemon = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;

  if (isNullOrUndefined(accessToken)) {
    return res.status(401).json({ message: 'No access token provided' });
  }

  try {
    const user = await AuthService.getUserByToken(accessToken);

    if (!user) {
      return res.status(401).json({ message: 'Access token is invalid' });
    }

    const pokemonId = parseInt(req.params.id);
    const deletedFavoriteCard = await pokemonsService.deleteFavoritePokemon({
      pokemon_id: pokemonId,
      user_id: user.id,
    });

    if (isNotNullOrUndefined(deletedFavoriteCard)) {
      return res.status(200).end();
    } else {
      return res.status(500).json({
        message: `Could not delete favorite card for user ${user.id} and pokemon ${pokemonId}`,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(404)
        .json({ message: 'Error deleting favorite card', error: error.message });
    }

    next(error);
  }
};

export const addFavoritePokemon = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;

  if (isNullOrUndefined(accessToken)) {
    return res.status(401).json({ message: 'No access token provided' });
  }

  try {
    const user = await AuthService.getUserByToken(accessToken);

    if (!user) {
      return res.status(401).json({ message: 'Access token is invalid' });
    }

    const pokemonId = parseInt(req.params.id);
    const favoriteCard = await pokemonsService.addFavoritePokemon({
      pokemon_id: pokemonId,
      user_id: user.id,
    });

    if (isNotNullOrUndefined(favoriteCard)) {
      return res.status(201).end();
    } else {
      return res.status(500).json({
        message: `Could not add favorite card for user ${user.id} and pokemon ${pokemonId}`,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(409).json({ message: 'Error adding favorite card', error: error.message });
    }

    next(error);
  }
};
