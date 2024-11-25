import type { Options as FastGlobOptions } from "fast-glob";
import type { CopyOptions as FseCopyOptions, CopyOptionsSync as FseCopyOptionsSync, Mode as FseMode } from "fs-extra";
import type { Path } from "./index.js";

/**
 * Property-only version of a {@link Path} instance.
 */
export interface PathJSON {
	path: string;
	root: string;
	basename: string;
	dirname: string;
	stem: string;
	ext: string;
	suffixes: string[];
}

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

export interface TempFilepathOptions {
	/**
	 * Whether filepaths that lack an extension should be treated as files when creating temporary filepaths.
	 */
	noExtensionIsFile?: boolean;
	/**
	 * Whether the cleanup operation should be performed asynchronously.
	 */
	cleanupIsAsync?: boolean;
}

/**
 * Modified `fast-glob` options to prevent Typescript users from adding breaking properties such as "objectMode"
 */
export type GlobOptions = Omit<FastGlobOptions, "objectMode" | "stats">;

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
	/**
	 * Whether the user has read access to the filepath.
	 */
	canRead: boolean;
	/**
	 * Whether the user has write access to the filepath.
	 */
	canWrite: boolean;
	/**
	 * Whether the user has execute access to the filepath.
	 */
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
export interface CopyOptions extends FseCopyOptions, InterpRelativeOptions {}
/**
 * Options controlling the behavior of synchronous methods involving the copying of filepaths.
 * Originally taken from fs-extra, which has the following properties:
 * - `overwrite` -- Whether to overwrite existing filepath during the operation. Defaults to `true`.
 * - `errorOnExist` -- Whether to throw an error if the destination already exists. Defaults to `false`.
 * - `dereference` -- Whether to dereference symlinks during the operation. Defaults to `false`.
 * - `preserveTimestamps` -- Whether to keep the same timestamps that existed in the source files. Defaults to `false`.
 * - `filter` -- A function to filter which filepaths should be copied. Should return true to copy the item, otherwise false.
 */
export interface CopyOptionsSync extends FseCopyOptionsSync, InterpRelativeOptions {}

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

export type JSONObject = { [key: string]: JsonValue };
export type JsonValue = null | boolean | number | string | JsonValue[] | JSONObject;

/**
 * A type representing a branchpoint from a tree filepath operation.
 */
export interface TreeBranch<T extends Path | string> {
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
	children: TreeBranch<T>[] | null;
}

/**
 * Options for copy operations.
 * @see {@link https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md#copysrc-dest-options-callback}
 */
export interface CopyOptions extends Omit<FseCopyOptions, "filter"> {
	/** Whether to overwrite existing files. Defaults to `true`. */
	overwrite?: boolean;
	/** Whether to error if the destination exists. Defaults to `false`. */
	errorOnExist?: boolean;
	/** Whether to dereference symlinks. Defaults to `false`. */
	dereference?: boolean;
	/** Whether to preserve timestamps. Defaults to `false`. */
	preserveTimestamps?: boolean;
	/** How to interpret relative paths. If undefined, relative to CWD. */
	interpRelativeSource?: "cwd" | "path";
}

export type ReadFileOptions = {
	/** The encoding to use when reading the file. */
	encoding?: BufferEncoding;
	/** The flag to use when reading the file. */
	flag?: string;
};

export type WriteFileOptions = {
	/** The encoding to use when writing to the file. */
	encoding?: BufferEncoding;
	/** The permissions to give the file if it is generated during the operation. */
	mode?: FseMode;
	/** The flag to use when writing to the file. */
	flag?: string;
};

export type JSONReadOptions = {
	/** The encoding to use when reading the file. */
	encoding: BufferEncoding;
	/** The flag to use when reading the file. */
	flag?: string;
};

export type JSONWriteOptions = {
	/** The EOL to use when writing the file. */
	EOL?: string | undefined;
	/** Whether to use the EOL specified in `EOL` or `"\n"` if `EOL` is not specified. */
	finalEOL?: boolean | undefined;
	/** A function to transform the data before writing it to the file. */
	replacer?: ((key: string, value: any) => any) | undefined;
	/** The number of spaces to use when writing the file. */
	spaces?: string | number | undefined;
	/** The flag to use when writing the file. */
	flag?: string;
};
