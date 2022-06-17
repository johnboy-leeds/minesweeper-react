import React from 'react';
import useLongPress from '../hooks/useLongPress';
import { Cell, GameStatus } from '../interfaces';
import { getCellContent, getCellStatus } from '../utils';
import { isTouchDevice } from '../utils/deviceUtils';

interface Props {
    gameStatus: GameStatus;
    cell: Cell;
    onUncover(): void;
    onFlag(): void;
    x: number;
    y: number;
}

const GridCell: React.FC<Props> = ({
    gameStatus,
    onFlag,
    onUncover,
    cell,
    x,
    y,
}) => {
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        if (event.type === 'contextmenu') {
            onFlag();
        } else {
            onUncover();
        }
    };

    const touchHandlers = useLongPress({
        onLongPress: onFlag,
        onTap: onUncover,
    });
    const mouseHandlers = { onClick: handleClick, onContextMenu: handleClick };
    const eventHandlers = isTouchDevice() ? touchHandlers : mouseHandlers;

    return (
        <div
            className={`c-grid-cell c-grid-cell--${getCellStatus(
                cell,
                gameStatus
            )}`}
            data-testid={`cell-${x}-${y}`}
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
