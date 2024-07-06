import "./Home.css";
import Pokedex from "../../components/Pokedex/Pokedex";
import { Pokemon } from "../../types/pokemon";
import Search from "../../components/Search/Search";

function Home() {
  const pokemons: Pokemon[] = [
    { name: "pikachu", id: 1 },
    { name: "charizard", id: 2 },
    { name: "squirtle", id: 3 },
    { name: "kaki", id: 4 },
  ];

  return (
    <>
      <h1 className="text-center p-5"> PokéRon</h1>
      <Search />
      <Pokedex pokemons={pokemons}></Pokedex>
    </>
  );
}

export default Home;
