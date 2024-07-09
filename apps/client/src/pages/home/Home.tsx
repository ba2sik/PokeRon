import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import { usePokemons } from '../../hooks/usePokemons';
import { useEffect, useState } from 'react';
import { BasicPokemon } from '../../types/pokemons';
import { extractUrlPathSegment } from '../../utils/urlExtractor';
import { URL_ID_SEGMENT_INDEX } from '../../constants/api';

const Home: React.FC = () => {
  const { data: pokemonSummaries, isLoading, error } = usePokemons();
  const [pokemons, setPokemons] = useState<BasicPokemon[]>([]);

  useEffect(() => {
    if (pokemonSummaries) {
      const pokemonsList = pokemonSummaries.map((pokemonSummary) => ({
        name: pokemonSummary.name,
        // the only way to get id of a Pokémon is to extract it from the URL path. (e.g. /api/v2/pokemon/1)
        id: extractUrlPathSegment(pokemonSummary.url, URL_ID_SEGMENT_INDEX),
      }));
      setPokemons(pokemonsList);
    }
  }, [pokemonSummaries]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error || !pokemonSummaries) return <h1>{error}</h1>;

  return (
    <>
      <h1 className="text-center p-5"> PokéRon</h1>
      <Search />
      <Pokedex pokemons={pokemons}></Pokedex>
    </>
  );
};

export default Home;
