import { Request, Response } from 'express';
import pokemonService from '../services/pokemons.service.js';
import AuthService from '../services/auth.service';

export const getPokemons = async (req: Request, res: Response) => {
  const accessToken = req.cookies.access_token;

  try {
    const pokemons = await pokemonService.getPokemons();

    if (accessToken) {
      const user = await AuthService.getUserByToken(accessToken);
      if (user) {
        await pokemonService.addUserFavoritePokemons(pokemons, user.id);
      }
    }

    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error });
  }
};
