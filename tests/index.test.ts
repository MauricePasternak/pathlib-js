import Path from "../src";
import assert from "assert";
import { platform } from "os";

describe("Path properties", () => {
  const fp = new Path(__filename);
  it("Should have a correct basename", () => {
    assert(fp.basename === "index.test.ts");
  });
  it("Should have a correct string extension", () => {
    assert(fp.ext === ".ts");
  });
  it("Should have a correct stem", () => {
    assert(fp.stem === "index");
  });
  it("Should have a correct set of suffixes", () => {
    assert(fp.suffixes.length === 2 && fp.suffixes[0] === "test" && fp.suffixes[1] === "ts");
  });
  it("Should have a correct root", () => {
    platform() === "win32" ? assert(/\w:\//gm.test(fp.root)) : assert(fp.root === "/");
  });
  it("Should have a correct parent filepath", () => {
    assert(fp.parent().path === new Path(__dirname).path);
  });
});

describe("Retrieving a parent", () => {
  const fp = new Path(__filename);
  const pp = fp.parent();
  it("Should have a correct type and basename", () => {
    assert(pp.basename === "tests");
  });
  it("Should be able to re-create the child path via join", () => {
    const newChild = pp.join(fp.basename);
    assert(newChild.path === fp.path);
  });
  it("Should be able to re-create the child with resolve", () => {
    const newChild = pp.resolve("index.test.ts");
    assert(newChild.path === fp.path);
  });
});

describe("Existence checking", () => {
  const fp = new Path(__dirname);
  const child = fp.join("index.test.ts");
  it("Folder containing test file should be detected as a directory", async () => {
    assert(await fp.isDirectory());
  });
  it("Test file itself should be detected as a file", async () => {
    assert(await child.isFile());
  });
  it("Should be able to check the existence of an immediate child", async () => {
    assert(await fp.containsImmediateChild(child));
    assert(await fp.containsImmediateChild("index.test.ts"));
  });
});

describe("Globbing", () => {
  const fp = new Path(__dirname);
  it("Should be able to selectively glob for specific filetypes", async () => {
    const jsonFiles = await fp.glob("**/*.json", { dot: true });
    assert(jsonFiles.length === 2);
  });
});

describe("Walking", () => {
  const fp = new Path(__dirname);
  it("Should be able to traverse a nested directory structure in the expected order", async () => {
    const orderOfNames = ["FolderA", "File_A1.txt", "File_A2.txt", "FolderB", "File_B1.json", "File_B2.json"];
    let indexer = -1;
    await fp.walk(p => {
      if (orderOfNames.includes(p.basename)) {
        indexer++;
        assert(p.basename === orderOfNames[indexer]);
      }
    });
  });
});

describe("Directory iteration", () => {
  const fp = new Path(__dirname).join("FolderA");
  it("Should be able to retrieve accurate child paths by iterating over a parent folder", async () => {
    const expectedNames = ["File_A1.txt", "File_A2.txt"];
    let ii = 0;
    for await (const childPath of fp.readDirIter()) {
      assert(expectedNames[ii] === childPath.basename);
      ii++;
    }
  });
});

describe("Detection of filepaths at Nth level away", () => {
  const fp = new Path(__dirname).join("FolderA");
  const expectedSiblingBasenames = new Set(["FolderA", "FolderB"]);
  const expectedChildrenBasenames = new Set(["File_A1.txt", "File_A2.txt"]);
  const expectedParentBasenames = new Set(["src", "tests", "docs", "node_modules"]);

  it("Should be able to detect sibling filepaths", async () => {
    const siblingNames: string[] = [];
    for await (const siblingPath of await fp.getPathsNLevelsAway(0, true, { onlyDirectories: true })) {
      siblingNames.push(siblingPath.basename);
    }
    for (const name of expectedSiblingBasenames) {
      assert(siblingNames.includes(name));
    }
  });
  it("Should be able to detect child filepaths", async () => {
    const childrenNames: string[] = [];
    for await (const childPath of await fp.getPathsNLevelsAway(1, true, { onlyFiles: true })) {
      childrenNames.push(childPath.basename);
    }
    for (const name of expectedChildrenBasenames) {
      assert(childrenNames.includes(name));
    }
  });
  it("Should be able to detect parent filepaths", async () => {
    const parentNames: string[] = [];
    for await (const parentPath of await fp.getPathsNLevelsAway(-1, true, { onlyDirectories: true })) {
      parentNames.push(parentPath.basename);
    }
    for (const name of expectedParentBasenames) {
      assert(parentNames.includes(name));
    }
  });
});

describe("Making and removing filepaths", () => {
  const candidateFile = new Path(__dirname).join("FolderC/File_C1.csv");
  const candidateDir = new Path(__dirname).join("FolderC/SubfolderD");
  it("Should be a clear test without the filepath existing initially", async () => {
    assert(!(await candidateFile.exists()));
    assert(!(await candidateDir.exists()));
  });
  it("Should throw an error upon trying to make a file with the makeDir() method", async () => {
    try {
      await candidateFile.makeDir();
    } catch (error) {}
    assert(!(await candidateFile.exists()));
  });
  it("Should throw an error upon trying to make a directory with the makeFile() method", async () => {
    try {
      await candidateDir.makeFile();
    } catch (error) {}
    assert(!(await candidateDir.exists()));
  });
  it("Should successfully make a file with makeFile, creating parent directories as needed", async () => {
    try {
      await candidateFile.makeFile();
    } catch (error) {}
    setTimeout(async () => {
      assert(await candidateFile.exists());
    }, 100);
  });
  it("Should successfully make a directory with makeDir, creating parent directories as needed", async () => {
    try {
      await candidateDir.makeDir();
    } catch (error) {}
    setTimeout(async () => {
      assert(await candidateDir.exists());
    }, 100);
  });
  it("Should successfully delete a folder and all its children", async () => {
    await candidateFile.parent().remove();
    setTimeout(async () => {
      assert(!(await candidateDir.exists()));
      assert(await candidateFile.exists());
    }, 200);
  });
});
