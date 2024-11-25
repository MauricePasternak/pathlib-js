import { platform } from "os";
import { parse } from "path";
import { PurePath } from "../../src/purepath.js";

describe("PurePath", () => {
	const isWindows = platform() === "win32";

	describe("constructor", () => {
		it("should create a new PurePath instance", () => {
			const fp = new PurePath("/home/jsmith/Documents");
			expect(fp.path).toBe("/home/jsmith/Documents");
		});

		it("should throw on empty input", () => {
			expect(() => new PurePath("")).toThrow();
			expect(() => new PurePath()).toThrow();
		});

		it("should join multiple path segments", () => {
			const fp = new PurePath("home", "jsmith", "Documents");
			expect(fp.path).toMatch(/home\/jsmith\/Documents$/);
		});

		it("should handle Windows paths", () => {
			const fp = new PurePath("C:\\Users\\jsmith\\Documents");
			if (isWindows) {
				expect(fp.path).toBe("C:/Users/jsmith/Documents");
			} else {
				expect(fp.path).toMatch(/.*Users\/jsmith\/Documents$/);
			}
		});
	});

	describe("properties", () => {
		it("should parse path components correctly", () => {
			const fp = new PurePath("/home/jsmith/document.txt");
			expect(fp.basename).toBe("document.txt");
			expect(fp.stem).toBe("document");
			expect(fp.ext).toBe(".txt");
			expect(fp.dirname).toMatch(/home\/jsmith$/);
		});

		it("should handle multiple extensions", () => {
			const fp = new PurePath("/home/doc.tar.gz");
			expect(fp.suffixes).toEqual([".tar", ".gz"]);
			expect(fp.stem).toBe("doc.tar");
			expect(fp.ext).toBe(".gz");
		});

		it("should handle paths without extensions", () => {
			const fp = new PurePath("/home/document");
			expect(fp.suffixes).toEqual([]);
			expect(fp.ext).toBe("");
			expect(fp.stem).toBe("document");
		});
	});

	describe("dotfiles", () => {
		it("should handle dotfiles correctly", () => {
			const fp = new PurePath(".gitignore");
			const parsed = parse(fp.path);
			expect(fp.ext).toBe("");
			expect(fp.stem).toBe(".gitignore");
		});
	});

	describe("extensions", () => {
		const cases = [
			{ input: "index.html", expected: ".html" },
			{ input: "index.coffee.md", expected: ".md" },
			{ input: "index.", expected: "." },
			{ input: "index", expected: "" },
			{ input: ".index", expected: "" },
			{ input: ".index.md", expected: ".md" },
		];

		it.each(cases)("should handle extension for $input", ({ input, expected }) => {
			const fp = new PurePath(input);
			expect(fp.ext).toBe(expected);
		});

		describe("withExtension()", () => {
			it("should replace last extension while preserving others", () => {
				const fp = new PurePath("foo.tar.gz");
				const newFp = fp.withExtension(".bz2");
				expect(newFp.basename).toBe("foo.tar.bz2");
				expect(newFp.suffixes).toEqual([".tar", ".bz2"]);
			});

			it("should handle extension with or without leading dot", () => {
				const fp = new PurePath("foo.txt");
				expect(fp.withExtension(".md").basename).toBe("foo.md");
				expect(fp.withExtension("md").basename).toBe("foo.md");
			});

			it("should remove last extension when empty string provided", () => {
				const fp = new PurePath("foo.tar.gz");
				const newFp = fp.withExtension("");
				expect(newFp.basename).toBe("foo.tar");
				expect(newFp.suffixes).toEqual([".tar"]);
			});

			it("should add extension to files without one", () => {
				const fp = new PurePath("foo");
				const newFp = fp.withExtension(".txt");
				expect(newFp.basename).toBe("foo.txt");
				expect(newFp.suffixes).toEqual([".txt"]);
			});

			it("should handle dotfiles correctly", () => {
				const fp = new PurePath(".gitignore");
				const newFp = fp.withExtension(".bak");
				expect(newFp.basename).toBe(".gitignore.bak");
				expect(newFp.suffixes).toEqual([".bak"]);
			});
		});

		describe("suffixes", () => {
			const suffixCases = [
				{ input: "index.html", expected: [".html"] },
				{ input: "index.coffee.md", expected: [".coffee", ".md"] },
				{ input: "index.", expected: ["."] },
				{ input: "index", expected: [] },
				{ input: ".index", expected: [] },
				{ input: ".index.md", expected: [".md"] },
				{ input: "foo.tar.gz", expected: [".tar", ".gz"] },
			];

			it.each(suffixCases)("should handle suffixes for $input", ({ input, expected }) => {
				const fp = new PurePath(input);
				expect(fp.suffixes).toEqual(expected);
			});
		});

		describe("stem", () => {
			const stemCases = [
				{ input: "index.html", expected: "index" },
				{ input: "index.coffee.md", expected: "index.coffee" },
				{ input: "index.", expected: "index" },
				{ input: "index", expected: "index" },
				{ input: ".index", expected: ".index" },
				{ input: ".index.md", expected: ".index" },
				{ input: "foo.tar.gz", expected: "foo.tar" },
			];

			it.each(stemCases)("should handle stem for $input", ({ input, expected }) => {
				const fp = new PurePath(input);
				expect(fp.stem).toBe(expected);
			});
		});
	});

	describe("parts", () => {
		it("should split path into components", () => {
			const fp = new PurePath("/home/jsmith/Documents");
			const parts = fp.parts;
			if (isWindows) {
				expect(parts).toEqual(["", "home", "jsmith", "Documents"]);
			} else {
				expect(parts).toEqual(["/", "home", "jsmith", "Documents"]);
			}
		});

		it("should handle Windows root paths", () => {
			const fp = new PurePath("C:\\Users");
			const parts = fp.parts;
			if (isWindows) {
				expect(parts).toEqual(["C:", "Users"]);
			} else {
				expect(parts[parts.length - 1]).toBe("Users");
			}
		});
	});

	describe("joinPath()", () => {
		it("should join paths correctly", () => {
			const fp = new PurePath("/home");
			const joined = fp.joinPath("jsmith", "docs");
			expect(joined.path).toMatch(/home\/jsmith\/docs$/);
		});
	});

	describe("relative()", () => {
		it("should calculate relative paths", () => {
			const fp1 = new PurePath("/home/jsmith/docs");
			const fp2 = new PurePath("/home/jsmith/downloads");
			expect(fp1.relative(fp2)).toBe("../downloads");
		});

		it("should handle string input", () => {
			const fp = new PurePath("/home/jsmith/docs");
			expect(fp.relative("/home/jsmith/downloads")).toBe("../downloads");
		});

		it("should handle system path delimiter option", () => {
			const fp = new PurePath("/home/jsmith/docs");
			const rel = fp.relative("/home/jsmith/downloads", true);
			if (isWindows) {
				expect(rel).toBe("..\\downloads");
			} else {
				expect(rel).toBe("../downloads");
			}
		});
	});

	describe("isAbsolute()", () => {
		it("should check if path is absolute", () => {
			expect(new PurePath("/home/jsmith").isAbsolute()).toBe(true);
			expect(new PurePath("home/jsmith").isAbsolute()).toBe(false);
		});
	});

	describe("isRelativeTo()", () => {
		const isWindows = platform() === "win32";
		const root = isWindows ? "C:" : "";

		it("identifies paths relative to parent directories", () => {
			const parent = new PurePath(`${root}/home/user`);
			const child = new PurePath(`${root}/home/user/docs`);
			const sibling = new PurePath(`${root}/home/other`);

			expect(child.isRelativeTo(parent)).toBe(true);
			expect(parent.isRelativeTo(child)).toBe(false);
			expect(sibling.isRelativeTo(parent)).toBe(false);
		});

		it("handles string input", () => {
			const child = new PurePath(`${root}/home/user/docs`);
			expect(child.isRelativeTo(`${root}/home/user`)).toBe(true);
		});

		it("handles same paths", () => {
			const path = new PurePath(`${root}/home/user`);
			expect(path.isRelativeTo(path)).toBe(false);
		});

		if (isWindows) {
			it("handles Windows paths with different casings", () => {
				const parent = new PurePath("C:/Users");
				const child = new PurePath("c:/users/docs");
				expect(child.isRelativeTo(parent)).toBe(true);
			});
		}
	});

	describe("withBasename()", () => {
		it("should replace basename", () => {
			const fp = new PurePath("/home/doc.txt");
			const newFp = fp.withBasename("new.txt");
			expect(newFp.basename).toBe("new.txt");
			expect(newFp.path).toMatch(/home\/new\.txt$/);
		});
	});

	describe("withStem()", () => {
		it("should replace stem while keeping extension", () => {
			const fp = new PurePath("/home/doc.txt");
			const newFp = fp.withStem("new");
			expect(newFp.basename).toBe("new.txt");
			expect(newFp.stem).toBe("new");
			expect(newFp.ext).toBe(".txt");
		});
	});

	describe("toString()", () => {
		it("should return string representation", () => {
			const fp = new PurePath("/home/jsmith");
			expect(fp.toString()).toBe(fp.path);
		});

		it("should handle system path delimiter option", () => {
			const fp = new PurePath("/home/jsmith");
			const str = fp.toString(true);
			if (isWindows) {
				expect(str).toMatch(/home\\jsmith$/);
			} else {
				expect(str).toMatch(/home\/jsmith$/);
			}
		});
	});

	describe("toJSON()", () => {
		it("should return JSON representation", () => {
			const fp = new PurePath("/home/doc.txt");
			const json = fp.toJSON();
			expect(json).toEqual({
				path: fp.path,
				root: fp.root,
				basename: fp.basename,
				dirname: fp.dirname,
				stem: fp.stem,
				ext: fp.ext,
				suffixes: fp.suffixes,
			});
		});

		it("should handle system path delimiter option", () => {
			const fp = new PurePath("/home/doc.txt");
			const json = fp.toJSON(true);
			if (isWindows) {
				expect(json.path).toMatch(/home\\doc\.txt$/);
			} else {
				expect(json.path).toMatch(/home\/doc\.txt$/);
			}
		});
	});
});

