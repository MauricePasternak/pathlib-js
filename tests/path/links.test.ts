import * as fse from "fs-extra";
import { platform, tmpdir } from "os";
import { join } from "path";
import { Path } from "../../src/path.js";

describe("Path symlink operations", () => {
	// Helper to create unique temp paths for each test
	const getTempPath = (suffix: string) => new Path(join(tmpdir(), `pathlib-test-${Date.now()}-${suffix}`));

	const isWindows = platform() === "win32";

	// Tests for Path.resolve()
	describe("resolve()", () => {
		it("resolves absolute paths", () => {
			const path = new Path("/home/user");
			const resolved = path.resolve("/etc/config");
			expect(resolved.path).toBe("/etc/config");
		});

		it("resolves relative paths", () => {
			const path = new Path("/home/user/docs");
			const resolved = path.resolve("../downloads/file.txt");
			expect(resolved.path).toBe("/home/user/downloads/file.txt");
		});

		it("resolves multiple path segments", () => {
			const path = new Path("/home/user");
			const resolved = path.resolve("docs", "project", "../files", "./data.txt");
			expect(resolved.path).toBe("/home/user/docs/files/data.txt");
		});

		it("resolves dot paths", () => {
			const path = new Path("/home/user/docs");
			expect(path.resolve(".").path).toBe("/home/user/docs");
			expect(path.resolve("./file.txt").path).toBe("/home/user/docs/file.txt");
		});

		it("resolves parent directory paths", () => {
			const path = new Path("/home/user/docs");
			expect(path.resolve("..").path).toBe("/home/user");
			expect(path.resolve("../files").path).toBe("/home/user/files");
		});

		it("handles empty segments", () => {
			const path = new Path("/home/user");
			expect(path.resolve("").path).toBe("/home/user");
		});

		it("handles relative paths with cwd interpretation", () => {
			// Change the current working directory to the temp directory
			const originalCwd = process.cwd();
			const tempDir = getTempPath("cwd-test");
			tempDir.makeDirSync();

			// Change the current working directory to the temp directory
			// and verify that the relative path is interpreted correctly
			process.chdir(tempDir.path);
			expect(new Path(".").resolve("test").path).toBe(join(tempDir.path, "test"));

			// Restore the original current working directory
			// and verify that the relative path is interpreted correctly
			process.chdir(originalCwd);
			expect(new Path(".").resolve("test").path).toBe(join(originalCwd, "test"));

			// Clean up the temp directory
			tempDir.removeSync();
		});
	});

	// Tests for Path.makeSymlink() and Path.makeSymlinkSync()
	describe("makeSymlink() and makeSymlinkSync()", () => {
		let tempDir: Path;
		let targetFile: Path;
		let targetDir: Path;

		beforeEach(async () => {
			tempDir = getTempPath("symlink-test");
			targetFile = new Path(tempDir.path, "target-file.txt");
			targetDir = new Path(tempDir.path, "target-dir");

			await tempDir.makeDir();
			await targetFile.writeFile("test content");
			await targetDir.makeDir();
		});

		afterEach(async () => {
			await tempDir.remove();
		});

		describe("makeSymlink()", () => {
			it("creates file symlink with target as link", async () => {
				const link = new Path(tempDir.path, "file-link");
				await targetFile.makeSymlink(link);

				expect(await link.exists()).toBe(true);
				expect(await link.isSymbolicLink()).toBe(true);
				expect((await link.readLink()).path).toBe(targetFile.path);
			});

			it("creates directory symlink with target as link", async () => {
				const link = new Path(tempDir.path, "dir-link");
				await targetDir.makeSymlink(link);

				expect(await link.exists()).toBe(true);
				expect(await link.isSymbolicLink()).toBe(true);
				expect((await link.readLink()).path).toBe(targetDir.path);
			});

			it("creates symlink with link as source", async () => {
				const link = new Path(tempDir.path, "reverse-link");
				await link.makeSymlink(targetFile, { targetIsLink: false });

				expect(await link.exists()).toBe(true);
				expect(await link.isSymbolicLink()).toBe(true);
				expect((await link.readLink()).path).toBe(targetFile.path);
			});

			it("throws when source doesn't exist", async () => {
				const nonExistent = new Path(tempDir.path, "non-existent");
				const link = new Path(tempDir.path, "link");

				await expect(nonExistent.makeSymlink(link)).rejects.toThrow("source does not exist");
			});

			if (isWindows) {
				it("handles Windows-specific type inference", async () => {
					const fileLink = new Path(tempDir.path, "file-link");
					const dirLink = new Path(tempDir.path, "dir-link");

					await targetFile.makeSymlink(fileLink);
					await targetDir.makeSymlink(dirLink);

					expect(await fileLink.isFile()).toBe(true);
					expect(await dirLink.isDirectory()).toBe(true);
				});

				it("respects explicit Windows type option", async () => {
					const link = new Path(tempDir.path, "typed-link");
					await targetFile.makeSymlink(link, { type: "file" });
					expect(await link.isFile()).toBe(true);
				});
			}
		});

		describe("makeSymlinkSync()", () => {
			it("creates file symlink with target as link", () => {
				const link = new Path(tempDir.path, "file-link");
				targetFile.makeSymlinkSync(link);

				expect(link.existsSync()).toBe(true);
				expect(link.isSymbolicLinkSync()).toBe(true);
				expect(link.readLinkSync().path).toBe(targetFile.path);
			});

			it("creates directory symlink with target as link", () => {
				const link = new Path(tempDir.path, "dir-link");
				targetDir.makeSymlinkSync(link);

				expect(link.existsSync()).toBe(true);
				expect(link.isSymbolicLinkSync()).toBe(true);
				expect(link.readLinkSync().path).toBe(targetDir.path);
			});

			it("creates symlink with link as source", () => {
				const link = new Path(tempDir.path, "reverse-link");
				link.makeSymlinkSync(targetFile, { targetIsLink: false });

				expect(link.existsSync()).toBe(true);
				expect(link.isSymbolicLinkSync()).toBe(true);
				expect(link.readLinkSync().path).toBe(targetFile.path);
			});

			it("throws when source doesn't exist", () => {
				const nonExistent = new Path(tempDir.path, "non-existent");
				const link = new Path(tempDir.path, "link");

				expect(() => nonExistent.makeSymlinkSync(link)).toThrow("source does not exist");
			});

			if (isWindows) {
				it("handles Windows-specific type inference sync", () => {
					const fileLink = new Path(tempDir.path, "file-link");
					const dirLink = new Path(tempDir.path, "dir-link");

					targetFile.makeSymlinkSync(fileLink);
					targetDir.makeSymlinkSync(dirLink);

					expect(fileLink.isFileSync()).toBe(true);
					expect(dirLink.isDirectorySync()).toBe(true);
				});

				it("respects explicit Windows type option sync", () => {
					const link = new Path(tempDir.path, "typed-link");
					targetFile.makeSymlinkSync(link, { type: "file" });
					expect(link.isFileSync()).toBe(true);
				});
			}
		});

		describe("relative path handling", () => {
			it("handles relative paths with cwd interpretation", async () => {
				const link = new Path("relative-link");
				await targetFile.makeSymlink(link);

				expect(await link.exists()).toBe(true);
				expect(await link.isSymbolicLink()).toBe(true);
				await link.remove();
			});

			it("handles relative paths with path interpretation", async () => {
				const relativeTarget = new Path("./target");
				const link = new Path(tempDir.path, "link");

				await targetFile.makeSymlink(link, {
					interpRelativeSource: "path",
				});

				expect(await link.exists()).toBe(true);
				expect(await link.isSymbolicLink()).toBe(true);
			});
		});

		describe("edge cases", () => {
			it("handles nested symlinks", async () => {
				const link1 = new Path(tempDir.path, "link1");
				const link2 = new Path(tempDir.path, "link2");

				await targetFile.makeSymlink(link1);
				await link1.makeSymlink(link2);

				expect(await link2.exists()).toBe(true);
				expect(await link2.isSymbolicLink()).toBe(true);
			});

			it("handles existing parent directories", async () => {
				const subDir = new Path(tempDir.path, "sub");
				await subDir.makeDir();

				const link = new Path(subDir.path, "link");
				await targetFile.makeSymlink(link);

				expect(await link.exists()).toBe(true);
				expect(await link.isSymbolicLink()).toBe(true);
			});

			it("creates parent directories as needed", async () => {
				const deepLink = new Path(tempDir.path, "deep", "nested", "link");
				await targetFile.makeSymlink(deepLink);

				expect(await deepLink.exists()).toBe(true);
				expect(await deepLink.isSymbolicLink()).toBe(true);
			});
		});
	});

	// Tests for Path.readLink() and Path.readLinkSync()
	describe("readLink() and readLinkSync()", () => {
		let tempDir: Path;
		let targetFile: Path;
		let targetDir: Path;
		let fileLink: Path;
		let dirLink: Path;

		beforeEach(async () => {
			// Setup test directory structure
			tempDir = getTempPath("symlink-test");
			targetFile = new Path(tempDir.path, "target-file.txt");
			targetDir = new Path(tempDir.path, "target-dir");
			fileLink = new Path(tempDir.path, "file-link");
			dirLink = new Path(tempDir.path, "dir-link");

			// Create the test directory structure
			await tempDir.makeDir();
			await targetFile.writeFile("test content");
			await targetDir.makeDir();
			await fse.symlink(targetFile.path, fileLink.path);
			await fse.symlink(targetDir.path, dirLink.path);
		});

		afterEach(async () => {
			await tempDir.remove();
		});

		describe("readLink()", () => {
			it("reads file symlink target", async () => {
				const result = await fileLink.readLink();
				expect(result.path).toBe(targetFile.path);
			});

			it("reads directory symlink target", async () => {
				const result = await dirLink.readLink();
				expect(result.path).toBe(targetDir.path);
			});

			it("throws on non-symlink file", async () => {
				await expect(targetFile.readLink()).rejects.toThrow("The underlying path not a symlink");
			});

			it("throws on non-symlink directory", async () => {
				await expect(targetDir.readLink()).rejects.toThrow("The underlying path not a symlink");
			});

			it("throws on non-existent path", async () => {
				const nonExistent = new Path(tempDir.path, "non-existent");
				await expect(nonExistent.readLink()).rejects.toThrow("The underlying path not a symlink");
			});
		});

		describe("readLinkSync()", () => {
			it("reads file symlink target", () => {
				const result = fileLink.readLinkSync();
				expect(result.path).toBe(targetFile.path);
			});

			it("reads directory symlink target", () => {
				const result = dirLink.readLinkSync();
				expect(result.path).toBe(targetDir.path);
			});

			it("throws on non-symlink file", () => {
				expect(() => targetFile.readLinkSync()).toThrow("The underlying path not a symlink");
			});

			it("throws on non-symlink directory", () => {
				expect(() => targetDir.readLinkSync()).toThrow("The underlying path not a symlink");
			});

			it("throws on non-existent path", () => {
				const nonExistent = new Path(tempDir.path, "non-existent");
				expect(() => nonExistent.readLinkSync()).toThrow("The underlying path not a symlink");
			});
		});

		describe("symlink edge cases", () => {
			it("handles broken symlinks", async () => {
				const brokenLink = new Path(tempDir.path, "broken-link");
				const nonExistentTarget = new Path(tempDir.path, "non-existent-target");

				await fse.symlink(nonExistentTarget.path, brokenLink.path);

				const asyncResult = await brokenLink.readLink();
				expect(asyncResult.path).toBe(nonExistentTarget.path);

				const syncResult = brokenLink.readLinkSync();
				expect(syncResult.path).toBe(nonExistentTarget.path);
			});

			it("handles relative symlinks", async () => {
				const relativeLink = new Path(tempDir.path, "relative-link");
				await fse.symlink("./target-file.txt", relativeLink.path);

				const asyncResult = await relativeLink.readLink();
				expect(asyncResult.basename).toBe("target-file.txt");

				const syncResult = relativeLink.readLinkSync();
				expect(syncResult.basename).toBe("target-file.txt");
			});

			it("handles nested symlinks", async () => {
				const nestedLink = new Path(tempDir.path, "nested-link");
				await fse.symlink(fileLink.path, nestedLink.path);

				const asyncResult = await nestedLink.readLink();
				expect(asyncResult.path).toBe(fileLink.path);

				const syncResult = nestedLink.readLinkSync();
				expect(syncResult.path).toBe(fileLink.path);
			});
		});
	});
});
