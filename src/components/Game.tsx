import React, { useCallback, useEffect, useState } from 'react';
import { GameStatus, Cell, Difficulty } from '../interfaces';
import {
    countCoveredEmptyCells,
    gridFactory,
    isGameOver,
    toggleCellFlag,
    uncoverCell,
} from '../utils';
import { useTimer } from 'use-timer';
import GameGrid from './GameGrid';
import GameHeader from './GameHeader';
import GameFooter from './GameFooter';
import { vibrate, VIBRATION_TYPES } from '../utils/deviceUtils';

interface Props {
    difficulty: Difficulty;
    onChangeDifficulty(): void;
}

const Game: React.FC<Props> = ({ difficulty, onChangeDifficulty }) => {
    const {
        time: timeElapsed,
        start: startTimer,
        pause: pauseTimer,
        reset: resetTimer,
    } = useTimer();
    const [gameStatus, setGameStatus] = useState<GameStatus>(
        GameStatus.NOT_STARTED
    );
    const [gameGrid, updateGameGrid] = useState<Cell[][]>([]);
    const [unmarkedMineCount, setUnmarkedMineCount] = useState<number>(
        difficulty.mines
    );

    const resetGame = useCallback((): void => {
        pauseTimer();
        resetTimer();
        setGameStatus(GameStatus.NOT_STARTED);
        // Game starts with no mines, we add them at the first click;
        updateGameGrid(
            gridFactory({
                ...difficulty,
                mines: 0,
            })
        );
        setUnmarkedMineCount(difficulty.mines);
    }, [difficulty, pauseTimer, resetTimer]);

    useEffect(() => {
        resetGame();
    }, [difficulty, resetGame]);

    const handleFlagCell = (x: number, y: number) => {
        if (gameStatus !== GameStatus.IN_PLAY || (gameGrid && gameGrid[y][x].uncovered)) {
            return;
        }

        const updatedGrid = toggleCellFlag(gameGrid, x, y);
        updateGameGrid(updatedGrid);
        setUnmarkedMineCount(
            unmarkedMineCount - (updatedGrid[y][x].isFlagged ? 1 : -1)
        );
        vibrate(VIBRATION_TYPES.FLAG);
    };

    const handleReset = () => {
        if (
            gameStatus === GameStatus.IN_PLAY &&
            !window.confirm('Are you sure you want to restart')
        ) {
            return;
        }

        resetGame();
    };

    const handleUncoverCell = (x: number, y: number) => {
        if (isGameOver(gameStatus)) {
            return;
        }

        let grid = gameGrid;
        if (gameStatus === GameStatus.NOT_STARTED) {
            // Add the mines avoiding the cell that was first clicked.
            // this prevents the user losing on their first go which is not fun.
            grid = gridFactory(difficulty, { x, y });
            setGameStatus(GameStatus.IN_PLAY);
            startTimer();
        }

        const { updatedGrid, hadMine } = uncoverCell(grid, x, y);

        if (hadMine) {
            setGameStatus(GameStatus.LOST);
            pauseTimer();
            vibrate(VIBRATION_TYPES.LOSE);
        } else if (countCoveredEmptyCells(updatedGrid) === 0) {
            setGameStatus(GameStatus.WON);
            setUnmarkedMineCount(0);
            pauseTimer();
            vibrate(VIBRATION_TYPES.WIN);
        } else {
            vibrate(VIBRATION_TYPES.REVEAL);
        }

        updateGameGrid(updatedGrid);
    };

    const handleChangeDifficulty = () => {
        if (
            gameStatus === GameStatus.IN_PLAY &&
            !window.confirm(
                'Are you sure you want to change difficulty, current progress will be lost'
            )
        ) {
            return;
        }

        onChangeDifficulty();
    };

    return (
        <div
            className={`c-game-container  c-game-container--${difficulty.label.toLowerCase()}`}
        >
            <GameHeader
                onReset={handleReset}
                status={gameStatus}
                timeElapsed={timeElapsed}
                unmarkedMineCount={unmarkedMineCount}
            />
            <GameGrid
                gameStatus={gameStatus}
                onUncoverCell={handleUncoverCell}
                onFlagCell={handleFlagCell}
                gameGrid={gameGrid}
            />
            <GameFooter
                gameStatus={gameStatus}
                difficulty={difficulty}
                onChangeDifficulty={handleChangeDifficulty}
            />
        </div>
    );
};

export default Game;
