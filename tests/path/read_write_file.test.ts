import { tmpdir } from "os";
import { join } from "path";
import { Path } from "../../src/path.js";

describe("Path file content operations", () => {
	const getTempPath = (suffix: string) => new Path(join(tmpdir(), `pathlib-test-${Date.now()}-${suffix}`));

	describe("readFile() and readFileSync()", () => {
		describe("readFile()", () => {
			it("reads file content as string with encoding", async () => {
				const file = getTempPath("read.txt");
				await file.writeFile("Hello, World!");

				try {
					const content = await file.readFile("utf8");
					expect(content).toBe("Hello, World!");
				} finally {
					await file.remove();
				}
			});

			it("reads file content as buffer without encoding", async () => {
				const file = getTempPath("read-buffer.txt");
				await file.writeFile("Hello, World!");

				try {
					const content = await file.readFile();
					expect(Buffer.isBuffer(content)).toBe(true);
					expect(content.toString()).toBe("Hello, World!");
				} finally {
					await file.remove();
				}
			});

			it("reads file with explicit options", async () => {
				const file = getTempPath("read-options.txt");
				await file.writeFile("Hello, World!");

				try {
					const content = await file.readFile({
						encoding: "utf8",
						flag: "r",
					});
					expect(content).toBe("Hello, World!");
				} finally {
					await file.remove();
				}
			});

			it("throws on non-existent file", async () => {
				const file = getTempPath("nonexistent.txt");
				await expect(file.readFile()).rejects.toThrow();
			});

			it("throws on directory", async () => {
				const dir = getTempPath("dir");
				await dir.makeDir();

				try {
					await expect(dir.readFile()).rejects.toThrow();
				} finally {
					await dir.remove();
				}
			});
		});

		describe("readFileSync()", () => {
			it("reads file content as string with encoding", () => {
				const file = getTempPath("read-sync.txt");
				file.writeFileSync("Hello, World!");

				try {
					const content = file.readFileSync("utf8");
					expect(content).toBe("Hello, World!");
				} finally {
					file.removeSync();
				}
			});

			it("reads file content as buffer without encoding", () => {
				const file = getTempPath("read-buffer-sync.txt");
				file.writeFileSync("Hello, World!");

				try {
					const content = file.readFileSync();
					expect(Buffer.isBuffer(content)).toBe(true);
					expect(content.toString()).toBe("Hello, World!");
				} finally {
					file.removeSync();
				}
			});

			it("throws on non-existent file", () => {
				const file = getTempPath("nonexistent.txt");
				expect(() => file.readFileSync()).toThrow();
			});
		});
	});

	describe("writeFile() and writeFileSync()", () => {
		describe("writeFile()", () => {
			it("writes string content", async () => {
				const file = getTempPath("write.txt");

				try {
					await file.writeFile("Hello, World!");
					const content = await file.readFile("utf8");
					expect(content).toBe("Hello, World!");
				} finally {
					await file.remove();
				}
			});

			it("writes buffer content", async () => {
				const file = getTempPath("write-buffer.txt");
				const buffer = Buffer.from("Hello, World!");

				try {
					await file.writeFile(buffer);
					const content = await file.readFile("utf8");
					expect(content).toBe("Hello, World!");
				} finally {
					await file.remove();
				}
			});

			it("writes with encoding option", async () => {
				const file = getTempPath("write-encoding.txt");

				try {
					await file.writeFile("Hello, World!", { encoding: "utf8" });
					const content = await file.readFile("utf8");
					expect(content).toBe("Hello, World!");
				} finally {
					await file.remove();
				}
			});

			it("writes with mode option", async () => {
				const file = getTempPath("write-mode.txt");

				try {
					await file.writeFile("Hello, World!", { mode: 0o600 });
					const stats = await file.stat();
					expect(stats.mode & 0o777).toBe(0o600);
				} finally {
					await file.remove();
				}
			});

			it("overwrites existing file", async () => {
				const file = getTempPath("overwrite.txt");

				try {
					await file.writeFile("Original");
					await file.writeFile("New Content");
					const content = await file.readFile("utf8");
					expect(content).toBe("New Content");
				} finally {
					await file.remove();
				}
			});

			it("creates parent directories", async () => {
				const file = getTempPath(join("nested", "deep", "write.txt"));

				try {
					await file.writeFile("Hello, World!");
					expect(await file.exists()).toBe(true);
					const content = await file.readFile("utf8");
					expect(content).toBe("Hello, World!");
				} finally {
					await file.parent().parent().remove();
				}
			});

			it("writes Uint8Array content", async () => {
				const file = getTempPath("write-uint8.txt");
				const data = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"

				try {
					await file.writeFile(data);
					const content = await file.readFile("utf8");
					expect(content).toBe("Hello");
				} finally {
					await file.remove();
				}
			});
		});

		describe("writeFileSync()", () => {
			it("writes string content synchronously", () => {
				const file = getTempPath("write-sync.txt");

				try {
					file.writeFileSync("Hello, World!");
					const content = file.readFileSync("utf8");
					expect(content).toBe("Hello, World!");
				} finally {
					file.removeSync();
				}
			});

			it("writes buffer content synchronously", () => {
				const file = getTempPath("write-buffer-sync.txt");
				const buffer = Buffer.from("Hello, World!");

				try {
					file.writeFileSync(buffer);
					const content = file.readFileSync("utf8");
					expect(content).toBe("Hello, World!");
				} finally {
					file.removeSync();
				}
			});

			it("creates parent directories synchronously", () => {
				const file = getTempPath(join("nested", "deep", "write-sync.txt"));

				try {
					file.writeFileSync("Hello, World!");
					expect(file.existsSync()).toBe(true);
					const content = file.readFileSync("utf8");
					expect(content).toBe("Hello, World!");
				} finally {
					file.parent().parent().removeSync();
				}
			});
		});

		describe("error handling", () => {
			it("handles write to read-only file", async () => {
				const file = getTempPath("readonly.txt");
				await file.writeFile("test");
				await file.chmod(0o444);

				try {
					await expect(file.writeFile("new content")).rejects.toThrow();
				} finally {
					await file.chmod(0o666);
					await file.remove();
				}
			});

			it("handles write to read-only directory", async () => {
				const dir = getTempPath("readonly-dir");
				await dir.makeDir();
				await dir.chmod(0o444);

				try {
					const file = new Path(dir.path, "file.txt");
					await expect(file.writeFile("test")).rejects.toThrow();
				} finally {
					await dir.chmod(0o777);
					await dir.remove();
				}
			});
		});

		describe("encoding handling", () => {
			it("handles various encodings", async () => {
				const file = getTempPath("encoding.txt");
				const text = "Hello, 世界";

				try {
					// Write with different encodings
					await file.writeFile(text, { encoding: "utf16le" });
					const content = await file.readFile({ encoding: "utf16le" });
					expect(content).toBe(text);
				} finally {
					await file.remove();
				}
			});
		});
	});
});
