import React from "react";
import styled from "styled-components";
import { KeyBinding } from "../../model/enums/KeyBinding";

interface Props {
  binding: KeyBinding;
  onPress: () => void;
  color: string;
}

const Key: React.FC<Props> = ({ binding, onPress, color }) => {
  return (
    <Button color={color} onClick={onPress}>
      {binding}
    </Button>
  );
};

interface ButtonProps {
  color: string;
}

const Button = styled.div<ButtonProps>`
  font-weight: bold;
  color: white;
  background-color: ${(props) => props.color};
  margin: 4px;
  border-radius: 4px;
  width: 13vw;
  height: 13vw;
  max-width: 44px;
  max-height: 44px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
`;

export default Key;
