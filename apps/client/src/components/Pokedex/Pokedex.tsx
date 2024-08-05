import React, { useRef, useState } from 'react';
import { Pokemon } from '../../types/pokemons';
import { useOnReachedBottom } from '../../hooks/useOnReachedBottom';
import { PokeCard } from '..';

type PokedexProps = {
  pokemons: Pokemon[];
};

const NUM_OF_POKEMONS_TO_LOAD = 24;

export const Pokedex: React.FC<PokedexProps> = ({ pokemons = [] }) => {
  const [currentShowingPokemons, setCurrentShowingPokemons] = React.useState(
    pokemons.slice(0, NUM_OF_POKEMONS_TO_LOAD),
  );
  const [currentOffset, setCurrentOffset] = useState(NUM_OF_POKEMONS_TO_LOAD);
  const divRef = useRef<HTMLDivElement>(null);

  const loadMorePokemons = () => {
    const newItems = pokemons.slice(currentOffset, currentOffset + NUM_OF_POKEMONS_TO_LOAD);
    setCurrentShowingPokemons((prevItems) => [...prevItems, ...newItems]);
    setCurrentOffset(currentOffset + NUM_OF_POKEMONS_TO_LOAD);
  };

  useOnReachedBottom(divRef, loadMorePokemons);

  return (
    <div
      ref={divRef}
      className="flex flex-wrap justify-center px-8 py-2 gap-8 overflow-y-auto"
    >
      {currentShowingPokemons.map(({ id }) => (
        <PokeCard
          id={id}
          key={id}
        />
      ))}
    </div>
  );
};
