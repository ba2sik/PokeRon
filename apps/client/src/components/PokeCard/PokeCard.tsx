import React from "react";

export type PokeCardProps = {
  name: string;
};

const PokeCard: React.FC<PokeCardProps> = ({ name }) => {
  return (
    <div className="card bg-base-100 m-4 w-60 shadow-xl">
      <img
        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
        alt="shoes"
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
