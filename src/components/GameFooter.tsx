import React from 'react';
import { Difficulty, GameStatus } from '../interfaces';
import { getInstruction } from '../utils/statusUtils';

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
                <button
                    data-testid="change-difficulty"
                    onClick={onChangeDifficulty}
                    className="c-game-footer__difficulty"
                >
                    {difficulty.label}
                </button>
            </div>
        </div>
    );
};

export default GameFooter;
