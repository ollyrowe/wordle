import React from "react";
import styled from "styled-components";

const AppBar: React.FC = () => {
  return (
    <Container>
      <Title>Wordle</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  color: white;
  height: 60px;
  border-top: 2px solid ${(props) => props.theme.paper};
  border-bottom: 2px solid ${(props) => props.theme.paper};
`;

const Title = styled.h1`
  margin: auto;
`;

export default AppBar;
