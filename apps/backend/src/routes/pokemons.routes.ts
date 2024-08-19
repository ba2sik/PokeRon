import { Router } from 'express';
import { getPokemons } from '../controllers/pokemons.controller.js';
import { favoritePokemonsRouter } from './favoritePokemons.routes';

export const pokemonsRouter = Router();

pokemonsRouter.get('/', getPokemons);
pokemonsRouter.use('/favorites', favoritePokemonsRouter);
