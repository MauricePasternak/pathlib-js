import Path from "../src";
import assert from "assert";
import { platform, homedir } from "os";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

describe("Path creation", () => {
  it("Should be able to infer the home directory if a tilde was present as a path segment in the Path constructor", () => {
    const homePath = new Path("~/Test");
    assert(homePath.dirname === homedir().replace(/\\/gm, "/"));
  });
  it("Should appropriately infer the current working directory if a period was provided to the Path constructor", () => {
    const currentPath = new Path(".");
    assert(currentPath.path === process.cwd().replace(/\\/gm, "/"));
  });
});

describe("Path parts", () => {
  const fp = new Path(__dirname);
  it("Should correctly split a path into its components under typical conditions", () => {
    const parts = fp.parts();
    assert(parts.length);
    assert(platform() === "win32" ? parts[0] + "/" === fp.root : parts[0] === fp.root);
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
  it("Should generate an appropriate Path using withExtension", () => {
    assert(".bar" === testfile.withExtension("bar").ext);
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
  it("Should be able to fetch higher-level directories if the appropriate numIncrements value is specified", () => {
    assert(fp.parent(2).basename === "pathlib-js");
  });
  it("Should return the root directory if the numIncrements value is greater than the number of levels between the filepath and the root directory.", () => {
    // console.log(fp.parent(9999));
    assert(fp.parent(9999).path === fp.root);
  });
  it("Should return the same path as the one calling parent() if zero or a negative value is provided for numIncrements", () => {
    assert(fp.path === fp.parent(-10).path);
    assert(fp.path === fp.parent(0).path);
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
  const fpRootForTest = new Path(__dirname, "WalkTreesTest");
  const nestedPath = fpRootForTest.resolve("Foo", "Bar", "Baz.qui");
  it("Should be able to traverse a nested directory structure in the expected order", async () => {
    const orderOfNames = ["FolderA", "File_A1.txt", "File_A2.txt", "FolderB", "File_B1.json", "File_B2.json"];
    let indexer = -1;
    await fpRootForTest.walk(p => {
      if (orderOfNames.includes(p.basename)) {
        indexer++;
        assert(p.basename === orderOfNames[indexer]);
      }
    });
  });
  it("Should be able to create an appropriate tree structure", async () => {
    await nestedPath.makeFile();
    await sleep(20); // Hack
    const treeStruct = await nestedPath.parent(2).tree(false);
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
  setTimeout(() => fpRootForTest.deleteSync(), 400);
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
  const fpRootForTest = new Path(__dirname, "NthLevelAwayTest");
  const fp0 = new Path(__dirname, "NthLevelAwayTest", "Level-1", "Level0A");
  const fp1 = new Path(__dirname, "NthLevelAwayTest", "Level-1", "Level0B");
  fp1.makeDirSync();
  fp0.resolve("Level1A").makeDirSync();
  fp0.resolve("Level1B").makeDirSync();

  it("Should be able to detect sibling filepaths", async () => {
    const siblingNames: string[] = await (
      await fp0.getPathsNLevelsAway(0, false, { onlyDirectories: true })
    ).map(p => p.basename);
    for (const basename of ["Level0A", "Level0B"]) {
      assert(siblingNames.includes(basename));
    }
  });

  it("Should be able to detect child filepaths", async () => {
    const childNames: string[] = await (
      await fp0.getPathsNLevelsAway(1, false, { onlyDirectories: true })
    ).map(p => p.basename);
    for (const basename of ["Level1A", "Level1B"]) {
      assert(childNames.includes(basename));
    }
  });

  it("Should be able to detect parent filepaths", async () => {
    const parentNames: string[] = await (
      await fp0.getPathsNLevelsAway(-1, false, { onlyDirectories: true })
    ).map(p => p.basename);
    for (const basename of ["Level-1"]) {
      assert(parentNames.includes(basename));
    }
  });
  setTimeout(() => fpRootForTest.deleteSync(), 200);
});

describe("Making and removing filepaths", () => {
  const fpRootForTest = new Path(__dirname, "MakeAndRemakeFilePathTests");
  const candidateFile = fpRootForTest.resolve("File_C1.csv");
  const candidateDir = fpRootForTest.resolve("SubfolderD");
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
  setTimeout(() => fpRootForTest.deleteSync(), 200);
});

describe("Making and Reading Symlinks", () => {
  const fpRootForTest = new Path(__dirname, "SymlinkTests");
  const exampleSourceFile = fpRootForTest.resolve("SourceFoo.txt");
  const exampleTargetFile = fpRootForTest.resolve("TargetFoo.txt");
  const exampleSourceDirectory = fpRootForTest.resolve("SourceDirectory");
  const exampleTargetDirectory = fpRootForTest.resolve("TargetDirectory");
  exampleSourceFile.makeFileSync();
  exampleSourceDirectory.makeDirSync();
  exampleTargetFile.makeFileSync();
  exampleTargetDirectory.makeDirSync();

  const symlinkFromSourceFile = fpRootForTest.resolve("SymlinkFromSourceFoo.symlink");
  const symlinkFromSourceDirectory = fpRootForTest.resolve("SymlinkFromSourceBar.symlink");
  const symlinkToTargetFile = fpRootForTest.resolve("SymlinkToTargetFoo.symlink");
  const symlinkToTargetDirectory = fpRootForTest.resolve("SymlinkToTargetBar.symlink");

  it("Should be able to make a valid link between a source file and a target symlink file", async () => {
    await exampleSourceFile.makeSymlink(symlinkFromSourceFile);
    await sleep(10);
    assert((await symlinkFromSourceFile.readLink()).path === exampleSourceFile.path);
  });
  it("Should be able to make a valid link between a source directory and a target symlink", async () => {
    await exampleSourceDirectory.makeSymlink(symlinkFromSourceDirectory);
    await sleep(10); // Hack
    assert((await symlinkFromSourceDirectory.readLink()).path === exampleSourceDirectory.path);
  });
  it("Should be able to make a valid link between a source symlink and a target file", async () => {
    await symlinkToTargetFile.makeSymlink(exampleTargetFile, { targetIsLink: false });
    await sleep(10); // Hack
    assert((await symlinkToTargetFile.readLink()).path === exampleTargetFile.path);
  });
  it("Should be able to make a valid link between a source symlink and a target directory", async () => {
    await symlinkToTargetDirectory.makeSymlink(exampleTargetDirectory, { targetIsLink: false });
    await sleep(10); // Hack
    assert((await symlinkToTargetDirectory.readLink()).path === exampleTargetDirectory.path);
  });
  setTimeout(() => fpRootForTest.deleteSync(), 400);
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
  setTimeout(() => notAJSONFile.deleteSync(), 200);
});

describe("Reading and Writing other Files", () => {
  const testFile1 = new Path(__dirname, "ReadWriteTestOther", "Test.txt");
  const testFile2 = testFile1.withBasename("Test2.txt");
  it("Should be able to write and then read content using writeFile and readFile in sequence", async () => {
    await testFile1.writeFile("Hello World", { encoding: "ascii" });
    const contents = await testFile1.readFile("ascii");
    assert(contents === "Hello World");
  });
  it("Should be able to write and then read content using write and read in sequence", async () => {
    await testFile2.write(Buffer.from("Hello World", "ascii"), 0, "Hello World".length, 0, false, {
      flags: "r+",
      ensureExists: true,
    });
    const readRes = await testFile2.read(Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65]), 0, 5, 0, true);
    assert(readRes.buffer.toString() === "Hello");
  });
  setTimeout(() => testFile1.parent().deleteSync(), 500);
});

describe("Moving, Copying, and Deleting filepaths", () => {
  const fpRootForTest = new Path(__dirname, "MoveCopyDeleteTests");
  const copySrcPath = fpRootForTest.resolve("FolderX", "X1", "X1_1.foo");
  const copyDstPath = fpRootForTest.resolve("FolderX", "X2", "X1_1.foo");
  const moveSrcPath = fpRootForTest.resolve("FolderY", "Y1", "Y1_1.bar");
  const moveDstPath = fpRootForTest.resolve("FolderY", "Y2", "Y1_1.bar");
  copySrcPath.makeFileSync();
  moveSrcPath.makeFileSync();
  it("Should be able to copy a filepath into another location, making parent directories as necessary. Following this, it should also be able to remove them.", async () => {
    assert(!(await copyDstPath.exists()));
    const dst = await copySrcPath.copy(copyDstPath);
    assert(dst.path === copyDstPath.path);
    assert(await copyDstPath.exists());
    await sleep(20); // Hack
    await fpRootForTest.resolve("FolderX").remove();
    await sleep(20); // Hack
    assert(!(await copyDstPath.exists()));
    assert(!(await copySrcPath.exists()));
  });
  it("As above, but accept a relative path (relative to the path itself, not cwd)", async () => {
    const relString = "../Destination.txt";
    const copySrcRelative = fpRootForTest.resolve("FolderRelativeCopy/Source.txt");
    const copyDstRelative = copySrcRelative.resolve(relString);
    assert(!(await copyDstRelative.exists()));
    await copySrcRelative.makeFile();
    await sleep(20); // Hack
    const dst = await copySrcRelative.copy(relString, { interpRelativeSource: "path", overwrite: true });
    await sleep(20); // Hack
    assert(dst.path === copyDstRelative.path);
    assert(await copyDstRelative.exists());
  });
  it("Should be able to move a filepath into another location, making parent directories as necessary. Following this, it should also be able to remove them.", async () => {
    assert(!(await moveDstPath.exists()));
    const locMoved = await moveSrcPath.move(moveDstPath);
    await sleep(20); // Hack
    assert(locMoved.path === moveDstPath.path);
    assert(await moveDstPath.exists());
    assert(!(await moveSrcPath.exists()));
    await fpRootForTest.resolve("FolderY").remove();
    await sleep(20); // Hack
    assert(!(await moveDstPath.exists()));
    assert(!(await moveSrcPath.exists()));
  });
  it("As above, but accept a relative path (relative to the path itself, not cwd)", async () => {
    const relString = "../Destination.txt";
    const moveSrcRelative = fpRootForTest.resolve("FolderRelativeMove/Source.txt");
    const moveDstRelative = moveSrcRelative.resolve(relString);
    await moveSrcRelative.makeFile();
    await sleep(20); // Hack
    const dst = await moveSrcRelative.move(relString, { interpRelativeSource: "path", overwrite: true });
    await sleep(20); // Hack
    assert(dst.path === moveDstRelative.path);
    assert(await moveDstRelative.exists());
  });
  setTimeout(() => fpRootForTest.deleteSync(), 700);
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
