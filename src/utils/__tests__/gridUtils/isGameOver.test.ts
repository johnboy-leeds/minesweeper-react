import { GameStatus } from '../../../interfaces';
import { isGameOver } from '../../gridUtils';

describe('isGameOver', () => {
    it('Won', () => {
        expect(isGameOver(GameStatus.WON)).toBeTruthy();
    });

    it('Lost', () => {
        expect(isGameOver(GameStatus.LOST)).toBeTruthy();
    });

    it('Not started', () => {
        expect(isGameOver(GameStatus.NOT_STARTED)).toBeFalsy();
    });

    it('In play', () => {
        expect(isGameOver(GameStatus.IN_PLAY)).toBeFalsy();
    });
});
