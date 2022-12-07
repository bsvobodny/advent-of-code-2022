const { day6, getMarkerPosition } = require("../day06");

describe("day 6", () => {

  [
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
    ["nppdvjthqldpwncqszvftbrmjlhg", 6],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
  ].map(([input, position]) =>
    it(`should get ${position} as packet marker position for ${input}`, () => {
      expect(getMarkerPosition(input)).toEqual(position);
    })
  );

  [
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 23],
    ["nppdvjthqldpwncqszvftbrmjlhg", 23],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 29],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 26],
  ].map(([input, position]) =>
    it(`should get ${position} as message marker position for ${input}`, () => {
      expect(getMarkerPosition(input, 14)).toEqual(position);
    })
  );

  [
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7, 19],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5, 23],
    ["nppdvjthqldpwncqszvftbrmjlhg", 6, 23],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10, 29],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11, 26],
  ].map(([input, packet, message]) =>
    it(`should get ${packet} and ${message} as marker positions for ${input}`, () => {
      expect(day6(input).packetMarkerPosition).toEqual(packet);
      expect(day6(input).messageMarkerPosition).toEqual(message);
    })
  );

});
