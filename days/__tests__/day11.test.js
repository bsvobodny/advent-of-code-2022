const {
  day11,
  day112,
  parseInput,
  processOperation,
  processMonkeysInspection,
  runRounds,
} = require("../day11");

describe("day 11", () => {
  const input = `Monkey 0:
    Starting items: 79, 98
    Operation: new = old * 19
    Test: divisible by 23
      If true: throw to monkey 2
      If false: throw to monkey 3
  
  Monkey 1:
    Starting items: 54, 65, 75, 74
    Operation: new = old + 6
    Test: divisible by 19
      If true: throw to monkey 2
      If false: throw to monkey 0
  
  Monkey 2:
    Starting items: 79, 60, 97
    Operation: new = old * old
    Test: divisible by 13
      If true: throw to monkey 1
      If false: throw to monkey 3
  
  Monkey 3:
    Starting items: 74
    Operation: new = old + 3
    Test: divisible by 17
      If true: throw to monkey 0
      If false: throw to monkey 1`;

  it("should parse the input", () => {
    expect(parseInput(input)).toEqual([
      {
        id: 0,
        inspectedItems: 0,
        startingItems: [79, 98],
        op: "old * 19",
        test: { divisibleBy: 23, ifTrue: 2, ifFalse: 3 },
      },
      {
        id: 1,
        inspectedItems: 0,
        startingItems: [54, 65, 75, 74],
        op: "old + 6",
        test: { divisibleBy: 19, ifTrue: 2, ifFalse: 0 },
      },
      {
        id: 2,
        inspectedItems: 0,
        startingItems: [79, 60, 97],
        op: "old * old",
        test: { divisibleBy: 13, ifTrue: 1, ifFalse: 3 },
      },
      {
        id: 3,
        startingItems: [74],
        inspectedItems: 0,
        op: "old + 3",
        test: { divisibleBy: 17, ifTrue: 0, ifFalse: 1 },
      },
    ]);
  });

  it("should parse dans process operations", () => {
    [
      ["old * old", 25],
      ["old + 3", 8],
      ["old - 4", 1],
    ].map(([op, result]) => {
      expect(processOperation(op, 5).toNumber()).toEqual(result);
    });
  });

  it("should process inspection", () => {
    expect(processMonkeysInspection(parseInput(input))).toEqual([
      {
        id: 0,
        inspectedItems: 2,
        startingItems: [20, 23, 27, 26],
        op: "old * 19",
        test: { divisibleBy: 23, ifTrue: 2, ifFalse: 3 },
      },
      {
        id: 1,
        inspectedItems: 4,
        startingItems: [2080, 25, 167, 207, 401, 1046],
        op: "old + 6",
        test: { divisibleBy: 19, ifTrue: 2, ifFalse: 0 },
      },
      {
        id: 2,
        inspectedItems: 3,
        startingItems: [],
        op: "old * old",
        test: { divisibleBy: 13, ifTrue: 1, ifFalse: 3 },
      },
      {
        id: 3,
        inspectedItems: 5,
        startingItems: [],
        op: "old + 3",
        test: { divisibleBy: 17, ifTrue: 0, ifFalse: 1 },
      },
    ]);
  });

  it("should run 20 round of monkey item processing for worryLevel 3", () => {
    expect(runRounds(input, 20)).toEqual([
      {
        id: 0,
        inspectedItems: 101,
        startingItems: [10, 12, 14, 26, 34],
        op: "old * 19",
        test: { divisibleBy: 23, ifTrue: 2, ifFalse: 3 },
      },
      {
        id: 1,
        inspectedItems: 95,
        startingItems: [245, 93, 53, 199, 115],
        op: "old + 6",
        test: { divisibleBy: 19, ifTrue: 2, ifFalse: 0 },
      },
      {
        id: 2,
        inspectedItems: 7,
        startingItems: [],
        op: "old * old",
        test: { divisibleBy: 13, ifTrue: 1, ifFalse: 3 },
      },
      {
        id: 3,
        inspectedItems: 105,
        startingItems: [],
        op: "old + 3",
        test: { divisibleBy: 17, ifTrue: 0, ifFalse: 1 },
      },
    ]);
  });

  it("should find correct inpected items number after 1 rounds for worrylevel 1", () => {
    const inpectedItemsByMonkey = runRounds(input, 1, 1);
    // console.log(parseInput(input));
    // console.log(inpectedItemsByMonkey);
    expect(inpectedItemsByMonkey).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 0,
          inspectedItems: 2,
        }),
        expect.objectContaining({
          id: 1,
          inspectedItems: 4,
        }),
        expect.objectContaining({
          id: 2,
          inspectedItems: 3,
        }),
        expect.objectContaining({
          id: 3,
          inspectedItems: 6,
        }),
      ])
    );
  });

  it("should find correct inpected items number after 20 rounds for worrylevel 1", () => {
    const inpectedItemsByMonkey = runRounds(input, 20, 1);
    // console.log(inpectedItemsByMonkey);

    expect(inpectedItemsByMonkey).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 0,
          inspectedItems: 99,
        }),
        expect.objectContaining({
          id: 1,
          inspectedItems: 97,
        }),
        expect.objectContaining({
          id: 2,
          inspectedItems: 8,
        }),
        expect.objectContaining({
          id: 3,
          inspectedItems: 103,
        }),
      ])
    );
  });

  it("should find correct inpected items number after 1000 rounds for worrylevel 1", () => {
    const inpectedItemsByMonkey = runRounds(input, 1000, 1).map((m) => ({
      id: m.id,
      inspectedItems: m.inspectedItems,
    }));
    expect(inpectedItemsByMonkey).toEqual([
      {
        id: 0,
        inspectedItems: 5204,
      },
      {
        id: 1,
        inspectedItems: 4792,
      },
      {
        id: 2,
        inspectedItems: 199,
      },
      {
        id: 3,
        inspectedItems: 5192,
      },
    ]);
  });

  it("should find the monkey business value", () => {
    expect(day11(input).monkeyBusiness20Rounds).toEqual(10605);
    expect(day112(input).monkeyBusiness10000Rounds).toEqual(2713310158);
  });
});
