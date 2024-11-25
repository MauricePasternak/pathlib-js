import * as fse from "fs-extra";
import { tmpdir } from "os";
import { setTimeout } from "timers/promises";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Path, PathWatcher } from "../../src/path.js";

describe("Watch and PathWatcher Tests", () => {
	const DELAY = 200;
	let tempDir: Path;
	let testFile: Path;
	let watcher: PathWatcher;

	beforeEach(async () => {
		tempDir = new Path(tmpdir(), "pathlib-test-watch");
		await fse.remove(tempDir.path);
		await fse.ensureDir(tempDir.path);
		testFile = new Path(tempDir, "test.txt");
	});

	afterEach(async () => {
		if (watcher && typeof watcher.close === "function") {
			await watcher.close();
		}
		await fse.remove(tempDir.path);
	});

	describe("watch method", () => {
		test("returns PathWatcher instance", () => {
			watcher = tempDir.watch(undefined, false);
			expect(watcher).toBeInstanceOf(PathWatcher);
		});

		test("waitUntilReady returns Promise<PathWatcher>", async () => {
			const watcherPromise = tempDir.watch(undefined, true);
			expect(watcherPromise).toBeInstanceOf(Promise);
			watcher = await watcherPromise;
			expect(watcher).toBeInstanceOf(PathWatcher);
		});
	});

	describe("PathWatcher events", () => {
		test("emits 'add' event when file is created", async () => {
			const addSpy = vi.fn((v: Path) => {
				console.log("ADD event", v);
			});

			// Wait for watcher to be ready before starting test
			watcher = await tempDir.watch(
				{
					ignoreInitial: true,
				},
				true
			); // Use waitUntilReady option

			watcher.on("add", addSpy);
			await fse.writeFile(testFile.path, "test content");
			await setTimeout(200);

			expect(addSpy).toHaveBeenCalledTimes(1);
			const [path] = addSpy.mock.calls[0];
			expect(path).toEqual(testFile);
		});

		test("emits 'change' event when file is modified", async () => {
			const changeSpy = vi.fn();
			await fse.writeFile(testFile.path, "initial content");

			watcher = await tempDir.watch({ ignoreInitial: true }, true);

			watcher.on("change", changeSpy);
			await fse.writeFile(testFile.path, "modified content");
			await setTimeout(DELAY);

			expect(changeSpy).toHaveBeenCalledTimes(1);
			const [path] = changeSpy.mock.calls[0];
			expect(path).toEqual(testFile);
		});

		test("emits 'unlink' event when file is removed", async () => {
			const unlinkSpy = vi.fn();
			await fse.writeFile(testFile.path, "test content");

			watcher = await tempDir.watch({ ignoreInitial: true }, true);
			watcher.on("unlink", unlinkSpy);

			await fse.remove(testFile.path);
			await setTimeout(DELAY);

			expect(unlinkSpy).toHaveBeenCalledTimes(1);
			const [path] = unlinkSpy.mock.calls[0];
			expect(path).toEqual(testFile);
		});

		test("emits 'addDir' event when directory is created", async () => {
			const addDirSpy = vi.fn();
			const testDir = new Path(tempDir, "testdir");

			watcher = await tempDir.watch({ ignoreInitial: true }, true);
			watcher.on("addDir", addDirSpy);

			await fse.ensureDir(testDir.path);
			await setTimeout(DELAY);

			expect(addDirSpy).toHaveBeenCalledTimes(1);
			const [path] = addDirSpy.mock.calls[0];
			expect(path).toEqual(testDir);
		});

		test("emits 'all' event for any filesystem event", async () => {
			const allSpy = vi.fn();
			watcher = await tempDir.watch({ ignoreInitial: true }, true);
			watcher.on("all", allSpy);

			await fse.writeFile(testFile.path, "test content");
			await setTimeout(DELAY);
			await fse.writeFile(testFile.path, "modified content");
			await setTimeout(DELAY);
			await fse.remove(testFile.path);
			await setTimeout(DELAY);

			expect(allSpy).toHaveBeenCalledTimes(3); // add, change, unlink
			expect(allSpy.mock.calls[0][0]).toBe("add");
			expect(allSpy.mock.calls[1][0]).toBe("change");
			expect(allSpy.mock.calls[2][0]).toBe("unlink");
		});

		test("handles error events", async () => {
			const errorSpy = vi.fn();
			watcher = await tempDir.watch({ ignoreInitial: true }, true);
			watcher.on("error", errorSpy);

			// Simulate error by emitting it directly on the internal watcher
			watcher["_watcher"].emit("error", new Error("test error"));
			await setTimeout(DELAY);

			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(errorSpy.mock.calls[0][0]).toBeInstanceOf(Error);
		});

		test("throws on unsupported event type", async () => {
			watcher = await tempDir.watch({ ignoreInitial: true }, true);
			expect(() => {
				watcher.on("unsupported" as any, () => {});
			}).toThrow(/PathWatcher only supports/);
		});
	});

	describe("PathWatcher methods", () => {
		test("add adds new paths to watch", async () => {
			const addSpy = vi.fn();
			const newFile = new Path(tempDir, "newfile.txt");

			watcher = await tempDir.watch({ ignoreInitial: true }, true);
			watcher.on("add", addSpy);
			watcher.add(newFile);

			await fse.writeFile(newFile.path, "test content");
			await setTimeout(DELAY);

			expect(addSpy).toHaveBeenCalledWith(newFile, expect.any(Object));
		});

		test("unwatch stops watching paths", async () => {
			const changeSpy = vi.fn();
			await fse.writeFile(testFile.path, "initial content");

			watcher = await tempDir.watch({ ignoreInitial: true }, true);
			watcher.on("change", changeSpy);

			await setTimeout(DELAY);
			watcher.unwatch(testFile);
			await setTimeout(DELAY);

			await fse.writeFile(testFile.path, "modified content");
			await setTimeout(DELAY);

			expect(changeSpy).not.toHaveBeenCalled();
		});

		test("getWatched returns watched paths", async () => {
			await fse.writeFile(testFile.path, "test content");
			watcher = await tempDir.watch({ ignoreInitial: true }, true);
			await setTimeout(DELAY);

			const watched = watcher.getWatched();
			expect(Object.keys(watched)).toContain(tempDir.path);
		});
	});
});
