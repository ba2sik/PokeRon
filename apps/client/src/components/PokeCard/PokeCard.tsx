import React from 'react';
import { BasicPokemon } from '../../types/pokemons';
import { FavoriteButton } from './FavoriteButton';
import { usePokemon } from '../../hooks/usePokemons';
import { useQueryClient } from '@tanstack/react-query';

type PokeCardProps = Pick<BasicPokemon, 'id'>;

export const PokeCard: React.FC<PokeCardProps> = React.memo(function PokeCard({ id }) {
  const queryClient = useQueryClient();
  const { name, isFavorite } = usePokemon(id);

  const onFavoriteClick = () => {
    queryClient.setQueryData<BasicPokemon[]>(['pokemons'], (previousPokemons) => {
      return previousPokemons?.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, isFavorite: !isFavorite } : pokemon,
      );
    });
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
