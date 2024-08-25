import { Router } from 'express';
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from '../controllers/favoritePokemons.controller';

export const favoritePokemonsRouter = Router();

favoritePokemonsRouter.post('/:id', addFavoritePokemon);
favoritePokemonsRouter.delete('/:id', removeFavoritePokemon);
