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
var src_1 = __importDefault(require("../src"));
var assert_1 = __importDefault(require("assert"));
var os_1 = require("os");
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
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
        (0, os_1.platform)() === "win32" ? (0, assert_1.default)(/\w:/gm.test(fp.root)) : (0, assert_1.default)(fp.root === "/");
    });
    it("Should have a correct parent filepath", function () {
        (0, assert_1.default)(fp.parent().path === new src_1.default(__dirname).path);
    });
});
describe("Path parts", function () {
    var fp = new src_1.default(__dirname);
    it("Should correctly split a path into its components under typical conditions", function () {
        var parts = fp.parts();
        (0, assert_1.default)(parts.length);
        (0, assert_1.default)(parts[0] === fp.root);
        (0, assert_1.default)(parts.slice(parts.length - 1)[0] === fp.basename);
    });
    if ((0, os_1.platform)() !== "win32") {
        it("On Unix, should correctly split into parts even if the path is the root", function () {
            var rootPath = new src_1.default("/");
            (0, assert_1.default)(rootPath.root === rootPath.path);
            var parts = rootPath.parts();
            (0, assert_1.default)(parts.length);
            (0, assert_1.default)(parts[0] === rootPath.path);
        });
    }
});
describe("Relative strings", function () {
    var fpDir = new src_1.default(__dirname);
    var fpFile = new src_1.default(__filename);
    it("Should correctly infer the strings that represent the relationship between __filename and __dirname", function () {
        (0, assert_1.default)(fpDir.relative(fpFile).startsWith("index.test"));
        (0, assert_1.default)(fpFile.relative(fpDir) === "..");
    });
});
describe("New Path creation from previous", function () {
    var fpDir = new src_1.default(__dirname);
    var testfile = new src_1.default(__filename + "/Test.tar.gz");
    it("Should generate an appropriate Path using withBasename", function () {
        (0, assert_1.default)("TEST" === fpDir.withBasename("TEST").basename);
    });
    it("Should generate an appropriate Path using withStem", function () {
        (0, assert_1.default)("TEST" === fpDir.withStem("TEST").basename);
    });
    it("Should generate an appropriate Path using withSuffix argument as a String, even if user adds '.' to the start of a string and/or elements of an array argument", function () {
        var newFileByArray = testfile.withSuffix(["json", ".gz"]);
        var newFileByString = testfile.withSuffix(".json.gz");
        (0, assert_1.default)(newFileByArray.basename === newFileByString.basename);
        (0, assert_1.default)(newFileByArray.suffixes.join(".") === "json.gz");
        (0, assert_1.default)(newFileByArray.ext === ".gz");
    });
    it("Should resolve '..' correctly into a new filepath using the resolve() method", function () {
        (0, assert_1.default)(fpDir.parent().path === fpDir.resolve("..").path);
    });
    it("Should disregard '.' correctly when using the resolve() method", function () {
        (0, assert_1.default)(fpDir.resolve("./index.test.ts").path === new src_1.default(__filename).path);
    });
    it("Should treat '..' and '.' literally when using the join() method", function () {
        console.log(fpDir.join("../Test").path);
        (0, assert_1.default)(fpDir.join("../Test").path.endsWith("../Test"));
        (0, assert_1.default)(fpDir.join("./Test").path.endsWith("./Test"));
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
    it("Should detect that the test folder exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = assert_1.default;
                    return [4 /*yield*/, fp.exists()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should detect the test folder as a directory", function () { return __awaiter(void 0, void 0, void 0, function () {
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
    it("Should detect the test file itself as a file", function () { return __awaiter(void 0, void 0, void 0, function () {
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
    it("Should be able to check the existence of an immediate child", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = assert_1.default;
                    return [4 /*yield*/, fp.containsImmediateChild(child)];
                case 1:
                    _a.apply(void 0, [_c.sent()]);
                    _b = assert_1.default;
                    return [4 /*yield*/, fp.containsImmediateChild("index.test.ts")];
                case 2:
                    _b.apply(void 0, [_c.sent()]);
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
    it("Should be able to allow for glob iteration instead of fetching all hits at once", function () { return __awaiter(void 0, void 0, void 0, function () {
        var txtFileIterator, txtFileIterator_1, txtFileIterator_1_1, p, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    txtFileIterator = fp.globIter("**/*.txt", { dot: true });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    txtFileIterator_1 = __asyncValues(txtFileIterator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, txtFileIterator_1.next()];
                case 3:
                    if (!(txtFileIterator_1_1 = _b.sent(), !txtFileIterator_1_1.done)) return [3 /*break*/, 5];
                    p = txtFileIterator_1_1.value;
                    (0, assert_1.default)(p.ext === ".txt");
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(txtFileIterator_1_1 && !txtFileIterator_1_1.done && (_a = txtFileIterator_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(txtFileIterator_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
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
describe("Walking and Traversing Trees", function () {
    var fp = new src_1.default(__dirname);
    var nestedPath = new src_1.default(__dirname, "Foo", "Bar", "Baz.qui");
    it("Should be able to traverse a nested directory structure in the expected order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var orderOfNames, indexer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderOfNames = ["FolderA", "File_A1.txt", "File_A2.txt", "FolderB", "File_B1.json", "File_B2.json"];
                    indexer = -1;
                    return [4 /*yield*/, fp.walk(function (p) {
                            if (orderOfNames.includes(p.basename)) {
                                indexer++;
                                (0, assert_1.default)(p.basename === orderOfNames[indexer]);
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should be able to create an appropriate tree structure", function () { return __awaiter(void 0, void 0, void 0, function () {
        var treeStruct, firstBranch, secondBranch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nestedPath.makeFile()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sleep(20)];
                case 2:
                    _a.sent(); // Hack
                    return [4 /*yield*/, nestedPath.parent().parent().tree(false)];
                case 3:
                    treeStruct = _a.sent();
                    (0, assert_1.default)(treeStruct.children != null);
                    firstBranch = treeStruct.children[0];
                    if (firstBranch.children == null)
                        (0, assert_1.default)(false);
                    (0, assert_1.default)(firstBranch.filepath.basename === "Bar");
                    secondBranch = firstBranch.children[0];
                    (0, assert_1.default)(secondBranch.children == null);
                    return [4 /*yield*/, new src_1.default(__dirname, "Foo").delete()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should have treeBranch.filepath as a string type if the asString parameter is true", function () { return __awaiter(void 0, void 0, void 0, function () {
        var treeStruct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new src_1.default(__dirname).tree(true)];
                case 1:
                    treeStruct = _a.sent();
                    (0, assert_1.default)(typeof treeStruct.filepath === "string" && treeStruct.children != null);
                    (0, assert_1.default)(typeof treeStruct.children[0].filepath === "string");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Directory iteration", function () {
    var fpFolderA = new src_1.default(__dirname).join("FolderA");
    var expectedNames = ["File_A1.txt", "File_A2.txt"];
    it("Should be able to return an array of child filepaths", function () { return __awaiter(void 0, void 0, void 0, function () {
        var children;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fpFolderA.readDir()];
                case 1:
                    children = (_a.sent()).map(function (p) { return p.basename; });
                    assert_1.default.deepEqual(children, expectedNames);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should be able to iterate over the child filepaths as an alternative", function () { return __awaiter(void 0, void 0, void 0, function () {
        var ii, _a, _b, childPath, e_2_1;
        var e_2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    ii = 0;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 12]);
                    _a = __asyncValues(fpFolderA.readDirIter());
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
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
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
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    }); });
});
describe("Permissions", function () {
    var fp = new src_1.default(__dirname, "FolderA", "File_A1.txt");
    var initialMode = fp.statSync().mode;
    var parsedMode = src_1.default.parseModeIntoOctal(initialMode);
    it("Should be able to inform a user about permissions given a mode", function () { return __awaiter(void 0, void 0, void 0, function () {
        var permissions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fp.access()];
                case 1:
                    permissions = _a.sent();
                    (0, assert_1.default)(permissions.canRead && permissions.canWrite);
                    return [2 /*return*/];
            }
        });
    }); });
    if ((0, os_1.platform)() !== "win32") {
        it("Should be able to change the permissions of a file at all 3 levels on Unix-based systems", function () { return __awaiter(void 0, void 0, void 0, function () {
            var newPermissions, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, fp.chmod(511)];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, fp.access()];
                    case 2:
                        newPermissions = _d.sent();
                        (0, assert_1.default)(newPermissions.canExecute);
                        return [4 /*yield*/, fp.chmod(initialMode)];
                    case 3:
                        _d.sent();
                        _a = assert_1.default;
                        _c = (_b = src_1.default).parseModeIntoOctal;
                        return [4 /*yield*/, fp.stat()];
                    case 4:
                        _a.apply(void 0, [_c.apply(_b, [(_d.sent()).mode]) === parsedMode]);
                        return [2 /*return*/];
                }
            });
        }); });
    }
});
describe("Detection of filepaths at Nth level away", function () {
    var fpRootForTest = new src_1.default(__dirname, "NthLevelAwayTest");
    var fp0 = new src_1.default(__dirname, "NthLevelAwayTest", "Level-1", "Level0A");
    var fp1 = new src_1.default(__dirname, "NthLevelAwayTest", "Level-1", "Level0B");
    fp1.makeDirSync();
    fp0.resolve("Level1A").makeDirSync();
    fp0.resolve("Level1B").makeDirSync();
    it("Should be able to detect sibling filepaths", function () { return __awaiter(void 0, void 0, void 0, function () {
        var siblingNames, _a, _b, basename;
        var e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, fp0.getPathsNLevelsAway(0, false, { onlyDirectories: true })];
                case 1: return [4 /*yield*/, (_d.sent()).map(function (p) { return p.basename; })];
                case 2:
                    siblingNames = _d.sent();
                    try {
                        for (_a = __values(["Level0A", "Level0B"]), _b = _a.next(); !_b.done; _b = _a.next()) {
                            basename = _b.value;
                            (0, assert_1.default)(siblingNames.includes(basename));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should be able to detect child filepaths", function () { return __awaiter(void 0, void 0, void 0, function () {
        var childNames, _a, _b, basename;
        var e_4, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, fp0.getPathsNLevelsAway(1, false, { onlyDirectories: true })];
                case 1: return [4 /*yield*/, (_d.sent()).map(function (p) { return p.basename; })];
                case 2:
                    childNames = _d.sent();
                    try {
                        for (_a = __values(["Level1A", "Level1B"]), _b = _a.next(); !_b.done; _b = _a.next()) {
                            basename = _b.value;
                            (0, assert_1.default)(childNames.includes(basename));
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should be able to detect parent filepaths", function () { return __awaiter(void 0, void 0, void 0, function () {
        var parentNames, _a, _b, basename;
        var e_5, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, fp0.getPathsNLevelsAway(-1, false, { onlyDirectories: true })];
                case 1: return [4 /*yield*/, (_d.sent()).map(function (p) { return p.basename; })];
                case 2:
                    parentNames = _d.sent();
                    try {
                        for (_a = __values(["Level-1"]), _b = _a.next(); !_b.done; _b = _a.next()) {
                            basename = _b.value;
                            (0, assert_1.default)(parentNames.includes(basename));
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    setTimeout(function () { return fpRootForTest.deleteSync(); }, 200);
});
describe("Making and removing filepaths", function () {
    var fpRootForTest = new src_1.default(__dirname, "MakeAndRemakeFilePathTests");
    var candidateFile = fpRootForTest.resolve("File_C1.csv");
    var candidateDir = fpRootForTest.resolve("SubfolderD");
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
        var error_3, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, candidateFile.makeFile()];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [4 /*yield*/, sleep(20)];
                case 4:
                    _b.sent();
                    _a = assert_1.default;
                    return [4 /*yield*/, candidateFile.exists()];
                case 5:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should successfully make a directory with makeDir, creating parent directories as needed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, candidateDir.makeDir()];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [4 /*yield*/, sleep(20)];
                case 4:
                    _b.sent();
                    _a = assert_1.default;
                    return [4 /*yield*/, candidateDir.exists()];
                case 5:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    setTimeout(function () { return fpRootForTest.deleteSync(); }, 200);
});
describe("Making and Reading Symlinks", function () {
    var fpRootForTest = new src_1.default(__dirname, "SymlinkTests");
    var exampleSourceFile = fpRootForTest.resolve("SourceFoo.txt");
    var exampleTargetFile = fpRootForTest.resolve("TargetFoo.txt");
    var exampleSourceDirectory = fpRootForTest.resolve("SourceDirectory");
    var exampleTargetDirectory = fpRootForTest.resolve("TargetDirectory");
    exampleSourceFile.makeFileSync();
    exampleSourceDirectory.makeDirSync();
    exampleTargetFile.makeFileSync();
    exampleTargetDirectory.makeDirSync();
    var symlinkFromSourceFile = fpRootForTest.resolve("SymlinkFromSourceFoo.symlink");
    var symlinkFromSourceDirectory = fpRootForTest.resolve("SymlinkFromSourceBar.symlink");
    var symlinkToTargetFile = fpRootForTest.resolve("SymlinkToTargetFoo.symlink");
    var symlinkToTargetDirectory = fpRootForTest.resolve("SymlinkToTargetBar.symlink");
    it("Should be able to make a valid link between a source file and a target symlink file", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exampleSourceFile.makeSymlink(symlinkFromSourceFile, true)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, sleep(10)];
                case 2:
                    _b.sent();
                    _a = assert_1.default;
                    return [4 /*yield*/, symlinkFromSourceFile.readLink()];
                case 3:
                    _a.apply(void 0, [(_b.sent()).path === exampleSourceFile.path]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should be able to make a valid link between a source directory and a target symlink", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exampleSourceDirectory.makeSymlink(symlinkFromSourceDirectory, true)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, sleep(10)];
                case 2:
                    _b.sent(); // Hack
                    _a = assert_1.default;
                    return [4 /*yield*/, symlinkFromSourceDirectory.readLink()];
                case 3:
                    _a.apply(void 0, [(_b.sent()).path === exampleSourceDirectory.path]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should be able to make a valid link between a source symlink and a target file", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, symlinkToTargetFile.makeSymlink(exampleTargetFile, false)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, sleep(10)];
                case 2:
                    _b.sent(); // Hack
                    _a = assert_1.default;
                    return [4 /*yield*/, symlinkToTargetFile.readLink()];
                case 3:
                    _a.apply(void 0, [(_b.sent()).path === exampleTargetFile.path]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should be able to make a valid link between a source symlink and a target directory", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, symlinkToTargetDirectory.makeSymlink(exampleTargetDirectory, false)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, sleep(10)];
                case 2:
                    _b.sent(); // Hack
                    _a = assert_1.default;
                    return [4 /*yield*/, symlinkToTargetDirectory.readLink()];
                case 3:
                    _a.apply(void 0, [(_b.sent()).path === exampleTargetDirectory.path]);
                    return [2 /*return*/];
            }
        });
    }); });
    setTimeout(function () { return fpRootForTest.deleteSync(); }, 400);
});
describe("Reading and Writing JSON files", function () {
    var jsonReadFile = new src_1.default(__dirname, "FolderB", "File_B1.json");
    var jsonWriteFile = new src_1.default(__dirname, "FolderB", "File_B2.json");
    var notAJSONFile = new src_1.default(__dirname, "FolderC");
    it("Should correctly read in a JSON Object", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jsonContents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jsonReadFile.readJSON()];
                case 1:
                    jsonContents = _a.sent();
                    assert_1.default.deepStrictEqual(jsonContents, {
                        foo: "a string",
                        bar: 42,
                        baz: true,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should correctly write a JSON object into a valid JSON filepath", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jsonWriteFile.writeJSON({ key1: "value1", key2: "value2" })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    (0, assert_1.default)(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("Should throw an error if the user attempts to write a JSON object into an invalid filepath", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, notAJSONFile.writeJSON({ bad: "filepath" })];
                case 1:
                    _a.sent();
                    (0, assert_1.default)(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    (0, assert_1.default)(true);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    setTimeout(function () { return notAJSONFile.deleteSync(); }, 200);
});
describe("Reading and Writing other Files", function () {
    var testFile = new src_1.default(__dirname, "ReadWriteTestOther", "Test.txt");
    it("Should be able to write content to a file and then read that content from the same file in a separate operation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var contents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testFile.writeFile("Hello World", { encoding: "ascii" })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, testFile.readFile("ascii")];
                case 2:
                    contents = _a.sent();
                    (0, assert_1.default)(contents === "Hello World");
                    return [4 /*yield*/, testFile.parent().remove()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Moving and copying filepaths", function () {
    var copySrcPath = new src_1.default(__dirname, "FolderX", "X1", "X1_1.foo");
    var copyDstPath = new src_1.default(__dirname, "FolderX", "X2", "X1_1.foo");
    var moveSrcPath = new src_1.default(__dirname, "FolderY", "Y1", "Y1_1.bar");
    var moveDstPath = new src_1.default(__dirname, "FolderY", "Y2", "Y1_1.bar");
    copySrcPath.makeFileSync();
    moveSrcPath.makeFileSync();
    it("Should be able to copy a filepath into another location, making parent directories as necessary. Following this, it should also be able to remove them.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = assert_1.default;
                    return [4 /*yield*/, copyDstPath.exists()];
                case 1:
                    _a.apply(void 0, [!(_e.sent())]);
                    return [4 /*yield*/, copySrcPath.copy(copyDstPath)];
                case 2:
                    _e.sent();
                    _b = assert_1.default;
                    return [4 /*yield*/, copyDstPath.exists()];
                case 3:
                    _b.apply(void 0, [_e.sent()]);
                    return [4 /*yield*/, new src_1.default(__dirname, "FolderX").remove()];
                case 4:
                    _e.sent();
                    return [4 /*yield*/, sleep(20)];
                case 5:
                    _e.sent(); // Hack
                    _c = assert_1.default;
                    return [4 /*yield*/, copyDstPath.exists()];
                case 6:
                    _c.apply(void 0, [!(_e.sent())]);
                    _d = assert_1.default;
                    return [4 /*yield*/, copySrcPath.exists()];
                case 7:
                    _d.apply(void 0, [!(_e.sent())]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should be able to move a filepath into another location, making parent directories as necessary. Following this, it should also be able to remove them.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = assert_1.default;
                    return [4 /*yield*/, moveDstPath.exists()];
                case 1:
                    _a.apply(void 0, [!(_f.sent())]);
                    return [4 /*yield*/, moveSrcPath.move(moveDstPath)];
                case 2:
                    _f.sent();
                    _b = assert_1.default;
                    return [4 /*yield*/, moveDstPath.exists()];
                case 3:
                    _b.apply(void 0, [_f.sent()]);
                    _c = assert_1.default;
                    return [4 /*yield*/, moveSrcPath.exists()];
                case 4:
                    _c.apply(void 0, [!(_f.sent())]);
                    return [4 /*yield*/, new src_1.default(__dirname, "FolderY").remove()];
                case 5:
                    _f.sent();
                    return [4 /*yield*/, sleep(20)];
                case 6:
                    _f.sent(); // Hack
                    _d = assert_1.default;
                    return [4 /*yield*/, moveDstPath.exists()];
                case 7:
                    _d.apply(void 0, [!(_f.sent())]);
                    _e = assert_1.default;
                    return [4 /*yield*/, moveSrcPath.exists()];
                case 8:
                    _e.apply(void 0, [!(_f.sent())]);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Static methods work as intended", function () {
    it("Should be able to retrieve the current working directory and validate its existence", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = assert_1.default;
                    return [4 /*yield*/, src_1.default.cwd().exists()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should be able to retrieve filepaths found under PATH", function () {
        if (process.env.PATH) {
            (0, assert_1.default)(src_1.default.getPATHAsPaths().length);
        }
    });
    it("Should be able to parse permissions into a human-readable octal", function () {
        var mode = src_1.default.parseModeIntoOctal(new src_1.default(__filename).statSync().mode);
        (0, assert_1.default)(mode && Number.isInteger(mode));
        (0, assert_1.default)(/\d{3}/gm.test(mode.toString()));
    });
});
