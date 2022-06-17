import { Grid } from '../../interfaces';
import { emptyCovered, minedCovered } from './testCellFactory';

// 5x5 Grid with mines just in the corners
// 💣 1 0 1 💣
//  1 1 0 1 1
//  0 0 0 0 0
//  1 1 0 1 1
// 💣 1 0 1 💣

export const FIVE_BY_FIVE_MINED_CORNERS_GRID = [
    [
        minedCovered(),
        emptyCovered(1),
        emptyCovered(0),
        emptyCovered(1),
        minedCovered(),
    ],
    [
        emptyCovered(1),
        emptyCovered(1),
        emptyCovered(0),
        emptyCovered(1),
        emptyCovered(1),
    ],
    [
        emptyCovered(0),
        emptyCovered(0),
        emptyCovered(0),
        emptyCovered(0),
        emptyCovered(0),
    ],
    [
        emptyCovered(1),
        emptyCovered(1),
        emptyCovered(0),
        emptyCovered(1),
        emptyCovered(1),
    ],
    [
        minedCovered(),
        emptyCovered(1),
        emptyCovered(0),
        emptyCovered(1),
        minedCovered(),
    ],
];

// 5x5 Grid with mines just in the corners
// 0 1 1 1 0
// 1 2 💣 2 1
// 1 💣4 💣 1
// 1 2 💣 2 1
// 0 1 1 1 0

export const FIVE_BY_FIVE_MINED_CROSS_GRID = [
    [
        emptyCovered(0),
        emptyCovered(1),
        emptyCovered(1),
        emptyCovered(1),
        emptyCovered(0),
    ],
    [
        emptyCovered(1),
        emptyCovered(2),
        minedCovered(),
        emptyCovered(2),
        emptyCovered(1),
    ],
    [
        emptyCovered(1),
        minedCovered(),
        emptyCovered(4),
        minedCovered(),
        emptyCovered(0),
    ],
    [
        emptyCovered(1),
        emptyCovered(2),
        minedCovered(),
        emptyCovered(2),
        emptyCovered(1),
    ],
    [
        emptyCovered(0),
        emptyCovered(1),
        emptyCovered(1),
        emptyCovered(1),
        emptyCovered(0),
    ],
];

export const FIVE_BY_FIVE_EMPTY_GRID: Grid = [
    [
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
    ],
    [
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
    ],
    [
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
    ],
    [
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
    ],
    [
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
        emptyCovered(),
    ],
];
