import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Instructions from '../Instructions';

const mockIsTouchDevice = jest.fn();
const mockOnNext = jest.fn();

jest.mock('../../utils/deviceUtils', () => ({
    isTouchDevice: () => mockIsTouchDevice(),
}));

describe('Instructions component', () => {
    it('shows tailored instructions for touch', async () => {
        mockIsTouchDevice.mockReturnValue(true);

        render(<Instructions next={mockOnNext} isGameInProgress={false} />);

        expect(
            await screen.findByText('Tap a cell to uncover it.')
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                'Long press a cell to mark suspected mines.'
            )
        ).toBeInTheDocument();
    });

    it('shows tailored instructions for mouse', async () => {
        mockIsTouchDevice.mockReturnValue(false);

        render(<Instructions next={mockOnNext} isGameInProgress={false} />);

        expect(
            await screen.findByText('Left click a cell to uncover it.')
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                'Right click a cell to mark suspected mines.'
            )
        ).toBeInTheDocument();
    });

    it('Can start the game', async () => {
        render(<Instructions next={mockOnNext} isGameInProgress={false} />);

        userEvent.click(
            await screen.findByRole('button', {
                name: 'Start',
            })
        );

        expect(mockOnNext).toHaveBeenCalledTimes(1);
    });

    it('Can resume the game', async () => {
        render(<Instructions next={mockOnNext} isGameInProgress={true} />);

        userEvent.click(
            await screen.findByRole('button', {
                name: 'Resume',
            })
        );

        expect(mockOnNext).toHaveBeenCalledTimes(1);
    });
});
