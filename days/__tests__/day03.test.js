const {
  getBags,
  getCommonItem,
  getPriority,
  day3,
  getGroupsBagsContent,
  getCommonItemInGroup,
} = require("../day03");

describe("day 3", () => {
  const input = `vJrwpWtwJgWrhcsFMMfFFhFp
  jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
  PmmdzqPrVvPwwTWBwg
  wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
  ttgJtRGJQctTZtZT
  CrZsJsPPZsGzwwsLwLmpwMDw`;

  const bags = getBags(input);

  it("should bags compartments contains the right items", () => {
    expect(bags[0][0]).toEqual("vJrwpWtwJgWr");
    expect(bags[0][1]).toEqual("hcsFMMfFFhFp");
    expect(bags[1][0]).toEqual("jqHRNqRjqzjGDLGL");
    expect(bags[1][1]).toEqual("rsFMfFZSrLrFZsSL");
    expect(bags[2][0]).toEqual("PmmdzqPrV");
    expect(bags[2][1]).toEqual("vPwwTWBwg");
  });

  it("should find the right common items in bag's compartment", () => {
    expect(getCommonItem(...bags[0])).toEqual("p");
    expect(getCommonItem(...bags[1])).toEqual("L");
    expect(getCommonItem(...bags[2])).toEqual("P");
    expect(getCommonItem(...bags[3])).toEqual("v");
    expect(getCommonItem(...bags[4])).toEqual("t");
    expect(getCommonItem(...bags[5])).toEqual("s");
  });

  [
    { c: "a", p: 1 },
    { c: "z", p: 26 },
    { c: "A", p: 27 },
    { c: "Z", p: 52 },
  ].map(({ c, p }) =>
    it(`should return priority ${p} for ${c}`, () => {
      expect(getPriority(c)).toEqual(p);
    })
  );

  [
    { c: getCommonItem(...bags[0]), p: 16 },
    { c: getCommonItem(...bags[1]), p: 38 },
    { c: getCommonItem(...bags[2]), p: 42 },
    { c: getCommonItem(...bags[3]), p: 22 },
    { c: getCommonItem(...bags[4]), p: 20 },
    { c: getCommonItem(...bags[5]), p: 19 },
  ].map(({ c, p }) =>
    it(`should return priority ${p} for ${c}`, () => {
      expect(getPriority(c)).toEqual(p);
    })
  );

  it("should return the total priority", () => {
    expect(day3(input).part1).toEqual(157);
    expect(day3(input).part2).toEqual(70);
  });

  it("Should group correctly the bags content", () => {
    const expectedValue = [
      [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
      ],
      [
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
      ],
    ];
    expect(getGroupsBagsContent(bags)).toEqual(expectedValue);
    expect(getCommonItemInGroup(getGroupsBagsContent(bags)[0])).toEqual("r");
    expect(getCommonItemInGroup(getGroupsBagsContent(bags)[1])).toEqual("Z");
  });
});
