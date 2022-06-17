import { GameStatus } from '../../../interfaces';
import { getInstruction } from '../../statusUtils';

const mockIsTouchDevice = jest.fn();

jest.mock('../../deviceUtils', () => ({
    isTouchDevice: () => mockIsTouchDevice(),
}));

describe('getInstruction', () => {
    describe('touch device', () => {
        beforeEach(() => {
            mockIsTouchDevice.mockReturnValue(true);
        });

        it('NOT_STARTED', () => {
            expect(getInstruction(GameStatus.NOT_STARTED)).toEqual(
                'Tap a cell to start the game.'
            );
        });

        it('IN_PLAY', () => {
            expect(getInstruction(GameStatus.IN_PLAY)).toEqual(
                'Tap a cell to uncover it, Long press a cell to mark it with a flag.'
            );
        });

        it('WON', () => {
            expect(getInstruction(GameStatus.WON)).toEqual(
                'You won! Tap the face to start a new game.'
            );
        });

        it('LOST', () => {
            expect(getInstruction(GameStatus.LOST)).toEqual(
                'You lost! Tap the skull to start a new game.'
            );
        });
    });

    describe('non touch device', () => {
        beforeEach(() => {
            mockIsTouchDevice.mockReturnValue(false);
        });

        it('NOT_STARTED', () => {
            expect(getInstruction(GameStatus.NOT_STARTED)).toEqual(
                'Left click a cell to start the game.'
            );
        });

        it('IN_PLAY', () => {
            expect(getInstruction(GameStatus.IN_PLAY)).toEqual(
                'Left click a cell to uncover it, Right click a cell to mark it with a flag.'
            );
        });

        it('WON', () => {
            expect(getInstruction(GameStatus.WON)).toEqual(
                'You won! Left click the face to start a new game.'
            );
        });

        it('LOST', () => {
            expect(getInstruction(GameStatus.LOST)).toEqual(
                'You lost! Left click the skull to start a new game.'
            );
        });
    });
});
