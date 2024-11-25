import { tmpdir } from "os";
import { join } from "path";
import { Path } from "../../src/path.js";

describe("Path JSON operations", () => {
	const getTempPath = (suffix: string) => new Path(join(tmpdir(), `pathlib-test-${Date.now()}-${suffix}`));

	describe("readJSON() and readJSONSync()", () => {
		let jsonFile: Path;
		const testData = {
			string: "test",
			number: 42,
			boolean: true,
			null: null,
			array: [1, 2, 3],
			nested: {
				key: "value",
			},
		};

		beforeEach(async () => {
			jsonFile = getTempPath("test.json");
			await jsonFile.writeFile(JSON.stringify(testData));
		});

		afterEach(async () => {
			await jsonFile.remove();
		});

		describe("readJSON()", () => {
			it("reads JSON file correctly", async () => {
				const data = await jsonFile.readJSON();
				expect(data).toEqual(testData);
			});

			it("throws on non-JSON file", async () => {
				const textFile = getTempPath("test.txt");
				await textFile.writeFile("not json");

				try {
					await expect(textFile.readJSON()).rejects.toThrow();
				} finally {
					await textFile.remove();
				}
			});

			it("throws on non-existent file", async () => {
				const nonExistent = getTempPath("nonexistent.json");
				await expect(nonExistent.readJSON()).rejects.toThrow();
			});

			it("throws on directory", async () => {
				const dir = getTempPath("dir");
				await dir.makeDir();

				try {
					await expect(dir.readJSON()).rejects.toThrow();
				} finally {
					await dir.remove();
				}
			});

			it("handles empty JSON objects", async () => {
				const emptyFile = getTempPath("empty.json");
				await emptyFile.writeFile("{}");

				try {
					const data = await emptyFile.readJSON();
					expect(data).toEqual({});
				} finally {
					await emptyFile.remove();
				}
			});

			it("handles empty JSON arrays", async () => {
				const emptyArray = getTempPath("empty-array.json");
				await emptyArray.writeFile("[]");

				try {
					const data = await emptyArray.readJSON();
					expect(data).toEqual([]);
				} finally {
					await emptyArray.remove();
				}
			});
		});

		describe("readJSONSync()", () => {
			it("reads JSON file correctly", () => {
				const data = jsonFile.readJSONSync();
				expect(data).toEqual(testData);
			});

			it("throws on non-JSON file", () => {
				const textFile = getTempPath("test.txt");
				textFile.writeFileSync("not json");

				try {
					expect(() => textFile.readJSONSync()).toThrow();
				} finally {
					textFile.removeSync();
				}
			});

			it("throws on non-existent file", () => {
				const nonExistent = getTempPath("nonexistent.json");
				expect(() => nonExistent.readJSONSync()).toThrow();
			});

			it("throws on directory", () => {
				const dir = getTempPath("dir");
				dir.makeDirSync();

				try {
					expect(() => dir.readJSONSync()).toThrow();
				} finally {
					dir.removeSync();
				}
			});
		});
	});

	describe("writeJSON() and writeJSONSync()", () => {
		describe("writeJSON()", () => {
			it("writes JSON data correctly", async () => {
				const file = getTempPath("write-test.json");
				const testData = { key: "value" };

				try {
					await file.writeJSON(testData);
					const content = await file.readFile("utf8");
					expect(JSON.parse(content)).toEqual(testData);
				} finally {
					await file.remove();
				}
			});

			it("creates directories as needed", async () => {
				const nestedFile = getTempPath(join("nested", "deep", "test.json"));
				const testData = { key: "value" };

				try {
					await nestedFile.writeJSON(testData);
					expect(await nestedFile.exists()).toBe(true);
					const content = await nestedFile.readJSON();
					expect(content).toEqual(testData);
				} finally {
					await nestedFile.parent().parent().remove();
				}
			});

			it("handles pretty printing", async () => {
				const file = getTempPath("pretty.json");
				const testData = { nested: { key: "value" } };

				try {
					await file.writeJSON(testData, { spaces: 2 });
					const content = await file.readFile("utf8");
					expect(content).toContain("\n");
					expect(content).toContain("  ");
				} finally {
					await file.remove();
				}
			});

			it("throws on non-JSON extension", async () => {
				const textFile = getTempPath("test.txt");
				await expect(textFile.writeJSON({ key: "value" })).rejects.toThrow();
			});

			it("handles circular references with replacer", async () => {
				const file = getTempPath("circular.json");
				const circular: any = { key: "value" };
				circular.self = circular;

				const replacer = (key: string, value: any) => {
					if (key === "self") return "[Circular]";
					return value;
				};

				try {
					await file.writeJSON(circular, { replacer });
					const content = await file.readJSON();
					expect(content.self).toBe("[Circular]");
				} finally {
					await file.remove();
				}
			});
		});

		describe("writeJSONSync()", () => {
			it("writes JSON data correctly", () => {
				const file = getTempPath("write-test-sync.json");
				const testData = { key: "value" };

				try {
					file.writeJSONSync(testData);
					const content = file.readFileSync("utf8");
					expect(JSON.parse(content)).toEqual(testData);
				} finally {
					file.removeSync();
				}
			});

			it("creates directories as needed", () => {
				const nestedFile = getTempPath(join("nested", "deep", "test.json"));
				const testData = { key: "value" };

				try {
					nestedFile.writeJSONSync(testData);
					expect(nestedFile.existsSync()).toBe(true);
					const content = nestedFile.readJSONSync();
					expect(content).toEqual(testData);
				} finally {
					nestedFile.parent().parent().removeSync();
				}
			});

			it("throws on non-JSON extension", () => {
				const textFile = getTempPath("test.txt");
				expect(() => textFile.writeJSONSync({ key: "value" })).toThrow();
			});
		});

		describe("JSON formatting options", () => {
			it("respects EOL option", async () => {
				const file = getTempPath("eol.json");
				const testData = { key: "value" };

				try {
					await file.writeJSON(testData, { spaces: 2, EOL: "\r\n" });
					const content = await file.readFile("utf8");
					expect(content).toContain("\r\n");
				} finally {
					await file.remove();
				}
			});

			it("handles custom space characters", async () => {
				const file = getTempPath("custom-space.json");
				const testData = { key: "value" };

				try {
					await file.writeJSON(testData, { spaces: "\t" });
					const content = await file.readFile("utf8");
					expect(content).toContain("\t");
				} finally {
					await file.remove();
				}
			});
		});
	});
});
