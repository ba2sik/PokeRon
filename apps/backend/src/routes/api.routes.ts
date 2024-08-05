import { Router } from 'express';
import { pokemonsRouter } from './pokemons.routes.js';

export const apiRouter = Router();

apiRouter.use('/pokemons', pokemonsRouter);
