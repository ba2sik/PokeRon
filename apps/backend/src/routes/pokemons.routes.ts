import { Router } from 'express';
import { getPokemons } from '../controllers/pokemons.controller.js';
import { favoritePokemonsRouter } from './favoritePokemons.routes';
import { checkAccessToken } from '../middlewares/checkAccessToken';

export const pokemonsRouter = Router();

pokemonsRouter.get('/', getPokemons);
pokemonsRouter.use('/favorites', checkAccessToken, favoritePokemonsRouter);
