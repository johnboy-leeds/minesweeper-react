import { Difficulty, Grid, Row } from "../interfaces";
import { traverseNeighbouringCells } from "./gridUtils";

interface GridCoords {
  x: number;
  y: number;
}

export const gridFactory = (
  difficulty: Difficulty,
  firstClick?: GridCoords
): Grid => {
  const { rows, columns, mines } = difficulty;
  const grid: Grid = [];

  for (let row = 0; row < rows; row++) {
    const rowSquares: Row = [];

    for (let col = 0; col < columns; col++) {
      rowSquares.push({
        neighbouringMineCount: 0,
        hasMine: false,
        uncovered: false,
        isFlagged: false,
      });
    }

    grid.push(rowSquares);
  }

  return addNeighbouringMineCount(addMines(grid, mines, firstClick));
};

const addMines = (
  grid: Grid,
  minesToPlace: number,
  firstClick?: GridCoords
): Grid => {
  const clonedGrid = JSON.parse(JSON.stringify(grid));
  const rows = grid.length;
  if (rows === 0) {
    return clonedGrid;
  }

  const columns = grid[0].length;
  const squareCount = rows * columns;
  if (squareCount <= minesToPlace) {
    throw new Error(
      `Not enough space to fit all mines. Total Squares: ${squareCount} Mines Requested: ${minesToPlace}`
    );
  }

  let placedMines = 0;
  while (placedMines < minesToPlace) {
    const x = Math.floor(Math.random() * columns);
    const y = Math.floor(Math.random() * rows);
    const target = clonedGrid[y][x];
    const matchesFirstClick =
      firstClick && firstClick.x === x && firstClick.y === y;

    if (target.hasMine || matchesFirstClick) {
      continue;
    }

    target.hasMine = true;
    placedMines++;
  }

  return clonedGrid;
};

const addNeighbouringMineCount = (grid: Grid): Grid => {
  const clonedGrid = JSON.parse(JSON.stringify(grid));

  for (let y = 0; y < grid.length; y++) {
    const row = clonedGrid[y];
    for (let x = 0; x < row.length; x++) {
      const squareToCount = row[x];
      squareToCount.neighbouringMineCount = getNeighbouringMineCount(
        clonedGrid,
        x,
        y
      );
    }
  }

  return clonedGrid;
};

const getNeighbouringMineCount = (grid: Grid, x: number, y: number): number => {
  let count = 0;

  traverseNeighbouringCells(grid, x, y, (cellX, cellY) => {
    if (grid[cellY][cellX].hasMine) {
      count++;
    }
  });

  return count;
};
