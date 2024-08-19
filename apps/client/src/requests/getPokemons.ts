import { Pokemon } from '../types/pokemons';
import apiClient from './apiClient';

export const getPokemons = async (): Promise<Pokemon[]> => {
  try {
    const response = await apiClient.get<Pokemon[]>('/api/pokemons');

    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons', error);
    throw error;
  }
};
