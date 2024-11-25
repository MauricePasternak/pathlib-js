import { tmpdir } from "os";
import { join } from "path";
import { Path } from "../../src/path.js";

describe("Path read/write operations", () => {
	const getTempPath = (suffix: string) => new Path(join(tmpdir(), `pathlib-test-${Date.now()}-${suffix}`));

	describe("read() and readSync()", () => {
		let testFile: Path;
		const testContent = "Hello, World!";

		beforeEach(async () => {
			testFile = getTempPath("read-test.txt");
			await testFile.writeFile(testContent);
		});

		afterEach(async () => {
			await testFile.remove();
		});

		describe("read()", () => {
			it("reads entire file content", async () => {
				const buffer = Buffer.alloc(testContent.length);
				const result = await testFile.read(buffer, 0, buffer.length, null);

				expect(result.bytesRead).toBe(testContent.length);
				expect(buffer.toString()).toBe(testContent);
				expect(result.fileDescriptor).toBeNull(); // File should be closed
			});

			it("reads partial content with offset", async () => {
				const buffer = Buffer.alloc(5);
				const result = await testFile.read(buffer, 0, buffer.length, 7);

				expect(result.bytesRead).toBe(5);
				expect(buffer.toString()).toBe("World");
			});

			it("reads with buffer offset", async () => {
				const buffer = Buffer.alloc(10);
				const result = await testFile.read(buffer, 2, 5, 0);

				expect(result.bytesRead).toBe(5);
				expect(buffer.toString("utf8", 2, 7)).toBe("Hello");
			});

			it("keeps file open when requested", async () => {
				const buffer = Buffer.alloc(testContent.length);
				const result = await testFile.read(
					buffer,
					0,
					buffer.length,
					null,
					false, // don't close
					{ flags: "r" }
				);

				expect(result.fileDescriptor).not.toBeNull();
				await testFile.close(); // Clean up
			});

			it("handles reading beyond file size", async () => {
				const buffer = Buffer.alloc(1000);
				const result = await testFile.read(buffer, 0, buffer.length, 0);

				expect(result.bytesRead).toBe(testContent.length);
				expect(buffer.toString("utf8", 0, testContent.length).trim()).toBe(testContent);
			});

			it("on an invalid position, readings only a buffer of 0s is returned", async () => {
				const buffer = Buffer.alloc(5);
				const result = await testFile.read(buffer, 0, 5, 9999);

				expect(result.bytesRead).toBe(0);
				expect(buffer.toString()).toBe("\0\0\0\0\0");
			});
		});

		describe("readSync()", () => {
			it("reads entire file content synchronously", () => {
				const buffer = Buffer.alloc(testContent.length);
				const result = testFile.readSync(buffer, 0, buffer.length, null);

				expect(result.bytesRead).toBe(testContent.length);
				expect(buffer.toString()).toBe(testContent);
				expect(result.fileDescriptor).toBeNull();
			});

			it("reads partial content with offset synchronously", () => {
				const buffer = Buffer.alloc(5);
				const result = testFile.readSync(buffer, 0, buffer.length, 7);

				expect(result.bytesRead).toBe(5);
				expect(buffer.toString()).toBe("World");
			});

			it("keeps file open when requested synchronously", () => {
				const buffer = Buffer.alloc(testContent.length);
				const result = testFile.readSync(
					buffer,
					0,
					buffer.length,
					null,
					false, // don't close
					{ flags: "r" }
				);

				expect(result.fileDescriptor).not.toBeNull();
				testFile.closeSync(); // Clean up
			});
		});
	});

	describe("write() and writeSync()", () => {
		describe("write()", () => {
			it("writes entire buffer to file", async () => {
				const file = getTempPath("write-test.txt");
				const content = "Hello, World!";
				const buffer = Buffer.from(content);

				try {
					const result = await file.write(buffer, 0, buffer.length, null);
					expect(result.bytesWritten).toBe(content.length);

					const written = await file.readFile("utf8");
					expect(written).toBe(content);
				} finally {
					await file.remove();
				}
			});

			it("writes partial buffer with offset", async () => {
				const file = getTempPath("write-partial.txt");
				const buffer = Buffer.from("Hello, World!");

				try {
					const result = await file.write(buffer, 7, 5, null);
					expect(result.bytesWritten).toBe(5);

					const written = await file.readFile("utf8");
					expect(written).toBe("World");
				} finally {
					await file.remove();
				}
			});

			it("writes at specific position", async () => {
				const file = getTempPath("write-position.txt");
				await file.writeFile("Hello, World!");

				try {
					const buffer = Buffer.from("HELLO");
					const result = await file.write(buffer, 0, buffer.length, 7, true, { flags: "r+" });
					expect(result.bytesWritten).toBe(5);

					const written = await file.readFile("utf8");
					expect(written).toBe("Hello, HELLO!");
				} finally {
					await file.remove();
				}
			});

			it("keeps file open when requested", async () => {
				const file = getTempPath("write-keep-open.txt");
				const buffer = Buffer.from("Hello");

				try {
					const result = await file.write(
						buffer,
						0,
						buffer.length,
						null,
						false, // don't close
						{ flags: "w" }
					);

					expect(result.fileDescriptor).not.toBeNull();
					await file.close(); // Clean up
				} finally {
					await file.remove();
				}
			});

			it("appends to existing file", async () => {
				const file = getTempPath("write-append.txt");
				await file.writeFile("Hello");

				try {
					const buffer = Buffer.from(", World!");
					await file.write(buffer, 0, buffer.length, null, true, { flags: "a" });

					const written = await file.readFile("utf8");
					expect(written).toBe("Hello, World!");
				} finally {
					await file.remove();
				}
			});

			it("handles write positions correctly", async () => {
				const file = getTempPath("write-position-test.txt");

				try {
					// First write the initial content
					await file.writeFile("Hello, World!"); // Use writeFile for initial content

					// Write "HELLO" at position 7
					const update = Buffer.from("HELLO");
					const result = await file.write(update, 0, update.length, 7, true, { flags: "r+" });
					expect(result.bytesWritten).toBe(5);

					// Read the entire content
					const written = await file.readFile("utf8");
					expect(written).toBe("Hello, HELLO!");
				} finally {
					await file.remove();
				}
			});
		});

		describe("writeSync()", () => {
			it("writes entire buffer to file synchronously", () => {
				const file = getTempPath("write-sync.txt");
				const content = "Hello, World!";
				const buffer = Buffer.from(content);

				try {
					const result = file.writeSync(buffer, 0, buffer.length, null);
					expect(result.bytesWritten).toBe(content.length);

					const written = file.readFileSync("utf8");
					expect(written).toBe(content);
				} finally {
					file.removeSync();
				}
			});

			it("writes partial buffer with offset synchronously", () => {
				const file = getTempPath("write-partial-sync.txt");
				const buffer = Buffer.from("Hello, World!");

				try {
					const result = file.writeSync(buffer, 7, 5, null);
					expect(result.bytesWritten).toBe(5);

					const written = file.readFileSync("utf8");
					expect(written).toBe("World");
				} finally {
					file.removeSync();
				}
			});

			it("keeps file open when requested synchronously", () => {
				const file = getTempPath("write-keep-open-sync.txt");
				const buffer = Buffer.from("Hello");

				try {
					const result = file.writeSync(
						buffer,
						0,
						buffer.length,
						null,
						false, // don't close
						{ flags: "w" }
					);

					expect(result.fileDescriptor).not.toBeNull();
					file.closeSync(); // Clean up
				} finally {
					file.removeSync();
				}
			});
		});

		describe("error handling", () => {
			it("handles write to read-only file", async () => {
				const file = getTempPath("readonly.txt");
				await file.writeFile("test");
				await file.chmod(0o444);

				try {
					const buffer = Buffer.from("Hello");
					await expect(file.write(buffer, 0, buffer.length, null)).rejects.toThrow();
				} finally {
					await file.chmod(0o666);
					await file.remove();
				}
			});

			it("handles invalid buffer offsets", async () => {
				const file = getTempPath("invalid-offset.txt");
				const buffer = Buffer.from("Hello");

				try {
					await expect(file.write(buffer, -1, buffer.length, null)).rejects.toThrow();
				} finally {
					await file.remove();
				}
			});

			it("handles invalid lengths", async () => {
				const file = getTempPath("invalid-length.txt");
				const buffer = Buffer.from("Hello");

				try {
					await expect(file.write(buffer, 0, buffer.length + 1, null)).rejects.toThrow();
				} finally {
					await file.remove();
				}
			});
		});

		describe("TypedArray support", () => {
			it("writes Uint8Array", async () => {
				const file = getTempPath("typed-array.txt");
				const data = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"

				try {
					await file.write(data, 0, data.length, null);
					const written = await file.readFile("utf8");
					expect(written).toBe("Hello");
				} finally {
					await file.remove();
				}
			});

			it("writes DataView", async () => {
				const file = getTempPath("dataview.txt");
				const buffer = new ArrayBuffer(5);
				const view = new DataView(buffer);
				// Write "Hello" as bytes
				view.setUint8(0, 72);
				view.setUint8(1, 101);
				view.setUint8(2, 108);
				view.setUint8(3, 108);
				view.setUint8(4, 111);

				try {
					await file.write(view, 0, view.byteLength, null);
					const written = await file.readFile("utf8");
					expect(written).toBe("Hello");
				} finally {
					await file.remove();
				}
			});
		});
	});
});
