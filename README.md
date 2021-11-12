<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/ye7jjsX.jpg" alt="Project logo"></a>
</p>

<h3 align="center">pathlib-js</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/MauricePasternak/pathlib-js.svg)](https://github.com/MauricePasternak/pathlib-js/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Object-oriented Filepath Operations in Javascript & Typescript
    <br> 
</p>

## 📝 Table of Contents

- [Why pathlib-js](#about)
- [Usage & API Links](#usage)
- [The Wonderful Libraries that this wraps around](#wrappers)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🤔 Why pathlib-js? <a name = "about"></a>

If you're coming from Python, think of it this way: this library is to NodeJS's `fs` and `path` modules as Python's `pathlib` is to its own `os` module.

Avoids the hassle of string preprocessing, filepath normalization, and passing filepaths between the multitude of functions found in nodeJS `filesystem` and `path` modules.

A single class `Path` wraps around an filepath and presents an API for accessing its components, globbing, watching, reading, writing, traversing a tree structure, etc.

This is not the first package to take an OOP approach to filepaths in Javascript, but hopes to be more feature-rich than others from 5-6 years ago.

### Prerequisites

NodeJS v12 or greater

### Installing

You know the drill

```
npm i pathlib-js
```

or

```
yarn add pathlib-js
```

## 🛠️ Usage & API Links <a name="usage"></a>

### Understanding parts of a Path
`Path` instances carry properties that tie in with the typically-used components of a filepath.

For example, if a particular Path instance was located in a variable `example` and you wished to retrieve the basename of the underlying filepath, you can simply access it by `example.basename`.

<p align="center">
  <a href="" rel="noopener">
 <img width=90% src="https://i.imgur.com/6hcgFk9.png" alt="File Components of a Unix system"></a>
</p>
<p align="center">
  <a href="" rel="noopener">
 <img width=90% src="https://i.imgur.com/jqkqq8L.png" alt="File Components of a Windows system"></a>
</p>

### Defining a path

Paths can be defined from a single string or multiple strings which are resolved into a single path.

```
import Path from "pathlib-js"
const fp1 = new Path("/home/Documents/Yougetthepoint.json");
const fp2 = new Path("/", "home/watch_this_disappear", "../Documents/Yougetthepoint.json");
console.log(fp1.path === fp2.path);

> true
```

### More concrete usages & API

- [Manipulating filepath strings](https://github.com/MauricePasternak/pathlib-js/blob/master/docs/Filepath_String_Manipulation.md)
- [Determinine filepath type, stats, existence.](https://github.com/MauricePasternak/pathlib-js/blob/master/docs/Filepath_Integrity-Stats-Type.md)
- [File Structure Traversal - Individual Directories](https://github.com/MauricePasternak/pathlib-js/blob/master/docs/Traversing_Directories.md)
- [File Structure Traversal - Tree Structures](https://github.com/MauricePasternak/pathlib-js/blob/master/docs/Traversing_Trees.md)
- [Copying, moving, deleting, and changing permissions](https://github.com/MauricePasternak/pathlib-js/blob/master/docs/Copy-Move-Delete-Chmod.md)
- [Filepath Creation - Directories, Files, and Symlinks](https://github.com/MauricePasternak/pathlib-js/blob/master/docs/Generating-Filepaths.md)
- [Reading, Writing, Globbing, and Watching](https://github.com/MauricePasternak/pathlib-js/blob/master/docs/Read-Write-Glob-Watch.md)

## 🥇 The Wonderful Libraries that this wraps around <a name = "wrappers"></a>

This wouldn't be possible without these awesome libraries. Give them a star.

- [node-fs-extra](https://github.com/jprichardson/node-fs-extra) - Enhanced filesystem operations.
- [chokidar](https://github.com/paulmillr/chokidar) - Robust and efficient filesystem watching.
- [fast-glob](https://github.com/mrmlnc/fast-glob) - Robust and fast globbing potential.
- [path-normalize](https://nodejs.org/en/) - Workhorse function for robustly normalizing filepaths

## ✍️ Authors <a name = "authors"></a>

- [@MauricePasternak](https://github.com/MauricePasternak)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

A thank you to the individuals who actually read README file from start to finish.
