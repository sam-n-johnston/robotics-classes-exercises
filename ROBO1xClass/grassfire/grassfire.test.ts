import { grassfireRecursive, grassfireLoops } from "./grassfire";

describe("grassfire", () => {
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

  const output = [
    [1, -2, 1, 2, 3, 4, 5, 6],
    [2, 1, 2, -1, 4, 5, 6, 7],
    [3, 2, 3, -1, 5, 6, 7, 8],
    [4, 3, 4, -1, -1, 7, 8, 9],
    [5, 4, 5, -1, 9, 8, 9, 10],
    [6, 5, 6, 7, 8, 9, 10, 11],
    [7, -1, 7, 8, 9, 10, 11, 12],
    [8, 9, 8, 9, 10, 11, 12, 13]
  ];

  test("grassfireRecursive", () => {
    expect(grassfireRecursive(input)).toEqual(output);
  });

  test("grassfireLoops", () => {
    expect(grassfireLoops(input)).toEqual(output);
  });
});
