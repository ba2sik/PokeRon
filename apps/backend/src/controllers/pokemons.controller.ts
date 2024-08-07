import { Request, Response } from 'express';
import pokemonService from '../services/pokemons.service.js';

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = await pokemonService.getPokemons();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error });
  }
};
