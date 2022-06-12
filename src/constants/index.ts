import { Difficulty } from "../interfaces";

export const difficulties: Difficulty[] = [
  {
    label: "Easy",
    rows: 6,
    columns: 4,
    mines: 4,
  },
  {
    label: "Medium",
    rows: 10,
    columns: 8,
    mines: 12,
  },
  {
    label: "Hard",
    rows: 14,
    columns: 12,
    mines: 36,
  },
];
