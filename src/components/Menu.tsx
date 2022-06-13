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
          <li>
            <span className="c-main-menu__instruction-key">💣</span>The grid
            contains randomly placed mines.
          </li>
          <li>
            <span className="c-main-menu__instruction-key">👆</span>
            {`${unconverActionDescription()} a cell to uncover it.`}
          </li>
          <li>
            <div
              className="c-grid-cell c-main-menu__instruction-key"
              data-neighbour-count={3}
            >
              3
            </div>
            Uncovered cells display the number of adjacent mines.
          </li>
          <li>
            <span className="c-main-menu__instruction-key">🚩</span>
            {`${flagActionDescription()} a cell to mark suspected mines.`}
          </li>
          <li>
            <span className="c-main-menu__instruction-key">😎</span>Clear all
            cells that don't contain mines to win.
          </li>
          <li>
            <span className="c-main-menu__instruction-key">💀</span>Hit a mine
            and you lose.
          </li>
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
