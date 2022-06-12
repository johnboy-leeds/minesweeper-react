import React, { useCallback, useEffect, useState } from "react";
import { GameStatus, Cell, Difficulty } from "../interfaces";
import {
  countCoveredEmptySquares,
  gridFactory,
  isGameOver,
  toggleCellFlag,
  uncoverSquare,
} from "../utils";
import { useTimer } from "use-timer";
import GameGrid from "./GameGrid";
import GameHeader from "./GameHeader";
import GameFooter from "./GameFooter";

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
  const [unmarkedMineCount, updateUnmarkedMineCount] = useState<number>(
    difficulty.mines
  );

  const resetGame = useCallback((): void => {
    pauseTimer();
    resetTimer();
    setGameStatus(GameStatus.NOT_STARTED);
    updateGameGrid(gridFactory(difficulty));
    updateUnmarkedMineCount(difficulty.mines);
  }, [difficulty, pauseTimer, resetTimer]);

  useEffect(() => {
    resetGame();
  }, [difficulty, resetGame]);

  const handleFlagSquare = (x: number, y: number) => {
    if (isGameOver(gameStatus)) {
      return;
    }
    const updatedGrid = toggleCellFlag(gameGrid, x, y);
    updateGameGrid(updatedGrid);
    updateUnmarkedMineCount(
      unmarkedMineCount - (updatedGrid[y][x].isFlagged ? 1 : -1)
    );
  };

  const handleReset = () => {
    if (
      gameStatus === GameStatus.IN_PLAY &&
      !window.confirm("Are you sure you want to restart")
    ) {
      return;
    }

    resetGame();
  };

  const handleUncoverSquare = (x: number, y: number) => {
    if (isGameOver(gameStatus)) {
      return;
    }

    if (gameStatus === GameStatus.NOT_STARTED) {
      setGameStatus(GameStatus.IN_PLAY);
      startTimer();
      console.log("Game started");
    }

    const { updatedGrid, hadMine } = uncoverSquare(gameGrid, x, y);

    if (hadMine) {
      setGameStatus(GameStatus.LOST);
      pauseTimer();
    } else if (countCoveredEmptySquares(updatedGrid) === 0) {
      setGameStatus(GameStatus.WON);
      pauseTimer();
    }

    updateGameGrid(updatedGrid);
  };

  return (
    <div className="c-game-container">
      <GameHeader
        onReset={handleReset}
        status={gameStatus}
        timeElapsed={timeElapsed}
        unmarkedMineCount={unmarkedMineCount}
      />
      <GameGrid
        gameStatus={gameStatus}
        onUncoverSquare={handleUncoverSquare}
        onFlagSquare={handleFlagSquare}
        gameGrid={gameGrid}
      />
      <GameFooter
        difficulty={difficulty}
        onChangeDifficulty={onChangeDifficulty}
      />
    </div>
  );
};

export default Game;
