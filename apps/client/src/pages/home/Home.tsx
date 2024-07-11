import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { usePokemons } from '../../hooks/usePokemons';
import { isAxiosError } from 'axios';
import { isEmptyArray, isNotNullOrUndefined, isNullOrUndefined } from '../../utils/arrays';
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

  if (isLoadingBasicPokemons || isNullOrUndefined(basicPokemons)) return <h1>Loading...</h1>;
  if (isNotNullOrUndefined(basicPokemonsError) || isEmptyArray(basicPokemons)) {
    return (
      <h1>{isAxiosError(basicPokemonsError) ? basicPokemonsError.message : 'unknown error'}</h1>
    );
  }

  return (
    <>
      <h1 className="text-center text-7xl p-5"> PokéRon</h1>
      <Search
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Pokedex
        basicPokemons={filteredPokemons}
        key={debouncedSearchTerm} // a key is needed in order to re-render the component
      />
    </>
  );
};

export default Home;
