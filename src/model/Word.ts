import possibleAnswers from "../words/possible-answers.json";
import validWords from "../words/valid-words.json";
import { Character } from "./enums/Character";
import { Letter } from "./Letter";

export class Word {
  private letters: Letter[];

  public length: number;

  public shakeCount: number;
  public waveCount: number;

  constructor(...characters: Character[]) {
    this.letters = [];
    this.length = characters.length;

    this.shakeCount = 0;
    this.waveCount = 0;

    for (const character of characters) {
      this.letters.push(new Letter(character));
    }
  }

  public addLetter = (letter: Letter) => {
    this.letters.push(letter);
    this.length++;
  };

  public removeLastLetter = () => {
    if (this.letters.length > 0) {
      this.letters.pop();
      this.length--;
    }
  };

  public isValid = () => {
    return validWords.includes(this.toString());
  };

  public contains = (letter: Letter) => {
    return !!this.letters.find(letter.is);
  };

  public getLetters = () => {
    return this.letters;
  };

  public letterAt = (index: number) => {
    return this.letters.at(index);
  };

  public is = (word: Word) => {
    return (
      // Lengths must be identical
      this.length === word.length &&
      // Each letter in this word must match the parameterised word
      this.letters.every((letter, index) => letter.is(word.letterAt(index)))
    );
  };

  public shake() {
    this.shakeCount++;
  }

  public wave() {
    this.waveCount++;
  }

  public toString() {
    return this.letters
      .map((letter) => letter.getValue())
      .join("")
      .toLowerCase();
  }

  public static randomWord() {
    const word =
      possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

    return new Word(...(word.split("") as Character[]));
  }
}
