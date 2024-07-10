import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { usePokemons } from '../../hooks/usePokemons';
import { isAxiosError } from 'axios';
import { isNotNullOrUndefined, isNullOrUndefined } from '../../utils/arrays';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const {
    data: basicPokemons,
    isLoading: isLoadingBasicPokemons,
    error: basicPokemonsError,
  } = usePokemons();
  const [searchItem, setSearchItem] = useState('');

  const filteredPokemons = basicPokemons?.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchItem.toLowerCase());
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-7xl p-5"> PokéRon</h1>
      <Search
        text={searchItem}
        onChange={setSearchItem}
      />
      {(isLoadingBasicPokemons || isNullOrUndefined(basicPokemons)) && <h1>Loading...</h1>}
      {isNotNullOrUndefined(basicPokemonsError) && (
        <h1>{isAxiosError(basicPokemonsError) ? basicPokemonsError.message : 'unknown error'}</h1>
      )}
      <Pokedex basicPokemons={filteredPokemons || []} />
    </div>
  );
};

export default Home;
