/**
 * A library for filepath operations from an object-oriented approach.
 *
 * @remarks
 * The `pathlib-js` library is a simple wrapper library offering the functionality of several optimized
 * filepath libraries within a single Path class.
 * @packageDocumentation
 */
import chokidar, { ChokidarOptions, FSWatcher } from "chokidar";
import fg from "fast-glob";
import * as fse from "fs-extra";
import { homedir, platform } from "os";
import path from "path";
import { PurePath } from "./purepath.js";
import {
	AccessResult,
	CopyOptions,
	CopyOptionsSync,
	GlobOptions,
	JSONObject,
	JSONReadOptions,
	JSONWriteOptions,
	MoveOptions,
	OpenFileOptions,
	ReadFileOptions,
	SymlinkOptions,
	SystemError,
	TempFilepathOptions,
	TreeBranch,
	WriteFileOptions,
} from "./types.js";

/**
 * A wrapper class representing a filepath on which operations can be performed.
 * @example
 * ```typescript
 * // Assume that the current working directory is:
 * // "/home/jsmith/Documents/Work" on Unix and
 * // "C:\\Users\\JSmith\\Documents\\Work" on Windows
 * const fp1 = new Path("~")
 * const fp2 = new Path(".")
 * const fp3 = new Path("..")
 * const fp4_unix = new Path("/users/hsimpson/Documents")
 * const fp4_win = new Path("C:\\Users\\HSimpson\\Documents")
 * const fp5 = new Path("./foo")
 * const fp6 = new Path("../bar")
 * const fp7 = new Path("/")
 * ```
 */
export class Path extends PurePath {
	descriptor: null | number;

	constructor(...paths: Array<string | PurePath>) {
		super(...paths);
		this.descriptor = null;
	}

	/**
	 * Get a `Path` representation of the current working directory.
	 */
	static pwd() {
		return new Path(process.cwd());
	}

	/**
	 * Alias for `pwd`. Get a `Path` representation of the current working directory.
	 */
	static cwd() {
		return new Path(process.cwd());
	}

	/**
	 * Get a `Path` representation of the home directory.
	 */
	static home() {
		return new Path(homedir());
	}

	/**
	 * Joins filepaths to create a single string representation, delimited by the system-specific
	 * environment delimiter.
	 * @param paths A collection of strings or Path instances to be joined together using the
	 * system-specific environment delimiter (":" vs ";"). Useful for converting a collection
	 * of filepaths into a single string to be set as an environment variable.
	 * @returns Filepaths concatenated by the system-specific environment delimiter.
	 */
	static toSystemDelimitedSingleString(...paths: Array<string | Path>) {
		return paths.map((p) => (typeof p === "string" ? new Path(p).toString() : p.toString())).join(path.delimiter);
	}

	/**
	 * Converts the PATH variable into an `Array` of `Path` instances.
	 * @returns An `Array` of `Path` instances of the filepaths recorded in PATH.
	 */
	static getPATHAsPaths() {
		const paths = [] as Path[];
		if (!process?.env?.PATH) return paths;
		for (const p of process.env.PATH.split(path.delimiter)) {
			if (p === "") continue;
			paths.push(new Path(p));
		}
		return paths;
	}

	/**
	 * Parses the mode of a filepath into a more understandable octal-like representation (i.e. 777 for full-permissions)
	 * @param mode The mode of a filepath, as received from fs.Stats or the fs.Stats object itself
	 * @returns A 3-digit representation of the permissions indicated by the provided `mode`.
	 * @example
	 * ```js
	 * console.log(Path.parseModeIntoOctal(16877))
	 * >>> 755
	 * ```
	 */
	static parseModeIntoOctal(mode: number | fse.Stats) {
		return parseInt(((typeof mode === "number" ? mode : mode.mode) & 0o777).toString(8), 10);
	}

	/**
	 * Resolves a sequence of path segments into a new absolute Path from the underlying path.
	 * Respects ".." and will increment directories accordingly.
	 *
	 * ⚠️ Note that strings beginning with a single "." will be treated as if the dot character does not exist.
	 * Use the `join()` method as an alternative for treating ".." and "." as literal. ⚠️
	 * @param segments An `Array` of strings respresenting path segments to append and resolve to the underlying path.
	 * @returns The resolved `Path` instance.
	 * @example
	 * ```js
	 * const fp = new Path("/home/jsmith/Documents")
	 * console.log(fp.resolve("../Downloads").path)
	 * >>> "/home/jsmith/Downloads"
	 * ```
	 */
	resolve(...segments: string[]) {
		return new Path(path.resolve(this.path, ...segments));
	}

	/**
	 * Asynchronously retrieves the filepath that the underlying symlink is pointing to.
	 * @returns A `Path` instance of the target.
	 * @example
	 * ```js
	 * // symFP points to /home/jsmith/Documents
	 * const sympFP = new Path("/home/jsmith/ExampleSymlink.symlink")
	 * const origPath = (await symFP.readLink()).path
	 * console.log(origPath)
	 * >>> "/home/jsmith/Documents"
	 * ```
	 */
	async readLink() {
		if (!(await this.isSymbolicLink())) throw new Error("The underlying path not a symlink.");
		return new Path(await fse.readlink(this.path));
	}

	/**
	 * Synchronously retrieves the filepath that the underlying symlink is pointing to.
	 * @returns A `Path` instance of the target.
	 * @example
	 * ```js
	 * // symFP points to /home/jsmith/Documents
	 * const sympFP = new Path("/home/jsmith/ExampleSymlink.symlink")
	 * const origPath = symFP.readLinkSync().path
	 * console.log(origPath)
	 * >>> "/home/jsmith/Documents"
	 * ```
	 */
	readLinkSync() {
		if (!this.isSymbolicLinkSync()) throw new Error("The underlying path not a symlink.");
		return new Path(fse.readlinkSync(this.path));
	}

	/**
	 * Appends strings to the end of the underlying filepath, creating a new `Path` instance.
	 *
	 * ⚠️ Note that ".." and "." are treated **literally** and will not be resolved.
	 * For appending file segments with resolving behavior use the `resolve()` method. ⚠️
	 * @param segments Strings which should be appended to the Path instance in order to create a new one.
	 * @returns A new `Path` instance with the strings appended.
	 * @example
	 * ```js
	 * const fp = new Path("/home/jsmith/Documents");
	 * console.log(fp.join("foo", "bar").path);
	 * console.log(fp.join("..", "baz").path);
	 * >>> "/home/jsmith/Documents/foo/bar"
	 * >>> "/home/jsmith/Documents/../baz"
	 * ```
	 */
	// join(...segments: string[]) {
	//     if (!segments.length) throw new Error("Cannot join with an empty string");
	//     const segmentsAsArr = Array.isArray(segments) ? [...this.parts, ...segments] : [...this.parts, segments];
	//     const newPath = normalize(segmentsAsArr.join("/"));
	//     const copyPath = new Path(this.path);

	//     // Overwrite properties as necessary
	//     copyPath.path = newPath;
	//     const newPathParts = path.parse(newPath);
	//     copyPath.dirname = newPathParts.dir;
	//     copyPath.basename = newPathParts.base;
	//     const [newStem, ...newSuffixes] = newPathParts.base.split(".");
	//     copyPath.stem = newStem;
	//     copyPath.suffixes = newSuffixes;
	//     copyPath.ext = newPathParts.ext;
	//     return copyPath;
	// }

	/**
	 * Asynchronously retrieves the stat object for the filepath.
	 * @returns The `Stats` object for the underlying filepath.
	 */
	async stat() {
		return await fse.stat(this.path);
	}

	/**
	 * Synchronously retrieves the stat object for the filepath.
	 * @returns The `Stats` object for the underlying filepath.
	 */
	statSync() {
		return fse.statSync(this.path);
	}

	/**
	 * Asynchronously checks whether the underlying filepath exists.
	 */
	async exists(): Promise<boolean> {
		return await fse.pathExists(this.path);
	}

	/**
	 * Synchronously checks whether the underlying filepath exists.
	 */
	existsSync(): boolean {
		return fse.pathExistsSync(this.path);
	}

