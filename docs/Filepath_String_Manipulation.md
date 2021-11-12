# Manipulating Filepath Strings

## Associated Path Methods

- [parts()](#parts)
- [relative(to)](#relative)
- [resolve(...segments)](#resolve)
- [join(...segments)](#join)
- [withBasename(name)](#withBasename)
- [withStem(stem)](#withStem)
- [withSuffix(suffix)](#withSuffix)
- [toString(useSystemPathDelimiter)](#toString)
- [toJSON(useSystemPathDelimiter)](#toJSON)

### parts() <a name = "#parts"></a>

Retrieves the underlying filepath's components as a array of strings.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\mpasternak\\Example.tar.gz");
fp.parts()

> [ 'C:', 'Users', 'mpasternak', 'Example.tar.gz' ]

```

### relative(to [, useSystemPathDelimiter])

Depicts the relative path from the Path instance to another filepath.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\mpasternak\\Example.tar.gz");
fp.relative("C:\\Users\\mpasternak\\AnotherExample.json")

> "..\AnotherExample.json"
```

### resolve(...segments)

Resolves a sequence of path segments into a new absolute Path. Respects `..` and will increment directories accordingly. Note that strings beginning with a single `.` will be treated as if the dot character does not exist. Use the "join" method as an alternative for appending file segments that begin with `.` (i.e. `".gitignore"` basename) to the current path.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\mpasternak\\Example.tar.gz");
fp.resolve("..\\AnotherExample.json").path

//Can use toString(true) to return the OS-specific string instead of the normalized path
> "C:/Users/mpasternak/AnotherExample.json"
```

### join(...segments)

Appends strings to the end of the underlying filepath, creating a new Path instance. Note that `..` and `.` are treated literally and will not be resolved. For appending file segments with resolving behavior use the `resolve` method.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\mpasternak\\Example.tar.gz");
fp.join("..\\AnotherExample.json").path

> "C:/Users/mpasternak/../AnotherExample.json"
```

### withBasename(name)

Creates a new Path instance with a replaced basename.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\mpasternak\\Example.tar.gz");
fp.withBasename("IHeartOOP.json").path

> "C:/Users/mpasternak/IHeartOOP.json"
```

### withStem(stem)

Creates a new Path instance with a replaced stem.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\mpasternak\\Example.tar.gz");
fp.withStem("ANewStem").path

> "C:/Users/mpasternak/ANewStem.tar.gz"
```

### withSuffix(suffix)

Creates a new Path instance with a replaced extension/suffix.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\mpasternak\\Example.tar.gz");
fp.withSuffix("json").path

> "C:/Users/mpasternak/Example.json"
```

### toString([useSystemPathDelimiter])

Returns a string representation of the underlying filepath.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\mpasternak\\Example.tar.gz");
fp.path

> "C:/Users/mpasternak/Example.tar.gz"

fp.toString(true)

> "C:\\Users\\mpasternak\\Example.tar.gz"
```

### toJSON([useSystemPathDelimiter])

Returns a JSON-compatible object representing the Path instance and its properties.

```
import Path from "pathlib-js"
const fp = new Path("C:\\Users\\mpasternak\\Example.tar.gz");
fp.toJSON(true)


> {
  path: 'C:\\Users\\mpasternak\\Example.tar.gz',
  root: 'C:\\',
  basename: 'Example.tar.gz',
  stem: 'Example.tar',
  ext: '.gz',
  suffixes: [ 'tar', 'gz' ]
}
```
