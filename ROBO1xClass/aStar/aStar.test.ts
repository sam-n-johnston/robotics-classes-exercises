import {
  getPositionByValue,
  END_POINT,
  START_POINT,
  initializeInfiniteSquareDoubleArray,
  getNeigbourPositions,
  popSmallestNodeFromList,
  arePositionsEqual,
  getValuesInDoubleArray,
  existsInList,
  aStar,
  printNodeDoubleArray
} from "./aStar";

describe("aStar", () => {
  describe("getPositionByValue", () => {
    test("should return correct point", () => {
      const input = [[0, 0, 0, 0], [0, START_POINT, 0, 0]];
      expect(getPositionByValue(input, START_POINT)).toEqual([1, 1]);
    });

    test("should return correct point for non-square array", () => {
      const input = [[0, 0, 0, 0], [0, START_POINT, 0]];
      expect(getPositionByValue(input, START_POINT)).toEqual([1, 1]);
    });

    test("should return correct point for another value", () => {
      const input = [[0, 0, 0, 0], [0, END_POINT, 0, 0]];
      expect(getPositionByValue(input, END_POINT)).toEqual([1, 1]);
    });
  });

  describe("getValuesInDoubleArray", () => {
    test("should return correct node", () => {
      const input = [[0, 0, 0, 0], [0, START_POINT, 0, 0]];
      expect(getValuesInDoubleArray(input, [1, 1])).toEqual(START_POINT);
    });
  });

  describe("existsInList", () => {
    test("should return true", () => {
      const inputNode = { f: 0, g: 5, position: [1, 5] as const };
      const nodes = [
        inputNode,
        { f: 0, g: 5, position: [5, 5] as const },
        { f: 0, g: 5, position: [2, 5] as const }
      ];
      expect(existsInList(inputNode, nodes)).toEqual(true);
    });

    test("should return false", () => {
      const inputNode = { f: 0, g: 5, position: [1, 5] as const };
      const nodes = [
        { f: 0, g: 5, position: [5, 5] as const },
        { f: 0, g: 5, position: [2, 5] as const }
      ];
      expect(existsInList(inputNode, nodes)).toEqual(false);
    });
  });

  describe("initializeInfiniteSquareDoubleArray", () => {
    test("should return square Node matrix", () => {
      const node = { f: Infinity, g: Infinity, position: expect.anything() };

      expect(initializeInfiniteSquareDoubleArray(3)).toEqual([
        [node, node, node],
        [node, node, node],
        [node, node, node]
      ]);
    });
  });

  describe("getNeigbourPositions", () => {
    test("should exclude 0 i", () => {
      const neighs = getNeigbourPositions([0, 2], 5);
      expect(neighs).toContainEqual([0, 1]);
      expect(neighs).toContainEqual([0, 3]);
      expect(neighs).toContainEqual([1, 2]);
    });

    test("should exclude max i", () => {
      const neighs = getNeigbourPositions([4, 2], 5);
      expect(neighs).toContainEqual([4, 1]);
      expect(neighs).toContainEqual([4, 3]);
      expect(neighs).toContainEqual([3, 2]);
    });

    test("should exclude 0 j", () => {
      const neighs = getNeigbourPositions([2, 0], 5);
      expect(neighs).toContainEqual([1, 0]);
      expect(neighs).toContainEqual([3, 0]);
      expect(neighs).toContainEqual([2, 1]);
    });

    test("should exclude max j", () => {
      const neighs = getNeigbourPositions([2, 4], 5);
      expect(neighs).toContainEqual([1, 4]);
      expect(neighs).toContainEqual([3, 4]);
      expect(neighs).toContainEqual([2, 3]);
    });
  });

  describe("popSmallestNodeFromList", () => {
    test("should find smallest f in list of nodes", () => {
      const node = { f: Infinity, g: Infinity, position: expect.anything() };
      const list = [{ ...node, f: 5 }, { ...node, f: 1 }, { ...node, f: 15 }];

      const smallest = popSmallestNodeFromList(list);
      expect(smallest).toEqual({ ...node, f: 1 });
      expect(list).toHaveLength(2);
      expect(list.findIndex(val => val.f === 1)).toEqual(-1);
    });
  });

  describe("arePositionsEqual", () => {
    test("should return true", () => {
      const val = arePositionsEqual([[1, 2], [1, 2], [1, 2]]);
      expect(val).toEqual(true);
    });

    test("should return false", () => {
      const val = arePositionsEqual([[1, 2], [2, 1], [1, 2]]);
      expect(val).toEqual(false);
    });
  });

  describe("aStar", () => {
    const input = [
      [0, -2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, -1, 0, 0, 0, 0],
      [0, 0, 0, -1, 0, 0, 0, 0],
      [0, 0, 0, -1, -1, 0, 0, 0],
      [0, 0, 0, -1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, -1, 0, 0, 0, -3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    test("aStar", () => {
      const output = aStar(input);
      const endPoint = output[6][5];

      printNodeDoubleArray(output, endPoint);

      expect(endPoint.f).toEqual(10);
      expect(endPoint.g).toEqual(10);
    });
  });
});
