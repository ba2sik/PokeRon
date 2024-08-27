import apiClient from '../apiClient';
import { isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

export const addFavoritePokemon = async (id: number) => {
  try {
    const response = await apiClient.post(`/api/pokemons/favorites/${id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
      throw new Error('Please login to favorite a pokemon');
    }

    console.error('Error adding favorite pokemon', error);
    throw error;
  }
};
