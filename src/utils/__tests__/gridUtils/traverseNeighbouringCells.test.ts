import { Grid } from "../../../interfaces";
import { traverseNeighbouringCells } from "../../gridUtils";
import { emptyCovered } from "../testCellFactory";

const SIX_BY_SIX_GRID: Grid = [
  [
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
  ],
  [
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
  ],
  [
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
  ],
  [
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
  ],
  [
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
  ],
  [
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
    emptyCovered(),
  ],
];

describe("traverseNeighbouringCells", () => {
  it("throws error for empty grid", () => {
    const callback = jest.fn();
    expect(() => traverseNeighbouringCells([], 0, 0, callback)).toThrowError(
      "Grid has no rows"
    );
    expect(callback).toBeCalledTimes(0);
  });

  it("handles top left corner", () => {
    const callback = jest.fn();
    traverseNeighbouringCells(SIX_BY_SIX_GRID, 0, 0, callback);
    expect(callback).toBeCalledTimes(3);
    expect(callback).toBeCalledWith(0, 1);
    expect(callback).toBeCalledWith(1, 0);
    expect(callback).toBeCalledWith(1, 1);
  });

  it("handles top right corner", () => {
    const callback = jest.fn();
    traverseNeighbouringCells(SIX_BY_SIX_GRID, 5, 0, callback);
    expect(callback).toBeCalledTimes(3);
    expect(callback).toBeCalledWith(4, 0);
    expect(callback).toBeCalledWith(4, 1);
    expect(callback).toBeCalledWith(5, 1);
  });

  it("handles bottom left corner", () => {
    const callback = jest.fn();
    traverseNeighbouringCells(SIX_BY_SIX_GRID, 0, 5, callback);
    expect(callback).toBeCalledTimes(3);
    expect(callback).toBeCalledWith(0, 4);
    expect(callback).toBeCalledWith(1, 4);
    expect(callback).toBeCalledWith(1, 5);
  });

  it("handles bottom right corner", () => {
    const callback = jest.fn();
    traverseNeighbouringCells(SIX_BY_SIX_GRID, 5, 5, callback);
    expect(callback).toBeCalledTimes(3);
    expect(callback).toBeCalledWith(4, 4);
    expect(callback).toBeCalledWith(4, 5);
    expect(callback).toBeCalledWith(5, 4);
  });

  it("handles middle", () => {
    const callback = jest.fn();
    traverseNeighbouringCells(SIX_BY_SIX_GRID, 3, 3, callback);
    expect(callback).toBeCalledTimes(8);
    expect(callback).toBeCalledWith(2, 2);
    expect(callback).toBeCalledWith(2, 3);
    expect(callback).toBeCalledWith(2, 4);
    expect(callback).toBeCalledWith(3, 2);
    expect(callback).toBeCalledWith(3, 4);
    expect(callback).toBeCalledWith(4, 2);
    expect(callback).toBeCalledWith(4, 3);
    expect(callback).toBeCalledWith(4, 4);
  });
});
