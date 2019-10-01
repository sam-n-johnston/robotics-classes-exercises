// Grassfire algorithm
const START_POINT = -2;
const BLOCKED_VERTEX = -1;
const END_POINT = -3;

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

const getPositions = (position: string) =>
  position.split("|").map(val => parseInt(val));

const getNeigbours = (position: string) => {
  const [i, j] = getPositions(position);
  const returnVal = [];

  const sendNegativeI = i - 1 >= 0;
  const sendPositiveI = i + 1 < input.length;
  const sendNegativeJ = j - 1 >= 0;
  const sendPositiveJ = j + 1 < input[0].length;

  if (sendNegativeI) returnVal.push(`${i - 1}|${j}`);
  if (sendPositiveI) returnVal.push(`${i + 1}|${j}`);
  if (sendNegativeJ) returnVal.push(`${i}|${j - 1}`);
  if (sendPositiveJ) returnVal.push(`${i}|${j + 1}`);

  return returnVal;
};

const printArray = (array: number[][]) => {
  array.forEach(row => {
    row.forEach(cell => {
      process.stdout.write(`${cell}\t`); // to prevent newline
    });
    console.log("");
  });
};

const getStartingPoint = (inputArray: number[][]) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === START_POINT) {
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

const hashMapToArray = (hashMap: { [key: string]: number }) => {
  const array = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];

  Object.keys(hashMap).map(key => {
    const [i, j] = getPositions(key);
    array[i][j] = hashMap[key];
  });

  return array;
};

const grassfireLoops = (inputArray: number[][]) => {
  const output = arrayToHashMap(inputArray);
  let startingPoint = getStartingPoint(inputArray);

  let verteciesToVisitNeigbours = [startingPoint];
  while (verteciesToVisitNeigbours.length > 0) {
    let newArray = [];
    verteciesToVisitNeigbours.forEach(currentElementString => {
      const currentElement = output[currentElementString];
      let neighbors = getNeigbours(currentElementString);
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

  printArray(hashMapToArray(output));
};

const recursivelySetNeighboorsValue = (
  hashMap: { [key: string]: number },
  position: string
) => {
  const currentElement = hashMap[position];

  getNeigbours(position).forEach(neighbor => {
    let value = currentElement === START_POINT ? 1 : currentElement + 1;
    if (
      hashMap[neighbor] > value ||
      hashMap[neighbor] === 0 ||
      hashMap[neighbor] === END_POINT
    ) {
      hashMap[neighbor] = value;
      recursivelySetNeighboorsValue(hashMap, neighbor);
    }
  });
};

const grassfireRecursive = (inputArray: number[][]) => {
  const output = arrayToHashMap(inputArray);
  let startingPoint = getStartingPoint(inputArray);

  recursivelySetNeighboorsValue(output, startingPoint);

  printArray(hashMapToArray(output));
};

grassfireRecursive(input);
