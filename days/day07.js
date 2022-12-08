const OBJECT_TYPE = {
    FOLDER: "FOLDER",
    FILE: "FILE",
  };
  
  const ROOT = "/";
  
  const TOTAL_DISK_SPACE = 70_000_000;
  const UNUSED_SPACE_NEEDED_TO_RUN_UPDATE = 30_000_000;
  
  const day7 = (input) => {
    const commands = extractCommandAndResult(input);
    const fs = constructFileSystem(commands);
    const foldersSizeLess100K = getFoldersSizeLessThan(fs, 100_000);
    const totalSizeFoldersLessThan100k = foldersSizeLess100K.reduce(
      (acc, fSize) => acc + fSize,
      0
    );
  
    return {
      totalSizeFoldersLessThan100k,
      folderSizeToDelete: getFolderSizeToDelete(fs),
    };
  };
  
  const extractCommandAndResult = (input) => {
    const commands = input
      .split("$")
      .filter((l) => l)
      .map((c) =>
        c
          .trim()
          .split("\n")
          .reduce((acc, i, index) => {
            const newCommand = {
              ...acc,
            };
            if (index === 0) {
              newCommand.command = i;
            } else {
              if (!newCommand.results) {
                newCommand.results = [];
              }
              newCommand.results.push(getObjectInfo(i.trim()));
            }
            return newCommand;
          }, {})
      );
    return commands;
  };
  
  const getObjectInfo = (r) => {
    const [info, name] = r.split(" ");
    const objectInfo = {
      name,
    };
    if (info === "dir") {
      objectInfo.type = OBJECT_TYPE.FOLDER;
      objectInfo.children = [];
    } else {
      objectInfo.type = OBJECT_TYPE.FILE;
      objectInfo.size = parseInt(info);
    }
    return objectInfo;
  };
  
  const constructFileSystem = (commands) => {
    let fs = { name: ROOT, type: OBJECT_TYPE.FOLDER, children: [] };
    let currentPath = [];
  
    commands.forEach((c, index) => {
      const [cmd, params] = c.command.split(" ");
      if (cmd === "cd") {
        if (params === "..") {
          currentPath.pop();
        } else {
          currentPath.push(params);
        }
      }
      if (cmd === "ls") {
        fs = addElemToFolder(fs, currentPath, c.results, currentPath.slice(0));
      }
    });
  
    return calculateSize(fs);
  };
  
  const addElemToFolder = (folder, path, elements, originalPath) => {
    const modifiedFolder = { ...folder };
    if (path.length === 1 && folder.name === path[0]) {
      modifiedFolder.children = elements;
      modifiedFolder.path = originalPath.slice(0);
    } else if (folder.name === path[0]) {
      const newChildren = [];
      modifiedFolder.children.forEach((f) => {
        let modifiedF = { ...f };
        if (modifiedF.type === OBJECT_TYPE.FOLDER) {
          if (path.length === 1 && modifiedF.name === path[0]) {
            modifiedF.children = elements;
            modifiedF.path = originalPath.slice(0);
          } else {
            modifiedF = addElemToFolder(f, path.slice(1), elements, originalPath);
          }
        }
        newChildren.push(modifiedF);
      });
  
      modifiedFolder.children = newChildren;
    }
    return modifiedFolder;
  };
  
  const calculateSize = (folder) => {
    const modifiedFolder = { ...folder, size: getSize(folder) };
  
    const newChildren = [];
    modifiedFolder.children.forEach((f) => {
      let modifiedF = { ...f };
      if (modifiedF.type === OBJECT_TYPE.FOLDER) {
        modifiedF = calculateSize(modifiedF);
      }
      newChildren.push(modifiedF);
    });
    modifiedFolder.children = newChildren;
    return modifiedFolder;
  };
  
  const getSize = (folder) =>
    folder.children
      ? folder.children.reduce((acc, i) => {
          if (i.type === OBJECT_TYPE.FILE) {
            return acc + i.size;
          } else {
            return acc + getSize(i);
          }
        }, 0)
      : 0;
  
  const getFolder = (fs, name) => {
    const folder = fs.children.find((i) => i.name === name);
    return (
      folder ||
      fs.children
        .filter((item) => item.type === OBJECT_TYPE.FOLDER)
        .reduce((acc, i) => acc || getFolder(i, name), null)
    );
  };
  
  const getFoldersSizeLessThan = (folder, size) => {
    let foldersSize = [];
    folder.children
      .filter((i) => i.type === OBJECT_TYPE.FOLDER)
      .forEach((f) => {
        if (f.size <= size) {
          foldersSize.push(f.size);
        }
        foldersSize = foldersSize.concat(getFoldersSizeLessThan(f, size));
      });
    return foldersSize;
  };
  
  const getFoldersSizeGreaterThan = (folder, size) => {
    let foldersSize = [];
    folder.children
      .filter((i) => i.type === OBJECT_TYPE.FOLDER)
      .forEach((f) => {
        if (f.size >= size) {
          foldersSize.push(f.size);
        }
        foldersSize = foldersSize.concat(getFoldersSizeGreaterThan(f, size));
      });
    return foldersSize;
  };
  
  const getFolderSizeToDelete = (fs) => {
    const spaceToFree =
      UNUSED_SPACE_NEEDED_TO_RUN_UPDATE - (TOTAL_DISK_SPACE - fs.size);
  
    return getFoldersSizeGreaterThan(fs, spaceToFree)
      .sort((a, b) => b - a)
      .pop();
  };
  
  module.exports = {
    day7,
    extractCommandAndResult,
    constructFileSystem,
    getSize,
    getFolder,
    getFoldersSizeLessThan,
    OBJECT_TYPE,
    getFolderSizeToDelete,
  };
  