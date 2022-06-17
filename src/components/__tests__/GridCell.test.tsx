import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    LONG_PRESS_THRESHOLD,
    TOUCH_MOVE_THRESHOLD,
} from '../../hooks/useLongPress';
import { GameStatus } from '../../interfaces';
import {
    emptyCovered,
    emptyUncovered,
} from '../../utils/__tests__/testCellFactory';
import GridCell from '../GridCell';

const mockIsTouchDevice = jest.fn();
const mockOnFlag = jest.fn();
const mockOnUncover = jest.fn();

jest.mock('../../utils/deviceUtils', () => ({
    isTouchDevice: () => mockIsTouchDevice(),
}));

describe('GridCell component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders the neighbouring mine count for uncovered cells', () => {
        render(
            <GridCell
                cell={emptyUncovered(6)}
                gameStatus={GameStatus.IN_PLAY}
                onFlag={mockOnFlag}
                onUncover={mockOnUncover}
                x={0}
                y={0}
            />
        );
        expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('does not render the neighbouring mine count for uncovered cells', () => {
        render(
            <GridCell
                cell={emptyCovered(6)}
                gameStatus={GameStatus.IN_PLAY}
                onFlag={mockOnFlag}
                onUncover={mockOnUncover}
                x={0}
                y={0}
            />
        );
        expect(screen.queryAllByText('6')).toHaveLength(0);
    });

    describe('non touch device', () => {
        beforeEach(() => {
            mockIsTouchDevice.mockReturnValue(false);
        });

        it('calls uncover when left clicked', () => {
            render(
                <GridCell
                    cell={emptyCovered(6)}
                    gameStatus={GameStatus.IN_PLAY}
                    onFlag={mockOnFlag}
                    onUncover={mockOnUncover}
                    x={0}
                    y={0}
                />
            );
            expect(screen.queryAllByText('6')).toHaveLength(0);
            userEvent.click(screen.getByTestId('cell-0-0'));
            expect(mockOnUncover).toBeCalledTimes(1);
            expect(mockOnFlag).toBeCalledTimes(0);
        });

        it('calls unflag when right clicked', () => {
            render(
                <GridCell
                    cell={emptyCovered(6)}
                    gameStatus={GameStatus.IN_PLAY}
                    onFlag={mockOnFlag}
                    onUncover={mockOnUncover}
                    x={0}
                    y={0}
                />
            );
            expect(screen.queryAllByText('6')).toHaveLength(0);
            fireEvent.contextMenu(screen.getByTestId('cell-0-0'));
            expect(mockOnUncover).toBeCalledTimes(0);
            expect(mockOnFlag).toBeCalledTimes(1);
        });
    });

    describe('touch device', () => {
        beforeEach(() => {
            mockIsTouchDevice.mockReturnValue(true);
        });

        it('calls uncover when left clicked', () => {
            render(
                <GridCell
                    cell={emptyCovered(6)}
                    gameStatus={GameStatus.IN_PLAY}
                    onFlag={mockOnFlag}
                    onUncover={mockOnUncover}
                    x={0}
                    y={0}
                />
            );
            expect(screen.queryAllByText('6')).toHaveLength(0);
            fireEvent.touchStart(screen.getByTestId('cell-0-0'), {
                touches: [{ pageX: 0, pageY: 0 }],
            });

            setTimeout(() => {
                fireEvent.touchEnd(screen.getByTestId('cell-0-0'), {
                    touches: [{ pageX: 0, pageY: 0 }],
                });
                expect(mockOnUncover).toBeCalledTimes(1);
                expect(mockOnFlag).toBeCalledTimes(0);
            }, LONG_PRESS_THRESHOLD / 2);
        });

        it('calls unflag when right clicked', () => {
            render(
                <GridCell
                    cell={emptyCovered(6)}
                    gameStatus={GameStatus.IN_PLAY}
                    onFlag={mockOnFlag}
                    onUncover={mockOnUncover}
                    x={0}
                    y={0}
                />
            );
            expect(screen.queryAllByText('6')).toHaveLength(0);
            fireEvent.touchStart(screen.getByTestId('cell-0-0'), {
                touches: [{ pageX: 0, pageY: 0 }],
            });

            setTimeout(() => {
                fireEvent.touchEnd(screen.getByTestId('cell-0-0'), {
                    touches: [{ pageX: 0, pageY: 0 }],
                });
                expect(mockOnUncover).toBeCalledTimes(0);
                expect(mockOnFlag).toBeCalledTimes(1);
            }, LONG_PRESS_THRESHOLD + 50);
        });

        it('still triggers uncover with a slight movement', () => {
            render(
                <GridCell
                    cell={emptyCovered(6)}
                    gameStatus={GameStatus.IN_PLAY}
                    onFlag={mockOnFlag}
                    onUncover={mockOnUncover}
                    x={0}
                    y={0}
                />
            );
            expect(screen.queryAllByText('6')).toHaveLength(0);
            fireEvent.touchStart(screen.getByTestId('cell-0-0'), {
                touches: [{ pageX: 0, pageY: 0 }],
            });
            fireEvent.touchMove(screen.getByTestId('cell-0-0'), {
                touches: [{ pageX: TOUCH_MOVE_THRESHOLD / 2, pageY: 0 }],
            });

            setTimeout(() => {
                fireEvent.touchEnd(screen.getByTestId('cell-0-0'), {
                    touches: [{ pageX: 0, pageY: 0 }],
                });
                expect(mockOnUncover).toBeCalledTimes(1);
                expect(mockOnFlag).toBeCalledTimes(0);
            }, LONG_PRESS_THRESHOLD / 2);
        });

        it('does not flag or uncover if touch moves away', () => {
            render(
                <GridCell
                    cell={emptyCovered(6)}
                    gameStatus={GameStatus.IN_PLAY}
                    onFlag={mockOnFlag}
                    onUncover={mockOnUncover}
                    x={0}
                    y={0}
                />
            );
            expect(screen.queryAllByText('6')).toHaveLength(0);
            fireEvent.touchStart(screen.getByTestId('cell-0-0'), {
                touches: [{ pageX: 0, pageY: 0 }],
            });
            fireEvent.touchMove(screen.getByTestId('cell-0-0'), {
                touches: [
                    {
                        pageX: TOUCH_MOVE_THRESHOLD,
                        pageY: TOUCH_MOVE_THRESHOLD,
                    },
                ],
            });

            setTimeout(() => {
                fireEvent.touchEnd(screen.getByTestId('cell-0-0'), {
                    touches: [{ pageX: 0, pageY: 0 }],
                });
                expect(mockOnUncover).toBeCalledTimes(0);
                expect(mockOnFlag).toBeCalledTimes(0);
            }, LONG_PRESS_THRESHOLD + 50);
        });
    });
});
