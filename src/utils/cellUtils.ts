import { Cell, GameStatus, CellStatus, Grid } from "../interfaces";
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

export const getCellStatus = (
  cell: Cell,
  gameStatus: GameStatus
): CellStatus => {
  if (gameStatus === GameStatus.LOST) {
    if (cell.isFlagged) {
      return cell.hasMine ? CellStatus.FLAGGED : CellStatus.FLAGGED_ERRONEOUSLY;
    }

    if (cell.hasMine) {
      return cell.uncovered ? CellStatus.EXPLODED : CellStatus.MISSED_MINE;
    }

    return cell.uncovered ? CellStatus.UNCOVERED : CellStatus.COVERED;
  }

  if (gameStatus === GameStatus.WON) {
    return cell.hasMine ? CellStatus.FLAGGED : CellStatus.UNCOVERED;
  }

  if (cell.isFlagged) {
    return CellStatus.FLAGGED;
  }

  return cell.uncovered ? CellStatus.UNCOVERED : CellStatus.COVERED;
};

interface uncoverCellReturn {
  hadMine: boolean;
  updatedGrid: Grid;
}

export const uncoverCell = (
  grid: Grid,
  x: number,
  y: number
): uncoverCellReturn => {
  const { isFlagged } = grid[y][x];
  if (isFlagged) {
    return { hadMine: false, updatedGrid: grid };
  }
  let updatedGrid = JSON.parse(JSON.stringify(grid));
  updatedGrid[y][x] = { ...updatedGrid[y][x], uncovered: true };

  if (updatedGrid[y][x].neighbouringMineCount === 0) {
    updatedGrid = uncoverNeighbouringCells(updatedGrid, x, y);
  }

  return {
    hadMine: updatedGrid[y][x].hasMine,
    updatedGrid,
  };
};

const uncoverNeighbouringCells = (grid: Grid, x: number, y: number): Grid => {
  let updatedGrid = JSON.parse(JSON.stringify(grid));

  traverseNeighbouringCells(grid, x, y, (cellX, cellY) => {
    if (updatedGrid[cellY][cellX].uncovered) {
      // Skip cells that are already uncovered
      return;
    }
    ({ updatedGrid } = uncoverCell(updatedGrid, cellX, cellY));
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
