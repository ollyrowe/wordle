import React from "react";
import AppBar from "./components/appbar/AppBar";
import Grid from "./components/grid/Grid";
import Keyboard from "./components/keyboard/Keyboard";
import styled, { ThemeProvider } from "styled-components";
import { useGame } from "./hooks/useGame";
import { useThemeToggle } from "./hooks/useThemeToggle";
import GameOverModal from "./components/modals/GameOverModal";

const App: React.FC = () => {
  const game = useGame();

  const theme = useThemeToggle();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar />
        <Grid words={game.attempts} />
        <Keyboard
          onKeyPress={game.onKeyPress}
          getAllGuessedLetters={game.getAllGuessedLetters}
        />
        <GameOverModal
          outcome={game.outcome}
          targetWord={game.targetWord}
          open={game.displayOutcome}
          onClose={game.closeOutcome}
          onPlayAgain={game.reset}
        />
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background};
`;

export default App;
