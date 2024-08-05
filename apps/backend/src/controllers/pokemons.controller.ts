import { Request, Response } from 'express';
import * as pokemonService from '../services/pokemons.service.js';

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = await pokemonService.getAllPokemons();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error });
  }
};
