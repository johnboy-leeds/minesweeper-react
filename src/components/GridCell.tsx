import React from "react";
import { useLongPress } from "../hooks";
import { Cell, GameStatus } from "../interfaces";
import { getCellContent, getSquareStatus } from "../utils";

interface Props {
  gameStatus: GameStatus;
  cell: Cell;
  onUncover(): void;
  onFlag(): void;
}

const GridCell: React.FC<Props> = ({ gameStatus, onFlag, onUncover, cell }) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.type === "click") {
      onUncover();
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      onFlag();
    }
  };

  const onLongPress = useLongPress(onFlag, onUncover);

  return (
    <div
      className={`c-grid-square c-grid-square--${getSquareStatus(
        cell,
        gameStatus
      )}`}
      data-neighbour-count={
        cell.uncovered ? cell.neighbouringMineCount : undefined
      }
      onClick={handleClick}
      onContextMenu={handleClick}
      {...onLongPress}
    >
      {getCellContent(cell, gameStatus)}
    </div>
  );
};

export default GridCell;
