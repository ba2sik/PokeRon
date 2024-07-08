import { QueryOptions, useQuery, UseQueryResult } from 'react-query';
import { getPokemonsSummaries } from '../requests/getPokemons';
import { PokemonSummary } from '@repo/poke-client';

export const usePokemons = (options?: QueryOptions): UseQueryResult<PokemonSummary[]> => {
  return useQuery({
    queryKey: 'pokemons',
    queryFn: getPokemonsSummaries,
    ...options,
  });
};
