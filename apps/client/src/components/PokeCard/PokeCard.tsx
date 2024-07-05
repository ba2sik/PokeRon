import React from "react";
import { Card, CardProps } from "@mui/material";
import styled from "@emotion/styled";

const CustomCard = styled(Card)`
  margin: 2em;
  height: 10em;
  width: 10em;
  border-radius: spacing(0.5);
  transition: 0.3s;
  overflow: initial;
  background-color: #c9c9c9;
  display: flex;

  &:hover {
    background-color: darkgrey; // Optional: Change the background color on hover
  }
`;

const PokeCard: React.FC<CardProps> = ({ children }) => {
  return <CustomCard>{children}</CustomCard>;
};

export default PokeCard;
