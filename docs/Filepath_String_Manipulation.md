# Manipulating Filepath Strings

## Associated Path Methods

- [parts()](#parts)
- [relative()](#relative)
- [resolve()](#resolve)
- [join()](#join)
- [withBasename()](#withBasename)
- [withStem()](#withStem)
- [withSuffix()](#withSuffix)
- [toString()](#toString)
- [toJSON()](#toJSON)

### parts() <a name = "#parts"></a>

Retrieves the underlying filepath's components.

- Returns:
  - `string[]` - Returns a the components of the underlying filepaths as a array of strings.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example.tar.gz");
fp.parts()

> [ 'C:', 'Users', 'JohnDoe', 'Example.tar.gz' ]

```

### relative(to [, useSystemPathDelimiter])

Depicts the relative path from the Path instance to another filepath.

- Parameters:

  - `to` -- `string | Path` -- The filepath that the current underlying one should be compared against.
  - `useSystemPathDelimiter` -- `boolean` -- Whether to have the output string respect system-specific filepath component delimiters (i.e. on Windows "\" separate file components instead of "/".). Defaults to `false`.

- Returns:
  - `string` - Returns a string

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example.tar.gz");
fp.relative("C:\\Users\\JohnDoe\\AnotherExample.json")

> "..\AnotherExample.json"
```

### resolve(...segments)

Resolves a sequence of path segments into a new absolute Path. Respects `..` and will increment directories accordingly. Note that strings beginning with a single `.` will be treated as if the dot character does not exist. Use the "join" method as an alternative for appending file segments that begin with `.` (i.e. `".gitignore"` basename) to the current path.

- Parameters:

  - `segments` -- `string[]` -- An array of strings which are resolved into the new `Path`.

- Returns:
  - `Path` - Returns a new `Path` instance from the appended strings.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example.tar.gz");
fp.resolve("..\\AnotherExample.json").path

//Can use toString(true) to return the OS-specific string instead of the normalized path
> "C:/Users/JohnDoe/AnotherExample.json"
```

### join(...segments)

Appends strings to the end of the underlying filepath, creating a new Path instance. Note that `..` and `.` are treated literally and will not be resolved. For appending file segments with resolving behavior use the `resolve` method.

- Parameters:

  - `segments` -- `string[]` -- An array of strings which are appended onto the underlying filepath.

- Returns:
  - `Path` - Returns a new `Path` instance from the resolved strings.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example.tar.gz");
fp.join("..\\AnotherExample.json").path

> "C:/Users/JohnDoe/../AnotherExample.json"
```

### withBasename(name)

Creates a new Path instance with a replaced basename.

- Parameters:

  - `name` -- `string` -- A string that will become the basename in the new `Path` instance.

- Returns:
  - `Path` - A `Path` instance with the new basename.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example.tar.gz");
fp.withBasename("IHeartOOP.json").path

> "C:/Users/JohnDoe/IHeartOOP.json"
```

### withStem(stem)

Creates a new Path instance with a replaced stem.

- Parameters:

  - `stem` -- `string` -- A string that will become the stem in the new `Path` instance.

- Returns:
  - `Path` - A `Path` instance with the new stem.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example.tar.gz");
fp.withStem("ANewStem").path

> "C:/Users/JohnDoe/ANewStem.tar.gz"
```

### withSuffix(suffix)

Creates a new Path instance with a replaced extension/suffix.

- Parameters:

  - `suffix` -- `string | string[]` -- Either a string representing the new suffix or an array of strings that are to be joined by a dot to form a new filepath suffix/extension.

- Returns:
  - `Path` - A `Path` instance with the new suffix.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example.tar.gz");
fp.withSuffix("json").path

> "C:/Users/JohnDoe/Example.json"
```

### toString([useSystemPathDelimiter])

Returns a string representation of the underlying filepath.

- Parameters:

  - `useSystemPathDelimiter` -- `boolean` -- Whether to have the output string respect system-specific filepath component delimiters (i.e. on Windows "\" separate file components instead of "/".). Defaults to `false`.

- Returns:

  - `string` - The underlying filepath as a string representation.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example.tar.gz");
fp.path

> "C:/Users/JohnDoe/Example.tar.gz"

fp.toString(true)

> "C:\\Users\\JohnDoe\\Example.tar.gz"
```

### toJSON([useSystemPathDelimiter])

Returns a JSON-compatible object representing the Path instance and its properties.

- Parameters:

  - `useSystemPathDelimiter` -- `boolean` -- Whether to have the output string respect system-specific filepath component delimiters (i.e. on Windows "\" separate file components instead of "/".). Defaults to `false`.

- Returns:

  - `Object` - An Object whose properties match that of the `Path` class.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\JohnDoe\\Example.tar.gz");
fp.toJSON(true)


> {
  path: 'C:\\Users\\JohnDoe\\Example.tar.gz',
  root: 'C:\\',
  basename: 'Example.tar.gz',
  stem: 'Example.tar',
  ext: '.gz',
  suffixes: [ 'tar', 'gz' ]
}
```
