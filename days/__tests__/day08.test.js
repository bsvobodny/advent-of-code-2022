const {
    day8,
    getTreesHeight,
    isVisible,
    getNumberOfVisibleTrees,
    getScenicScore,
    getHighestScenicScore,
  } = require("../day08");
  
  describe("day 8", () => {
    const input = `30373
    25512
    65332
    33549
    35390`;
  
    it(`should get  as packet marker position for `, () => {
      expect(getTreesHeight(input)).toEqual([
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
        [6, 5, 3, 3, 2],
        [3, 3, 5, 4, 9],
        [3, 5, 3, 9, 0],
      ]);
    });
  
    it("should see that tree 1,1 is visible", () => {
      expect(isVisible(getTreesHeight(input), { x: 1, y: 1 })).toEqual(true);
    });
  
    it("should see that tree 2,1 is visible", () => {
      expect(isVisible(getTreesHeight(input), { x: 2, y: 1 })).toEqual(true);
    });
  
    it("should see that tree 1,2 is visible", () => {
      expect(isVisible(getTreesHeight(input), { x: 1, y: 2 })).toEqual(true);
    });
  
    it("should see that tree 2,2 is not visible", () => {
      expect(isVisible(getTreesHeight(input), { x: 2, y: 2 })).toEqual(false);
    });
  
    it("should see that tree 3,2 is visible", () => {
      expect(isVisible(getTreesHeight(input), { x: 3, y: 2 })).toEqual(true);
    });
  
    it("should see that tree 3,4 is visible", () => {
      expect(isVisible(getTreesHeight(input), { x: 3, y: 4 })).toEqual(true);
    });
  
    it("should see that tree 3,3 is not visible", () => {
      expect(isVisible(getTreesHeight(input), { x: 3, y: 3 })).toEqual(false);
    });
    it("should see that tree 1,3 is not visible", () => {
      expect(isVisible(getTreesHeight(input), { x: 1, y: 3 })).toEqual(false);
    });
  
    it("should find 21 visible trees from the outside", () => {
      expect(getNumberOfVisibleTrees(getTreesHeight(input))).toEqual(21);
    });
  
    it("should get as scenic score 4 for tree in 2;1", () => {
      expect(getScenicScore(getTreesHeight(input), { x: 2, y: 1 })).toEqual(4);
    });
  
    it("should get as scenic score 4 for tree in 2;3", () => {
      expect(getScenicScore(getTreesHeight(input), { x: 2, y: 3 })).toEqual(8);
    });
  
    it("should find 8 as highest Scenic score", () => {
      expect(getHighestScenicScore(getTreesHeight(input))).toEqual(8);
    });
  
    it("should find 8 as highest Scenic score", () => {
      expect(day8(input).nbVisibleTrees).toEqual(21);
      expect(day8(input).highestScenicScore).toEqual(8);
    });
  });
  
  describe("day 8 - custom input", () => {
    const input = `303734303734
      255127255127
      653322653322
      335490335490
      353901353901`;
  
    it("should get as scenic score 4 for tree in 2;1", () => {
      expect(getScenicScore(getTreesHeight(input), { x: 2, y: 1 })).toEqual(6);
    });
  
    it("should get as scenic score 4 for tree in 2;3", () => {
      expect(getScenicScore(getTreesHeight(input), { x: 2, y: 3 })).toEqual(8);
    });
  
    it("should find 8 as highest Scenic score", () => {
      expect(getHighestScenicScore(getTreesHeight(input))).toEqual(120);
    });
  });
  