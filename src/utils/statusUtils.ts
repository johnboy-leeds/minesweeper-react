import { GameStatus } from '../interfaces';
import { isTouchDevice } from './deviceUtils';

export const unconverActionDescription = (): string =>
    isTouchDevice() ? 'Tap' : 'Left click';
export const flagActionDescription = (): string =>
    isTouchDevice() ? 'Long press' : 'Right click';

export const getInstruction = (gameStatus: GameStatus) => {
    const unconverAction = unconverActionDescription();
    const flagAction = flagActionDescription();

    let instruction = `${unconverAction} a cell to uncover it, ${flagAction} a cell to mark it with a flag.`;
    if (gameStatus === GameStatus.NOT_STARTED) {
        instruction = `${unconverAction} a cell to start the game.`;
    }

    if (gameStatus === GameStatus.WON) {
        instruction = `You won!`;
    }

    if (gameStatus === GameStatus.LOST) {
        instruction = `You lost!`;
    }

    return instruction;
};

export const getStatusEmoji = (status: GameStatus): string => {
    switch (status) {
        case GameStatus.WON:
            return '😎';
        case GameStatus.LOST:
            return '💀';
        default:
            return '😃';
    }
};
