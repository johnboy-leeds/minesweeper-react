import React from "react";
import { Difficulty } from "../interfaces";

interface Props {
  difficulty: Difficulty;
  onChangeDifficulty(): void;
}
const GameFooter: React.FC<Props> = ({ difficulty, onChangeDifficulty }) => {
  return (
    <div className="c-game-footer">
      <span className="c-game-footer__difficulty">{difficulty.label}</span>
      <button
        onClick={onChangeDifficulty}
        className="c-game-footer__change-difficulty"
      >
        change
      </button>
    </div>
  );
};

export default GameFooter;
