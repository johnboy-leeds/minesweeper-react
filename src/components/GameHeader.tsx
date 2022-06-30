import { GameStatus } from '../interfaces';
import { getStatusEmoji } from '../utils/statusUtils';

interface Props {
    unmarkedMineCount: number;
    status: GameStatus;
    timeElapsed: number;
    onReset(): void;
}

const GameHeader: React.FC<Props> = ({
    onReset,
    status,
    timeElapsed,
    unmarkedMineCount,
}) => {
    const formatNumber = (num: number): string => {
        let padding = '';
        if (num < 10) {
            padding = '00';
        } else if (num < 100) {
            padding = '0';
        }

        return `${padding}${Math.max(num, 0)}`;
    };

    return (
        <div className="c-game-header">
            <div>
                <div className="c-game-header__timer" data-testid="game-timer">
                    {formatNumber(timeElapsed)}
                </div>
                <span className="c-game-header__icon">⏱</span>
            </div>
            <button
                className="c-game-header__status"
                onClick={onReset}
                data-testid="game-status"
            >
                {getStatusEmoji(status)}
            </button>
            <div>
                <span className="c-game-header__icon">🚩</span>
                <div
                    className="c-game-header__unmarked-mines"
                    data-testid="unmarked-mine-count"
                >
                    {formatNumber(unmarkedMineCount)}
                </div>
            </div>
        </div>
    );
};

export default GameHeader;
