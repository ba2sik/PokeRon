import "./Home.css";
import GoButton from "../../components/Button/GoButton/GoButton";
import PokeCard from "../../components/PokeCard/PokeCard";

function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-red-700 underline text-center">
        Hello world!
      </h1>

      <h1> PokéRon</h1>
      <GoButton type="button">GO</GoButton>
      <div className="cards">
        <PokeCard>Hello</PokeCard>
        <PokeCard>Hello</PokeCard>
        <PokeCard>Hello</PokeCard>
        <PokeCard>Hello</PokeCard>
        <PokeCard>Hello</PokeCard>
        <PokeCard>Hello</PokeCard>
      </div>
    </>
  );
}

export default Home;
