const {
  day4,
  getAssignents,
  isNotOverlapping,
  isFullOverlap,
  getFullOverlapCount,
  getAlmostOneOverlapCount,
} = require("../day04");

describe("day 4", () => {
  const input = `2-4,6-8
  2-3,4-5
  5-7,7-9
  2-8,3-7
  6-6,4-6
  2-6,4-8`;

  const assignments = getAssignents(input);

  it("should extract the assignments", () => {
    expect(assignments[0][0]).toEqual([2, 3, 4]);
    expect(assignments[0][1]).toEqual([6, 7, 8]);
    expect(assignments[1][0]).toEqual([2, 3]);
    expect(assignments[1][1]).toEqual([4, 5]);
    expect(assignments[2][0]).toEqual([5, 6, 7]);
    expect(assignments[2][1]).toEqual([7, 8, 9]);
    expect(assignments[3][0]).toEqual([2, 3, 4, 5, 6, 7, 8]);
    expect(assignments[3][1]).toEqual([3, 4, 5, 6, 7]);
    expect(assignments[4][0]).toEqual([6]);
    expect(assignments[4][1]).toEqual([4, 5, 6]);
  });

  it("should check the overlap", () => {
    expect(isFullOverlap(assignments[0])).toEqual(false);
    expect(isFullOverlap(assignments[1])).toEqual(false);
    expect(isFullOverlap(assignments[2])).toEqual(false);
    expect(isFullOverlap(assignments[3])).toEqual(true);
    expect(isFullOverlap(assignments[4])).toEqual(true);
    expect(isFullOverlap(assignments[5])).toEqual(false);
    expect(getFullOverlapCount(assignments)).toEqual(2);
  });

  it("should check which pairs does not overlaping", () => {
    expect(isNotOverlapping(assignments[0])).toEqual(true);
    expect(isNotOverlapping(assignments[1])).toEqual(true);
    expect(isNotOverlapping(assignments[2])).toEqual(false);
    expect(isNotOverlapping(assignments[3])).toEqual(false);
    expect(isNotOverlapping(assignments[4])).toEqual(false);
    expect(isNotOverlapping(assignments[5])).toEqual(false);
    expect(getAlmostOneOverlapCount(assignments)).toEqual(4);
  });
});
