import { Router } from 'express';
import { getPokemons } from '../controllers/pokemons.controller.js';

export const pokemonsRouter = Router();

pokemonsRouter.get('/', getPokemons);
