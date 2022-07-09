/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { Options } from "fast-glob";
import * as fse from "fs-extra";
import chokidar from "chokidar";
export interface SystemError {
    address: string;
    code: string;
    dest: string;
    errno: number;
    info: Object;
    message: string;
    path: string;
    port: number;
    syscall: string;
}
/**
 * Property-only version of a Path instance.
 */
export interface PathJSON {
    path: Path | string;
    root: Path | string;
    basename: string;
    stem: string;
    ext: string;
    suffixes: string[];
}
/**
 * Modified `fast-glob` options to prevent Typescript users from adding breaking properties such as "objectMode"
 */
export declare type GlobOptions = Omit<Options, "objectMode" | "stats">;
/**
 * Options controlling the behavior of methods involving the opening of filepaths
 */
export interface OpenFileOptions {
    /**
     * Determines whether the file to be opened must first be made to exist.
     */
    ensureExists?: boolean;
    /**
     * The type of open operation (i.e. "r" for reading, "w" for writing)
     */
    flags: string | number;
    /**
     * The permissions to give the file if it is generated during the operation.
     */
    mode?: number;
}
/**
 * Type representing the access operations available to a filepath by the operating system's user.
 */
export interface AccessResult {
    canRead: boolean;
    canWrite: boolean;
    canExecute: boolean;
}
export interface InterpRelativeOptions {
    /**
     * How to interpret the target/destination of the filepath operation when it is provided as a relative filepath.
     * - `cwd` -- The target is resolved relative to the current working directory.
     * - `path` -- The target is resolved relative to the Path instance which calls the method involving this option.
     */
    interpRelativeSource?: "cwd" | "path";
}
/**
 * Options controlling the behavior of methods involving the moving of filepaths
 */
export interface MoveOptions extends InterpRelativeOptions {
    /**
     * Whether to overwrite any existing filepath during the move operation.
     */
    overwrite?: boolean;
}
/**
 * Options controlling the behavior of asynchronous methods involving the copying of filepaths.
 * Originally taken from fs-extra, which has the following properties:
 * - `overwrite` -- Whether to overwrite existing filepath during the operation. Defaults to `true`.
 * - `errorOnExist` -- Whether to throw an error if the destination already exists. Defaults to `false`.
 * - `dereference` -- Whether to dereference symlinks during the operation. Defaults to `false`.
 * - `preserveTimestamps` -- Whether to keep the same timestamps that existed in the source files. Defaults to `false`.
 * - `filter` -- A function to filter which filepaths should be copied. Should return true to copy the item, otherwise false.
 */
export interface CopyOptions extends fse.CopyOptions, InterpRelativeOptions {
}
/**
 * Options controlling the behavior of synchronous methods involving the copying of filepaths.
 * Originally taken from fs-extra, which has the following properties:
 * - `overwrite` -- Whether to overwrite existing filepath during the operation. Defaults to `true`.
 * - `errorOnExist` -- Whether to throw an error if the destination already exists. Defaults to `false`.
 * - `dereference` -- Whether to dereference symlinks during the operation. Defaults to `false`.
 * - `preserveTimestamps` -- Whether to keep the same timestamps that existed in the source files. Defaults to `false`.
 * - `filter` -- A function to filter which filepaths should be copied. Should return true to copy the item, otherwise false.
 */
export interface CopyOptionsSync extends fse.CopyOptionsSync, InterpRelativeOptions {
}
/**
 * Options controlling the behavior of methods involving symlink operations.
 */
export interface SymlinkOptions extends InterpRelativeOptions {
    /**
     * Whether the filepath indicate in "target" should be treated as a symlink.
     * - If `true`, then the target is treated as the link and the filepath calling the method must be an existing file or directory.
     * - If `false`, then the target must be an existing file or directory and the underlying filepath is the symlink that will be created.
     */
    targetIsLink?: boolean;
    /**
     * On Windows only, a value of either `"file"` or `"dir"` denoting the type of symlink to create.
     * Defaults to `undefined`, where an inference will be made based on the filepath being linked.
     */
    type?: "file" | "dir";
}
export declare type JSONObject = {
    [key: string]: JsonValue;
};
export declare type JsonValue = null | boolean | number | string | JsonValue[] | JSONObject;
/**
 * A type representing a branchpoint from a tree filepath operation.
 */
