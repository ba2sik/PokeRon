import "./Home.css";
import GoButton from "../../components/Button/GoButton/GoButton";
import PokeCard from "../../components/PokeCard/PokeCard";

function Home() {
  return (
    <>
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
