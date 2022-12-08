const {
    day7,
    extractCommandAndResult,
    constructFileSystem,
    getFolder,
    getSize,
    getFoldersSizeLessThan,
    OBJECT_TYPE,
    getFolderSizeToDelete,
  } = require("../day07");
  
  describe("day 7", () => {
    const input = `$ cd /
      $ ls
      dir a
      14848514 b.txt
      8504156 c.dat
      dir d
      $ cd a
      $ ls
      dir e
      29116 f
      2557 g
      62596 h.lst
      $ cd e
      $ ls
      584 i
      $ cd ..
      $ cd ..
      $ cd d
      $ ls
      4060174 j
      8033020 d.log
      5626152 d.ext
      7214296 k`;
  
    const expectedStructure = {
      children: [
        {
          children: [
            {
              children: [{ name: "i", size: 584, type: OBJECT_TYPE.FILE }],
              name: "e",
              type: OBJECT_TYPE.FOLDER,
              size: 584,
              path: ["/", "a", "e"],
            },
            { name: "f", size: 29116, type: OBJECT_TYPE.FILE },
            { name: "g", size: 2557, type: OBJECT_TYPE.FILE },
            { name: "h.lst", size: 62596, type: OBJECT_TYPE.FILE },
          ],
          name: "a",
          type: OBJECT_TYPE.FOLDER,
          size: 94853,
          path: ["/", "a"],
        },
        { name: "b.txt", size: 14848514, type: OBJECT_TYPE.FILE },
        { name: "c.dat", size: 8504156, type: OBJECT_TYPE.FILE },
        {
          children: [
            { name: "j", size: 4060174, type: OBJECT_TYPE.FILE },
            { name: "d.log", size: 8033020, type: OBJECT_TYPE.FILE },
            { name: "d.ext", size: 5626152, type: OBJECT_TYPE.FILE },
            { name: "k", size: 7214296, type: OBJECT_TYPE.FILE },
          ],
          name: "d",
          type: OBJECT_TYPE.FOLDER,
          size: 24933642,
          path: ["/", "d"],
        },
      ],
      name: "/",
      type: OBJECT_TYPE.FOLDER,
      size: 48381165,
      path: ["/"],
    };
  
    it(`should analyse commands and results`, () => {
      expect(constructFileSystem(extractCommandAndResult(input))).toEqual(
        expectedStructure
      );
    });
  
    it("should return 94853 the 'a' folder a size", () => {
      expect(getSize(getFolder(expectedStructure, "a"))).toEqual(94853);
    });
  
    it("should return 584 the 'e' folder a size", () => {
      expect(getSize(getFolder(expectedStructure, "e"))).toEqual(584);
    });
  
    it("should return 24933642 the 'd' folder a size", () => {
      expect(getSize(getFolder(expectedStructure, "d"))).toEqual(24933642);
    });
  
    it("should return 48381165 the 'root' folder a size", () => {
      expect(getSize(expectedStructure)).toEqual(48381165);
    });
  
    it("Should get the folders that size is less than 100K", () => {
      expect(getFoldersSizeLessThan(expectedStructure, 100_000)).toEqual([
        94853, 584,
      ]);
    });
  
    it("Should get the folders to delete, in order to be able to do the update", () => {
      expect(
        getFolderSizeToDelete(constructFileSystem(extractCommandAndResult(input)))
      ).toEqual(24933642);
    });
  
    it("Should get the total size of the folders that size is less than 100K equals to 95437", () => {
      expect(day7(input).totalSizeFoldersLessThan100k).toEqual(95437);
      expect(day7(input).folderSizeToDelete).toEqual(24933642);
    });
  });
  