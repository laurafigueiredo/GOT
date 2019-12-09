import React from "react";

// Styled Components
import { SInput } from './styled';

// Interfaces
interface IInput {
    name: string;
    placeholder?: string;
    handleOnChange: ( e: any ) => void;
}

export const Input = ({
  name,
  placeholder,
  handleOnChange,
}:IInput) => {
  return (
    <SInput
      type="text"
      name={ name }
      placeholder={ placeholder }
      onChange={ (e: any) => handleOnChange(e.currentTarget) }/>
  );
};