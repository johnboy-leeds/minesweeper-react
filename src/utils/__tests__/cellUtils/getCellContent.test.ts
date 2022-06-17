import { GameStatus } from '../../../interfaces';
import { getCellContent } from '../../cellUtils';
import {
    emptyCovered,
    emptyUncovered,
    exploded,
    flaggedCorrectly,
    flaggedInCorrectly,
    minedCovered,
} from '../testCellFactory';

describe('getCellContent', () => {
    describe('In play', () => {
        it('isFlagged', () => {
            expect(
                getCellContent(flaggedCorrectly(), GameStatus.IN_PLAY)
            ).toEqual('🚩');
            expect(
                getCellContent(flaggedInCorrectly(), GameStatus.IN_PLAY)
            ).toEqual('🚩');
        });

        it('hasMine', () => {
            expect(getCellContent(minedCovered(), GameStatus.IN_PLAY)).toEqual(
                ''
            );
        });

        it('empty cells', () => {
            expect(getCellContent(emptyCovered(), GameStatus.IN_PLAY)).toEqual(
                ''
            );
            expect(
                getCellContent(emptyUncovered(0), GameStatus.IN_PLAY)
            ).toEqual('');
            expect(
                getCellContent(emptyUncovered(1), GameStatus.IN_PLAY)
            ).toEqual('1');
            expect(
                getCellContent(emptyUncovered(2), GameStatus.IN_PLAY)
            ).toEqual('2');
            expect(
                getCellContent(emptyUncovered(3), GameStatus.IN_PLAY)
            ).toEqual('3');
            expect(
                getCellContent(emptyUncovered(4), GameStatus.IN_PLAY)
            ).toEqual('4');
            expect(
                getCellContent(emptyUncovered(5), GameStatus.IN_PLAY)
            ).toEqual('5');
            expect(
                getCellContent(emptyUncovered(6), GameStatus.IN_PLAY)
            ).toEqual('6');
            expect(
                getCellContent(emptyUncovered(7), GameStatus.IN_PLAY)
            ).toEqual('7');
            expect(
                getCellContent(emptyUncovered(8), GameStatus.IN_PLAY)
            ).toEqual('8');
        });
    });

    describe('Game Won', () => {
        it('isFlagged', () => {
            expect(getCellContent(flaggedCorrectly(), GameStatus.WON)).toEqual(
                '🚩'
            );
        });

        it('hasMine', () => {
            expect(getCellContent(minedCovered(), GameStatus.WON)).toEqual(
                '🚩'
            );
        });

        it('empty cells', () => {
            expect(getCellContent(emptyCovered(), GameStatus.WON)).toEqual('');
            expect(getCellContent(emptyUncovered(), GameStatus.WON)).toEqual(
                ''
            );
        });
    });

    describe('Game Lost', () => {
        it('isFlagged', () => {
            expect(getCellContent(flaggedCorrectly(), GameStatus.LOST)).toEqual(
                '🚩'
            );
            expect(
                getCellContent(flaggedInCorrectly(), GameStatus.LOST)
            ).toEqual('🚩');
        });

        it('hasMine', () => {
            expect(getCellContent(minedCovered(), GameStatus.LOST)).toEqual(
                '💣'
            );
            expect(getCellContent(exploded(), GameStatus.LOST)).toEqual('💥');
        });

        it('empty cells', () => {
            expect(getCellContent(emptyCovered(), GameStatus.LOST)).toEqual('');
            expect(getCellContent(emptyUncovered(), GameStatus.LOST)).toEqual(
                ''
            );
        });
    });
});
