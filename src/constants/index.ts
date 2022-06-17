import { Difficulty } from '../interfaces';

export const difficulties: Difficulty[] = [
    {
        label: 'Beginner',
        rows: 6,
        columns: 4,
        mines: 2,
    },
    {
        label: 'Easy',
        rows: 8,
        columns: 8,
        mines: 10,
    },
    {
        label: 'Intermediate',
        rows: 20,
        columns: 12,
        mines: 40,
    },
    {
        label: 'Hard',
        rows: 34,
        columns: 14,
        mines: 99,
    },
];
