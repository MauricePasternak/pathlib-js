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

### makeSymlink(dst) <a id = "makeSymlink"></a>

**Asynchronously** creates a Symlink at the indicated destination, linking to the underlying filepath.

⚠️ On Windows, programs using this script must be run with Administrator priveleges, as NodeJS will throw an error otherwise. ⚠️

- Parameters:

  - `dst` -- `string | Path` -- The destination to make the symlink at. Must be detected as the same filepath type as the underlying filepath (i.e. if the underlying filepath is a file, the symlink must have extensions).

- Returns:
  - `Path` - The destination filepath is returned as a Path instance if the operation was successful.

### makeSymlink(dst) <a id = "makeSymlinkSync"></a>

**Synchronously** creates a Symlink at the indicated destination, linking to the underlying filepath.

⚠️ On Windows, programs using this script must be run with Administrator priveleges, as NodeJS will throw an error otherwise. ⚠️

- Parameters:

  - `dst` -- `string | Path` -- The destination to make the symlink at. Must be detected as the same filepath type as the underlying filepath (i.e. if the underlying filepath is a file, the symlink must have extensions).

- Returns:
  - `Path` - The destination filepath is returned as a Path instance if the operation was successful.
