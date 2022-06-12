import { Difficulty } from "../interfaces";

export const difficulties: Difficulty[] = [
  {
    label: "Easy",
    rows: 6,
    columns: 4,
    mines: 4,
  },
  {
    label: "Intermediate",
    rows: 8,
    columns: 5,
    mines: 6,
  },
  {
    label: "Advanced",
    rows: 12,
    columns: 8,
    mines: 36,
  },
  {
    label: "Expert",
    rows: 16,
    columns: 12,
    mines: 76,
  },
];
