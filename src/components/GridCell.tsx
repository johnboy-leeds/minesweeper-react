import React from "react";
import useLongPress from "../hooks/useLongPress";
import { Cell, GameStatus } from "../interfaces";
import { getCellContent, getCellStatus } from "../utils";
import { isTouchDevice } from "../utils/deviceUtils";

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

  const touchHandlers = useLongPress(onFlag, onUncover);
  const mouseHanlders = { onClick: handleClick, onContextMenu: handleClick };
  const eventHandlers = isTouchDevice() ? touchHandlers : mouseHanlders;

  return (
    <div
      className={`c-grid-cell c-grid-cell--${getCellStatus(cell, gameStatus)}`}
      data-neighbour-count={
        cell.uncovered ? cell.neighbouringMineCount : undefined
      }
      role="button"
      {...eventHandlers}
    >
      {getCellContent(cell, gameStatus)}
    </div>
  );
};

export default GridCell;
