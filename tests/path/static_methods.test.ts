import * as fse from "fs-extra";
import { homedir, platform, tmpdir } from "os";
import path from "path";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { Path } from "../../src/path.js";

describe("Path Static Methods", () => {
	const isWindows = platform() === "win32";
	let originalPATH: string | undefined;
	let tempDir: Path;

	beforeEach(() => {
		originalPATH = process.env.PATH;
		tempDir = new Path(tmpdir(), "pathlib-test-static");
	});

	afterEach(() => {
		process.env.PATH = originalPATH;
		fse.removeSync(tempDir.path);
	});

	describe("pwd and cwd", () => {
		test("returns current working directory", () => {
			const pwd = Path.pwd();
			const cwd = Path.cwd();

			expect(pwd.path).toBe(process.cwd());
			expect(cwd.path).toBe(process.cwd());
			expect(pwd).toBeInstanceOf(Path);
			expect(cwd).toBeInstanceOf(Path);
		});

		test("pwd and cwd are equivalent", () => {
			expect(Path.pwd().path).toBe(Path.cwd().path);
		});
	});

	describe("home", () => {
		test("returns home directory", () => {
			const home = Path.home();

			expect(home.path).toBe(homedir());
			expect(home).toBeInstanceOf(Path);
		});
	});

	describe("toSystemDelimitedSingleString", () => {
		test("joins paths with system delimiter", () => {
			const path1 = new Path("/foo/bar");
			const path2 = new Path("/baz/qux");
			const delimiter = isWindows ? ";" : ":";

			const result = Path.toSystemDelimitedSingleString(path1, path2);
			expect(result).toBe(`/foo/bar${delimiter}/baz/qux`);
		});

		test("handles mix of strings and Path instances", () => {
			const path1 = "/foo/bar";
			const path2 = new Path("/baz/qux");
			const delimiter = isWindows ? ";" : ":";

			const result = Path.toSystemDelimitedSingleString(path1, path2);
			expect(result).toBe(`/foo/bar${delimiter}/baz/qux`);
		});

		test("returns empty string for no paths", () => {
			const result = Path.toSystemDelimitedSingleString();
			expect(result).toBe("");
		});
	});

	describe("getPATHAsPaths", () => {
		test("returns empty array when PATH is undefined", () => {
			delete process.env.PATH;
			const paths = Path.getPATHAsPaths();
			expect(paths).toEqual([]);
		});

		test("converts PATH to array of Path instances", () => {
			const testPaths = isWindows ? ["C:\\foo", "C:\\bar", "C:\\baz"] : ["/usr/local/bin", "/usr/bin", "/bin"];

			process.env.PATH = testPaths.join(path.delimiter);
			const paths = Path.getPATHAsPaths();

			expect(paths).toHaveLength(testPaths.length);
			paths.forEach((p) => expect(p).toBeInstanceOf(Path));
			expect(paths.map((p) => p.path)).toEqual(testPaths);
		});

		test("skips empty entries in PATH", () => {
			const testPaths = isWindows ? ["C:\\foo", "", "C:\\bar"] : ["/usr/local/bin", "", "/usr/bin"];

			process.env.PATH = testPaths.join(path.delimiter);
			const paths = Path.getPATHAsPaths();

			expect(paths).toHaveLength(testPaths.filter((p) => p !== "").length);
		});
	});

	describe("parseModeIntoOctal", () => {
		test("parses numeric mode", () => {
			expect(Path.parseModeIntoOctal(0o777)).toBe(777);
			expect(Path.parseModeIntoOctal(0o755)).toBe(755);
			expect(Path.parseModeIntoOctal(0o644)).toBe(644);
		});

		test("parses fs.Stats mode", () => {
			// Ensure temp directory exists
			fse.ensureDirSync(tempDir.path);

			// Create a test file with specific permissions
			const testFile = new Path(tempDir.path, "test-file");
			fse.writeFileSync(testFile.path, "test");
			fse.chmodSync(testFile.path, 0o755);

			const stats = fse.statSync(testFile.path);
			expect(Path.parseModeIntoOctal(stats)).toBe(755);
		});

		test("handles common system modes", () => {
			// Common system mode numbers and their octal equivalents
			expect(Path.parseModeIntoOctal(16877)).toBe(755); // drwxr-xr-x
			expect(Path.parseModeIntoOctal(16895)).toBe(777); // drwxrwxrwx
			expect(Path.parseModeIntoOctal(33188)).toBe(644); // -rw-r--r--
		});
	});
});
