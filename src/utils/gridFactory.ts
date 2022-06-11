import { Cell } from "../interfaces";
import { traverseNeighbouringCells } from "./gridUtils";

export const gridFactory = (
  rows: number,
  columns: number,
  mines: number
): Cell[][] => {
  const grid: Cell[][] = [];

  for (let row = 0; row < rows; row++) {
    const rowSquares: Cell[] = [];

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

  return addNeighbouringMineCount(addMines(grid, mines));
};

const addMines = (grid: Cell[][], minesToPlace: number): Cell[][] => {
  const clonedGrid = JSON.parse(JSON.stringify(grid));
  const rows = grid.length;
  if (rows === 0) {
    return clonedGrid;
  }

  const columns = grid[0].length;
  const squareCount = rows * columns;
  if (squareCount < minesToPlace) {
    throw new Error(
      `Not enough space to fit all mines. Total Squares: ${squareCount} Mines Requested: ${minesToPlace}`
    );
  }

  let placedMines = 0;
  while (placedMines < minesToPlace) {
    const x = Math.floor(Math.random() * columns);
    const y = Math.floor(Math.random() * rows);
    const target = clonedGrid[y][x];
    if (target.hasMine) {
      continue;
    }

    target.hasMine = true;
    placedMines++;
  }

  return clonedGrid;
};

const addNeighbouringMineCount = (grid: Cell[][]): Cell[][] => {
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

const getNeighbouringMineCount = (
  grid: Cell[][],
  x: number,
  y: number
): number => {
  let count = 0;

  traverseNeighbouringCells(grid, x, y, (cellX, cellY) => {
    if (grid[cellY][cellX].hasMine) {
      count++;
    }
  });

  return count;
};
