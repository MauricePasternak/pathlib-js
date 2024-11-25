import * as fse from "fs-extra";
import { tmpdir } from "os";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { Path } from "../../src/path.js";

describe("File Operations Tests", () => {
	let tempDir: Path;
	let sourceFile: Path;
	let sourceDir: Path;
	let nestedFile: Path;

	beforeEach(async () => {
		tempDir = new Path(tmpdir(), "pathlib-copy-move-remove-operations");
		await fse.remove(tempDir.path);
		await fse.ensureDir(tempDir.path);

		// Create test files and directories
		sourceFile = new Path(tempDir, "source.txt");
		sourceDir = new Path(tempDir, "sourcedir");
		nestedFile = new Path(sourceDir, "nested.txt");

		await fse.writeFile(sourceFile.path, "test content");
		await fse.ensureDir(sourceDir.path);
		await fse.writeFile(nestedFile.path, "nested content");
	});

	afterEach(async () => {
		await fse.remove(tempDir.path);
	});

	describe("move methods", () => {
		test("move file to new location", async () => {
			const destFile = new Path(tempDir, "moved.txt");
			const result = await sourceFile.move(destFile);

			expect(await sourceFile.exists()).toBe(false);
			expect(await destFile.exists()).toBe(true);
			expect(await destFile.readFile("utf8")).toBe("test content");
			expect(result).toEqual(destFile);
		});

		test("moveSync file to new location", () => {
			const destFile = new Path(tempDir, "moved.txt");
			const result = sourceFile.moveSync(destFile);

			expect(sourceFile.existsSync()).toBe(false);
			expect(destFile.existsSync()).toBe(true);
			expect(destFile.readFileSync("utf8")).toBe("test content");
			expect(result).toEqual(destFile);
		});

		test("move directory with contents", async () => {
			const destDir = new Path(tempDir, "moveddir");
			const movedNestedFile = new Path(destDir, "nested.txt");

			await sourceDir.move(destDir);

			expect(await sourceDir.exists()).toBe(false);
			expect(await destDir.exists()).toBe(true);
			expect(await movedNestedFile.exists()).toBe(true);
			expect(await movedNestedFile.readFile("utf8")).toBe("nested content");
		});

		test("move handles relative paths", async () => {
			const relativeDest = "./moved.txt";
			const destFile = new Path(tempDir, "moved.txt");
			const result = await sourceFile.move(relativeDest, { interpRelativeSource: "path" });
			expect(await sourceFile.exists()).toBe(false);
			expect(await destFile.exists()).toBe(true);
		});
	});

	describe("copy methods", () => {
		test("copy file to new location", async () => {
			const destFile = new Path(tempDir, "copied.txt");
			const result = await sourceFile.copy(destFile);

			expect(await sourceFile.exists()).toBe(true);
			expect(await destFile.exists()).toBe(true);
			expect(await destFile.readFile("utf8")).toBe("test content");
			expect(result).toEqual(destFile);
		});

		test("copySync file to new location", () => {
			const destFile = new Path(tempDir, "copied.txt");
			const result = sourceFile.copySync(destFile);

			expect(sourceFile.existsSync()).toBe(true);
			expect(destFile.existsSync()).toBe(true);
			expect(destFile.readFileSync("utf8")).toBe("test content");
			expect(result).toEqual(destFile);
		});

		test("copy directory with contents", async () => {
			const destDir = new Path(tempDir, "copieddir");
			const copiedNestedFile = new Path(destDir, "nested.txt");

			await sourceDir.copy(destDir);

			expect(await sourceDir.exists()).toBe(true);
			expect(await destDir.exists()).toBe(true);
			expect(await copiedNestedFile.exists()).toBe(true);
			expect(await copiedNestedFile.readFile("utf8")).toBe("nested content");
		});

		test("copy with overwrite option", async () => {
			const destFile = new Path(tempDir, "dest.txt");
			await fse.writeFile(destFile.path, "original content");

			await sourceFile.copy(destFile, { overwrite: true });
			expect(await destFile.readFile("utf8")).toBe("test content");
		});
	});

	describe("remove methods", () => {
		test("remove file", async () => {
			await sourceFile.remove();
			expect(await sourceFile.exists()).toBe(false);
		});

		test("removeSync file", () => {
			sourceFile.removeSync();
			expect(sourceFile.existsSync()).toBe(false);
		});

		test("remove directory with contents", async () => {
			await sourceDir.remove();
			expect(await sourceDir.exists()).toBe(false);
			expect(await nestedFile.exists()).toBe(false);
		});

		test("unlink alias works", async () => {
			await sourceFile.unlink();
			expect(await sourceFile.exists()).toBe(false);
		});

		test("unlinkSync alias works", () => {
			sourceFile.unlinkSync();
			expect(sourceFile.existsSync()).toBe(false);
		});

		test("delete alias works", async () => {
			await sourceFile.delete();
			expect(await sourceFile.exists()).toBe(false);
		});

		test("deleteSync alias works", () => {
			sourceFile.deleteSync();
			expect(sourceFile.existsSync()).toBe(false);
		});

		test("remove non-existent file doesn't throw", async () => {
			const nonExistent = new Path(tempDir, "nonexistent.txt");
			await expect(nonExistent.remove()).resolves.not.toThrow();
		});
	});
});
