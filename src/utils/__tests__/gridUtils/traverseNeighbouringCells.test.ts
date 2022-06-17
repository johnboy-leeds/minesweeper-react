import { traverseNeighbouringCells } from '../../gridUtils';
import { FIVE_BY_FIVE_EMPTY_GRID } from '../testGrids';

describe('traverseNeighbouringCells', () => {
    it('throws error for empty grid', () => {
        const callback = jest.fn();
        expect(() =>
            traverseNeighbouringCells([], 0, 0, callback)
        ).toThrowError('Grid has no rows');
        expect(callback).toBeCalledTimes(0);
    });

    it('handles top left corner', () => {
        const callback = jest.fn();
        traverseNeighbouringCells(FIVE_BY_FIVE_EMPTY_GRID, 0, 0, callback);
        expect(callback).toBeCalledTimes(3);
        expect(callback).toBeCalledWith(0, 1);
        expect(callback).toBeCalledWith(1, 0);
        expect(callback).toBeCalledWith(1, 1);
    });

    it('handles top right corner', () => {
        const callback = jest.fn();
        traverseNeighbouringCells(FIVE_BY_FIVE_EMPTY_GRID, 4, 0, callback);
        expect(callback).toBeCalledTimes(3);
        expect(callback).toBeCalledWith(3, 0);
        expect(callback).toBeCalledWith(3, 1);
        expect(callback).toBeCalledWith(4, 1);
    });

    it('handles bottom left corner', () => {
        const callback = jest.fn();
        traverseNeighbouringCells(FIVE_BY_FIVE_EMPTY_GRID, 0, 4, callback);
        expect(callback).toBeCalledTimes(3);
        expect(callback).toBeCalledWith(0, 3);
        expect(callback).toBeCalledWith(1, 3);
        expect(callback).toBeCalledWith(1, 4);
    });

    it('handles bottom right corner', () => {
        const callback = jest.fn();
        traverseNeighbouringCells(FIVE_BY_FIVE_EMPTY_GRID, 4, 4, callback);
        expect(callback).toBeCalledTimes(3);
        expect(callback).toBeCalledWith(3, 3);
        expect(callback).toBeCalledWith(3, 4);
        expect(callback).toBeCalledWith(4, 3);
    });

    it('handles middle', () => {
        const callback = jest.fn();
        traverseNeighbouringCells(FIVE_BY_FIVE_EMPTY_GRID, 2, 2, callback);
        expect(callback).toBeCalledTimes(8);
        expect(callback).toBeCalledWith(1, 1);
        expect(callback).toBeCalledWith(1, 2);
        expect(callback).toBeCalledWith(1, 3);
        expect(callback).toBeCalledWith(2, 1);
        expect(callback).toBeCalledWith(2, 3);
        expect(callback).toBeCalledWith(3, 1);
        expect(callback).toBeCalledWith(3, 2);
        expect(callback).toBeCalledWith(3, 3);
    });
});
