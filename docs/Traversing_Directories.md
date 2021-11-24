# Simple Directory Traversing

## Associated Path Methods

- <a href = "#readDir">readDir()</a>
- <a href = "#readDirSync">readDirSync()</a>
- <a href = "#readDirIter">readDirIter()</a>
- <a href = "#readDirIterSync">readDirIterSync()</a>
- <a href = "#getPathsNLevelsAway">getPathsNLevelsAway()</a>

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

### readDir() <a id = "readDir"></a>

**Asynchronously** retrieves a collection of child filepaths.

- Returns:
  - `Promise<Path[]>` - an array of the child filepaths as `Path` instances.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp1 = new Path("C:\\Users\\JohnDoe\\Example");
  console.log(await fp1.readDir());
};

ES5CompatibilityWrapper();

> [
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_A',
    root: 'C:',
    basename: 'Folder_A',
    dirname: 'C:/Users/JohnDoe/Example',
    stem: 'Folder_A',
    ext: '',
    suffixes: []
  },
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_B',
    root: 'C:',
    basename: 'Folder_B',
    dirname: 'C:/Users/JohnDoe/Example',
    stem: 'Folder_B',
    ext: '',
    suffixes: []
  }
]

```

### readDirSync() <a id = "readDirSync"></a>

**Synchronously** retrieves a collection of child filepaths.

- Returns:
  - `Path[]` - an array of the child filepaths as `Path` instances.

```
import Path from "pathlib-js"
const fp1 = new Path("C:\\Users\\JohnDoe\\Example");
console.log(await fp1.readDir());

> [
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_A',
    root: 'C:',
    basename: 'Folder_A',
    dirname: 'C:/Users/JohnDoe/Example',
    stem: 'Folder_A',
    ext: '',
    suffixes: []
  },
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_B',
    root: 'C:',
    basename: 'Folder_B',
    dirname: 'C:/Users/JohnDoe/Example',
    stem: 'Folder_B',
    ext: '',
    suffixes: []
  }
]
```

### readDirIter() <a id = "readDirIter"></a>

**Asynchronously** yields child filepaths found in a directory.

- Yields:
  - `Promise<Path>` - child filepaths from the current file as Path instances

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp1 = new Path("C:\\Users\\JohnDoe\\Example");
  for await (const child of fp1.readDirIter()) {
    console.log(child);
  }
};

ES5CompatibilityWrapper();

> Path {
  path: 'C:/Users/JohnDoe/Example/Folder_A',
  root: 'C:',
  basename: 'Folder_A',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_A',
  ext: '',
  suffixes: []
}

> Path {
  path: 'C:/Users/JohnDoe/Example/Folder_B',
  root: 'C:',
  basename: 'Folder_B',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_B',
  ext: '',
  suffixes: []
}
```

### readDirIterSync() <a id = "readDirIterSync"></a>

**Synchronously** yields child filepaths found in a directory.

- Yields:
  - `Path` - child filepaths from the current file as Path instances

```
const fp1 = new Path("C:\\Users\\JohnDoe\\Example");
for (const child of fp1.readDirIterSync()) {
  console.log(child)
}

> Path {
  path: 'C:/Users/JohnDoe/Example/Folder_A',
  root: 'C:',
  basename: 'Folder_A',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_A',
  ext: '',
  suffixes: []
}

> Path {
  path: 'C:/Users/JohnDoe/Example/Folder_B',
  root: 'C:',
  basename: 'Folder_B',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_B',
  ext: '',
  suffixes: []
}
```

### getPathsNLevelsAway(depth [, asIterator, options]) <a id = "getPathsNLevelsAway"></a>

Allows for asynchronous retrieval of filepaths N directory levels away from the underlying filepath.

- Parameters:

  - `depth` -- `number` -- The number of directory levels from the current filepath that should be looked at. More particularly:
    - If the depth is greater than or equal to 1, then child/grandchild/etc. filepaths will be retrieved.
    - If the depth is equal to 0, then sibling filepaths will be retrieved.
    - If the depth is less than 0, then parent/grandparent/etc. filepaths will be retrieved.
  - `asIterator` -- `boolean` -- If false, then the function returns a Promise that resolves into an Array of `Path` instances. If true, then the function returns a Promise that resolves to an AsyncIterator of Path instances. For this latter case, it is recommended to use the ES5 syntax: `await (const childPath of await instance.getPathsNLevelsAway())`
  - `options` -- `fast-glob.Options` -- The globbing options. For properties and their explanations, [please refer to the documentation in the `fast-glob` repository.](https://github.com/mrmlnc/fast-glob/blob/master/README.md)

- Returns:

  - `Promise<Path[]>` - If `asIterator` is `false`, this function's Promise resolves into an array of `Path` instances.

- Yields:
  - `Promise<Path>` - If `asIterator` is `true`, this function can yield `Path` instances at the indicated `depth`

```
const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example\\Folder_A");
  for await (const childPath of await fp.getPathsNLevelsAway(0, true, { onlyFiles: false })) {
    console.log(childPath);
  }
};

ES5CompatibilityWrapper()

> Path {
  path: 'C:/Users/JohnDoe/Example/Folder_A',
  root: 'C:',
  basename: 'Folder_A',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_A',
  ext: '',
  suffixes: []
}

> Path {
  path: 'C:/Users/JohnDoe/Example/Folder_B',
  root: 'C:',
  basename: 'Folder_B',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_B',
  ext: '',
  suffixes: []
}
```
