import { Cell, GameStatus, Grid, Row } from "../interfaces";
import GridCell from "./GridCell";

interface Props {
  gameStatus: GameStatus;
  gameGrid: Grid;
  onUncoverSquare(x: number, y: number): void;
  onFlagSquare(x: number, y: number): void;
}

const GameGrid: React.FC<Props> = ({
  gameStatus,
  onFlagSquare,
  onUncoverSquare,
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
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {grid.map((row: Row, y) =>
        row.map((cell: Cell, x) => (
          <GridCell
            key={`${y}-${x}`}
            gameStatus={gameStatus}
            cell={cell}
            onUncover={() => onUncoverSquare(x, y)}
            onFlag={() => onFlagSquare(x, y)}
          />
        ))
      )}
    </div>
  );
};

export default GameGrid;
