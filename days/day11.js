const day11 = (input) => {
    const monkeys = runRounds(input, 20).sort(
      (a, b) => b.inspectedItems - a.inspectedItems
    );
    const monkeyBusiness = monkeys[0].inspectedItems * monkeys[1].inspectedItems;
    return {
      monkeyBusiness,
    };
  };
  
  const parseInput = (input) => {
    const regex =
      /Monkey (\d):\s+Starting items: (.*)\s+Operation: new \= (.*)\s+Test: divisible by (.*)\s+If true: throw to monkey (.*)\s+If false: throw to monkey (.*)/gm;
    let m;
    const monkeys = [];
  
    while ((m = regex.exec(input)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
  
      // The result can be accessed through the `m`-variable.
      monkeys.push({
        id: parseInt(m[1], 10),
        inspectedItems: 0,
        startingItems: m[2].split(",").map((i) => parseInt(i, 10)),
        op: m[3],
        test: {
          divisibleBy: parseInt(m[4], 10),
          ifTrue: parseInt(m[5], 10),
          ifFalse: parseInt(m[6], 10),
        },
      });
    }
    //   console.log(monkeys);
  
    return monkeys;
  };
  
  const processOperation = (op, oldValue) => {
    const operation = op.split(" ");
    const firstOperand = parseInt(operation[0].replace("old", oldValue), 10);
    const secondOperand = parseInt(operation[2].replace("old", oldValue), 10);
    switch (operation[1]) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
    }
  };
  
  const processItemInspection = (item, monkeyProps) => {
    const newWorryLevel = Math.floor(processOperation(monkeyProps.op, item) / 3);
  
    if (newWorryLevel % monkeyProps.test.divisibleBy === 0) {
      return { newWorryLevel, toMonkey: monkeyProps.test.ifTrue };
    } else {
      return { newWorryLevel, toMonkey: monkeyProps.test.ifFalse };
    }
  };
  
  const processMonkeysInspection = (monkeys) => {
    const newMonkeys = [...monkeys];
  
    for (let i = 0; i < newMonkeys.length; i++) {
      const items = [...newMonkeys[i].startingItems];
      newMonkeys[i].startingItems = [];
      for (let j = 0; j < items.length; j++) {
        const { newWorryLevel, toMonkey } = processItemInspection(
          items[j],
          newMonkeys[i]
        );
        newMonkeys[toMonkey].startingItems.push(newWorryLevel);
        newMonkeys[i].inspectedItems++;
      }
    }
    //   console.log(newMonkeys);
    return newMonkeys;
  };
  
  const runRounds = (input, nbRound) => {
    let monkeys = parseInput(input);
    for (let k = 0; k < nbRound; k++) {
      monkeys = processMonkeysInspection(monkeys);
    }
    return monkeys;
  };
  
  module.exports = {
    day11,
    parseInput,
    processOperation,
    processMonkeysInspection,
    runRounds,
  };
  