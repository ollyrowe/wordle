import { useEffect, useState } from "react";
import { NO_OF_GUESSES, TARGET_WORD_LENGTH } from "../misc/constants";
import { Action } from "../model/enums/Action";
import { GameOutcome } from "../model/enums/GameOutcome";
import { KeyBinding } from "../model/enums/KeyBinding";
import { Letter } from "../model/Letter";
import { LetterState } from "../model/enums/LetterState";
import { Word } from "../model/Word";
import { lightTheme } from "../misc/theme";

/**
 * Hook which handles the core game logic.
 *
 * @returns various game state and control methods.
 */
export const useGame = () => {
  // The word to be guessed
  const [targetWord, setTargetWord] = useState<Word>(new Word());

  // The array of word attempts
  const [attempts, setAttempts] = useState<Word[]>([]);

  // The index of the current word attempt
  const [currentAttemptIndex, setCurrentAttemptIndex] = useState(0);

  // Whether the game is over
  const [over, setOver] = useState(false);

  // The outcome of the game
  const [outcome, setOutcome] = useState<GameOutcome>();

  // Whether the outcome of the game should be displayed to the user
  const [displayOutcome, setDisplayOutcome] = useState(false);

  /**
   * Initialises a new instance of the game.
   */
  const initialiseGame = () => {
    const updatedAttempts = [];

    for (let i = 0; i < NO_OF_GUESSES; i++) {
      updatedAttempts.push(new Word());
    }

    setAttempts(updatedAttempts);

    setCurrentAttemptIndex(0);

    const word = Word.randomWord();

    // Log the target word to the console
    console.log(
      `%c${word.toString().toUpperCase()}`,
      `color: ${lightTheme.green}; font-size: 2rem; font-weight: bold`
    );

    setTargetWord(word);

    setDisplayOutcome(false);

    setOver(false);
  };

  /**
   * Upon initial render, initialise a new game.
   */
  useEffect(() => {
    initialiseGame();
  }, []);

  /**
   * Keyboard key press callback which handles core game logic.
   */
  const onKeyPress = (key: KeyBinding) => {
    // If the game isn't already over
    if (!over) {
      // Create a temporary new attempts object
      const updatedAttempts = [...attempts];

      // The current word attempt
      const currentWord = updatedAttempts[currentAttemptIndex];

      // Invoke various behaviour based on the key pressed
      switch (key) {
        case Action.ENTER:
          if (currentWord.length === TARGET_WORD_LENGTH) {
            // Check that the word is a valid word
            if (currentWord.isValid()) {
              // Calculate letter statuses
              const letters = currentWord.getLetters();

              for (let i = 0; i < letters.length; i++) {
                const letter = letters[i];

                if (targetWord.letterAt(i)?.is(letter)) {
                  letter.setState(LetterState.CORRECT);
                } else if (targetWord.contains(letter)) {
                  // Get all letters which came before this letter in the current word
                  const precedingLetters = [...letters].slice(0, i);

                  // Filter these letters for occurrences of the same letter
                  const precedingOccurrences = precedingLetters.filter(
                    (precedingLetter) => precedingLetter.is(letter)
                  );

                  // Get all occurrences of the letter within the target word
                  const targetOccurrences = targetWord
                    .getLetters()
                    .filter((targetWordLetter) => targetWordLetter.is(letter));

                  // Ensure that only the correct number of letters are marked as 'In Word'
                  if (precedingOccurrences.length < targetOccurrences.length) {
                    letter.setState(LetterState.IN_WORD);
                  } else {
                    letter.setState(LetterState.INCORRECT);
                  }
                } else {
                  letter.setState(LetterState.INCORRECT);
                }
              }

              // Whether the player is on their last attempt
              const isFinalAttempt = currentAttemptIndex === NO_OF_GUESSES - 1;

              // Check if word is correct
              if (currentWord.is(targetWord)) {
                // Handle the game end
                endGame(GameOutcome.WIN);
              } else if (isFinalAttempt) {
                // Handle the game end
                endGame(GameOutcome.LOSS);
              } else {
                // Move on to the next word attempt
                setCurrentAttemptIndex(currentAttemptIndex + 1);
              }
            } else {
              // Otherwise, shake the word!
              currentWord.shake();
            }
          } else {
            // Shake word to indicate not enough letters
            currentWord.shake();
          }
          break;
        case Action.BACKSPACE:
          if (currentWord.length > 0) {
            currentWord.removeLastLetter();
          }
          break;
        default:
          if (currentWord.length < TARGET_WORD_LENGTH) {
            currentWord.addLetter(new Letter(key));
          }
          break;
      }

      setAttempts(updatedAttempts);
    }
  };

  /**
   * Invokes the end-game logic based on a specified outcome.
   *
   * @param outcome - the outcome of the game.
   */
  const endGame = (outcome: GameOutcome) => {
    // Set the game outcome
    setOutcome(outcome);
    // Display the outcome
    setDisplayOutcome(true);
    // Set the over state to be true
    setOver(true);
  };

  /**
   * Returns an array of all of the letters guessed so far.
   */
  const getAllGuessedLetters = () => {
    // Get all of the letters from the word attempts and convert to an array
    return ([] as Letter[]).concat(
      ...attempts.map((word) => word.getLetters())
    );
  };

  /**
   * Resets the display outcome state.
   */
  const closeOutcome = () => {
    setDisplayOutcome(false);
  };

  return {
    targetWord,
    attempts,
    over,
    outcome,
    displayOutcome,
    closeOutcome,
    onKeyPress,
    getAllGuessedLetters,
    reset: initialiseGame,
  };
};
