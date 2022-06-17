import { render, screen } from '@testing-library/react';
import { GameStatus } from '../../interfaces';
import GameHeader from '../GameHeader';

const mockOnReset = jest.fn();

describe('GameHeader component', () => {
    it('displays elapsed time and remaining mines with appropriate zero padding', async () => {
        render(
            <GameHeader
                timeElapsed={23}
                unmarkedMineCount={17}
                status={GameStatus.IN_PLAY}
                onReset={mockOnReset}
            />
        );

        expect(await screen.findByText('023')).toBeInTheDocument();
        expect(await screen.findByText('017')).toBeInTheDocument();

        render(
            <GameHeader
                timeElapsed={999}
                unmarkedMineCount={6}
                status={GameStatus.IN_PLAY}
                onReset={mockOnReset}
            />
        );
        expect(await screen.findByText('999')).toBeInTheDocument();
        expect(await screen.findByText('006')).toBeInTheDocument();
    });

    it('displays appropriate emoji for the status', async () => {
        render(
            <GameHeader
                timeElapsed={23}
                unmarkedMineCount={17}
                status={GameStatus.IN_PLAY}
                onReset={mockOnReset}
            />
        );
        expect(await screen.findByText('😃')).toBeInTheDocument();

        render(
            <GameHeader
                timeElapsed={23}
                unmarkedMineCount={17}
                status={GameStatus.WON}
                onReset={mockOnReset}
            />
        );
        expect(await screen.findByText('😎')).toBeInTheDocument();

        render(
            <GameHeader
                timeElapsed={23}
                unmarkedMineCount={17}
                status={GameStatus.LOST}
                onReset={mockOnReset}
            />
        );
        expect(await screen.findByText('💀')).toBeInTheDocument();
    });
});
