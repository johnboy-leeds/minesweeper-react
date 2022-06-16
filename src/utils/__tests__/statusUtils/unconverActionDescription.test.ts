import { unconverActionDescription } from "../../statusUtils";

const mockIsTouchDevice = jest.fn();

jest.mock("../../deviceUtils", () => ({
  isTouchDevice: () => mockIsTouchDevice(),
}));

describe("unconverActionDescription", () => {
  it("touch device", () => {
    mockIsTouchDevice.mockReturnValue(true);
    expect(unconverActionDescription()).toEqual("Tap");
  });

  it("non touch device", () => {
    mockIsTouchDevice.mockReturnValue(false);
    expect(unconverActionDescription()).toEqual("Left click");
  });
});
