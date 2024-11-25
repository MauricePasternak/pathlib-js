import * as fse from "fs-extra";
import { platform, tmpdir } from "os";
import { beforeEach, describe, expect, test } from "vitest";
import { Path } from "../../src/path.js";

describe("Tree Methods Tests", () => {
	let tempDir: Path;
	const isWindows = platform() === "win32";

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
		tempDir = new Path(tmpdir(), "pathlib-test-tree");
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

	describe("tree method", () => {
		test("returns correct tree structure with Path objects", async () => {
			const tree = await tempDir.tree(false);

			expect(tree.filepath).toBeInstanceOf(Path);
			expect(tree.depth).toBe(0);
			expect(tree.children).toHaveLength(4); // a.txt, b.json, level1A, level1B

			// Find level1A directory and check its structure
			const level1A = tree.children?.find(
				(child) => child.filepath instanceof Path && child.filepath.basename === "level1A"
			);
			expect(level1A?.depth).toBe(1);
			expect(level1A?.children).toHaveLength(2); // c.txt and level2A
		});

		test("returns correct tree structure with string paths", async () => {
			const tree = await tempDir.tree(true);

			expect(typeof tree.filepath).toBe("string");
			expect(tree.depth).toBe(0);
			expect(tree.children).toHaveLength(4);

			// Verify paths are strings
			tree.children?.forEach((child) => {
				expect(typeof child.filepath).toBe("string");
			});
		});

		test("handles system-specific path delimiters", async () => {
			const tree = await tempDir.tree(true, true);
			const delimiter = isWindows ? "\\" : "/";

			expect(tree.filepath).toContain(delimiter);
			tree.children?.forEach((child) => {
				expect(child.filepath).toContain(delimiter);
			});
		});

		test("maintains correct depth values", async () => {
			const tree = await tempDir.tree();

			expect(tree.depth).toBe(0);
			tree.children?.forEach((level1) => {
				expect(level1.depth).toBe(1);
				level1.children?.forEach((level2) => {
					expect(level2.depth).toBe(2);
				});
			});
		});
	});

	describe("treeSync method", () => {
		test("returns correct tree structure with Path objects", () => {
			const tree = tempDir.treeSync(false);

			expect(tree.filepath).toBeInstanceOf(Path);
			expect(tree.depth).toBe(0);
			expect(tree.children).toHaveLength(4);

			// Find level1A directory and check its structure
			const level1A = tree.children?.find(
				(child) => child.filepath instanceof Path && child.filepath.basename === "level1A"
			);
			expect(level1A?.depth).toBe(1);
			expect(level1A?.children).toHaveLength(2);
		});

		test("returns correct tree structure with string paths", () => {
			const tree = tempDir.treeSync(true);

			expect(typeof tree.filepath).toBe("string");
			expect(tree.depth).toBe(0);
			expect(tree.children).toHaveLength(4);

			tree.children?.forEach((child) => {
				expect(typeof child.filepath).toBe("string");
			});
		});

		test("handles system-specific path delimiters", () => {
			const tree = tempDir.treeSync(true, true);
			const delimiter = isWindows ? "\\" : "/";

			expect(tree.filepath).toContain(delimiter);
			tree.children?.forEach((child) => {
				expect(child.filepath).toContain(delimiter);
			});
		});

		test("null children for files", () => {
			const tree = tempDir.treeSync(false);

			// Find a file node (e.g., a.txt)
			const fileNode = tree.children?.find(
				(child) => child.filepath instanceof Path && child.filepath.basename === "a.txt"
			);
			expect(fileNode?.children).toBeNull();
		});

		test("maintains correct structure for deep nesting", () => {
			const tree = tempDir.treeSync(false);

			// Navigate to level2A/d.txt
			const level1A = tree.children?.find(
				(child) => child.filepath instanceof Path && child.filepath.basename === "level1A"
			);
			const level2A = level1A?.children?.find(
				(child) => child.filepath instanceof Path && child.filepath.basename === "level2A"
			);
			const dTxt = level2A?.children?.find(
				(child) => child.filepath instanceof Path && child.filepath.basename === "d.txt"
			);

			expect(dTxt).toBeDefined();
			expect(dTxt?.depth).toBe(3);
			expect(dTxt?.children).toBeNull();
		});
	});
});
