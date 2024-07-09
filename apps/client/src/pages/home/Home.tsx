import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { usePokemons } from '../../hooks/usePokemons';
import { isAxiosError } from 'axios';
import { isEmptyArray, isNotNullOrUndefined, isNullOrUndefined } from '../../utils/arrays';

const Home: React.FC = () => {
  const { data: basicPokemons, isLoading, error } = usePokemons();

  if (isLoading || isNullOrUndefined(basicPokemons)) return <h1>Loading...</h1>;
  if (isNotNullOrUndefined(error) || isEmptyArray(basicPokemons)) {
    return <h1>{isAxiosError(error) ? error.message : 'unknown error'}</h1>;
  }

  return (
    <>
      <h1 className="text-center p-5"> PokéRon</h1>
      <Search />
      <Pokedex basicPokemons={basicPokemons} />
    </>
  );
};

export default Home;
