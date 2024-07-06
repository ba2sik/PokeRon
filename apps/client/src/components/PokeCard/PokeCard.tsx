import React from "react";
import { Card, CardProps } from "@mui/material";
import styled from "@emotion/styled";
import { Pokemon } from "../../types/pokemon";

const CustomCard = styled(Card)`
  margin: 2em;
  height: 10em;
  width: 10em;
  border-radius: spacing(0.5);
  transition: 0.3s;
  overflow: initial;
  background-color: #c9c9c9;
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: darkgrey; // Optional: Change the background color on hover
  }
`;

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  return (
    <CustomCard>
      <div>
        <span>This is the Pokemeon:</span>
        <span>{pokemon.name}</span>
      </div>
      <div>
        <span>With the id: #</span>
        <span>{pokemon.id}</span>
      </div>
    </CustomCard>
  );
};

export type PokeCardProps = {
  pokemon: Pokemon;
} & CardProps;

export default PokeCard;
