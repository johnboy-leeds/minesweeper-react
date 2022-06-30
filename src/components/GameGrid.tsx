import { Cell, GameStatus, Grid, Row } from '../interfaces';
import GridCell from './GridCell';

interface Props {
    gameStatus: GameStatus;
    gameGrid: Grid;
    onUncoverCell(x: number, y: number): void;
    onFlagCell(x: number, y: number): void;
}

const GameGrid: React.FC<Props> = ({
    gameStatus,
    onFlagCell,
    onUncoverCell,
    gameGrid: grid,
}) => {
    if (!grid.length) {
        return null;
    }

    const rows = grid.length;
    const cols = grid[0].length;

    return (
        <div
            className={`c-grid`}
            data-testid="game-grid"
            style={
                {
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    '--cols': `${cols}`,
                } as React.CSSProperties
            }
        >
            {grid.map((row: Row, y) =>
                row.map((cell: Cell, x) => (
                    <GridCell
                        key={`${y}-${x}`}
                        gameStatus={gameStatus}
                        cell={cell}
                        onUncover={() => onUncoverCell(x, y)}
                        onFlag={() => onFlagCell(x, y)}
                        x={x}
                        y={y}
                    />
                ))
            )}
        </div>
    );
};

export default GameGrid;
