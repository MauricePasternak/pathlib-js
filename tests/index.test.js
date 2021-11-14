"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __importDefault(require("../src"));
var assert_1 = __importDefault(require("assert"));
var os_1 = require("os");
describe("Path properties", function () {
    var fp = new src_1.default(__filename);
    it("Should have a correct basename", function () {
        (0, assert_1.default)(fp.basename === "index.test.ts");
    });
    it("Should have a correct string extension", function () {
        (0, assert_1.default)(fp.ext === ".ts");
    });
    it("Should have a correct stem", function () {
        (0, assert_1.default)(fp.stem === "index");
    });
    it("Should have a correct set of suffixes", function () {
        (0, assert_1.default)(fp.suffixes.length === 2 && fp.suffixes[0] === "test" && fp.suffixes[1] === "ts");
    });
    it("Should have a correct root", function () {
        (0, os_1.platform)() === "win32" ? (0, assert_1.default)(/\w:\//gm.test(fp.root)) : (0, assert_1.default)(fp.root === "/");
    });
});
describe("Retrieving a parent", function () {
    var fp = new src_1.default(__filename);
    var pp = fp.parent();
    it("Should have a correct type and basename", function () {
        (0, assert_1.default)(pp.basename === "tests");
    });
    it("Should be able to re-create the child path via join", function () {
        var newChild = pp.join(fp.basename);
        (0, assert_1.default)(newChild.path === fp.path);
    });
    it("Should be able to re-create the child with resolve", function () {
        var newChild = pp.resolve("index.test.ts");
        (0, assert_1.default)(newChild.path === fp.path);
    });
});
describe("Existence checking", function () {
    var fp = new src_1.default(__dirname);
    var child = fp.join("index.test.ts");
    it("Folder containing test file should be detected as a directory", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = assert_1.default;
                    return [4 /*yield*/, fp.isDirectory()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test file itself should be detected as a file", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = assert_1.default;
                    return [4 /*yield*/, child.isFile()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Globbing", function () {
    var fp = new src_1.default(__dirname);
    it("Should be able to selectively glob for specific filetypes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jsonFiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fp.glob("**/*.json", { dot: true })];
                case 1:
                    jsonFiles = _a.sent();
                    (0, assert_1.default)(jsonFiles.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Directory iteration", function () {
    var fp = new src_1.default(__dirname).join("FolderA");
    it("Should be able to retrieve accurate child paths by iterating over a parent folder", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedNames, ii, _a, _b, childPath, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    expectedNames = ["File_A1.txt", "File_A2.txt"];
                    ii = 0;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 12]);
                    _a = __asyncValues(fp.readDirIter());
                    _d.label = 2;
                case 2: return [4 /*yield*/, _a.next()];
                case 3:
                    if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 5];
                    childPath = _b.value;
                    (0, assert_1.default)(expectedNames[ii] === childPath.basename);
                    ii++;
                    _d.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _d.trys.push([7, , 10, 11]);
                    if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _c.call(_a)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    }); });
});
describe("Making and removing filepaths", function () {
    var candidateFile = new src_1.default(__dirname).join("FolderC/File_C1.csv");
    var candidateDir = new src_1.default(__dirname).join("FolderC/SubfolderD");
    it("Should be a clear test without the filepath existing initially", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = assert_1.default;
                    return [4 /*yield*/, candidateFile.exists()];
                case 1:
                    _a.apply(void 0, [!(_c.sent())]);
                    _b = assert_1.default;
                    return [4 /*yield*/, candidateDir.exists()];
                case 2:
                    _b.apply(void 0, [!(_c.sent())]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should throw an error upon trying to make a file with the makeDir() method", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, candidateFile.makeDir()];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    return [3 /*break*/, 3];
                case 3:
                    _a = assert_1.default;
                    return [4 /*yield*/, candidateFile.exists()];
                case 4:
                    _a.apply(void 0, [!(_b.sent())]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should throw an error upon trying to make a directory with the makeFile() method", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, candidateDir.makeFile()];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    return [3 /*break*/, 3];
                case 3:
                    _a = assert_1.default;
                    return [4 /*yield*/, candidateDir.exists()];
                case 4:
                    _a.apply(void 0, [!(_b.sent())]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should successfully make a file with makeFile, creating parent directories as needed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, candidateFile.makeFile()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    return [3 /*break*/, 3];
                case 3:
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = assert_1.default;
                                    return [4 /*yield*/, candidateFile.exists()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 100);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should successfully make a directory with makeDir, creating parent directories as needed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, candidateDir.makeDir()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    return [3 /*break*/, 3];
                case 3:
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = assert_1.default;
                                    return [4 /*yield*/, candidateDir.exists()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 100);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should successfully delete a folder and all its children", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, candidateFile.parent().remove()];
                case 1:
                    _a.sent();
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = assert_1.default;
                                    return [4 /*yield*/, candidateDir.exists()];
                                case 1:
                                    _a.apply(void 0, [!(_c.sent())]);
                                    _b = assert_1.default;
                                    return [4 /*yield*/, candidateFile.exists()];
                                case 2:
                                    _b.apply(void 0, [_c.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 200);
                    return [2 /*return*/];
            }
        });
    }); });
});