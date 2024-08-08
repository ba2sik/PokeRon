import { Request, Response } from 'express';
import pokemonService from '../services/pokemons.service.js';
import { getBearerToken } from '../utils/auth';
import AuthService from '../services/auth.service';

export const getPokemons = async (req: Request, res: Response) => {
  const authHeader = req.get('authorization');
  const token = authHeader ? getBearerToken(authHeader) : null;

  try {
    const pokemons = await pokemonService.getPokemons();

    if (token) {
      const user = await AuthService.getUserByToken(token);
      if (user) {
        console.log(user?.id);
      }
    }

    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error });
  }
};
