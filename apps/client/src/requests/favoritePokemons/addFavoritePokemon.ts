import apiClient from '../apiClient';

export const addFavoritePokemon = async (id: number) => {
  try {
    const response = await apiClient.post(`/api/pokemons/favorites/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error adding favorite pokemon', error);
    throw error;
  }
};
