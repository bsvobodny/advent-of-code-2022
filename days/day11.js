const Big = require("big.js");

const day11 = (input) => {
  const monkeys20Rounds = runRounds(input, 20).sort(
    (a, b) => b.inspectedItems - a.inspectedItems
  );
  const monkeyBusiness20Rounds =
    monkeys20Rounds[0].inspectedItems * monkeys20Rounds[1].inspectedItems;

  return {
    monkeyBusiness20Rounds,
  };
};

const day112 = (input) => {
  const monkeys10000Rounds = runRounds(input, 10_000, 1).sort(
    (a, b) => b.inspectedItems - a.inspectedItems
  );
  const monkeyBusiness10000Rounds =
    monkeys10000Rounds[0].inspectedItems * monkeys10000Rounds[1].inspectedItems;
  return {
    monkeyBusiness10000Rounds,
  };
};

const parseInput = (input) => {
  const regex =
    /Monkey (\d):\s+Starting items: (.*)\s+Operation: new \= (.*)\s+Test: divisible by (.*)\s+If true: throw to monkey (.*)\s+If false: throw to monkey (.*)/gm;
  let m;
  const monkeys = [];

  while ((m = regex.exec(input)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    monkeys.push({
      id: parseInt(m[1], 10),
      inspectedItems: 0,
      startingItems: m[2].split(",").map((i) => parseInt(i.trim(), 10)),
      op: m[3],
      test: {
        divisibleBy: parseInt(m[4], 10),
        ifTrue: parseInt(m[5], 10),
        ifFalse: parseInt(m[6], 10),
      },
    });
  }
  // console.log(monkeys);

  return monkeys;
};

const processOperation = (op, oldValue) => {
  const operation = op.split(" ");
  const firstOperand =
    operation[0].trim() === "old"
      ? new Big(oldValue)
      : new Big(operation[0].trim());
  const secondOperand =
    operation[2].trim() === "old"
      ? new Big(oldValue)
      : new Big(operation[2].trim());
  switch (operation[1]) {
    case "+":
      return firstOperand.plus(secondOperand);
    case "-":
      return firstOperand.minus(secondOperand);
    case "*":
      return firstOperand.times(secondOperand);
  }
};

const processItemInspection = (item, monkeyProps, worryDivider = 3) => {
  const newWorryLevel =
    worryDivider === 1
      ? processOperation(monkeyProps.op, item)
      : processOperation(monkeyProps.op, item)
          .div(worryDivider)
          .round(0, Big.roundDown);
  // console.log(
  //   worryDivider,
  //   "\n",
  //   item.toNumber(),
  //   monkeyProps.op,
  //   "\n",
  //   newWorryLevel.toNumber()
  // );

  return {
    newWorryLevel: newWorryLevel.toString(),
    toMonkey: newWorryLevel.mod(monkeyProps.test.divisibleBy).eq(0)
      ? monkeyProps.test.ifTrue
      : monkeyProps.test.ifFalse,
  };
};

const processMonkeysInspection = (monkeys, worryDivider = 3) => {
  const newMonkeys = [...monkeys];

  for (let i = 0; i < newMonkeys.length; i++) {
    const items = [...newMonkeys[i].startingItems];
    newMonkeys[i].startingItems = [];
    for (let j = 0; j < items.length; j++) {
      const { newWorryLevel, toMonkey } = processItemInspection(
        items[j],
        newMonkeys[i],
        worryDivider
      );
      newMonkeys[toMonkey].startingItems.push(newWorryLevel);
    }
    newMonkeys[i].inspectedItems += items.length;
  }
  // console.log(newMonkeys);
  return newMonkeys;
};

const runRounds = (input, nbRound, worryDivider = 3) => {
  let monkeys = parseInput(input);
  for (let k = 0; k < nbRound; k++) {
    console.log("round", k);
    monkeys = processMonkeysInspection(monkeys, worryDivider);
  }
  return monkeys;
};

module.exports = {
  day11,
  day112,
  parseInput,
  processOperation,
  processMonkeysInspection,
  runRounds,
};
