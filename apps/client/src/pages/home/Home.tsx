import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import Loader from '../../components/Loader/Loader';
import { usePokemons } from '../../hooks/usePokemons';
import { isAxiosError } from 'axios';
import { isNotNullOrUndefined } from '../../utils/arrays';
import React, { useMemo, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

const Home: React.FC = () => {
  const {
    data: basicPokemons = [],
    isLoading: isLoadingBasicPokemons,
    error: basicPokemonsError,
  } = usePokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const filteredPokemons = useMemo(
    () =>
      basicPokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      }),
    [basicPokemons, debouncedSearchTerm],
  );

  return (
    <div className="flex flex-col items-center min-w-[60vw] h-screen">
      <h1 className="text-center text-7xl p-5"> PokéRon</h1>
      <Search
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {isLoadingBasicPokemons ? (
        <Loader />
      ) : isNotNullOrUndefined(basicPokemonsError) ? (
        <h1>{isAxiosError(basicPokemonsError) ? basicPokemonsError.message : 'unknown error'}</h1>
      ) : (
        <Pokedex
          basicPokemons={filteredPokemons}
          key={debouncedSearchTerm} // a key is needed in order to re-render the component
        />
      )}
    </div>
  );
};

export default Home;
