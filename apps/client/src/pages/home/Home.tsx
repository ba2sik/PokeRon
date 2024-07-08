import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { useQuery } from 'react-query';
import { BasicPokemon } from '../../types/api/apiTypes';
import { PokemonApi } from '@repo/poke-client';

// CR: should be in requests folder and not here
const getPokemons = async () => {
  // CR: create pokemonClient so that it would look like:
  // const { data } = await pokemonClient.get('/pokemon');
  const api = new PokemonApi();
  const {
    data: { results: pokemonsSummaries = [] },
  } = await api.pokemonList();

  return pokemonsSummaries;
};

function Home() {
  // CR: should be in a hook in a separated file. an example is down below
  const {
    data: pokemons, // Ron: how do i add type here?
    isLoading,
    isError,
  } = useQuery('pokemons', getPokemons);
  // CR: and it would look like this here:
  // const { data, isLoading, isError } = usePokemons();
  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !pokemons) return <h1>Error...</h1>;

  // Also I would create a generic extract function so that it would look like this:
  // const pokemonNames = extract(data.results, 'name');
  // OR:
  // const pokemonNames = extract(data.results, ({ name }) => name);
  // OR:
  // const pokemonNames = extract(data.results, pokemon => pokemon.name);
  const pokemonNames = pokemons.map<string>(
    (pokemon: BasicPokemon) => pokemon.name,
  );

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
