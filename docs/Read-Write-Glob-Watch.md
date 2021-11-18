# Reading, Writing, Globbing, and Watching

## Associated Path Methods

- <a href = "#open">open()</a>
- <a href = "#openSync">openSync()</a>
- <a href = "#read">read()</a>
- <a href = "#readSync">readSync()</a>
- <a href = "#write">write()</a>
- <a href = "#writeSync">writeSync()</a>
- <a href = "#readFile">readFile()</a>
- <a href = "#readFileSync">readFileSync()</a>
- <a href = "#writeFile">writeFile()</a>
- <a href = "#writeFileSync">writeFileSync()</a>
- <a href = "#readJSON">readJSON()</a>
- <a href = "#readJSONSync">readJSONSync()</a>
- <a href = "#writeJSON">writeJSON()</a>
- <a href = "#writeJSONSync">writeJSONSync()</a>
- <a href = "#glob">glob()</a>
- <a href = "#globIter">globIter()</a>
- <a href = "#globSync">globSync()</a>
- <a href = "#watch">watch()</a>

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

### open(openOptions) <a id = "open"></a>

**Asynchronously** opens the underlying filepath with the indicated flags and permissions.

- Parameters:

  - `openOptions` -- `Object` -- An object with the following properties:
    - `ensureExists` -- Whether to force the file to exist, creating parent directories as needed.
    - `flags` -- The open mode in which the file should be opened (i.e. "r" for read, "r+" for read & write)
    - `mode` -- The permissions which should be set to the file during the operation.

- Returns:
  - `Promise<number>` - A number representing the file descriptor of the opened file.

### openSync(openOptions) <a id = "openSync"></a>

**Asynchronously** opens the underlying filepath with the indicated flags and permissions.

- Parameters:

  - `openOptions` -- `Object` -- An object with the following properties:
    - `ensureExists` -- Whether to force the file to exist, creating parent directories as needed.
    - `flags` -- The open mode in which the file should be opened (i.e. "r" for read, "r+" for read & write)
    - `mode` -- The permissions which should be set to the file during the operation.

- Returns:
  - `number` - A number representing the file descriptor of the opened file.

### read(buffer, offset, length, position [, openOptions]) <a id = "read"></a>

**Asynchronously** reads the contents of the underlying filepath into a given Buffer.

- Parameters:

  - `buffer` -- `NodeJS.TypedArray | DataView` -- A buffer or buffer-like container for bytes to be written into using the read content from the file.
  - `offset` -- `number` -- The position in `buffer` to write the data to.
  - `length` -- `number` -- The number of bytes to write into `buffer`.
  - `position` -- `number | null` -- Where to begin reading from in the file.
    - If position is null or -1 , data will be read from the current file position, and the file position will be updated.
    - If position is a positive integer, the file position will be unchanged.
  - `openOptions` -- `Object` -- An object with the following properties:
    - `ensureExists` -- Whether to force the file to exist, creating parent directories as needed.
    - `flags` -- The open mode in which the file should be opened (i.e. "r" for read, "r+" for read & write)
    - `mode` -- The permissions which should be set to the file during the operation.

- Returns:
  - `Promise<Object>` - An Object with two properties:
    - `bytesRead` -- `number` -- The number of bytes which were read from the file.
    - `buffer` -- `NodeJS.TypedArray | DataView` -- The updated `Buffer` with the contents of the file.

### readSync(buffer, offset, length, position [, openOptions]) <a id = "readSync"></a>

**Synchronously** reads the contents of the underlying filepath into a given Buffer.

- Parameters:

  - `buffer` -- `NodeJS.TypedArray | DataView` -- A buffer or buffer-like container for bytes to be written into using the read content from the file.
  - `offset` -- `number` -- The position in `buffer` to write the data to.
  - `length` -- `number` -- The number of bytes to write into `buffer`.
  - `position` -- `number | null` -- Where to begin reading from in the file.
    - If position is null or -1 , data will be read from the current file position, and the file position will be updated.
    - If position is a positive integer, the file position will be unchanged.
  - `openOptions` -- `Object` -- An object with the following properties:
    - `ensureExists` -- Whether to force the file to exist, creating parent directories as needed.
    - `flags` -- The open mode in which the file should be opened (i.e. "r" for read, "r+" for read & write)
    - `mode` -- The permissions which should be set to the file during the operation.

