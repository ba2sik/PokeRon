import { Button, ButtonProps } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";

const CustomButton = styled(Button)`
  color: white;
  background-color: black;
  border-radius: 20px; // Adjust this value for more or less rounded corners

  &:hover {
    background-color: darkgrey; // Optional: Change the background color on hover
  }
`;

const GoButton: React.FC<ButtonProps> = ({ children }) => {
  return <CustomButton variant="contained">{children}</CustomButton>;
};

export default GoButton;
