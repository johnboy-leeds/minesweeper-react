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

  return {
    onTouchStart: (event: TouchEvent): void => start(event),
    onTouchEnd: (): void => clear(),
    onTouchMove: (): void => clear(false),
  };
};

const preventDefault: EventListener = (event: Event): void =>
  event.preventDefault();

export default useLongPress;
