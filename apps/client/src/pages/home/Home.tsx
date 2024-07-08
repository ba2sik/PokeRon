import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import _ from 'lodash';
import { useGetPokemonsSummaries } from '../../hooks/useGetPokemonsSummaries';

function Home() {
  // CR: should be in a hook in a separated file. an example is down below

  // CR: and it would look like this here:
  // const { data, isLoading, isError } = usePokemons();
  const { pokemons, isLoading, error } = useGetPokemonsSummaries();
  if (isLoading) return <h1>Loading...</h1>;
  if (error || !pokemons) return <h1>{error}</h1>;

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
