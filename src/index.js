"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var normalize_path_1 = __importDefault(require("normalize-path"));
var fast_glob_1 = __importDefault(require("fast-glob"));
var fse = __importStar(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var chokidar_1 = __importDefault(require("chokidar"));
var Path = /** @class */ (function () {
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
    function Path() {
        var _a;
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        if (!paths || !paths.length || paths[0] === "") {
            throw new Error("Cannot instantiate a new Path instance on an empty string");
        }
        this.path = (0, normalize_path_1.default)(path_1.default.resolve.apply(path_1.default, __spreadArray([], __read(paths), false)));
        var _b = path_1.default.parse(this.path), dir = _b.dir, root = _b.root, base = _b.base, name = _b.name, ext = _b.ext;
        this.root = root;
        this.basename = base;
        this.dirname = dir;
        this.stem = name;
        this.ext = ext;
        _a = __read(this.basename.split(".")), this.suffixes = _a.slice(1);
    }
    /**
     * Get a Path representation of the current working directory.
     * @returns The current working directory.
     */
    Path.pwd = function () {
        return new Path(process.cwd());
    };
    /**
     * Get a Path representation of the current working directory.
     * @returns The current working directory.
     */
    Path.cwd = function () {
        return new Path(process.cwd());
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
     * Converts the PATH variable into an array of Path instances.
     * @returns An Array of Path instances of the filepaths recorded in PATH.
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
     * Parses the mode of a filepath into the more understandable octal representation (i.e. 777 for full-permissions)
     * @param mode The mode of a filepath, as received from fs.Stats or the fs.Stats object itself
     * @returns The octal numeric representation of the filepath permissions
     */
    Path.parseModeIntoOctal = function (mode) {
        return parseInt(((typeof mode === "number" ? mode : mode.mode) & 511).toString(8), 10);
    };
    /**
     * Splits the underlying filepath into its individual components.
     * @returns An array of the strings comprising the Path instance.
     */
    Path.prototype.parts = function () {
        return this.path.split("/");
    };
    /**
     * Splits the underlying filepath into its individual components. Alias for this.parts().
     * @returns An array of the strings comprising the Path instance.
     */
    Path.prototype.split = function () {
        return this.path.split("/");
    };
    /**
     * Depicts the relative path from the Path instance to another filepath.
     * @param to The filepath that this instance should be compared against.
     * @param useSystemPathDelimiter Whether to present the final string in accordance with the
     * operating system's filepath delimiter.
     * @returns A string representation of the relative path from the filepath represented by this
     * Path instance to the filepath indicated.
     */
    Path.prototype.relative = function (to, useSystemPathDelimiter) {
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        var relPath = path_1.default.relative(this.path, typeof to === "string" ? to : to.path);
        return useSystemPathDelimiter ? relPath : (0, normalize_path_1.default)(relPath);
    };
    /**
     * Resolves a sequence of path segments into a new absolute Path. Respects ".." and will increment directories accordingly.
     * Note that strings beginning with a single "." will be treated as if the dot character does not exist. Use the "join" method
     * as an alternative for appending file segments that begin with "." to the current path.
     * @param segments An array of strings respresenting path segments to append and resolve to the underlying path.
     * @returns The resolved Path instance.
     */
    Path.prototype.resolve = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        return new (Path.bind.apply(Path, __spreadArray([void 0, this.path], __read(segments), false)))();
    };
    /**
     * Appends strings to the end of the underlying filepath, creating a new Path instance. Note that ".." and "." are treated
     * literally and will not be resolved. For appending file segments with resolving behavior use the "resolve" method.
     * @param segments Strings which should be appended to the Path instance in order to create a new one.
     * @returns A new Path instance with the strings appended.
     */
    Path.prototype.join = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        if (!segments.length)
            throw new Error("Cannot join with an empty string");
        var newPathParts = Array.isArray(segments) ? __spreadArray(__spreadArray([], __read(this.parts()), false), __read(segments), false) : __spreadArray(__spreadArray([], __read(this.parts()), false), [segments], false);
        var newPath = (0, normalize_path_1.default)(newPathParts.join("/"));
        return new Path(newPath);
    };
    /**
     * Creates a new Path instance with a replaced basename.
     * @param name The new basename to replace the existing one.
     * @returns A new Path instance featuring the replacement basename.
     */
    Path.prototype.withBasename = function (name) {
        return new Path(__spreadArray(__spreadArray([], __read(this.parts().slice(0, this.parts().length - 1)), false), [name], false).join("/"));
    };
    /**
     * Creates a new Path instance with a replaced stem.
     * @param stem The new stem to replace the existing one.
     * @returns A new Path instance featuring the replacement stem.
     */
    Path.prototype.withStem = function (stem) {
        var newBasename = __spreadArray([stem], __read(this.basename.split(".").slice(1)), false).join(".");
        return this.withBasename(newBasename);
    };
    /**
     * Creates a new Path instance with a replaced final extension.
     * @param suffix The new suffix to replace the existing one.
     * If the current path contains multiple extensions (i.e. .tar.gz), then only the lattermost will be replaced.
     * If a blank string is provided, then all extensions will be removed.
     * @returns A new Path instance featuring the replacement extension.
     */
    Path.prototype.withSuffix = function (suffix) {
        var newSuffixes = suffix === "" ? [] : [suffix];
        var newBasename = __spreadArray([this.stem], __read(newSuffixes), false).join(".");
        return this.withBasename(newBasename);
    };
    /**
     * Depicts a string version of the Path instance.
     * @param useSystemPathDelimiter Whether to respect the system-specific filepath delimiter.
     * @returns A string representation of the underlying filepath.
     */
    Path.prototype.toString = function (useSystemPathDelimiter) {
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        return useSystemPathDelimiter ? this.parts().join(path_1.default.sep) : this.path;
    };
    /**
     * Depicts an Object version of the Path instance.
     * @param useSystemPathDelimiter Whether to respect the system-specific filepath delimiter.
     * @returns An Object representation of the underlying filepath.
     */
    Path.prototype.toJSON = function (useSystemPathDelimiter) {
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        return {
            path: useSystemPathDelimiter ? this.parts().join(path_1.default.sep) : this.path,
            root: useSystemPathDelimiter ? this.root.split("/").join(path_1.default.sep) : this.root,
            basename: this.basename,
            stem: this.stem,
            ext: this.ext,
            suffixes: this.suffixes,
        };
    };
    /**
     * Asynchronously retrieves the stat object for the Path instance.
     * @returns The stat object for the underlying filepath.
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
     * Synchronously retrieves the stat object for the Path instance.
     * @returns The stat object for the underlying filepath.
     */
    Path.prototype.statSync = function () {
        return fse.statSync(this.path);
    };
    /**
     * Asynchronously checks whether the underlying filepath exists.
     * @returns A boolean of whether the filepath exists or not.
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
     * @returns A boolean of whether the filepath exists or not.
     */
    Path.prototype.existsSync = function () {
        return fse.pathExistsSync(this.path);
    };
    /**
     * Asynchronously checks whether the Path instance is a directory.
     * @returns A boolean of whether this is a directory or not.
     */
    Path.prototype.isDirectory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_1, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.stat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isDirectory()];
                    case 2:
                        _err_1 = _a.sent();
                        err = _err_1;
                        if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                            return [2 /*return*/, false];
                        }
                        else {
                            throw new Error(err.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the Path instance is a directory.
     * @returns A boolean of whether this is a directory or not.
     */
    Path.prototype.isDirectorySync = function () {
        try {
            return fse.statSync(this.path).isDirectory();
        }
        catch (_err) {
            var err = _err;
            if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                return false;
            }
            else {
                throw new Error(err.message);
            }
        }
    };
    /**
     * Asynchronously checks whether the Path instance is a file.
     * @returns A boolean of whether this is a file or not.
     */
    Path.prototype.isFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_2, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.stat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isFile()];
                    case 2:
                        _err_2 = _a.sent();
                        err = _err_2;
                        if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                            return [2 /*return*/, false];
                        }
                        else {
                            throw new Error(err.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the Path instance is a file.
     * @returns A boolean of whether this is a file or not.
     */
    Path.prototype.isFileSync = function () {
        try {
            return fse.statSync(this.path).isFile();
        }
        catch (_err) {
            var err = _err;
            if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                return false;
            }
            else {
                throw new Error(err.message);
            }
        }
    };
    /**
     * Asynchronously checks whether the Path instance is a symlink.
     * @returns A boolean of whether this is a symlink or not.
     */
    Path.prototype.isSymbolicLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_3, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.lstat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isSymbolicLink()];
                    case 2:
                        _err_3 = _a.sent();
                        err = _err_3;
                        if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                            return [2 /*return*/, false];
                        }
                        else {
                            throw new Error(err.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the Path instance is a symlink.
     * @returns A boolean of whether this is a symlink or not.
     */
    Path.prototype.isSymbolicLinkSync = function () {
        try {
            return fse.lstatSync(this.path).isSymbolicLink();
        }
        catch (_err) {
            var err = _err;
            if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                return false;
            }
            else {
                throw new Error(err.message);
            }
        }
    };
    /**
     * Asynchronously checks whether the Path instance is a socket.
     * @returns A boolean of whether this is a socket or not.
     */
    Path.prototype.isSocket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_4, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.stat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isSocket()];
                    case 2:
                        _err_4 = _a.sent();
                        err = _err_4;
                        if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                            return [2 /*return*/, false];
                        }
                        else {
                            throw new Error(err.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the Path instance is a socket.
     * @returns A boolean of whether this is a socket or not.
     */
    Path.prototype.isSocketSync = function () {
        try {
            return fse.statSync(this.path).isSocket();
        }
        catch (_err) {
            var err = _err;
            if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                return false;
            }
            else {
                throw new Error(err.message);
            }
        }
    };
    /**
     * Asynchronously checks whether the Path instance is a first-in-first-out queue.
     * @returns A boolean of whether this is a first-in-first-out queue or not.
     */
    Path.prototype.isFIFO = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _err_5, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.stat(this.path)];
                    case 1: return [2 /*return*/, (_a.sent()).isFIFO()];
                    case 2:
                        _err_5 = _a.sent();
                        err = _err_5;
                        if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                            return [2 /*return*/, false];
                        }
                        else {
                            throw new Error(err.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously checks whether the Path instance is a first-in-first-out queue.
     * @returns A boolean of whether this is a first-in-first-out queue or not.
     */
    Path.prototype.isFIFOSync = function () {
        try {
            return fse.statSync(this.path).isFIFO();
        }
        catch (_err) {
            var err = _err;
            if ((err === null || err === void 0 ? void 0 : err.code) === "ENOENT") {
                return false;
            }
            else {
                throw new Error(err.message);
            }
        }
    };
    /**
     * Retrieves the parent directory.
     * @returns The parent directory of this filepath as a Path instance.
     */
    Path.prototype.parent = function () {
        return new Path(this.dirname);
    };
    /**
     * Asynchronously determines whether a directory contains a given child filepath or basename.
     * @param child Either a string representing a basename to search for or another Path instance to be located as a child of this instance.
     * @returns The located child as a Path instance or false if no child path could be found.
     */
    Path.prototype.containsImmediateChild = function (child) {
        var e_2, _a, e_3, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d, childPath, e_2_1, _e, _f, childPath, e_3_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.isDirectory()];
                    case 1:
                        if (!(_g.sent())) {
                            throw new Error("Cannot check the child of a path that is not a directory");
                        }
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
     * @returns The located child as a Path instance or false if no child path could be found.
     */
    Path.prototype.containsImmediateChildSync = function (child) {
        var e_4, _a, e_5, _b;
        if (!this.isDirectorySync()) {
            throw new Error("Cannot check the child of a path that is not a directory");
        }
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
    /**
     * Asynchronously globs for filepaths stemming from the Path instance.
     * @param patterns A string or collection of strings representing glob patterns to search.
     * @param options FastGlob options, including whether to restrict the globbing to files, directories, etc.
     * @returns An array of globbed Path instances.
     */
    Path.prototype.glob = function (patterns, options) {
        return __awaiter(this, void 0, void 0, function () {
            var asArr, patterns_1, patterns_1_1, pat, globs;
            var e_6, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asArr = [];
                        if (Array.isArray(patterns)) {
                            try {
                                for (patterns_1 = __values(patterns), patterns_1_1 = patterns_1.next(); !patterns_1_1.done; patterns_1_1 = patterns_1.next()) {
                                    pat = patterns_1_1.value;
                                    asArr.push([this.path, pat].join("/"));
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (patterns_1_1 && !patterns_1_1.done && (_a = patterns_1.return)) _a.call(patterns_1);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                        }
                        else {
                            asArr.push([this.path, patterns].join("/"));
                        }
                        return [4 /*yield*/, (0, fast_glob_1.default)(asArr, options)];
                    case 1:
                        globs = _b.sent();
                        return [2 /*return*/, globs.map(function (p) { return new Path(p); })];
                }
            });
        });
    };
    /**
     * Synchronously globs for filepaths stemming from the Path instance.
     * @param patterns A string or collection of strings representing glob patterns to search.
     * @param options FastGlob options, including whether to restrict the globbing to files, directories, etc.
     * @returns An array of globbed Path instances.
     */
    Path.prototype.globSync = function (patterns, options) {
        var e_7, _a;
        var asArr = [];
        if (Array.isArray(patterns)) {
            try {
                for (var patterns_2 = __values(patterns), patterns_2_1 = patterns_2.next(); !patterns_2_1.done; patterns_2_1 = patterns_2.next()) {
                    var pat = patterns_2_1.value;
                    asArr.push([this.path, pat].join("/"));
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (patterns_2_1 && !patterns_2_1.done && (_a = patterns_2.return)) _a.call(patterns_2);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        else {
            asArr.push([this.path, patterns].join("/"));
        }
        return fast_glob_1.default.sync(asArr, options).map(function (p) { return new Path(p); });
    };
    /**
     * Asynchronously collects the children of a directory path as an array of Paths.
     * @returns An array of Path instances that are children of the current instance.
     */
    Path.prototype.readDir = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paths;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fse.readdir(this.path)];
                    case 1:
                        paths = (_a.sent()).map(function (basename) { return new Path(_this.path, basename); });
                        return [2 /*return*/, paths];
                }
            });
        });
    };
    /**
     * Synchronously collects the children of a directory path as an array of Paths.
     * @returns An array of Path instances that are children of the current instance.
     */
    Path.prototype.readDirSync = function () {
        var _this = this;
        return fse.readdirSync(this.path).map(function (basename) { return _this.join(basename); });
    };
    /**
     * Asynchronously yields child Path instances of the current instance.
     * @yields A Path instance which is a child path of the current instance.
     */
    Path.prototype.readDirIter = function () {
        return __asyncGenerator(this, arguments, function readDirIter_1() {
            var _a, _b, dir, e_8_1;
            var e_8, _c;
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
                        return [4 /*yield*/, __await(this.join(dir.name))];
                    case 4: return [4 /*yield*/, _d.sent()];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6: return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_8_1 = _d.sent();
                        e_8 = { error: e_8_1 };
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
                        if (e_8) throw e_8.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously yields child Path instances of the current instance.
     * @yields A Path instance which is a child path of the current instance.
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
                    return [4 /*yield*/, this.join(fileDirent.name)];
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
    /**
     * Asynchronously traverses the tree structure of the directory system, starting from the current instance as the root.
     * and allows for callbacks to occur for each encountered filepath.
     * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
     */
    Path.prototype.walk = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            function walkStep(filepath, callback) {
                var e_9, _a;
                return __awaiter(this, void 0, void 0, function () {
                    var _b, _c, p, e_9_1;
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
                                e_9_1 = _d.sent();
                                e_9 = { error: e_9_1 };
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
                                if (e_9) throw e_9.error;
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
     * Synchronously traverses the tree structure of the directory system, starting from the current instance as the root
     * and allows for callbacks to occur for each encountered filepath.
     * @param callback A callback function for each encountered Path. Its first argument must accept a Path instance.
     */
    Path.prototype.walkSync = function (callback) {
        function walkStep(filepath, callback) {
            var e_10, _a;
            try {
                for (var _b = __values(filepath.readDirIterSync()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var p = _c.value;
                    callback && callback(p);
                    if (p.isDirectorySync()) {
                        walkStep(p, callback);
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
        walkStep(this, callback);
    };
    /**
     * Asynchronously traverses the tree structure of the directory system, starting from the current instances as the root
     * and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object
     * with two properties: "filepath", which is the Path instance of the filepath at that location, and "children" which is
     * either null in the case of a non-directory or an array of more branch objects.
     * @param asString Whether to convert the "filepath" property automatically to a string representation of the path instead.
     * @returns A representation of the filepath tree structure.
     */
    Path.prototype.tree = function (asString, useSystemPathDelimiter) {
        if (asString === void 0) { asString = false; }
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        return __awaiter(this, void 0, void 0, function () {
            function traverseBranch(branchRoot, prevDepth) {
                var e_11, _a;
                return __awaiter(this, void 0, void 0, function () {
                    var branch, _b, _c, p, _d, _e, _f, e_11_1;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                branch = {
                                    filepath: asString ? branchRoot.toString(useSystemPathDelimiter) : branchRoot,
                                    depth: prevDepth + 1,
                                    children: [],
                                };
                                _g.label = 1;
                            case 1:
                                _g.trys.push([1, 10, 11, 16]);
                                _b = __asyncValues(branchRoot.readDirIter());
                                _g.label = 2;
                            case 2: return [4 /*yield*/, _b.next()];
                            case 3:
                                if (!(_c = _g.sent(), !_c.done)) return [3 /*break*/, 9];
                                p = _c.value;
                                return [4 /*yield*/, p.isDirectory()];
                            case 4:
                                if (!_g.sent()) return [3 /*break*/, 7];
                                _d = branch.children;
                                if (!_d) return [3 /*break*/, 6];
                                _f = (_e = branch.children).push;
                                return [4 /*yield*/, traverseBranch(p, prevDepth + 1)];
                            case 5:
                                _d = _f.apply(_e, [_g.sent()]);
                                _g.label = 6;
                            case 6:
                                _d;
                                return [3 /*break*/, 8];
                            case 7:
                                branch.children &&
                                    branch.children.push({
                                        filepath: asString ? p.toString(useSystemPathDelimiter) : p,
                                        depth: prevDepth + 2,
                                        children: null,
                                    });
                                _g.label = 8;
                            case 8: return [3 /*break*/, 2];
                            case 9: return [3 /*break*/, 16];
                            case 10:
                                e_11_1 = _g.sent();
                                e_11 = { error: e_11_1 };
                                return [3 /*break*/, 16];
                            case 11:
                                _g.trys.push([11, , 14, 15]);
                                if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 13];
                                return [4 /*yield*/, _a.call(_b)];
                            case 12:
                                _g.sent();
                                _g.label = 13;
                            case 13: return [3 /*break*/, 15];
                            case 14:
                                if (e_11) throw e_11.error;
                                return [7 /*endfinally*/];
                            case 15: return [7 /*endfinally*/];
                            case 16: return [2 /*return*/, branch];
                        }
                    });
                });
            }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, traverseBranch(this, -1)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Synchronously traverses the tree structure of the directory system, starting from the current instances as the root
     * and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object
     * with two properties: "filepath", which is the Path instance of the filepath at that location, and "children" which is
     * either null in the case of a non-directory or an array of more branch objects.
     * @param asString Whether to convert the "filepath" property automatically to a string representation of the path instead.
     * @returns A representation of the filepath tree structure.
     */
    Path.prototype.treeSync = function (asString, useSystemPathDelimiter) {
        if (asString === void 0) { asString = false; }
        if (useSystemPathDelimiter === void 0) { useSystemPathDelimiter = false; }
        function traverseBranch(branchRoot, prevDepth) {
            var e_12, _a;
            var branch = {
                filepath: asString ? branchRoot.toString(useSystemPathDelimiter) : branchRoot,
                depth: prevDepth + 1,
                children: [],
            };
            try {
                for (var _b = __values(branchRoot.readDirIterSync()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var p = _c.value;
                    if (p.isDirectorySync()) {
                        branch.children && branch.children.push(traverseBranch(p, prevDepth + 1));
                    }
                    else {
                        branch.children &&
                            branch.children.push({
                                filepath: asString ? p.toString(useSystemPathDelimiter) : p,
                                depth: prevDepth + 2,
                                children: null,
                            });
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_12) throw e_12.error; }
            }
            return branch;
        }
        return traverseBranch(this, -1);
    };
    /**
     * Asynchronously creates a new directory, including intermediate parental components.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions to impart on the created directory.
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
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions to impart on the created directory.
     */
    Path.prototype.makeDirSync = function (mode) {
        if (mode === void 0) { mode = 511; }
        if (this.suffixes.length)
            throw new Error("Cannot use makeDir on a file-like type");
        fse.ensureDirSync(this.path, mode);
    };
    /**
     * Asynchronously creates a new file, including intermediate parental components.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions to impart on the created file.
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
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions to impart on the created file.
     */
    Path.prototype.makeFileSync = function () {
        if (this.suffixes.length === 0)
            throw new Error("Cannot use makeDir on a directory-like type");
        fse.ensureFileSync(this.path);
    };
    /**
     * Asynchronously creates a new symlink of the underlying filepath.
     * @param dst The location of where the symlink should be made.
     */
    Path.prototype.makeSymlink = function (dst) {
        return __awaiter(this, void 0, void 0, function () {
            var dest, linkType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dest = typeof dst === "string" ? new Path(dst) : dst;
                        return [4 /*yield*/, this.isDirectory()];
                    case 1:
                        if (!((_a.sent()) && dest.suffixes.length === 0)) return [3 /*break*/, 2];
                        linkType = "dir";
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.isFile()];
                    case 3:
                        if ((_a.sent()) && dest.suffixes.length > 0) {
                            linkType = "file";
                        }
                        else {
                            throw new Error("Either the path is neither file nor directory or the corresponding destination had a presence/absense of suffixes when it shouldn't have.");
                        }
                        _a.label = 4;
                    case 4: return [4 /*yield*/, fse.ensureSymlink(this.path, dest.path, linkType)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, dest];
                }
            });
        });
    };
    /**
     * Synchronously creates a new symlink of the underlying filepath.
     * @param dst The location of where the symlink should be made.
     */
    Path.prototype.makeSymlinkSync = function (dst) {
        var dest = typeof dst === "string" ? new Path(dst) : dst;
        var linkType;
        if (this.isDirectorySync() && dest.suffixes.length === 0) {
            linkType = "dir";
        }
        else if (this.isFileSync() && dest.suffixes.length > 0) {
            linkType = "file";
        }
        else {
            throw new Error("Either the path is neither file nor directory or the corresponding destination had a presence/absense of suffixes when it shouldn't have.");
        }
        fse.ensureSymlinkSync(this.path, dest.path, linkType);
        return dest;
    };
    /**
     * Asynchronously changes the permissions of the underlying filepath.
     * Caveats: on Windows only the write permission can be changed, and the distinction
     * among the permissions of group, owner or others is not implemented.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions.
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
     * Caveats: on Windows only the write permission can be changed, and the distinction
     * among the permissions of group, owner or others is not implemented.
     * @param mode A string (i.e. fs.constants) or octal number (ex. 0o511)
     * representation of the new filepath permissions.
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
     * If the instance is a directory, the children of the directory will be moved to this location.
     * If the instance is a file, it itself will be moved to the new location.
     * @param overwrite Whether to movewrite existing filepaths during the procedure.
     */
    Path.prototype.move = function (dst, overwrite) {
        if (overwrite === void 0) { overwrite = false; }
        return __awaiter(this, void 0, void 0, function () {
            var dest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dest = typeof dst === "string" ? new Path(dst) : dst;
                        return [4 /*yield*/, fse.move(this.path, dest.path, { overwrite: overwrite })];
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
     * If the instance is a directory, the children of the directory will be moved to this location.
     * If the instance is a file, it itself will be moved to the new location.
     * @param overwrite Whether to movewrite existing filepaths during the procedure.
     */
    Path.prototype.moveSync = function (dst, overwrite) {
        if (overwrite === void 0) { overwrite = false; }
        var dest = typeof dst === "string" ? new Path(dst) : dst;
        fse.moveSync(this.path, dest.path, { overwrite: overwrite });
        return dest;
    };
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
    Path.prototype.copy = function (dst, options) {
        return __awaiter(this, void 0, void 0, function () {
            var dest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dest = typeof dst === "string" ? new Path(dst) : dst;
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
     * @param options.overwrite Whether to overwrite existing filepath during the operation. Defaults to true.
     * @param options.errorOnExist Whether to throw an error if the destination already exists. Defaults to false.
     * @param options.dereference Whether to dereference symlinks during the operation. Defaults to false.
     * @param options.preserveTimestamps Whether to keep the same timestamps that existed in the source files.
     * Defaults to false.
     * @param options.filter A function to filter which filepaths should be copied.
     * Should return true to copy the item, otherwise false.
     */
    Path.prototype.copySync = function (dst, options) {
        var dest = typeof dst === "string" ? new Path(dst) : dst;
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
     * Alias for remove(). Asynchronously deletes the underlying filepath.
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
     * Alias for remove(). Asynchronously deletes the underlying filepath.
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
     * Alias for removeSync(). Synchronously deletes the underlying filepath.
     */
    Path.prototype.unlinkSync = function () {
        fse.removeSync(this.path);
    };
    /**
     * Alias for removeSync(). Synchronously deletes the underlying filepath.
     */
    Path.prototype.deleteSync = function () {
        fse.removeSync(this.path);
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
     * @param options.encoding. The encoding to use in the write operation. Defaults to "utf8".
     * @param options.mode. The permissions of the created file. Defaults to 0o666.
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
     * @param options.encoding. The encoding to use in the write operation. Defaults to "utf8".
     * @param options.mode. The permissions of the created file. Defaults to 0o666.
     * @param options.flag. The string denoting the mode in which the file is opened.
     */
    Path.prototype.writeFileSync = function (data, options) {
        fse.outputFileSync(this.path, data, options);
    };
    /**
     * Asynchronously reads in the underlying filepath JSON file and parses it into a JSON object.
     * @param options.encoding. The encoding to use when parsing the JSON structure. Defaults to null.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to "r".
     * @returns A JSON object.
     */
    Path.prototype.readJSON = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isFile()];
                    case 1:
                        if (!(_a.sent()) || this.suffixes.slice(-1)[0] !== "json") {
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
     * @param options.encoding. The encoding to use when parsing the JSON structure. Defaults to null.
     * @param options.flag. The string denoting the mode in which the file is opened. Defaults to "r".
     * @returns A JSON object.
     */
    Path.prototype.readJSONSync = function (options) {
        if (!this.isFileSync() || this.suffixes.slice(-1)[0] !== "json") {
            throw new Error("Cannot read JSON from a non-JSON filepath or a non-existent filepath");
        }
        return fse.readJSONSync(this.path, options);
    };
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
    Path.prototype.writeJSONSync = function (data, options) {
        if (this.suffixes.slice(-1)[0] !== "json") {
            throw new Error("Cannot write a JSON object to a non-JSON filepath");
        }
        fse.outputJsonSync(this.path, data, options);
    };
    /**
     * Wrapper around implementing a Chokidar watcher on the underlying filepath.
     * @param options Chokidar options controlling the behavior of the filepath watcher.
     */
    Path.prototype.watch = function (options) {
        return chokidar_1.default.watch(this.path, options);
    };
    return Path;
}());
exports.default = Path;
