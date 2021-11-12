# Filepath Status, Types, Existence, etc.

## Associated Path Methods

- [exists()](#exists)
- [existsSync()](#existsSync)
- [isDirectory()](#isDirectory)
- [isDirectorySync()](#isDirectorySync)
- [isFile()](#isFile)
- [isFileSync()](#isFileSync)
- [isSymbolicLink()](#isSymbolicLink)
- [isSymbolicLinkSync()](#isSymbolicLinkSync)
- [isSocket()](#isSocket)
- [isSocketSync()](#isSocketSync)
- [isFIFO()](#isFIFO)
- [isFIFOSync()](#isFIFOSync)
- [parent()](#parent)
- [containsImmediateChild()](#containsImmediateChild)
- [containsImmediateChildSync()](#containsImmediateChildSync)

## File Structure Example for this API

The following hypothetical folder structure will be used as a demonstration of the API.

```
Example
├── Folder_A
│   ├── File_A1.txt
│   ├── File_A2.txt
│   └── File_B1_Symlink -> c:/Users/Maurice/Example/Folder_B/File_B1.json
└── Folder_B
    ├── File_B1.json
    └── File_B2.json
```

### exists() <a name = "#exists"></a>

**Asynchronously** returns a boolean of whether the underlying filepath exists.

- Returns:
  - `Promise<Boolean>` - true or false outcome of whether the filepath exists in the system.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp1 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File_A1.txt");
  const fp2 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File9001.txt");
  console.log(await fp1.exists());
  console.log(await fp2.exists());
};

ES5CompatibilityWrapper();

> true
> false
```

### existsSync() <a name = "#existsSync"></a>

**Synchronously** returns a boolean of whether the underlying filepath exists.

- Returns:
  - `Boolean` - true or false outcome of whether the filepath exists in the system.

```
import Path from "pathlib-js"
const fp1 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File_A1.txt");
const fp2 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File9001.txt");
console.log(fp1.existsSync());
console.log(fp2.existsSync());

> true
> false
```

### isDirectory() <a name = "#isDirectory"></a>

**Asynchronously** returns a boolean of whether the underlying filepath is a directory()

- Returns:
  - `Promise<Boolean>` - true or false outcome of whether the filepath is an existing directory.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp1 = new Path("C:\\Users\\Maurice\\Example\\FolderA");
  const fp2 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File_A1.txt");
  console.log(await fp1.isDirectory());
  console.log(await fp2.isDirectory());
};

ES5CompatibilityWrapper();

> true
> false
```

### isDirectorySync() <a name = "#isDirectorySync"></a>

**Synchronously** returns a boolean of whether the underlying filepath exists.

- Returns:
  - `Boolean` - true or false outcome of whether the filepath is an existing directory.

```
import Path from "pathlib-js"
const fp1 = new Path("C:\\Users\\Maurice\\Example\\FolderA");
const fp2 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File_A1.txt");
console.log(fp1.isDirectorySync());
console.log(fp2.isDirectorySync());

> true
> false
```

### isFile() <a name = "#isFile"></a>

**Asynchronously** returns a boolean of whether the underlying filepath isFile.

- Returns:
  - `Promise<Boolean>` - true or false outcome of whether the filepath is an existing file.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp1 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File_A1.txt");
  const fp2 = new Path("C:\\Users\\Maurice\\Example\\FolderA");
  console.log(await fp1.isFile());
  console.log(await fp2.isFile());
};

ES5CompatibilityWrapper();

> true
> false
```

### isFileSync() <a name = "#isFileSync"></a>

**Synchronously** returns a boolean of whether the underlying filepath is a file.

- Returns:
  - `Boolean` - true or false outcome of whether the filepath is an existing file.

```
import Path from "pathlib-js"
const fp1 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File_A1.txt");
const fp2 = new Path("C:\\Users\\Maurice\\Example\\FolderA");
console.log(fp1.isFileSync());
console.log(fp2.isFileSync());

> true
> false
```

### isSymbolicLink([verbose]) <a name = "#isSymbolicLink"></a>

⚠️ **IT IS STRONGLY ADVISED TO NOT USE THIS METHOD ON WINDOWS OS.** ⚠️

**Asynchronously** returns a boolean of whether the underlying filepath is a symlink.

- Parameters:

  - `verbose` -- `boolean` -- On Windows systems, whether to verbosly warn about the potential inaccuracy of this method. Defaults to true.

- Returns:
  - `Promise<Boolean>` - true or false outcome of whether the filepath is a symbolic link.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp1 = new Path("C:\\Users\\Maurice\\Example\\FolderB\\File_B1.json");
  const fp2 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File_B1_Symlink.symlink");
  console.log(await fp1.isSymbolicLink());
  console.log(await fp2.isSymbolicLink());
};

ES5CompatibilityWrapper();

> true
> false
```

### isSymbolicLinkSync([verbose]) <a name = "#isSymbolicLinkSync"></a>

⚠️ **IT IS STRONGLY ADVISED TO NOT USE THIS METHOD ON WINDOWS OS.** ⚠️

**Synchronously** returns a boolean of whether the underlying filepath is a symlink.

- Parameters:

  - `verbose` -- `boolean` -- On Windows systems, whether to verbosly warn about the potential inaccuracy of this method. Defaults to true.

- Returns:
  - `Boolean` - true or false outcome of whether the filepath is a symbolic link.

```
import Path from "pathlib-js"
const fp1 = new Path("C:\\Users\\Maurice\\Example\\FolderB\\File_B1.json");
const fp2 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File_B1_Symlink.symlink");
console.log(fp1.isSymbolicLinkSync());
console.log(fp2.isSymbolicLinkSync());

> true
> false
```

### isSocket() <a name = "#isSocket"></a>

**Asynchronously** returns a boolean of whether the underlying filepath points to a socket.

- Returns:
  - `Promise<Boolean>` - true or false outcome of whether the filepath is a socket file.

### isSocketSync() <a name = "#isSocketSync"></a>

**Synchronously** returns a boolean of whether the underlying filepath points to a socket.

- Returns:
  - `Boolean` - true or false outcome of whether the filepath is a socket file.

### isFIFO() <a name = "#isFIFO"></a>

**Asynchronously** returns a boolean of whether the underlying filepath points to a first-in-first-out queue.

- Returns:
  - `Promise<Boolean>` - true or false outcome of whether the filepath is a FIFO queue.

### isFIFOSync() <a name = "#isFIFOSync"></a>

**Synchronously** returns a boolean of whether the underlying filepath points to a first-in-first-out queue.

- Returns:
  - `Boolean` - true or false outcome of whether the filepath is a FIFO queue.

### parent() <a name = "#parent"></a>

Retrieves the parent directory.

- Returns:
  - `Path` - The parent directory as a Path instance.

```
import Path from "pathlib-js"
const fp1 = new Path("C:\\Users\\Maurice\\Example\\FolderA\\File_A1.txt");
console.log(fp1.parent().path);

> "C:/Users/Maurice/Example/FolderA"
```

### containsImmediateChild(child) <a name = "#containsImmediateChild"></a>

**Asynchronously** checks whether an indicated basename string or Path instance is a child path of the current Path instance.

- Parameters:

  - `child` -- `string | Path` -- Either a basename to search (when type is detected as a string) or a Path instance of the expected child.

- Returns:
  - `Promise<Path | false>` - Returns `false` if no such child exists within the underlying filepath, otherwise returns the child as a `Path` instance.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp1 = new Path("C:\\Users\\Maurice\\Example\\Folder_A");
  console.log(await fp1.containsImmediateChild("File_90012321.txt"));
  console.log(await fp1.containsImmediateChild("File_A1.txt"));
};
ES5CompatibilityWrapper();

> false
> Path {
  path: 'C:/Users/Maurice/Example/Folder_A/File_A1.txt',
  root: 'C:/',
  basename: 'File_A1.txt',
  dirname: 'C:/Users/Maurice/Example/Folder_A',
  stem: 'File_A1',
  ext: '.txt',
  suffixes: [ 'txt' ]
}
```

### containsImmediateChildSync(child) <a name = "#containsImmediateChildSync"></a>

**Synchronously** checks whether an immediate child can be found within the path.

- Parameters:

  - `child` -- `string | Path` -- Either a basename to search (when type is detected as a string) or a Path instance of the expected child.

- Returns:
  - `Path | false` - Returns `false` if no such child exists within the underlying filepath, otherwise returns the child as a `Path` instance.

```
import Path from "pathlib-js"
const fp1 = new Path("C:\\Users\\Maurice\\Example\\Folder_A");
console.log(fp1.containsImmediateChildSync("File_90012321.txt"));
console.log(fp1.containsImmediateChildSync("File_A1.txt"));

> false
> Path {
  path: 'C:/Users/Maurice/Example/Folder_A/File_A1.txt',
  root: 'C:/',
  basename: 'File_A1.txt',
  dirname: 'C:/Users/Maurice/Example/Folder_A',
  stem: 'File_A1',
  ext: '.txt',
  suffixes: [ 'txt' ]
}
```
