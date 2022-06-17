import { GameStatus, Grid } from '../interfaces';

export const isGameOver = (gameStatus: GameStatus): boolean =>
    gameStatus === GameStatus.LOST || gameStatus === GameStatus.WON;

export const countCoveredEmptyCells = (grid: Grid): number =>
    grid.flat().filter(({ uncovered, hasMine }) => !uncovered && !hasMine)
        .length;

export interface SubGrid {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
}

const getNeighbouringSubGrid = (grid: Grid, x: number, y: number): SubGrid => {
    const lastRow = grid.length - 1;

    if (lastRow < 0) {
        throw Error('Grid has no rows');
    }

    const lastCol = grid[0].length - 1;
    return {
        xStart: Math.max(0, x - 1),
        xEnd: Math.min(lastCol, x + 1),
        yStart: Math.max(0, y - 1),
        yEnd: Math.min(lastRow, y + 1),
    };
};

export const traverseNeighbouringCells = (
    grid: Grid,
    x: number,
    y: number,
    callback: (x: number, y: number) => void
) => {
    const { xStart, xEnd, yStart, yEnd } = getNeighbouringSubGrid(grid, x, y);

    for (let row = yStart; row <= yEnd; row++) {
        for (let col = xStart; col <= xEnd; col++) {
            if (row === y && col === x) {
                // only run on neighbouring cells
                continue;
            }
            callback(col, row);
        }
    }
};
