import apiClient from './apiClient';
import { Pokemon } from '@repo/shared-types';

export const getPokemons = async (): Promise<Pokemon[]> => {
  try {
    const response = await apiClient.get<Pokemon[]>('/api/pokemons');

    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons', error);
    throw error;
  }
};
