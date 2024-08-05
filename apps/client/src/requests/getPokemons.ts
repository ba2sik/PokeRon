import axios from 'axios';
import { Pokemon } from '../types/pokemons';

const apiUrl = 'http://localhost:2999/api/pokemons';

export const getPokemons = async () => {
  try {
    const response = await axios.get<Pokemon[]>(apiUrl);

    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons', error);
    throw error;
  }
};
