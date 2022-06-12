import React from "react";
import { difficulties } from "../constants";
import { Difficulty } from "../interfaces";

interface Props {
  onSelectDifficulty(difficulty: Difficulty): void;
}

const Menu: React.FC<Props> = ({ onSelectDifficulty }) => {
  return (
    <div className="c-game-container">
      <h1>Choose difficulty</h1>
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
  );
};

export default Menu;
