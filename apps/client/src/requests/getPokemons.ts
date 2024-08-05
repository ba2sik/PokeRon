import axios from 'axios';

const apiUrl = 'http://localhost:2999/api/pokemons';

type TODO = {
  name: string;
  id: number;
  isFavorite: boolean;
};

export const getBasicPokemons = async () => {
  try {
    const response = await axios.get<TODO[]>(apiUrl);

    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons', error);
    throw error;
  }
};
