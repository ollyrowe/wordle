import React from "react";
import styled from "styled-components";
import { useShake } from "../../hooks/useShake";
import { TARGET_WORD_LENGTH } from "../../misc/constants";
import { Word } from "../../model/Word";
import Shake from "../animations/Shake";
import Tile from "./Tile";

interface Props {
  word: Word;
}

const Row: React.FC<Props> = ({ word }) => {
  const shake = useShake(word.shakeCount);

  return (
    <Shake shaking={shake}>
      <Container>
        {new Array(TARGET_WORD_LENGTH).fill(0).map((_, index) => (
          <Tile key={index} letter={word?.letterAt(index)} />
        ))}
      </Container>
    </Shake>
  );
};

const Container = styled.div`
  display: flex;
`;

export default Row;
