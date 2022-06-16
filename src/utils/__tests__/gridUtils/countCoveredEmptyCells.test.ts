import { Cell, Grid } from "../../../interfaces";
import { countCoveredEmptyCells } from "../../gridUtils";
import { emptyCovered, emptyUncovered, minedCovered } from "../testCellFactory";

describe("countCoveredEmptyCells", () => {
  it("handles fully covered grid", () => {
    const grid: Grid = [
      [emptyCovered(), emptyCovered(), emptyCovered()],
      [emptyCovered(), emptyCovered(), emptyCovered()],
      [emptyCovered(), emptyCovered(), emptyCovered()],
    ];

    expect(countCoveredEmptyCells(grid)).toEqual(9);
  });

  it("handles fully uncovered grid", () => {
    const grid: Grid = [
      [emptyUncovered(), emptyUncovered(), emptyUncovered()],
      [emptyUncovered(), emptyUncovered(), emptyUncovered()],
      [emptyUncovered(), emptyUncovered(), emptyUncovered()],
    ];

    expect(countCoveredEmptyCells(grid)).toEqual(0);
  });

  it("handles mixed grid", () => {
    const grid: Grid = [
      [emptyCovered(), minedCovered(), minedCovered()],
      [emptyUncovered(), emptyCovered(), emptyUncovered()],
      [emptyUncovered(), emptyUncovered(), emptyCovered()],
    ];

    expect(countCoveredEmptyCells(grid)).toEqual(3);
  });

  it("handles a completed grid", () => {
    const grid: Grid = [
      [minedCovered(), minedCovered(), minedCovered()],
      [emptyUncovered(), emptyUncovered(), minedCovered()],
      [emptyUncovered(), emptyUncovered(), emptyUncovered()],
    ];

    expect(countCoveredEmptyCells(grid)).toEqual(0);
  });
});
