import React from "react";
import { Cell, GameStatus } from "../interfaces";
import { getCellContent, getCellStatus } from "../utils";

interface Props {
  gameStatus: GameStatus;
  cell: Cell;
  onUncover(): void;
  onFlag(): void;
}

const GridCell: React.FC<Props> = ({ gameStatus, onFlag, onUncover, cell }) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (event.type === "click") {
      onUncover();
    } else if (event.type === "contextmenu") {
      onFlag();
    }
  };

  return (
    <div
      className={`c-grid-cell c-grid-cell--${getCellStatus(cell, gameStatus)}`}
      data-neighbour-count={
        cell.uncovered ? cell.neighbouringMineCount : undefined
      }
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {getCellContent(cell, gameStatus)}
    </div>
  );
};

export default GridCell;
