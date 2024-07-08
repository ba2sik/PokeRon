import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import _ from 'lodash';
import { usePokemons } from '../../hooks/usePokemons';

function Home() {
  const { data: pokemons, isLoading, error } = usePokemons();
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
