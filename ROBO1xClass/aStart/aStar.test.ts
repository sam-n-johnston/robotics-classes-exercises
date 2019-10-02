import { getStartingPoint, END_POINT, START_POINT } from "./aStar";

describe("aStar", () => {
  describe("getStartingPoint", () => {
    test("should return correct point", () => {
      const input = [[0, 0, 0, 0], [0, START_POINT, 0, 0]];
      expect(getStartingPoint(input)).toEqual([1, 1]);
    });
  });
});
