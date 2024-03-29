import React from "react";
import styled from "styled-components";
import { Word } from "../../model/Word";
import Row from "./Row";
import AspectRatioRetainer from "../utils/AspectRatioRetainer";

interface Props {
  words: Word[];
}

const Grid: React.FC<Props> = ({ words }) => {
  return (
    <Background>
      <Container ratio={[5, 6]}>
        {words.map((word, index) => (
          <Row key={index} word={word} />
        ))}
      </Container>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  padding: 8px 12px;
  flex-grow: 1;
  overflow: hidden;
  justify-content: center;
`;

const Container = styled(AspectRatioRetainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 350px;
`;

export default Grid;
