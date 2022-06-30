import React, { useEffect, useState } from 'react';
import { GameStatus, Difficulty, Grid } from '../interfaces';
import GameGrid from './GameGrid';
import GameHeader from './GameHeader';
import GameFooter from './GameFooter';
import { useGameEngine } from '../hooks/useGameEngine';
import DifficultySelect from './DifficultySelect';
import Instructions from './Instructions';
import { GameOver } from './GameOver';
import { isGameOver } from '../utils';

export interface GameState {
    grid: Grid;
    status: GameStatus;
}

enum View {
    INSTRUCTIONS,
    DIFFICULTY_SELECT,
    GAME,
}

const Game: React.FC = () => {
    const [hasStartedAGame, setHasStartedAGame] = useState<boolean>(false);
    const [view, setView] = useState<View>(View.INSTRUCTIONS);
    const [difficulty, setDifficulty] = useState<Difficulty>();

    const {
        status,
        grid,
        flagCell,
        uncoverCell,
        resetGame,
        timeElapsed,
        unmarkedMineCount,
    } = useGameEngine(difficulty);

    useEffect(() => {
        resetGame();
    }, [difficulty, resetGame]);

    const showDifficultySelect = () => {
        setView(View.DIFFICULTY_SELECT);
    };

    const onChangeDifficulty = (chosenDifficulty: Difficulty) => {
        setHasStartedAGame(true);
        setDifficulty(chosenDifficulty);
        setView(View.GAME);
    };

    const resumeGame = () => {
        setView(View.GAME);
    };

    const showInstructions = () => {
        setView(View.INSTRUCTIONS);
    };

    const handleReset = () => {
        if (
            status === GameStatus.IN_PLAY &&
            !window.confirm('Are you sure you want to restart')
        ) {
            return;
        }

        resetGame();
    };

    const handleChangeDifficulty = () => {
        if (
            status === GameStatus.IN_PLAY &&
            !window.confirm(
                'Are you sure you want to change difficulty, current progress will be lost'
            )
        ) {
            return;
        }

        showDifficultySelect();
    };

    return (
        <div
            className={`c-game-container  ${
                difficulty
                    ? `c-game-container--${difficulty.label.toLowerCase()}`
                    : ''
            }`}
        >
            {
                {
                    [View.INSTRUCTIONS]: (
                        <Instructions
                            next={
                                hasStartedAGame
                                    ? resumeGame
                                    : showDifficultySelect
                            }
                            isGameInProgress={hasStartedAGame}
                        />
                    ),
                    [View.DIFFICULTY_SELECT]: (
                        <DifficultySelect
                            onSelectDifficulty={onChangeDifficulty}
                        />
                    ),
                    [View.GAME]: (
                        <>
                            <GameHeader
                                onReset={handleReset}
                                status={status}
                                timeElapsed={timeElapsed}
                                unmarkedMineCount={unmarkedMineCount}
                            />
                            <GameGrid
                                gameStatus={status}
                                onUncoverCell={uncoverCell}
                                onFlagCell={flagCell}
                                gameGrid={grid}
                            />
                            <GameFooter
                                gameStatus={status}
                                onChangeDifficulty={handleChangeDifficulty}
                                onShowInstructions={showInstructions}
                            />
                            {isGameOver(status) && (
                                <GameOver
                                    gameStatus={status}
                                    onReset={handleReset}
                                    onChangeDifficulty={handleChangeDifficulty}
                                />
                            )}
                        </>
                    ),
                }[view]
            }
        </div>
    );
};

export default Game;
