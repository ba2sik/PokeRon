import { Pokemon } from '@repo/shared-types';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdatePokemonCache = () => {
  const queryClient = useQueryClient();

  return (id: number) => {
    queryClient.setQueryData<Pokemon[]>(['pokemons'], (previousPokemons) => {
      return previousPokemons?.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, isFavorite: !pokemon.isFavorite } : pokemon,
      );
    });
  };
};
