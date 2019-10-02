export const START_POINT = -2;
export const BLOCKED_VERTEX = -1;
export const END_POINT = -3;

type Position = readonly [number, number];
type Node = { f: number; g: number; position: Position };

export const getStartingPoint = (inputArray: number[][]) => {
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
      if (inputArray[i][j] === START_POINT) {
        return [i, j] as const;
      }
    }
  }
};

export const getFinishingPoint = (inputArray: number[][]) => {
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[0].length; j++) {
      if (inputArray[i][j] === END_POINT) {
        return [i, j] as const;
      }
    }
  }
};

const initializeInfiniteSquareDoubleArray = (size: number) => {
  const output: Node[][] = [[]];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      output[i][j] = { f: Infinity, g: Infinity, position: [i, j] };
    }
  }
  return output;
};

const getNeigbourPositions = (position: Position, size: number) => {
  const returnVal = [] as Position[];

  const sendNegativeI = position[0] - 1 >= 0;
  const sendPositiveI = position[0] + 1 < size;
  const sendNegativeJ = position[1] - 1 >= 0;
  const sendPositiveJ = position[1] + 1 < size;

  if (sendNegativeI) returnVal.push([position[0] - 1, position[1]]);
  if (sendPositiveI) returnVal.push([position[0] + 1, position[1]]);
  if (sendNegativeJ) returnVal.push([position[0], position[1] - 1]);
  if (sendPositiveJ) returnVal.push([position[0], position[1] + 1]);

  return returnVal;
};

export const aStar = (input: number[][]) => {
  const output = initializeInfiniteSquareDoubleArray(input.length);
  const startingPoint = getStartingPoint(input);
  const finishingPoint = getFinishingPoint(input);
  const list = [] as Node[];

  // Create heuristic function
  const heuristicFunction = (current: Position, final: Position) => {
    return Math.abs(current[0] - final[0]) + Math.abs(current[1] - final[1]);
  };

  // Initialize first Node
  output[startingPoint[0]][startingPoint[1]] = {
    g: 0,
    f: heuristicFunction(startingPoint, finishingPoint),
    position: startingPoint
  };

  // Get smallest value from list
  const getSmallestValueFromList = (list: Node[]) => {
    return list.reduce((acc, curr) => (curr.f < acc.f ? curr : acc), {
      g: Infinity,
      f: Infinity
    } as Node);
  };

  const isPositionEqual = (p1: Position, p2: Position) =>
    p1 && p2 && p1[0] === p2[0] && p1[1] === p2[1];

  // Add to list
  list.push(output[startingPoint[0]][startingPoint[1]]);

  while (list.length > 0) {
    const smallestValue = getSmallestValueFromList(list);
    if (isPositionEqual(smallestValue.position, finishingPoint)) return; // sucess

    const neighboors = getNeigbourPositions(
      smallestValue.position,
      input.length
    );

    for (let i = 0; i < neighboors.length; i++) {
      // set ng
      // set nf
      // set n parent
      // add n to list (if not already in it)
    }
  }
};
