import { Grid } from "../../../interfaces";
import { toggleCellFlag } from "../../cellUtils";
import { emptyUncovered, minedCovered } from "../testCellFactory";

describe("toggleCellFlag", () => {
  it("Flags a covered cell", () => {
    const grid: Grid = [[minedCovered()]];
    const updatedGrid = toggleCellFlag(grid, 0, 0);
    expect(updatedGrid[0][0].isFlagged).toBeTruthy();
  });

  it("Does not flag an uncovered cell", () => {
    const grid: Grid = [[emptyUncovered()]];
    const updatedGrid = toggleCellFlag(grid, 0, 0);
    expect(updatedGrid[0][0].isFlagged).toBeFalsy();
  });
});
