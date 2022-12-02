const ELFS_CHOICES = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
};

const MY_CHOICES = {
  ROCK: "X",
  PAPER: "Y",
  SCISSORS: "Z",
};

const EXPECTED_OUTCOME = {
  LOSE: "X",
  DRAW: "Y",
  WIN: "Z",
};

const DRAW = "?";

const OUTCOME_POINTS = {
  WIN: 6,
  DRAW: 3,
  LOST: 0,
};

const CHOICE_POINTS = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const getWinner = (elf, me) => {
  if (elf === ELFS_CHOICES.ROCK && me === MY_CHOICES.SCISSORS) {
    return elf;
  }
  if (elf === ELFS_CHOICES.SCISSORS && me === MY_CHOICES.ROCK) {
    return me;
  }
  if (elf === ELFS_CHOICES.SCISSORS && me === MY_CHOICES.PAPER) {
    return elf;
  }
  if (elf === ELFS_CHOICES.PAPER && me === MY_CHOICES.SCISSORS) {
    return me;
  }
  if (elf === ELFS_CHOICES.PAPER && me === MY_CHOICES.ROCK) {
    return elf;
  }
  if (elf === ELFS_CHOICES.ROCK && me === MY_CHOICES.PAPER) {
    return me;
  }
  return "?";
};

const getChoicePoints = (choice) => {
  if (choice === ELFS_CHOICES.ROCK || choice === MY_CHOICES.ROCK) {
    return CHOICE_POINTS.ROCK;
  }
  if (choice === ELFS_CHOICES.PAPER || choice === MY_CHOICES.PAPER) {
    return CHOICE_POINTS.PAPER;
  }
  if (choice === ELFS_CHOICES.SCISSORS || choice === MY_CHOICES.SCISSORS) {
    return CHOICE_POINTS.SCISSORS;
  }
  return 0;
};

const getPoints = (elf, me) => {
  const winnerChoice = getWinner(elf, me);

  if (winnerChoice === DRAW) {
    return {
      elf: OUTCOME_POINTS.DRAW + getChoicePoints(elf),
      me: OUTCOME_POINTS.DRAW + getChoicePoints(me),
    };
  }

  return {
    elf:
      (winnerChoice === elf ? OUTCOME_POINTS.WIN : OUTCOME_POINTS.LOST) +
      getChoicePoints(elf),
    me:
      (winnerChoice === me ? OUTCOME_POINTS.WIN : OUTCOME_POINTS.LOST) +
      getChoicePoints(me),
  };
};

const getMyChoice = (elf, outcome) =>
  Object.values(MY_CHOICES).reduce((acc, me) => {
    if (getWinner(elf, me) === elf && EXPECTED_OUTCOME.LOSE === outcome) {
      return me;
    }
    if (getWinner(elf, me) === me && EXPECTED_OUTCOME.WIN === outcome) {
      return me;
    }
    if (getWinner(elf, me) === "?" && EXPECTED_OUTCOME.DRAW === outcome) {
      return me;
    }
    return acc;
  }, "");

const day2 = (input) => {
  const rounds = input.split("\n");

  return rounds
    .map((round) => {
      const [elf, me] = round.trim().split(" ");
      const points = getPoints(elf, me);

      return points;
    })
    .reduce(
      (acc, round) => {
        return {
          elf: acc.elf + round.elf,
          me: acc.me + round.me,
        };
      },
      { elf: 0, me: 0 }
    );
};

const day22 = (input) => {
  const rounds = input.split("\n");

  return rounds
    .map((round) => {
      const [elf, outcome] = round.trim().split(" ");

      const points = getPoints(elf, getMyChoice(elf, outcome));

      return points;
    })
    .reduce(
      (acc, round) => {
        return {
          elf: acc.elf + round.elf,
          me: acc.me + round.me,
        };
      },
      { elf: 0, me: 0 }
    );
};

module.exports = {
  day2,
  day22,
  getWinner,
  ELFS_CHOICES,
  MY_CHOICES,
  EXPECTED_OUTCOME,
  getMyChoice,
  getPoints,
};
