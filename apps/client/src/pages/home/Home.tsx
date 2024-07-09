import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { usePokemons } from '../../hooks/usePokemons';

const Home: React.FC = () => {
  const { data: basicPokemons, isLoading, error } = usePokemons();

  if (isLoading) return <h1>Loading...</h1>;
  if (error || !basicPokemons) return <h1>{error}</h1>;

  return (
    <>
      <h1 className="text-center p-5"> PokéRon</h1>
      <Search />
      <Pokedex pokemons={pokemons} />
    </>
  );
};

export default Home;
