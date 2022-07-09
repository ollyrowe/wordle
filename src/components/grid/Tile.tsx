import React from "react";
import styled, { useTheme, StyledProps } from "styled-components";
import { Letter } from "../../model/Letter";
import { LetterState } from "../../model/enums/LetterState";

interface Props {
  letter?: Letter;
}

const Tile: React.FC<Props> = ({ letter }) => {
  const theme = useTheme();

  const getColour = () => {
    switch (letter?.getState()) {
      case LetterState.CORRECT:
        return theme.green;
      case LetterState.IN_WORD:
        return theme.amber;
      case LetterState.INCORRECT:
        return theme.paper;
      default:
        return theme.background;
    }
  };

  return <Box color={getColour()}>{letter?.getValue()}</Box>;
};

const getBoxBorder = ({ color, theme }: StyledProps<BoxProps>) => {
  return `2px solid ${color === theme.background ? theme.paper : color}`;
};

interface BoxProps {
  color: string;
}

const Box = styled.div<BoxProps>`
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: xx-large;
  font-weight: bold;
  background-color: ${(props) => props.color};
  margin: 2.5px;
  border: ${getBoxBorder};
  border-radius: 2px;
  width: 20%;
  padding-bottom: calc(20% - 9px);
  max-width: 80px;
  max-height: 80px;
  user-select: none;
`;

export default Tile;
