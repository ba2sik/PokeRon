import { useMutation } from '@tanstack/react-query';
import { deleteFavoritePokemon } from '../requests/favoritePokemons/deleteFavoritePokemon';
import { addFavoritePokemon } from '../requests/favoritePokemons/addFavoritePokemon';

export const useFavoriteApiOperations = () => {
  const removeMutation = useMutation({
    mutationFn: deleteFavoritePokemon,
  });

  const addMutation = useMutation({
    mutationFn: addFavoritePokemon,
  });

  return {
    removeFavorite: removeMutation.mutate,
    addFavorite: addMutation.mutate,
  };
};
