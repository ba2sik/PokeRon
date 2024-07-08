import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { useQuery } from 'react-query';
import _ from 'lodash';
import { getPokemonsSummaries } from '../../requests/getPokemons';

function Home() {
  // CR: should be in a hook in a separated file. an example is down below
  const {
    data: pokemons, // Ron: how do i add type here?
    isLoading,
    isError,
  } = useQuery('pokemons', getPokemonsSummaries);
  // CR: and it would look like this here:
  // const { data, isLoading, isError } = usePokemons();
  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !pokemons) return <h1>Error...</h1>;

  const pokemonNames = _.map(pokemons, 'name');

  return (
    <>
      <h1 className="text-center p-5"> PokéRon</h1>
      <Search />
      <Pokedex pokemonNames={pokemonNames}></Pokedex>
    </>
  );
}

export default Home;

// CR: I would create a hook for the query like this:
/*
export function usePokemons(options?: QueryOptions<PokemonAPISimple>) {
  return useQuery({
    queryKey: 'pokemons',
    queryFn: getPokemons,
    ...options,
  });
}
 */
