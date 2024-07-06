import "./Home.css";
import Pokedex from "../../components/Pokedex/Pokedex";
import { Pokemon } from "../../types/pokemon";

function Home() {
  const pokemons: Pokemon[] = [
    { name: "pikachu", id: 1 },
    { name: "charizard", id: 2 },
  ];

  return (
    <>
      <h1 className="text-center p-5"> PokéRon</h1>
      <Pokedex pokemons={pokemons}></Pokedex>
    </>
  );
}

export default Home;
