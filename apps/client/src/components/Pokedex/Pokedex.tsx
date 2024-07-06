import React from "react";
import { Pokemon } from "../../types/pokemon";
import PokeCard from "../PokeCard/PokeCard";

type PokedexProps = {
  // Note: I know that "Pokemons" isn't the plural, but I use the "s" to distinguish
  pokemons: Pokemon[];
};

const Pokedex: React.FC<PokedexProps> = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.map((p) => (
        <PokeCard
          pokemon={p}
          key={p.id}
        />
      ))}
    </div>
  );
};

export default Pokedex;
