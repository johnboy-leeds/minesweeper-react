import { Difficulty, Grid, GridCoords, Row } from '../interfaces';
import { traverseNeighbouringCells } from './gridUtils';

export const gridFactory = (
    difficulty: Difficulty,
    firstClick?: GridCoords
): Grid => {
    const { rows, columns, mines } = difficulty;
    const grid: Grid = [];

    for (let row = 0; row < rows; row++) {
        const rowCells: Row = [];

        for (let col = 0; col < columns; col++) {
            rowCells.push({
                neighbouringMineCount: 0,
                hasMine: false,
                uncovered: false,
                isFlagged: false,
            });
        }

        grid.push(rowCells);
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
    if (rows === 0 || minesToPlace === 0) {
        return clonedGrid;
    }

    const cellCount = grid.flat().length;
    if (cellCount <= minesToPlace) {
        throw new Error(
            `Not enough space to fit all mines. Total cells: ${cellCount} Mines Requested: ${minesToPlace}`
        );
    }

    const columns = clonedGrid[0].length;
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
            const cellToCount = row[x];
            cellToCount.neighbouringMineCount = getNeighbouringMineCount(
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
