import { tmpdir } from "os";
import { join } from "path";
import { Path } from "../../src/path.js";

describe("Path.tmpSync()", () => {
    // Helper to create unique temp paths for each test
    const getTempPath = (suffix: string) => 
        new Path(join(tmpdir(), `pathlib-test-${Date.now()}-${suffix}`));

    describe("file handling", () => {
        it("creates and removes a temporary file", () => {
            const tempFile = getTempPath("file.txt");
            expect(tempFile.existsSync()).toBe(false);
            
            {
                using tmp = tempFile.tmpSync();
                expect(tempFile.existsSync()).toBe(true);
                expect(tempFile.isFileSync()).toBe(true);
            }
            
            expect(tempFile.existsSync()).toBe(false);
        });

        it("handles files without extensions when noExtensionIsFile is true", () => {
            const tempFile = getTempPath("noext");
            expect(tempFile.existsSync()).toBe(false);
            
            {
                using tmp = tempFile.tmpSync({ noExtensionIsFile: true });
                expect(tempFile.existsSync()).toBe(true);
                expect(tempFile.isFileSync()).toBe(true);
            }
            
            expect(tempFile.existsSync()).toBe(false);
        });
    });

    describe("directory handling", () => {
        it("creates and removes a temporary directory", () => {
            const tempDir = getTempPath("dir");
            expect(tempDir.existsSync()).toBe(false);
            
            {
                using tmp = tempDir.tmpSync();
                expect(tempDir.existsSync()).toBe(true);
                expect(tempDir.isDirectorySync()).toBe(true);
            }
            
            expect(tempDir.existsSync()).toBe(false);
        });

        it("treats paths without extensions as directories by default", () => {
            const tempDir = getTempPath("noext");
            expect(tempDir.existsSync()).toBe(false);
            
			{
				using tmp = tempDir.tmpSync();
				expect(tempDir.existsSync()).toBe(true);
				expect(tempDir.isDirectorySync()).toBe(true);
			}
			expect(tempDir.existsSync()).toBe(false);
		});
	});

    describe("nested paths", () => {
        it("creates and removes parent directories as needed", () => {
            const baseDir = getTempPath("base");
            const nestedFile = new Path(baseDir.path, "nested", "file.txt");
            
            expect(baseDir.existsSync()).toBe(false);
            expect(nestedFile.existsSync()).toBe(false);
            
            {
                using tmp = nestedFile.tmpSync();
                expect(baseDir.existsSync()).toBe(true);
                expect(nestedFile.existsSync()).toBe(true);
            }
            
            expect(baseDir.existsSync()).toBe(false);
            expect(nestedFile.existsSync()).toBe(false);
        });

        it("only removes up to first existing parent", () => {
            const baseDir = getTempPath("base");
            baseDir.makeDirSync();
            
            try {
                const nestedFile = new Path(baseDir.path, "nested", "file.txt");
                
                {
                    using tmp = nestedFile.tmpSync();
                    expect(nestedFile.existsSync()).toBe(true);
                }
                
                expect(nestedFile.existsSync()).toBe(false);
                expect(baseDir.existsSync()).toBe(true);
            } finally {
                baseDir.removeSync();
            }
        });
    });

    describe("existing paths", () => {
        it("does nothing for existing files", () => {
            const existingFile = getTempPath("existing.txt");
            existingFile.makeFileSync();
            
            try {
                {
                    using tmp = existingFile.tmpSync();
                    expect(existingFile.existsSync()).toBe(true);
                }
                expect(existingFile.existsSync()).toBe(true);
            } finally {
                existingFile.removeSync();
            }
        });

        it("does nothing for existing directories", () => {
            const existingDir = getTempPath("existing-dir");
            existingDir.makeDirSync();
            
            try {
                {
                    using tmp = existingDir.tmpSync();
                    expect(existingDir.existsSync()).toBe(true);
                }
                expect(existingDir.existsSync()).toBe(true);
            } finally {
                existingDir.removeSync();
            }
        });
    });

    describe("error handling", () => {
        it("handles manual removal before cleanup", () => {
            const tempFile = getTempPath("error.txt");
            
            {
                using tmp = tempFile.tmpSync();
                expect(tempFile.existsSync()).toBe(true);
                tempFile.removeSync(); // Manual removal
            }
            
            expect(tempFile.existsSync()).toBe(false);
        });
    });
});


