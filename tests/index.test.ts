import Path, { treeBranch } from "../src";
import assert from "assert";
import { platform } from "os";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// TODO: add tests for readLink

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
    platform() === "win32" ? assert(/\w:/gm.test(fp.root)) : assert(fp.root === "/");
  });
  it("Should have a correct parent filepath", () => {
    assert(fp.parent().path === new Path(__dirname).path);
  });
});

describe("Path parts", () => {
  const fp = new Path(__dirname);
  it("Should correctly split a path into its components under typical conditions", () => {
    const parts = fp.parts();
    assert(parts.length);
    assert(parts[0] === fp.root);
    assert(parts.slice(parts.length - 1)[0] === fp.basename);
  });
  if (platform() !== "win32") {
    it("On Unix, should correctly split into parts even if the path is the root", () => {
      const rootPath = new Path("/");
      assert(rootPath.root === rootPath.path);
      const parts = rootPath.parts();
      assert(parts.length);
      assert(parts[0] === rootPath.path);
    });
  }
});

describe("Relative strings", () => {
  const fpDir = new Path(__dirname);
  const fpFile = new Path(__filename);
  it("Should correctly infer the strings that represent the relationship between __filename and __dirname", () => {
    assert(fpDir.relative(fpFile).startsWith("index.test"));
    assert(fpFile.relative(fpDir) === "..");
  });
});

