import * as fse from "fs-extra";
import { tmpdir } from "os";
import { beforeEach, describe, expect, test } from "vitest";
import { Path } from "../../src/path.js";

describe("Path Type Tests", () => {
	let tempDir: Path;
	let tempFile: Path;
	let tempSymlink: Path;

	beforeEach(async () => {
		// Create fresh temp paths for each test
		tempDir = new Path(tmpdir(), "pathlib-test-dir");
		tempFile = new Path(tmpdir(), "pathlib-test-file.txt");
		tempSymlink = new Path(tmpdir(), "pathlib-test-symlink");

		// Clean up any existing test files
		await fse.remove(tempDir.path);
		await fse.remove(tempFile.path);
		await fse.remove(tempSymlink.path);

		// Create fresh test files
		await fse.ensureDir(tempDir.path);
		await fse.writeFile(tempFile.path, "test content");
		await fse.symlink(tempFile.path, tempSymlink.path);
	});

	describe("stat methods", () => {
		test("stat() returns stats object", async () => {
			const stats = await tempFile.stat();
			expect(stats).toBeDefined();
			expect(stats.isFile()).toBe(true);
		});

		test("statSync() returns stats object", () => {
			const stats = tempFile.statSync();
			expect(stats).toBeDefined();
			expect(stats.isFile()).toBe(true);
		});
	});

	describe("exists methods", () => {
		test("exists() returns true for existing paths", async () => {
			expect(await tempDir.exists()).toBe(true);
			expect(await tempFile.exists()).toBe(true);
			expect(await tempSymlink.exists()).toBe(true);
		});

		test("exists() returns false for non-existing paths", async () => {
			const nonExistent = new Path(tmpdir(), "non-existent");
			expect(await nonExistent.exists()).toBe(false);
		});

		test("existsSync() returns true for existing paths", () => {
			expect(tempDir.existsSync()).toBe(true);
			expect(tempFile.existsSync()).toBe(true);
			expect(tempSymlink.existsSync()).toBe(true);
		});

		test("existsSync() returns false for non-existing paths", () => {
			const nonExistent = new Path(tmpdir(), "non-existent");
			expect(nonExistent.existsSync()).toBe(false);
		});
	});

	describe("isDirectory methods", () => {
		test("isDirectory() correctly identifies directories", async () => {
			expect(await tempDir.isDirectory()).toBe(true);
			expect(await tempFile.isDirectory()).toBe(false);
		});

		test("isDirectorySync() correctly identifies directories", () => {
			expect(tempDir.isDirectorySync()).toBe(true);
			expect(tempFile.isDirectorySync()).toBe(false);
		});
	});

	describe("isFile methods", () => {
		test("isFile() correctly identifies files", async () => {
			expect(await tempFile.isFile()).toBe(true);
			expect(await tempDir.isFile()).toBe(false);
		});

		test("isFileSync() correctly identifies files", () => {
			expect(tempFile.isFileSync()).toBe(true);
			expect(tempDir.isFileSync()).toBe(false);
		});
	});

	describe("isSymbolicLink methods", () => {
		test("isSymbolicLink() correctly identifies symlinks", async () => {
			expect(await tempSymlink.isSymbolicLink()).toBe(true);
			expect(await tempFile.isSymbolicLink()).toBe(false);
		});

		test("isSymbolicLinkSync() correctly identifies symlinks", () => {
			expect(tempSymlink.isSymbolicLinkSync()).toBe(true);
			expect(tempFile.isSymbolicLinkSync()).toBe(false);
		});
	});

	describe("isFIFO methods", () => {
		test("isFIFO() returns false for non-FIFO files", async () => {
			expect(await tempFile.isFIFO()).toBe(false);
			expect(await tempDir.isFIFO()).toBe(false);
		});

		test("isFIFOSync() returns false for non-FIFO files", () => {
			expect(tempFile.isFIFOSync()).toBe(false);
			expect(tempDir.isFIFOSync()).toBe(false);
		});
	});

	describe("isSocket methods", () => {
		test("isSocket() returns false for non-socket files", async () => {
			expect(await tempFile.isSocket()).toBe(false);
			expect(await tempDir.isSocket()).toBe(false);
		});

		test("isSocketSync() returns false for non-socket files", () => {
			expect(tempFile.isSocketSync()).toBe(false);
			expect(tempDir.isSocketSync()).toBe(false);
		});
	});

	describe("error handling", () => {
		test("methods handle non-existent paths", async () => {
			const nonExistent = new Path(tmpdir(), "non-existent");
			expect(await nonExistent.isFile()).toBe(false);
			expect(await nonExistent.isDirectory()).toBe(false);
			expect(await nonExistent.isSymbolicLink()).toBe(false);
			expect(await nonExistent.isFIFO()).toBe(false);
			expect(await nonExistent.isSocket()).toBe(false);
		});

		test("sync methods handle non-existent paths", () => {
			const nonExistent = new Path(tmpdir(), "non-existent");
			expect(nonExistent.isFileSync()).toBe(false);
			expect(nonExistent.isDirectorySync()).toBe(false);
			expect(nonExistent.isSymbolicLinkSync()).toBe(false);
			expect(nonExistent.isFIFOSync()).toBe(false);
			expect(nonExistent.isSocketSync()).toBe(false);
		});
	});
});
