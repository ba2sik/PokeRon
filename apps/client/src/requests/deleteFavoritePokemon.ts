import apiClient from './apiClient';

export const deleteFavoritePokemon = async (id: number) => {
  try {
    const response = await apiClient.delete(`/api/pokemons/favorites/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error deleting favorite pokemon', error);
    throw error;
  }
};
