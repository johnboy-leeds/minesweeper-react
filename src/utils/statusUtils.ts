import { GameStatus } from "../interfaces";
import { isTouchDevice } from "./device";

export const unconverActionDescription = (): string =>
  isTouchDevice() ? "Tap" : "Left click";
export const flagActionDescription = (): string =>
  isTouchDevice() ? "Long press" : "Right click";

export const getInstruction = (gameStatus: GameStatus) => {
  const unconverAction = unconverActionDescription();
  const flagAction = flagActionDescription();

  let instruction = `${unconverAction} a cell to uncover it, ${flagAction} a cell to mark it with a flag.`;
  if (gameStatus === GameStatus.NOT_STARTED) {
    instruction = `${unconverAction} a cell to start the game.`;
  }

  if (gameStatus === GameStatus.WON) {
    instruction = `You won! ${unconverAction} the face to start a new game.`;
  }

  if (gameStatus === GameStatus.LOST) {
    instruction = `You lost! ${unconverAction} the skull to start a new game.`;
  }

  return instruction;
};
