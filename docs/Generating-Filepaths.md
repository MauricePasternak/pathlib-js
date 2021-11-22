# Generating Filepaths

## Associated Path Methods

- <a href = "#makeDir">makeDir()</a>
- <a href = "#makeDirSync">makeDirSync()</a>
- <a href = "#makeFile">makeFile()</a>
- <a href = "#makeFileSync">makeFileSync()</a>
- <a href = "#makeSymlink">makeSymlink()</a>
- <a href = "#makeSymlinkSync">makeSymlinkSync()</a>

## File Structure Example for this API

The following hypothetical folder structure will be used as a demonstration of the API.

```
Example
├── Folder_A
└── Folder_B
```

### makeDir([mode]) <a id = "makeDir"></a>

Asynchronously forces the underlying filepath to be made as a directory, making parent directories as appropriate.

- Parameters:

  - `mode` -- `string | number` -- Either a number indicating the new permissions to impart (i.e. 0o511) or one the node strings dictating permissions. Defaults to 0o666.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_C");
  console.log(await fp.exists());
  await fp.makeDir();
  console.log(await fp.exists());
};
ES5CompatibilityWrapper();

> false
> true

```

### makeDirSync([mode]) <a id = "makeDirSync"></a>

Synchronously forces the underlying filepath to be made as a directory, making parent directories as appropriate.

- Parameters:

  - `mode` -- `string | number` -- Either a number indicating the new permissions to impart (i.e. 0o511) or one the node strings dictating permissions. Defaults to 0o666.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_C");
console.log(fp.existsSync());
fp.makeDirSync();
console.log(fp.existsSync());

> false
> true

```

### makeFile([mode]) <a id = "makeFile"></a>

Asynchronously forces the underlying filepath to be made as a file, making parent directories as appropriate.

- Parameters:

  - `mode` -- `string | number` -- Either a number indicating the new permissions to impart (i.e. 0o511) or one the node strings dictating permissions. Defaults to 0o666.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_C\\File_C1.txt");
  console.log(await fp.exists());
  await fp.makeFile();
  console.log(await fp.exists());
};
ES5CompatibilityWrapper();

> false
> true

```

### makeFileSync([mode]) <a id = "makeFileSync"></a>

Synchronously forces the underlying filepath to be made as a file, making parent directories as appropriate.

- Parameters:

  - `mode` -- `string | number` -- Either a number indicating the new permissions to impart (i.e. 0o511) or one the node strings dictating permissions. Defaults to 0o666.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_C");
console.log(fp.existsSync());
fp.makeFileSync();
console.log(fp.existsSync());

> false
> true

```

### makeSymlink(target [, options]) <a id = "makeSymlink"></a>

**Asynchronously** creates a Symlink at the indicated destination, linking to the underlying filepath.

⚠️ On Windows, programs using this script must be run with Administrator priveleges, as NodeJS will throw an error otherwise. ⚠️

- Parameters:

  - `target` -- `string | Path` -- Depending on the value of `options.targetIsLink`, this can be one of two things:
    - If `targetIsLink` is `true` **(default)**, then this should be the path of the created symlink which will point to the underlying filepath of the `Path` instance using this method. The underlying filepath is assumed to already exist, and will throw an Error if this is not the case.
    - If `targetIsLink` is `false`, then the underlying filepath of the `Path` instance using this method is interpreted as the symlink and `target` is an existing filepath it will symlink to.
  - `options` -- `Object` -- An object with the following properties:
    - `targetIsLink` -- `boolean` -- Whether the filepath indicated in `target` is the symlink to be made. Defaults to `true`.
    - `type` -- `"dir" | "file" | undefined` -- Only relevant on Windows. The type of symlink to make. If left `undefined` **(default)**, the method will attempt to infer the type based on the filepath being linked to.
    - `interpRelativeSource` -- `"cwd" | "path"` -- The interpretation to take when a relative path is provided:
      - If `"cwd"` **(default)**, relative filepaths will be resolved according to the current working directory of the process calling this method.
      - If `"path`", relative filepaths will be resolved according to the underlying filepath calling this method.

- Returns:
  - `Path` - The filepath specified in `target` as a Path instance.

### makeSymlinkSync(target [, options]) <a id = "makeSymlinkSync"></a>

**Synchronously** creates a Symlink at the indicated destination, linking to the underlying filepath.

⚠️ On Windows, programs using this script must be run with Administrator priveleges, as NodeJS will throw an error otherwise. ⚠️

- Parameters:

  - `target` -- `string | Path` -- Depending on the value of `options.targetIsLink`, this can be one of two things:
    - If `targetIsLink` is `true` **(default)**, then this should be the path of the created symlink which will point to the underlying filepath of the `Path` instance using this method. The underlying filepath is assumed to already exist, and will throw an Error if this is not the case.
    - If `targetIsLink` is `false`, then the underlying filepath of the `Path` instance using this method is interpreted as the symlink and `target` is an existing filepath it will symlink to.
  - `options` -- `Object` -- An object with the following properties:
    - `targetIsLink` -- `boolean` -- Whether the filepath indicated in `target` is the symlink to be made. Defaults to `true`.
    - `type` -- `"dir" | "file" | undefined` -- Only relevant on Windows. The type of symlink to make. If left `undefined` **(default)**, the method will attempt to infer the type based on the filepath being linked to.
    - `interpRelativeSource` -- `"cwd" | "path"` -- The interpretation to take when a relative path is provided:
      - If `"cwd"` **(default)**, relative filepaths will be resolved according to the current working directory of the process calling this method.
      - If `"path`", relative filepaths will be resolved according to the underlying filepath calling this method.

- Returns:
  - `Path` - The filepath specified in `target` as a Path instance.
