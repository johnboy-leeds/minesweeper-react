import { vibrate, VIBRATION_TYPES } from '../../deviceUtils';

let navigatorSpy: jest.SpyInstance;
const mockVibrate = jest.fn();

describe('vibrate', () => {
    beforeEach(() => {
        navigatorSpy = jest.spyOn(window, 'navigator', 'get');
        navigatorSpy.mockImplementation(() => ({
            vibrate: mockVibrate,
        }));
    });

    afterEach(() => {
        navigatorSpy.mockRestore();
    });

    it('vibrates with predefined pattern', () => {
        vibrate(VIBRATION_TYPES.WIN);
        expect(mockVibrate).toBeCalledTimes(1);
        expect(mockVibrate).toBeCalledWith(VIBRATION_TYPES.WIN);
    });

    it('handles vibrate not being defined', () => {
        navigatorSpy.mockImplementation(() => ({
            maxTouchPoints: 2,
        }));
        expect(() => vibrate(VIBRATION_TYPES.WIN)).not.toThrowError();
    });
});
