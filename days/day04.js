const day4 = (input) => {
  return {
    fullOverlapedSections: getFullOverlapCount(getAssignents(input)),
    partialOverLap: getAlmostOneOverlapCount(getAssignents(input)),
  };
};

const getAssignents = (input) => {
  return input.split("\n").map((l) =>
    l
      .trim()
      .split(",")
      .map((r) => {
        const range = r.split("-");
        const ids = [];
        for (let i = parseInt(range[0]); i <= range[1]; i++) {
          ids.push(i);
        }
        return ids;
      })
  );
};

const isFullOverlap = (pair) => {
  const unique = [[], []];

  pair[0].forEach((id) => {
    if (!pair[1].includes(id)) {
      unique[0].push(id);
    }
  });

  pair[1].forEach((id) => {
    if (!pair[0].includes(id)) {
      unique[1].push(id);
    }
  });

  if (unique[0].length === 0 || unique[1].length === 0) {
    return true;
  }

  return false;
};

const isNotOverlapping = (pair) => {
  const overlap = [[], []];

  pair[0].forEach((id) => {
    if (pair[1].includes(id)) {
      overlap[0].push(id);
    }
  });

  pair[1].forEach((id) => {
    if (pair[0].includes(id)) {
      overlap[1].push(id);
    }
  });

  if (overlap[0].length === 0 && overlap[1].length === 0) {
    return true;
  }

  return false;
};

const getFullOverlapCount = (pairs) =>
  pairs.reduce((acc, pair) => (isFullOverlap(pair) ? acc + 1 : acc), 0);

const getAlmostOneOverlapCount = (pairs) =>
  pairs.reduce((acc, pair) => (!isNotOverlapping(pair) ? acc + 1 : acc), 0);

module.exports = {
  day4,
  getAssignents,
  isFullOverlap,
  getFullOverlapCount,
  isNotOverlapping,
  getAlmostOneOverlapCount,
};
