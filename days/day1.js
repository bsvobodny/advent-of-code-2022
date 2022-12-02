const day1 = (input) => {
  const elves = input.split("\n\n").map((elf) => ({
    bag: elf.split("\n").map((i) => parseInt(i, 10)),
  }));
  const elvesWithTotal = elves.map((elf) => ({
    bag: elf.bag,
    total: elf.bag.reduce((acc, i) => acc + i, 0),
  }));

  const elvesSorted = [...elvesWithTotal].sort((a, b) => b.total - a.total);

  return {
    max: elvesSorted[0].total,
    totalTop3: elvesSorted.slice(0, 3).reduce((acc, e) => e.total + acc, 0),
  };
};

module.exports = day1;
