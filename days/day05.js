const day5 = (input) => {
  return {
    CM9000Message: getMessage(
      processMoves(getStacks(input), getMoves(input), false)
    ),
    CM9001Message: getMessage(
      processMoves(getStacks(input), getMoves(input), true)
    ),
  };
};

const splitBlocks = (input) => {
  let emptyLineFound = false;

  const splittedBlock = input.split("\n").reduce(
    (acc, l, i) => {
      const newAcc = [...acc];
      if (i !== 0 && l.trim() === "") {
        emptyLineFound = true;
      } else {
        newAcc[emptyLineFound ? 1 : 0].push(l);
      }
      return newAcc;
    },
    [[], []]
  );

  return {
    stacks: splittedBlock[0].join("\n"),
    moves: splittedBlock[1].join("\n"),
  };
};

const getStacks = (input) => {
  const stacks = splitBlocks(input).stacks;
  const splittedStacks = stacks.split("\n").filter((l) => l);
  const regex = /(\d)/g;
  let m;
  const stackIndexes = [];

  while ((m = regex.exec(splittedStacks.slice(-1))) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    stackIndexes.push(m.index);
  }

  const hStacks = [];

  for (let k = splittedStacks.length - 2; k >= 0; k--) {
    stackIndexes.map((i) => {
      if (!hStacks[i]) {
        hStacks[i] = [];
      }
      if (splittedStacks[k][i] && splittedStacks[k][i] !== " ") {
        hStacks[i].push(splittedStacks[k][i]);
      }
    });
  }

  return hStacks.filter((i) => i);
};

const getMoves = (input) => {
  const regex = /move (\d+) from (\d) to (\d)/gm;
  let m;
  const moves = [];

  while ((m = regex.exec(input)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    moves.push({
      quantity: parseInt(m[1]),
      from: parseInt(m[2]),
      to: parseInt(m[3]),
    });
  }
  return moves;
};

const applyMove = (stacks, move, isCrateMover9001 = false) => {
  const newStacks = JSON.parse(JSON.stringify(stacks));

  const itemsToMove = newStacks[move.from - 1].slice(-1 * move.quantity);
  newStacks[move.to - 1] = newStacks[move.to - 1].concat(
    isCrateMover9001 ? itemsToMove : itemsToMove.reverse()
  );
  newStacks[move.from - 1].splice(-1 * move.quantity, move.quantity);
  return newStacks;
};

const processMoves = (stacks, moves, isCrateMover9001 = false) =>
  moves.reduce(
    (finalStack, move) => applyMove(finalStack, move, isCrateMover9001),
    stacks
  );

const getMessage = (stacks) => stacks.map((s) => s.slice(-1)).join("");

module.exports = {
  day5,
  getStacks,
  getMoves,
  applyMove,
  processMoves,
};
