import { useCallback, useState } from 'react';
import { Difficulty, GameStatus, Grid } from '../interfaces';
import { vibrate, VIBRATION_TYPES } from '../utils/deviceUtils';

import {
    countCoveredEmptyCells,
    gridFactory,
    isGameOver,
    toggleCellFlag,
    uncoverCell as uncoverCellUtil,
} from '../utils';
import { useTimer } from 'use-timer';

interface GameState {
    grid: Grid;
    status: GameStatus;
    unmarkedMineCount: number;
}

interface GameEngineReturn {
    flagCell(x: number, y: number): void;
    grid: Grid;
    resetGame(): void;
    status: GameStatus;
    timeElapsed: number;
    uncoverCell(x: number, y: number): void;
    unmarkedMineCount: number;
}

export const useGameEngine = (difficulty?: Difficulty): GameEngineReturn => {
    const [gameState, setGameState] = useState<GameState>({
        grid: [],
        status: GameStatus.NOT_STARTED,
        unmarkedMineCount: difficulty ? difficulty.mines : 0,
    });
    const {
        time: timeElapsed,
        start: startTimer,
        pause: pauseTimer,
        reset: resetTimer,
    } = useTimer();

    const { grid, status, unmarkedMineCount } = gameState;

    const resetGame = useCallback((): void => {
        if (!difficulty) {
            return;
        }
        pauseTimer();
        resetTimer();
        setGameState({
            grid: gridFactory({
                ...difficulty,
                // Game starts with no mines, we add them at the first click;
                mines: 0,
            }),
            status: GameStatus.NOT_STARTED,
            unmarkedMineCount: difficulty.mines,
        });
    }, [difficulty, pauseTimer, resetTimer]);

    const uncoverCell = (x: number, y: number) => {
        if (isGameOver(status) || grid[y][x].uncovered) {
            return;
        }

        let newStatus = status;
        let newUnmarkedMineCount = unmarkedMineCount;
        let updatedGrid = grid;
        if (status === GameStatus.NOT_STARTED) {
            // Add the mines avoiding the cell that was first clicked.
            // this prevents the user losing on their first go which is not fun.
            updatedGrid = gridFactory(difficulty!, { x, y });
            newStatus = GameStatus.IN_PLAY;
            startTimer();
        }

        const uncoverReturn = uncoverCellUtil(updatedGrid, x, y);
        updatedGrid = uncoverReturn.updatedGrid;

        if (uncoverReturn.hadMine) {
            newStatus = GameStatus.LOST;
            pauseTimer();
            vibrate(VIBRATION_TYPES.LOSE);
        } else if (countCoveredEmptyCells(updatedGrid) === 0) {
            newStatus = GameStatus.WON;
            newUnmarkedMineCount = 0;
            pauseTimer();
            vibrate(VIBRATION_TYPES.WIN);
        } else {
            vibrate(VIBRATION_TYPES.REVEAL);
        }

        setGameState({
            status: newStatus,
            grid: updatedGrid,
            unmarkedMineCount: newUnmarkedMineCount,
        });
    };

    const flagCell = (x: number, y: number) => {
        if (status !== GameStatus.IN_PLAY || grid[y][x].uncovered) {
            return;
        }

        const updatedGrid = toggleCellFlag(grid, x, y);
        setGameState({
            status,
            grid: updatedGrid,
            unmarkedMineCount:
                unmarkedMineCount - (updatedGrid[y][x].isFlagged ? 1 : -1),
        });
        vibrate(VIBRATION_TYPES.FLAG);
    };

    return {
        flagCell,
        grid,
        resetGame,
        status,
        timeElapsed,
        uncoverCell,
        unmarkedMineCount,
    };
};
