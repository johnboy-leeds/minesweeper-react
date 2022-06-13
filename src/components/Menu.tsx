import React from "react";
import { difficulties } from "../constants";
import { Difficulty } from "../interfaces";
import {
  flagActionDescription,
  unconverActionDescription,
} from "../utils/statusUtils";

interface Props {
  onSelectDifficulty(difficulty: Difficulty): void;
}

const Menu: React.FC<Props> = ({ onSelectDifficulty }) => {
  return (
    <div className="c-game-container">
      <div className="c-main-menu">
        <h1>Minesweeper</h1>
        <h2>How to play</h2>
        <ul className="c-main-menu__instructions">
          <li>The grid contains randomly placed mines 💣</li>
          <li>{`${unconverActionDescription()} a cell to uncover it`}</li>
          <li>{`${flagActionDescription()} a cell to mark suspected mines 🚩`}</li>
          <li>Clear all cells that don't contain mines to win 😎</li>
          <li>Hit a mine and you lose 💀</li>
        </ul>
        <h2>Choose difficulty</h2>
        <ul className="c-difficulty-select">
          {difficulties.map((difficulty: Difficulty) => (
            <li key={difficulty.label} className="c-difficulty-select__item">
              <button
                onClick={() => onSelectDifficulty(difficulty)}
                className="c-difficulty-select__button"
              >
                {difficulty.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
