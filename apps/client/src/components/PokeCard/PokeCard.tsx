import React from "react";
import { Pokemon } from "../../types/pokemon";

export type PokeCardProps = {
  pokemon: Pokemon;
};

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pokemon.id}</h2>
        <p>
          This is
          {pokemon.name}
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
