const day1 = require("../day01");

describe("day 1", () => {
  const input = `1000
      2000
      3000

      4000

      5000
      6000

      7000
      8000
      9000

      10000`;

  const result = day1(input);

  it("should max to be 24_000", () => {
    expect(result.max).toEqual(24_000);
  });

  it("should total of top3 to be 45_000", () => {
    expect(result.totalTop3).toEqual(45_000);
  });
});
