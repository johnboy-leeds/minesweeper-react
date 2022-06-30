import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { difficulties } from '../../constants';
import DifficultySelect from '../DifficultySelect';

const mockOnSelectDifficulty = jest.fn();
describe('DifficultySelect component', () => {
    beforeEach(() => {
        mockOnSelectDifficulty.mockReset();
    });

    it('Provides options for each difficulty', async () => {
        render(
            <DifficultySelect onSelectDifficulty={mockOnSelectDifficulty} />
        );

        difficulties.forEach(async (difficulty) => {
            const button = await screen.findByRole('button', {
                name: difficulty.label,
            });

            expect(button).toBeInTheDocument();
            userEvent.click(button);
            expect(mockOnSelectDifficulty).toBeCalledWith(difficulty);
        });
    });
});