export interface treeBranch<T extends Path | string> {
    /**
     * The filepath representing this branchpoint.
     */
    filepath: T;
    /**
     * The number of branchpoints traversed thus far relative to the original filepath that called the tree operation.
     */
    depth: number;
    /**
     * The child branches that can be found within this branch, if it is a directory. Otherwise, this is `null`.
     */
    children: treeBranch<T>[] | null;
}
/**
 * A wrapper class representing a filepath on which operations can be performed.
 * @example
 * Here are a few examples of how the Path class instantiates:
 * ```js
 * // Assume that the current working directory is:
 * "/home/jsmith/Documents/Work" on Unix and
 * "C:\\Users\\JSmith\\Documents\\Work" on Windows
 * const fp1 = new Path("~")
 * const fp2 = new Path(".")
 * const fp3 = new Path("..")
 * const fp4_unix = new Path("/users/hsimpson/Documents")
 * const fp4_win = new Path("C:\\Users\\HSimpson\\Documents")
 * const fp5 = new Path("./foo")
 * const fp6 = new Path("../bar")
 * const fp7 = new Path("/")
 * console.log([fp1.path, fp2.path, fp3.path, fp4_unix.path, fp4_win.path,
 *              fp5.path, fp6.path, fp7.path
 *              ].join("\n"));
 *
 * // For a Unix user:
 * >>>
 * /home/jsmith
 * /home/jsmith/Documents/Work
 * /home/jsmith/Documents
 * /users/hsimpson/Documents
 * // Windows example has been omitted
 * /home/jsmith/Documents/Work/foo
 * /home/jsmith/Documents/bar
 * /
 *
 * // For a Windows user:
 * >>>
 * C:/Users/JSmith
 * C:/Users/JSmith/Documents/Work
 * C:/Users/JSmith/Documents
 * // Unix example has been omitted
 * C:/Users/HSimpson/Documents
 * C:/Users/JSmith/Documents/Work/foo
 * C:/Users/JSmith/Documents/bar
 * C:/
 * ```
 */
