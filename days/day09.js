const DIRECTIONS = {
  LEFT: "L",
  RIGHT: "R",
  UP: "U",
  DOWN: "D",
};

const uniq = (a) => [...new Set([...a])];

const day9 = (input1, input2) => {
  return {
    uniqPositionCount:
      input1 && getUniquePositionCount(applyMoves(getMoves(input1), 1)),
    uniqPositionCount10Knots:
      input2 && getUniquePositionCount(applyMoves(getMoves(input2), 9)),
  };
};

const getMoves = (input) =>
  input
    .split("\n")
    .map((l) => l.trim().split(" "))
    .map((m) => ({ direction: m[0], count: parseInt(m[1], 10) }));

const moveHead = (position, direction) => {
  switch (direction) {
    case DIRECTIONS.LEFT:
      return { x: position.x - 1, y: position.y };
    case DIRECTIONS.RIGHT:
      return { x: position.x + 1, y: position.y };
    case DIRECTIONS.UP:
      return { x: position.x, y: position.y + 1 };
    case DIRECTIONS.DOWN:
      return { x: position.x, y: position.y - 1 };
  }
};

const getDistance = (knot1, knot2) => ({
  x: knot1.x - knot2.x,
  y: knot1.y - knot2.y,
});

const getNewKnotPosition = (knot1, knot2) => {
  const distance = getDistance(knot1, knot2);

  const delta = { x: 0, y: 0 };

  if (Math.abs(distance.x) <= 1) {
    delta.x = 0;
  }

  if (Math.abs(distance.y) <= 1) {
    delta.y = 0;
  }

  if (Math.abs(distance.x) > 1) {
    delta.x = 1;
    if (Math.abs(distance.y) === 1) {
      delta.y = 1;
    }
  }

  if (Math.abs(distance.y) > 1) {
    delta.y = 1;
    if (Math.abs(distance.x) === 1) {
      delta.x = 1;
    }
  }

  return {
    x: knot2.x + Math.sign(distance.x) * delta.x,
    y: knot2.y + Math.sign(distance.y) * delta.y,
  };
};

const applyMoves = (moves, nbKnots) => {
  const startPosition = { x: 0, y: 0 };
  const headPositon = { ...startPosition };
  const knotsPositions = Array.apply(null, Array(nbKnots)).map((kp) => ({
    ...startPosition,
  }));

  knotsPositions.unshift(headPositon);

  const tailPositions = [Object.values(knotsPositions.slice(-1)[0]).join(";")];

  moves.forEach((move) => {
    for (let i = 0; i < move.count; i++) {
      const newHeadPosition = moveHead(knotsPositions[0], move.direction);
      knotsPositions[0].x = newHeadPosition.x;
      knotsPositions[0].y = newHeadPosition.y;

      for (let j = 0; j < knotsPositions.length - 1; j++) {
        const newKnotPosition = getNewKnotPosition(
          knotsPositions[j],
          knotsPositions[j + 1]
        );
        knotsPositions[j + 1].x = newKnotPosition.x;
        knotsPositions[j + 1].y = newKnotPosition.y;
      }

      tailPositions.push(Object.values(knotsPositions.slice(-1)[0]).join(";"));
    }
  });

  return tailPositions;
};

const getUniquePositionCount = (positions) => uniq(positions).length;

module.exports = {
  day9,
  getMoves,
  getDistance,
  getNewKnotPosition,
  applyMoves,
  getUniquePositionCount,
};
