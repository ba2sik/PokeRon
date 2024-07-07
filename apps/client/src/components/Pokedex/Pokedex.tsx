import React from "react";
import PokeCard from "../PokeCard/PokeCard";

type PokedexProps = {
  // Note: I know that "Pokemons" isn't the plural, but I use the "s" to distinguish
  pokemonNames: string[];
};

const Pokedex: React.FC<PokedexProps> = ({ pokemonNames }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemonNames.map((name) => (
        <PokeCard
          name={name}
          key={name}
        />
      ))}
    </div>
  );
};

export default Pokedex;
