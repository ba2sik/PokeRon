import React, { useRef, useState } from 'react';
import PokeCard from '../PokeCard/PokeCard';
import { BasicPokemon } from '../../types/pokemons';
import { useEventListener } from '../../hooks/useEventListener';

type PokedexProps = {
  basicPokemons: BasicPokemon[];
};

const NUM_OF_POKEMONS_TO_LOAD = 24;

const Pokedex: React.FC<PokedexProps> = ({ basicPokemons = [] }) => {
  const [currentShowingBasicPokemons, setCurrentShowingBasicPokemons] = React.useState(
    basicPokemons.slice(0, NUM_OF_POKEMONS_TO_LOAD),
  );
  const [currentOffset, setCurrentOffset] = useState(NUM_OF_POKEMONS_TO_LOAD);
  const divRef = useRef<HTMLDivElement | null>(null);

  const loadMorePokemons = () => {
    const newItems = basicPokemons.slice(currentOffset, currentOffset + NUM_OF_POKEMONS_TO_LOAD);
    setCurrentShowingBasicPokemons((prevItems) => [...prevItems, ...newItems]);
    setCurrentOffset(currentOffset + NUM_OF_POKEMONS_TO_LOAD);
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) >=
      document.documentElement.offsetHeight;
    if (bottom) {
      loadMorePokemons();
    }
  };

  useEventListener('scroll', handleScroll);

  return (
    <div
      ref={divRef}
      className="flex flex-wrap justify-center p-4 gap-8 max-h-[70vh] overflow-y-scroll"
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

export default Pokedex;
