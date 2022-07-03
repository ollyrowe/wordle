import React from "react";
import styled, { useTheme } from "styled-components";
import Key from "./Key";
import { Character } from "../../model/enums/Character";
import { Action } from "../../model/enums/Action";
import { KeyBinding } from "../../model/enums/KeyBinding";
import { Letter } from "../../model/Letter";
import { LetterState } from "../../model/enums/LetterState";

interface Props {
  onKeyPress: (key: KeyBinding) => void;
  getAllGuessedLetters: () => Letter[];
}

const Keyboard: React.FC<Props> = ({ onKeyPress, getAllGuessedLetters }) => {
  const theme = useTheme();

  const letters = getAllGuessedLetters();

  const createKey = (keyBinding: KeyBinding, index: number) => {
    // Find all occurrences of the letter associated with the key binding
    const letterOccurrences = letters.filter(
      (letter) => letter.getValue() === keyBinding
    );

    // If there is a letter occurrence that is correct
    const correctLetter = letterOccurrences.find(
      (letter) => letter.getState() === LetterState.CORRECT
    );

    // Prioritise the correct letter, to ensure that the correct colour is used
    const letter = correctLetter || letterOccurrences[0];

    return (
      <Key
        key={index}
        binding={keyBinding}
        onPress={() => onKeyPress(keyBinding)}
        color={getKeyColour(letter)}
      />
    );
  };

  const getKeyColour = (letter?: Letter) => {
    switch (letter?.getState()) {
      case LetterState.CORRECT:
        return theme.green;
      case LetterState.IN_WORD:
        return theme.amber;
      case LetterState.INCORRECT:
        return theme.paper;
      default:
        return theme.grey;
    }
  };

  return (
    <div>
      <Container>
        <Row>{topRowKeys.map(createKey)}</Row>
        <MiddleRow>{middleRowKeys.map(createKey)}</MiddleRow>
        <Row>{bottomRowKeys.map(createKey)}</Row>
      </Container>
    </div>
  );
};

const Container = styled.div`
  padding: 6px;
  padding-top: 0px;
  max-width: 500px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
`;

const MiddleRow = styled.div`
  display: flex;
  padding-left: 12px;
  padding-right: 12px;
`;

const topRowKeys = [
  Character.Q,
  Character.W,
  Character.E,
  Character.R,
  Character.T,
  Character.Y,
  Character.U,
  Character.I,
  Character.O,
  Character.P,
];

const middleRowKeys = [
  Character.A,
  Character.S,
  Character.D,
  Character.F,
  Character.G,
  Character.H,
  Character.J,
  Character.K,
  Character.L,
];

const bottomRowKeys = [
  Action.ENTER,
  Character.Z,
  Character.X,
  Character.C,
  Character.V,
  Character.B,
  Character.N,
  Character.M,
  Action.BACKSPACE,
];

export default Keyboard;
