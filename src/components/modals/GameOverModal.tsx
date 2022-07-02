import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GameOutcome } from "../../model/enums/GameOutcome";
import { Word } from "../../model/Word";
import Modal from "./Modal";

interface Props {
  open: boolean;
  targetWord: Word;
  outcome?: GameOutcome;
  onClose: () => void;
  onPlayAgain: () => void;
}

const GameOverModal: React.FC<Props> = ({
  open,
  targetWord,
  outcome,
  onClose,
  onPlayAgain,
}) => {
  // Local word state
  const [word, setWord] = useState(targetWord);

  /**
   * Synchronise word state with target word, but only when the modal
   * is supposed to be displayed to avoid giving away answer to next
   * game when the modal is closing.
   */
  useEffect(() => {
    if (open) {
      setWord(targetWord);
    }
  }, [open, targetWord]);

  const title = outcome === GameOutcome.WIN ? "Winner" : "Game Over";

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <Container>
        <WordText>{word.toString()}</WordText>
        <Button onClick={onPlayAgain}>Play Again</Button>
      </Container>
    </Modal>
  );
};

const WordText = styled.p`
  font-size: 2em;
  margin-top: 0;
  margin-bottom: 1.6em;
`;

const Container = styled.div`
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
`;

const Button = styled.div`
  color: white;
  background-color: ${(props) => props.theme.green};
  padding: 12px;
  width: 150px;
  margin: auto;
  margin-bottom: 1rem;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
`;

export default GameOverModal;
