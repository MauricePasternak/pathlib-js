/// <reference types="node" />
import { Options as GlobOptions } from "fast-glob";
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
export interface PathJSON {
    path: Path | string;
    root: Path | string;
    basename: string;
    stem: string;
    ext: string;
    suffixes: string[];
}
export declare type JSONObject = {
    [key: string]: JsonValue;
};
export declare type JsonValue = null | boolean | number | string | JsonValue[] | JSONObject;
export interface treeBranch {
    filepath: Path | string;
    depth: number;
    children: treeBranch[] | null;
}
declare class Path {
    root: string;
    path: string;
    dirname: string;
    basename: string;
    stem: string;
    ext: string;
    suffixes: string[];
    /**
     * Get a Path representation of the current working directory.
     * @returns The current working directory.
     */
    static pwd(): Path;
    /**
     * Get a Path representation of the current working directory.
     * @returns The current working directory.
     */
    static cwd(): Path;
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
     * Converts the PATH variable into an array of Path instances.
     * @returns An Array of Path instances of the filepaths recorded in PATH.
     */
    static getPATHAsPaths(): Path[];
    /**
     * Parses the mode of a filepath into the more understandable octal representation (i.e. 777 for full-permissions)
     * @param mode The mode of a filepath, as received from fs.Stats or the fs.Stats object itself
     * @returns The octal numeric representation of the filepath permissions
     */
    static parseModeIntoOctal(mode: number | fse.Stats): number;
    /**
     * @param paths A collection of strings which will be resolved and normalized into a filepath.
     * This underlying filepath is then parsed to produce the properties.
     * @property path The normalized underlying filepath.
     * @property root The root directory of the underlying filepath.
     * @property basename The basename of the underlying filepath.
     * @property dirname An alias for the filepath of the parent directory.
     * @property stem The basename without any extensions.
     * @property ext The full set of extensions as a single string.
     * @property suffixes An array of the individualized extentions, without periods.
     */
    constructor(...paths: string[]);
    /**
     * Splits the underlying filepath into its individual components.
     * @returns An array of the strings comprising the Path instance.
     */
    parts(): string[];
    /**
     * Splits the underlying filepath into its individual components. Alias for this.parts().
     * @returns An array of the strings comprising the Path instance.
     */
    split(): string[];
    /**
     * Depicts the relative path from the Path instance to another filepath.
     * @param to The filepath that this instance should be compared against.
     * @param useSystemPathDelimiter Whether to present the final string in accordance with the
     * operating system's filepath delimiter.
     * @returns A string representation of the relative path from the filepath represented by this
     * Path instance to the filepath indicated.
     */
    relative(to: string | Path, useSystemPathDelimiter?: boolean): string;
    /**
     * Resolves a sequence of path segments into a new absolute Path. Respects ".." and will increment directories accordingly.
     * Note that strings beginning with a single "." will be treated as if the dot character does not exist. Use the "join" method
     * as an alternative for appending file segments that begin with "." to the current path.
     * @param segments An array of strings respresenting path segments to append and resolve to the underlying path.
     * @returns The resolved Path instance.
     */
    resolve(...segments: string[]): Path;
    /**
     * Appends strings to the end of the underlying filepath, creating a new Path instance. Note that ".." and "." are treated
     * literally and will not be resolved. For appending file segments with resolving behavior use the "resolve" method.
     * @param segments Strings which should be appended to the Path instance in order to create a new one.
     * @returns A new Path instance with the strings appended.
     */
    join(...segments: string[]): Path;
    /**
     * Creates a new Path instance with a replaced basename.
     * @param name The new basename to replace the existing one.
     * @returns A new Path instance featuring the replacement basename.
     */
    withBasename(name: string): Path;
    /**
     * Creates a new Path instance with a replaced stem.
     * @param stem The new stem to replace the existing one.
     * @returns A new Path instance featuring the replacement stem.
     */
    withStem(stem: string): Path;
    /**
     * Creates a new Path instance with a replaced final extension.
     * @param suffix The new suffix to replace the existing one.
     * If the current path contains multiple extensions (i.e. .tar.gz), then only the lattermost will be replaced.
     * If a blank string is provided, then all extensions will be removed.
     * @returns A new Path instance featuring the replacement extension.
     */
    withSuffix(suffix: string): Path;
    /**
     * Depicts a string version of the Path instance.
     * @param useSystemPathDelimiter Whether to respect the system-specific filepath delimiter.
     * @returns A string representation of the underlying filepath.
     */
    toString(useSystemPathDelimiter?: boolean): string;
    /**
     * Depicts an Object version of the Path instance.
     * @param useSystemPathDelimiter Whether to respect the system-specific filepath delimiter.
     * @returns An Object representation of the underlying filepath.
     */
    toJSON(useSystemPathDelimiter?: boolean): {
        path: string;
        root: string;
        basename: string;
        stem: string;
        ext: string;
        suffixes: string[];
    };
    /**
     * Asynchronously retrieves the stat object for the Path instance.
     * @returns The stat object for the underlying filepath.
     */
    stat(): Promise<fse.Stats>;
    /**
     * Synchronously retrieves the stat object for the Path instance.
     * @returns The stat object for the underlying filepath.
     */
    statSync(): fse.Stats;
    /**
     * Asynchronously checks whether the underlying filepath exists.
     * @returns A boolean of whether the filepath exists or not.
     */
    exists(): Promise<boolean>;
    /**
     * Synchronously checks whether the underlying filepath exists.
     * @returns A boolean of whether the filepath exists or not.
     */
    existsSync(): boolean;
    /**
     * Asynchronously checks whether the Path instance is a directory.
     * @returns A boolean of whether this is a directory or not.
     */
    isDirectory(): Promise<boolean>;
    /**
     * Synchronously checks whether the Path instance is a directory.
     * @returns A boolean of whether this is a directory or not.
     */
    isDirectorySync(): boolean;
    /**
     * Asynchronously checks whether the Path instance is a file.
     * @returns A boolean of whether this is a file or not.
     */
    isFile(): Promise<boolean>;
    /**
     * Synchronously checks whether the Path instance is a file.
     * @returns A boolean of whether this is a file or not.
     */
    isFileSync(): boolean;
    /**
     * Asynchronously checks whether the Path instance is a symlink.
     * @returns A boolean of whether this is a symlink or not.
     */
    isSymbolicLink(): Promise<boolean>;
    /**
     * Synchronously checks whether the Path instance is a symlink.
     * @returns A boolean of whether this is a symlink or not.
     */
    isSymbolicLinkSync(): boolean;
    /**
     * Asynchronously checks whether the Path instance is a socket.
     * @returns A boolean of whether this is a socket or not.
     */
    isSocket(): Promise<boolean>;
    /**
     * Synchronously checks whether the Path instance is a socket.
     * @returns A boolean of whether this is a socket or not.
     */
    isSocketSync(): boolean;
    /**
     * Asynchronously checks whether the Path instance is a first-in-first-out queue.
     * @returns A boolean of whether this is a first-in-first-out queue or not.
     */
    isFIFO(): Promise<boolean>;
    /**
     * Synchronously checks whether the Path instance is a first-in-first-out queue.
     * @returns A boolean of whether this is a first-in-first-out queue or not.
     */
    isFIFOSync(): boolean;
    /**
     * Retrieves the parent directory.
     * @returns The parent directory of this filepath as a Path instance.
     */
    parent(): Path;
    /**
     * Asynchronously determines whether a directory contains a given child filepath or basename.
     * @param child Either a string representing a basename to search for or another Path instance to be located as a child of this instance.
     * @returns The located child as a Path instance or false if no child path could be found.
     */
    containsImmediateChild(child: string | Path): Promise<false | Path>;
    /**
     * Synchronously determines whether a directory contains a given child filepath or basename.
     * @param child Either a string representing a basename to search for or another Path instance to be located as a child of this instance.
     * @returns The located child as a Path instance or false if no child path could be found.
     */
    containsImmediateChildSync(child: string | Path): false | Path;
    /**
     * Asynchronously globs for filepaths stemming from the Path instance.
     * @param patterns A string or collection of strings representing glob patterns to search.
     * @param options FastGlob options, including whether to restrict the globbing to files, directories, etc.
     * @returns An array of globbed Path instances.
     */
    glob(patterns: string | string[], options?: GlobOptions): Promise<Path[]>;
    /**
     * Synchronously globs for filepaths stemming from the Path instance.
     * @param patterns A string or collection of strings representing glob patterns to search.
     * @param options FastGlob options, including whether to restrict the globbing to files, directories, etc.
     * @returns An array of globbed Path instances.
     */
    globSync(patterns: string | string[], options?: GlobOptions): Path[];
    /**
     * Asynchronously collects the children of a directory path as an array of Paths.
     * @returns An array of Path instances that are children of the current instance.
     */
    readDir(): Promise<Path[]>;
    /**
     * Synchronously collects the children of a directory path as an array of Paths.
     * @returns An array of Path instances that are children of the current instance.
     */
    readDirSync(): Path[];
    /**
     * Asynchronously yields child Path instances of the current instance.
     * @yields A Path instance which is a child path of the current instance.
     */
    readDirIter(): AsyncGenerator<Path, void, unknown>;
    /**
     * Synchronously yields child Path instances of the current instance.
     * @yields A Path instance which is a child path of the current instance.
     */
    readDirIterSync(): Generator<Path, void, unknown>;
    /**
     * Asynchronously traverses the tree structure of the directory system, starting from the current instance as the root.
     * and allows for callbacks to occur for each encountered filepath.
     * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
     */
    walk(callback?: (p: Path, ...args: unknown[]) => void): Promise<void>;
    /**
     * Synchronously traverses the tree structure of the directory system, starting from the current instance as the root
     * and allows for callbacks to occur for each encountered filepath.
     * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
     */
    walkSync(callback?: (p: Path, ...args: unknown[]) => void): void;
    /**
     * Asynchronously traverses the tree structure of the directory system, starting from the current instances as the root
     * and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object
     * with two properties: "filepath", which is the Path instance of the filepath at that location, and "children" which is
     * either null in the case of a non-directory or an array of more branch objects.
     * @param asString Whether to convert the "filepath" property automatically to a string representation of the path instead.
     * @returns A representation of the filepath tree structure.
     */
    tree(asString?: boolean, useSystemPathDelimiter?: boolean): Promise<treeBranch>;
    /**
     * Synchronously traverses the tree structure of the directory system, starting from the current instances as the root
     * and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object
     * with two properties: "filepath", which is the Path instance of the filepath at that location, and "children" which is
     * either null in the case of a non-directory or an array of more branch objects.
     * @param asString Whether to convert the "filepath" property automatically to a string representation of the path instead.
     * @returns A representation of the filepath tree structure.
     */
    treeSync(asString?: boolean, useSystemPathDelimiter?: boolean): treeBranch;
    /**
     * Asynchronously creates a new directory, including intermediate parental components.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions to impart on the created directory.
     */
    makeDir(mode?: number): Promise<void>;
    /**
     * Synchronously creates a new directory, including intermediate parental components.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions to impart on the created directory.
     */
    makeDirSync(mode?: number): void;
    /**
     * Asynchronously creates a new file, including intermediate parental components.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions to impart on the created file.
     */
    makeFile(): Promise<void>;
    /**
     * Synchronously creates a new file, including intermediate parental components.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions to impart on the created file.
     */
    makeFileSync(): void;
    /**
     * Asynchronously creates a new symlink of the underlying filepath.
     * @param dst The location of where the symlink should be made.
     */
    makeSymlink(dst: string | Path): Promise<Path>;
    /**
     * Synchronously creates a new symlink of the underlying filepath.
     * @param dst The location of where the symlink should be made.
     */
    makeSymlinkSync(dst: string | Path): Path;
    /**
     * Asynchronously changes the permissions of the underlying filepath.
     * Caveats: on Windows only the write permission can be changed, and the distinction
     * among the permissions of group, owner or others is not implemented.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions.
     */
    chmod(mode: string | number): Promise<void>;
    /**
     * Synchronously changes the permissions of the underlying filepath.
     * Caveats: on Windows only the write permission can be changed, and the distinction
     * among the permissions of group, owner or others is not implemented.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions.
     */
    chmodSync(mode: string | number): void;
    /**
     * Asynchronously changes the ownership of the underlying filepath.
     * @param uid User id.
     * @param gid Group id.
     */
    chown(uid: number, gid: number): Promise<void>;
    /**
     * Synchronously changes the ownership of the underlying filepath.
     * @param uid User id.
     * @param gid Group id.
     */
    chownSync(uid: number, gid: number): void;
    /**
     * Asynchronously moves the underlying filepath to the indicated destination.
     * @param dst The filepath destination to where the underlying path should be moved.
     * If the instance is a directory, the children of the directory will be moved to this location.
     * If the instance is a file, it itself will be moved to the new location.
     * @param overwrite Whether to movewrite existing filepaths during the procedure.
     */
    move(dst: string | Path, overwrite?: boolean): Promise<Path>;
    /**
     * Synchronously moves the underlying filepath to the indicated destination.
     * @param dst The filepath destination to where the underlying path should be moved.
     * If the instance is a directory, the children of the directory will be moved to this location.
     * If the instance is a file, it itself will be moved to the new location.
     * @param overwrite Whether to movewrite existing filepaths during the procedure.
     */
    moveSync(dst: string | Path, overwrite?: boolean): Path;
    /**
     * Asynchronously copies the underlying filepath to the indicated destination.
     * @param dst The filepath destination to where the underlying path should be copied.
     * If the instance is a directory, the children of the directory will be copied to this location.
     * If the instance is a file, it itself will be copied to the new location.
     * @param options.overwrite Whether to overwrite existing filepath during the operation. Defaults to true.
     * @param options.errorOnExist Whether to throw an error if the destination already exists. Defaults to false.
     * @param options.dereference Whether to dereference symlinks during the operation. Defaults to false.
     * @param options.preserveTimestamps Whether to keep the same timestamps that existed in the source files.
     * Defaults to false.
     * @param options.filter A function to filter which filepaths should be copied.
     * Should return true to copy the item, otherwise false.
     */
    copy(dst: string | Path, options?: fse.CopyOptions): Promise<Path>;
    /**
     * Synchronously copies the underlying filepath to the indicated destination.
     * @param dst The filepath destination to where the underlying path should be copied.
     * If the instance is a directory, the children of the directory will be copied to this location.
     * If the instance is a file, it itself will be copied to the new location.
     * @param options.overwrite Whether to overwrite existing filepath during the operation. Defaults to true.
     * @param options.errorOnExist Whether to throw an error if the destination already exists. Defaults to false.
     * @param options.dereference Whether to dereference symlinks during the operation. Defaults to false.
     * @param options.preserveTimestamps Whether to keep the same timestamps that existed in the source files.
     * Defaults to false.
     * @param options.filter A function to filter which filepaths should be copied.
     * Should return true to copy the item, otherwise false.
     */
    copySync(dst: string | Path, options?: fse.CopyOptionsSync): Path;
    /**
     * Asynchronously deletes the underlying filepath.
     */
    remove(): Promise<void>;
    /**
     * Alias for remove(). Asynchronously deletes the underlying filepath.
     */
    unlink(): Promise<void>;
    /**
     * Alias for remove(). Asynchronously deletes the underlying filepath.
     */
    delete(): Promise<void>;
    /**
     * Synchronously deletes the underlying filepath.
     */
    removeSync(): void;
    /**
     * Alias for removeSync(). Synchronously deletes the underlying filepath.
     */
    unlinkSync(): void;
    /**
     * Alias for removeSync(). Synchronously deletes the underlying filepath.
     */
    deleteSync(): void;
    /**
     * Asynchronously parses data coming from a
     * @param options.encoding. The encoding to use in the write operation. Defaults to "utf8".
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to "r".
     * @returns
     */
    readFile(options: {
        encoding: BufferEncoding;
        flag?: string;
    }): Promise<string>;
    readFile(encoding: BufferEncoding): Promise<string>;
    readFile(): Promise<Buffer>;
    readFileSync(options: {
        encoding: BufferEncoding;
        flag?: string;
    }): string;
    readFileSync(encoding: BufferEncoding): string;
    readFileSync(): Buffer;
    /**
     * Asynchronously writes data to the underlying filepath.
     * @param data The data to write to the file.
     * @param options.encoding. The encoding to use in the write operation. Defaults to "utf8".
     * @param options.mode. The permissions of the created file. Defaults to 0o666.
     * @param options.flag. The string denoting the mode in which the file is opened.
     */
    writeFile(data: string | Buffer | Uint8Array, options?: fse.WriteFileOptions): Promise<void>;
    /**
     * Synchronously writes data to the underlying filepath.
     * @param data The data to write to the file.
     * @param options.encoding. The encoding to use in the write operation. Defaults to "utf8".
     * @param options.mode. The permissions of the created file. Defaults to 0o666.
     * @param options.flag. The string denoting the mode in which the file is opened.
     */
    writeFileSync(data: string | Buffer | Uint8Array, options?: fse.WriteFileOptions): void;
    /**
     * Asynchronously reads in the underlying filepath JSON file and parses it into a JSON object.
     * @param options.encoding. The encoding to use when parsing the JSON structure. Defaults to null.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to "r".
     * @returns A JSON object.
     */
    readJSON(options?: string | fse.ReadOptions): Promise<JSONObject>;
    /**
     * Synchronously reads in the underlying filepath JSON file and parses it into a JSON object.
     * @param options.encoding. The encoding to use when parsing the JSON structure. Defaults to null.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to "r".
     * @returns A JSON object.
     */
    readJSONSync(options?: string | fse.ReadOptions): any;
    /**
     * Asynchronously write a JSON-compatible object to a .json file.
     * @param data A JSON-compatible object to write into the file.
     * @param options.space The number of spaces to indent or the character used to substitute for indents.
     * Defaults to 0
     * @param options.EOL The end-of-line character. Defaults to "\n".
     * @param options.replacer. The JSON replacer array or function.
     * @param options.encoding. The encoding to use in the write operation. Defaults to "utf8".
     * @param options.mode. The permissions of the created file. Defaults to 0o666.
     * @param options.flag. The string denoting the mode in which the file is opened.
     * "w" for write and "a" for append. Defaults to "w".
     * @param options.signal. An AbortSignal object that allows the termination of the operation midway.
     */
    writeJSON(data: JSONObject, options?: fse.WriteOptions): Promise<void>;
    /**
     * Synchronously write a JSON-compatible object to a .json file.
     * @param data A JSON-compatible object to write into the file.
     * @param options.space The number of spaces to indent or the character used to substitute for indents.
     * Defaults to 0
     * @param options.EOL The end-of-line character. Defaults to "\n".
     * @param options.replacer. The JSON replacer array or function.
     * @param options.encoding. The encoding to use in the write operation. Defaults to "utf8".
     * @param options.mode. The permissions of the created file. Defaults to 0o666.
     * @param options.flag. The string denoting the mode in which the file is opened.
     * "w" for write and "a" for append. Defaults to "w".
     * @param options.signal. An AbortSignal object that allows the termination of the operation midway.
     */
    writeJSONSync(data: JSONObject, options?: fse.WriteOptions): void;
    /**
     * Wrapper around implementing a Chokidar watcher on the underlying filepath.
     * @param options Chokidar options controlling the behavior of the filepath watcher.
     */
    watch(options?: chokidar.WatchOptions): chokidar.FSWatcher;
}
export default Path;
