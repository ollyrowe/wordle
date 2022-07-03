import { Character } from "./enums/Character";
import { LetterState } from "./enums/LetterState";

export class Letter {
  private value: Character;
  private state = LetterState.DEFAULT;

  constructor(value: Character) {
    this.value = value;
  }

  public getState = () => {
    return this.state;
  };

  public setState = (state: LetterState) => {
    this.state = state;
  };

  public getValue = () => {
    return this.value;
  };

  public is = (letter?: Letter) => {
    return letter && this.value.toLowerCase() === letter.value.toLowerCase();
  };
}
