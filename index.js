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
  `Message to the Elves: \t%s`,
  ...Object.values(day5(inputDay5))
);

/** Day06 */

/** Day07 */

/** Day08 */

/** Day09 */

/** Day10 */

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
