import React from 'react';

type PokeCardProps = {
  name: string;
};

export const PokeCard: React.FC<PokeCardProps> = ({ name }) => {
  return (
    <div className="card bg-base-100 w-60 p-4 items-center shadow-xl hover:scale-105 hover:cursor-pointer transition duration-300 ease-in-out">
      <img
        src={`https://img.pokemondb.net/artwork/${name}.jpg`}
        alt="shoes"
        className="h-40"
        loading="lazy"
      />
      <div className="card-body">
        <h2 className="card-title capitalize">{name}</h2>
        <p>{`This is ${name}`}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};
