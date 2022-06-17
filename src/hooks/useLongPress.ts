import { useCallback, useRef, useState } from 'react';

export interface LongPressTouchHandlers {
    onTouchStart: (event: TouchEvent) => void;
    onTouchEnd: (event: TouchEvent) => void;
    onTouchMove: (event: TouchEvent) => void;
}

export const LONG_PRESS_THRESHOLD = 300;
export const TOUCH_MOVE_THRESHOLD = 25;

export interface useLongPressOptions {
    onLongPress: () => void;
    onTap: () => void;
}

const useLongPress = (options: useLongPressOptions): LongPressTouchHandlers => {
    const { onLongPress, onTap } = options;
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef<NodeJS.Timeout>();
    const target = useRef<EventTarget>();
    const startPosition = useRef<{ x: number; y: number }>();

    const start = useCallback(
        (event: TouchEvent) => {
            if (timeout.current || !event.target) {
                return;
            }

            target.current = event.target;

            timeout.current = setTimeout(() => {
                onLongPress();
                setLongPressTriggered(true);
            }, LONG_PRESS_THRESHOLD);

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

            startPosition.current = undefined;
        },
        [onTap, longPressTriggered]
    );

    const handleTouchEnd = useCallback(
        (event: TouchEvent) => {
            event.preventDefault();
            clear();
        },
        [clear]
    );

    const handleMove = useCallback(
        (event: TouchEvent) => {
            const currentPosition = event.touches.length && {
                x: event.touches[0].pageX,
                y: event.touches[0].pageY,
            };

            if (currentPosition && startPosition.current) {
                const moveThreshold = TOUCH_MOVE_THRESHOLD;
                const movedDistance = {
                    x: Math.abs(currentPosition.x - startPosition.current.x),
                    y: Math.abs(currentPosition.y - startPosition.current.y),
                };

                // If moved outside move tolerance box then cancel long press
                if (
                    movedDistance.x > moveThreshold ||
                    movedDistance.y > moveThreshold
                ) {
                    clear(false);
                }
            }
        },
        [clear]
    );

    return {
        onTouchStart: (event: TouchEvent): void => start(event),
        onTouchEnd: (event: TouchEvent): void => handleTouchEnd(event),
        onTouchMove: (event: TouchEvent): void => handleMove(event),
    };
};

export default useLongPress;