describe("Path.tmp()", () => {
    // Helper to create unique temp paths for each test
    const getTempPath = (suffix: string) => 
        new Path(join(tmpdir(), `pathlib-test-${Date.now()}-${suffix}`));

    describe("file handling", () => {
        it("creates and removes a temporary file", async () => {
            const tempFile = getTempPath("file.txt");
            expect(await tempFile.exists()).toBe(false);
            
            {
                await using tmp = await tempFile.tmp();
                expect(await tempFile.exists()).toBe(true);
                expect(await tempFile.isFile()).toBe(true);
            }
            
            expect(await tempFile.exists()).toBe(false);
        });

        it("handles files without extensions when noExtensionIsFile is true", async () => {
            const tempFile = getTempPath("noext");
            expect(await tempFile.exists()).toBe(false);
            
            {
                await using tmp = await tempFile.tmp({ noExtensionIsFile: true });
                expect(await tempFile.exists()).toBe(true);
                expect(await tempFile.isFile()).toBe(true);
            }
            
            expect(await tempFile.exists()).toBe(false);
        });
    });

    describe("directory handling", () => {
        it("creates and removes a temporary directory", async () => {
            const tempDir = getTempPath("dir");
            expect(await tempDir.exists()).toBe(false);
            
            {
                await using tmp = await tempDir.tmp();
                expect(await tempDir.exists()).toBe(true);
                expect(await tempDir.isDirectory()).toBe(true);
            }
            
            expect(await tempDir.exists()).toBe(false);
        });

        it("treats paths without extensions as directories by default", async () => {
            const tempDir = getTempPath("noext");
            expect(await tempDir.exists()).toBe(false);
            
            {
                await using tmp = await tempDir.tmp();
                expect(await tempDir.exists()).toBe(true);
                expect(await tempDir.isDirectory()).toBe(true);
            }
            
            expect(await tempDir.exists()).toBe(false);
        });
    });

    describe("nested paths", () => {
        it("creates and removes parent directories as needed", async () => {
            const baseDir = getTempPath("base");
            const nestedFile = new Path(baseDir.path, "nested", "file.txt");
            
            expect(await baseDir.exists()).toBe(false);
            expect(await nestedFile.exists()).toBe(false);
            
            {
                await using tmp = await nestedFile.tmp();
                expect(await baseDir.exists()).toBe(true);
                expect(await nestedFile.exists()).toBe(true);
            }
            
            expect(await baseDir.exists()).toBe(false);
            expect(await nestedFile.exists()).toBe(false);
        });

        it("only removes up to first existing parent", async () => {
            const baseDir = getTempPath("base");
            await baseDir.makeDir();
            
            try {
                const nestedFile = new Path(baseDir.path, "nested", "file.txt");
                
                {
                    await using tmp = await nestedFile.tmp();
                    expect(await nestedFile.exists()).toBe(true);
                }
                
                expect(await nestedFile.exists()).toBe(false);
                expect(await baseDir.exists()).toBe(true);
            } finally {
                await baseDir.remove();
            }
        });
    });

    describe("existing paths", () => {
        it("does nothing for existing files", async () => {
            const existingFile = getTempPath("existing.txt");
            await existingFile.makeFile();
            
            try {
                {
                    await using tmp = await existingFile.tmp();
                    expect(await existingFile.exists()).toBe(true);
                }
                expect(await existingFile.exists()).toBe(true);
            } finally {
                await existingFile.remove();
            }
        });

        it("does nothing for existing directories", async () => {
            const existingDir = getTempPath("existing-dir");
            await existingDir.makeDir();
            
            try {
                {
                    await using tmp = await existingDir.tmp();
                    expect(await existingDir.exists()).toBe(true);
                }
                expect(await existingDir.exists()).toBe(true);
            } finally {
                await existingDir.remove();
            }
        });
    });

    describe("error handling", () => {
        it("handles manual removal before cleanup", async () => {
            const tempFile = getTempPath("error.txt");
            
            {
                await using tmp = await tempFile.tmp();
                expect(await tempFile.exists()).toBe(true);
                await tempFile.remove(); // Manual removal
            }
            
            expect(await tempFile.exists()).toBe(false);
        });

        it("handles concurrent operations", async () => {
            const tempFile1 = getTempPath("concurrent1.txt");
            const tempFile2 = getTempPath("concurrent2.txt");
            
            {
                const [tmp1, tmp2] = await Promise.all([
                    tempFile1.tmp(),
                    tempFile2.tmp()
                ]);
                await using _ = tmp1;
                await using __ = tmp2;
                
                expect(await tempFile1.exists()).toBe(true);
                expect(await tempFile2.exists()).toBe(true);
            }
            
            expect(await tempFile1.exists()).toBe(false);
            expect(await tempFile2.exists()).toBe(false);
        });
    });

    describe("nested scopes", () => {
        it("handles nested temporary paths correctly", async () => {
            const tempDir = getTempPath("parent");
            const tempFile = new Path(tempDir.path, "child.txt");
            
            {
                await using dirTmp = await tempDir.tmp();
                expect(await tempDir.exists()).toBe(true);
                
                {
                    await using fileTmp = await tempFile.tmp();
                    expect(await tempFile.exists()).toBe(true);
                }
                
                expect(await tempFile.exists()).toBe(false);
                expect(await tempDir.exists()).toBe(true);
            }
            
            expect(await tempDir.exists()).toBe(false);
        });

        it("handles multiple temporary paths in same scope", async () => {
            const paths = Array.from({ length: 3 }, (_, i) => 
                getTempPath(`multi${i}.txt`));
            
            {
                const tmps = await Promise.all(paths.map(p => p.tmp()));
                await using _ = tmps[0];
                await using __ = tmps[1];
                await using ___ = tmps[2];
                
                for (const p of paths) {
                    expect(await p.exists()).toBe(true);
                }
            }
            
            for (const p of paths) {
                expect(await p.exists()).toBe(false);
            }
        });
    });
});