export default class Path {
    /**
     * The root directory of the filepath.
     *
     * @remarks
     * **⚠️ In this library, the normalization process of the filepath results in the root being always
     * expressed with forward slashes. (i.e. `C:/` instead of `C:\`).
     * Windows users may find this more difficult to work with. ⚠️**
     *
     * @examples
     * - For a Unix filepath of `/foo/bar/baz`, the root directory is `/`.
     * - For a Windows filepath of `C:\foo\bar\baz`, the root directory is `C:\` (expressed as `C:/` in this library).
     */
    root: string;
    /**
     * The full filepath represented by this Path instance.
     */
    path: string;
    /**
     * The portion of the filepath other than the basename.
     * @example
     * - For a filepath of `/home/jsmith/Documents/Work/foo.txt`, the `dirname` is `/home/jsmith/Documents/Work`.
     * - For a filepath of `C:\\Users\\JSmith\\Documents`, the `dirname` is `C:\\Users\\JSmith`.
     */
    dirname: string;
    /**
     * The basename of a filepath.
     * @example
     * - For a filepath of `/foo/bar/baz.txt`, the basename is `baz.txt`.
     * - For a filepath of `/foo/bar`, the basename is `bar`.
     */
    basename: string;
    /**
     * The portion of the basename without the extension.
     * @example
     * - For a filepath of `/foo/bar/baz.txt`, the stem is `baz`.
     * - For a filepath of `/foo/bar/baz`, the stem is `baz`.
     */
    stem: string;
    /**
     * The final extension in the filepath.
     *
     * **⚠️ In this library, the leading dot is included as part of the extension. ⚠️**
     * @example
     * - For a filepath of `/foo/bar/baz.txt`, the extension is `.txt`.
     * - For a filepath of `/foo/bar/baz`, the extension is an empty string.
     * - For a filepath of `/foo/bar/baz.tar.gz`, the extension is `.gz`.
     */
    ext: string;
    /**
     * An array of strings representing the individual extensions found at the end of the filepath.
     *
     * **⚠️In this library, the leading dot is included for each extension in the array.⚠️**
     * @example
     * ```js
     * const fp1 = new Path("/home/jsmith/Documents/foo.txt");
     * const fp2 = new Path("/home/jsmith/Documents/bar.tar.gz");
     * const fp3 = new Path("/home/jsmith/Documents/baz");
     * console.log(fp1.suffixes);
     * >>> [ '.txt' ]
     * console.log(fp2.suffixes);
     * >>> [ '.tar', '.gz' ]
     * console.log(fp3.suffixes);
     * >>> []
     * ```
     */
    suffixes: string[];
    /**
     * The number that uniquely identifies a filepath in the operating system it resides.
     * This is `null` while the filepath is closed and a `number` when the filepath is in an open state.
     */
    descriptor: null | number;
    /**
     * Get a `Path` representation of the current working directory.
     */
    static pwd(): Path;
    /**
     * Alias for `pwd`. Get a `Path` representation of the current working directory.
     */
    static cwd(): Path;
    /**
     * Get a `Path` representation of the home directory.
     */
    static home(): Path;
    /**
     * Joins filepaths to create a single string representation, delimited by the system-specific
     * environment delimiter.
     * @param paths A collection of strings or Path instances to be joined together using the
     * system-specific environment delimiter (":" vs ";"). Useful for converting a collection
     * of filepaths into a single string to be set as an environment variable.
     * @returns Filepaths concatenated by the system-specific environment delimiter.
     */
    static toSystemDelimitedSingleString(...paths: Array<string | Path>): string;
    /**
     * Converts the PATH variable into an `Array` of `Path` instances.
     * @returns An `Array` of `Path` instances of the filepaths recorded in PATH.
     */
    static getPATHAsPaths(): Path[];
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
    static parseModeIntoOctal(mode: number | fse.Stats): number;
    constructor(...paths: string[]);
    private _expanduser;
    private _capitalizeroot;
    private _parts;
    /**
     * Splits the underlying filepath into its individual components.
     * @returns An `Array` of the strings comprising the `Path` instance.
     * @example
     * ```js
     * const fp = new Path("/home/jsmith/Documents")
     * console.log(fp.parts())
     * >>> [ '/', 'home', 'jsmith', 'Documents' ]
     * ```
     */
    parts(): string[];
    /**
     * Alias for `this.parts()`. Splits the underlying filepath into its individual components.
     * @returns An `Array` of the strings comprising the `Path` instance.
     */
    split(): string[];
    /**
     * Depicts the relative path from the Path instance to another filepath.
     * @param to The filepath that this instance should be compared against.
     * @param useSystemPathDelimiter Whether to present the final string in accordance with the operating
     * system's filepath delimiter. Default is `false`.
     * @returns A `string` representation of the relative path.
     * @example
     * ```js
     * const fp = new Path("/home/jsmith/Documents")
     * console.log(fp.relative("/home"))
     * >>> "../.."
     * ```
     */
    relative(to: string | Path, useSystemPathDelimiter?: boolean): string;
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
    resolve(...segments: string[]): Path;
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
    readLink(): Promise<Path>;
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
    readLinkSync(): Path;
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
    join(...segments: string[]): Path;
    /**
     * Alias of the `join()` method. Appends strings to the end of the underlying filepath, creating a new `Path` instance.
     *
     * ⚠️ Note that ".." and "." are treated **literally** and will not be resolved.
     * For appending file segments with resolving behavior use the `resolve()` method. ⚠️
     * @param segments Strings which should be appended to the Path instance in order to create a new one.
     * @returns A new `Path` instance with the strings appended.
     */
    append(...segments: string[]): Path;
    /**
     * Creates a new Path instance with a replaced basename.
     * @param name The new basename to replace the existing one.
     * @returns A new `Path` instance featuring the replacement basename.
     * @example
     * ```
     * const fp = new Path("/home/jsmith/Documents/foo.txt")
     * console.log(fp.withBasename("bar.json").path)
     * >>> "/home/jsmith/Documents/bar.json"
     * ```
     */
    withBasename(name: string): Path;
    /**
     * Creates a new Path instance with a replaced stem.
     * @param stem The new stem to replace the existing one.
     * @returns A new `Path` instance featuring the replacement stem.
     * ```
     * const fp = new Path("/home/jsmith/Documents/foo.txt")
     * console.log(fp.withStem("bar").path)
     * >>> "/home/jsmith/Documents/bar.txt"
     * ```
     */
    withStem(stem: string): Path;
    /**
     * Creates a new Path instance with a replaced set of suffix extensions.
     * @param suffix The new suffix to replace the existing one. Behavior patterns are as follows:
     * - If provided an `Array` of strings, it will concatenate each with a "." character before appending to the existing stem.
     * - If provided a non-blank string, it will overwite everything after the first "." in the current basename.
     * - If a blank string is provided, then all extensions will be removed.
     * @returns A new `Path` instance featuring the replaced suffix(es).
     * @example
     * ```js
     * const fp = new Path("/home/mpasternak/Documents/foo.tar.gz");
     *
     * console.log(fp.withSuffix(["bar", "baz"]).path);
     * >>> "/home/mpasternak/Documents/foo.bar.baz"
     *
     * console.log(fp.withSuffix("qui").path);
     * >>> "/home/mpasternak/Documents/foo.qui"
     *
     * console.log(fp.withSuffix("").path);
     * >>> "/home/mpasternak/Documents/foo"
     * ```
     */
    withSuffix(suffix: string | string[]): Path;
    /**
     * Creates a new Path instance with a replaced **last extension**.
     *
     * ⚠️ If a suffix contains multiple components (i.e. .tar.gz) and the entirety of the suffix is desired to be replaced,
     * use `this.withSuffix()`. ⚠️
     * @param ext The new extension to replace the existing one.
     * @returns A new `Path` instance featuring the replacement last extension.
     * @example
     * ```js
     * const fp1 = new Path("/home/mpasternak/Documents/foo.tar.gz");
     * console.log(fp1.withExtension("qui").path);
     * console.log(fp1.withExtension("").path);
     * >>> "/home/mpasternak/Documents/foo.tar.qui"
     * >>> "/home/mpasternak/Documents/foo.tar"
     *
     * const fp2 = new Path("/home/mpasternak/Documents/bar.txt");
     * console.log(fp2.withExtension(".json").path);
     * console.log(fp2.withExtension("").path);
     * >>> "/home/mpasternak/Documents/bar.json"
     * >>> "/home/mpasternak/Documents/bar"
     * ```
     */
    withExtension(ext: string): Path;
    /**
     * Depicts a string version of the Path instance.
     * @param useSystemPathDelimiter Whether to respect the system-specific filepath delimiter. Defaults to `false`.
     * @returns A `string` representation of the underlying filepath.
     */
    toString(useSystemPathDelimiter?: boolean): string;
    /**
     * Depicts an Object version of the Path instance.
     * @param useSystemPathDelimiter Whether to respect the system-specific filepath delimiter. Defaults to `false`.
     * @returns An `Object` representation of the underlying filepath; {@link PathJSON}.
     */
    toJSON(useSystemPathDelimiter?: boolean): PathJSON;
    /**
     * Asynchronously retrieves the stat object for the filepath.
     * @returns The `Stats` object for the underlying filepath.
     */
    stat(): Promise<fse.Stats>;
    /**
     * Synchronously retrieves the stat object for the filepath.
     * @returns The `Stats` object for the underlying filepath.
     */
    statSync(): fse.Stats;
    /**
     * Asynchronously checks whether the underlying filepath exists.
     * @returns A `boolean` of whether the filepath exists or not.
     */
    exists(): Promise<boolean>;
    /**
     * Synchronously checks whether the underlying filepath exists.
     * @returns A `boolean` of whether the filepath exists or not.
     */
    existsSync(): boolean;
    private _interpSystemError;
    /**
     * Asynchronously checks whether the filepath is a directory.
     * @returns A `boolean` of whether this is a directory or not.
     */
    isDirectory(): Promise<boolean>;
    /**
     * Synchronously checks whether the filepath is a directory.
     * @returns A `boolean` of whether this is a directory or not.
     */
    isDirectorySync(): boolean;
    /**
     * Asynchronously checks whether the filepath is a file.
     * @returns A `boolean` of whether this is a file or not.
     */
    isFile(): Promise<boolean>;
    /**
     * Synchronously checks whether the filepath is a file.
     * @returns A `boolean` of whether this is a file or not.
     */
    isFileSync(): boolean;
    /**
     * Asynchronously checks whether the filepath is a symlink.
     * @returns A `boolean` of whether this is a symlink or not.
     */
    isSymbolicLink(): Promise<boolean>;
    /**
     * Synchronously checks whether the filepath is a symlink.
     * @returns A `boolean` of whether this is a symlink or not.
     */
    isSymbolicLinkSync(): boolean;
    /**
     * Asynchronously checks whether the filepath is a socket.
     * @returns A `boolean` of whether this is a socket or not.
     */
    isSocket(): Promise<boolean>;
    /**
     * Synchronously checks whether the filepath is a socket.
     * @returns A `boolean` of whether this is a socket or not.
     */
    isSocketSync(): boolean;
    /**
     * Asynchronously checks whether the filepath is a first-in-first-out queue.
     * @returns A `boolean` of whether this is a first-in-first-out queue or not.
     */
    isFIFO(): Promise<boolean>;
    /**
     * Synchronously checks whether the filepath is a first-in-first-out queue.
     * @returns A `boolean` of whether this is a first-in-first-out queue or not.
     */
    isFIFOSync(): boolean;
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
    parent(numIncrements?: number): Path;
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
    containsImmediateChild(child: string | Path): Promise<false | Path>;
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
    containsImmediateChildSync(child: string | Path): false | Path;
    private _prepGlobPatterns;
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
    glob(patterns: string | string[], options?: GlobOptions): Promise<Path[]>;
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
    globIter(patterns: string | string[], options?: GlobOptions): AsyncGenerator<Path, void, unknown>;
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
    globSync(patterns: string | string[], options?: GlobOptions): Path[];
    /**
     * Asynchronously collects the children of a directory path.
     * @returns An `Array` of `Path` instances that are children of the current instance.
     */
    readDir(): Promise<Path[]>;
    /**
     * Synchronously collects the children of a directory path.
     * @returns An `Array` of `Path` instances that are children of the current instance.
     */
    readDirSync(): Path[];
    /**
     * Asynchronously yields child filepaths.
     * @yields A child `Path` instance.
     */
    readDirIter(): AsyncGenerator<Path, void, unknown>;
    /**
     * Synchronously yields child filepaths.
     * @yields A child `Path` instance.
     */
    readDirIterSync(): Generator<Path, void, unknown>;
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
    getPathsNLevelsAway(depth: number, asIterator?: true, options?: GlobOptions): Promise<AsyncGenerator<Path, void, unknown>>;
    getPathsNLevelsAway(depth: number, asIterator?: false, options?: GlobOptions): Promise<Path[]>;
    /**
     * Asynchronously traverses the tree structure of the directory system, starting from the current instance as the root and allows for callbacks to occur for each encountered filepath.
     * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
     */
    walk(callback?: (fp: Path, ...args: unknown[]) => void): Promise<void>;
    /**
     * Synchronously traverses the tree structure of the directory system, starting from the current instance as the root and allows for callbacks to occur for each encountered filepath.
     * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
     */
    walkSync(callback?: (fp: Path, ...args: unknown[]) => void): void;
    /**
     * Asynchronously traverses the tree structure of the directory system, starting from the current instances as the root
     * and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object
     * with two properties: "filepath", which is the Path instance of the filepath at that location, and "children" which is
     * either `null` in the case of a non-directory or an `Array` of more branch objects.
     * @param asString Whether to convert the "filepath" property automatically to a string representation of the path instead.
     * @returns A representation of the filepath tree structure.
     */
    tree(asString?: true, useSystemPathDelimiter?: boolean): Promise<treeBranch<string>>;
    tree(asString?: false, useSystemPathDelimiter?: boolean): Promise<treeBranch<Path>>;
    /**
     * Synchronously traverses the tree structure of the directory system, starting from the current instances as the root
     * and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object
     * with two properties: "filepath", which is the Path instance of the filepath at that location, and "children" which is
     * either `null` in the case of a non-directory or an `Array` of more branch objects.
     * @param asString Whether to convert the "filepath" property automatically to a string representation of the path instead.
     * @returns A representation of the filepath tree structure.
     */
    treeSync(asString?: true, useSystemPathDelimiter?: boolean): treeBranch<string>;
    treeSync(asString?: false, useSystemPathDelimiter?: boolean): treeBranch<Path>;
    /**
     * Asynchronously creates a new directory, including intermediate parental components.
     * @param mode An octal number (ex. 0o511) representing of the new filepath permissions to impart.
     * Defaults to 0o777.
     * @param throwErrOnFail Whether to rethrow any generated error. Defaults to `false`.
     * @return Returns `false` if `throwErrOnFail` is `false` and an error is encountered while making the directory path.
     * Otherwise, returns the `Path` instance that called this method.
     */
    makeDir(mode?: number, throwErrOnFail?: boolean): Promise<false | this>;
    /**
     * Synchronously creates a new directory, including intermediate parental components.
     * @param mode An octal number (ex. 0o511) representing of the new filepath permissions to impart.
     * Defaults to 0o777.
     * @param throwErrOnFail Whether to rethrow any generated error. Defaults to `false`.
     * @return Returns `false` if `throwErrOnFail` is `false` and an error is encountered while making the directory path.
     * Otherwise, returns the `Path` instance that called this method.
     */
    makeDirSync(mode?: number, throwErrOnFail?: boolean): false | this;
    /**
     * Asynchronously creates a new file, including intermediate parental components.
     * @param throwErrOnFail Whether to rethrow any generated error. Defaults to `false`.
     * @return Returns `false` if `throwErrOnFail` is `false` and an error is encountered while making the file path.
     * Otherwise, returns the `Path` instance that called this method.
     */
    makeFile(throwErrOnFail?: boolean): Promise<false | this>;
    /**
     * Synchronously creates a new file, including intermediate parental components.
     * @param throwErrOnFail Whether to rethrow any generated error. Defaults to `false`.
     * @return Returns `false` if `throwErrOnFail` is `false` and an error is encountered while making the file path.
     * Otherwise, returns the `Path` instance that called this method.
     */
    makeFileSync(throwErrOnFail?: boolean): false | this;
    private _interpPossibleRelativePath;
    private _inferWindowsSymlinkType;
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
    makeSymlink(target: string | Path, options?: SymlinkOptions): Promise<Path>;
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
    makeSymlinkSync(target: string | Path, options?: SymlinkOptions): Path;
    /**
     * Asynchronously tests a user's permissions for the underling filepath.
     * @param mode the permissions to check for. Use fs.constants variables as input, NOT octal numbers.
     * Defaults to `undefined`, resulting in checking for read, write, and execute permissions.
     * @returns If mode was specified, a `boolean` reflecting the permissions.
     * Otherwise, returns an `Object` with keys "canRead", "canWrite", "canExecute" and values as a boolean of whether
     * permissions for that operation are available.
     */
    access(mode: number): Promise<boolean>;
    access(mode?: undefined): Promise<AccessResult>;
    /**
     * Synchronously tests a user's permissions for the underling filepath.
     * @param mode the permissions to check for. Use fs.constants variables as input, NOT octal numbers.
     * Defaults to `undefined`, resulting in checking for read, write, and execute permissions.
     * @returns If mode was specified, a `boolean` reflecting the permissions.
     * Otherwise, returns an `Object` with keys "canRead", "canWrite", "canExecute" and values as a boolean of whether
     * permissions for that operation are available.
     */
    accessSync(mode?: number): boolean;
    accessSync(mode?: undefined): AccessResult;
    /**
     * Asynchronously changes the permissions of the underlying filepath.
     * * Caveats: on Windows only the write permission can be changed, and the distinction
     * among the permissions of group, owner or others is not implemented.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511) representation of the new filepath permissions.
     * @returns Returns the `Path` instance that called this method.
     */
    chmod(mode: string | number): Promise<this>;
    /**
     * Synchronously changes the permissions of the underlying filepath.
     * * Caveats: on Windows only the write permission can be changed, and the distinction
     * among the permissions of group, owner or others is not implemented.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511) representation of the new filepath permissions.
     * @returns Returns the `Path` instance that called this method.
     */
    chmodSync(mode: string | number): this;
    /**
     * Asynchronously changes the ownership of the underlying filepath.
     * @param uid User id.
     * @param gid Group id.
     * @returns Returns the `Path` instance that called this method.
     */
    chown(uid: number, gid: number): Promise<this>;
    /**
     * Synchronously changes the ownership of the underlying filepath.
     * @param uid User id.
     * @param gid Group id.
     * @returns Returns the `Path` instance that called this method.
     */
    chownSync(uid: number, gid: number): this;
    /**
     * Asynchronously moves the underlying filepath to the indicated destination.
     * @param dst The filepath destination to where the underlying path should be moved.
     * - If the instance is a **directory**, the children of the directory will be moved to this location.
     * - If the instance is a **file**, it itself will be moved to the new location.
     * @param options {@link MoveOptions} By default:
     * - `overwrite` is set to `true`
     * - `interRelativeSource` is set to `undefined` (relative paths will be resolved relative to the current working directory)
     * @returns Returns the destination filepath as a `Path` instance.
     */
    move(dst: string | Path, options?: MoveOptions): Promise<Path>;
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
    moveSync(dst: string | Path, options?: MoveOptions): Path;
    /**
     * Asynchronously copies the underlying filepath to the indicated destination.
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
    copy(dst: string | Path, options?: CopyOptions): Promise<Path>;
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
    copySync(dst: string | Path, options?: CopyOptionsSync): Path;
    /**
     * Asynchronously deletes the underlying filepath.
     */
    remove(): Promise<void>;
    /**
     * Alias for `remove()`. Asynchronously deletes the underlying filepath.
     */
    unlink(): Promise<void>;
    /**
     * Alias for `remove()`. Asynchronously deletes the underlying filepath.
     */
    delete(): Promise<void>;
    /**
     * Synchronously deletes the underlying filepath.
     */
    removeSync(): void;
    /**
     * Alias for `removeSync()`. Synchronously deletes the underlying filepath.
     */
    unlinkSync(): void;
    /**
     * Alias for `removeSync()`. Synchronously deletes the underlying filepath.
     */
    deleteSync(): void;
    /**
     * Asynchronously opens a file and returns its file descriptor.
     * @param openOptions.ensureExists Whether to force the file to be touched first, including forcing parent directories to
     * exist. Note that this will not work for files that lack an extension.
     * @param openOptions.flags A string denoting the mode in which this file should be opened.
     * Typically "r" for read, "w" for write, and "a" for append.
     * @param openOptions.mode The permissions to set for the file upon opening (i.e. 0o511).
     * @returns The numeric file descriptor.
     */
    open(openOptions: OpenFileOptions): Promise<number>;
    /**
     * Synchronously opens a file and returns its file descriptor.
     * @param openOptions.ensureExists Whether to force the file to be touched first, including forcing parent directories to
     * exist. Note that this will not work for files that lack an extension.
     * @param openOptions.flags A string denoting the mode in which this file should be opened.
     * Typically "r" for read, "w" for write, and "a" for append.
     * @param openOptions.mode The permissions to set for the file upon opening (i.e. 0o511).
     * @returns The numeric file descriptor.
     */
    openSync(openOptions: OpenFileOptions): number;
    close(): Promise<void>;
    closeSync(): void;
    /**
     * Asynchronously reads a portion of the data from the underlying file.
     * @param buffer The Buffer that the data will be written to.
     * @param offset The position in buffer to write the data to.
     * @param length The number of bytes to read.
     * @param position Specifies where to begin reading from in the file.
     * If position is null or -1 , data will be read from the current file position, and the file position will be updated.
     * If position is an integer, the file position will be unchanged.
     * @param closeAfterwards Whether to close the file after the operation completes. Defaults to true.
     * @param openOptions.flags A string denoting the mode in which this file should be opened. Defaults to "r" for this method.
     * @param openOptions.mode The permissions to set for the file upon opening (i.e. 0o511).
     * @returns An object with the properties of buffer, which is the updated buffer, and bytesRead, which is the number of
     * bytes that were read from the file.
     */
    read(buffer: fse.ArrayBufferView, offset: number, length: number, position: number | null, closeAfterwards?: boolean, openOptions?: OpenFileOptions): Promise<{
        fileDescriptor: number | null;
        bytesRead: number;
        buffer: fse.ArrayBufferView;
    }>;
    /**
     * Synchronously reads a portion of the data from the underlying file.
     * @param buffer The Buffer that the data will be written to.
     * @param offset The position in buffer to write the data to.
     * @param length The number of bytes to read.
     * @param position Specifies where to begin reading from in the file.
     * @param closeAfterwards Whether to close the file after the operation completes. Defaults to true.
     * If position is null or -1 , data will be read from the current file position, and the file position will be updated.
     * If position is an integer, the file position will be unchanged.
     * @param openOptions.flags A string denoting the mode in which this file should be opened. Defaults to "r" for this method.
     * @param openOptions.mode The permissions to set for the file upon opening (i.e. 0o511).
     * @returns The number of bytes read.
     */
    readSync(buffer: fse.ArrayBufferView, offset: number, length: number, position: number | null, closeAfterwards?: boolean, openOptions?: OpenFileOptions): {
        bytesRead: number;
        fileDescriptor: number | null;
    };
    /**
     * Asynchronously writes buffer-like data into the underlying file.
     * @param buffer the Buffer which should be written into the underlying file.
     * @param offset The position in the buffer from which to begin writing
     * @param length The number of bytes to write.
     * @param position Specifies where to begin writing into the file.
     * @param closeAfterwards Whether to close the file after the operation completes. Defaults to `true`.
     * @param openOptions.flags A string denoting the mode in which this file should be opened. Defaults to `"r"` for this method.
     * @param openOptions.mode The permissions to set for the file upon opening (i.e. 0o511).
     */
    write<TBuffer extends NodeJS.TypedArray | DataView>(buffer: TBuffer, offset?: number, length?: number, position?: number | null, closeAfterwards?: boolean, openOptions?: OpenFileOptions): Promise<{
        fileDescriptor: number | null;
        bytesWritten: number;
        buffer: TBuffer;
    }>;
    /**
     * Synchronously writes buffer-like data into the underlying file.
     * @param data The string data to write to the file instead of a buffer.
     * @param buffer the Buffer which should be written into the underlying file.
     * @param offset The position in the buffer from which to begin writing
     * @param length The number of bytes to write.
     * @param position Specifies where to begin writing into the file.
     * @param closeAfterwards Whether to close the file after the operation completes. Defaults to `true`.
     * @param openOptions.flags A string denoting the mode in which this file should be opened. Defaults to `"r"` for this method.
     * @param openOptions.mode The permissions to set for the file upon opening (i.e. 0o511).
     */
    writeSync<TBuffer extends NodeJS.TypedArray | DataView>(buffer: TBuffer, offset?: number, length?: number, position?: number | null, closeAfterwards?: boolean, openOptions?: OpenFileOptions): {
        bytesWritten: number;
        fileDescriptor: number | null;
    };
    /**
     * Asynchronously parses data coming from a file.
     * @param options.encoding. The encoding to use in the write operation. Defaults to `"utf8"`.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to `"r"`.
     * @returns The contents of the file either as a decoded `string` or as a `Buffer` if no encoding was provided.
     */
    readFile(options: {
        encoding: BufferEncoding;
        flag?: string;
    }): Promise<string>;
    readFile(encoding: BufferEncoding): Promise<string>;
    readFile(): Promise<Buffer>;
    /**
     * Synchronously parses data coming from a file.
     * @param options.encoding. The encoding to use in the write operation. Defaults to `"utf8"`.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to `"r"`.
     * @returns The contents of the file either as a decoded `string` or as a `Buffer` if no encoding was provided.
     */
    readFileSync(options: {
        encoding: BufferEncoding;
        flag?: string;
    }): string;
    readFileSync(encoding: BufferEncoding): string;
    readFileSync(): Buffer;
    /**
     * Asynchronously writes data to the underlying filepath.
     * @param data The data to write to the file.
     * @param options.encoding. The encoding to use in the write operation. Defaults to `"utf8"`.
     * @param options.mode. The permissions of the created file. Defaults to `0o666`.
     * @param options.flag. The string denoting the mode in which the file is opened.
     * @returns Returns the Path instance that called this method
     */
    writeFile(data: string | Buffer | Uint8Array, options?: fse.WriteFileOptions): Promise<this>;
    /**
     * Synchronously writes data to the underlying filepath.
     * @param data The data to write to the file.
     * @param options.encoding. The encoding to use in the write operation. Defaults to `"utf8"`.
     * @param options.mode. The permissions of the created file. Defaults to `0o666`.
     * @param options.flag. The string denoting the mode in which the file is opened.
     * @returns Returns the Path instance that called this method
     */
    writeFileSync(data: string | Buffer | Uint8Array, options?: fse.WriteFileOptions): this;
    /**
     * Asynchronously reads in the underlying filepath JSON file and parses it into a JSON object.
     * @param options.encoding. The encoding to use when parsing the JSON structure. Defaults to `null`.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to `"r"`.
     * @returns A JSON object.
     */
    readJSON(options?: string | fse.ReadOptions): Promise<JSONObject>;
    /**
     * Synchronously reads in the underlying filepath JSON file and parses it into a JSON object.
     * @param options.encoding. The encoding to use when parsing the JSON structure. Defaults to `null`.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to `"r"`.
     * @returns A JSON object.
     */
    readJSONSync(options?: string | fse.ReadOptions): any;
    /**
     * Asynchronously write a JSON-compatible object to a .json file.
     * @param data A JSON-compatible object to write into the file.
     * @param options.space The number of spaces to indent or the character used to substitute for indents. Defaults to `0`
     * @param options.EOL The end-of-line character. Defaults to `"\n"`.
     * @param options.replacer. The JSON replacer array or function.
     * @param options.encoding. The encoding to use in the write operation. Defaults to `"utf8"`.
     * @param options.mode. The permissions of the created file. Defaults to `0o666`.
     * @param options.flag. The string denoting the mode in which the file is opened. `"w"` for write and `"a"` for append. Defaults to `"w"`.
     * @param options.signal. An `AbortSignal` object that allows the termination of the operation midway.
     * @returns Returns the Path instance which called this method.
     */
    writeJSON(data: JSONObject, options?: fse.WriteOptions): Promise<this>;
    /**
     * Synchronously write a JSON-compatible object to a .json file.
     * @param data A JSON-compatible object to write into the file.
     * @param options.space The number of spaces to indent or the character used to substitute for indents. Defaults to `0`
     * @param options.EOL The end-of-line character. Defaults to `"\n"`.
     * @param options.replacer. The JSON replacer array or function.
     * @param options.encoding. The encoding to use in the write operation. Defaults to `"utf8"`.
     * @param options.mode. The permissions of the created file. Defaults to `0o666`.
     * @param options.flag. The string denoting the mode in which the file is opened. `"w"` for write and `"a"` for append. Defaults to `"w"`.
     * @param options.signal. An `AbortSignal` object that allows the termination of the operation midway.
     * @returns Returns the Path instance which called this method.
     */
    writeJSONSync(data: JSONObject, options?: fse.WriteOptions): this;
    /**
     * Wrapper around implementing a Chokidar watcher on the underlying filepath.
     * @param options [Chokidar options](https://github.com/paulmillr/chokidar) controlling the behavior of the filepath watcher.
     */
    watch(options?: chokidar.WatchOptions): chokidar.FSWatcher;
}
