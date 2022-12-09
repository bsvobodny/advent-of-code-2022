const day8 = (input) => {
    return {
      nbVisibleTrees: getNumberOfVisibleTrees(getTreesHeight(input)),
      highestScenicScore: getHighestScenicScore(getTreesHeight(input)),
    };
  };
  
  const getTreesHeight = (input) =>
    input.split("\n").map((l) =>
      l
        .trim()
        .split("")
        .map((h) => parseInt(h, 10))
    );
  
  const isVisible = (trees, position) => {
    let isVisibleLeft = true;
    let isVisibleRight = true;
    let isVisibleTop = true;
    let isVisibleBottom = true;
  
    // if all trees between position.x and 0 or position.x and line.length or position.y and 0 or position.y and column.length are shorter that the tree
    trees[position.y].forEach((t, index) => {
      // Left part
      if (index < position.x) {
        isVisibleLeft =
          t >= trees[position.y][position.x] ? false : isVisibleLeft;
      }
      // Right part
      if (index > position.x) {
        isVisibleRight =
          t >= trees[position.y][position.x] ? false : isVisibleRight;
      }
    });
  
    trees.forEach((tl, index) => {
      // Left part
      if (index < position.y) {
        isVisibleTop =
          tl[position.x] >= trees[position.y][position.x] ? false : isVisibleTop;
      }
      // Right part
      if (index > position.y) {
        isVisibleBottom =
          tl[position.x] >= trees[position.y][position.x]
            ? false
            : isVisibleBottom;
      }
    });
  
    return isVisibleLeft || isVisibleRight || isVisibleBottom || isVisibleTop;
  };
  
  const getNumberOfVisibleTrees = (trees) =>
    trees.reduce(
      (acc, tl, indexY) =>
        acc +
        tl.reduce(
          (acc, t, indexX) =>
            acc + (isVisible(trees, { x: indexX, y: indexY }) ? 1 : 0),
          0
        ),
      0
    );
  
  const getScenicScore = (trees, position) => {
    const viewingDistance = {
      left: position.x,
      right: trees[0].length - position.x - 1,
      top: position.y,
      bottom: trees.length - position.y - 1,
    };
    // if all trees between position.x and 0 or position.x and line.length or position.y and 0 or position.y and column.length are shorter that the tree
    trees[position.y].forEach((t, index) => {
      // Left part
      if (index < position.x) {
        viewingDistance.left =
          t >= trees[position.y][position.x]
            ? position.x - index
            : viewingDistance.left;
      }
      // Right part
      if (index > position.x) {
        viewingDistance.right =
          t >= trees[position.y][position.x] &&
          viewingDistance.right === trees[0].length - position.x - 1
            ? index - position.x
            : viewingDistance.right;
      }
    });
  
    trees.forEach((tl, index) => {
      // Top part
      if (index < position.y) {
        viewingDistance.top =
          tl[position.x] >= trees[position.y][position.x]
            ? position.y - index
            : viewingDistance.top;
      }
      // Bottom part
      if (index > position.y) {
        viewingDistance.bottom =
          tl[position.x] >= trees[position.y][position.x] &&
          viewingDistance.bottom === trees.length - position.y - 1
            ? index - position.y
            : viewingDistance.bottom;
      }
    });
  
    return Object.values(viewingDistance).reduce((acc, vd) => acc * vd, 1);
  };
  
  const getHighestScenicScore = (trees) => {
    const scenicScores = [];
    trees.forEach((tl, y) => {
      tl.forEach((t, x) => {
        scenicScores.push(getScenicScore(trees, { x, y }));
      });
    });
    return scenicScores.sort((a, b) => b - a)[0];
  };
  
  module.exports = {
    day8,
    getTreesHeight,
    isVisible,
    getNumberOfVisibleTrees,
    getScenicScore,
    getHighestScenicScore,
  };
  