describe("PurePath Dotfile and Relative Path Handling", () => {
	describe("dotfile paths", () => {
		const cases = [
			// Direct dotfiles
			{
				input: ".gitignore",
				expected: {
					path: ".gitignore",
					dirname: "",
					basename: ".gitignore",
					stem: ".gitignore",
					ext: "",
					suffixes: [],
				},
			},
			// Relative path dotfiles
			{
				input: "./.gitignore",
				expected: {
					basename: ".gitignore",
					stem: ".gitignore",
					ext: "",
					suffixes: [],
				},
			},
		];

		it.each(cases)("should handle $input correctly", ({ input, expected }) => {
			const fp = new PurePath(input);
			expect(fp.basename).toBe(expected.basename);
			expect(fp.stem).toBe(expected.stem);
			expect(fp.ext).toBe(expected.ext);
			expect(fp.suffixes).toEqual(expected.suffixes);
		});
	});

	describe("path manipulation with dotfiles", () => {
		it("should join paths with dotfiles correctly", () => {
			const fp = new PurePath(".");
			expect(fp.joinPath(".gitignore").basename).toBe(".gitignore");
			expect(fp.joinPath(".config", ".env.local").basename).toBe(".env.local");
		});

		it("should handle relative paths to dotfiles", () => {
			const fp = new PurePath("src");
			const relative = fp.relative("../.gitignore");
			expect(relative).toBe("../../.gitignore");
		});
	});

	describe("withExtension() with relative dotfiles", () => {
		it("should handle adding extension to relative dotfile", () => {
			const fp = new PurePath("./.gitignore");
			const newFp = fp.withExtension(".bak");
			expect(newFp.basename).toBe(".gitignore.bak");
			expect(newFp.stem).toBe(".gitignore");
		});

		it("should handle nested relative dotfile paths", () => {
			const fp = new PurePath("../.config/.settings.json");
			const newFp = fp.withExtension(".yaml");
			expect(newFp.basename).toBe(".settings.yaml");
			expect(newFp.stem).toBe(".settings");
		});
	});

	describe("edge cases", () => {
		it("should handle multiple consecutive dots in path", () => {
			const fp = new PurePath("./...config.json");
			const parsed = parse("./...config.json");
			expect(fp.basename).toBe("...config.json");
			expect(fp.stem).toBe("...config");
			expect(fp.ext).toBe(".json");
			expect(fp.suffixes).toEqual([".json"]);
		});

		it("should handle empty segments correctly", () => {
			const fp = new PurePath(".//.gitignore");
			expect(fp.basename).toBe(".gitignore");
			expect(fp.stem).toBe(".gitignore");
		});

		it("should handle mixed forward and backward slashes", () => {
			const fp = new PurePath(".\\config\\.env.local");
			expect(fp.basename).toBe(".env.local");
			expect(fp.stem).toBe(".env");
			expect(fp.ext).toBe(".local");
		});
	});
});

describe("PurePath Windows Special Paths", () => {
	const isWindows = platform() === "win32";

	describe("UNC paths", () => {
		test("handles UNC server paths", () => {
			const path = new PurePath("\\\\server\\share\\file.txt");
			expect(path.path).toBe("/server/share/file.txt");
		});

		test("handles UNC long server paths", () => {
			const path = new PurePath("\\\\server.domain.com\\share\\path\\file.txt");
			expect(path.path).toBe("/server.domain.com/share/path/file.txt");
		});
	});
});
