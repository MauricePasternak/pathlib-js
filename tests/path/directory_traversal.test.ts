import * as fse from "fs-extra";
import { tmpdir } from "os";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Path } from "../../src/path.js";

describe("Directory Traversal Methods Tests", () => {
	let tempDir: Path;

	// Test directory structure:
	// tempDir/
	// ├── a.txt
	// ├── b.json
	// ├── level1A/
	// │   ├── c.txt
	// │   └── level2A/
	// │       └── d.txt
	// └── level1B/
	//     └── e.txt

	beforeEach(async () => {
		// Setup test directory structure
		tempDir = new Path(tmpdir(), "pathlib-test-traversal");
		await fse.remove(tempDir.path);
		await fse.ensureDir(tempDir.path);

		// Create test files and directories
		await fse.writeFile(tempDir.joinPath("a.txt").path, "a");
		await fse.writeFile(tempDir.joinPath("b.json").path, "{}");

		await fse.ensureDir(tempDir.joinPath("level1A").path);
		await fse.writeFile(tempDir.joinPath("level1A", "c.txt").path, "c");

		await fse.ensureDir(tempDir.joinPath("level1A", "level2A").path);
		await fse.writeFile(tempDir.joinPath("level1A", "level2A", "d.txt").path, "d");

		await fse.ensureDir(tempDir.joinPath("level1B").path);
		await fse.writeFile(tempDir.joinPath("level1B", "e.txt").path, "e");
	});

	describe("readDir methods", () => {
		test("readDir returns all immediate children", async () => {
			const children = await tempDir.readDir();
			expect(children).toHaveLength(4);
			expect(children.map((p) => p.basename).sort()).toEqual(["a.txt", "b.json", "level1A", "level1B"]);
		});

		test("readDirSync returns all immediate children", () => {
			const children = tempDir.readDirSync();
			expect(children).toHaveLength(4);
			expect(children.map((p) => p.basename).sort()).toEqual(["a.txt", "b.json", "level1A", "level1B"]);
		});

		test("readDirIter yields all immediate children", async () => {
			const children = [];
			for await (const child of tempDir.readDirIter()) {
				children.push(child);
			}
			expect(children).toHaveLength(4);
			expect(children.map((p) => p.basename).sort()).toEqual(["a.txt", "b.json", "level1A", "level1B"]);
		});

		test("readDirIterSync yields all immediate children", () => {
			const children = [];
			for (const child of tempDir.readDirIterSync()) {
				children.push(child);
			}
			expect(children).toHaveLength(4);
			expect(children.map((p) => p.basename).sort()).toEqual(["a.txt", "b.json", "level1A", "level1B"]);
		});
	});

	describe("getPathsNLevelsAway", () => {
		test("gets paths one level down", async () => {
			const paths = await tempDir.getPathsNLevelsAway(1);
			const pathsList = [];
			for await (const path of paths) {
				pathsList.push(path);
			}
			expect(pathsList).toHaveLength(4);
			expect(pathsList.map((p) => p.basename).sort()).toEqual(["a.txt", "b.json", "level1A", "level1B"]);
		});

		test("gets paths two levels down", async () => {
			const paths = await tempDir.getPathsNLevelsAway(2);
			const pathsList = [];
			for await (const path of paths) {
				pathsList.push(path);
			}
			expect(pathsList).toHaveLength(3);
			expect(pathsList.map((p) => p.basename).sort()).toEqual(["c.txt", "e.txt", "level2A"]);
		});

		test("gets paths as iterator", async () => {
			const iterator = await tempDir.getPathsNLevelsAway(1, true);
			const paths = [];
			for await (const path of iterator) {
				paths.push(path);
			}
			expect(paths).toHaveLength(4);
		});

		test("throws error when getting children of non-directory", async () => {
			const file = tempDir.joinPath("a.txt");
			await expect(file.getPathsNLevelsAway(1)).rejects.toThrow();
			await expect(file.getPathsNLevelsAway(2, true)).rejects.toThrow();
		});

		test("gets parent level paths", async () => {
			const deepFile = tempDir.joinPath("level1A", "level2A", "d.txt");
			const paths = await deepFile.getPathsNLevelsAway(-2);
			const pathsList = [];
			for await (const path of paths) {
				pathsList.push(path);
			}
			expect(pathsList).toHaveLength(4);
			expect(pathsList.map((p) => p.basename).sort()).toEqual(["a.txt", "b.json", "level1A", "level1B"]);
		});

		test("gets paths one level down as iterator", async () => {
			const iterator = await tempDir.getPathsNLevelsAway(1, true);
			const paths = [];
			for await (const path of iterator) {
				paths.push(path);
			}
			expect(paths).toHaveLength(4);
			expect(paths.map((p) => p.basename).sort()).toEqual(["a.txt", "b.json", "level1A", "level1B"]);
		});
	});

	describe("walk methods", () => {
		test("walk visits all files and directories", async () => {
			const visited = new Set<string>();
			await tempDir.walk((path) => {
				visited.add(path.basename);
			});

			expect(visited.size).toBe(8);
			expect([...visited].sort()).toEqual([
				"a.txt",
				"b.json",
				"c.txt",
				"d.txt",
				"e.txt",
				"level1A",
				"level1B",
				"level2A",
			]);
		});

		test("walkSync visits all files and directories", () => {
			const visited = new Set<string>();
			tempDir.walkSync((path) => {
				visited.add(path.basename);
			});

			expect(visited.size).toBe(8);
			expect([...visited].sort()).toEqual([
				"a.txt",
				"b.json",
				"c.txt",
				"d.txt",
				"e.txt",
				"level1A",
				"level1B",
				"level2A",
			]);
		});

		test("walk callback receives Path instances", async () => {
			const callback = vi.fn();
			await tempDir.walk(callback);
			expect(callback).toHaveBeenCalled();
			expect(callback.mock.calls[0][0]).toBeInstanceOf(Path);
		});

		test("walkSync callback receives Path instances", () => {
			const callback = vi.fn();
			tempDir.walkSync(callback);
			expect(callback).toHaveBeenCalled();
			expect(callback.mock.calls[0][0]).toBeInstanceOf(Path);
		});

		test("walk without callback doesn't throw", async () => {
			await expect(tempDir.walk()).resolves.not.toThrow();
		});

		test("walkSync without callback doesn't throw", () => {
			expect(() => tempDir.walkSync()).not.toThrow();
		});

		test("walk visits directories before their contents", async () => {
			const visited: string[] = [];
			await tempDir.walk((path) => {
				visited.push(path.basename);
			});

			const level1AIndex = visited.indexOf("level1A");
			const level2AIndex = visited.indexOf("level2A");
			const dTxtIndex = visited.indexOf("d.txt");

			expect(level1AIndex).toBeLessThan(level2AIndex);
			expect(level2AIndex).toBeLessThan(dTxtIndex);
		});

		test("walkSync visits directories before their contents", () => {
			const visited: string[] = [];
			tempDir.walkSync((path) => {
				visited.push(path.basename);
			});

			const level1AIndex = visited.indexOf("level1A");
			const level2AIndex = visited.indexOf("level2A");
			const dTxtIndex = visited.indexOf("d.txt");

			expect(level1AIndex).toBeLessThan(level2AIndex);
			expect(level2AIndex).toBeLessThan(dTxtIndex);
		});
	});
});
