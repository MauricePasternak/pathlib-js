"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var normalize_path_1 = __importDefault(require("normalize-path"));
var fast_glob_1 = __importDefault(require("fast-glob"));
var fse = __importStar(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var chokidar_1 = __importDefault(require("chokidar"));
var utils_1 = require("./utils");
var os_1 = require("os");
var Path = /** @class */ (function () {
    /**
     * @param paths A collection of strings which will be **resolved and normalized** into a filepath.
     * @property path The normalized underlying filepath.
     * @property root The root directory of the underlying filepath.
     * @property basename The basename of the underlying filepath.
     * @property dirname An alias for the filepath of the parent directory.
     * @property stem The basename without any extensions.
     * @property ext The last extension found in the basename. Includes period.
     * @property suffixes An array of the individualized extentions, without periods.
     * @property descriptor The filepath descriptor if the underlying filepath is opened. `null` when the filepath is in a closed state.
     */
    function Path() {
        var _a;
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        if (!paths || !paths.length || paths[0] === "") {
            throw new Error("Cannot instantiate a new Path instance on an empty string, empty array, or falsy value");
        }
        this.path = (0, normalize_path_1.default)(path_1.default.resolve(this._expanduser(paths.join("/"))));
        var _b = path_1.default.parse(this.path), dir = _b.dir, root = _b.root, base = _b.base, ext = _b.ext;
        this.root = (0, os_1.platform)() === "win32" ? root.replace("/", "") : root;
        this.basename = base;
        this.dirname = dir;
        _a = __read(this.basename.split(".")), this.stem = _a[0], this.suffixes = _a.slice(1);
        this.ext = ext;
        this.descriptor = null;
    }
    /**
     * Get a Path representation of the current working directory.
     */
    Path.pwd = function () {
        return new Path(process.cwd());
    };
    /**
     * Get a `Path` representation of the current working directory.
     */
    Path.cwd = function () {
        return new Path(process.cwd());
    };
    /**
     * Get a `Path` representation of the home directory.
     */
    Path.home = function () {
        return new Path((0, os_1.homedir)());
    };
    /**
     * Joins filepaths to create a single string representation, delimited by the system-specific
     * environment delimiter.
     * @param paths A collection of strings or Path instances to be joined together using the
     * system-specific environment delimiter (":" vs ";"). Useful for converting a collection
     * of filepaths into a single string to be set as an environment variable.
     * @returns Filepaths concatenated by the system-specific environment delimiter.
     */
    Path.toSystemDelimitedSingleString = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return paths.map(function (p) { return (typeof p === "string" ? new Path(p).toString() : p.toString()); }).join(path_1.default.delimiter);
    };
    /**
     * Converts the PATH variable into an array of `Path` instances.
     * @returns An `Array` of `Path` instances of the filepaths recorded in PATH.
     */
    Path.getPATHAsPaths = function () {
        var e_1, _a;
        var _b, _c, _d;
        var paths = [];
        if (!((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.PATH))
            return paths;
        try {
            for (var _e = __values((_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.PATH) === null || _d === void 0 ? void 0 : _d.split(path_1.default.delimiter)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var p = _f.value;
                if (p === "")
                    continue;
                paths.push(new Path(p));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return paths;
    };
    /**
     * Parses the mode of a filepath into a more understandable octal-like representation (i.e. 777 for full-permissions)
     * @param mode The mode of a filepath, as received from fs.Stats or the fs.Stats object itself
     * @returns A 3-digit representation of the permissions indicated by the provided `mode`.
     */
    Path.parseModeIntoOctal = function (mode) {
        return parseInt(((typeof mode === "number" ? mode : mode.mode) & 511).toString(8), 10);
    };
    Path.prototype._expanduser = function (inputString) {
        return inputString.startsWith("~") ? inputString.replace("~", (0, os_1.homedir)()) + "/" : inputString + "/";
    };
    Path.prototype._parts = function (normalizedString) {
        return (0, os_1.platform)() === "win32" ? normalizedString.split("/") : __spreadArray(["/"], __read(normalizedString.split("/").slice(1)), false);
    };
    /**
     * Splits the underlying filepath into its individual components.
     * @returns An array of the strings comprising the `Path` instance.
     */
    Path.prototype.parts = function () {
        return this._parts(this.path);
    };
    /**
     * Alias for this.parts(). Splits the underlying filepath into its individual components.
     * @returns An array of the strings comprising the `Path` instance.
     */
    Path.prototype.split = function () {
        return this.parts();
    };
    /**
     * Depicts the relative path from the Path instance to another filepath.
     * @param to The filepath that this instance should be compared against.
     * @param useSystemPathDelimiter Whether to present the final string in accordance with the operating system's filepath delimiter.
     * @returns A `string` representation of the relative path.
     */
    Path.prototype.relative = function (to, useSystemPathDelimiter) {
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        var relPath = path_1.default.relative(this.path, typeof to === "string" ? to : to.path);
        return useSystemPathDelimiter ? relPath : (0, normalize_path_1.default)(relPath);
    };
    /**
     * Resolves a sequence of path segments into a new absolute Path. Respects ".." and will increment directories accordingly.
     * Note that strings beginning with a single "." will be treated as if the dot character does not exist. Use the `join()` method
     * as an alternative for treating ".." and "." as literal.
     * @param segments An array of strings respresenting path segments to append and resolve to the underlying path.
     * @returns The resolved `Path` instance.
     */
    Path.prototype.resolve = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        return new (Path.bind.apply(Path, __spreadArray([void 0, this.path], __read(segments), false)))();
    };
    /**
     * Asynchronously retrieves the filepath that the underlying symlink is pointing to.
     * @returns A `Path` instance of the target.
     */
    Path.prototype.readLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.isSymbolicLink()];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error("The underlying path not a symlink.");
                        }
                        _a = Path.bind;
                        return [4 /*yield*/, fse.readlink(this.path)];
                    case 2: return [2 /*return*/, new (_a.apply(Path, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    /**
     * Synchronously retrieves the filepath that the underlying symlink is pointing to.
     * @returns A `Path` instance of the target.
     */
    Path.prototype.readLinkSync = function () {
        if (!this.isSymbolicLinkSync()) {
            throw new Error("The underlying path not a symlink.");
        }
        return new Path(fse.readlinkSync(this.path));
    };
    /**
     * Appends strings to the end of the underlying filepath, creating a new `Path` instance. Note that ".." and "." are treated
     * literally and will not be resolved. For appending file segments with resolving behavior use the `resolve()` method.
     * @param segments Strings which should be appended to the Path instance in order to create a new one.
     * @returns A new `Path` instance with the strings appended.
     */
    Path.prototype.join = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        if (!segments.length)
            throw new Error("Cannot join with an empty string");
        var segmentsAsArr = Array.isArray(segments) ? __spreadArray(__spreadArray([], __read(this.parts()), false), __read(segments), false) : __spreadArray(__spreadArray([], __read(this.parts()), false), [segments], false);
        var newPath = (0, normalize_path_1.default)(segmentsAsArr.join("/"));
        var copyPath = new Path(this.path);
        // Overwrite properties as necessary
        copyPath.path = newPath;
        var newPathParts = path_1.default.parse(newPath);
        copyPath.dirname = newPathParts.dir;
        copyPath.basename = newPathParts.base;
        var _a = __read(newPathParts.base.split(".")), newStem = _a[0], newSuffixes = _a.slice(1);
        copyPath.stem = newStem;
        copyPath.suffixes = newSuffixes;
        copyPath.ext = newPathParts.ext;
        return copyPath;
    };
    /**
     * Alias of the `join()` method. Appends strings to the end of the underlying filepath, creating a new `Path` instance. Note that ".." and "." are treated
     * literally and will not be resolved. For appending file segments with resolving behavior use the `resolve()` method.
     * @param segments Strings which should be appended to the Path instance in order to create a new one.
     * @returns A new `Path` instance with the strings appended.
     */
    Path.prototype.append = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        return this.join.apply(this, __spreadArray([], __read(segments), false));
    };
    /**
     * Creates a new Path instance with a replaced basename.
     * @param name The new basename to replace the existing one.
     * @returns A new `Path` instance featuring the replacement basename.
     */
    Path.prototype.withBasename = function (name) {
        return new Path(__spreadArray(__spreadArray([], __read(this.parts().slice(0, this.parts().length - 1)), false), [name], false).join("/"));
    };
    /**
     * Creates a new Path instance with a replaced stem.
     * @param stem The new stem to replace the existing one.
     * @returns A new `Path` instance featuring the replacement stem.
     */
    Path.prototype.withStem = function (stem) {
        var newBasename = __spreadArray([stem], __read(this.basename.split(".").slice(1)), false).join(".");
        return this.withBasename(newBasename);
    };
    /**
     * Creates a new Path instance with a replaced set of suffix extensions.
     * @param suffix The new suffix to replace the existing one.
     * If provided an array of strings, it will concatenate with with a "." character before appending to the existing stem.
     * If provided a non-blank string, it will overwite anything after the first "." in the current basename.
     * If a blank string is provided, then all extensions will be removed.
     * @returns A new `Path` instance featuring the replaced suffix(es).
     */
    Path.prototype.withSuffix = function (suffix) {
        var newSuffixes = suffix === "" ? [] : Array.isArray(suffix) ? suffix.map(function (s) { return (0, utils_1.trimChars)(s, ["."]); }) : [(0, utils_1.trimChars)(suffix, ["."])];
        var newBasename = __spreadArray([this.stem], __read(newSuffixes), false).join(".");
        return this.withBasename(newBasename);
    };
    /**
     * Creates a new Path instance with a replaced last extension.
     * @param ext The new extension to replace the existing one.
     * @returns A new `Path` instance featuring the replacement last extension.
     */
    Path.prototype.withExtension = function (ext) {
        var newSuffixes = this.suffixes.length >= 1 ? __spreadArray(__spreadArray([], __read(this.suffixes.slice(0, this.suffixes.length - 1)), false), [ext], false) : [ext];
        return this.withBasename(__spreadArray([this.stem], __read(newSuffixes.map(function (s) { return (0, utils_1.trimChars)(s, ["."]); })), false).join("."));
    };
    /**
     * Depicts a string version of the Path instance.
     * @param useSystemPathDelimiter Whether to respect the system-specific filepath delimiter. Defaults to `false`.
     * @returns A `string` representation of the underlying filepath.
     */
    Path.prototype.toString = function (useSystemPathDelimiter) {
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        return useSystemPathDelimiter ? this.parts().join(path_1.default.sep) : this.path;
    };
    /**
     * Depicts an Object version of the Path instance.
     * @param useSystemPathDelimiter Whether to respect the system-specific filepath delimiter. Defaults to `false`.
     * @returns An `Object` representation of the underlying filepath.
     */
    Path.prototype.toJSON = function (useSystemPathDelimiter) {
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        return {
            path: this.toString(useSystemPathDelimiter),
            root: this.root,
            basename: this.basename,
            stem: this.stem,
            ext: this.ext,
            suffixes: this.suffixes,
        };
    };
    /**
     * Asynchronously retrieves the stat object for the filepath.
     * @returns The `Stats` object for the underlying filepath.
     */
    Path.prototype.stat = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fse.stat(this.path)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Synchronously retrieves the stat object for the filepath.
     * @returns The `Stats` object for the underlying filepath.
     */
    Path.prototype.statSync = function () {
        return fse.statSync(this.path);
    };
    /**
     * Asynchronously checks whether the underlying filepath exists.
     * @returns A `boolean` of whether the filepath exists or not.
     */
    Path.prototype.exists = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fse.pathExists(this.path)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the underlying filepath exists.
     * @returns A `boolean` of whether the filepath exists or not.
     */
    Path.prototype.existsSync = function () {
        return fse.pathExistsSync(this.path);
    };
    Path.prototype._interpSystemError = function (err) {
        if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT")
            return false;
        throw new Error(err.message);
    };
    /**
     * Asynchronously checks whether the filepath is a directory.
     * @returns A `boolean` of whether this is a directory or not.
     */
    Path.prototype.isDirectory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.stat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isDirectory()];
                    case 2:
                        _err_1 = _a.sent();
                        return [2 /*return*/, this._interpSystemError(_err_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the filepath is a directory.
     * @returns A `boolean` of whether this is a directory or not.
     */
    Path.prototype.isDirectorySync = function () {
        try {
            return fse.statSync(this.path).isDirectory();
        }
        catch (_err) {
            return this._interpSystemError(_err);
        }
    };
    /**
     * Asynchronously checks whether the filepath is a file.
     * @returns A `boolean` of whether this is a file or not.
     */
    Path.prototype.isFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.stat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isFile()];
                    case 2:
                        _err_2 = _a.sent();
                        return [2 /*return*/, this._interpSystemError(_err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the filepath is a file.
     * @returns A `boolean` of whether this is a file or not.
     */
    Path.prototype.isFileSync = function () {
        try {
            return fse.statSync(this.path).isFile();
        }
        catch (_err) {
            return this._interpSystemError(_err);
        }
    };
    /**
     * Asynchronously checks whether the filepath is a symlink.
     * @returns A `boolean` of whether this is a symlink or not.
     */
    Path.prototype.isSymbolicLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.lstat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isSymbolicLink()];
                    case 2:
                        _err_3 = _a.sent();
                        return [2 /*return*/, this._interpSystemError(_err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the filepath is a symlink.
     * @returns A `boolean` of whether this is a symlink or not.
     */
    Path.prototype.isSymbolicLinkSync = function () {
        try {
            return fse.lstatSync(this.path).isSymbolicLink();
        }
        catch (_err) {
            return this._interpSystemError(_err);
        }
    };
    /**
     * Asynchronously checks whether the filepath is a socket.
     * @returns A `boolean` of whether this is a socket or not.
     */
    Path.prototype.isSocket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.stat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isSocket()];
                    case 2:
                        _err_4 = _a.sent();
                        return [2 /*return*/, this._interpSystemError(_err_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the filepath is a socket.
     * @returns A `boolean` of whether this is a socket or not.
     */
    Path.prototype.isSocketSync = function () {
        try {
            return fse.statSync(this.path).isSocket();
        }
        catch (_err) {
            return this._interpSystemError(_err);
        }
    };
    /**
     * Asynchronously checks whether the filepath is a first-in-first-out queue.
     * @returns A `boolean` of whether this is a first-in-first-out queue or not.
     */
    Path.prototype.isFIFO = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.stat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isFIFO()];
                    case 2:
                        _err_5 = _a.sent();
                        return [2 /*return*/, this._interpSystemError(_err_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the filepath is a first-in-first-out queue.
     * @returns A `boolean` of whether this is a first-in-first-out queue or not.
     */
    Path.prototype.isFIFOSync = function () {
        try {
            return fse.statSync(this.path).isFIFO();
        }
        catch (_err) {
            return this._interpSystemError(_err);
        }
    };
    /**
     * Retrieves the parent directory or an earlier ancestor filepath.
     * @param numIncrements The number of directory levels to ascend. If this number exceeds number of ascentions required to reach the root directory,
     * then the root directory itself is returned. If this number is 0 or less, it will return a copy of the current Path.
     * Defaults to `undefined`, meaning that the immediate parent directory is returned.
     * @returns The parent or higher ancestor (i.e grandparent) directory of this filepath as a `Path` instance.
     */
    Path.prototype.parent = function (numIncrements) {
        if (numIncrements == null)
            return new Path(this.dirname);
        var parts = this.parts();
        return new Path(numIncrements >= parts.length ? this.root : parts.slice(0, parts.length - numIncrements).join("/"));
    };
    /**
     * Asynchronously determines whether a directory contains a given child filepath or basename.
     * @param child Either a string representing a basename to search for or another Path instance to be located as a child of this instance.
     * @returns The located child as a `Path` instance or `false` if no child path could be found.
     */
    Path.prototype.containsImmediateChild = function (child) {
        var e_2, _a, e_3, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d, childPath, e_2_1, _e, _f, childPath, e_3_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.isDirectory()];
                    case 1:
                        if (!(_g.sent()))
                            throw new Error("Cannot check the child of a path that is not a directory");
                        if (!(typeof child === "string")) return [3 /*break*/, 14];
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 7, 8, 13]);
                        _c = __asyncValues(this.readDirIter());
                        _g.label = 3;
                    case 3: return [4 /*yield*/, _c.next()];
                    case 4:
                        if (!(_d = _g.sent(), !_d.done)) return [3 /*break*/, 6];
                        childPath = _d.value;
                        if (childPath.basename === child)
                            return [2 /*return*/, childPath];
                        _g.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _g.trys.push([8, , 11, 12]);
                        if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(_c)];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, false];
                    case 14:
                        _g.trys.push([14, 19, 20, 25]);
                        _e = __asyncValues(this.readDirIter());
                        _g.label = 15;
                    case 15: return [4 /*yield*/, _e.next()];
                    case 16:
                        if (!(_f = _g.sent(), !_f.done)) return [3 /*break*/, 18];
                        childPath = _f.value;
                        if (childPath.path === child.path)
                            return [2 /*return*/, childPath];
                        _g.label = 17;
                    case 17: return [3 /*break*/, 15];
                    case 18: return [3 /*break*/, 25];
                    case 19:
                        e_3_1 = _g.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 25];
                    case 20:
                        _g.trys.push([20, , 23, 24]);
                        if (!(_f && !_f.done && (_b = _e.return))) return [3 /*break*/, 22];
                        return [4 /*yield*/, _b.call(_e)];
                    case 21:
                        _g.sent();
                        _g.label = 22;
                    case 22: return [3 /*break*/, 24];
                    case 23:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 24: return [7 /*endfinally*/];
                    case 25: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Synchronously determines whether a directory contains a given child filepath or basename.
     * @param child Either a string representing a basename to search for or another Path instance to be located as a child of this instance.
     * @returns The located child as a `Path` instance or `false` if no child path could be found.
     */
    Path.prototype.containsImmediateChildSync = function (child) {
        var e_4, _a, e_5, _b;
        if (!this.isDirectorySync())
            throw new Error("Cannot check the child of a path that is not a directory");
        if (typeof child === "string") {
            try {
                for (var _c = __values(this.readDirIterSync()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var childPath = _d.value;
                    if (childPath.basename === child)
                        return childPath;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return false;
        }
        else {
            try {
                for (var _e = __values(this.readDirIterSync()), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var childPath = _f.value;
                    if (childPath.path === child.path)
                        return childPath;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return false;
        }
    };
    // Private utility function for appending glob patterns to the underlying filepath.
    Path.prototype._prepGlobPatterns = function (patterns) {
        var _this = this;
        return Array.isArray(patterns)
            ? patterns.map(function (pat) { return [_this.path, pat].join("/"); })
            : [[this.path, patterns].join("/")];
    };
    /**
     * Asynchronously globs for filepaths stemming from the Path instance.
     * @param patterns A string or collection of strings representing glob patterns to search.
     * @param options [fast-glob options](https://www.npmjs.com/package/fast-glob#api), including whether to restrict the globbing to files, directories, etc.
     * @returns An `array` of globbed `Path` instances.
     */
    Path.prototype.glob = function (patterns, options) {
        return __awaiter(this, void 0, void 0, function () {
            var globs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fast_glob_1.default)(this._prepGlobPatterns(patterns), options && Object.assign(options, { stats: false, objectMode: false }))];
                    case 1:
                        globs = _a.sent();
                        return [2 /*return*/, globs.map(function (p) { return new Path(p); })];
                }
            });
        });
    };
    /**
     * Asynchronously glob for filepaths stemming from the Path instance while yielding them instead of returning
     * an immediate array.
     * @param patterns A string or collection of strings representing glob patterns to search.
     * @param options [fast-glob options](https://www.npmjs.com/package/fast-glob#api), including whether to restrict the globbing to files, directories, etc.
     * @yields `Path` instances.
     */
    Path.prototype.globIter = function (patterns, options) {
        return __asyncGenerator(this, arguments, function globIter_1() {
            var _a, _b, fp, e_6_1;
            var e_6, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, 8, 13]);
                        _a = __asyncValues(fast_glob_1.default.stream(this._prepGlobPatterns(patterns), options && Object.assign(options, { stats: false, objectMode: false })));
                        _d.label = 1;
                    case 1: return [4 /*yield*/, __await(_a.next())];
                    case 2:
                        if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 6];
                        fp = _b.value;
                        return [4 /*yield*/, __await(typeof fp === "string" ? new Path(fp) : new Path(fp.toString()))];
                    case 3: return [4 /*yield*/, _d.sent()];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5: return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_6_1 = _d.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, __await(_c.call(_a))];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously globs for filepaths stemming from the Path instance.
     * @param patterns A string or collection of strings representing glob patterns to search.
     * @param options [fast-glob options](https://www.npmjs.com/package/fast-glob#api), including whether to restrict the globbing to files, directories, etc.
     * @returns An `array` of globbed `Path` instances.
     */
    Path.prototype.globSync = function (patterns, options) {
        return fast_glob_1.default
            .sync(this._prepGlobPatterns(patterns), options && Object.assign(options, { stats: false, objectMode: false }))
            .map(function (p) { return new Path(p); });
    };
    /**
     * Asynchronously collects the children of a directory path.
     * @returns An `array` of `Path` instances that are children of the current instance.
     */
    Path.prototype.readDir = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fse.readdir(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (basename) { return new Path(_this.path, basename); })];
                }
            });
        });
    };
    /**
     * Synchronously collects the children of a directory path.
     * @returns An `array` of `Path` instances that are children of the current instance.
     */
    Path.prototype.readDirSync = function () {
        var _this = this;
        return fse.readdirSync(this.path).map(function (basename) { return _this.resolve(basename); });
    };
    /**
     * Asynchronously yields child filepaths.
     * @yields A child `Path` instance.
     */
    Path.prototype.readDirIter = function () {
        return __asyncGenerator(this, arguments, function readDirIter_1() {
            var _a, _b, dir, e_7_1;
            var e_7, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, 9, 14]);
                        return [4 /*yield*/, __await(fse.opendir(this.path))];
                    case 1:
                        _a = __asyncValues.apply(void 0, [_d.sent()]);
                        _d.label = 2;
                    case 2: return [4 /*yield*/, __await(_a.next())];
                    case 3:
                        if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 7];
                        dir = _b.value;
                        return [4 /*yield*/, __await(this.resolve(dir.name))];
                    case 4: return [4 /*yield*/, _d.sent()];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6: return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_7_1 = _d.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_c.call(_a))];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_7) throw e_7.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously yields child filepaths.
     * @yields A child `Path` instance.
     */
    Path.prototype.readDirIterSync = function () {
        var iterator, filesLeft, fileDirent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    iterator = fse.opendirSync(this.path);
                    filesLeft = true;
                    _a.label = 1;
                case 1:
                    if (!filesLeft) return [3 /*break*/, 5];
                    fileDirent = iterator.readSync();
                    if (!(fileDirent != null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.resolve(fileDirent.name)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    filesLeft = false;
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    };
    Path.prototype.getPathsNLevelsAway = function (depth, asIterator, options) {
        if (asIterator === void 0) { asIterator = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, globStar, _b, targetParent, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        options && Object.assign(options, { stats: false, objectMode: false });
                        _a = depth > 1;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.isDirectory()];
                    case 1:
                        _a = !(_d.sent());
                        _d.label = 2;
                    case 2:
                        // Sanity check; child globbing only makes sense if the underlying filepath is a directory
                        if (_a)
                            throw new Error("Cannot retrieve downstream filepaths for non-directory filepaths");
                        if (!(depth > 0)) return [3 /*break*/, 6];
                        globStar = __spreadArray([], __read(Array(depth).keys()), false).reduce(function (acc) { return acc + "*"; }, "");
                        if (!asIterator) return [3 /*break*/, 3];
                        _b = this.globIter(globStar, options);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.glob(globStar, options)];
                    case 4:
                        _b = _d.sent();
                        _d.label = 5;
                    case 5: return [2 /*return*/, _b];
                    case 6:
                        targetParent = this.parent();
                        depth += 1;
                        while (depth < 1) {
                            targetParent = targetParent.parent();
                            depth += 1;
                        }
                        if (!asIterator) return [3 /*break*/, 7];
                        _c = targetParent.globIter("*", options);
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, targetParent.glob("*", options)];
                    case 8:
                        _c = _d.sent();
                        _d.label = 9;
                    case 9: return [2 /*return*/, _c];
                }
            });
        });
    };
    /**
     * Asynchronously traverses the tree structure of the directory system, starting from the current instance as the root and allows for callbacks to occur for each encountered filepath.
     * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
     */
    Path.prototype.walk = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            function walkStep(filepath, callback) {
                var e_8, _a;
                return __awaiter(this, void 0, void 0, function () {
                    var _b, _c, p, e_8_1;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 7, 8, 13]);
                                _b = __asyncValues(filepath.readDirIter());
                                _d.label = 1;
                            case 1: return [4 /*yield*/, _b.next()];
                            case 2:
                                if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                                p = _c.value;
                                callback && callback(p);
                                return [4 /*yield*/, p.isDirectory()];
                            case 3:
                                if (!_d.sent()) return [3 /*break*/, 5];
                                return [4 /*yield*/, walkStep(p, callback)];
                            case 4:
                                _d.sent();
                                _d.label = 5;
                            case 5: return [3 /*break*/, 1];
                            case 6: return [3 /*break*/, 13];
                            case 7:
                                e_8_1 = _d.sent();
                                e_8 = { error: e_8_1 };
                                return [3 /*break*/, 13];
                            case 8:
                                _d.trys.push([8, , 11, 12]);
                                if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 10];
                                return [4 /*yield*/, _a.call(_b)];
                            case 9:
                                _d.sent();
                                _d.label = 10;
                            case 10: return [3 /*break*/, 12];
                            case 11:
                                if (e_8) throw e_8.error;
                                return [7 /*endfinally*/];
                            case 12: return [7 /*endfinally*/];
                            case 13: return [2 /*return*/];
                        }
                    });
                });
            }
            return __generator(this, function (_a) {
                walkStep(this, callback);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Synchronously traverses the tree structure of the directory system, starting from the current instance as the root and allows for callbacks to occur for each encountered filepath.
     * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
     */
    Path.prototype.walkSync = function (callback) {
        function walkStep(filepath, callback) {
            var e_9, _a;
            try {
                for (var _b = __values(filepath.readDirIterSync()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fp = _c.value;
                    callback && callback(fp);
                    if (fp.isDirectorySync()) {
                        walkStep(fp, callback);
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        walkStep(this, callback);
    };
    Path.prototype.tree = function (asString, useSystemPathDelimiter) {
        if (asString === void 0) { asString = false; }
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        function traverseBranch(branchRoot, prevDepth) {
            return __awaiter(this, void 0, void 0, function () {
                var branch, _a, _b, p, _c, _d, _e, e_10_1, branch, _f, _g, p, _h, _j, _k, e_11_1;
                var e_10, _l, e_11, _m;
                return __generator(this, function (_o) {
                    switch (_o.label) {
                        case 0:
                            if (!asString) return [3 /*break*/, 11];
                            branch = {
                                filepath: branchRoot.toString(useSystemPathDelimiter),
                                depth: prevDepth + 1,
                                children: [],
                            };
                            _o.label = 1;
                        case 1:
                            _o.trys.push([1, 8, 9, 10]);
                            _a = __values(branchRoot.readDirIterSync()), _b = _a.next();
                            _o.label = 2;
                        case 2:
                            if (!!_b.done) return [3 /*break*/, 7];
                            p = _b.value;
                            if (!p.isDirectorySync()) return [3 /*break*/, 5];
                            _c = branch.children;
                            if (!_c) return [3 /*break*/, 4];
                            _e = (_d = branch.children).push;
                            return [4 /*yield*/, traverseBranch(p, prevDepth + 1)];
                        case 3:
                            _c = _e.apply(_d, [(_o.sent())]);
                            _o.label = 4;
                        case 4:
                            _c;
                            return [3 /*break*/, 6];
                        case 5:
                            branch.children &&
                                branch.children.push({
                                    filepath: p.toString(useSystemPathDelimiter),
                                    depth: prevDepth + 2,
                                    children: null,
                                });
                            _o.label = 6;
                        case 6:
                            _b = _a.next();
                            return [3 /*break*/, 2];
                        case 7: return [3 /*break*/, 10];
                        case 8:
                            e_10_1 = _o.sent();
                            e_10 = { error: e_10_1 };
                            return [3 /*break*/, 10];
                        case 9:
                            try {
                                if (_b && !_b.done && (_l = _a.return)) _l.call(_a);
                            }
                            finally { if (e_10) throw e_10.error; }
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/, branch];
                        case 11:
                            branch = {
                                filepath: branchRoot,
                                depth: prevDepth + 1,
                                children: [],
                            };
                            _o.label = 12;
                        case 12:
                            _o.trys.push([12, 19, 20, 21]);
                            _f = __values(branchRoot.readDirIterSync()), _g = _f.next();
                            _o.label = 13;
                        case 13:
                            if (!!_g.done) return [3 /*break*/, 18];
                            p = _g.value;
                            if (!p.isDirectorySync()) return [3 /*break*/, 16];
                            _h = branch.children;
                            if (!_h) return [3 /*break*/, 15];
                            _k = (_j = branch.children).push;
                            return [4 /*yield*/, traverseBranch(p, prevDepth + 1)];
                        case 14:
                            _h = _k.apply(_j, [(_o.sent())]);
                            _o.label = 15;
                        case 15:
                            _h;
                            return [3 /*break*/, 17];
                        case 16:
                            branch.children &&
                                branch.children.push({
                                    filepath: p,
                                    depth: prevDepth + 2,
                                    children: null,
                                });
                            _o.label = 17;
                        case 17:
                            _g = _f.next();
                            return [3 /*break*/, 13];
                        case 18: return [3 /*break*/, 21];
                        case 19:
                            e_11_1 = _o.sent();
                            e_11 = { error: e_11_1 };
                            return [3 /*break*/, 21];
                        case 20:
                            try {
                                if (_g && !_g.done && (_m = _f.return)) _m.call(_f);
                            }
                            finally { if (e_11) throw e_11.error; }
                            return [7 /*endfinally*/];
                        case 21: return [2 /*return*/, branch];
                    }
                });
            });
        }
        return traverseBranch(this, -1);
    };
    Path.prototype.treeSync = function (asString, useSystemPathDelimiter) {
        if (asString === void 0) { asString = false; }
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        function traverseBranch(branchRoot, prevDepth) {
            var e_12, _a, e_13, _b;
            if (asString) {
                var branch = {
                    filepath: branchRoot.toString(useSystemPathDelimiter),
                    depth: prevDepth + 1,
                    children: [],
                };
                try {
                    for (var _c = __values(branchRoot.readDirIterSync()), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var p = _d.value;
                        if (p.isDirectorySync()) {
                            branch.children && branch.children.push(traverseBranch(p, prevDepth + 1));
                        }
                        else {
                            branch.children &&
                                branch.children.push({
                                    filepath: p.toString(useSystemPathDelimiter),
                                    depth: prevDepth + 2,
                                    children: null,
                                });
                        }
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_12) throw e_12.error; }
                }
                return branch;
            }
            else {
                var branch = {
                    filepath: branchRoot,
                    depth: prevDepth + 1,
                    children: [],
                };
                try {
                    for (var _e = __values(branchRoot.readDirIterSync()), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var p = _f.value;
                        if (p.isDirectorySync()) {
                            branch.children && branch.children.push(traverseBranch(p, prevDepth + 1));
                        }
                        else {
                            branch.children &&
                                branch.children.push({
                                    filepath: p,
                                    depth: prevDepth + 2,
                                    children: null,
                                });
                        }
                    }
                }
                catch (e_13_1) { e_13 = { error: e_13_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_13) throw e_13.error; }
                }
                return branch;
            }
        }
        return traverseBranch(this, -1);
    };
    /**
     * Asynchronously creates a new directory, including intermediate parental components.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511) representation of the new filepath permissions to impart on the created directory.
     */
    Path.prototype.makeDir = function (mode) {
        if (mode === void 0) { mode = 511; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.suffixes.length)
                    throw new Error("Cannot use makeDir on a file-like type");
                fse.ensureDir(this.path, mode);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Synchronously creates a new directory, including intermediate parental components.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511) representation of the new filepath permissions to impart on the created directory.
     */
    Path.prototype.makeDirSync = function (mode) {
        if (mode === void 0) { mode = 511; }
        if (this.suffixes.length)
            throw new Error("Cannot use makeDir on a file-like type");
        fse.ensureDirSync(this.path, mode);
    };
    /**
     * Asynchronously creates a new file, including intermediate parental components.
     */
    Path.prototype.makeFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.suffixes.length === 0)
                    throw new Error("Cannot use makeDir on a directory-like type");
                fse.ensureFile(this.path);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Synchronously creates a new file, including intermediate parental components.
     */
    Path.prototype.makeFileSync = function () {
        if (this.suffixes.length === 0)
            throw new Error("Cannot use makeDir on a directory-like type");
        fse.ensureFileSync(this.path);
    };
    Path.prototype._interpPossibleRelativePath = function (target, interpRelativeSource) {
        if (typeof target === "string") {
            return interpRelativeSource === "path" && !path_1.default.isAbsolute(target) ? this.resolve(target) : new Path(target);
        }
        else {
            return target;
        }
    };
    Path.prototype._inferWindowsSymlinkType = function (target) {
        if (target.isDirectorySync()) {
            return "dir";
        }
        else if (target.isFileSync()) {
            return "file";
        }
        else {
            throw new Error("Cannot create symlink to a filepath that is neither file nor directory.");
        }
    };
    /**
     * Asynchronously creates a symlink. Either links the underlying filepath to a created symlink or has a target filepath be linking by the underlying symlink.
     * @param target The corresponding target filepath that a symlink should be made to OR that is a symlink linking to the underlying filepath.
     * @param targetIsLink Whether the filepath indicate in "target" should be treated as a symlink.
     * - If `true`, then the target is treated as the link and the underlying filepath must be an existing file or directory.
     * - If `false`, then the target must be an existing file or directory and the underlying filepath is the symlink.
     * @param type On Windows only, a value of either "file" or "dir" denoting the type of symlink to create.
     * Defaults to undefined, where an inference will be made based on the filepath being linked.
     * @returns The filepath outlined in `target` as a `Path` instance.
     */
    Path.prototype.makeSymlink = function (target, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var defaultOptions, updatedOptions, targetPath, linkType, linkType;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        defaultOptions = { targetIsLink: true, interpRelativeSource: "cwd", type: undefined };
                        updatedOptions = options == null ? defaultOptions : Object.assign(defaultOptions, options);
                        targetPath = this._interpPossibleRelativePath(target, updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.interpRelativeSource);
                        if (!((0, os_1.platform)() === "win32")) return [3 /*break*/, 7];
                        if (!(updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.targetIsLink)) return [3 /*break*/, 3];
                        linkType = updatedOptions.type ? updatedOptions.type : this._inferWindowsSymlinkType(this);
                        return [4 /*yield*/, this.exists()];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error("The underlying source filepath does not exist. Cannot create a symlink if the source does not exist.");
                        }
                        return [4 /*yield*/, fse.ensureSymlink(this.path, targetPath.path, linkType)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        linkType = (_a = updatedOptions.type) !== null && _a !== void 0 ? _a : this._inferWindowsSymlinkType(targetPath);
                        return [4 /*yield*/, targetPath.exists()];
                    case 4:
                        if (!(_b.sent())) {
                            throw new Error("The target filepath does not exist. Cannot create a symlink if the target does not exist.");
                        }
                        return [4 /*yield*/, fse.ensureSymlink(targetPath.path, this.path, linkType)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        if (!updatedOptions.targetIsLink) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.exists()];
                    case 8:
                        if (!(_b.sent())) {
                            throw new Error("The underlying source filepath does not exist. Cannot create a symlink if the source does not exist.");
                        }
                        return [4 /*yield*/, fse.ensureSymlink(this.path, targetPath.path)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 10: return [4 /*yield*/, targetPath.exists()];
                    case 11:
                        if (!(_b.sent())) {
                            throw new Error("The target filepath does not exist. Cannot create a symlink if the target does not exist.");
                        }
                        return [4 /*yield*/, fse.ensureSymlink(targetPath.path, this.path)];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13: return [2 /*return*/, targetPath];
                }
            });
        });
    };
    /**
     * Synchronously creates a symlink. Either links the underlying filepath to a created symlink or has a target filepath be linking by the underlying symlink.
     * @param target The corresponding target filepath that a symlink should be made to OR that is a symlink linking to the underlying filepath.
     * @param targetIsLink Whether the filepath indicate in "target" should be treated as a symlink.
     * - If `true`, then the target is treated as the link and the underlying filepath must be an existing file or directory.
     * - If `false`, then the target must be an existing file or directory and the underlying filepath is the symlink.
     * @param type On Windows only, a value of either "file" or "dir" denoting the type of symlink to create.
     * Defaults to undefined, where an inference will be made based on the filepath being linked.
     * @returns The filepath outlined in `target` as a `Path` instance.
     */
    Path.prototype.makeSymlinkSync = function (target, options) {
        var _a;
        var defaultOptions = { targetIsLink: true, interpRelativeSource: "cwd", type: undefined };
        var updatedOptions = options == null ? defaultOptions : Object.assign(defaultOptions, options);
        var targetPath = this._interpPossibleRelativePath(target, updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.interpRelativeSource);
        if ((0, os_1.platform)() === "win32") {
            if (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.targetIsLink) {
                var linkType = updatedOptions.type ? updatedOptions.type : this._inferWindowsSymlinkType(this);
                if (!this.existsSync()) {
                    throw new Error("The underlying source filepath does not exist. Cannot create a symlink if the source does not exist.");
                }
                fse.ensureSymlinkSync(this.path, targetPath.path, linkType);
            }
            else {
                var linkType = (_a = updatedOptions.type) !== null && _a !== void 0 ? _a : this._inferWindowsSymlinkType(targetPath);
                if (!targetPath.existsSync()) {
                    throw new Error("The target filepath does not exist. Cannot create a symlink if the target does not exist.");
                }
                fse.ensureSymlinkSync(targetPath.path, this.path, linkType);
            }
        }
        else {
            if (updatedOptions.targetIsLink) {
                if (!this.existsSync()) {
                    throw new Error("The underlying source filepath does not exist. Cannot create a symlink if the source does not exist.");
                }
                fse.ensureSymlinkSync(this.path, targetPath.path);
            }
            else {
                if (!targetPath.existsSync()) {
                    throw new Error("The target filepath does not exist. Cannot create a symlink if the target does not exist.");
                }
                fse.ensureSymlinkSync(targetPath.path, this.path);
            }
        }
        return targetPath;
    };
    Path.prototype.access = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, accessArr, resultArr, accessArr_1, accessArr_1_1, check, error_2, e_14_1;
            var e_14, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof mode === "number")) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fse.access(this.path, mode)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, false];
                    case 4:
                        accessArr = [fse.constants.R_OK, fse.constants.W_OK, fse.constants.X_OK];
                        resultArr = [];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 12, 13, 14]);
                        accessArr_1 = __values(accessArr), accessArr_1_1 = accessArr_1.next();
                        _b.label = 6;
                    case 6:
                        if (!!accessArr_1_1.done) return [3 /*break*/, 11];
                        check = accessArr_1_1.value;
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, fse.access(this.path, check)];
                    case 8:
                        _b.sent();
                        resultArr.push(true);
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _b.sent();
                        resultArr.push(false);
                        return [3 /*break*/, 10];
                    case 10:
                        accessArr_1_1 = accessArr_1.next();
                        return [3 /*break*/, 6];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_14_1 = _b.sent();
                        e_14 = { error: e_14_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (accessArr_1_1 && !accessArr_1_1.done && (_a = accessArr_1.return)) _a.call(accessArr_1);
                        }
                        finally { if (e_14) throw e_14.error; }
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, Object.fromEntries([
                            ["canRead", resultArr[0]],
                            ["canWrite", resultArr[1]],
                            ["canExecute", resultArr[2]],
                        ])];
                }
            });
        });
    };
    Path.prototype.accessSync = function (mode) {
        var e_15, _a;
        if (typeof mode === "number") {
            try {
                fse.accessSync(this.path, mode);
                return true;
            }
            catch (error) {
                return false;
            }
        }
        var accessArr = [fse.constants.R_OK, fse.constants.W_OK, fse.constants.X_OK];
        var resultArr = [];
        try {
            for (var accessArr_2 = __values(accessArr), accessArr_2_1 = accessArr_2.next(); !accessArr_2_1.done; accessArr_2_1 = accessArr_2.next()) {
                var check = accessArr_2_1.value;
                try {
                    fse.accessSync(this.path, check);
                    resultArr.push(true);
                }
                catch (error) {
                    resultArr.push(false);
                }
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (accessArr_2_1 && !accessArr_2_1.done && (_a = accessArr_2.return)) _a.call(accessArr_2);
            }
            finally { if (e_15) throw e_15.error; }
        }
        return Object.fromEntries([
            ["canRead", resultArr[0]],
            ["canWrite", resultArr[1]],
            ["canExecute", resultArr[2]],
        ]);
    };
    /**
     * Asynchronously changes the permissions of the underlying filepath.
     * * Caveats: on Windows only the write permission can be changed, and the distinction
     * among the permissions of group, owner or others is not implemented.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511) representation of the new filepath permissions.
     */
    Path.prototype.chmod = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fse.chmod(this.path, mode)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously changes the permissions of the underlying filepath.
     * * Caveats: on Windows only the write permission can be changed, and the distinction
     * among the permissions of group, owner or others is not implemented.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511) representation of the new filepath permissions.
     */
    Path.prototype.chmodSync = function (mode) {
        fse.chmodSync(this.path, mode);
    };
    /**
     * Asynchronously changes the ownership of the underlying filepath.
     * @param uid User id.
     * @param gid Group id.
     */
    Path.prototype.chown = function (uid, gid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fse.chown(this.path, uid, gid);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Synchronously changes the ownership of the underlying filepath.
     * @param uid User id.
     * @param gid Group id.
     */
    Path.prototype.chownSync = function (uid, gid) {
        fse.chownSync(this.path, uid, gid);
    };
    /**
     * Asynchronously moves the underlying filepath to the indicated destination.
     * @param dst The filepath destination to where the underlying path should be moved.
     * - If the instance is a directory, the children of the directory will be moved to this location.
     * - If the instance is a file, it itself will be moved to the new location.
     * @param options.overwrite Whether to overwrite existing filepaths. Defaults to `false`.
     * @param options.interpSource A string controlling how relative paths are interpreted if `dst` is relative.
     * - `"cwd"` **(default)** interprets them to be relative to the current working directory.
     * - `"path"` interprets them to be relative to the path calling this method.
     */
    Path.prototype.move = function (dst, options) {
        return __awaiter(this, void 0, void 0, function () {
            var dest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dest = this._interpPossibleRelativePath(dst, options === null || options === void 0 ? void 0 : options.interpRelativeSource);
                        return [4 /*yield*/, fse.move(this.path, dest.path, options !== null && options !== void 0 ? options : { overwrite: false })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, dest];
                }
            });
        });
    };
    /**
     * Synchronously moves the underlying filepath to the indicated destination.
     * @param dst The filepath destination to where the underlying path should be moved.
     * - If the instance is a directory, the children of the directory will be moved to this location.
     * - If the instance is a file, it itself will be moved to the new location.
     * @param options.overwrite Whether to overwrite existing filepaths. Defaults to `false`.
     * @param options.interpSource A string controlling how relative paths are interpreted if `dst` is relative.
     * - `"cwd"` **(default)** interprets them to be relative to the current working directory.
     * - `"path"` interprets them to be relative to the path calling this method.
     */
    Path.prototype.moveSync = function (dst, options) {
        var dest = this._interpPossibleRelativePath(dst, options === null || options === void 0 ? void 0 : options.interpRelativeSource);
        fse.moveSync(this.path, dest.path, options !== null && options !== void 0 ? options : { overwrite: false });
        return dest;
    };
    /**
     * Asynchronously copies the underlying filepath to the indicated destination.
     * @param dst The filepath destination to where the underlying path should be copied.
     * If the instance is a directory, the children of the directory will be copied to this location.
     * If the instance is a file, it itself will be copied to the new location.
     * @param options.interpSource A string controlling how relative paths are interpreted if `dst` is relative.
     * - `"cwd"` **(default)** interprets them to be relative to the current working directory.
     * - `"path"` interprets them to be relative to the path calling this method.
     * @param options.overwrite Whether to overwrite existing filepath during the operation. Defaults to `true`.
     * @param options.errorOnExist Whether to throw an error if the destination already exists. Defaults to `false`.
     * @param options.dereference Whether to dereference symlinks during the operation. Defaults to `false`.
     * @param options.preserveTimestamps Whether to keep the same timestamps that existed in the source files. Defaults to `false`.
     * @param options.filter A function to filter which filepaths should be copied. Should return true to copy the item, otherwise false.
     */
    Path.prototype.copy = function (dst, options) {
        return __awaiter(this, void 0, void 0, function () {
            var dest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dest = this._interpPossibleRelativePath(dst, options === null || options === void 0 ? void 0 : options.interpRelativeSource);
                        return [4 /*yield*/, fse.copy(this.path, dest.path, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, dest];
                }
            });
        });
    };
    /**
     * Synchronously copies the underlying filepath to the indicated destination.
     * @param dst The filepath destination to where the underlying path should be copied.
     * If the instance is a directory, the children of the directory will be copied to this location.
     * If the instance is a file, it itself will be copied to the new location.
     * @param options.interpSource A string controlling how relative paths are interpreted if `dst` is relative.
     * - `"cwd"` **(default)** interprets them to be relative to the current working directory.
     * - `"path"` interprets them to be relative to the path calling this method.
     * @param options.overwrite Whether to overwrite existing filepath during the operation. Defaults to `true`.
     * @param options.errorOnExist Whether to throw an error if the destination already exists. Defaults to `false`.
     * @param options.dereference Whether to dereference symlinks during the operation. Defaults to `false`.
     * @param options.preserveTimestamps Whether to keep the same timestamps that existed in the source files. Defaults to `false`.
     * @param options.filter A function to filter which filepaths should be copied. Should return true to copy the item, otherwise false.
     */
    Path.prototype.copySync = function (dst, options) {
        var dest = this._interpPossibleRelativePath(dst, options === null || options === void 0 ? void 0 : options.interpRelativeSource);
        fse.copySync(this.path, dest.path, options);
        return dest;
    };
    /**
     * Asynchronously deletes the underlying filepath.
     */
    Path.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fse.remove(this.path);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Alias for `remove()`. Asynchronously deletes the underlying filepath.
     */
    Path.prototype.unlink = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fse.remove(this.path);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Alias for `remove()`. Asynchronously deletes the underlying filepath.
     */
    Path.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fse.remove(this.path);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Synchronously deletes the underlying filepath.
     */
    Path.prototype.removeSync = function () {
        fse.removeSync(this.path);
    };
    /**
     * Alias for `removeSync()`. Synchronously deletes the underlying filepath.
     */
    Path.prototype.unlinkSync = function () {
        fse.removeSync(this.path);
    };
    /**
     * Alias for `removeSync()`. Synchronously deletes the underlying filepath.
     */
    Path.prototype.deleteSync = function () {
        fse.removeSync(this.path);
    };
    /**
     * Asynchronously opens a file and returns its file descriptor.
     * @param openOptions.ensureExists Whether to force the file to be touched first, including forcing parent directories to
     * exist. Note that this will not work for files that lack an extension.
     * @param openOptions.flags A string denoting the mode in which this file should be opened.
     * Typically "r" for read, "w" for write, and "a" for append.
     * @param openOptions.mode The permissions to set for the file upon opening (i.e. 0o511).
     * @returns The numeric file descriptor.
     */
    Path.prototype.open = function (openOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, trigger_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.descriptor != null)
                            throw new Error("Detected that this filepath is already open.");
                        _b = openOptions.ensureExists && this.suffixes.length;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.isFile()];
                    case 1:
                        _b = !(_d.sent());
                        _d.label = 2;
                    case 2:
                        if (!_b) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.makeFile()];
                    case 3:
                        _d.sent();
                        trigger_1 = true;
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.exists()];
                                    case 1:
                                        if (!(_a.sent()) && trigger_1)
                                            throw new Error("Timed out in ensuring that the file is made to exist.");
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (_a = openOptions.timeout) !== null && _a !== void 0 ? _a : 1000);
                        _d.label = 4;
                    case 4: return [4 /*yield*/, this.exists()];
                    case 5:
                        if (!!(_d.sent())) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, utils_1.sleep)(5)];
                    case 6:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 7:
                        trigger_1 = false;
                        _d.label = 8;
                    case 8:
                        _c = this;
                        return [4 /*yield*/, fse.open(this.path, openOptions.flags, openOptions.mode)];
                    case 9:
                        _c.descriptor = _d.sent();
                        return [2 /*return*/, this.descriptor];
                }
            });
        });
    };
    /**
     * Synchronously opens a file and returns its file descriptor.
     * @param openOptions.ensureExists Whether to force the file to be touched first, including forcing parent directories to
     * exist. Note that this will not work for files that lack an extension.
     * @param openOptions.flags A string denoting the mode in which this file should be opened.
     * Typically "r" for read, "w" for write, and "a" for append.
     * @param openOptions.mode The permissions to set for the file upon opening (i.e. 0o511).
     * @returns The numeric file descriptor.
     */
    Path.prototype.openSync = function (openOptions) {
        var _this = this;
        var _a;
        if (this.descriptor != null)
            throw new Error("Detected that this filepath is already open.");
        // Ensure that the file exists
        if (openOptions.ensureExists && this.suffixes.length && !this.isFileSync()) {
            this.makeFileSync();
            var trigger_2 = true;
            setTimeout(function () {
                if (!_this.existsSync() && trigger_2)
                    throw new Error("Timed out in ensuring that the file is made to exist.");
            }, (_a = openOptions.timeout) !== null && _a !== void 0 ? _a : 1000);
            while (!this.existsSync()) {
                (0, utils_1.sleepSync)(5);
            }
            trigger_2 = false;
        }
        this.descriptor = fse.openSync(this.path, openOptions.flags, openOptions.mode);
        return this.descriptor;
    };
    Path.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.descriptor == null)
                            throw new Error("Cannot close a file that has not been opened.");
                        return [4 /*yield*/, fse.close(this.descriptor)];
                    case 1:
                        _a.sent();
                        this.descriptor = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    Path.prototype.closeSync = function () {
        if (this.descriptor == null)
            throw new Error("Cannot close a file that has not been opened.");
        fse.closeSync(this.descriptor);
        this.descriptor = null;
    };
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
    Path.prototype.read = function (buffer, offset, length, position, closeAfterwards, openOptions) {
        if (closeAfterwards === void 0) { closeAfterwards = true; }
        return __awaiter(this, void 0, void 0, function () {
            var readResult, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.descriptor == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.open(openOptions !== null && openOptions !== void 0 ? openOptions : { flags: "r" })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, fse.read(this.descriptor, buffer, offset, length, position)];
                    case 3:
                        readResult = _b.sent();
                        _a = closeAfterwards;
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.close()];
                    case 4:
                        _a = (_b.sent());
                        _b.label = 5;
                    case 5:
                        _a;
                        return [2 /*return*/, __assign(__assign({}, readResult), { fileDescriptor: closeAfterwards ? null : this.descriptor })];
                }
            });
        });
    };
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
    Path.prototype.readSync = function (buffer, offset, length, position, closeAfterwards, openOptions) {
        if (closeAfterwards === void 0) { closeAfterwards = true; }
        if (this.descriptor == null)
            this.openSync(openOptions !== null && openOptions !== void 0 ? openOptions : { flags: "r" });
        var readResult = fse.readSync(this.descriptor, buffer, offset, length, position);
        closeAfterwards && this.closeSync();
        return { bytesRead: readResult, fileDescriptor: closeAfterwards ? null : this.descriptor };
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
    Path.prototype.write = function (buffer, offset, length, position, closeAfterwards, openOptions) {
        if (closeAfterwards === void 0) { closeAfterwards = true; }
        return __awaiter(this, void 0, void 0, function () {
            var writeResult, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.descriptor == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.open(openOptions !== null && openOptions !== void 0 ? openOptions : { flags: "w" })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, fse.write(this.descriptor, buffer, offset, length, position)];
                    case 3:
                        writeResult = _b.sent();
                        _a = closeAfterwards;
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.close()];
                    case 4:
                        _a = (_b.sent());
                        _b.label = 5;
                    case 5:
                        _a;
                        return [2 /*return*/, __assign(__assign({}, writeResult), { fileDescriptor: this.descriptor })];
                }
            });
        });
    };
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
    Path.prototype.writeSync = function (buffer, offset, length, position, closeAfterwards, openOptions) {
        if (closeAfterwards === void 0) { closeAfterwards = true; }
        if (this.descriptor == null)
            this.openSync(openOptions !== null && openOptions !== void 0 ? openOptions : { flags: "w" });
        var writeResult = fse.writeSync(this.descriptor, buffer, offset, length, position);
        closeAfterwards && this.closeSync();
        return { bytesWritten: writeResult, fileDescriptor: this.descriptor };
    };
    Path.prototype.readFile = function (arg1, arg2) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof arg1 === "function" || typeof arg2 === "function") {
                    throw new Error("This method does not support callback syntax");
                }
                if (!arg1 || typeof arg1 === "undefined") {
                    return [2 /*return*/, fse.readFile(this.path)];
                }
                if (typeof arg1 === "string") {
                    return [2 /*return*/, fse.readFile(this.path, arg1)];
                }
                if (typeof arg1 === "object" && arg1.hasOwnProperty("encoding")) {
                    return [2 /*return*/, fse.readFile(this.path, arg1)];
                }
                return [2 /*return*/];
            });
        });
    };
    Path.prototype.readFileSync = function (arg1, arg2) {
        if (typeof arg1 === "function" || typeof arg2 === "function") {
            throw new Error("This method does not support callback syntax");
        }
        if (!arg1 || typeof arg1 === "undefined") {
            return fse.readFileSync(this.path);
        }
        if (typeof arg1 === "string") {
            return fse.readFileSync(this.path, arg1);
        }
        if (typeof arg1 === "object" && arg1.hasOwnProperty("encoding")) {
            return fse.readFileSync(this.path, arg1);
        }
    };
    /**
     * Asynchronously writes data to the underlying filepath.
     * @param data The data to write to the file.
     * @param options.encoding. The encoding to use in the write operation. Defaults to `"utf8"`.
     * @param options.mode. The permissions of the created file. Defaults to `0o666`.
     * @param options.flag. The string denoting the mode in which the file is opened.
     */
    Path.prototype.writeFile = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fse.outputFile(this.path, data, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously writes data to the underlying filepath.
     * @param data The data to write to the file.
     * @param options.encoding. The encoding to use in the write operation. Defaults to `"utf8"`.
     * @param options.mode. The permissions of the created file. Defaults to `0o666`.
     * @param options.flag. The string denoting the mode in which the file is opened.
     */
    Path.prototype.writeFileSync = function (data, options) {
        fse.outputFileSync(this.path, data, options);
    };
    /**
     * Asynchronously reads in the underlying filepath JSON file and parses it into a JSON object.
     * @param options.encoding. The encoding to use when parsing the JSON structure. Defaults to `null`.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to `"r"`.
     * @returns A JSON object.
     */
    Path.prototype.readJSON = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isFile()];
                    case 1:
                        if (!(_a.sent()) || this.ext !== ".json") {
                            throw new Error("Cannot read JSON from a non-JSON filepath or a non-existent filepath");
                        }
                        return [4 /*yield*/, fse.readJSON(this.path, options)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Synchronously reads in the underlying filepath JSON file and parses it into a JSON object.
     * @param options.encoding. The encoding to use when parsing the JSON structure. Defaults to `null`.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to `"r"`.
     * @returns A JSON object.
     */
    Path.prototype.readJSONSync = function (options) {
        if (!this.isFileSync() || this.ext !== ".json") {
            throw new Error("Cannot read JSON from a non-JSON filepath or a non-existent filepath");
        }
        return fse.readJSONSync(this.path, options);
    };
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
     */
    Path.prototype.writeJSON = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.suffixes.slice(-1)[0] !== "json") {
                            throw new Error("Cannot write a JSON object to a non-JSON filepath");
                        }
                        return [4 /*yield*/, fse.outputJson(this.path, data, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
     */
    Path.prototype.writeJSONSync = function (data, options) {
        if (this.suffixes.slice(-1)[0] !== "json") {
            throw new Error("Cannot write a JSON object to a non-JSON filepath");
        }
        fse.outputJsonSync(this.path, data, options);
    };
    /**
     * Wrapper around implementing a Chokidar watcher on the underlying filepath.
     * @param options [Chokidar options](https://github.com/paulmillr/chokidar) controlling the behavior of the filepath watcher.
     */
    Path.prototype.watch = function (options) {
        return chokidar_1.default.watch(this.path, options);
    };
    return Path;
}());
exports.default = Path;
