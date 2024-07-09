import React from 'react';
import PokeCard from '../PokeCard/PokeCard';
import { BasicPokemon } from '../../types/pokemons';

type PokedexProps = {
  basicPokemons: BasicPokemon[];
};

const Pokedex: React.FC<PokedexProps> = ({ basicPokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {basicPokemons.map(({ name, id }) => (
        <PokeCard
          name={name}
          key={id}
        />
      ))}
    </div>
  );
};

export default Pokedex;
