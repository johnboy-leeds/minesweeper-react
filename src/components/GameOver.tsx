import React from 'react';
import { GameStatus } from '../interfaces';
import { getStatusEmoji, getInstruction } from '../utils/statusUtils';

interface Props {
    gameStatus: GameStatus;
    onChangeDifficulty(): void;
    onReset(): void;
}

export const GameOver: React.FC<Props> = ({ gameStatus, onChangeDifficulty, onReset }) => {
    return (
        <div className="c-game-over-overlay">
            <div className="c-game-over-overlay__content">
                <span className="c-game-over-overlay__emoji">
                    {getStatusEmoji(gameStatus)}
                </span>

                <p>{getInstruction(gameStatus)}</p>

                <button
                    onClick={onReset}
                    data-testid="game-reset"
                    className="c-button u-space-bottom"
                >
                    Play again
                </button>

                <button
                    onClick={onChangeDifficulty}
                    data-testid="game-reset"
                    className="c-button c-button--text"
                >
                    Change Difficulty
                </button>
            </div>
        </div>
    );
};
