import React from 'react';
import { FavoriteButton } from './FavoriteButton';
import { useUpdatePokemonCache } from '../../hooks/useUpdatePokemonCache';
import { useFavoriteApiOperations } from '../../hooks/useFavoriteApiOperations';
import toast from 'react-hot-toast';
import { useSession } from '../../hooks/auth/useSession';
import { LOGGED_OUT_USER, Pokemon } from '@repo/shared-types';

export const PokeCard: React.FC<Pokemon> = React.memo(function PokeCard({ id, name, isFavorite }) {
  const { data: session = LOGGED_OUT_USER } = useSession();
  const updatePokemonCache = useUpdatePokemonCache();
  const { removeFavorite, addFavorite } = useFavoriteApiOperations();

  const onFavoriteClick = () => {
    if (!session.loggedIn) {
      return toast.error('Please login to favorite a pokemon');
    }

    // TODO: export this logic to a custom toaster function
    if (isFavorite) {
      return toast.promise(removeFavorite(id), {
        loading: '...',
        success: () => {
          updatePokemonCache(id);
          return 'Pokemon removed successfully';
        },
        error: (err) => err.toString(),
      });
    }

    return toast.promise(addFavorite(id), {
      loading: '...',
      success: () => {
        updatePokemonCache(id);
        return 'Pokemon added successfully';
      },
      error: (err) => err.toString(),
    });
  };

  return (
    <div className="card bg-base-100 w-60 p-4 items-center shadow-xl hover:scale-105 hover:cursor-pointer transition duration-300 ease-in-out">
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={onFavoriteClick}
        className="absolute start-0 top-0 m-2"
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
