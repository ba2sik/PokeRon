import { useQueryClient } from '@tanstack/react-query';
import { BasicPokemon } from '../types/pokemons';

export const useUpdatePokemonCache = () => {
  const queryClient = useQueryClient();

  return (id: number) => {
    queryClient.setQueryData<BasicPokemon[]>(['pokemons'], (previousPokemons) => {
      return previousPokemons?.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, isFavorite: !pokemon.isFavorite } : pokemon,
      );
    });
  };
};
