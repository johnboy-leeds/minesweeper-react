import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { difficulties } from '../../constants';
import GameFooter from '../GameFooter';
import { GameStatus } from '../../interfaces';

const mockGetInstruction = jest.fn();
const mockOnChangeDifficulty = jest.fn();

jest.mock('../../utils/statusUtils', () => ({
    getInstruction: () => mockGetInstruction(),
}));

describe('GameFooter component', () => {
    it('Renders the instruction', () => {
        mockGetInstruction.mockReturnValue('You won!');
        render(
            <GameFooter
                gameStatus={GameStatus.WON}
                difficulty={difficulties[0]}
                onChangeDifficulty={mockOnChangeDifficulty}
            />
        );

        expect(screen.getByText('You won!')).toBeInTheDocument();
    });

    it('Allows changing of difficulty', async () => {
        render(
            <GameFooter
                gameStatus={GameStatus.WON}
                difficulty={difficulties[0]}
                onChangeDifficulty={mockOnChangeDifficulty}
            />
        );

        userEvent.click(
            await screen.findByRole('button', {
                name: difficulties[0].label,
            })
        );

        expect(mockOnChangeDifficulty).toBeCalledTimes(1);
    });
});
