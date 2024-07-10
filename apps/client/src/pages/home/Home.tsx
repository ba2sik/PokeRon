import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { usePokemons } from '../../hooks/usePokemons';
import { isAxiosError } from 'axios';
import { isEmptyArray, isNotNullOrUndefined, isNullOrUndefined } from '../../utils/arrays';
import React, { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

const Home: React.FC = () => {
  const {
    data: basicPokemons,
    isLoading: isLoadingBasicPokemons,
    error: basicPokemonsError,
  } = usePokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  if (isLoadingBasicPokemons || isNullOrUndefined(basicPokemons)) return <h1>Loading...</h1>;
  if (isNotNullOrUndefined(basicPokemonsError) || isEmptyArray(basicPokemons)) {
    return (
      <h1>{isAxiosError(basicPokemonsError) ? basicPokemonsError.message : 'unknown error'}</h1>
    );
  }

  const filteredPokemons = basicPokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
  });

  return (
    <>
      <h1 className="text-center text-7xl p-5"> PokéRon</h1>
      <Search
        text={searchTerm}
        onChange={setSearchTerm}
      />
      <Pokedex basicPokemons={filteredPokemons} />
    </>
  );
};

export default Home;
