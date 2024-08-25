import { NextFunction, Request, Response } from 'express';
import { getUserByToken } from '../services/auth.service';
import { isNotNullOrUndefined } from '../utils/types';
import { StatusCodes } from 'http-status-codes';
import { deleteFavoritePokemon, insertFavoritePokemon } from '../services/pokemons.service';

export const removeFavoritePokemon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByToken(req.cookies.access_token);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token is invalid' });
    }

    const pokemonId = parseInt(req.params.id);
    const deletedFavoriteCard = await deleteFavoritePokemon({
      pokemon_id: pokemonId,
      user_id: user.id,
    });

    if (isNotNullOrUndefined(deletedFavoriteCard)) {
      return res.status(StatusCodes.OK).end();
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `Could not delete favorite card for user ${user.id} and pokemon ${pokemonId}`,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error deleting favorite card', error: error.message });
    }

    next(error);
  }
};

export const addFavoritePokemon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByToken(req.cookies.access_token);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token is invalid' });
    }

    const pokemonId = parseInt(req.params.id);
    const favoriteCard = await insertFavoritePokemon({
      pokemon_id: pokemonId,
      user_id: user.id,
    });

    if (isNotNullOrUndefined(favoriteCard)) {
      return res.status(StatusCodes.CREATED).end();
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `Could not add favorite card for user ${user.id} and pokemon ${pokemonId}`,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error adding favorite card', error: error.message });
    }

    next(error);
  }
};
