# Simple Directory Traversing

## Associated Path Methods

- [readDir()](#readDir)
- [readDirSync()](#readDirSync)
- [readDirIter()](#readDirIter)
- [readDirIterSync()](#readDirIterSync)

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

### readDir() <a name = "#readDir"></a>

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
    root: 'C:/',
    basename: 'Folder_A',
    dirname: 'C:/Users/JohnDoe/Example',
    stem: 'Folder_A',
    ext: '',
    suffixes: []
  },
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_B',
    root: 'C:/',
    basename: 'Folder_B',
    dirname: 'C:/Users/JohnDoe/Example',
    stem: 'Folder_B',
    ext: '',
    suffixes: []
  }
]

```

### readDirSync() <a name = "#readDirSync"></a>

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
    root: 'C:/',
    basename: 'Folder_A',
    dirname: 'C:/Users/JohnDoe/Example',
    stem: 'Folder_A',
    ext: '',
    suffixes: []
  },
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_B',
    root: 'C:/',
    basename: 'Folder_B',
    dirname: 'C:/Users/JohnDoe/Example',
    stem: 'Folder_B',
    ext: '',
    suffixes: []
  }
]
```

### readDirIter() <a name = "#readDirIter"></a>

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
  root: 'C:/',
  basename: 'Folder_A',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_A',
  ext: '',
  suffixes: []
}

> Path {
  path: 'C:/Users/JohnDoe/Example/Folder_B',
  root: 'C:/',
  basename: 'Folder_B',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_B',
  ext: '',
  suffixes: []
}
```

### readDirIterSync() <a name = "#readDirIterSync"></a>

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
  root: 'C:/',
  basename: 'Folder_A',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_A',
  ext: '',
  suffixes: []
}

> Path {
  path: 'C:/Users/JohnDoe/Example/Folder_B',
  root: 'C:/',
  basename: 'Folder_B',
  dirname: 'C:/Users/JohnDoe/Example',
  stem: 'Folder_B',
  ext: '',
  suffixes: []
}
```
