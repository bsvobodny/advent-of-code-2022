const INSTRUCTIONS_TYPE = {
  NOOP: "noop",
  ADDX: "addx",
};

const day10 = (input) => {
  return {
    totalSignalStrengh: runCPU(getInstructions(input)),
  };
};

const getInstructions = (input) => {
  return input
    .split("\n")
    .map((l) => l.trim().split(" "))
    .map((instruction) => [
      instruction[0],
      instruction[1] ? parseInt(instruction[1], 10) : null,
    ]);
};

const runCPU = (instructions) => {
  let cycleCount = 0;
  let registry = 1;
  let totalSignalStrengh = 0;
  instructions.forEach((instruction) => {
    const { newCycleCount, newTotalSignalStrengh } = nextCycleCount(
      cycleCount,
      registry,
      totalSignalStrengh
    );
    cycleCount = newCycleCount;
    totalSignalStrengh = newTotalSignalStrengh;

    if (instruction[0] === INSTRUCTIONS_TYPE.ADDX) {
      const { newCycleCount, newTotalSignalStrengh } = nextCycleCount(
        cycleCount,
        registry,
        totalSignalStrengh
      );
      cycleCount = newCycleCount;
      totalSignalStrengh = newTotalSignalStrengh;

      registry = registry + instruction[1];
    }
  });

  //   console.log(signalStrenghTotal);
  return totalSignalStrengh;
};

const nextCycleCount = (cycleCount, registry, totalSignalStrengh) => {
  const newCycleCount = cycleCount + 1;
  let newTotalSignalStrengh = totalSignalStrengh;
  if (newCycleCount % 40 === 20) {
    newTotalSignalStrengh = newTotalSignalStrengh + registry * newCycleCount;
    // console.log(
    //   registry * newCycleCount,
    //   totalSignalStrengh,
    //   newTotalSignalStrengh
    // );
  }
  //   console.log(newCycleCount, registry, newTotalSignalStrengh);
  return { newCycleCount, newTotalSignalStrengh };
};

module.exports = { day10, getInstructions, runCPU };
