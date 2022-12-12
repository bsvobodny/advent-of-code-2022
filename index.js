const inputDay1 = require("./inputs/day01");
const day1 = require("./days/day01");
const inputDay2 = require("./inputs/day02");
const { day2, day22 } = require("./days/day02");
const inputDay3 = require("./inputs/day03");
const { day3 } = require("./days/day03");
const inputDay4 = require("./inputs/day04");
const { day4 } = require("./days/day04");
const inputDay5 = require("./inputs/day05");
const { day5 } = require("./days/day05");
const inputDay6 = require("./inputs/day06");
const { day6 } = require("./days/day06");
const inputDay7 = require("./inputs/day07");
const { day7 } = require("./days/day07");
const inputDay8 = require("./inputs/day08");
const { day8 } = require("./days/day08");
const { inputDay9, inputDay9_2 } = require("./inputs/day09");
const { day9 } = require("./days/day09");
const inputDay10 = require("./inputs/day10");
const { day10 } = require("./days/day10");

const displayResult = (dayNumber, result, ...vars) => {
  console.group();
  console.log("--------- Day %s ---------", String(dayNumber).padStart(2, "0"));
  console.log(result, ...vars);
  console.log("__________________________", "\n");
  console.groupEnd();
};

/** Day01 */
displayResult(1, day1(inputDay1));

/** Day02 */
displayResult(
  2,
  `My score with originals rules: \t%d
My Score with Elve's custom rules: \t%d`,
  day2(inputDay2).me,
  day22(inputDay2).me
);

/** Day03 */
displayResult(
  3,
  `Sum of the priorities by Elves: \t%d
Sum of the priorities Elves groups: \t%d`,
  ...Object.values(day3(inputDay3))
);

/** Day04 */
displayResult(
  4,
  `Number of full overlap section: \t%d
Number of partiel overlap section: \t%d`,
  ...Object.values(day4(inputDay4))
);

/** Day05 */
displayResult(
  5,
  `Message to the Elves Crate Mover 9000: \t%s
Message to the Elves Crate Mover 9001: \t%s`,
  ...Object.values(day5(inputDay5))
);

/** Day06 */
displayResult(
  6,
  `Packet marker position : \t%d
Message marker position : \t%d`,
  ...Object.values(day6(inputDay6))
);

/** Day07 */
displayResult(
  7,
  `Total size of folder less than 100K : \t%d
Folder size to delete to do the update : \t%d
  `,
  ...Object.values(day7(inputDay7))
);

/** Day08 */
displayResult(
  8,
  `Visible trees from outside : \t%d
Highest Scenic score : \t%d
  `,
  ...Object.values(day8(inputDay8))
);

/** Day09 */
displayResult(
  9,
  `Unique Tail position count with 2 knots : \t%d
Unique Tail position count with 10 knots : \t%d
  `,
  ...Object.values(day9(inputDay9, inputDay9_2))
);

/** Day10 */
displayResult(
  10,
  `Total signal strength : \t%d
CRT Display : \n%s
    `,
  ...Object.values(day10(inputDay10))
);

/** Day11 */

/** Day12 */

/** Day13 */

/** Day14 */

/** Day15 */

/** Day16 */

/** Day17 */

/** Day18 */

/** Day19 */

/** Day20 */

/** Day21 */

/** Day22 */

/** Day23 */

/** Day24 */
