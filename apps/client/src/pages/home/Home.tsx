import { usePokemons } from '../../hooks/usePokemons';
import React, { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Pokedex, QueryWrapper, Search } from '../../components';
import PokeRonLogo from '/pokeron.png';

const Home: React.FC = () => {
  const basicPokemonsQueryResults = usePokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const basicPokemons = basicPokemonsQueryResults.data ?? [];
  const filteredPokemons = basicPokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col items-center min-w-[60vw] flex-1 overflow-auto">
      <img
        src={PokeRonLogo}
        className="h-40"
        alt="PokeRon Logo"
      />
      <Search
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <QueryWrapper queryResults={basicPokemonsQueryResults}>
        <Pokedex
          basicPokemons={filteredPokemons}
          key={debouncedSearchTerm}
        />
      </QueryWrapper>
    </div>
  );
};

export default Home;
