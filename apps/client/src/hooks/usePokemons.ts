import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPokemons } from '../requests/getPokemons';
import { Pokemon } from '@repo/shared-types';

export const usePokemons = (options?: QueryOptions): UseQueryResult<Pokemon[]> => {
  return useQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemons,
    ...options,
  });
};
