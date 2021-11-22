# Change Log

All notable changes to this project will be documented in this file.
**NB:** Dates have format YYYY-MM-DD.

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
