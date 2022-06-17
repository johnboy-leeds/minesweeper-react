import { isTouchDevice } from '../../deviceUtils';

let windowSpy: jest.SpyInstance;
let navigatorSpy: jest.SpyInstance;

describe('isTouchDevice', () => {
    beforeEach(() => {
        windowSpy = jest.spyOn(window, 'window', 'get');
        navigatorSpy = jest.spyOn(window, 'navigator', 'get');
    });

    afterEach(() => {
        windowSpy.mockRestore();
        navigatorSpy.mockRestore();
    });

    it('ontouchstart', () => {
        windowSpy.mockImplementation(() => ({
            ontouchstart: jest.fn(),
        }));
        expect(isTouchDevice()).toBeTruthy();

        windowSpy.mockImplementation(() => ({
            // ontouchstart is not defined
        }));
        expect(isTouchDevice()).toBeFalsy();
    });

    it('maxTouchPoints', () => {
        navigatorSpy.mockImplementation(() => ({
            maxTouchPoints: 2,
        }));
        expect(isTouchDevice()).toBeTruthy();

        navigatorSpy.mockImplementation(() => ({
            maxTouchPoints: undefined,
        }));
        expect(isTouchDevice()).toBeFalsy();
    });
});
