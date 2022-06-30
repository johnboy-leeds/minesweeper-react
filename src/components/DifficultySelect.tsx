import React from 'react';
import { difficulties } from '../constants';
import { Difficulty } from '../interfaces';

interface Props {
    onSelectDifficulty(difficulty: Difficulty): void;
}

const DifficultySelect: React.FC<Props> = ({ onSelectDifficulty }) => {
    return (
        <>
            <div className="c-game-header">
                <h1>Choose difficulty</h1>
            </div>
            <div className="c-main-menu">
                <ul
                    className="c-difficulty-select"
                    data-testid="difficulty-select"
                >
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
            </div>
        </>
    );
};

export default DifficultySelect;
