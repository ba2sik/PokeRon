import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPokemons } from '../requests/getPokemons';
import { Pokemon } from '../types/pokemons';
import { isNullOrUndefined } from '../utils';

export const usePokemons = (options?: QueryOptions): UseQueryResult<Pokemon[]> => {
  return useQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemons,
    ...options,
  });
};

export const usePokemon = (id: number) => {
  const { data: pokemons } = usePokemons();
  const pokemon = pokemons?.find((pokemon) => pokemon.id === id);

  if (isNullOrUndefined(pokemon)) {
    throw new Error(`Pokemon with id ${id} not found`);
  }

  return pokemon;
};
