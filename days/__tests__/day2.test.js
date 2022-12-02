const {
  ELFS_CHOICES,
  MY_CHOICES,
  EXPECTED_OUTCOME,
  getWinner,
  getPoints,
  getMyChoice,
  day2,
  day22,
} = require("../day2");

describe("day 2 - let's play", () => {
  const possibilities = [
    {
      elf: ELFS_CHOICES.ROCK,
      me: MY_CHOICES.ROCK,
      win: "?",
      points: { elf: 4, me: 4 },
    },
    {
      elf: ELFS_CHOICES.ROCK,
      me: MY_CHOICES.PAPER,
      win: MY_CHOICES.PAPER,
      points: { elf: 1, me: 8 },
    },
    {
      elf: ELFS_CHOICES.ROCK,
      me: MY_CHOICES.SCISSORS,
      win: ELFS_CHOICES.ROCK,
      points: { elf: 7, me: 3 },
    },
    {
      elf: ELFS_CHOICES.PAPER,
      me: MY_CHOICES.ROCK,
      win: ELFS_CHOICES.PAPER,
      points: { elf: 8, me: 1 },
    },
    {
      elf: ELFS_CHOICES.PAPER,
      me: MY_CHOICES.PAPER,
      win: "?",
      points: { elf: 5, me: 5 },
    },
    {
      elf: ELFS_CHOICES.PAPER,
      me: MY_CHOICES.SCISSORS,
      win: MY_CHOICES.SCISSORS,
      points: { elf: 2, me: 9 },
    },
    {
      elf: ELFS_CHOICES.SCISSORS,
      me: MY_CHOICES.ROCK,
      win: MY_CHOICES.ROCK,
      points: { elf: 3, me: 7 },
    },
    {
      elf: ELFS_CHOICES.SCISSORS,
      me: MY_CHOICES.PAPER,
      win: ELFS_CHOICES.SCISSORS,
      points: { elf: 9, me: 2 },
    },
    {
      elf: ELFS_CHOICES.SCISSORS,
      me: MY_CHOICES.SCISSORS,
      win: "?",
      points: { elf: 6, me: 6 },
    },
    {
      elf: "?",
      me: "?",
      win: "?",
      points: { elf: 3, me: 3 },
    },
  ];

  possibilities.map((round) => {
    it(`should be ${round.win} the winner between ${round.elf} and ${round.me}`, () => {
      expect(getWinner(round.elf, round.me)).toEqual(round.win);
      const points = getPoints(round.elf, round.me);
      expect(points.elf).toEqual(round.points.elf);
      expect(points.me).toEqual(round.points.me);
    });
  });
});

describe("day 2 - part 1", () => {
  const input = `A Y
  B X
  C Z`;

  const result = day2(input);

  it("should have a total score of 15", () => {
    expect(result.elf).toEqual(15);
    expect(result.me).toEqual(15);
  });
});

describe("day 2 - part 2", () => {
  it("should select the Rock for me if elf chooses Rock and expected outcome id DRAW", () => {
    expect(getMyChoice(ELFS_CHOICES.ROCK, EXPECTED_OUTCOME.DRAW)).toEqual(
      MY_CHOICES.ROCK
    );
  });

  it("should select the Rock for me if elf chooses scissors and expected outcome id WIN", () => {
    expect(getMyChoice(ELFS_CHOICES.SCISSORS, EXPECTED_OUTCOME.WIN)).toEqual(
      MY_CHOICES.ROCK
    );
  });

  it("should select the Paper for me if elf chooses scissors and expected outcome id WIN", () => {
    expect(getMyChoice(ELFS_CHOICES.SCISSORS, EXPECTED_OUTCOME.LOSE)).toEqual(
      MY_CHOICES.PAPER
    );
  });

  it("should have a total score of 15", () => {
    const input = `A Y
  B X
  C Z`;
    const result = day22(input);
    expect(result.elf).toEqual(15);
    expect(result.me).toEqual(12);
  });
});