	/* istanbul ignore next */
	private _interpSystemError(err: SystemError): boolean {
		if (err?.code === "ENOENT") return false;
		throw new Error(err.message);
	}

	/**
	 * Asynchronously checks whether the filepath is a directory.
	 * @returns A `boolean` of whether this is a directory or not.
	 */
	async isDirectory() {
		try {
			return (await fse.stat(this.path)).isDirectory();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Synchronously checks whether the filepath is a directory.
	 * @returns A `boolean` of whether this is a directory or not.
	 */
	isDirectorySync() {
		try {
			return fse.statSync(this.path).isDirectory();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Asynchronously checks whether the filepath is a first-in-first-out queue.
	 * @returns A `boolean` of whether this is a first-in-first-out queue or not.
	 */
	async isFIFO() {
		try {
			return (await fse.stat(this.path)).isFIFO();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Synchronously checks whether the filepath is a first-in-first-out queue.
	 * @returns A `boolean` of whether this is a first-in-first-out queue or not.
	 */
	isFIFOSync() {
		try {
			return fse.statSync(this.path).isFIFO();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Asynchronously checks whether the filepath is a file.
	 * @returns A `boolean` of whether this is a file or not.
	 */
	async isFile() {
		try {
			return (await fse.stat(this.path)).isFile();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Synchronously checks whether the filepath is a file.
	 * @returns A `boolean` of whether this is a file or not.
	 */
	isFileSync() {
		try {
			return fse.statSync(this.path).isFile();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Asynchronously checks whether the filepath is a socket.
	 * @returns A `boolean` of whether this is a socket or not.
	 */
	async isSocket() {
		try {
			return (await fse.stat(this.path)).isSocket();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Synchronously checks whether the filepath is a socket.
	 * @returns A `boolean` of whether this is a socket or not.
	 */
	isSocketSync() {
		try {
			return fse.statSync(this.path).isSocket();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Asynchronously checks whether the filepath is a symlink.
	 * @returns A `boolean` of whether this is a symlink or not.
	 */
	async isSymbolicLink() {
		try {
			return (await fse.lstat(this.path)).isSymbolicLink();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Synchronously checks whether the filepath is a symlink.
	 * @returns A `boolean` of whether this is a symlink or not.
	 */
	isSymbolicLinkSync() {
		try {
			return fse.lstatSync(this.path).isSymbolicLink();
		} catch (_err) {
			return this._interpSystemError(_err as SystemError);
		}
	}

	/**
	 * Retrieves the parent directory or an earlier ancestor filepath.
	 * @param numIncrements The number of directory levels to ascend.
	 * - If this number exceeds number of ascentions required to reach the root directory, then the root directory itself is returned.
	 * - If this number is equal to or less than 0, it will return a copy of the current Path.
	 *
	 * Defaults to `undefined`, meaning that the immediate parent directory is returned.
	 * @returns The parent or higher ancestor (i.e grandparent) directory of this filepath as a `Path` instance.
	 * @example
	 * ```
	 * const fp = new Path("/home/jsmith/Documents/foo.txt");
	 * console.log(fp.parent(0).path); // Returns the same path
	 * >>> "/home/jsmith/Documents/foo.txt"
	 * console.log(fp.parent(1).path); // Returns the immediate parent
	 * >>> "/home/jsmith/Documents"
	 * console.log(fp.parent(2).path); // Returns the grandparent
	 * >>> "/home/jsmith"
	 * console.log(fp.parent(3).path);
	 * >>> "/home"
	 * console.log(fp.parent(4).path);
	 * >>> "/"
	 * console.log(fp.parent(5).path);
	 * >>> "/"
	 * console.log(fp.parent(9001).path); // Exceeding root, the root is returned
	 * >>> "/"
	 * console.log(fp.parent(-9001).path); // Negative numbers return the same path
	 * >>> "/home/jsmith/Documents/foo.txt"
	 * ```
	 */
	parent(numIncrements?: number): Path {
		if (numIncrements == null) return new Path(this.dirname);
		const parts = this.parts;
		return new Path(numIncrements >= parts.length ? this.root : parts.slice(0, parts.length - numIncrements).join("/"));
	}

	parents(): Path[] {
		// Return  in the order of closest to furthest
		return this.parts
			.map((_, i) => new Path(this.parts.slice(0, this.parts.length - i).join("/")))
			.filter((p) => p.path !== this.path);
	}

	/**
	 * Asynchronously determines whether a directory contains a given child filepath or basename.
	 * @param child The child filepath to look for within the underlying filepath. The following are accepted:
	 * - The basename of the child filepath as a string
	 * - The fullpath of the child filepath as a string
	 * - A Path instance of the child filepath
	 * @returns The located child as a `Path` instance or `false` if no child path could be found.
	 * @example
	 * ```js
	 * // In fp there exists a file called "foo.txt"
	 * const fp = new Path("/home/jsmith/Documents");
	 * const usingBasename = await fp.containsImmediateChild("foo.txt");
	 * const usingFullPath = await fp.containsImmediateChild("/home/jsmith/Documents/foo.txt");
	 * const usingPathInst = await fp.containsImmediateChild(fp.join("foo.txt"));
	 * usingBasename && console.log(usingBasename.path);
	 * >>> /home/jsmith/Documents/foo.txt
	 * usingFullPath && console.log(usingFullPath.path);
	 * >>> /home/jsmith/Documents/foo.txt
	 * usingPathInst && console.log(usingPathInst.path);
	 * >>> /home/jsmith/Documents/foo.txt
	 * console.log(await fp.containsImmediateChild("bar.json"));
	 * >>> false
	 * ```
	 */
	async containsImmediateChild(child: string | Path) {
		if (!(await this.isDirectory())) throw new Error("Cannot check the child of a path that is not a directory");
		if (typeof child === "string") {
			for await (const childPath of this.readDirIter()) {
				if (childPath.basename === child || childPath.path === child) return childPath;
			}
			return false;
		} else {
			for await (const childPath of this.readDirIter()) {
				if (childPath.path === child.path) return childPath;
			}
			return false;
		}
	}

	/**
	 * Synchronously determines whether a directory contains a given child filepath or basename.
	 * @param child The child filepath to look for within the underlying filepath. The following are accepted:
	 * - The basename of the child filepath as a string
	 * - The fullpath of the child filepath as a string
	 * - A Path instance of the child filepath
	 * @returns The located child as a `Path` instance or `false` if no child path could be found.
	 * @example
	 * ```js
	 * // In fp there exists a file called "foo.txt"
	 * const fp = new Path("/home/jsmith/Documents");
	 * const usingBasename = fp.containsImmediateChildSync("foo.txt");
	 * const usingFullPath = fp.containsImmediateChildSync("/home/jsmith/Documents/foo.txt");
	 * const usingPathInst = fp.containsImmediateChildSync(fp.join("foo.txt"));
	 * usingBasename && console.log(usingBasename.path);
	 * >>> /home/jsmith/Documents/foo.txt
	 * usingFullPath && console.log(usingFullPath.path);
	 * >>> /home/jsmith/Documents/foo.txt
	 * usingPathInst && console.log(usingPathInst.path);
	 * >>> /home/jsmith/Documents/foo.txt
	 * console.log(fp.containsImmediateChildSync("bar.json"));
	 * >>> false
	 * ```
	 */
	containsImmediateChildSync(child: string | Path) {
		if (!this.isDirectorySync()) throw new Error("Cannot check the child of a path that is not a directory");
		if (typeof child === "string") {
			for (const childPath of this.readDirIterSync()) {
				if (childPath.basename === child || childPath.path === child) return childPath;
			}
			return false;
		} else {
			for (const childPath of this.readDirIterSync()) {
				if (childPath.path === child.path) return childPath;
			}
			return false;
		}
	}

	// Private utility function for appending glob patterns to the underlying filepath.
	/* istanbul ignore next */
	private _prepGlobPatterns(patterns: string | string[]) {
		return Array.isArray(patterns)
			? patterns.map((pat) => [this.path, pat].join("/"))
			: [[this.path, patterns].join("/")];
	}

	/**
	 * Asynchronously globs for filepaths stemming from the Path instance.
	 * @param patterns A string or collection of strings representing glob patterns to search.
	 * @param options [fast-glob options](https://www.npmjs.com/package/fast-glob#api). By default:
	 * - `objectMode` is set to `false` and enforced
	 * - `stats` is set to `false` and enforced
	 * - `onlyDirectories` is set to `false`
	 * - `onlyFiles` is set to `false`
	 * - `dot` is set to `false`
	 * @returns An `Array` of globbed `Path` instances.
	 */
	async glob(patterns: string | string[], options?: GlobOptions) {
		// Merge defaults, user-input, and enforced-defaults
		options = Object.assign({ onlyDirectories: false, onlyFiles: false, dot: false }, options, {
			objectMode: false,
			stats: false,
		});
		const globs = await fg(this._prepGlobPatterns(patterns), options);
		return globs.map((p) => new Path(p));
	}

	/**
	 * Asynchronously glob for filepaths stemming from the Path instance while yielding them instead of returning
	 * an immediate array.
	 * @param patterns A string or collection of strings representing glob patterns to search.
	 * @param options [fast-glob options](https://www.npmjs.com/package/fast-glob#api). By default:
	 * - `objectMode` is set to `false` and enforced
	 * - `stats` is set to `false` and enforced
	 * - `onlyDirectories` is set to `false`
	 * - `onlyFiles` is set to `false`
	 * - `dot` is set to `false`
	 * @yields `Path` instances.
	 */
	async *globIter(patterns: string | string[], options?: GlobOptions) {
		// Merge defaults, user-input, and enforced-defaults
		options = Object.assign({ onlyDirectories: false, onlyFiles: false, dot: false }, options, {
			objectMode: false,
			stats: false,
		});
		for await (const fp of fg.stream(this._prepGlobPatterns(patterns), options)) {
			yield typeof fp === "string" ? new Path(fp) : new Path(fp.toString());
		}
	}

	/**
	 * Synchronously globs for filepaths stemming from the Path instance.
	 * @param patterns A string or collection of strings representing glob patterns to search.
	 * @param options [fast-glob options](https://www.npmjs.com/package/fast-glob#api). By default:
	 * - `objectMode` is set to `false` and enforced
	 * - `stats` is set to `false` and enforced
	 * - `onlyDirectories` is set to `false`
	 * - `onlyFiles` is set to `false`
	 * - `dot` is set to `false`
	 * @returns An `Array` of globbed `Path` instances.
	 */
	globSync(patterns: string | string[], options?: GlobOptions) {
		// Merge defaults, user-input, and enforced-defaults
		options = Object.assign({ onlyDirectories: false, onlyFiles: false, dot: false }, options, {
			objectMode: false,
			stats: false,
		});
		return fg.sync(this._prepGlobPatterns(patterns), options).map((p) => new Path(p));
	}

	/**
	 * Asynchronously collects the children of a directory path.
	 * @returns An `Array` of `Path` instances that are children of the current instance.
	 */
	async readDir() {
		return (await fse.readdir(this.path)).map((basename) => new Path(this.path, basename));
	}

	/**
	 * Synchronously collects the children of a directory path.
	 * @returns An `Array` of `Path` instances that are children of the current instance.
	 */
	readDirSync() {
		return fse.readdirSync(this.path).map((basename) => this.resolve(basename));
	}

	/**
	 * Asynchronously yields child filepaths.
	 * @yields A child `Path` instance.
	 */
	async *readDirIter() {
		for await (const dir of await fse.opendir(this.path)) {
			yield this.resolve(dir.name);
		}
	}

	/**
	 * Synchronously yields child filepaths.
	 * @yields A child `Path` instance.
	 */
	*readDirIterSync() {
		const iterator = fse.opendirSync(this.path);
		let filesLeft = true;
		while (filesLeft) {
			const fileDirent = iterator.readSync();
			if (fileDirent != null) {
				yield this.resolve(fileDirent.name);
			} else filesLeft = false;
		}
	}

	/**
	 * Retrieves filepaths located exactly N levels away from the underlying filepath.
	 * Utilizes globbing under the hood, thereby requiring glob options.
	 * @param depth The depth to retrieve filepaths from. Interpretation is as follows:
	 * - If greater than or equal to 1, will retrieve child/grandchild/etc. paths.
	 * - If equal to 0, will retrieve the current filepath and its siblings.
	 * - If less than 0, will retrieve parent/grandparent/etc paths.
	 * @param asIterator Whether the result should be an `AsyncIterator` of `Path` instances instead of an `Array` of them.
	 * Defaults to `false`.
	 * @param options Options governing the underlying globbing behavior that is used to retrieve the filepaths.
	 * Is based off [fast-glob's options](https://www.npmjs.com/package/fast-glob).
	 * By default, the following options are set if no options are provided:
	 * - `onlyFiles`: false
	 * - `onlyDirectories`: false
	 * - `dot`: false (filepaths with basenames starting with a dot are ignored)
	 * @returns Depends on the `asIterator` parameter:
	 * - if true, returns an `AsyncIterator` of `Path` instances
	 * - if false, returns an `Array` of `Path` instances
	 */
	async getPathsNLevelsAway(
		depth: number,
		asIterator?: true,
		options?: GlobOptions
	): Promise<AsyncGenerator<Path, void, unknown>>;
	async getPathsNLevelsAway(depth: number, asIterator?: false, options?: GlobOptions): Promise<Path[]>;
	async getPathsNLevelsAway(depth: number, asIterator: boolean = false, options?: GlobOptions) {
		// Sanity check; child globbing only makes sense if the underlying filepath is a directory
		if (depth > 1 && !(await this.isDirectory()))
			throw new Error(`Cannot retrieve downstream filepaths for non-directory filepaths`);
		options = Object.assign({ onlyFiles: false, onlyDirectories: false, dot: false }, options);

		// Child globbing
		if (depth > 0) {
			const globStar = [...Array(depth).keys()].map(() => "*", "").join("/");
			return asIterator ? this.globIter(globStar, options) : await this.glob(globStar, options);
		}
		// Parent globbing
		let targetParent = this.parent();
		depth += 1;
		while (depth < 1) {
			targetParent = targetParent.parent();
			depth += 1;
		}
		return asIterator ? targetParent.globIter("*", options) : await targetParent.glob("*", options);
	}

	/**
	 * Asynchronously traverses the tree structure of the directory system, starting from the current instance as the root and allows for callbacks to occur for each encountered filepath.
	 * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
	 */
	async walk(callback?: (fp: Path, ...args: unknown[]) => void) {
		async function walkStep(filepath: Path, callback?: (fp: Path, ...args: unknown[]) => void) {
			for await (const p of filepath.readDirIter()) {
				callback && callback(p);
				if (await p.isDirectory()) {
					await walkStep(p, callback);
				}
			}
		}
		await walkStep(this, callback);
	}

	/**
	 * Synchronously traverses the tree structure of the directory system, starting from the current instance as the root and allows for callbacks to occur for each encountered filepath.
	 * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
	 */
	walkSync(callback?: (fp: Path, ...args: unknown[]) => void) {
		function walkStep(filepath: Path, callback?: (fp: Path, ...args: unknown[]) => void) {
			for (const fp of filepath.readDirIterSync()) {
				callback && callback(fp);
				if (fp.isDirectorySync()) {
					walkStep(fp, callback);
				}
			}
		}
		walkStep(this, callback);
	}

	/**
	 * Asynchronously traverses the tree structure of the directory system, starting from the current instances as the root
	 * and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object
	 * with two properties: "filepath", which is the Path instance of the filepath at that location, and "children" which is
	 * either `null` in the case of a non-directory or an `Array` of more branch objects.
	 * @param asString Whether to convert the "filepath" property automatically to a string representation of the path instead.
	 * @returns A representation of the filepath tree structure.
	 */
	tree(asString?: true, useSystemPathDelimiter?: boolean): Promise<TreeBranch<string>>;
	tree(asString?: false, useSystemPathDelimiter?: boolean): Promise<TreeBranch<Path>>;
	tree(asString = false, useSystemPathDelimiter = false) {
		async function traverseBranch(branchRoot: Path, prevDepth: number): Promise<TreeBranch<string> | TreeBranch<Path>> {
			if (asString) {
				const branch: TreeBranch<string> = {
					filepath: branchRoot.toString(useSystemPathDelimiter),
					depth: prevDepth + 1,
					children: [],
				};
				for (const p of branchRoot.readDirIterSync()) {
					if (p.isDirectorySync()) {
						branch.children && branch.children.push((await traverseBranch(p, prevDepth + 1)) as TreeBranch<string>);
					} else {
						branch.children &&
							branch.children.push({
								filepath: p.toString(useSystemPathDelimiter),
								depth: prevDepth + 2,
								children: null,
							});
					}
				}
				return branch;
			} else {
				const branch: TreeBranch<Path> = {
					filepath: branchRoot as Path,
					depth: prevDepth + 1,
					children: [],
				};
				for (const p of branchRoot.readDirIterSync()) {
					if (p.isDirectorySync()) {
						branch.children &&
							branch.children.push((await traverseBranch(p, prevDepth + 1)) as unknown as TreeBranch<Path>);
					} else {
						branch.children &&
							branch.children.push({
								filepath: p,
								depth: prevDepth + 2,
								children: null,
							});
					}
				}
				return branch;
			}
		}
		return traverseBranch(this, -1);
	}

	/**
	 * Synchronously traverses the tree structure of the directory system, starting from the current instances as the root
	 * and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object
	 * with two properties: "filepath", which is the Path instance of the filepath at that location, and "children" which is
	 * either `null` in the case of a non-directory or an `Array` of more branch objects.
	 * @param asString Whether to convert the "filepath" property automatically to a string representation of the path instead.
	 * @returns A representation of the filepath tree structure.
	 */
	treeSync(asString?: true, useSystemPathDelimiter?: boolean): TreeBranch<string>;
	treeSync(asString?: false, useSystemPathDelimiter?: boolean): TreeBranch<Path>;
	treeSync(asString = false, useSystemPathDelimiter = false) {
		function traverseBranch(branchRoot: Path, prevDepth: number): TreeBranch<string> | TreeBranch<Path> {
			if (asString) {
				const branch: TreeBranch<string> = {
					filepath: branchRoot.toString(useSystemPathDelimiter),
					depth: prevDepth + 1,
					children: [],
				};
				for (const p of branchRoot.readDirIterSync()) {
					if (p.isDirectorySync()) {
						branch.children && branch.children.push(traverseBranch(p, prevDepth + 1) as TreeBranch<string>);
					} else {
						branch.children &&
							branch.children.push({
								filepath: p.toString(useSystemPathDelimiter),
								depth: prevDepth + 2,
								children: null,
							});
					}
				}
				return branch;
			} else {
				const branch: TreeBranch<Path> = {
					filepath: branchRoot as Path,
					depth: prevDepth + 1,
					children: [],
				};
				for (const p of branchRoot.readDirIterSync()) {
					if (p.isDirectorySync()) {
						branch.children && branch.children.push(traverseBranch(p, prevDepth + 1) as unknown as TreeBranch<Path>);
					} else {
						branch.children &&
							branch.children.push({
								filepath: p,
								depth: prevDepth + 2,
								children: null,
							});
					}
				}
				return branch;
			}
		}
		return traverseBranch(this, -1);
	}

	/**
	 * Asynchronously creates a new directory, including intermediate parental components.
	 * @param mode An octal number (ex. 0o511) representing of the new filepath permissions to impart.
	 * Defaults to 0o777.
	 * @param throwErrOnFail Whether to rethrow any generated error. Defaults to `false`.
	 * @return Returns `false` if `throwErrOnFail` is `false` and an error is encountered while making the directory path.
	 * Otherwise, returns the `Path` instance that called this method.
	 */
	async makeDir(mode = 0o777, throwErrOnFail = false) {
		if (this.suffixes.length) throw new Error("Cannot use makeDir on a file-like type");
		try {
			await fse.ensureDir(this.path, mode);
		} catch (error) {
			if (throwErrOnFail) throw error;
			return false;
		}
		return this;
	}

	/**
	 * Synchronously creates a new directory, including intermediate parental components.
	 * @param mode An octal number (ex. 0o511) representing of the new filepath permissions to impart.
	 * Defaults to 0o777.
	 * @param throwErrOnFail Whether to rethrow any generated error. Defaults to `false`.
	 * @return Returns `false` if `throwErrOnFail` is `false` and an error is encountered while making the directory path.
	 * Otherwise, returns the `Path` instance that called this method.
	 */
	makeDirSync(mode = 0o777, throwErrOnFail = false) {
		if (this.suffixes.length) throw new Error("Cannot use makeDir on a file-like type");
		try {
			fse.ensureDirSync(this.path, mode);
		} catch (error) {
			if (throwErrOnFail) throw error;
			return false;
		}
		return this;
	}

	/**
	 * Asynchronously creates a new file, including intermediate parental components.
	 * @param throwErrOnFail Whether to rethrow any generated error. Defaults to `false`.
	 * @return Returns `false` if `throwErrOnFail` is `false` and an error is encountered while making the file path.
	 * Otherwise, returns the `Path` instance that called this method.
	 */
	async makeFile(throwErrOnFail = false) {
		if (!this.suffixes.length) throw new Error("Cannot use makeFile on a directory-like type");
		try {
			await fse.ensureFile(this.path);
		} catch (error) {
			if (throwErrOnFail) throw error;
			return false;
		}
		return this;
	}

	/**
	 * Synchronously creates a new file, including intermediate parental components.
	 * @param throwErrOnFail Whether to rethrow any generated error. Defaults to `false`.
	 * @return Returns `false` if `throwErrOnFail` is `false` and an error is encountered while making the file path.
	 * Otherwise, returns the `Path` instance that called this method.
	 */
	makeFileSync(throwErrOnFail = false) {
		if (!this.suffixes.length) throw new Error("Cannot use makeFile on a directory-like type");
		try {
			fse.ensureFileSync(this.path);
		} catch (error) {
			if (throwErrOnFail) throw error;
			return false;
		}
		return this;
	}

	/* istanbul ignore next */
	private _interpPossibleRelativePath(target: string | Path, interpRelativeSource?: "cwd" | "path") {
		// If the target is already a Path instance, return it, resolving it if necessary
		if (typeof target !== "string") {
			return target.resolve();
		}

		// If the interpRelativeSource is "cwd", resolve the target relative to the current working directory
		if (interpRelativeSource === "cwd") {
			return new Path(path.resolve(process.cwd(), target));
		}

		// If the interpRelativeSource is "path" and the target is not absolute, resolve it relative to the current instance
		if (interpRelativeSource === "path" && !path.isAbsolute(target)) {
			// If this instance is a directory, use resolve()
			if (this.isDirectorySync()) {
				return this.resolve(target);
			}
			// Otherwise, use resolve() on the parent directory
			return this.parent().resolve(target);
		}

		// Otherwise, return the target as a Path instance
		return new Path(target);
	}

	/* istanbul ignore next */
	private _inferWindowsSymlinkType(target: Path) {
		if (target.isDirectorySync()) {
			return "dir";
		} else if (target.isFileSync()) {
			return "file";
		} else {
			throw new Error("Cannot create symlink to a filepath that is neither file nor directory.");
		}
	}

	/**
	 * Asynchronously creates a symlink. Either:
	 * - links the underlying filepath to a target symlink that is created (default)
	 * OR
	 * - has a the underlying filepath interpreted as the symlink to be created when linking to some target path.
	 * @param target The corresponding target filepath that a symlink should be made to OR that is a symlink linking to the underlying filepath.
	 * @param options {@link SymlinkOptions} controlling the operation of this function. By default:
	 * - `targetIsLink` is `true` (the path in the `target` parameter is assumed to be the symlink to be made)
	 * - `type` is `undefined`(on Windows, the type of symlink to make will be inferred)
	 * - `interpRelativeSource` is `"cwd"`, meaning that a relative `target` string will be resolved relative to
	 * the current working directory.
	 * @returns The filepath outlined in `target` as a `Path` instance.
	 */
	async makeSymlink(target: string | Path, options?: SymlinkOptions) {
		const defaultOptions: SymlinkOptions = { targetIsLink: true, interpRelativeSource: "cwd", type: undefined };
		const updatedOptions = options == null ? defaultOptions : Object.assign(defaultOptions, options);
		const targetPath = this._interpPossibleRelativePath(target, updatedOptions?.interpRelativeSource);
		if (platform() === "win32") {
			if (updatedOptions?.targetIsLink) {
				const linkType = updatedOptions.type ? updatedOptions.type : this._inferWindowsSymlinkType(this);
				if (!(await this.exists())) {
					throw new Error(
						"The underlying source filepath does not exist. Cannot create a symlink if the source does not exist."
					);
				}
				await fse.ensureSymlink(this.path, targetPath.path, linkType);
			} else {
				const linkType = updatedOptions.type ?? this._inferWindowsSymlinkType(targetPath);
				if (!(await targetPath.exists())) {
					throw new Error("The target filepath does not exist. Cannot create a symlink if the target does not exist.");
				}
				await fse.ensureSymlink(targetPath.path, this.path, linkType);
			}
		} else {
			if (updatedOptions.targetIsLink) {
				if (!(await this.exists())) {
					throw new Error(
						"The underlying source filepath does not exist. Cannot create a symlink if the source does not exist."
					);
				}
				await fse.ensureSymlink(this.path, targetPath.path);
			} else {
				if (!(await targetPath.exists())) {
					throw new Error("The target filepath does not exist. Cannot create a symlink if the target does not exist.");
				}
				await fse.ensureSymlink(targetPath.path, this.path);
			}
		}
		return targetPath;
	}

	/**
	 * Synchronously creates a symlink. Either:
	 * - links the underlying filepath to a target symlink that is created (default)
	 * OR
	 * - has a the underlying filepath interpreted as the symlink to be created when linking to some target path.
	 * @param target The corresponding target filepath that a symlink should be made to OR that is a symlink linking to the underlying filepath.
	 * @param options  {@link SymlinkOptions} controlling the operation of this function. By default:
	 * - `targetIsLink` is `true` (the path in the `target` parameter is assumed to be the symlink to be made)
	 * - `type` is `undefined`(on Windows, the type of symlink to make will be inferred)
	 * - `interpRelativeSource` is `"cwd"`, meaning that a relative `target` string will be resolved relative to
	 * the current working directory.
	 * @returns The filepath outlined in `target` as a `Path` instance.
	 */
	makeSymlinkSync(target: string | Path, options?: SymlinkOptions) {
		const defaultOptions: SymlinkOptions = { targetIsLink: true, interpRelativeSource: "cwd", type: undefined };
		const updatedOptions = options == null ? defaultOptions : Object.assign(defaultOptions, options);
		const targetPath = this._interpPossibleRelativePath(target, updatedOptions?.interpRelativeSource);
		if (platform() === "win32") {
			if (updatedOptions?.targetIsLink) {
				const linkType = updatedOptions.type ? updatedOptions.type : this._inferWindowsSymlinkType(this);
				if (!this.existsSync()) {
					throw new Error(
						"The underlying source filepath does not exist. Cannot create a symlink if the source does not exist."
					);
				}
				fse.ensureSymlinkSync(this.path, targetPath.path, linkType);
			} else {
				const linkType = updatedOptions.type ?? this._inferWindowsSymlinkType(targetPath);
				if (!targetPath.existsSync()) {
					throw new Error("The target filepath does not exist. Cannot create a symlink if the target does not exist.");
				}
				fse.ensureSymlinkSync(targetPath.path, this.path, linkType);
			}
		} else {
			if (updatedOptions.targetIsLink) {
				if (!this.existsSync()) {
					throw new Error(
						"The underlying source filepath does not exist. Cannot create a symlink if the source does not exist."
					);
				}
				fse.ensureSymlinkSync(this.path, targetPath.path);
			} else {
				if (!targetPath.existsSync()) {
					throw new Error("The target filepath does not exist. Cannot create a symlink if the target does not exist.");
				}
				fse.ensureSymlinkSync(targetPath.path, this.path);
			}
		}
		return targetPath;
	}

	/**
	 * Asynchronously tests a user's permissions for the underling filepath.
	 * @param mode the permissions to check for. Use fs.constants variables as input, NOT octal numbers.
	 * Defaults to `undefined`, resulting in checking for read, write, and execute permissions.
	 * @returns If mode was specified, a `boolean` reflecting the permissions.
	 * Otherwise, returns an `Object` with keys "canRead", "canWrite", "canExecute" and values as a boolean of whether
	 * permissions for that operation are available.
	 */
	async access(mode: number): Promise<boolean>;
	async access(mode?: undefined): Promise<AccessResult>;
	async access(mode?: number): Promise<AccessResult | boolean> {
		if (typeof mode === "number") {
			try {
				await fse.access(this.path, mode);
				return true;
			} catch (error) {
				return false;
			}
		}

		const accessArr = [fse.constants.R_OK, fse.constants.W_OK, fse.constants.X_OK];
		const resultArr = [];
		for (const check of accessArr) {
			try {
				await fse.access(this.path, check);
				resultArr.push(true);
			} catch (error) {
				resultArr.push(false);
			}
		}
		return Object.fromEntries([
			["canRead", resultArr[0]],
			["canWrite", resultArr[1]],
			["canExecute", resultArr[2]],
		]) as unknown as AccessResult;
	}

	/**
	 * Synchronously tests a user's permissions for the underling filepath.
	 * @param mode the permissions to check for. Use fs.constants variables as input, NOT octal numbers.
	 * Defaults to `undefined`, resulting in checking for read, write, and execute permissions.
	 * @returns If mode was specified, a `boolean` reflecting the permissions.
	 * Otherwise, returns an `Object` with keys "canRead", "canWrite", "canExecute" and values as a boolean of whether
	 * permissions for that operation are available.
	 */
	accessSync(mode: number): boolean;
	accessSync(mode?: undefined): AccessResult;
	accessSync(mode?: number): AccessResult | boolean {
		if (typeof mode === "number") {
			try {
				fse.accessSync(this.path, mode);
				return true;
			} catch (error) {
				return false;
			}
		}

		const accessArr = [fse.constants.R_OK, fse.constants.W_OK, fse.constants.X_OK];
		const resultArr = [];
		for (const check of accessArr) {
			try {
				fse.accessSync(this.path, check);
				resultArr.push(true);
			} catch (error) {
				resultArr.push(false);
			}
		}
		return Object.fromEntries([
			["canRead", resultArr[0]],
			["canWrite", resultArr[1]],
			["canExecute", resultArr[2]],
		]) as unknown as AccessResult;
	}

	/**
	 * Asynchronously changes the permissions of the underlying filepath.
	 * * Caveats: on Windows only the write permission can be changed, and the distinction
	 * among the permissions of group, owner or others is not implemented.
	 * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511) representation of the new filepath permissions.
	 * @returns Returns the `Path` instance that called this method.
	 */
	async chmod(mode: string | number) {
		await fse.chmod(this.path, mode);
		return this;
	}

	/**
	 * Synchronously changes the permissions of the underlying filepath.
	 * * Caveats: on Windows only the write permission can be changed, and the distinction
	 * among the permissions of group, owner or others is not implemented.
	 * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511) representation of the new filepath permissions.
	 * @returns Returns the `Path` instance that called this method.
	 */
	chmodSync(mode: string | number) {
		fse.chmodSync(this.path, mode);
		return this;
	}

	/**
	 * Asynchronously changes the ownership of the underlying filepath.
	 * @param uid User id.
	 * @param gid Group id.
	 * @returns Returns the `Path` instance that called this method.
	 */
	async chown(uid: number, gid: number) {
		await fse.chown(this.path, uid, gid);
		return this;
	}

	/**
	 * Synchronously changes the ownership of the underlying filepath.
	 * @param uid User id.
	 * @param gid Group id.
	 * @returns Returns the `Path` instance that called this method.
	 */
	chownSync(uid: number, gid: number) {
		fse.chownSync(this.path, uid, gid);
		return this;
	}

	/**
	 * Asynchronously moves the underlying filepath to the indicated destination.
	 * @param dst The filepath destination to where the underlying path should be moved.
	 * - If the instance is a **directory**, the children of the directory will be moved to this location.
	 * - If the instance is a **file**, it itself will be moved to the new location.
	 * @param options {@link MoveOptions} By default:
	 * - `overwrite` is set to `true`
	 * - `interpRelativeSource` is set to `undefined` (relative paths will be resolved relative to the current working directory)
	 * @returns Returns the destination filepath as a `Path` instance.
	 */
	async move(dst: string | Path, options?: MoveOptions) {
		const dest = this._interpPossibleRelativePath(dst, options?.interpRelativeSource);
		await fse.move(this.path, dest.path, options ?? { overwrite: false });
		return dest;
	}

	/**
	 * Synchronously moves the underlying filepath to the indicated destination.
	 * @param dst The filepath destination to where the underlying path should be moved.
	 * - If the instance is a **directory**, the children of the directory will be moved to this location.
	 * - If the instance is a **file**, it itself will be moved to the new location.
	 * @param options {@link MoveOptions} By default:
	 * - `overwrite` is set to `true`
	 * - `interRelativeSource` is set to `undefined` (relative paths will be resolved relative to the current working directory)
	 * @returns Returns the destination filepath as a `Path` instance.
	 */
	moveSync(dst: string | Path, options?: MoveOptions) {
		const dest = this._interpPossibleRelativePath(dst, options?.interpRelativeSource);
		fse.moveSync(this.path, dest.path, options ?? { overwrite: false });
		return dest;
	}

	/**
	 * Asynchronously copies the underlying filepath to the indicated destination.
	 * @param dst The filepath destination to where the underlying path should be copied.
	 * - If the instance is a **directory**, the children of the directory will be copied to this location.
	 * - If the instance is a **file**, it itself will be copied to the new location.
	 * @param options {@link CopyOptions} controlling the copy operation.
	 * @returns The destination filepath as a `Path` instance.
	 */
	async copy(dst: string | Path, options?: CopyOptions) {
		const dest = this._interpPossibleRelativePath(dst, options?.interpRelativeSource);
		await fse.copy(this.path, dest.path, options);
		return dest;
	}

	/**
	 * Synchronously copies the underlying filepath to the indicated destination.
	 * @param dst The filepath destination to where the underlying path should be copied.
	 * - If the instance is a **directory**, the children of the directory will be copied to this location.
	 * - If the instance is a **file**, it itself will be copied to the new location.
	 * @param options {@link CopyOptions} By default:
	 * - `overwrite` is set to `true`
	 * - `errorOnExist` is set to `false`
	 * - `dereference` is set to `false
	 * - `preserveTimestamps` is set to `false`
	 * - `interRelativeSource` is set to `undefined` (relative paths will be resolved relative to the current working directory)
	 */
	copySync(dst: string | Path, options?: CopyOptionsSync) {
		const dest = this._interpPossibleRelativePath(dst, options?.interpRelativeSource);
		fse.copySync(this.path, dest.path, options);
		return dest;
	}

	/**
	 * Asynchronously deletes the underlying filepath.
	 */
	async remove() {
		await fse.remove(this.path);
	}

	/**
	 * Alias for `remove()`. Asynchronously deletes the underlying filepath.
	 */
	async unlink() {
		await fse.remove(this.path);
	}

	/**
	 * Alias for `remove()`. Asynchronously deletes the underlying filepath.
	 */
	async delete() {
		await fse.remove(this.path);
	}

	/**
	 * Synchronously deletes the underlying filepath.
	 */
	removeSync() {
		fse.removeSync(this.path);
	}

	/**
	 * Alias for `removeSync()`. Synchronously deletes the underlying filepath.
	 */
	unlinkSync() {
		fse.removeSync(this.path);
	}

	/**
	 * Alias for `removeSync()`. Synchronously deletes the underlying filepath.
	 */
	deleteSync() {
		fse.removeSync(this.path);
	}

	/**
	 * Asynchronously opens a file and returns its file descriptor.
	 * @param openOptions {@link OpenFileOptions} - Options controlling the behavior of the file opening operation.
	 * @returns The numeric file descriptor.
	 */
	async open(openOptions: OpenFileOptions) {
		// Check if the file is already open
		if (this.descriptor != null) throw new Error("Detected that this filepath is already open.");
		// Check that the filepath is not a directory
		if (await this.isDirectory()) throw new Error("Cannot open a directory.");
		// Ensure that the file exists
		if (openOptions.ensureExists && this.suffixes.length && !(await this.isFile())) await this.makeFile();
		// Open the file and re-assign the descriptor to the Path instance
		this.descriptor = await fse.open(this.path, openOptions.flags, openOptions.mode);
		return this.descriptor;
	}

	/**
	 * Synchronously opens a file and returns its file descriptor.
	 * @param openOptions {@link OpenFileOptions} - Options controlling the behavior of the file opening operation.
	 * @returns The numeric file descriptor.
	 */
	openSync(openOptions: OpenFileOptions) {
		// Check if the file is already open
		if (this.descriptor != null) throw new Error("Detected that this filepath is already open.");
		// Check that the filepath is not a directory
		if (this.isDirectorySync()) throw new Error("Cannot open a directory.");
		// Ensure that the file exists
		if (openOptions.ensureExists && this.suffixes.length && !this.isFileSync()) this.makeFileSync();
		// Open the file and re-assign the descriptor to the Path instance
		this.descriptor = fse.openSync(this.path, openOptions.flags, openOptions.mode);
		return this.descriptor;
	}

	async close() {
		if (this.descriptor == null) throw new Error("Cannot close a file that has not been opened.");
		await fse.close(this.descriptor);
		this.descriptor = null;
	}

	closeSync() {
		if (this.descriptor == null) throw new Error("Cannot close a file that has not been opened.");
		fse.closeSync(this.descriptor);
		this.descriptor = null;
	}

	/**
	 * Asynchronously reads a portion of the data from the underlying file.
	 * @param buffer The Buffer that the data will be written to.
	 * @param offset The position in buffer to write the data to.
	 * @param length The number of bytes to read.
	 * @param position Specifies where to begin reading from in the file.
	 * If position is null or -1 , data will be read from the current file position, and the file position will be updated.
	 * If position is an integer, the file position will be unchanged.
	 * @param closeAfterwards Whether to close the file after the operation completes. Defaults to true.
	 * @param openOptions {@link OpenFileOptions} - Options controlling the behavior of the file opening operation.
	 * Defaults:
	 * - `flags` is set to `"r"`
	 * - `mode` is set to `undefined`
	 * @returns An object with the properties of buffer, which is the updated buffer, and bytesRead, which is the number of
	 * bytes that were read from the file.
	 */
	async read(
		buffer: Buffer,
		offset: number,
		length: number,
		position: number | null,
		closeAfterwards = true,
		openOptions?: OpenFileOptions
	) {
		if (this.descriptor == null) await this.open(openOptions ?? { flags: "r" });
		if (this.descriptor == null) throw new Error("File descriptor is null");
		const readResult = await fse.read(this.descriptor, buffer, offset, length, position);
		closeAfterwards && (await this.close());
		return { ...readResult, fileDescriptor: closeAfterwards ? null : this.descriptor };
	}

	/**
	 * Synchronously reads a portion of the data from the underlying file.
	 * @param buffer The Buffer that the data will be written to.
	 * @param offset The position in buffer to write the data to.
	 * @param length The number of bytes to read.
	 * @param position Specifies where to begin reading from in the file.
	 * @param closeAfterwards Whether to close the file after the operation completes. Defaults to true.
	 * If position is null or -1 , data will be read from the current file position, and the file position will be updated.
	 * If position is an integer, the file position will be unchanged.
	 * @param openOptions {@link OpenFileOptions} - Options controlling the behavior of the file opening operation.
	 * Defaults:
	 * - `flags` is set to `"r"`
	 * - `mode` is set to `undefined`
	 * @returns The number of bytes read.
	 */
	readSync(
		buffer: Buffer,
		offset: number,
		length: number,
		position: number | null,
		closeAfterwards = true,
		openOptions?: OpenFileOptions
	) {
		if (this.descriptor == null) this.openSync(openOptions ?? { flags: "r" });
		if (this.descriptor == null) throw new Error("File descriptor is null");
		const readResult = fse.readSync(this.descriptor, buffer, offset, length, position);
		closeAfterwards && this.closeSync();
		return { bytesRead: readResult, fileDescriptor: closeAfterwards ? null : this.descriptor };
	}

	/**
	 * Asynchronously writes buffer-like data into the underlying file.
	 * @param buffer the Buffer which should be written into the underlying file.
	 * @param offset The position in the buffer from which to begin writing
	 * @param length The number of bytes to write.
	 * @param position Specifies where to begin writing into the file.
	 * @param closeAfterwards Whether to close the file after the operation completes. Defaults to `true`.
	 * @param openOptions {@link OpenFileOptions} - Options controlling the behavior of the file opening operation.
	 * Defaults:
	 * - `flags` is set to `"w"`
	 * - `mode` is set to `undefined`
	 */
	async write<TBuffer extends NodeJS.TypedArray | DataView>(
		buffer: TBuffer,
		offset?: number,
		length?: number,
		position?: number | null,
		closeAfterwards = true,
		openOptions?: OpenFileOptions
	) {
		if (this.descriptor == null) await this.open(openOptions ?? { flags: "w" });
		if (this.descriptor == null) throw new Error("File descriptor is null");
		const writeResult = await fse.write(this.descriptor, buffer, offset, length, position);
		closeAfterwards && (await this.close());
		return { ...writeResult, fileDescriptor: this.descriptor };
	}

	/**
	 * Synchronously writes buffer-like data into the underlying file.
	 * @param buffer the Buffer which should be written into the underlying file.
	 * @param offset The position in the buffer from which to begin writing
	 * @param length The number of bytes to write.
	 * @param position Specifies where to begin writing into the file.
	 * @param closeAfterwards Whether to close the file after the operation completes. Defaults to `true`.
	 * @param openOptions {@link OpenFileOptions} - Options controlling the behavior of the file opening operation.
	 * Defaults:
	 * - `flags` is set to `"w"`
	 * - `mode` is set to `undefined`
	 */
	writeSync<TBuffer extends NodeJS.TypedArray | DataView>(
		buffer: TBuffer,
		offset?: number,
		length?: number,
		position?: number | null,
		closeAfterwards = true,
		openOptions?: OpenFileOptions
	) {
		if (this.descriptor == null) this.openSync(openOptions ?? { flags: "w" });
		const writeResult = fse.writeSync(this.descriptor as number, buffer, offset, length, position);
		closeAfterwards && this.closeSync();
		return { bytesWritten: writeResult, fileDescriptor: this.descriptor };
	}

	/**
	 * Asynchronously parses data coming from a file.
	 * @param options {@link ReadFileOptions} - Options controlling the behavior of the file reading operation.
	 * Defaults:
	 * - `encoding` is set to `"utf8"`
	 * - `flag` is set to `"r"`
	 * @returns The contents of the file either as a decoded `string` or as a `Buffer` if no encoding was provided.
	 */
	async readFile(options: { encoding: BufferEncoding; flag?: string }): Promise<string>;
	async readFile(encoding: BufferEncoding): Promise<string>;
	async readFile(): Promise<Buffer>;
	async readFile(arg1?: { encoding: BufferEncoding; flag?: string } | BufferEncoding, arg2?: any) {
		if (typeof arg1 === "function" || typeof arg2 === "function") {
			throw new Error("This method does not support callback syntax");
		}
		if (!arg1 || typeof arg1 === "undefined") {
			return fse.readFile(this.path);
		}
		if (typeof arg1 === "string") {
			return fse.readFile(this.path, arg1);
		}
		if (typeof arg1 === "object" && "encoding" in arg1) {
			return fse.readFile(this.path, arg1);
		}
	}

	/**
	 * Synchronously parses data coming from a file.
	 * @param options {@link ReadFileOptions} - Options controlling the behavior of the file reading operation.
	 * Defaults:
	 * - `encoding` is set to `"utf8"`
	 * - `flag` is set to `"r"`
	 * @returns The contents of the file either as a decoded `string` or as a `Buffer` if no encoding was provided.
	 */
	readFileSync(options: ReadFileOptions): string;
	readFileSync(encoding: BufferEncoding): string;
	readFileSync(): Buffer;
	readFileSync(arg1?: ReadFileOptions | BufferEncoding, arg2?: any) {
		if (typeof arg1 === "function" || typeof arg2 === "function") {
			throw new Error("This method does not support callback syntax");
		}
		if (!arg1 || typeof arg1 === "undefined") {
			return fse.readFileSync(this.path);
		}
		if (typeof arg1 === "string") {
			return fse.readFileSync(this.path, arg1);
		}
		if (typeof arg1 === "object" && "encoding" in arg1) {
			return fse.readFileSync(this.path, arg1);
		}
	}

	/**
	 * Asynchronously writes data to the underlying filepath.
	 * @param data The data to write to the file.
	 * @param options {@link WriteFileOptions} - Options controlling the behavior of the file writing operation.
	 * Defaults:
	 * - `mode` is set to `0o666`
	 * - `flag` is set to `"w"`
	 * @returns Returns the Path instance that called this method
	 */
	async writeFile(data: string | Buffer | Uint8Array, options?: WriteFileOptions) {
		await fse.outputFile(this.path, data, options);
		return this;
	}

	/**
	 * Synchronously writes data to the underlying filepath.
	 * @param data The data to write to the file.
	 * @param options {@link WriteFileOptions} - Options controlling the behavior of the file writing operation.
	 * Defaults:
	 * - `mode` is set to `0o666`
	 * - `flag` is set to `"w"`
	 * @returns Returns the Path instance that called this method
	 */
	writeFileSync(data: string | Buffer | Uint8Array, options?: fse.WriteFileOptions) {
		fse.outputFileSync(this.path, data, options);
		return this;
	}

	/**
	 * Asynchronously reads in the underlying filepath JSON file and parses it into a JSON object.
	 * @param options {@link JSONReadOptions} - Options controlling the behavior of the file reading operation.
	 * Defaults:
	 * - `encoding` is set to `null`
	 * - `flag` is set to `"r"`
	 * @returns A JSON object.
	 */
	async readJSON(options?: JSONReadOptions): Promise<JSONObject> {
		if (!(await this.isFile()) || this.ext !== ".json")
			throw new Error("Cannot read JSON from a non-JSON filepath or a non-existent filepath");
		return await fse.readJSON(this.path, options);
	}

	/**
	 * Synchronously reads in the underlying filepath JSON file and parses it into a JSON object.
	 * @param options {@link JSONReadOptions} - Options controlling the behavior of the file reading operation.
	 * Defaults:
	 * - `encoding` is set to `null`
	 * - `flag` is set to `"r"`
	 * @returns A JSON object.
	 */
	readJSONSync(options?: JSONReadOptions) {
		if (!this.isFileSync() || this.ext !== ".json")
			throw new Error("Cannot read JSON from a non-JSON filepath or a non-existent filepath");
		return fse.readJSONSync(this.path, options);
	}

	/**
	 * Asynchronously write a JSON-compatible object to a .json file.
	 * @param data A JSON-compatible object to write into the file.
	 * @param options {@link JSONWriteOptions} - Options controlling the behavior of the file writing operation.
	 * @returns Returns the Path instance which called this method.
	 */
	async writeJSON(data: JSONObject, options?: JSONWriteOptions) {
		if (this.ext !== ".json") throw new Error("Cannot write a JSON object to a non-JSON filepath");
		await fse.outputJson(this.path, data, options);
		return this;
	}

	/**
	 * Synchronously write a JSON-compatible object to a .json file.
	 * @param data A JSON-compatible object to write into the file.
	 * @param options {@link JSONWriteOptions} - Options controlling the behavior of the file writing operation.
	 * @returns Returns the Path instance which called this method.
	 */
	writeJSONSync(data: JSONObject, options?: JSONWriteOptions) {
		if (this.ext !== ".json") throw new Error("Cannot write a JSON object to a non-JSON filepath");
		fse.outputJsonSync(this.path, data, options);
		return this;
	}
	/**
	 * Asynchronously creates a temporary file or directory. Used with the `await using` TypeScript pattern.
	 * If the filepath already exists, then no action is taken.
	 * @param options {@link TempFilepathOptions} controlling the behavior of the temporary file or directory.
	 * @returns A Promise which resolves to an `AsyncDisposable` instance that will delete the temporary file or directory
	 * when scope is lost.
	 * @example
	 * ```typescript
	 * import { Path } from "path";
	 * import { tmpdir } from "os";
	 *
	 * const tmpPath = new Path(tmpdir(), "tempfile.txt");
	 * console.log(await tmpPath.exists()); // false
	 * {
	 *   await using disposable = await tmpPath.tmp();
	 *   console.log(await tmpPath.exists()); // true
	 * }
	 * console.log(await tmpPath.exists()); // false
	 * ```
	 */
	async tmp(options?: TempFilepathOptions): Promise<AsyncDisposable> {
		const _options: TempFilepathOptions = { ...{ noExtensionIsFile: false }, ...options };

		// Find the earliest non-existent filepath; this is the part of the filepath that should be deleted
		// when the user is done with the temporary file or directory
		let earliestNonExistentPart: null | Path = null;
		if (!(await this.exists())) {
			earliestNonExistentPart = this;
		}

		for (const path of this.parents()) {
			if (await path.exists()) {
				break;
			}
			earliestNonExistentPart = path;
		}

		// Short-circuit if all parts of the filepath exist and return a no-op disposable
		if (earliestNonExistentPart == null) {
			return {
				[Symbol.asyncDispose]: async () => {},
			};
		}

		// If the file has no extension, it is assumed to be a directory, unless the user specifies otherwise
		if (this.suffixes.length === 0 && !_options.noExtensionIsFile) {
			await fse.ensureDir(this.path);
		} else {
			await fse.ensureFile(this.path);
		}
		// If the filepath did not exist before, then it should be deleted at the earliest non-existent parent
		return {
			[Symbol.asyncDispose]: async () => {
				if (earliestNonExistentPart != null) {
					await fse.remove(earliestNonExistentPart.path);
				}
			},
		};
	}

	/**
	 * Synchronously creates a temporary file or directory. Used with the `using` TypeScript pattern.
	 * If the filepath already exists, then no action is taken.
	 * @param options {@link TempFilepathOptions} controlling the behavior of the temporary file or directory.
	 * @returns A `Disposable` instance that will delete the temporary file or directory when scope is lost.
	 * @example
	 * ```typescript
	 * import { Path } from "path";
	 * import { tmpdir } from "os";
	 *
	 * const tmpPath = new Path(tmpdir(), "tempfile.txt");
	 * console.log(tmpPath.existsSync()); // false
	 * {
	 *   using disposable = tmpPath.tmpSync()
	 *   console.log(tmpPath.existsSync()); // true
	 * }
	 * console.log(tmpPath.existsSync()); // false
	 * ```
	 */
	tmpSync(options?: TempFilepathOptions): Disposable {
		const _options: TempFilepathOptions = { ...{ noExtensionIsFile: false }, ...options };

		// Find the earliest non-existent filepath; this is the part of the filepath that should be deleted
		// when the user is done with the temporary file or directory
		let earliestNonExistentPart: null | Path = null;
		if (!this.existsSync()) {
			earliestNonExistentPart = this;
		}
		for (const path of this.parents()) {
			if (path.existsSync()) {
				break;
			}
			earliestNonExistentPart = path;
		}

		// Short-circuit if all parts of the filepath exist and return a no-op disposable
		if (earliestNonExistentPart == null) {
			return {
				[Symbol.dispose]: () => {},
			};
		}

		// If the file has no extension, it is assumed to be a directory, unless the user specifies otherwise
		if (this.suffixes.length === 0 && !_options.noExtensionIsFile) {
			fse.ensureDirSync(this.path);
		} else {
			fse.ensureFileSync(this.path);
		}

		// If the filepath did not exist before, then it should be deleted after the user is done with it
		return {
			[Symbol.dispose]: () => {
				if (earliestNonExistentPart != null) {
					fse.removeSync(earliestNonExistentPart.path);
				}
			},
		};
	}

	/**
	 * Wrapper around implementing a Chokidar watcher on the underlying filepath.
	 */
	watch(options?: ChokidarOptions, waitUntilReady?: false): PathWatcher;
	watch(options?: ChokidarOptions, waitUntilReady?: true): Promise<PathWatcher>;
	watch(options?: ChokidarOptions, waitUntilReady: boolean = true) {
		if (waitUntilReady) {
			return new Promise((resolve) => {
				const watcher = new PathWatcher(options);
				watcher.add(this);
				watcher.on("ready", () => {
					resolve(watcher);
				});
			});
		} else {
			const watcher = new PathWatcher(options);
			watcher.add(this);
			return watcher;
		}
	}
}

/**
 * Wrapper class around chokidar's `FSWatcher`.
 */
export class PathWatcher {
	private _watcher: FSWatcher;

	constructor(options?: ChokidarOptions) {
		this._watcher = new chokidar.FSWatcher(Object.assign({ ignoreInitial: true }, options, { cwd: null }));
	}

	/* istanbul ignore next */
	private _handlePaths(paths: string | Path | ReadonlyArray<string> | ReadonlyArray<Path>) {
		return typeof paths === "string"
			? paths
			: paths instanceof Path
			? paths.path
			: paths.map((p) => (p instanceof Path ? p.path : p));
	}

	add(paths: string | Path | ReadonlyArray<string> | ReadonlyArray<Path>) {
		return this._watcher.add(this._handlePaths(paths));
	}

	unwatch(paths: string | Path | ReadonlyArray<string> | ReadonlyArray<Path>) {
		return this._watcher.unwatch(this._handlePaths(paths));
	}

	close(): Promise<void> {
		return this._watcher.close();
	}

	getWatched() {
		return Object.fromEntries(
			Object.entries(this._watcher.getWatched()).map(([parent, children]) => [
				parent,
				children.map((child) => new Path(child)),
			])
		);
	}

	on(event: "ready", listener: () => void): this;
	on(event: "add" | "addDir" | "change", listener: (path: Path, stats?: fse.Stats) => void): this;
	on(
		event: "all",
		listener: (eventName: "add" | "addDir" | "change" | "unlink" | "unlinkDir", path: Path, stats?: fse.Stats) => void
	): this;
	on(event: "error", listener: (error: Error) => void): this;
	on(event: "raw", listener: (eventName: string, path: Path, details: any) => void): this;
	on(event: "unlink" | "unlinkDir", listener: (path: Path) => void): this;
	on(event: string, listener: (...args: any[]) => void) {
		if (event === "ready") {
			this._watcher.on(event, listener);
		} else if (event === "all") {
			this._watcher.on(
				event,
				(eventName: "add" | "addDir" | "change" | "unlink" | "unlinkDir", path: string, stats?: fse.Stats) =>
					listener(eventName, new Path(path), stats)
			);
		} else if (["add", "addDir", "change"].includes(event)) {
			this._watcher.on(event, (path: string, stats?: fse.Stats) => {
				// console.log(`EVENT ${event} [${path}]`);
				listener(new Path(path), stats);
			});
		} else if (event === "error") {
			this._watcher.on(event, (error: Error) => listener(error));
		} else if (event === "raw") {
			this._watcher.on(event, (eventName: string, path: string, details: any) =>
				listener(eventName, new Path(path), details)
			);
		} else if (event === "unlink" || event === "unlinkDir") {
			this._watcher.on(event, (path: string) => {
				// console.log(`EVENT ${event} [${path}]`);
				listener(new Path(path));
			});
		} else {
			throw new Error(
				`PathWatcher only supports the following events: "ready", "add", "addDir", "change", "unlink", "unlinkDir", "error", "raw"`
			);
		}
		return this;
	}
}
