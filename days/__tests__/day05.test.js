const {
  day5,
  getStacks,
  getMoves,
  applyMove,
  processMoves,
} = require("../day05");

describe("day 5", () => {
  const input = `
      [D]    
  [N] [C]    
  [Z] [M] [P]
   1   2   3 
  
  move 1 from 2 to 1
  move 3 from 1 to 3
  move 2 from 2 to 1
  move 1 from 1 to 2`;

  it("should extract moves", () => {
    expect(getMoves(input)).toEqual([
      { quantity: 1, from: 2, to: 1 },
      { quantity: 3, from: 1, to: 3 },
      { quantity: 2, from: 2, to: 1 },
      { quantity: 1, from: 1, to: 2 },
    ]);
  });

  it("should extract stacks", () => {
    expect(getStacks(input)).toEqual([["Z", "N"], ["M", "C", "D"], ["P"]]);
  });

  it("should apply moves", () => {
    const moves = getMoves(input);
    const stacks = getStacks(input);
    const stacksAfterMove1 = applyMove(stacks, moves[0]);
    const stacksAfterMove2 = applyMove(stacksAfterMove1, moves[1]);
    const stacksAfterMove3 = applyMove(stacksAfterMove2, moves[2]);
    const stacksAfterMove4 = applyMove(stacksAfterMove3, moves[3]);

    expect(stacksAfterMove1).toEqual([["Z", "N", "D"], ["M", "C"], ["P"]]);
    expect(stacksAfterMove2).toEqual([[], ["M", "C"], ["P", "D", "N", "Z"]]);
    expect(stacksAfterMove3).toEqual([["C", "M"], [], ["P", "D", "N", "Z"]]);
    expect(stacksAfterMove4).toEqual([["C"], ["M"], ["P", "D", "N", "Z"]]);
  });

  it("should process all moves correctly", () => {
    const moves = getMoves(input);
    const stacks = getStacks(input);
    expect(processMoves(stacks, moves)).toEqual([
      ["C"],
      ["M"],
      ["P", "D", "N", "Z"],
    ]);
  });

  it("should get the correct message CMZ", () => {
    expect(day5(input).message).toEqual("CMZ");
  });
});
