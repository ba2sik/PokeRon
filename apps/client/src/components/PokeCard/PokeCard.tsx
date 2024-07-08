import React from "react";

export type PokeCardProps = {
  name: string;
};

const PokeCard: React.FC<PokeCardProps> = ({ name }) => {
  return (
    <div className="card bg-base-100 m-4 w-60 items-center shadow-xl">
      <img
        src={`https://img.pokemondb.net/artwork/${name}.jpg`}
        alt="shoes"
        className="h-40"
      />
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{`This is ${name}`}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
