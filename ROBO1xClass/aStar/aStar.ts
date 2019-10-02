export const START_POINT = -2;
export const BLOCKED_VERTEX = -1;
export const END_POINT = -3;
export const COST_OF_EDGE = 1;

type Position = readonly [number, number];
type Node = { f: number; g: number; position: Position; parent?: Node };

export const printNodeDoubleArray = (
  nodeDoubleArray: Node[][],
  finishingNode: Node
) => {
  const interArray = initialize0SquareDoubleArray(nodeDoubleArray.length);

  const setParents = (numberDoubleArray: number[][], node: Node) => {
    if (node.parent) {
      numberDoubleArray[node.position[0]][node.position[1]] = 1;
      setParents(numberDoubleArray, node.parent);
    }
  };

  setParents(
    interArray,
    getValuesInDoubleArray(nodeDoubleArray, finishingNode.position)
  );

  interArray.forEach(row => {
    row.forEach(cell => {
      process.stdout.write(`${cell}\t`); // to prevent newline
    });
    console.log("");
  });
};

export const getPositionByValue = (inputArray: number[][], point: number) => {
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
      if (inputArray[i][j] === point) {
        return [i, j] as const;
      }
    }
  }
};

export const initialize0SquareDoubleArray = (size: number): number[][] => {
  const output: number[][] = [[]];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      output[i] = output[i] || [];
      output[i][j] = 0;
    }
  }
  return output;
};

export const initializeInfiniteSquareDoubleArray = (size: number): Node[][] => {
  const output: Node[][] = [[]];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      output[i] = output[i] || [];
      output[i][j] = { f: Infinity, g: Infinity, position: [i, j] };
    }
  }
  return output;
};

export const getNeigbourPositions = (position: Position, size: number) => {
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

export const popSmallestNodeFromList = (list: Node[]): Node => {
  const value = list.reduce(
    (acc, curr, index) => (curr.f < acc.f ? { ...curr, index } : acc),
    { f: Infinity } as any
  );

  list.splice(value.index, 1);
  delete value.index;
  return value as Node;
};

export const existsInList = (node: Node, list: Node[]): boolean => {
  return (
    list.findIndex(val => arePositionsEqual([val.position, node.position])) !==
    -1
  );
};

export const arePositionsEqual = (positions: Position[]) =>
  positions.every(
    val => val[0] === positions[0][0] && val[1] === positions[0][1]
  );

export const getValuesInDoubleArray = <T>(
  input: T[][],
  position: Position
): T => input[position[0]][position[1]];

export const aStar = (input: number[][]) => {
  const output = initializeInfiniteSquareDoubleArray(input.length);
  const startingPoint = getPositionByValue(input, START_POINT);
  const finishingPoint = getPositionByValue(input, END_POINT);
  const nodeList = [] as Node[];

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

  // Add to nodeList
  nodeList.push(output[startingPoint[0]][startingPoint[1]]);

  while (nodeList.length > 0) {
    const current = popSmallestNodeFromList(nodeList);
    if (arePositionsEqual([current.position, finishingPoint])) return output; // sucess

    const neighboors = getNeigbourPositions(current.position, input.length);

    for (let i = 0; i < neighboors.length; i++) {
      const neighboorNode = getValuesInDoubleArray(output, neighboors[i]);
      if (neighboorNode.g > current.g + COST_OF_EDGE) {
        neighboorNode.g = current.g + COST_OF_EDGE;
        neighboorNode.f =
          neighboorNode.g +
          heuristicFunction(neighboorNode.position, finishingPoint);
        neighboorNode.parent = current;
        if (!existsInList(neighboorNode, nodeList)) {
          nodeList.push(neighboorNode);
        }
      }
    }
  }
};
