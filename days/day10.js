const INSTRUCTIONS_TYPE = {
  NOOP: "noop",
  ADDX: "addx",
};

const day10 = (input) => {
  return runCPU(getInstructions(input));
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
  let totalSignalStrength = 0;
  let crtDraw = [];
  instructions.forEach((instruction) => {
    crtDraw = drawCRT(crtDraw, cycleCount, registry);
    const { newCycleCount, newTotalSignalStrength } = nextCycleCount(
      cycleCount,
      registry,
      totalSignalStrength
    );
    cycleCount = newCycleCount;
    totalSignalStrength = newTotalSignalStrength;

    if (instruction[0] === INSTRUCTIONS_TYPE.ADDX) {
      crtDraw = drawCRT(crtDraw, cycleCount, registry);
      const { newCycleCount, newTotalSignalStrength } = nextCycleCount(
        cycleCount,
        registry,
        totalSignalStrength
      );
      cycleCount = newCycleCount;
      totalSignalStrength = newTotalSignalStrength;

      registry = registry + instruction[1];
    }
  });

  displayCRT(crtDraw);
  return { totalSignalStrength, crtDisplay: displayCRT(crtDraw) };
};

const drawCRT = (crtDraw, cycleCount, registry) => {
  const rowIndex = Math.trunc(cycleCount / 40);
  if (!crtDraw[rowIndex]) {
    crtDraw[rowIndex] = [];
  }
  if (
    registry - 1 === cycleCount % 40 ||
    registry === cycleCount % 40 ||
    registry + 1 === cycleCount % 40
  ) {
    crtDraw[rowIndex].push("#");
  } else {
    crtDraw[rowIndex].push(".");
  }
  return crtDraw;
};

const displayCRT = (crtDraw) => crtDraw.map((r) => r.join(""));

const nextCycleCount = (cycleCount, registry, totalSignalStrength) => {
  const newCycleCount = cycleCount + 1;
  let newTotalSignalStrength = totalSignalStrength;
  if (newCycleCount % 40 === 20) {
    newTotalSignalStrength = newTotalSignalStrength + registry * newCycleCount;
  }
  return { newCycleCount, newTotalSignalStrength };
};

module.exports = { day10, getInstructions, runCPU };
