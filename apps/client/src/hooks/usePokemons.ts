import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPokemons } from '../requests/getPokemons';
import { Pokemon } from '../types/pokemons';
import { useSession } from './auth/useSession';

export const usePokemons = (options?: QueryOptions): UseQueryResult<Pokemon[]> => {
  const { data: session } = useSession();
  const token = session?.access_token;

  return useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(token),
    ...options,
  });
};
