import { GameStatus } from "../interfaces";

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
  const getStatusEmoji = (status: GameStatus): string => {
    switch (status) {
      case GameStatus.WON:
        return "😎";
      case GameStatus.LOST:
        return "💀";
      default:
        return "😃";
    }
  };

  const formatNumber = (num: number): string => {
    let padding = "";
    if (num < 10) {
      padding = "00";
    } else if (num < 100) {
      padding = "0";
    }

    return `${padding}${Math.max(num, 0)}`;
  };

  return (
    <div className="c-status-bar">
      <div className="c-status-bar__timer">{formatNumber(timeElapsed)}</div>
      <div className="c-status-bar__status" onClick={onReset}>
        {getStatusEmoji(status)}
      </div>
      <div className="c-status-bar__unmarked-mines">
        {formatNumber(unmarkedMineCount)}
      </div>
    </div>
  );
};

export default GameHeader;
