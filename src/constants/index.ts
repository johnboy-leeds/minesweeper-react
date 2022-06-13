import { Difficulty } from "../interfaces";

export const difficulties: Difficulty[] = [
  {
    label: "Easy",
    rows: 8,
    columns: 8,
    mines: 10,
  },
  {
    label: "Intermediate ",
    rows: 16,
    columns: 16,
    mines: 40,
  },
  {
    label: "Hard",
    rows: 30,
    columns: 16,
    mines: 99,
  },
];
