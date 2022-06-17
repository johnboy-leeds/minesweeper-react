import { gridFactory } from '../../gridFactory';

describe('gridFactory', () => {
    it('generates a grid', () => {
        const grid = gridFactory({
            rows: 2,
            columns: 2,
            label: 'test',
            mines: 1,
        });

        const minedCells = grid.flat().filter((cell) => cell.hasMine);
        const unminedCells = grid.flat().filter((cell) => !cell.hasMine);

        expect(minedCells.length).toEqual(1);
        expect(unminedCells.length).toEqual(3);

        unminedCells.forEach((cell) => {
            expect(cell.neighbouringMineCount).toEqual(1);
            expect(cell.uncovered).toBeFalsy();
        });
    });

    it('mine free grid', () => {
        const grid = gridFactory({
            rows: 3,
            columns: 3,
            label: 'test',
            mines: 0,
        });
        grid.flat().forEach((cell) => {
            expect(cell.neighbouringMineCount).toEqual(0);
            expect(cell.hasMine).toBeFalsy();
            expect(cell.uncovered).toBeFalsy();
        });
    });

    it('refuses to overfill a grid', () => {
        expect(() =>
            gridFactory({ rows: 2, columns: 2, label: 'test', mines: 5 })
        ).toThrow(
            'Not enough space to fit all mines. Total cells: 4 Mines Requested: 5'
        );
    });

    it('does not mine the first clicked cell', () => {
        // Created a grid:
        // 💣  💣  💣
        // 💣   8  💣
        // 💣  💣  💣
        const grid = gridFactory(
            { rows: 3, columns: 3, label: 'test', mines: 8 },
            { x: 1, y: 1 }
        );

        // Top row all mines
        grid[0].forEach((cell) => {
            expect(cell.hasMine).toBeTruthy();
        });

        // middle row should be "💣8💣"
        expect(grid[1][0].hasMine).toBeTruthy();
        expect(grid[1][1].hasMine).toBeFalsy();
        expect(grid[1][1].neighbouringMineCount).toEqual(8);
        expect(grid[1][2].hasMine).toBeTruthy();

        // Bottom row all mines
        grid[2].forEach((cell) => {
            expect(cell.hasMine).toBeTruthy();
        });
    });
});
