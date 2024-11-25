import * as fse from "fs-extra";
import { platform, tmpdir } from "os";
import { beforeEach, describe, expect, test } from "vitest";
import { Path } from "../../src/path.js";

describe("Parent and Children Path Tests", () => {
	const isWindows = platform() === "win32";
	const root = isWindows ? "C:" : "";

	describe("parent() method", () => {
		test("returns immediate parent when no argument provided", () => {
			const path = new Path(`${root}/home/user/docs/file.txt`);
			expect(path.parent().path).toBe(`${root}/home/user/docs`);
		});

		test("returns same path when increment is 0 or negative", () => {
			const path = new Path(`${root}/home/user/docs/file.txt`);
			expect(path.parent(0).path).toBe(`${root}/home/user/docs/file.txt`);
			expect(path.parent(-1).path).toBe(`${root}/home/user/docs/file.txt`);
		});

		test("returns correct ancestor based on increment", () => {
			const path = new Path(`${root}/home/user/docs/file.txt`);
			expect(path.parent(1).path).toBe(`${root}/home/user/docs`);
			expect(path.parent(2).path).toBe(`${root}/home/user`);
			expect(path.parent(3).path).toBe(`${root}/home`);
		});

		test("returns root when increment exceeds path depth", () => {
			const path = new Path(`${root}/home/user/docs/file.txt`);
			expect(path.parent(10).path).toBe(isWindows ? "C:/" : "/");
		});
	});

	describe("parents() method", () => {
		test("returns array of all parents in order", () => {
			const path = new Path(`${root}/home/user/docs/file.txt`);
			const parents = path.parents();

			const expectedPaths = [`${root}/home/user/docs`, `${root}/home/user`, `${root}/home`, isWindows ? "C:/" : "/"];

			expect(parents.map((p) => p.path)).toEqual(expectedPaths);
		});

		test("returns empty array for root path", () => {
			const path = new Path(isWindows ? "C:/" : "/");
			expect(path.parents()).toHaveLength(0);
		});
	});

	describe("containsImmediateChild methods", () => {
		let tempDir: Path;
		let childFile: Path;
		let childDir: Path;

		beforeEach(async () => {
			// Setup test directory structure
			tempDir = new Path(tmpdir(), "pathlib-test-parent-child");
			childFile = new Path(tempDir.path, "test.txt");
			childDir = new Path(tempDir.path, "subdir");

			// Clean up and recreate test files
			await fse.remove(tempDir.path);
			await fse.ensureDir(tempDir.path);
			await fse.writeFile(childFile.path, "test content");
			await fse.ensureDir(childDir.path);
		});

		describe("containsImmediateChild (async)", () => {
			test("finds child using basename", async () => {
				const result = await tempDir.containsImmediateChild("test.txt");
				if (result) expect(result.path).toBe(childFile.path);
				else throw new Error("Child not found");
			});

			test("finds child using full path", async () => {
				const result = await tempDir.containsImmediateChild(childFile.path);
				if (result) expect(result.path).toBe(childFile.path);
				else throw new Error("Child not found");
			});

			test("finds child using Path instance", async () => {
				const result = await tempDir.containsImmediateChild(childFile);
				if (result) expect(result.path).toBe(childFile.path);
				else throw new Error("Child not found");
			});

			test("returns false for non-existent child", async () => {
				const result = await tempDir.containsImmediateChild("nonexistent.txt");
				expect(result).toBe(false);
			});

			test("returns false for non-existent child (Path instance)", async () => {
				const result = await tempDir.containsImmediateChild(new Path("nonexistent"));
				expect(result).toBe(false);
			});

			test("throws error when called on non-directory", async () => {
				await expect(childFile.containsImmediateChild("anything")).rejects.toThrow();
			});
		});

		describe("containsImmediateChildSync", () => {
			test("finds child using basename", () => {
				const result = tempDir.containsImmediateChildSync("test.txt");
				if (result) expect(result.path).toBe(childFile.path);
				else throw new Error("Child not found");
			});

			test("finds child using full path", () => {
				const result = tempDir.containsImmediateChildSync(childFile.path);
				if (result) expect(result.path).toBe(childFile.path);
				else throw new Error("Child not found");
			});

			test("finds child using Path instance", () => {
				const result = tempDir.containsImmediateChildSync(childFile);
				if (result) expect(result.path).toBe(childFile.path);
				else throw new Error("Child not found");
			});

			test("returns false for non-existent child", () => {
				const result = tempDir.containsImmediateChildSync("nonexistent.txt");
				expect(result).toBe(false);
			});

			test("returns false for non-existent child (Path instance)", () => {
				const result = tempDir.containsImmediateChildSync(new Path("nonexistent"));
				expect(result).toBe(false);
			});

			test("throws error when called on non-directory", () => {
				expect(() => childFile.containsImmediateChildSync("anything")).toThrow();
			});
		});
	});
});
