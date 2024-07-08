import { useQuery } from 'react-query';
import { getPokemonsSummaries } from '../requests/getPokemons';

export const useGetPokemonsSummaries = () => {
  const {
    data: pokemons,
    isLoading,
    error,
  } = useQuery('pokemons', getPokemonsSummaries);

  return { pokemons, isLoading, error };
};
