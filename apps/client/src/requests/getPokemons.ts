import axios, { AxiosRequestConfig } from 'axios';
import { Pokemon } from '../types/pokemons';

const apiUrl = 'http://localhost:2999/api/pokemons';

export const getPokemons = async (token?: string): Promise<Pokemon[]> => {
  const config = buildConfig(token);

  try {
    const response = await axios.get<Pokemon[]>(apiUrl, config);

    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons', error);
    throw error;
  }
};

const buildConfig = (token?: string) => {
  const config: AxiosRequestConfig = {};

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
};
