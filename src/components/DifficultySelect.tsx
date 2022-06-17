import React from 'react';
import { difficulties } from '../constants';
import { Difficulty } from '../interfaces';

interface Props {
    onSelectDifficulty(difficulty: Difficulty): void;
    onShowInstructions(): void;
}

const DifficultySelect: React.FC<Props> = ({
    onSelectDifficulty,
    onShowInstructions,
}) => {
    return (
        <div className="c-game-container">
            <div className="c-main-menu">
                <h1>Minesweeper</h1>
                <h2>Choose difficulty</h2>
                <ul className="c-difficulty-select">
                    {difficulties.map((difficulty: Difficulty) => (
                        <li
                            key={difficulty.label}
                            className="c-difficulty-select__item"
                        >
                            <button
                                onClick={() => onSelectDifficulty(difficulty)}
                                className="c-button"
                            >
                                {difficulty.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <button onClick={onShowInstructions} className="c-button">
                    Back to instructions
                </button>
            </div>
        </div>
    );
};

export default DifficultySelect;