describe("New Path creation from previous", () => {
  const fpDir = new Path(__dirname);
  const testfile = new Path(__filename + "/Test.tar.gz");
  it("Should generate an appropriate Path using withBasename", () => {
    assert("TEST" === fpDir.withBasename("TEST").basename);
  });
  it("Should generate an appropriate Path using withStem", () => {
    assert("TEST" === fpDir.withStem("TEST").basename);
  });
  it("Should generate an appropriate Path using withSuffix argument as a String, even if user adds '.' to the start of a string and/or elements of an array argument", () => {
    const newFileByArray = testfile.withSuffix(["json", ".gz"]);
    const newFileByString = testfile.withSuffix(".json.gz");
    assert(newFileByArray.basename === newFileByString.basename);
    assert(newFileByArray.suffixes.join(".") === "json.gz");
    assert(newFileByArray.ext === ".gz");
  });
  it("Should resolve '..' correctly into a new filepath using the resolve() method", () => {
    assert(fpDir.parent().path === fpDir.resolve("..").path);
  });
  it("Should disregard '.' correctly when using the resolve() method", () => {
    assert(fpDir.resolve("./index.test.ts").path === new Path(__filename).path);
  });
  it("Should treat '..' and '.' literally when using the join() method", () => {
    console.log(fpDir.join("../Test").path);
    assert(fpDir.join("../Test").path.endsWith("../Test"));
    assert(fpDir.join("./Test").path.endsWith("./Test"));
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
  it("Should detect that the test folder exists", async () => {
    assert(await fp.exists());
  });
  it("Should detect the test folder as a directory", async () => {
    assert(await fp.isDirectory());
  });
  it("Should detect the test file itself as a file", async () => {
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
  it("Should be able to allow for glob iteration instead of fetching all hits at once", async () => {
    const txtFileIterator = fp.globIter("**/*.txt", { dot: true });
    for await (const p of txtFileIterator) {
      assert(p.ext === ".txt");
    }
  });
});

describe("Walking and Traversing Trees", () => {
  const fp = new Path(__dirname);
  const nestedPath = new Path(__dirname, "Foo", "Bar", "Baz.qui");
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
  it("Should be able to create an appropriate tree structure", async () => {
    await nestedPath.makeFile();
    await sleep(20); // Hack
    const treeStruct = await nestedPath.parent().parent().tree(false);
    assert(treeStruct.children != null);
    const firstBranch = treeStruct.children[0];
    if (firstBranch.children == null) assert(false);
    assert(firstBranch.filepath.basename === "Bar");
    const secondBranch = firstBranch.children[0];
    assert(secondBranch.children == null);
    await new Path(__dirname, "Foo").delete();
  });
  it("Should have treeBranch.filepath as a string type if the asString parameter is true", async () => {
    const treeStruct = await new Path(__dirname).tree(true);
    assert(typeof treeStruct.filepath === "string" && treeStruct.children != null);
    assert(typeof treeStruct.children[0].filepath === "string");
  });
});

describe("Directory iteration", () => {
  const fpFolderA = new Path(__dirname).join("FolderA");
  const expectedNames = ["File_A1.txt", "File_A2.txt"];

  it("Should be able to return an array of child filepaths", async () => {
    const children = (await fpFolderA.readDir()).map(p => p.basename);
    assert.deepEqual(children, expectedNames);
  });
  it("Should be able to iterate over the child filepaths as an alternative", async () => {
    let ii = 0;
    for await (const childPath of fpFolderA.readDirIter()) {
      assert(expectedNames[ii] === childPath.basename);
      ii++;
    }
  });
});

describe("Permissions", () => {
  const fp = new Path(__dirname, "FolderA", "File_A1.txt");
  const initialMode = fp.statSync().mode;
  const parsedMode = Path.parseModeIntoOctal(initialMode);
  it("Should be able to inform a user about permissions given a mode", async () => {
    const permissions = await fp.access();
    assert(permissions.canRead && permissions.canWrite);
  });

  if (platform() !== "win32") {
    it("Should be able to change the permissions of a file at all 3 levels on Unix-based systems", async () => {
      await fp.chmod(0o777);
      const newPermissions = await fp.access();
      assert(newPermissions.canExecute);
      await fp.chmod(initialMode);
      assert(Path.parseModeIntoOctal((await fp.stat()).mode) === parsedMode);
    });
  }
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
  const candidateSymlink = new Path(__dirname).join("FolderC/SubfolderE/File_Symlink.symlink");
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
    await sleep(20);
    assert(await candidateFile.exists());
  });
  it("Should successfully make a directory with makeDir, creating parent directories as needed", async () => {
    try {
      await candidateDir.makeDir();
    } catch (error) {}
    await sleep(20);
    assert(await candidateDir.exists());
  });
  it("Should successfully make a symlink with makeSymlink, creating parent directories as needed", async () => {
    try {
      await new Path(__dirname, "FolderB", "File_B1.json").makeSymlink(candidateSymlink);
    } catch (error) {}
    await sleep(50); // Hack
    assert(await candidateSymlink.exists());
  });
  it("Should successfully delete a folder and all its children", async function () {
    await candidateFile.parent().remove();
    await sleep(20); // Hack
    assert(!(await candidateFile.exists()));
  });
});

describe("Reading and Writing JSON files", () => {
  const jsonReadFile = new Path(__dirname, "FolderB", "File_B1.json");
  const jsonWriteFile = new Path(__dirname, "FolderB", "File_B2.json");
  const notAJSONFile = new Path(__dirname, "FolderC");
  it("Should correctly read in a JSON Object", async () => {
    const jsonContents = await jsonReadFile.readJSON();
    assert.deepStrictEqual(jsonContents, {
      foo: "a string",
      bar: 42,
      baz: true,
    });
  });
  it("Should correctly write a JSON object into a valid JSON filepath", async () => {
    try {
      await jsonWriteFile.writeJSON({ key1: "value1", key2: "value2" });
    } catch (error) {
      assert(false);
    }
  });
  it("Should throw an error if the user attempts to write a JSON object into an invalid filepath", async () => {
    try {
      await notAJSONFile.writeJSON({ bad: "filepath" });
      assert(false);
    } catch (error) {
      assert(true);
    }
  });
});

describe("Reading and Writing other Files", () => {
  const testFile = new Path(__dirname, "ReadWriteTestOther", "Test.txt");
  it("Should be able to write content to a file and then read that content from the same file in a separate operation", async () => {
    await testFile.writeFile("Hello World", { encoding: "ascii" });
    const contents = await testFile.readFile("ascii");
    assert(contents === "Hello World");
    await testFile.parent().remove();
  });
});

describe("Moving and copying filepaths", () => {
  const copySrcPath = new Path(__dirname, "FolderX", "X1", "X1_1.foo");
  const copyDstPath = new Path(__dirname, "FolderX", "X2", "X1_1.foo");
  const moveSrcPath = new Path(__dirname, "FolderY", "Y1", "Y1_1.bar");
  const moveDstPath = new Path(__dirname, "FolderY", "Y2", "Y1_1.bar");
  copySrcPath.makeFileSync();
  moveSrcPath.makeFileSync();
  it("Should be able to copy a filepath into another location, making parent directories as necessary. Following this, it should also be able to remove them.", async () => {
    assert(!(await copyDstPath.exists()));
    await copySrcPath.copy(copyDstPath);
    assert(await copyDstPath.exists());
    await new Path(__dirname, "FolderX").remove();
    await sleep(20); // Hack
    assert(!(await copyDstPath.exists()));
    assert(!(await copySrcPath.exists()));
  });
  it("Should be able to move a filepath into another location, making parent directories as necessary. Following this, it should also be able to remove them.", async () => {
    assert(!(await moveDstPath.exists()));
    await moveSrcPath.move(moveDstPath);
    assert(await moveDstPath.exists());
    assert(!(await moveSrcPath.exists()));
    await new Path(__dirname, "FolderY").remove();
    await sleep(20); // Hack
    assert(!(await moveDstPath.exists()));
    assert(!(await moveSrcPath.exists()));
  });
});

describe("Static methods work as intended", () => {
  it("Should be able to retrieve the current working directory and validate its existence", async () => {
    assert(await Path.cwd().exists());
  });
  it("Should be able to retrieve filepaths found under PATH", () => {
    if (process.env.PATH) {
      assert(Path.getPATHAsPaths().length);
    }
  });
  it("Should be able to parse permissions into a human-readable octal", () => {
    const mode = Path.parseModeIntoOctal(new Path(__filename).statSync().mode);
    assert(mode && Number.isInteger(mode));
    assert(/\d{3}/gm.test(mode.toString()));
  });
});
