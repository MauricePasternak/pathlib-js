import { platform } from "os";
import path from "path";
import { PathJSON } from "./types.js";

// Credit for performant answer: https://stackoverflow.com/questions/26156292/trim-specific-character-from-a-string
/* istanbul ignore next */
function trimChars(str: string, chars: string[]) {
	let start = 0,
		end = str.length;
	while (start < end && chars.indexOf(str[start]) >= 0) ++start;
	while (end > start && chars.indexOf(str[end - 1]) >= 0) --end;
	return start > 0 || end < str.length ? str.substring(start, end) : str;
}

// Mark this function as pure
/* istanbul ignore next */
function _normalizePath(path: string, stripTrailing = true): string {
	if (path === "\\" || path === "/") return "/";

	const len = path.length;
	if (len <= 1) return path;

	// Handle win32 namespaces
	let prefix = "";
	// istanbul ignore next
	if (len > 4 && path[3] === "\\") {
		const ch = path[2];
		if ((ch === "?" || ch === ".") && path.slice(0, 2) === "\\\\") {
			path = path.slice(2);
			prefix = "//";
		}
	}

	const segs = path.split(/[/\\]+/);
	// istanbul ignore next
	if (stripTrailing !== false && segs[segs.length - 1] === "") {
		segs.pop();
	}
	return prefix + segs.join("/");
}

function _parseStemToSuffixes(stem: string) {
	const _suffixes = stem.replaceAll(/^\.+/g, "").split(".");
	if (_suffixes.length < 2) return [];
	return _suffixes.slice(1).map((s) => `.${s}`);
}

/**
 * A class for performing operations on paths without accessing the filesystem.
 * @example
 * ```typescript
 * const path = new PurePath("/home/user/docs/file.txt");
 * console.log(path.stem);     // "file"
 * console.log(path.ext);      // ".txt"
 * console.log(path.dirname);  // "/home/user/docs"
 * ```
 */
export class PurePath {
	/** The root of the path (e.g., "/" on Unix or "C:" on Windows) */
	readonly root: string;

	/** The complete path string. Please note that trailing forward slashes are stripped off */
	readonly path: string;

	/** The directory name of the path */
	readonly dirname: string;

	/**
	 * The final component of the path
	 * @example
	 * ```typescript
	 * new PurePath("/home/doc.txt").basename;     // "doc.txt"
	 * new PurePath(".gitignore").basename;        // ".gitignore"
	 * new PurePath(".env.local").basename;        // ".env.local"
	 * ```
	 */
	readonly basename: string;

	/**
	 * The final component of the path without its suffix(es)
	 * @example
	 * ```typescript
	 * new PurePath("index.html").stem;          // "index"
	 * new PurePath("index.coffee.md").stem;     // "index"
	 * new PurePath(".gitignore").stem;          // ".gitignore"
	 * new PurePath(".env.local").stem;          // ".env"
	 * ```
	 */
	readonly stem: string;

	/**
	 * The file extension of the path, including the leading dot
	 * @example
	 * ```typescript
	 * new PurePath("index.html").ext;           // ".html"
	 * new PurePath("index.coffee.md").ext;      // ".md"
	 * new PurePath("index.").ext;               // "."
	 * new PurePath("index").ext;                // ""
	 * new PurePath(".index").ext;               // ""
	 * new PurePath(".index.md").ext;            // ".md"
	 * ```
	 */
	readonly ext: string;

	/**
	 * All extensions of the path, including the leading dots
	 * @example
	 * ```typescript
	 * new PurePath("index.html").suffixes;          // [".html"]
	 * new PurePath("index.coffee.md").suffixes;     // [".coffee", ".md"]
	 * new PurePath("foo.tar.gz").suffixes;          // [".tar", ".gz"]
	 * new PurePath(".gitignore").suffixes;          // []
	 * new PurePath(".env.local").suffixes;          // [".local"]
	 * ```
	 */
	readonly suffixes: string[];
	readonly parts: string[];
	private readonly _platform: string;

	/**
	 * Creates a new PurePath instance from path segments
	 * @throws {Error} When provided empty string or no arguments
	 * @example
	 * ```typescript
	 * new PurePath("/home", "user", "docs");    // "/home/user/docs"
	 * new PurePath("C:\\Users\\docs");          // "C:/Users/docs"
	 * new PurePath("./.gitignore");             // "./.gitignore"
	 * new PurePath(existingPath);               // copies path from existingPath
	 * ```
	 */
	constructor(...paths: Array<string | PurePath>) {
		if (!paths || !paths.length || (paths.length === 1 && paths[0] === "")) {
			throw new Error("Cannot instantiate a new Path instance on an empty string, empty array, or falsy value");
		}

		this._platform = platform();

		// Convert any PurePath instances to their string representation
		const pathStrings = paths.map((p) => (typeof p === "string" ? p : p.path));

		// Clean up the paths by replacing \\ and // with /
		const semiCleanedPaths = pathStrings.map((p) => p.replaceAll(/[\\/]+/g, "/"));
		this.path = this._capitalizeroot(_normalizePath(semiCleanedPaths.join("/")));

		const { dir, root, base, ext } = path.parse(this.path);
		this.root = root;
		this.dirname = dir;
		this.basename = base;
		this.ext = ext;

		// Strip off the extension from the basename using a regex
		const replaceExtPat = new RegExp(`${this.ext}$`, "g");
		const basenameWithoutExt = this.basename.replaceAll(replaceExtPat, "");
		this.stem = basenameWithoutExt === this.basename ? basenameWithoutExt : basenameWithoutExt;

		// For suffixes, we will use the stem as a starting point, remove all leading dots, and then add a dot before each suffix
		const _suffixes = _parseStemToSuffixes(this.stem);
		this.suffixes = [..._suffixes, ...(this.ext ? [this.ext] : [])];

		this.parts = this._platform === "win32" ? this.path.split("/") : ["/", ...this.path.split("/").slice(1)];
	}

