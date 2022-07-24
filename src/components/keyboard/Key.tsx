import React from "react";
import styled from "styled-components";

interface Props {
  binding: string;
  onPress: () => void;
  textColor: string;
  backgroundColor: string;
}

const Key: React.FC<Props> = ({
  binding,
  onPress,
  textColor,
  backgroundColor,
}) => {
  return (
    <Button
      textColor={textColor}
      backgroundColor={backgroundColor}
      onClick={onPress}
    >
      {binding}
    </Button>
  );
};

interface ButtonProps {
  textColor: string;
  backgroundColor: string;
}

const Button = styled.div<ButtonProps>`
  font-weight: bold;
  font-size: smaller;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  margin: 2.5px;
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
