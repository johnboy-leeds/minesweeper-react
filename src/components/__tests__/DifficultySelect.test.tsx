import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { difficulties } from '../../constants';
import DifficultySelect from '../DifficultySelect';

const mockOnSelectDifficulty = jest.fn();
const mockOnShowInstructions = jest.fn();
describe('DifficultySelect component', () => {
    beforeEach(() => {
        mockOnSelectDifficulty.mockReset();
        mockOnShowInstructions.mockReset();
    });

    it('Provides options for each difficulty', async () => {
        render(
            <DifficultySelect
                onSelectDifficulty={mockOnSelectDifficulty}
                onShowInstructions={mockOnShowInstructions}
            />
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

    it('Allows navigation back to instructions', async () => {
        render(
            <DifficultySelect
                onSelectDifficulty={mockOnSelectDifficulty}
                onShowInstructions={mockOnShowInstructions}
            />
        );

        userEvent.click(
            await screen.findByRole('button', {
                name: 'Back to instructions',
            })
        );

        expect(mockOnShowInstructions).toBeCalledTimes(1);
    });
});