- Returns:
  - `Object` - An Object with two properties:
    - `bytesRead` -- `number` -- The number of bytes which were read from the file.
    - `buffer` -- `NodeJS.TypedArray | DataView` -- The updated `Buffer` with the contents of the file.

### write(buffer [, offset, length, position, openOptions]) <a id = "write"></a>

**Asynchronously** writes from a buffer or buffer-like container into the underlying file.

- Parameters:

  - `buffer` -- `NodeJS.TypedArray | DataView` -- A buffer or buffer-like container for bytes to be written into using the read content from the file.
  - `offset` -- `number` -- The position in `buffer` to write the data to.
  - `length` -- `number` -- The number of bytes to write into `buffer`.
  - `position` -- `number` -- Where to begin writing into the file.
  - `openOptions` -- `Object` -- An object with two properties:
    - `ensureExists` -- Whether to force the file to exist, creating parent directories as needed.
    - `flags` -- The open mode in which the file should be opened (i.e. "w" for write)
    - `mode` -- The permissions which should be set to the file during the operation.

- Returns:
  - `Promise<Object>` - An Object with two properties:
    - `bytesWritten` -- `number` -- The number of bytes which were read from the file.
    - `buffer` -- `NodeJS.TypedArray | DataView` -- The buffer or buffer-like that was written into the file.

### writeSync(buffer [, offset, length, position, openOptions]) <a id = "writeSync"></a>

**Synchronously** writes from a buffer or buffer-like container into the underlying file.

- Parameters:

  - `buffer` -- `NodeJS.TypedArray | DataView` -- A buffer or buffer-like container for bytes to be written into using the read content from the file.
  - `offset` -- `number` -- The position in `buffer` to write the data to.
  - `length` -- `number` -- The number of bytes to write into `buffer`.
  - `position` -- `number` -- Where to begin writing into the file.
  - `openOptions` -- `Object` -- An object with two properties:
    - `ensureExists` -- Whether to force the file to exist, creating parent directories as needed.
    - `flags` -- The open mode in which the file should be opened (i.e. "w" for write)
    - `mode` -- The permissions which should be set to the file during the operation.

- Returns:
  - `Object` - An Object with two properties:
    - `bytesWritten` -- `number` -- The number of bytes which were read from the file.
    - `buffer` -- `NodeJS.TypedArray | DataView` -- The buffer or buffer-like that was written into the file.

### readFile([options]) <a id = "readFile"></a>

**Asynchronously** reads in and parses the contents of the underlying filepath.

- Parameters:

  - `options` -- `string | Object` -- Either a string denoting the encoding to use when parsing file contents or an Object with properties:
    - `encoding` -- `string` -- The encoding to use when parsing file content.
    - `flag` -- `string` -- the mode that the file should be opened in. Defaults to "r".

- Returns:
  - `Buffer | string` - The contents of the file; as a `Buffer` when no encoding is specified.

### readFileSync([options]) <a id = "readFileSync"></a>

**Synchronously** reads in and parses the contents of the underlying filepath.

- Parameters:

  - `options` -- `string | Object` -- Either a string denoting the encoding to use when parsing file contents or an Object with properties:
    - `encoding` -- `string` -- The encoding to use when parsing file content.
    - `flag` -- `string` -- the mode that the file should be opened in. Defaults to "r".

- Returns:
  - `Buffer | string` - The contents of the file; as a `Buffer` when no encoding is specified.

### writeFile(data [, options]) <a id = "writeFile"></a>

**Asynchronously** formats data into a given encoding, if any, and writes it into the underlying filepath.

- Parameters:

  - `data` -- `string | Buffer | Uint8Array` -- data to write into the file.
  - `options` -- `string | Object` -- Either a string denoting the encoding to use when parsing file contents or an Object with properties:
    - `mode` -- `number` -- The permissions of the file to be set.
    - `encoding` -- `string` -- The encoding to use when parsing file content.
    - `flag` -- `string` -- the mode that the file should be opened in. Defaults to "w".

