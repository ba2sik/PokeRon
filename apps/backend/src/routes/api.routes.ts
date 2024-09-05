import { Router } from 'express';
import { pokemonsRouter } from './pokemons.routes';
import { authRouter } from './auth.routes';

export const apiRouter = Router();

apiRouter.use('/pokemons', pokemonsRouter);
apiRouter.use('/auth', authRouter);
