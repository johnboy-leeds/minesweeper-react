import React, { ReactNode } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { difficulties } from '../../constants';
import Game from '../Game';
import { Difficulty, GridCoords } from '../../interfaces';
import {
    FIVE_BY_FIVE_EMPTY_GRID,
    FIVE_BY_FIVE_MINED_CORNERS_GRID,
    FIVE_BY_FIVE_MINED_CROSS_GRID,
} from '../../utils/__tests__/testGrids';
import { traverseNeighbouringCells } from '../../utils';

const mockOnChangeDifficulty = jest.fn();
const mockGridFactory = jest.fn();

jest.mock('../../utils/gridFactory', () => ({
    gridFactory: (difficulty: Difficulty, firstClick: GridCoords) =>
        mockGridFactory(difficulty, firstClick),
}));

jest.mock(
    '../GameHeader',
    () =>
        ({ onReset, status }: { onReset(): void; status: string }): ReactNode =>
            <span onClick={onReset}>{status}</span>
);
jest.mock(
    '../GameFooter',
    () =>
        ({ onChangeDifficulty }: { onChangeDifficulty(): void }): ReactNode =>
            (
                <span>
                    Footer
                    <button onClick={onChangeDifficulty}>
                        Change difficulty
                    </button>
                </span>
            )
);

