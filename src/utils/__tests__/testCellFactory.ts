import { Cell } from "../../interfaces";

export const emptyUncovered = (neighbouringMineCount = 0): Cell => ({
  hasMine: false,
  uncovered: true,
  neighbouringMineCount,
  isFlagged: false,
});

export const emptyCovered = (neighbouringMineCount = 0): Cell => ({
  hasMine: false,
  uncovered: false,
  neighbouringMineCount,
  isFlagged: false,
});

export const minedCovered = (): Cell => ({
  hasMine: true,
  uncovered: false,
  neighbouringMineCount: 0,
  isFlagged: false,
});

export const flaggedCorrectly = (): Cell => ({
  hasMine: true,
  uncovered: false,
  neighbouringMineCount: 0,
  isFlagged: true,
});

export const flaggedInCorrectly = (): Cell => ({
  hasMine: false,
  uncovered: false,
  neighbouringMineCount: 0,
  isFlagged: true,
});

export const exploded = (): Cell => ({
  hasMine: true,
  uncovered: true,
  neighbouringMineCount: 0,
  isFlagged: false,
});
