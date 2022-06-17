import { CellStatus, GameStatus } from '../../../interfaces';
import { getCellStatus } from '../../cellUtils';
import {
    emptyCovered,
    emptyUncovered,
    exploded,
    flaggedCorrectly,
    flaggedInCorrectly,
    minedCovered,
} from '../testCellFactory';

describe('getCellStatus', () => {
    it('Returns correct status when Game Lost', () => {
        expect(getCellStatus(emptyCovered(), GameStatus.LOST)).toEqual(
            CellStatus.COVERED
        );
        expect(getCellStatus(emptyUncovered(), GameStatus.LOST)).toEqual(
            CellStatus.UNCOVERED
        );
        expect(getCellStatus(flaggedCorrectly(), GameStatus.LOST)).toEqual(
            CellStatus.FLAGGED
        );
        expect(getCellStatus(flaggedInCorrectly(), GameStatus.LOST)).toEqual(
            CellStatus.FLAGGED_ERRONEOUSLY
        );
        expect(getCellStatus(minedCovered(), GameStatus.LOST)).toEqual(
            CellStatus.MISSED_MINE
        );
        expect(getCellStatus(exploded(), GameStatus.LOST)).toEqual(
            CellStatus.EXPLODED
        );
    });

    it('Returns correct status when Game Won', () => {
        expect(getCellStatus(emptyUncovered(), GameStatus.WON)).toEqual(
            CellStatus.UNCOVERED
        );
        expect(getCellStatus(minedCovered(), GameStatus.WON)).toEqual(
            CellStatus.FLAGGED
        );
        expect(getCellStatus(flaggedCorrectly(), GameStatus.WON)).toEqual(
            CellStatus.FLAGGED
        );
    });

    it('Returns correct status when in play', () => {
        expect(getCellStatus(emptyUncovered(), GameStatus.IN_PLAY)).toEqual(
            CellStatus.UNCOVERED
        );
        expect(getCellStatus(emptyCovered(), GameStatus.IN_PLAY)).toEqual(
            CellStatus.COVERED
        );
        expect(getCellStatus(minedCovered(), GameStatus.IN_PLAY)).toEqual(
            CellStatus.COVERED
        );
        expect(getCellStatus(flaggedCorrectly(), GameStatus.IN_PLAY)).toEqual(
            CellStatus.FLAGGED
        );
        expect(getCellStatus(flaggedInCorrectly(), GameStatus.IN_PLAY)).toEqual(
            CellStatus.FLAGGED
        );
    });
});