### writeFileSync(data [, options]) <a id = "writeFileSync"></a>

**Synchronously** formats data into a given encoding, if any, and writes it into the underlying filepath.

- Parameters:

  - `data` -- `string | Buffer | Uint8Array` -- data to write into the file.
  - `options` -- `string | Object` -- Either a string denoting the encoding to use when parsing file contents or an Object with properties:
    - `mode` -- `number` -- The permissions of the file to be set.
    - `encoding` -- `string` -- The encoding to use when parsing file content.
    - `flag` -- `string` -- the mode that the file should be opened in. Defaults to "w".

### readJSON([options]) <a id = "readJSON"></a>

**Asynchronously** reads in the underlying JSON file.

- Parameters:

  - `options` -- `string | Object` -- Either a string denoting the encoding to use when parsing file contents or an Object with properties:
    - `throws` -- `boolean` -- Whether to throw an error if the JSON.parse operation fails.
    - `encoding` -- `string` -- The encoding to use when parsing file content.
    - `flag` -- `string` -- the mode that the file should be opened in. Defaults to "r".

- Returns:
  - `JSONObject` - An Object compatible with saving to or from .json files.

### readJSONSync([options]) <a id = "readJSONSync"></a>

**Synchronously** reads in the underlying JSON file.

- Parameters:

  - `options` -- `string | Object` -- Either a string denoting the encoding to use when parsing file contents or an Object with properties:
    - `throws` -- `boolean` -- Whether to throw an error if the JSON.parse operation fails.
    - `encoding` -- `string` -- The encoding to use when parsing file content.
    - `flag` -- `string` -- the mode that the file should be opened in. Defaults to "r".

- Returns:
  - `JSONObject` - An Object compatible with saving to or from .json files.

### writeJSON(data [, options]) <a id = "writeJSON"></a>

**Asynchronously** formats an Object and writes it into the underlying .json file.

- Parameters:

  - `data` -- `JSONObject` -- An Object compatible with being encoded and written into a .json file.
  - `options` -- `node-fs-extra.WriteOptions` -- An Object with properties:
    - `spaces` -- `string | number` - The number of spaces to use as indentation and/or the indentation character to use instead.
    - `EOL` -- `string` -- The end-of-line character to use. Defaults to "\n".
    - `replacer` -- `unknown[] | Function` -- [The JSON replacer function or array.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter)
    - `mode` -- `number` -- The permissions of the file to be set.
    - `encoding` -- `string` -- The encoding to use when parsing file content. Defaults to "utf8".
    - `flag` -- `string` -- the mode that the file should be opened in. Defaults to "w".

### writeJSONSync(data [, options]) <a id = "writeJSONSync"></a>

**Asynchronously** formats an Object and writes it into the underlying .json file.

- Parameters:

  - `data` -- `JSONObject` -- An Object compatible with being encoded and written into a .json file.
  - `options` -- `node-fs-extra.WriteOptions` -- An Object with properties:
    - `spaces` -- `string | number` - The number of spaces to use as indentation and/or the indentation character to use instead.
    - `EOL` -- `string` -- The end-of-line character to use. Defaults to "\n".
    - `replacer` -- `unknown[] | Function` -- [The JSON replacer function or array.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter)
    - `mode` -- `number` -- The permissions of the file to be set.
    - `encoding` -- `string` -- The encoding to use when parsing file content. Defaults to "utf8".
    - `flag` -- `string` -- the mode that the file should be opened in. Defaults to "w".

### glob(patterns [, options]) <a id = "glob"></a>

**Asynchronously** globs for filepaths stemming from the underlying path.

- Parameters:

  - `patterns` -- `string | string[]` -- Glob patterns to match against in locating filepaths that are automatically appended to the underlying filepath.
  - `options` -- `fast-glob.Options` -- The globbing options. For properties and their explanations, [please refer to the documentation in the `fast-glob` repository.](https://github.com/mrmlnc/fast-glob/blob/master/README.md) 
  ⚠️ **NB**: By default, the underlying globbing options has `onlyFiles` set to `true`.

- Returns:
  - `Promise<Path[]>` - An array of retrieved `Path` instances which matched the glob pattern(s).

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example");
  console.log(await fp.glob("**/*.json", { extglob: true }));
};
ES5CompatibilityWrapper();

