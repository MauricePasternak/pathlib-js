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
});

describe("Globbing", () => {
  const fp = new Path(__dirname);
  it("Should be able to selectively glob for specific filetypes", async () => {
    const jsonFiles = await fp.glob("**/*.json", { dot: true });
    assert(jsonFiles.length === 2);
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