describe('Game component', () => {
    beforeEach(() => {
        mockGridFactory.mockReset();
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_EMPTY_GRID);
    });

    it('Renders the header, grid and footer', () => {
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );

        expect(screen.getByText('not-started')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('Sets up a game with no mines, then adds them after first click', () => {
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );

        expect(mockGridFactory).toBeCalledTimes(1);
        expect(mockGridFactory).toBeCalledWith(
            { ...difficulties[0], mines: 0 },
            undefined
        );

        // start game by clicking middle cell
        userEvent.click(screen.getByTestId('cell-2-2'));
        expect(mockGridFactory).toBeCalledTimes(2);
        expect(mockGridFactory).toBeCalledWith(difficulties[0], { x: 2, y: 2 });
    });

    it('pushes up change difficulty call', () => {
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );

        userEvent.click(
            screen.getByRole('button', {
                name: 'Change difficulty',
            })
        );

        expect(mockOnChangeDifficulty).toBeCalledTimes(1);
    });

    it('Asks user to confirm change difficulty when game in play', () => {
        const mockConfirm = jest.fn(() => true);
        window.confirm = mockConfirm;
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_MINED_CROSS_GRID);

        // start game by clicking the corner
        userEvent.click(screen.getByTestId('cell-0-0'));

        // hit change difficulty button
        userEvent.click(
            screen.getByRole('button', {
                name: 'Change difficulty',
            })
        );

        expect(mockConfirm).toBeCalledTimes(1);
        expect(mockConfirm).toBeCalledWith(
            'Are you sure you want to change difficulty, current progress will be lost'
        );
        expect(mockOnChangeDifficulty).toBeCalledTimes(1);
    });

    it('Does not change difficulty if user cancels', () => {
        // Simulate hitting cancel on the confirm
        const mockConfirm = jest.fn(() => false);
        window.confirm = mockConfirm;

        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_MINED_CROSS_GRID);

        // start game by clicking the corner
        userEvent.click(screen.getByTestId('cell-0-0'));

        // hit change difficulty button
        userEvent.click(
            screen.getByRole('button', {
                name: 'Change difficulty',
            })
        );

        expect(mockConfirm).toBeCalledTimes(1);
        expect(mockConfirm).toBeCalledWith(
            'Are you sure you want to change difficulty, current progress will be lost'
        );
        expect(mockOnChangeDifficulty).toBeCalledTimes(0);
    });

    it('cannot flag a cell before game has started', () => {
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );
        fireEvent.contextMenu(screen.getByTestId('cell-0-0'));
        expect(screen.queryAllByText('🚩')).toHaveLength(0);
    });

    it('second right click unflags a cell', () => {
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_MINED_CROSS_GRID);
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );

        // start game by clicking middle cell
        userEvent.click(screen.getByTestId('cell-2-2'));

        // flag
        fireEvent.contextMenu(screen.getByTestId('cell-0-0'));
        expect(screen.queryAllByText('🚩')).toHaveLength(1);

        // unflag
        fireEvent.contextMenu(screen.getByTestId('cell-0-0'));
        expect(screen.queryAllByText('🚩')).toHaveLength(0);
    });

    it('Completes the mined corners grid in one click', () => {
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );

        expect(mockGridFactory).toBeCalledTimes(1);
        expect(mockGridFactory).toBeCalledWith(
            { ...difficulties[0], mines: 0 },
            undefined
        );

        mockGridFactory.mockReset();
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_MINED_CORNERS_GRID);
        // start game by clicking middle cell
        userEvent.click(screen.getByTestId('cell-2-2'));
        expect(mockGridFactory).toBeCalledTimes(1);
        expect(mockGridFactory).toBeCalledWith(difficulties[0], { x: 2, y: 2 });

        const corners: GridCoords[] = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 0, y: 4 },
            { x: 4, y: 4 },
        ];
        corners.forEach(({ x, y }) => {
            // All four corners are flagged
            const { getByText } = within(screen.getByTestId(`cell-${x}-${y}`));
            expect(getByText('🚩')).toBeInTheDocument();

            // Surrounding cells are labelled with `1`
            traverseNeighbouringCells(
                FIVE_BY_FIVE_MINED_CORNERS_GRID,
                x,
                y,
                (neighbourX, neighbourY) => {
                    const { getByText } = within(
                        screen.getByTestId(`cell-${neighbourX}-${neighbourY}`)
                    );
                    expect(getByText('1')).toBeInTheDocument();
                }
            );
        });

        // Mocked header shows won status
        expect(screen.getByText('won')).toBeInTheDocument();
    });

    it('Can completed the mined cross grid', () => {
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );

        expect(mockGridFactory).toBeCalledTimes(1);
        expect(mockGridFactory).toBeCalledWith(
            { ...difficulties[0], mines: 0 },
            undefined
        );

        mockGridFactory.mockReset();
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_MINED_CROSS_GRID);

        // start game by clicking the corners
        const corners: GridCoords[] = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 0, y: 4 },
            { x: 4, y: 4 },
        ];
        corners.forEach(({ x, y }) => {
            userEvent.click(screen.getByTestId(`cell-${x}-${y}`));
        });
        expect(screen.getByText('in-play')).toBeInTheDocument();

        // Flag the mines
        const minedCells: GridCoords[] = [
            { x: 2, y: 1 },
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 2, y: 3 },
        ];
        minedCells.forEach(({ x, y }) => {
            fireEvent.contextMenu(screen.getByTestId(`cell-${x}-${y}`));
        });

        // Uncover other cells
        const unminedCells: GridCoords[] = [
            { x: 2, y: 0 },
            { x: 0, y: 2 },
            { x: 2, y: 2 },
            { x: 2, y: 4 },
            { x: 4, y: 2 },
        ];
        unminedCells.forEach(({ x, y }) => {
            userEvent.click(screen.getByTestId(`cell-${x}-${y}`));
        });
        // Mocked header shows won status
        expect(screen.getByText('won')).toBeInTheDocument();
    });

    it('Loses when clicking a mine', () => {
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );

        expect(mockGridFactory).toBeCalledTimes(1);
        expect(mockGridFactory).toBeCalledWith(
            { ...difficulties[0], mines: 0 },
            undefined
        );

        mockGridFactory.mockReset();
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_MINED_CROSS_GRID);

        // start game by clicking the corners
        userEvent.click(screen.getByTestId('cell-0-0'));
        expect(screen.getByText('in-play')).toBeInTheDocument();

        const minedCells: GridCoords[] = [
            { x: 2, y: 1 },
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 2, y: 3 },
        ];
        const firstMine = minedCells.shift();
        const firstMinedCell = screen.getByTestId(
            `cell-${firstMine!.x}-${firstMine!.y}`
        );
        userEvent.click(firstMinedCell);
        expect(screen.getByText('lost')).toBeInTheDocument();

        const { getByText } = within(firstMinedCell);
        expect(getByText('💥')).toBeInTheDocument();

        // Mines should all show emoji
        minedCells.forEach(({ x, y }) => {
            const { getByText } = within(screen.getByTestId(`cell-${x}-${y}`));
            expect(getByText('💣')).toBeInTheDocument();
        });
    });

    it('Cannot uncover mines after gameover', () => {
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );

        expect(mockGridFactory).toBeCalledTimes(1);
        expect(mockGridFactory).toBeCalledWith(
            { ...difficulties[0], mines: 0 },
            undefined
        );

        mockGridFactory.mockReset();
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_MINED_CROSS_GRID);

        // start game, then lose on second click
        userEvent.click(screen.getByTestId('cell-0-0'));
        userEvent.click(screen.getByTestId('cell-2-1'));
        expect(screen.getByText('lost')).toBeInTheDocument();

        // Check bottom right is covered before and after a click
        const bottomRight = screen.getByTestId('cell-4-4');
        expect(bottomRight.classList.value).toEqual(
            'c-grid-cell c-grid-cell--covered'
        );
        userEvent.click(bottomRight);
        expect(bottomRight.classList.value).toEqual(
            'c-grid-cell c-grid-cell--covered'
        );
    });

    it('Asks user to confirm a reset when game in play', () => {
        const mockConfirm = jest.fn(() => true);
        window.confirm = mockConfirm;
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_MINED_CROSS_GRID);

        // start game by clicking the corner
        userEvent.click(screen.getByTestId('cell-0-0'));

        // hit reset button
        const statusText = screen.getByText('in-play');
        expect(statusText).toBeInTheDocument();
        userEvent.click(statusText);

        expect(mockConfirm).toBeCalledTimes(1);
        expect(mockConfirm).toBeCalledWith('Are you sure you want to restart');
        expect(mockGridFactory).toBeCalledTimes(3);
    });

    it('Does not reset game if user cancels confirmation', () => {
        const mockConfirm = jest.fn(() => false);
        window.confirm = mockConfirm;
        render(
            <Game
                onChangeDifficulty={mockOnChangeDifficulty}
                difficulty={difficulties[0]}
            />
        );
        mockGridFactory.mockReturnValue(FIVE_BY_FIVE_MINED_CROSS_GRID);

        // start game by clicking the corner
        userEvent.click(screen.getByTestId('cell-0-0'));
        expect(mockGridFactory).toBeCalledTimes(2);

        // hit reset button
        const statusText = screen.getByText('in-play');
        expect(statusText).toBeInTheDocument();
        userEvent.click(statusText);

        expect(mockConfirm).toBeCalledTimes(1);
        expect(mockGridFactory).toBeCalledTimes(2);
    });
});
