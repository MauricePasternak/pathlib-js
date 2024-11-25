import { tmpdir } from "os";
import { join } from "path";
import { Path } from "../../src/path.js";

describe("Path file descriptor operations", () => {
	const getTempPath = (suffix: string) => new Path(join(tmpdir(), `pathlib-test-${Date.now()}-${suffix}`));

	describe("open() and close()", () => {
		describe("open()", () => {
			it("opens file for reading", async () => {
				const file = getTempPath("read.txt");
				await file.writeFile("test content");

				try {
					const fd = await file.open({ flags: "r" });
					expect(fd).toBeGreaterThan(-1);
					expect(file.descriptor).toBe(fd);
					await file.close();
				} finally {
					await file.remove();
				}
			});

			it("opens file for writing", async () => {
				const file = getTempPath("write.txt");

				try {
					const fd = await file.open({ flags: "w" });
					expect(fd).toBeGreaterThan(-1);
					expect(file.descriptor).toBe(fd);
					await file.close();
				} finally {
					await file.remove();
				}
			});

			it("opens file for appending", async () => {
				const file = getTempPath("append.txt");

				try {
					const fd = await file.open({ flags: "a" });
					expect(fd).toBeGreaterThan(-1);
					expect(file.descriptor).toBe(fd);
					await file.close();
				} finally {
					await file.remove();
				}
			});

			it("ensures file exists when requested", async () => {
				const file = getTempPath("ensure.txt");
				expect(await file.exists()).toBe(false);

				try {
					const fd = await file.open({ flags: "r", ensureExists: true });
					expect(fd).toBeGreaterThan(-1);
					expect(await file.exists()).toBe(true);
					await file.close();
				} finally {
					await file.remove();
				}
			});

			it("respects file mode", async () => {
				const file = getTempPath("mode.txt");

				try {
					const fd = await file.open({ flags: "w", mode: 0o600 });
					expect(fd).toBeGreaterThan(-1);
					await file.close();

					const stats = await file.stat();
					expect(stats.mode & 0o777).toBe(0o600);
				} finally {
					await file.remove();
				}
			});

			it("throws when opening already opened file", async () => {
				const file = getTempPath("double-open.txt");

				try {
					await file.open({ flags: "w" });
					await expect(file.open({ flags: "w" })).rejects.toThrow("already open");
					await file.close();
				} finally {
					await file.remove();
				}
			});

			it("throws when opening directory", async () => {
				const dir = getTempPath("dir");
				await dir.makeDir();

				try {
					await expect(dir.open({ flags: "r" })).rejects.toThrow();
				} finally {
					await dir.remove();
				}
			});
		});

		describe("openSync()", () => {
			it("opens file for reading synchronously", () => {
				const file = getTempPath("read-sync.txt");
				file.writeFileSync("test content");

				try {
					const fd = file.openSync({ flags: "r" });
					expect(fd).toBeGreaterThan(-1);
					expect(file.descriptor).toBe(fd);
					file.closeSync();
				} finally {
					file.removeSync();
				}
			});

			it("opens file for writing synchronously", () => {
				const file = getTempPath("write-sync.txt");

				try {
					const fd = file.openSync({ flags: "w" });
					expect(fd).toBeGreaterThan(-1);
					expect(file.descriptor).toBe(fd);
					file.closeSync();
				} finally {
					file.removeSync();
				}
			});

			it("ensures file exists when requested synchronously", () => {
				const file = getTempPath("ensure-sync.txt");
				expect(file.existsSync()).toBe(false);

				try {
					const fd = file.openSync({ flags: "r", ensureExists: true });
					expect(fd).toBeGreaterThan(-1);
					expect(file.existsSync()).toBe(true);
					file.closeSync();
				} finally {
					file.removeSync();
				}
			});

			it("throws when opening already opened file synchronously", () => {
				const file = getTempPath("double-open-sync.txt");

				try {
					file.openSync({ flags: "w" });
					expect(() => file.openSync({ flags: "w" })).toThrow("already open");
					file.closeSync();
				} finally {
					file.removeSync();
				}
			});
		});

		describe("close()", () => {
			it("closes opened file", async () => {
				const file = getTempPath("close.txt");

				try {
					await file.open({ flags: "w" });
					expect(file.descriptor).not.toBeNull();

					await file.close();
					expect(file.descriptor).toBeNull();
				} finally {
					await file.remove();
				}
			});

			it("throws when closing non-opened file", async () => {
				const file = getTempPath("not-opened.txt");
				await expect(file.close()).rejects.toThrow("not been opened");
			});

			it("allows reopening after close", async () => {
				const file = getTempPath("reopen.txt");

				try {
					await file.open({ flags: "w" });
					await file.close();

					const fd = await file.open({ flags: "r" });
					expect(fd).toBeGreaterThan(-1);
					await file.close();
				} finally {
					await file.remove();
				}
			});
		});

		describe("closeSync()", () => {
			it("closes opened file synchronously", () => {
				const file = getTempPath("close-sync.txt");

				try {
					file.openSync({ flags: "w" });
					expect(file.descriptor).not.toBeNull();

					file.closeSync();
					expect(file.descriptor).toBeNull();
				} finally {
					file.removeSync();
				}
			});

			it("throws when closing non-opened file synchronously", () => {
				const file = getTempPath("not-opened-sync.txt");
				expect(() => file.closeSync()).toThrow("not been opened");
			});

			it("allows reopening after close synchronously", () => {
				const file = getTempPath("reopen-sync.txt");

				try {
					file.openSync({ flags: "w" });
					file.closeSync();

					const fd = file.openSync({ flags: "r" });
					expect(fd).toBeGreaterThan(-1);
					file.closeSync();
				} finally {
					file.removeSync();
				}
			});
		});

		describe("error handling", () => {
			it("handles errors on non-existent files", async () => {
				const file = getTempPath("nonexistent.txt");
				await expect(file.open({ flags: "r" })).rejects.toThrow();
			});

			it("handles errors on non-existent files synchronously", () => {
				const file = getTempPath("nonexistent-sync.txt");
				expect(() => file.openSync({ flags: "r" })).toThrow();
			});

			it("handles permission errors", async () => {
				const file = getTempPath("noperm.txt");
				await file.writeFile("test");
				await file.chmod(0o000);

				try {
					await expect(file.open({ flags: "r" })).rejects.toThrow();
				} finally {
					await file.chmod(0o666);
					await file.remove();
				}
			});
		});
	});
});
