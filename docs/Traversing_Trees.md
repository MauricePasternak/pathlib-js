# Nested Directory Traversing

## Associated Path Methods

- [walk()](#walk)
- [walkSync()](#walkSync)
- [tree()](#tree)
- [treeSync()](#treeSync)

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

### walk() <a name = "#walk"></a>

**Asynchronously** walks down the branches of a folder structure, invoking a callback function for each filepath in the structure.

- Parameters:

  - `callback` -- `(p: Path, ...args: unknown[]) => void` -- A callback to invoke for each encountered descendant filepath. The callback must accept its first argument to be a `Path` instance.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp1 = new Path("C:\\Users\\JohnDoe\\Example");
  await fp1.walk((p) => console.log(p.path))
};
ES5CompatibilityWrapper();

> C:/Users/JohnDoe/Example/Folder_A
> C:/Users/JohnDoe/Example/Folder_A/File_A1.txt
> C:/Users/JohnDoe/Example/Folder_A/File_A2.txt
> C:/Users/JohnDoe/Example/Folder_B
> C:/Users/JohnDoe/Example/Folder_B/File_B1.json
> C:/Users/JohnDoe/Example/Folder_B/File_B2.json

```

### walkSync() <a name = "#walkSync"></a>

**Synchronously** walks down the branches of a folder structure, invoking a callback function for each filepath in the structure.

- Parameters:

  - `callback` -- `(p: Path, ...args: unknown[]) => void` -- A callback to invoke for each encountered descendant filepath. The callback must accept its first argument to be a `Path` instance.

```
import Path from "pathlib-js"
const fp1 = new Path("C:\\Users\\JohnDoe\\Example");
fp1.walk(p => console.log(p.path));

> C:/Users/JohnDoe/Example/Folder_A
> C:/Users/JohnDoe/Example/Folder_A/File_A1.txt
> C:/Users/JohnDoe/Example/Folder_A/File_A2.txt
> C:/Users/JohnDoe/Example/Folder_B
> C:/Users/JohnDoe/Example/Folder_B/File_B1.json
> C:/Users/JohnDoe/Example/Folder_B/File_B2.json
```

### tree([asString, useSystemPathDelimiter]) <a name = "#tree"></a>

**Asynchronously** traverses the tree structure of the directory system, starting from the current instances as the root and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object with two properties: `filepath`, which is the Path instance of the filepath at that location, and `children` which is either `null` in the case of a non-directory or an array of more branch objects.

- Parameters:

  - `asString` -- `boolean` -- Whether the `filepath` property should just be a string representation of the Path instance. Defaults to `false`.
  - `useSystemPathDelimiter` -- `boolean` -- if `asString` is `true`, whether the string representation should adhere to the operating system's standard. Defaults to `false`.

- Returns:
  - `Promise<treeBranch>` - A nested Object with the following properties:
    - filepath -- `Path | string` -- A Path instance of the filepath at depth and location or its string representation depending on the value of the `asString` function parameter.
    - depth -- `number` -- An integer representing the number of directories deep from the root directory this branching is found at. 0 refers to the root, 1 refers to the children of the root, etc.
    - children -- `treeBranch | null` -- If `filepath` is a directory, this will be an array of more `treeBranch` objects (or an empty array if it is an empty directory). If `filepath` is a file, this will be `null`.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp1 = new Path("C:\\Users\\JohnDoe\\Example");
  console.log(await fp1.tree());
};
ES5CompatibilityWrapper();

{
  filepath: Path {
    path: 'C:/Users/JohnDoe/Example',
    root: 'C:/',
    basename: 'Example',
    dirname: 'C:/Users/JohnDoe',
    stem: 'Example',
    ext: '',
    suffixes: []
  },
  depth: 0,
  children: [
    { filepath: [Path], depth: 1, children: [Array] },
    { filepath: [Path], depth: 1, children: [Array] }
  ]
}
```

### treeSync([asString, useSystemPathDelimiter]) <a name = "#treeSync"></a>

**Synchronously** traverses the tree structure of the directory system, starting from the current instances as the root and returns a nested Object representation of the tree structure. Each branching of the tree is comprised of an object with two properties: "filepath", which is the Path instance of the filepath at that location, and "children" which is either null in the case of a non-directory or an array of more branch objects.

- Parameters:

  - `asString` -- `boolean` -- Whether the `filepath` property should just be a string representation of the Path instance. Defaults to `false`.
  - `useSystemPathDelimiter` -- `boolean` -- if `asString` is `true`, whether the string representation should adhere to the operating system's standard. Defaults to `false`.

- Returns:
  - `treeBranch` - A nested Object with the following properties:
    - filepath -- `Path | string` -- A Path instance of the filepath at depth and location or its string representation depending on the value of the `asString` function parameter.
    - depth -- `number` -- An integer representing the number of directories deep from the root directory this branching is found at. 0 refers to the root, 1 refers to the children of the root, etc.
    - children -- `treeBranch | null` -- If `filepath` is a directory, this will be an array of more `treeBranch` objects (or an empty array if it is an empty directory). If `filepath` is a file, this will be `null`.

```
import Path from "pathlib-js"
const fp1 = new Path("C:\\Users\\JohnDoe\\Example");
console.log(fp1.treeSync());

{
  filepath: Path {
    path: 'C:/Users/JohnDoe/Example',
    root: 'C:/',
    basename: 'Example',
    dirname: 'C:/Users/JohnDoe',
    stem: 'Example',
    ext: '',
    suffixes: []
  },
  depth: 0,
  children: [
    { filepath: [Path], depth: 1, children: [Array] },
    { filepath: [Path], depth: 1, children: [Array] }
  ]
}
```
