import { flagActionDescription } from '../../statusUtils';

const mockIsTouchDevice = jest.fn();

jest.mock('../../deviceUtils', () => ({
    isTouchDevice: () => mockIsTouchDevice(),
}));

describe('flagActionDescription', () => {
    it('touch device', () => {
        mockIsTouchDevice.mockReturnValue(true);
        expect(flagActionDescription()).toEqual('Long press');
    });

    it('non touch device', () => {
        mockIsTouchDevice.mockReturnValue(false);
        expect(flagActionDescription()).toEqual('Right click');
    });
});
