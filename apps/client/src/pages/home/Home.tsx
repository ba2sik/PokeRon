import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { usePokemons } from '../../hooks/usePokemons';
import React, { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import QueryWrapper from '../../components/QueryWrapper/QueryWrapper';

const Home: React.FC = () => {
  const basicPokemonsQueryResults = usePokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const basicPokemons = basicPokemonsQueryResults.data ?? [];
  const filteredPokemons = basicPokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col items-center min-w-[60vw] h-screen">
      <h1 className="text-center text-7xl p-5"> PokéRon</h1>
      <Search
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <QueryWrapper queryResults={basicPokemonsQueryResults}>
        <Pokedex
          basicPokemons={filteredPokemons}
          key={debouncedSearchTerm} // a key is needed in order to re-render the component
        />
      </QueryWrapper>
    </div>
  );
};

export default Home;
