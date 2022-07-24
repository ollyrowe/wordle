import React from "react";
import styled, { useTheme } from "styled-components";
import { Letter } from "../../model/Letter";
import { LetterState } from "../../model/enums/LetterState";

interface Props {
  letter?: Letter;
}

const Tile: React.FC<Props> = ({ letter }) => {
  const theme = useTheme();

  const getTextColour = () => {
    switch (letter?.getState()) {
      case LetterState.DEFAULT:
        return theme.text;
      default:
        return "white";
    }
  };

  const getBackgroundColour = () => {
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

  const getBorderColour = () => {
    if (letter) {
      switch (letter.getState()) {
        case LetterState.DEFAULT:
          return theme.active;
        default:
          return getBackgroundColour();
      }
    }

    return theme.border;
  };

  return (
    <Box
      textColor={getTextColour()}
      backgroundColor={getBackgroundColour()}
      borderColor={getBorderColour()}
    >
      <Content>{letter?.getValue()}</Content>
    </Box>
  );
};

interface BoxProps {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

const Box = styled.div<BoxProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: xx-large;
  font-weight: bold;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  margin: 2.5px;
  border: 2px solid ${(props) => props.borderColor};
  border-radius: 2px;
  width: 20%;
  padding-bottom: calc(20% - 9px);
  max-width: 80px;
  max-height: 80px;
  user-select: none;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Tile;