	/* istanbul ignore next */
	private _capitalizeroot(inputString: string) {
		if (this._platform !== "win32") return inputString; // Passthrough for Unix
		const parts = inputString.split("/");
		// Must account for edge case where the instance is created with "/" in windows
		return parts.length === 1 ? parts[0].toUpperCase() + "/" : [parts[0].toUpperCase(), ...parts.slice(1)].join("/");
	}

	/**
	 * Returns whether the path is absolute.
	 */
	isAbsolute() {
		return path.isAbsolute(this.path);
	}

	/**
	 * Checks whether the path is relative to another path.
	 */
	isRelativeTo(other: string | PurePath) {
		const otherPath = typeof other === "string" ? other : other.path;
		return this.path.startsWith(otherPath) && this.path !== otherPath;
	}

	/**
	 * Joins path segments to create a new path instance of the same type
	 * @param segments Path segments to join
	 * @returns A new instance of the same type (PurePath or Path) with the joined segments
	 */
	joinPath(...segments: string[]): this {
		// Create a new instance of whatever class this was called from
		return new (this.constructor as new (...args: string[]) => this)(this.path, ...segments);
	}

	/**
	 * Depicts the relative path from this path to another filepath.
	 * @param to - The target path to calculate relative path to
	 * @param useSystemPathDelimiter - Whether to use system-specific path separators
	 * @example
	 * ```typescript
	 * const path = new PurePath("/home/user/docs");
	 * path.relative("/home/user/downloads");     // "../downloads"
	 * path.relative("../other");                 // "../../other"
	 * ```
	 */
	relative(to: string | PurePath, useSystemPathDelimiter = false): string {
		const relPath = path.relative(this.path, typeof to === "string" ? to : to.path);
		return useSystemPathDelimiter ? relPath : _normalizePath(relPath);
	}

	/**
	 * Returns JSON representation of the path
	 * @param useSystemPathDelimiter - Whether to use system-specific path separators
	 * @example
	 * ```typescript
	 * const path = new PurePath("/home/doc.txt");
	 * console.log(path.toJSON());
	 * // {
	 * //   path: "/home/doc.txt",
	 * //   root: "/",
	 * //   basename: "doc.txt",
	 * //   dirname: "/home",
	 * //   stem: "doc",
	 * //   ext: ".txt",
	 * //   suffixes: [".txt"]
	 * // }
	 * ```
	 */
	toJSON(useSystemPathDelimiter = false): PathJSON {
		return {
			path: this.toString(useSystemPathDelimiter),
			root: this.root,
			basename: this.basename,
			dirname: this.dirname,
			stem: this.stem,
			ext: this.ext,
			suffixes: this.suffixes,
		};
	}

	/**
	 * Returns string representation of the path
	 * @param useSystemPathDelimiter - Whether to use system-specific path separators
	 * @example
	 * ```typescript
	 * const path = new PurePath("/home/user");
	 * path.toString();                           // "/home/user"
	 * path.toString(true);                       // "/home/user" (Unix)
	 *                                           // "\\home\\user" (Windows)
	 * ```
	 */
	toString(useSystemPathDelimiter = false): string {
		return this._platform === "win32" && useSystemPathDelimiter ? this.path.replace(/\//g, "\\") : this.path;
	}

	/**
	 * Creates a new instance of the same type with a replaced basename
	 */
	withBasename(name: string): this {
		return new (this.constructor as new (...args: string[]) => this)(
			[...this.parts.slice(0, this.parts.length - 1), name].join("/")
		);
	}

	/**
	 * Creates a new instance of the same type with a replaced stem
	 */
	withStem(stem: string): this {
		const newBasename = [stem, ...this.basename.split(".").slice(1)].join(".");
		return this.withBasename(newBasename);
	}

	/**
	 * Creates a new instance of the same type with replaced extension
	 */
	withExtension(ext: string): this {
		let newSuffixes: string[] = [];

		// Handle the case where the extension is being removed
		if (ext === "") {
			return this.suffixes.length === 0 ? this : this.withBasename(this.stem);
		}

		// Handle the case where the extension is being replaced
		return this.withBasename([this.stem, trimChars(ext, ["."])].join("."));
	}
}
