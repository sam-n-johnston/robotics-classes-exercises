// Grassfire algorithm
export const START_POINT = -2;
export const BLOCKED_VERTEX = -1;
export const END_POINT = -3;

type arraySize = { maxLength: number; maxRowLength: number };

const getPositions = (position: string) =>
  position.split("|").map(val => parseInt(val));

const getNeigbourPositionString = (position: string, size: arraySize) => {
  const [i, j] = getPositions(position);
  const returnVal = [];

  const sendNegativeI = i - 1 >= 0;
  const sendPositiveI = i + 1 < size.maxLength;
  const sendNegativeJ = j - 1 >= 0;
  const sendPositiveJ = j + 1 < size.maxRowLength;

  if (sendNegativeI) returnVal.push(`${i - 1}|${j}`);
  if (sendPositiveI) returnVal.push(`${i + 1}|${j}`);
  if (sendNegativeJ) returnVal.push(`${i}|${j - 1}`);
  if (sendPositiveJ) returnVal.push(`${i}|${j + 1}`);

  return returnVal;
};

const printArray = (array: any) => {
  array.forEach(row => {
    row.forEach(cell => {
      process.stdout.write(`${cell}\t`); // to prevent newline
    });
    console.log("");
  });
};

const getStartingPoint = (inputArray: number[][]) => {
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[0].length; j++) {
      if (inputArray[i][j] === START_POINT) {
        return `${i}|${j}`;
      }
    }
  }
};

const arrayToHashMap = (inputArray: number[][]) => {
  const output = {};

  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[0].length; j++) {
      output[`${i}|${j}`] = inputArray[i][j];
    }
  }

  return output;
};

const hashMapToArray = (
  hashMap: { [key: string]: number },
  size: arraySize
): number[][] => {
  const array = [];
  for (let i = 0; i < size.maxLength; i++) {
    for (let j = 0; j < size.maxRowLength; j++) {
      array[i] = array[i] || [];
      array[i][j] = 0;
    }
  }

  Object.keys(hashMap).map(key => {
    const [i, j] = getPositions(key);
    array[i][j] = hashMap[key];
  });

  return array as number[][];
};

const getArraySize = (inputArray: number[][]) => {
  return {
    maxLength: inputArray.length,
    maxRowLength: inputArray[0].length
  };
};

export const grassfireLoops = (inputArray: number[][]) => {
  const output = arrayToHashMap(inputArray);
  const startingPoint = getStartingPoint(inputArray);
  const size = getArraySize(inputArray);

  let verteciesToVisitNeigbours = [startingPoint];
  while (verteciesToVisitNeigbours.length > 0) {
    let newArray = [];
    verteciesToVisitNeigbours.forEach(currentElementString => {
      const currentElement = output[currentElementString];
      let neighbors = getNeigbourPositionString(currentElementString, size);
      neighbors.forEach(neighbor => {
        if (output[neighbor] === 0 || output[neighbor] === END_POINT) {
          let value = currentElement === START_POINT ? 1 : currentElement + 1;
          output[neighbor] = value;
          newArray.push(neighbor);
        }
      });
    });
    verteciesToVisitNeigbours = newArray;
  }

  return hashMapToArray(output, size);
};

const recursivelySetNeighboorsValue = (
  hashMap: { [key: string]: number },
  position: string,
  arraySize: arraySize
) => {
  const currentElement = hashMap[position];

  getNeigbourPositionString(position, arraySize).forEach(neighbor => {
    let value = currentElement === START_POINT ? 1 : currentElement + 1;
    if (
      hashMap[neighbor] > value ||
      hashMap[neighbor] === 0 ||
      hashMap[neighbor] === END_POINT
    ) {
      hashMap[neighbor] = value;
      recursivelySetNeighboorsValue(hashMap, neighbor, arraySize);
    }
  });
};

export const grassfireRecursive = (inputArray: number[][]) => {
  const output = arrayToHashMap(inputArray);

  recursivelySetNeighboorsValue(
    output,
    getStartingPoint(inputArray),
    getArraySize(inputArray)
  );

  return hashMapToArray(output, getArraySize(inputArray));
};

// create A* algo, following the actual algo
/**
 * Configuration space exercises? convert some 2d+translation
 * into config space + apply A* algo to it
 * Allow us to visualize
 * This will also force me to create a collision checking function
 * config space => allows planning algo
 * can now deal with only 1 point in x dimentional space
 * because the configuration space simplified everything.
 * No need to think about the positions and angles anymore.
 * Same for high DOF arms for example
 */
