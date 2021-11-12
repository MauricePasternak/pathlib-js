# Changing Permissions, Moving, Copying, and Deleting

## Associated Path Methods

- [chmod()](#chmod)
- [chmodSync()](#chmodSync)
- [chown()](#chown)
- [chownSync()](#chownSync)
- [move()](#move)
- [moveSync()](#moveSync)
- [copy()](#copy)
- [copySync()](#copySync)
- [remove()](#remove)
- [removeSync()](#removeSync)

## File Structure Example for this API

The following hypothetical folder structure will be used as a demonstration of the API.

```
Example
├── Folder_A
│   ├── File_A1.txt
│   ├── File_A2.txt
└── Folder_B
    ├── File_B1.json
    └── File_B2.json
```

### chmod(mode) <a name = "#chmod"></a>

Asynchronously changes the permissions of the underlying filepath.

⚠️ On Windows only the write permission can be changed, and the distinction among the permissions of group, owner or others is not implemented. ⚠️

- Parameters:

  - `mode` -- `string | number` -- Either a number indicating the new permissions to impart (i.e. 0o511) or one the node strings dictating permissions.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_A\\File_A1.txt");
  console.log(Path.parseModeIntoOctal(await fp.stat()));
  await fp.chmod(0o111);
  console.log(Path.parseModeIntoOctal(await fp.stat()));
};
ES5CompatibilityWrapper();

> 666
> 444

```

### chmodSync(mode) <a name = "#chmodSync"></a>

Synchronously changes the permissions of the underlying filepath.

⚠️ On Windows only the write permission can be changed, and the distinction among the permissions of group, owner or others is not implemented. ⚠️

- Parameters:

  - `mode` -- `string | number` -- Either a number indicating the new permissions to impart (i.e. 0o511) or one the node strings dictating permissions.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_A\\File_A1.txt");
console.log(Path.parseModeIntoOctal(fp.statSync()));
fp.chmodSync(0o111);
console.log(Path.parseModeIntoOctal(fp.statSync()));

> 666
> 444

```

### chown(uid, gid) <a name = "#chown"></a>

**Asynchronously** changes the owner of a filepath.

### chownSync(uid, gid) <a name = "#chown"></a>

**Synchronously** changes the owner of a filepath.

### move(dst [, overwrite]) <a name = "#move"></a>

**Asynchronously** moves the underlying filepath or its children to the indicated destination.

- Parameters:

  - `dst` -- `string | Path` -- The filepath destination. Note that if the filepath being moved is a file, it itself will be moved. If, instead the filepath is a folder, then its contents will be moved to the indicated destination.
  - `overwrite` -- `boolean` -- Whether to overwrite any existing filepaths during the operation.

- Returns:
  - `Path` - The destination filepath is returned as a Path instance if the operation was successful.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_A\\File_A1.txt");
  const destination = await fp.move(fp.parent().parent().join("Folder_B", "File_A1_Moved.txt"), true);
  console.log(destination.path);
  console.log(await destination.exists());
};
ES5CompatibilityWrapper();

> C:/Users/JohnDoe/Example/Folder_B/File_A1_Moved.txt
> true
```

### moveSync(dst [, overwrite]) <a name = "#moveSync"></a>

**Synchronously** moves the underlying filepath or its children to the indicated destination. Note that if the filepath being moved is a file, it itself will be moved. If, instead the filepath is a folder, then its contents will be moved to the indicated destination.

- Parameters:

  - `dst` -- `string | Path` -- The filepath destination.
  - `overwrite` -- `boolean` -- Whether to overwrite any existing filepaths during the operation.

- Returns:
  - `Path` - The destination filepath is returned as a Path instance if the operation was successful.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_A\\File_A1.txt");
const destination = fp.moveSync(fp.parent().parent().join("Folder_B", "File_A1_Moved.txt"));
console.log(destination.path);
console.log(destination.existsSync());

> C:/Users/JohnDoe/Example/Folder_B/File_A1_Moved.txt
> true
```

### copy(dst [, options]) <a name = "#copy"></a>

**Asynchronously** moves the underlying filepath or its children to the indicated destination, creating directories as necessary.

- Parameters:

  - `dst` -- `string | Path` -- The filepath destination. Note that if the filepath being moved is a file, it itself will be copied. If, instead the filepath is a folder, then its contents will be copied to the indicated destination.
  - `options` -- `node-fs-extra.CopyOptions` -- An object with the following properties carried over from the [node-fs-extra](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md) library:
    - `overwrite` -- `boolean` -- overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
    - `errorOnExist` -- `boolean` -- when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
    - `dereference` -- `boolean` -- dereference symlinks, default is `false`.
    - `preserveTimestamps` -- `boolean` -- When true, will set last modification and access times to the ones of the original source files. When false, timestamp behavior is OS-dependent. Default is `false`.

- Returns:
  - `Path` - The destination filepath is returned as a Path instance if the operation was successful.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_A\\File_A1.txt");
  const destination = await fp.copy(fp.parent().parent().join("Folder_B", "File_A1_Copied.txt"));
  console.log(destination.path);
  console.log(await destination.exists());
};
ES5CompatibilityWrapper();

> C:/Users/JohnDoe/Example/Folder_B/File_A1_Copied.txt
> true
```

### copySync(dst [, options]) <a name = "#copySync"></a>

**Synchronously** moves the underlying filepath or its children to the indicated destination, creating directories as necessary.

- Parameters:

  - `dst` -- `string | Path` -- The filepath destination. Note that if the filepath being moved is a file, it itself will be copied. If, instead the filepath is a folder, then its contents will be copied to the indicated destination.
  - `options` -- `node-fs-extra.CopyOptions` -- An object with the following properties carried over from the [node-fs-extra](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md) library:
    - `overwrite` -- `boolean` -- overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
    - `errorOnExist` -- `boolean` -- when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
    - `dereference` -- `boolean` -- dereference symlinks, default is `false`.
    - `preserveTimestamps` -- `boolean` -- When true, will set last modification and access times to the ones of the original source files. When false, timestamp behavior is OS-dependent. Default is `false`.

- Returns:
  - `Path` - The destination filepath is returned as a Path instance if the operation was successful.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_A\\File_A1.txt");
const destination = fp.copySync(fp.parent().parent().join("Folder_B", "File_A1_Copied.txt"));
console.log(destination.path);
console.log(destination.existsSync());

> C:/Users/JohnDoe/Example/Folder_B/File_A1_Copied.txt
> true
```

### remove() <a name = "#remove"></a>

**Asynchronously** deletes the underlying filepath and its children.

**Alias methods that perform identically**: `unlink()` and `delete()`

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_A\\File_A1.txt");
  console.log(await fp.exists());
  await fp.remove()
  console.log(await fp.exists());
};
ES5CompatibilityWrapper();

> true
> false
```

### removeSync() <a name = "#removeSync"></a>

**Synchronously** deletes the underlying filepath and its children.

**Alias methods that perform identically**: `unlinkSync()` and `deleteSync()`

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_A\\File_A1.txt");
console.log(fp.existsSync());
fp.removeSync()
console.log(fp.existsSync());

> true
> false
```
