import { uncoverCell } from '../../cellUtils';
import {
    emptyCovered,
    emptyUncovered,
    flaggedCorrectly,
    flaggedInCorrectly,
    minedCovered,
} from '../testCellFactory';
import { FIVE_BY_FIVE_MINED_CORNERS_GRID } from '../testGrids';

describe('uncoverCell', () => {
    it('does not uncover a correctly flagged cell', () => {
        const grid = [[flaggedCorrectly()]];
        const { updatedGrid, hadMine } = uncoverCell(grid, 0, 0);
        expect(updatedGrid[0][0].uncovered).toBeFalsy();
        expect(hadMine).toBeFalsy();
    });

    it('does not uncover an incorrectly flagged cell or reveal presence of mine', () => {
        const grid = [[flaggedInCorrectly()]];
        const { updatedGrid, hadMine } = uncoverCell(grid, 0, 0);
        expect(updatedGrid[0][0].uncovered).toBeFalsy();
        expect(hadMine).toBeFalsy();
    });

    it('uncovers empty cell', () => {
        const grid = [[emptyCovered()]];
        const { updatedGrid, hadMine } = uncoverCell(grid, 0, 0);
        expect(updatedGrid[0][0].uncovered).toBeTruthy();
        expect(hadMine).toBeFalsy();
    });

    it('uncovers mined cell and returns that it did so', () => {
        const grid = [[minedCovered()]];
        const { updatedGrid, hadMine } = uncoverCell(grid, 0, 0);
        expect(updatedGrid[0][0].uncovered).toBeTruthy();
        expect(hadMine).toBeTruthy();
    });

    it('returns the grid unchanged for already uncovered cells', () => {
        const grid = [[emptyUncovered()]];
        const { updatedGrid, hadMine } = uncoverCell(grid, 0, 0);
        expect(updatedGrid).toStrictEqual(grid);
        expect(hadMine).toBeFalsy();
    });

    it('recursive revealing', () => {
        // uncover middle square
        const { updatedGrid, hadMine } = uncoverCell(
            FIVE_BY_FIVE_MINED_CORNERS_GRID,
            2,
            2
        );
        expect(hadMine).toBeFalsy();

        // Top corners still covered
        expect(updatedGrid[0][0].uncovered).toBeFalsy();
        expect(updatedGrid[0][1].uncovered).toBeTruthy();
        expect(updatedGrid[0][2].uncovered).toBeTruthy();
        expect(updatedGrid[0][3].uncovered).toBeTruthy();
        expect(updatedGrid[0][4].uncovered).toBeFalsy();

        // Middle three rows all uncovered
        updatedGrid[1].forEach(({ uncovered }) => {
            expect(uncovered).toBeTruthy();
        });
        updatedGrid[2].forEach(({ uncovered }) => {
            expect(uncovered).toBeTruthy();
        });
        updatedGrid[3].forEach(({ uncovered }) => {
            expect(uncovered).toBeTruthy();
        });

        // Bottom corners still covered
        expect(updatedGrid[4][0].uncovered).toBeFalsy();
        expect(updatedGrid[4][1].uncovered).toBeTruthy();
        expect(updatedGrid[4][2].uncovered).toBeTruthy();
        expect(updatedGrid[4][3].uncovered).toBeTruthy();
        expect(updatedGrid[4][4].uncovered).toBeFalsy();
    });
});
