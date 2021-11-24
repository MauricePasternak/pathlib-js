# Path Classmethods

## Associated Path Methods

- <a href = "#pwd">pwd()</a>
- <a href = "#home">home()</a>
- <a href = "#toSystemDelimitedSingleString">toSystemDelimitedSingleString()</a>
- <a href = "#getPATHAsPaths">getPATHAsPaths()</a>
- <a href = "#parseModeIntoOctal">parseModeIntoOctal()</a>

### cwd() <a id = "pwd"></a>

Retrieves the current working directory as a `Path` instance.

**Alias methods that perform identically**: `pwd()`

- Returns:
  - `Path` - The current working directory.

### home() <a id = "home"></a>

Retrieves the home directory as a `Path` instance.

- Returns:
  - `Path` - The home directory.

### toSystemDelimitedSingleString(...paths) <a id = "toSystemDelimitedSingleString"></a>

Concatenates filepaths into a single string meant for being set to operating system variables such as `$PATH`.

- Parameters:

    - `paths` -- `Array<string | Path>` -- A collection of filepath strings and/or `Path` instances which are all normalized and concatenated with the system-specific delimiter (i.e. `;` on Windows and `:` on Unix)

- Returns:
    - `string` - A string of the concatenated paths.


```
import Path from "pathlib-js"

// Example is ran on is Windows, notice the ";" that will delimit strings
const Examples = ["C:/Foo/Bar", "C:/Baz/Qui.txt", new Path("C:\\Qux\\Quuz\\Corge")];
console.log(Path.toSystemDelimitedSingleString(...Examples));

> "C:/Foo/Bar;C:/Baz/Qui.txt;C:/Qux/Quuz/Corge"

```

### getPATHasPaths() <a id = "getPATHasPaths"></a>

Retrieves the collection of filepaths located in the system's `$PATH` variable as a series of `Path` instances.

- Returns:

    - `Path[]` - All the filepaths in `$PATH` as an array of `Path` instances.


### parseModeIntoOctal(mode) <a id = "parseModeIntoOctal"></a>

Converts a number representing the `mode` of a filepath into a more 3-digit "octal-like" representation.

- Parameters:
    - `mode` -- `number` -- The number representing the mode of the filepath

- Returns:
    - `number` - The converted number as a 3-digit representation of the permissions.

```
import Path from "pathlib-js"

// Filepath has read and write permissions for user, group, and other
const fp = new Path(__filename);
const mode = fpa.statSync().mode;
console.log(mode);
console.log(Path.parseModeIntoOctal(mode));


> 33206
> 666
```