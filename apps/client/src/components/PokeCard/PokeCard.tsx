import React from "react";
import { Card, CardProps, Typography } from "@mui/material";
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

export type PokeCardProps = {
  pokemon: Pokemon;
} & CardProps;

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  return (
    <CustomCard>
      <div>
        <Typography>This is the Pokemeon:</Typography>
        <Typography>{pokemon.name}</Typography>
      </div>
      <div>
        <Typography>With the id: #</Typography>
        <Typography>{pokemon.id}</Typography>
      </div>
    </CustomCard>
  );
};

export default PokeCard;
