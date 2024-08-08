import { AxiosRequestConfig } from 'axios';
import { Pokemon } from '../types/pokemons';
import apiClient from './apiClient';

export const getPokemons = async (token?: string): Promise<Pokemon[]> => {
  const config = buildConfig(token);

  try {
    const response = await apiClient.get<Pokemon[]>('/api/pokemons', config);

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
