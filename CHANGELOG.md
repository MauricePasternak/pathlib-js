# Change Log

All notable changes to this project will be documented in this file.
**NB:** Dates have format YYYY-MM-DD.

---

## [1.5.0] - 2022-08-28

### Added

- New class `PathWatcher` is this library's extension of `chokidar's` FSWatcher. Essentially the same, but operating around `Path` instances instead of strings when adding/removing filepaths and listening for events.
- Added some tests for the above.

### Changed

- `Path.watch` now returns a `PathWatcher` instance or a `Promise` that resolves to a `PathWatcher` instance.
- Tests associated with symlinks are now conditionally executed on Unix. On Windows, the symlink functionality requires admin priveleges, which isn't normally available during unit testing.

### Fixed

- Fixed a bug in the `toString` method where the forward slash would double-up on Unix. The change to backslashes is only necessary on Windows.
- Fixed a typo in the definition of `PathJSON`. It shouldn't have had non-primitives as any of the values.

---

## [1.4.0] - 2022-07-08

### Breaking

- The `suffixes` property has been changed to be in line with Python's `pathlib` library. Namely, leading "." characters are now present in all elements of the Array.

### Added

- Methods which make filepaths (`makeDir`, `makeDirSync`, `makeFile`, `makeFileSync`) have been given an optional `throwErrOnFail` parameter which defaults to `false`. With this new behavior, if an error is encountered while making the filepath, the method will re-throw the error if this parameter is set to `true`. These functions now also return the `Path` instance that invoked the method to allow for chaining.

### Changed

- Docstrings have received several rewordings in multiple methods and types in order to improve the TypeDoc output on Github Pages.
- Significant re-structuring of the README.md, now that the documentation has its own section.
- All glob-related functions have certain enforced settings to avoid scenarios where users can break functions by asking fast-glob to return objects instead of strings.

### Fixed

- Several asynchronous filepath operations did not have the appropriate `await` keyword set before them. This resulted in behavior that required sleeping hacks to work around. This is no longer the case.

---

## [1.3.2] - 2022-07-07

### Added

### Changed

- `getPathsNLevelsAway` had undesireable behavior with the default not globbing folder filepaths. This has been changed such that, at default, directories will also be included in the output.

### Fixed

- On Windows systems, the `root` property was incorrect. Oftentimes lowercase and inconsistently with or without a trailing slash. This has been fixed to be similar to Python's pathlib output. For example: "C:/"

---

## [1.3.1] - 2021-11-26

### Added

- Added method `withExtension()` which is similar to `withSuffix()`, except that it only changes the terminal extension/suffix.

### Changed

- `open()` and `openSync()` now account for the delay between the runtime and the filesystem creating openable files. If `ensureExists` is set to true, these methods will stall for up to 1000 milliseconds by default or up to the `timeout` indicated in the `openOptions` of the method. If the file does not exist by the time the timeout finishes, an error is thrown.

### Fixed

- A few functions had the first parameter as mandatory, when it is meant to be optional. It is now appropriately optional. Fixed functions include:
  - `tree()`
  - `treeSync()`
  - `getPathsNLevelsAway()`
- Number of code lines decreased in certain `is____` functions using a single private method for a common action between these methods.
- `getPathsNLevelsAway()` had an unnessary mandatory 2nd parameter, `asIterator`. It has been fixed to be optional and set to a default value of `false`.
- Several docstrings were updated and formatted to display types more distinctly.
- Corrected certain spelling and gramatical mistakes in the documentation.
- Documentation corrected to reflect's this library's approach to representing "root" on Windows (i.e. letter and colon only without slashes)

---

## [1.3.0] - 2021-11-22

### Added

Nothing new in this release.

### Changed

- The `parent()` method now supports an optional parameter, `numIncrements`, which controls the number of directory levels to increment by before returning the parent/ancestor path arrived at. It supports over-extension beyond the root, simply returning the root directory as a `Path` instance instead of throwing an error.
- Several methods now support relative path inputs, with the option to change the interpretation of the source of the relative path. The change in interpretation is controlled by a property in the `options` parameter of these methods called `interpRelativeSource` with two values:
  - `"cwd"` (default in most cases): relative paths are resolved based on the current working directory
  - `"path"`: relative paths are resolved based on the `Path` calling the method.
- The methods which were given the above support include:
  - `copy`
  - `copySync`
  - `move`
  - `moveSync`
  - `makeSymlink`
  - `makeSymlinkSync`
- Testing and documentation has been updated to reflect the above.

### Breaking

- former parameters `isTargetLink` and `type` in the `makeSymlink` and `makeSymlinkSync` methods are now properties of an `options` parameter object.

---

## [1.2.4] - 2021-11-20

### Added

- Added the option for users to include `~` as a character in the Path constructor. This will be resolved into the home directory of the operating system.
- Added the `readLink` method which determines the filepath a symlink points to if said symlink is the `Path` instance calling the method.

### Changed

- `makeSymlink` and `makeSymlinkSync` were overhauled to accept a new parameter `isTargetLink` which determines the behavior of the method:
  - if `true`, will treat the Path instance as a filepath and `target` as a symlink. Otherwise, vice versa.
- Documentation to `makeSymlink` and `makeSymlinkSync` were changed to accomodate the above
- Several tests were overhauled to not interfere with one another due to name clashes (i.e. restrict the filepath-based test to occur within a generated Test[Something]Root root folder)

### Fixed

- the behavior of `join` still displayed "resolve-like" behavior, which is not the intention of the method (that's what `resolve` is for). Has been corrected to interpret strings like ".." literally when they are appended to a Path instance to generate a new one.
