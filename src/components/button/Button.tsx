import React from "react";

// Styled Components
import { SButton } from './styled';

// Interfaces
interface IButton {
    handleOnClick: () => void;
    name: string;
}

export const Button = ({
  handleOnClick = () => {},
  name,
}:IButton) => {
  return (
    <SButton
      onClick={handleOnClick}
      type='button'>
      {name}
    </SButton>
  );
};