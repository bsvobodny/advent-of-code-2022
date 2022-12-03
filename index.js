const inputDay1 = require("./inputs/day01");
const day1 = require("./days/day01");
const inputDay2 = require("./inputs/day02");
const { day2, day22 } = require("./days/day02");

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
  `My score with originals rules : %d
My Score with Elve's rules : %d`,
  day2(inputDay2).me,
  day22(inputDay2).me
);

/** Day03 */

/** Day04 */

/** Day05 */

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
