import React from 'react';
import { Pokemon } from '../../types/pokemons';
import { FavoriteButton } from './FavoriteButton';
import { useUpdatePokemonCache } from '../../hooks/useUpdatePokemonCache';
import { useFavoriteApiOperations } from '../../hooks/useFavoriteApiOperations';
import { useAuth } from '../../hooks/auth/useAuth';
import { isNotNullOrUndefined } from '../../utils';
import toast from 'react-hot-toast';

export const PokeCard: React.FC<Pokemon> = React.memo(function PokeCard({ id, name, isFavorite }) {
  const { session } = useAuth();
  const updatePokemonCache = useUpdatePokemonCache();
  const { removeFavorite, addFavorite } = useFavoriteApiOperations();
  const onFavoriteClick = () => {
    if (isNotNullOrUndefined(session) && !session.loggedIn) {
      toast.error('Please login to favorite a pokemon');
      return;
    }

    updatePokemonCache(id);

    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <div className="card bg-base-100 w-60 p-4 items-center shadow-xl hover:scale-105 hover:cursor-pointer transition duration-300 ease-in-out">
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={onFavoriteClick}
        className="absolute start-0 top-0 p-3"
      />
      <img
        src={`https://img.pokemondb.net/artwork/${name}.jpg`}
        alt="shoes"
        className="h-44 p-1"
        loading="lazy"
      />
      <div className="card-body items-center p-2">
        <h2 className="card-title capitalize">{name}</h2>
        <p className="justify-center">{`#${id}`}</p>
      </div>
    </div>
  );
});
