import { Cell, GameStatus, SquareStatus, Grid } from "../interfaces";
import { traverseNeighbouringCells } from "./gridUtils";

export const getCellContent = (cell: Cell, gameStatus: GameStatus): string => {
  const { hasMine, isFlagged, neighbouringMineCount, uncovered } = cell;
  if (isFlagged) {
    return "🚩";
  }

  if (gameStatus === GameStatus.LOST && hasMine) {
    return uncovered ? "💥" : "💣";
  }

  if (gameStatus === GameStatus.WON && hasMine) {
    return "🚩";
  }

  if (!uncovered) {
    return "";
  }

  return neighbouringMineCount ? `${neighbouringMineCount}` : "";
};

export const getSquareStatus = (
  square: Cell,
  gameStatus: GameStatus
): SquareStatus => {
  if (gameStatus === GameStatus.LOST) {
    if (square.isFlagged) {
      return square.hasMine
        ? SquareStatus.FLAGGED
        : SquareStatus.FLAGGED_ERRONEOUSLY;
    }

    if (square.hasMine) {
      return square.uncovered ? SquareStatus.EXPLODED : SquareStatus.UNCOVERED;
    }

    return square.uncovered ? SquareStatus.UNCOVERED : SquareStatus.COVERED;
  }

  if (gameStatus === GameStatus.WON) {
    return square.hasMine ? SquareStatus.FLAGGED : SquareStatus.UNCOVERED;
  }

  if (square.isFlagged) {
    return SquareStatus.FLAGGED;
  }

  return square.uncovered ? SquareStatus.UNCOVERED : SquareStatus.COVERED;
};

interface uncoverSquareReturn {
  hadMine: boolean;
  updatedGrid: Grid;
}

export const uncoverSquare = (
  grid: Grid,
  x: number,
  y: number
): uncoverSquareReturn => {
  const { isFlagged } = grid[y][x];
  if (isFlagged) {
    return { hadMine: false, updatedGrid: grid };
  }
  let updatedGrid = JSON.parse(JSON.stringify(grid));
  updatedGrid[y][x] = { ...updatedGrid[y][x], uncovered: true };

  if (updatedGrid[y][x].neighbouringMineCount === 0) {
    updatedGrid = uncoverNeighbouringSquares(updatedGrid, x, y);
  }

  return {
    hadMine: updatedGrid[y][x].hasMine,
    updatedGrid,
  };
};

const uncoverNeighbouringSquares = (grid: Grid, x: number, y: number): Grid => {
  let updatedGrid = JSON.parse(JSON.stringify(grid));

  traverseNeighbouringCells(grid, x, y, (cellX, cellY) => {
    if (updatedGrid[cellY][cellX].uncovered) {
      // Skip cells that are already uncovered
      return;
    }
    ({ updatedGrid } = uncoverSquare(updatedGrid, cellX, cellY));
  });

  return updatedGrid;
};

export const toggleCellFlag = (grid: Grid, x: number, y: number): Grid => {
  let updatedGrid = JSON.parse(JSON.stringify(grid));
  const cell = updatedGrid[y][x];

  if (!cell.uncovered) {
    cell.isFlagged = !cell.isFlagged;
  }

  return updatedGrid;
};
