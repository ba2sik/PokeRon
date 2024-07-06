import React from "react";
import { Pokemon } from "../../types/pokemon";
import PokeCard from "../PokeCard/PokeCard";

type PokedexProps = {
  // Note: I know that "Pokemons" isn't the plural, but I use the "s" to distinguish
  pokemons: Pokemon[];
};

const Pokedex: React.FC<PokedexProps> = ({ pokemons }) => {
  return (
    <div>
      {pokemons.map((p) => (
        <PokeCard
          pokemon={p}
          key={p.id}
          style={{}}
        />
      ))}
    </div>
  );
};

export default Pokedex;
