import apiClient from './apiClient';

export const addFavoritePokemon = async (id: number) => {
  try {
    const response = await apiClient.post(`/api/pokemons/favorites/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error deleting favorite pokemon', error);
    throw error;
  }
};
