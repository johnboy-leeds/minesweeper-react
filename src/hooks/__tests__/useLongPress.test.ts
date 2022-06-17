import { act, renderHook, RenderHookResult } from '@testing-library/react';
import useLongPress, {
    LongPressTouchHandlers,
    LONG_PRESS_THRESHOLD,
    TOUCH_MOVE_THRESHOLD,
    useLongPressOptions,
} from '../useLongPress';

const mockOnTap = jest.fn();
const mockOnLongPress = jest.fn();

jest.useFakeTimers();

const startEvent: TouchEvent = {
    touches: [{ pageX: 0, pageY: 0 } as Touch],
    target: new EventTarget(),
};

const renderUseLongPress = (
    options: useLongPressOptions
): RenderHookResult<LongPressTouchHandlers, useLongPressOptions> =>
    renderHook(() => useLongPress(options));

describe('useLongPress hook', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('calls onTap for short touches', () => {
        const { result } = renderUseLongPress({
            onTap: mockOnTap,
            onLongPress: mockOnLongPress,
        });
        const { onTouchEnd, onTouchStart } = result.current;
        onTouchStart(startEvent);
        jest.advanceTimersByTime(LONG_PRESS_THRESHOLD / 2);
        onTouchEnd(
            new TouchEvent('touchend', {
                touches: [{ pageX: 0, pageY: 0 } as Touch],
            })
        );

        expect(mockOnTap).toBeCalledTimes(1);
        expect(mockOnLongPress).toBeCalledTimes(0);
    });

    it('calls onLongPress for long touches', () => {
        const { result } = renderUseLongPress({
            onTap: mockOnTap,
            onLongPress: mockOnLongPress,
        });
        const { onTouchStart } = result.current;

        onTouchStart(startEvent);

        act(() => {
            jest.runAllTimers();
        });

        expect(mockOnLongPress).toBeCalledTimes(1);
        expect(mockOnTap).toBeCalledTimes(0);
    });

    it('no calls for touch event without target', () => {
        const { result } = renderUseLongPress({
            onTap: mockOnTap,
            onLongPress: mockOnLongPress,
        });
        const { onTouchStart } = result.current;

        onTouchStart(
            new TouchEvent('touchstart', {
                touches: [
                    { pageX: 0, pageY: TOUCH_MOVE_THRESHOLD * 2 } as Touch,
                ],
            })
        );

        act(() => {
            jest.runAllTimers();
        });

        expect(mockOnLongPress).toBeCalledTimes(0);
        expect(mockOnTap).toBeCalledTimes(0);
    });

    it('does not call onLongPress if touch moved too far on Y axis', () => {
        const { result } = renderUseLongPress({
            onTap: mockOnTap,
            onLongPress: mockOnLongPress,
        });
        const { onTouchStart, onTouchMove } = result.current;
        onTouchStart(startEvent);
        onTouchMove(
            new TouchEvent('touchmove', {
                touches: [
                    { pageX: 0, pageY: TOUCH_MOVE_THRESHOLD * 2 } as Touch,
                ],
            })
        );

        act(() => {
            jest.runAllTimers();
        });
        expect(mockOnTap).toBeCalledTimes(0);
        expect(mockOnLongPress).toBeCalledTimes(0);
    });

    it('does not call onLongPress if touch moved too far on X axis', () => {
        const { result } = renderUseLongPress({
            onTap: mockOnTap,
            onLongPress: mockOnLongPress,
        });
        const { onTouchStart, onTouchMove } = result.current;
        onTouchStart(startEvent);
        onTouchMove(
            new TouchEvent('touchmove', {
                touches: [
                    { pageX: TOUCH_MOVE_THRESHOLD * 2, pageY: 0 } as Touch,
                ],
            })
        );
        act(() => {
            jest.runAllTimers();
        });
        expect(mockOnTap).toBeCalledTimes(0);
        expect(mockOnLongPress).toBeCalledTimes(0);
    });

    it('move with no position', () => {
        const { result } = renderUseLongPress({
            onTap: mockOnTap,
            onLongPress: mockOnLongPress,
        });
        const { onTouchStart, onTouchMove } = result.current;
        onTouchStart(startEvent);
        onTouchMove(new TouchEvent('touchmove'));

        act(() => {
            jest.runAllTimers();
        });

        expect(mockOnTap).toBeCalledTimes(0);
        expect(mockOnLongPress).toBeCalledTimes(1);
    });
});
