import React from 'react';
import { GameStatus } from '../interfaces';
import { getInstruction } from '../utils/statusUtils';

interface Props {
    gameStatus: GameStatus;
    onChangeDifficulty(): void;
    onShowInstructions(): void;
}

const GameFooter: React.FC<Props> = ({
    gameStatus,
    onChangeDifficulty,
    onShowInstructions,
}) => {
    return (
        <div className="c-game-footer">
            <button
                data-testid="instructions-button"
                onClick={onShowInstructions}
                className="c-game-footer__difficulty"
            >
                ℹ
            </button>
            <span className="c-game-footer__instruction">
                {getInstruction(gameStatus)}
            </span>
            <div>
                <button
                    data-testid="settings-button"
                    onClick={onChangeDifficulty}
                    className="c-game-footer__difficulty"
                >
                    ⚙
                </button>
            </div>
        </div>
    );
};

export default GameFooter;
