import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { usePokemons } from '../../hooks/usePokemons';
import { isAxiosError } from 'axios';
import { isEmptyArray, isNotNullOrUndefined, isNullOrUndefined } from '../../utils/arrays';

const Home: React.FC = () => {
  const {
    data: basicPokemons,
    isLoading: isLoadingBasicPokemons,
    error: basicPokemonsError,
  } = usePokemons();

  if (isLoadingBasicPokemons || isNullOrUndefined(basicPokemons)) return <h1>Loading...</h1>;
  if (isNotNullOrUndefined(basicPokemonsError) || isEmptyArray(basicPokemons)) {
    return (
      <h1>{isAxiosError(basicPokemonsError) ? basicPokemonsError.message : 'unknown error'}</h1>
    );
  }

  const currentShowingBasicPokemons = basicPokemons.slice(0, 20);

  return (
    <>
      <h1 className="text-center p-5"> PokéRon</h1>
      <Search />
      <Pokedex basicPokemons={currentShowingBasicPokemons} />
    </>
  );
};

export default Home;
