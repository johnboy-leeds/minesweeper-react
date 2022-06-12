export interface Cell {
  neighbouringMineCount: number;
  hasMine: boolean;
  uncovered: boolean;
  isFlagged: boolean;
}

export type Row = Cell[];
export type Grid = Row[];

export enum SquareStatus {
  EXPLODED = "exploded",
  FLAGGED = "flagged",
  FLAGGED_ERRONEOUSLY = "flagged-erroneously",
  UNCOVERED = "uncovered",
  COVERED = "covered",
}

export enum GameStatus {
  NOT_STARTED = "not-started",
  IN_PLAY = "in-play",
  LOST = "lost",
  WON = "won",
}

export interface Difficulty {
  label: string;
  rows: number;
  columns: number;
  mines: number;
}