import { Router } from 'express';
import {
  addFavoritePokemon,
  deleteFavoritePokemon,
} from '../controllers/favoritePokemons.controller';

export const favoritePokemonsRouter = Router();

favoritePokemonsRouter.post('/:id', addFavoritePokemon);
favoritePokemonsRouter.delete('/:id', deleteFavoritePokemon);
