import {
  useCallback,
  useRef,
  useState,
  TouchEventHandler,
  TouchEvent,
} from "react";

interface TouchHandlers {
  onTouchStart: TouchEventHandler;
  onTouchEnd: TouchEventHandler;
  onTouchMove: TouchEventHandler;
}

const delay = 300;

const useLongPress = (
  onLongPress: () => void,
  onTap: () => void
): TouchHandlers => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();
  const startPosition = useRef<{ x: number; y: number }>();

  const start = useCallback(
    (event: TouchEvent) => {
      if (event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress();
        setLongPressTriggered(true);
      }, delay);

      startPosition.current = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      };
    },
    [onLongPress]
  );

  const clear = useCallback(
    (shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onTap();
      setLongPressTriggered(false);
      if (target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [onTap, longPressTriggered]
  );

  const handleMove = useCallback(
    (event: TouchEvent) => {
      const currentPosition = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      };

      if (currentPosition && startPosition.current) {
        const moveThreshold = 25;
        const movedDistance = {
          x: Math.abs(currentPosition.x - startPosition.current.x),
          y: Math.abs(currentPosition.y - startPosition.current.y),
        };

        // If moved outside move tolerance box then cancel long press
        if (
          movedDistance.x > moveThreshold ||
          movedDistance.y > moveThreshold
        ) {
          clear();
        }
      }
    },
    [clear]
  );

  return {
    onTouchStart: (event: TouchEvent): void => start(event),
    onTouchEnd: (): void => clear(),
    onTouchMove: (event: TouchEvent): void => handleMove(event),
  };
};

const preventDefault: EventListener = (event: Event): void =>
  event.preventDefault();

export default useLongPress;