describe("Path.tmp()", () => {
    // Helper to create unique temp paths for each test
    const getTempPath = (suffix: string) => 
        new Path(join(tmpdir(), `pathlib-test-${Date.now()}-${suffix}`));

    describe("file handling", () => {
        it("creates and removes a temporary file", async () => {
            const tempFile = getTempPath("file.txt");
            expect(await tempFile.exists()).toBe(false);
            
            {
                await using tmp = await tempFile.tmp();
                expect(await tempFile.exists()).toBe(true);
                expect(await tempFile.isFile()).toBe(true);
            }
            
            expect(await tempFile.exists()).toBe(false);
        });

        it("handles files without extensions when noExtensionIsFile is true", async () => {
            const tempFile = getTempPath("noext");
            expect(await tempFile.exists()).toBe(false);
            
            {
                await using tmp = await tempFile.tmp({ noExtensionIsFile: true });
                expect(await tempFile.exists()).toBe(true);
                expect(await tempFile.isFile()).toBe(true);
            }
            
            expect(await tempFile.exists()).toBe(false);
        });
    });

    describe("directory handling", () => {
        it("creates and removes a temporary directory", async () => {
            const tempDir = getTempPath("dir");
            expect(await tempDir.exists()).toBe(false);
            
            {
                await using tmp = await tempDir.tmp();
                expect(await tempDir.exists()).toBe(true);
                expect(await tempDir.isDirectory()).toBe(true);
            }
            
            expect(await tempDir.exists()).toBe(false);
        });

        it("treats paths without extensions as directories by default", async () => {
            const tempDir = getTempPath("noext");
            expect(await tempDir.exists()).toBe(false);
            
            {
                await using tmp = await tempDir.tmp();
                expect(await tempDir.exists()).toBe(true);
                expect(await tempDir.isDirectory()).toBe(true);
            }
            
            expect(await tempDir.exists()).toBe(false);
        });
    });

    describe("nested paths", () => {
        it("creates and removes parent directories as needed", async () => {
            const baseDir = getTempPath("base");
            const nestedFile = new Path(baseDir.path, "nested", "file.txt");
            
            expect(await baseDir.exists()).toBe(false);
            expect(await nestedFile.exists()).toBe(false);
            
            {
                await using tmp = await nestedFile.tmp();
                expect(await baseDir.exists()).toBe(true);
                expect(await nestedFile.exists()).toBe(true);
            }
            
            expect(await baseDir.exists()).toBe(false);
            expect(await nestedFile.exists()).toBe(false);
        });

        it("only removes up to first existing parent", async () => {
            const baseDir = getTempPath("base");
            await baseDir.makeDir();
            
            try {
                const nestedFile = new Path(baseDir.path, "nested", "file.txt");
                
                {
                    await using tmp = await nestedFile.tmp();
                    expect(await nestedFile.exists()).toBe(true);
                }
                
                expect(await nestedFile.exists()).toBe(false);
                expect(await baseDir.exists()).toBe(true);
            } finally {
                await baseDir.remove();
            }
        });
    });

    describe("existing paths", () => {
        it("does nothing for existing files", async () => {
            const existingFile = getTempPath("existing.txt");
            await existingFile.makeFile();
            
            try {
                {
                    await using tmp = await existingFile.tmp();
                    expect(await existingFile.exists()).toBe(true);
                }
                expect(await existingFile.exists()).toBe(true);
            } finally {
                await existingFile.remove();
            }
        });

        it("does nothing for existing directories", async () => {
            const existingDir = getTempPath("existing-dir");
            await existingDir.makeDir();
            
            try {
                {
                    await using tmp = await existingDir.tmp();
                    expect(await existingDir.exists()).toBe(true);
                }
                expect(await existingDir.exists()).toBe(true);
            } finally {
                await existingDir.remove();
            }
        });
    });

    describe("error handling", () => {
        it("handles manual removal before cleanup", async () => {
            const tempFile = getTempPath("error.txt");
            
            {
                await using tmp = await tempFile.tmp();
                expect(await tempFile.exists()).toBe(true);
                await tempFile.remove(); // Manual removal
            }
            
            expect(await tempFile.exists()).toBe(false);
        });

        it("handles concurrent operations", async () => {
            const tempFile1 = getTempPath("concurrent1.txt");
            const tempFile2 = getTempPath("concurrent2.txt");
            
            {
                const [tmp1, tmp2] = await Promise.all([
                    tempFile1.tmp(),
                    tempFile2.tmp()
                ]);
                await using _ = tmp1;
                await using __ = tmp2;
                
                expect(await tempFile1.exists()).toBe(true);
                expect(await tempFile2.exists()).toBe(true);
            }
            
            expect(await tempFile1.exists()).toBe(false);
            expect(await tempFile2.exists()).toBe(false);
        });
    });

    describe("nested scopes", () => {
        it("handles nested temporary paths correctly", async () => {
            const tempDir = getTempPath("parent");
            const tempFile = new Path(tempDir.path, "child.txt");
            
            {
                await using dirTmp = await tempDir.tmp();
                expect(await tempDir.exists()).toBe(true);
                
                {
                    await using fileTmp = await tempFile.tmp();
                    expect(await tempFile.exists()).toBe(true);
                }
                
                expect(await tempFile.exists()).toBe(false);
                expect(await tempDir.exists()).toBe(true);
            }
            
            expect(await tempDir.exists()).toBe(false);
        });

        it("handles multiple temporary paths in same scope", async () => {
            const paths = Array.from({ length: 3 }, (_, i) => 
                getTempPath(`multi${i}.txt`));
            
            {
                const tmps = await Promise.all(paths.map(p => p.tmp()));
                await using _ = tmps[0];
                await using __ = tmps[1];
                await using ___ = tmps[2];
                
                for (const p of paths) {
                    expect(await p.exists()).toBe(true);
                }
            }
            
            for (const p of paths) {
                expect(await p.exists()).toBe(false);
            }
        });
    });
});