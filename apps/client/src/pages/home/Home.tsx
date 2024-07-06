import "./Home.css";
import GoButton from "../../components/Button/GoButton/GoButton";
import Pokedex from "../../components/Pokedex/Pokedex";
import { Pokemon } from "../../types/pokemon";

function Home() {
  const pokemons: Pokemon[] = [{ name: "pikachu", id: 1 }];

  return (
    <>
      <h1> PokéRon</h1>
      <GoButton type="button">GO</GoButton>
      <Pokedex pokemons={pokemons}></Pokedex>
    </>
  );
}

export default Home;
