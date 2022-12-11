const {
  day9,
  getMoves,
  getDistance,
  getNewKnotPosition,
  applyMoves,
} = require("../day09");

describe("day 9 - part1", () => {
  const input1 = `R 4
    U 4
    L 3
    D 1
    R 4
    D 1
    L 5
    R 2`;

  const moves = getMoves(input1);

  it(`should get Moves`, () => {
    expect(moves).toEqual([
      { count: 4, direction: "R" },
      { count: 4, direction: "U" },
      { count: 3, direction: "L" },
      { count: 1, direction: "D" },
      { count: 4, direction: "R" },
      { count: 1, direction: "D" },
      { count: 5, direction: "L" },
      { count: 2, direction: "R" },
    ]);
  });

  [
    {
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      distance: { x: 0, y: 0 },
    },
    {
      positions: [
        { x: 4, y: 0 },
        { x: 0, y: 0 },
      ],
      distance: { x: 4, y: 0 },
    },
    {
      positions: [
        { x: 1, y: 1 },
        { x: 0, y: 0 },
      ],
      distance: { x: 1, y: 1 },
    },
  ].map(({ positions, distance }) => {
    it(`should have a distance of ${JSON.stringify(
      distance
    )} for head in ${JSON.stringify(positions[0])} and tail in ${JSON.stringify(
      positions[1]
    )}`, () => {
      expect(getDistance(positions[0], positions[1])).toEqual(distance);
    });
  });

  [
    {
      positions: [
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ],
      newTailPosition: { x: 0, y: 0 },
    },
    {
      positions: [
        { x: 1, y: 1 },
        { x: 0, y: 0 },
      ],
      newTailPosition: { x: 0, y: 0 },
    },
    {
      positions: [
        { x: 2, y: 1 },
        { x: 0, y: 0 },
      ],
      newTailPosition: { x: 1, y: 1 },
    },
  ].map(({ positions, newTailPosition }) => {
    it(`should find the new tail position to be ${JSON.stringify(
      newTailPosition
    )} for head in ${JSON.stringify(positions[0])} and tail in ${JSON.stringify(
      positions[1]
    )}`, () => {
      expect(getNewKnotPosition(positions[0], positions[1])).toEqual(
        newTailPosition
      );
    });
  });

  it("should apply moves and get all tail positions", () => {
    expect(applyMoves(moves, 1)).toEqual([
      "0;0",
      "0;0",
      "1;0",
      "2;0",
      "3;0",
      "3;0",
      "4;1",
      "4;2",
      "4;3",
      "4;3",
      "3;4",
      "2;4",
      "2;4",
      "2;4",
      "2;4",
      "3;3",
      "4;3",
      "4;3",
      "4;3",
      "4;3",
      "3;2",
      "2;2",
      "1;2",
      "1;2",
      "1;2",
    ]);
    expect(day9(input1).uniqPositionCount).toEqual(13);
  });
});

describe("day 9 - part2", () => {
  const input2 = `R 5
      U 8
      L 8
      D 3
      R 17
      D 10
      L 25
      U 20`;

  it("should apply moves and get all tail positions", () => {
    expect(day9(null, input2).uniqPositionCount10Knots).toEqual(36);
  });
});
