import { QueryOptions, useQuery, UseQueryResult } from 'react-query';
import { getBasicPokemons } from '../requests/getPokemons';
import { BasicPokemon } from '../types/pokemons';

export const usePokemons = (options?: QueryOptions): UseQueryResult<BasicPokemon[]> => {
  return useQuery({
    queryKey: 'pokemons',
    queryFn: getBasicPokemons,
    ...options,
  });
};
