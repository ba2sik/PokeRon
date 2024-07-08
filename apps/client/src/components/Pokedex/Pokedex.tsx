import React from 'react';
import PokeCard from '../PokeCard/PokeCard';
import { BasicPokemon } from '../../types/pokemons';

type PokedexProps = {
  // Note: I know that "Pokemons" isn't the plural, but I use the "s" to distinguish
  pokemons: BasicPokemon[];
};

const Pokedex: React.FC<PokedexProps> = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.map(({ name, id }) => (
        <PokeCard
          name={name}
          key={id}
        />
      ))}
    </div>
  );
};

export default Pokedex;
