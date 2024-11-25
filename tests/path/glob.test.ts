import * as fse from "fs-extra";
import { tmpdir } from "os";
import { beforeEach, describe, expect, test } from "vitest";
import { Path } from "../../src/path.js";

describe("Glob Methods Tests", () => {
	let tempDir: Path;

	// Test directory structure:
	// tempDir/
	// ├── .hidden
	// ├── a.txt
	// ├── b.txt
	// ├── subdir1/
	// │   ├── c.txt
	// │   └── d.json
	// └── subdir2/
	//     ├── e.txt
	//     └── .hidden.txt

	beforeEach(async () => {
		// Setup test directory structure
		tempDir = new Path(tmpdir(), "pathlib-test-glob");
		await fse.remove(tempDir.path);
		await fse.ensureDir(tempDir.path);

		// Create test files and directories
		await fse.writeFile(tempDir.joinPath(".hidden").path, "hidden file");
		await fse.writeFile(tempDir.joinPath("a.txt").path, "a");
		await fse.writeFile(tempDir.joinPath("b.txt").path, "b");

		await fse.ensureDir(tempDir.joinPath("subdir1").path);
		await fse.writeFile(tempDir.joinPath("subdir1", "c.txt").path, "c");
		await fse.writeFile(tempDir.joinPath("subdir1", "d.json").path, "{}");

		await fse.ensureDir(tempDir.joinPath("subdir2").path);
		await fse.writeFile(tempDir.joinPath("subdir2", "e.txt").path, "e");
		await fse.writeFile(tempDir.joinPath("subdir2", ".hidden.txt").path, "hidden");
	});

	describe("glob method", () => {
		test("finds all files with single pattern", async () => {
			const files = await tempDir.glob("*.txt");
			expect(files).toHaveLength(2);
			expect(files.map((f) => f.basename).sort()).toEqual(["a.txt", "b.txt"]);
		});

		test("finds files with multiple patterns", async () => {
			const files = await tempDir.glob(["*.txt", "*.json"]);
			expect(files).toHaveLength(2);
			expect(files.map((f) => f.basename).sort()).toEqual(["a.txt", "b.txt"]);
		});

		test("finds files recursively", async () => {
			const files = await tempDir.glob("**/*.txt");
			expect(files).toHaveLength(4); // a.txt, b.txt, c.txt, e.txt (not .hidden.txt)
			expect(files.map((f) => f.basename).sort()).toEqual(["a.txt", "b.txt", "c.txt", "e.txt"]);
		});

		test("respects dot option", async () => {
			const filesWithoutDot = await tempDir.glob("**/*", { dot: false });
			const filesWithDot = await tempDir.glob("**/*", { dot: true });
			expect(filesWithDot.length).toBeGreaterThan(filesWithoutDot.length);
			expect(filesWithDot.some((f) => f.basename.startsWith("."))).toBe(true);
			expect(filesWithoutDot.some((f) => f.basename.startsWith("."))).toBe(false);
		});

		test("respects onlyFiles option", async () => {
			const files = await tempDir.glob("**/*", { onlyFiles: true });
			expect(files.every(async (f) => await f.isFile())).toBeTruthy();
		});

		test("respects onlyDirectories option", async () => {
			const dirs = await tempDir.glob("**/*", { onlyDirectories: true });
			expect(dirs.every(async (d) => await d.isDirectory())).toBeTruthy();
		});
	});

	describe("globIter method", () => {
		test("yields all matching files", async () => {
			const files = [];
			for await (const file of await tempDir.globIter("**/*.txt")) {
				files.push(file);
			}
			expect(files).toHaveLength(4);
			expect(files.map((f) => f.basename).sort()).toEqual(["a.txt", "b.txt", "c.txt", "e.txt"]);
		});

		test("respects dot option", async () => {
			const filesWithoutDot = [];
			const filesWithDot = [];

			for await (const file of await tempDir.globIter("**/*", { dot: false })) {
				filesWithoutDot.push(file);
			}

			for await (const file of await tempDir.globIter("**/*", { dot: true })) {
				filesWithDot.push(file);
			}

			expect(filesWithDot.length).toBeGreaterThan(filesWithoutDot.length);
			expect(filesWithDot.some((f) => f.basename.startsWith("."))).toBe(true);
			expect(filesWithoutDot.some((f) => f.basename.startsWith("."))).toBe(false);
		});
	});

	describe("globSync method", () => {
		test("finds all files with single pattern", () => {
			const files = tempDir.globSync("*.txt");
			expect(files).toHaveLength(2);
			expect(files.map((f) => f.basename).sort()).toEqual(["a.txt", "b.txt"]);
		});

		test("finds files with multiple patterns", () => {
			const files = tempDir.globSync(["*.txt", "*.json"]);
			expect(files).toHaveLength(2);
			expect(files.map((f) => f.basename).sort()).toEqual(["a.txt", "b.txt"]);
		});

		test("finds files recursively", () => {
			const files = tempDir.globSync("**/*.txt");
			expect(files).toHaveLength(4);
			expect(files.map((f) => f.basename).sort()).toEqual(["a.txt", "b.txt", "c.txt", "e.txt"]);
		});

		test("respects glob options", () => {
			const filesWithoutDot = tempDir.globSync("**/*", { dot: false });
			const filesWithDot = tempDir.globSync("**/*", { dot: true });
			const onlyFiles = tempDir.globSync("**/*", { onlyFiles: true });
			const onlyDirs = tempDir.globSync("**/*", { onlyDirectories: true });

			expect(filesWithDot.length).toBeGreaterThan(filesWithoutDot.length);
			expect(filesWithDot.some((f) => f.basename.startsWith("."))).toBe(true);
			expect(filesWithoutDot.some((f) => f.basename.startsWith("."))).toBe(false);
			expect(onlyFiles.every((f) => f.isFileSync())).toBe(true);
			expect(onlyDirs.every((d) => d.isDirectorySync())).toBe(true);
		});
	});
});
