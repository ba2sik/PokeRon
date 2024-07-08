import './Home.css';
import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { useQuery } from 'react-query';

const API_URL = 'https://pokeapi.co/api/v2';

const getPokemons = async () => {
  const response = await fetch(`${API_URL}/pokemon`);
  return response.json();
};

export type PokemonAPISimple = {
  name: string;
  url: URL;
};

function Home() {
  const { data, isLoading, isError } = useQuery('pokemons', getPokemons);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  console.log(data);
  const pokemonNames: string[] = data.results.map(
    (r: PokemonAPISimple) => r.name,
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
