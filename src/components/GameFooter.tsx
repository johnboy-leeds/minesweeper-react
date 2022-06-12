import React from "react";
import { Difficulty, GameStatus } from "../interfaces";
import { getInstruction } from "../utils/statusUtils";

interface Props {
  gameStatus: GameStatus;
  difficulty: Difficulty;
  onChangeDifficulty(): void;
}

const GameFooter: React.FC<Props> = ({
  difficulty,
  gameStatus,
  onChangeDifficulty,
}) => {
  return (
    <div className="c-game-footer">
      <span className="c-game-footer__instruction">
        {getInstruction(gameStatus)}
      </span>
      <div>
        <span className="c-game-footer__difficulty">{difficulty.label}</span>
        <button
          onClick={onChangeDifficulty}
          className="c-game-footer__change-difficulty"
        >
          change
        </button>
      </div>
    </div>
  );
};

export default GameFooter;
