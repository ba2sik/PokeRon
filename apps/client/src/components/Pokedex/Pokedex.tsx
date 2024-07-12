import React, { useRef, useState } from 'react';
import { BasicPokemon } from '../../types/pokemons';
import { useOnReachedBottom } from '../../hooks/useOnReachedBottom';
import { PokeCard } from '..';

type PokedexProps = {
  basicPokemons: BasicPokemon[];
};

const NUM_OF_POKEMONS_TO_LOAD = 24;

export const Pokedex: React.FC<PokedexProps> = ({ basicPokemons = [] }) => {
  const [currentShowingBasicPokemons, setCurrentShowingBasicPokemons] = React.useState(
    basicPokemons.slice(0, NUM_OF_POKEMONS_TO_LOAD),
  );
  const [currentOffset, setCurrentOffset] = useState(NUM_OF_POKEMONS_TO_LOAD);
  const divRef = useRef<HTMLDivElement>(null);

  const loadMorePokemons = () => {
    const newItems = basicPokemons.slice(currentOffset, currentOffset + NUM_OF_POKEMONS_TO_LOAD);
    setCurrentShowingBasicPokemons((prevItems) => [...prevItems, ...newItems]);
    setCurrentOffset(currentOffset + NUM_OF_POKEMONS_TO_LOAD);
  };

  useOnReachedBottom(divRef, loadMorePokemons);

  return (
    <div
      ref={divRef}
      className="flex flex-wrap justify-center mt-4 px-4 py-8 gap-8 max-h-[75vh] overflow-y-auto"
    >
      {currentShowingBasicPokemons.map(({ name, id }) => (
        <PokeCard
          name={name}
          key={id}
        />
      ))}
    </div>
  );
};
