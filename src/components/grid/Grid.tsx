import React from "react";
import styled from "styled-components";
import { Word } from "../../model/Word";
import Row from "./Row";

interface Props {
  words: Word[];
}

const Grid: React.FC<Props> = ({ words }) => {
  return (
    <Background>
      <Container>
        {words.map((words, index) => (
          <Row key={index} word={words} />
        ))}
      </Container>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  padding: 8px;
  flex-grow: 1;
  overflow: hidden;
`;

const Container = styled.div`
  margin: auto;
  height: 100%;
  max-height: calc(120vw - 32px);
  aspect-ratio: 5 / 6;
`;

export default Grid;
