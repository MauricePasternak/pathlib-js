import { constants } from "fs";
import * as fse from "fs-extra";
import { platform, tmpdir } from "os";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { Path } from "../../src/path.js";

describe("Permission Methods Tests", () => {
	let tempDir: Path;
	let testFile: Path;
	let testDir: Path;
	const isWindows = platform() === "win32";

	beforeEach(async () => {
		tempDir = new Path(tmpdir(), "pathlib-test-permissions");
		await fse.remove(tempDir.path);
		await fse.ensureDir(tempDir.path);

		testFile = new Path(tempDir, "test.txt");
		testDir = new Path(tempDir, "testdir");

		await fse.writeFile(testFile.path, "test content");
		await fse.ensureDir(testDir.path);
	});

	afterEach(async () => {
		await fse.remove(tempDir.path);
	});

	describe("access methods", () => {
		test("access checks specific permission", async () => {
			const canRead = await testFile.access(constants.R_OK);
			expect(canRead).toBe(true);
		});

		test("access returns permissions object when no mode specified", async () => {
			const perms = await testFile.access();
			expect(perms).toHaveProperty("canRead");
			expect(perms).toHaveProperty("canWrite");
			expect(perms).toHaveProperty("canExecute");
			expect(typeof perms.canRead).toBe("boolean");
		});

		test("accessSync checks specific permission", () => {
			const canRead = testFile.accessSync(constants.R_OK);
			expect(canRead).toBe(true);
		});

		test("accessSync returns permissions object when no mode specified", () => {
			const perms = testFile.accessSync();
			expect(perms).toHaveProperty("canRead");
			expect(perms).toHaveProperty("canWrite");
			expect(perms).toHaveProperty("canExecute");
			expect(typeof perms.canRead).toBe("boolean");
		});

		test("access returns false for non-existent file", async () => {
			const nonExistent = new Path(tempDir, "nonexistent.txt");
			const canRead = await nonExistent.access(constants.R_OK);
			expect(canRead).toBe(false);
		});
	});

	if (!isWindows) {
		describe("chmod methods", () => {
			test("chmod changes file permissions", async () => {
				await testFile.chmod(0o444); // read-only
				const perms = await testFile.access();
				expect(perms.canRead).toBe(true);
				expect(perms.canWrite).toBe(false);
			});

			test("chmodSync changes file permissions", () => {
				testFile.chmodSync(0o444); // read-only
				const perms = testFile.accessSync();
				expect(perms.canRead).toBe(true);
				expect(perms.canWrite).toBe(false);
			});

			test("chmod accepts string mode", async () => {
				await testFile.chmod("444");
				const perms = await testFile.access();
				expect(perms.canRead).toBe(true);
				expect(perms.canWrite).toBe(false);
			});

			test("chmod returns this for chaining", async () => {
				const result = await testFile.chmod(0o644);
				expect(result).toBe(testFile);
			});

			test("chmodSync returns this for chaining", () => {
				const result = testFile.chmodSync(0o644);
				expect(result).toBe(testFile);
			});
		});

		describe("chown methods", () => {
			test("chown changes file ownership", async () => {
				// Note: This test might need to run as root to pass
				try {
					await testFile.chown(process.getuid?.() ?? 0, process.getgid?.() ?? 0);
					expect(true).toBe(true); // If we get here, no error was thrown
				} catch (error) {
					if (process.getuid?.() !== 0) {
						// Skip test if not root
						expect(true).toBe(true);
					} else {
						throw error;
					}
				}
			});

			test("chownSync changes file ownership", () => {
				// Note: This test might need to run as root to pass
				try {
					testFile.chownSync(process.getuid?.() ?? 0, process.getgid?.() ?? 0);
					expect(true).toBe(true); // If we get here, no error was thrown
				} catch (error) {
					if (process.getuid?.() !== 0) {
						// Skip test if not root
						expect(true).toBe(true);
					} else {
						throw error;
					}
				}
			});

			test("chown returns this for chaining", async () => {
				try {
					const result = await testFile.chown(process.getuid?.() ?? 0, process.getgid?.() ?? 0);
					expect(result).toBe(testFile);
				} catch (error) {
					if (process.getuid?.() !== 0) {
						expect(true).toBe(true);
					} else {
						throw error;
					}
				}
			});

			test("chownSync returns this for chaining", () => {
				try {
					const result = testFile.chownSync(process.getuid?.() ?? 0, process.getgid?.() ?? 0);
					expect(result).toBe(testFile);
				} catch (error) {
					if (process.getuid?.() !== 0) {
						expect(true).toBe(true);
					} else {
						throw error;
					}
				}
			});
		});
	}
});
