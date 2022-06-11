import React, { useEffect, useState } from "react";
import { GameStatus, Cell } from "../interfaces";
import {
  countCoveredEmptySquares,
  gridFactory,
  isGameOver,
  toggleCellFlag,
  uncoverSquare,
} from "../utils";
import { useTimer } from "use-timer";
import GameGrid from "./GameGrid";
import StatusBar from "./StatusBar";

interface Props {
  cols: number;
  mines: number;
  rows: number;
}

const Game: React.FC<Props> = ({ cols, mines, rows }) => {
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
  const [unmarkedMineCount, updateUnmarkedMineCount] = useState<number>(mines);

  useEffect(() => {
    updateGameGrid(gridFactory(rows, cols, mines));
  }, [rows, cols, mines]);

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

    pauseTimer();
    resetTimer();
    setGameStatus(GameStatus.NOT_STARTED);
    updateGameGrid(gridFactory(rows, cols, mines));
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
      <StatusBar
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
    </div>
  );
};

export default Game;