> [
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_B/File_B1.json',
    root: 'C:/',
    basename: 'File_B1.json',
    dirname: 'C:/Users/JohnDoe/Example/Folder_B',
    stem: 'File_B1',
    ext: '.json',
    suffixes: [ 'json' ]
  },
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_B/File_B2.json',
    root: 'C:/',
    basename: 'File_B2.json',
    dirname: 'C:/Users/JohnDoe/Example/Folder_B',
    stem: 'File_B2',
    ext: '.json',
    suffixes: [ 'json' ]
  }
]
```

### globIter(patterns [, options]) <a id = "globIter"></a>

Allows for asynchronous iteration over a glob query, yielding Path instances of matched directories.

- Parameters:

  - `patterns` -- `string | string[]` -- Glob patterns to match against in locating filepaths that are automatically appended to the underlying filepath.
  - `options` -- `fast-glob.Options` -- The globbing options. For properties and their explanations, [please refer to the documentation in the `fast-glob` repository.](https://github.com/mrmlnc/fast-glob/blob/master/README.md)
    ⚠️ **NB**: By default, the underlying globbing options has `onlyFiles` set to `true`.

- Yields:
  - `Promise<Path>` - Yields Path instances which matched the indicated patterns.

```
import Path from "pathlib-js"
const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example");
  for await (const childPath of fp.globIter("*", { onlyDirectories: true })) {
    console.log(childPath);
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


### globSync(patterns [, options]) <a id = "globSync"></a>

**Synchronously** globs for filepaths stemming from the underlying path.

- Parameters:

  - `patterns` -- `string | string[]` -- Glob patterns to match against in locating filepaths that are automatically appended to the underlying filepath.
  - `options` -- `fast-glob.Options` -- The globbing options. For properties and their explanations, [please refer to the documentation in the `fast-glob` repository.](https://github.com/mrmlnc/fast-glob/blob/master/README.md)
    ⚠️ **NB**: By default, the underlying globbing options has `onlyFiles` set to `true`.

- Returns:
  - `Path[]` - An array of retrieved `Path` instances which matched the glob pattern(s).

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example");
console.log(fp.globSync("**/*.json", { extglob: true }));

> [
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_B/File_B1.json',
    root: 'C:/',
    basename: 'File_B1.json',
    dirname: 'C:/Users/JohnDoe/Example/Folder_B',
    stem: 'File_B1',
    ext: '.json',
    suffixes: [ 'json' ]
  },
  Path {
    path: 'C:/Users/JohnDoe/Example/Folder_B/File_B2.json',
    root: 'C:/',
    basename: 'File_B2.json',
    dirname: 'C:/Users/JohnDoe/Example/Folder_B',
    stem: 'File_B2',
    ext: '.json',
    suffixes: [ 'json' ]
  }
]
```

### watch(data [, options]) <a id = "watch"></a>

**Synchronously** globs for filepaths stemming from the underlying path.

- Parameters:

  - `patterns` -- `string | string[]` -- Glob patterns to match against in locating filepaths that are automatically appended to the underlying filepath.
  - `options` -- `chokidar.WatchOptions` -- The globbing options. For properties and their explanations, [please refer to the documentation in the `chokidar` repository.](https://github.com/paulmillr/chokidar/blob/master/README.md)

- Returns:
  - `Path[]` - An array of retrieved `Path` instances which matched the glob pattern(s).

```
import Path from "pathlib-js"

const ES5CompatibilityWrapper = async () => {
  const fp = new Path("C:\\Users\\JohnDoe\\Example");
  const watcher = fp.watch({ ignoreInitial: true });
  watcher.on("add", p => console.log(`Added filepath ${p}`));
  watcher.on("ready", async () => {
    const file2add = fp.join("Child.json");
    await file2add.makeFile();
    await file2add.withStem("SecondChild").makeFile();
  });
  setTimeout(async () => await watcher.close(), 100);
};
ES5CompatibilityWrapper();

> Added filepath C:\Users\JohnDoe\Example\Child.json
> Added filepath C:\Users\JohnDoe\Example\SecondChild.json
```
