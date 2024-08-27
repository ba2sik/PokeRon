import { Router } from 'express';
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from '../controllers/favoritePokemons.controller';
import { validateRequestParams } from '../middlewares/validateRequest';
import { pokemonIdSchema } from '@repo/shared-types';

export const favoritePokemonsRouter = Router();

favoritePokemonsRouter.post('/:id', validateRequestParams(pokemonIdSchema), addFavoritePokemon);
favoritePokemonsRouter.delete(
  '/:id',
  validateRequestParams(pokemonIdSchema),
  removeFavoritePokemon,
);
