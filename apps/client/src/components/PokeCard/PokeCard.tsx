import React from "react";
import { Card, CardProps } from "@mui/material";
import styled from "@emotion/styled";

const CustomCard = styled(Card)`
  margin-top: 10px;
  border-radius: spacing(0.5);
  transition: 0.3s;
  overflow: initial;
  background-color: #c9c9c9;

  &:hover {
    background-color: darkgrey; // Optional: Change the background color on hover
  }
`;

const PokeCard: React.FC<CardProps> = ({ children }) => {
  return <CustomCard>{children}</CustomCard>;
};

export default PokeCard;
