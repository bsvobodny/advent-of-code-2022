const rucksacks = {
  compartments: [[], []],
};

const GROUP_SIZE = 3;

const getBags = (input) =>
  input
    .split("\n")
    .map((c) => c.trim())
    .map((content) => [
      content.substr(0, content.length / 2),
      content.substr(content.length / 2),
    ]);

const getCommonItem = (g1, g2) =>
  g1
    .split("")
    .reduce(
      (acc, c) => (g2.includes(c) && !acc.includes(c) ? acc + c : acc),
      ""
    );

const getPriority = (c) => {
  if (c.charCodeAt(0) >= "a".charCodeAt(0)) {
    return c.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  return c.charCodeAt(0) - "A".charCodeAt(0) + 27;
};

const getGroupsBagsContent = (bags) => {
  const groupContentbag = [];
  for (let i = 0; i < bags.length; i = i + GROUP_SIZE) {
    groupContentbag.push(
      [].concat(bags[i].join(""), bags[i + 1].join(""), bags[i + 2].join(""))
    );
  }
  return groupContentbag;
};

const getCommonItemInGroup = (group) =>
  getCommonItem(getCommonItem(group[0], group[1]), group[2]);

const day3 = (input) => {
  return {
    part1: getBags(input)
      .map((bag) => getPriority(getCommonItem(...bag)))
      .reduce((acc, p) => acc + p, 0),
    part2: getGroupsBagsContent(getBags(input))
      .map((g) => getPriority(getCommonItemInGroup(g)))
      .reduce((acc, p) => acc + p, 0),
  };
};

module.exports = {
  getBags,
  getCommonItem,
  getPriority,
  getGroupsBagsContent,
  getCommonItemInGroup,
  day3,
};
