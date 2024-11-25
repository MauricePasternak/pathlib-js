import * as fse from "fs-extra";
import { platform, tmpdir } from "os";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { Path } from "../../src/path.js";

describe("Make Methods Tests", () => {
	let tempDir: Path;
	const isWindows = platform() === "win32";

	beforeEach(async () => {
		tempDir = new Path(tmpdir(), "pathlib-test-make");
		await fse.remove(tempDir.path);
		await fse.ensureDir(tempDir.path);
	});

	afterEach(async () => {
		await fse.remove(tempDir.path);
	});

	describe("makeDir methods", () => {
		test("makeDir creates directory with default permissions", async () => {
			const newDir = new Path(tempDir, "newdir");
			await newDir.makeDir();
			expect(await newDir.exists()).toBe(true);
			expect(await newDir.isDirectory()).toBe(true);
		});

		test("makeDir creates nested directories", async () => {
			const nestedDir = new Path(tempDir, "deep/nested/dir");
			await nestedDir.makeDir();
			expect(await nestedDir.exists()).toBe(true);
			expect(await nestedDir.isDirectory()).toBe(true);
		});

		test("makeDir throws error for file-like paths", async () => {
			const filePath = new Path(tempDir, "file.txt");
			await expect(filePath.makeDir()).rejects.toThrow("Cannot use makeDir on a file-like type");
		});

		test("makeDirSync creates directory with default permissions", () => {
			const newDir = new Path(tempDir, "newdir");
			newDir.makeDirSync();
			expect(newDir.existsSync()).toBe(true);
			expect(newDir.isDirectorySync()).toBe(true);
		});

		test("makeDirSync creates nested directories", () => {
			const nestedDir = new Path(tempDir, "deep/nested/dir");
			nestedDir.makeDirSync();
			expect(nestedDir.existsSync()).toBe(true);
			expect(nestedDir.isDirectorySync()).toBe(true);
		});

		test("makeDirSync throws error for file-like paths", () => {
			const filePath = new Path(tempDir, "file.txt");
			expect(() => filePath.makeDirSync()).toThrow("Cannot use makeDir on a file-like type");
		});
	});

	describe("makeFile methods", () => {
		test("makeFile creates file and parent directories", async () => {
			const newFile = new Path(tempDir, "subdir/test.txt");
			await newFile.makeFile();
			expect(await newFile.exists()).toBe(true);
			expect(await newFile.isFile()).toBe(true);
		});

		test("makeFile throws error for directory-like paths", async () => {
			const dirPath = new Path(tempDir, "newdir");
			await expect(dirPath.makeFile()).rejects.toThrow("Cannot use makeFile on a directory-like type");
		});

		test("makeFileSync creates file and parent directories", () => {
			const newFile = new Path(tempDir, "subdir/test.txt");
			newFile.makeFileSync();
			expect(newFile.existsSync()).toBe(true);
			expect(newFile.isFileSync()).toBe(true);
		});

		test("makeFileSync throws error for directory-like paths", () => {
			const dirPath = new Path(tempDir, "newdir");
			expect(() => dirPath.makeFileSync()).toThrow("Cannot use makeFile on a directory-like type");
		});
	});

	describe("makeSymlink methods", () => {
		test("makeSymlink creates symlink to file", async () => {
			const sourceFile = new Path(tempDir, "source.txt");
			const linkFile = new Path(tempDir, "link.txt");

			await sourceFile.makeFile();
			await sourceFile.makeSymlink(linkFile);

			expect(await linkFile.exists()).toBe(true);
			expect(await linkFile.isSymbolicLink()).toBe(true);
		});

		test("makeSymlink creates symlink to directory", async () => {
			const sourceDir = new Path(tempDir, "sourcedir");
			const linkDir = new Path(tempDir, "linkdir");

			await sourceDir.makeDir();
			await sourceDir.makeSymlink(linkDir);

			expect(await linkDir.exists()).toBe(true);
			expect(await linkDir.isSymbolicLink()).toBe(true);
		});

		test("makeSymlink throws when source doesn't exist", async () => {
			const nonExistentSource = new Path(tempDir, "nonexistent");
			const link = new Path(tempDir, "link");

			await expect(nonExistentSource.makeSymlink(link)).rejects.toThrow(
				"The underlying source filepath does not exist"
			);
		});

		test("makeSymlinkSync creates symlink to file", () => {
			const sourceFile = new Path(tempDir, "source.txt");
			const linkFile = new Path(tempDir, "link.txt");

			sourceFile.makeFileSync();
			sourceFile.makeSymlinkSync(linkFile);

			expect(linkFile.existsSync()).toBe(true);
			expect(linkFile.isSymbolicLinkSync()).toBe(true);
		});

		test("makeSymlinkSync creates symlink to directory", () => {
			const sourceDir = new Path(tempDir, "sourcedir");
			const linkDir = new Path(tempDir, "linkdir");

			sourceDir.makeDirSync();
			sourceDir.makeSymlinkSync(linkDir);

			expect(linkDir.existsSync()).toBe(true);
			expect(linkDir.isSymbolicLinkSync()).toBe(true);
		});

		test("makeSymlinkSync throws when source doesn't exist", () => {
			const nonExistentSource = new Path(tempDir, "nonexistent");
			const link = new Path(tempDir, "link");

			expect(() => nonExistentSource.makeSymlinkSync(link)).toThrow("The underlying source filepath does not exist");
		});

		if (isWindows) {
			test("makeSymlink handles Windows-specific options", async () => {
				const sourceDir = new Path(tempDir, "sourcedir");
				const linkDir = new Path(tempDir, "linkdir");

				await sourceDir.makeDir();
				await sourceDir.makeSymlink(linkDir, { type: "dir" });

				expect(await linkDir.exists()).toBe(true);
				expect(await linkDir.isSymbolicLink()).toBe(true);
			});

			test("makeSymlinkSync handles Windows-specific options", () => {
				const sourceDir = new Path(tempDir, "sourcedir");
				const linkDir = new Path(tempDir, "linkdir");

				sourceDir.makeDirSync();
				sourceDir.makeSymlinkSync(linkDir, { type: "dir" });

				expect(linkDir.existsSync()).toBe(true);
				expect(linkDir.isSymbolicLinkSync()).toBe(true);
			});
		}
	});
});
