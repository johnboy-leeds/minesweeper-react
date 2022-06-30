import React from 'react';
import {
    flagActionDescription,
    unconverActionDescription,
} from '../utils/statusUtils';

interface Props {
    isGameInProgress: boolean;
    next(): void;
}

const Instructions: React.FC<Props> = ({ next, isGameInProgress }) => {
    return (
        <>
            <div className="c-game-header">
                <h1>Minesweeper</h1>
            </div>
            <div className="c-main-menu" data-testid="instructions">
                <h2>How to play</h2>
                <ul className="c-main-menu__instructions">
                    <li>
                        <span className="c-main-menu__instruction-key">💣</span>
                        The grid contains randomly placed mines.
                    </li>
                    <li>
                        <span className="c-main-menu__instruction-key">👆</span>
                        {`${unconverActionDescription()} a cell to uncover it.`}
                    </li>
                    <li>
                        <div className="c-main-menu__instruction-key">
                            <div
                                className="c-grid-cell "
                                data-neighbour-count={3}
                            >
                                3
                            </div>
                        </div>
                        Uncovered cells display the number of adjacent mines.
                    </li>
                    <li>
                        <span className="c-main-menu__instruction-key">🚩</span>
                        {`${flagActionDescription()} a cell to mark suspected mines.`}
                    </li>
                    <li>
                        <span className="c-main-menu__instruction-key">😎</span>
                        Clear all cells that don't contain mines to win.
                    </li>
                    <li>
                        <span className="c-main-menu__instruction-key">💀</span>
                        Hit a mine and you lose.
                    </li>
                </ul>
                <button onClick={next} className="c-button">
                    {isGameInProgress ? 'Resume' : 'Start'}
                </button>
            </div>
        </>
    );
};

export default Instructions;
