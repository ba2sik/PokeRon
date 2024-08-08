import React, { useRef, useState } from 'react';
import { Pokemon } from '../../types/pokemons';
import { useOnReachedBottom } from '../../hooks/useOnReachedBottom';
import { PokeCard } from '..';

type PokedexProps = {
  pokemons: Pokemon[];
};

const NUM_OF_POKEMONS_TO_LOAD = 24;

export const Pokedex: React.FC<PokedexProps> = ({ pokemons = [] }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [numberOfPokemonsShowing, setNumberOfPokemonsShowing] = useState(NUM_OF_POKEMONS_TO_LOAD);

  const loadMorePokemons = () => {
    setNumberOfPokemonsShowing(numberOfPokemonsShowing + NUM_OF_POKEMONS_TO_LOAD);
  };

  useOnReachedBottom(divRef, loadMorePokemons);

  const pokemonsToRender = pokemons.slice(0, numberOfPokemonsShowing);

  return (
    <div
      ref={divRef}
      className="flex flex-wrap justify-center px-8 py-2 gap-8 overflow-y-auto"
    >
      {pokemonsToRender.map(({ id, name, isFavorite }) => (
        <PokeCard
          id={id}
          name={name}
          isFavorite={isFavorite}
          key={id}
        />
      ))}
    </div>
  );
};
