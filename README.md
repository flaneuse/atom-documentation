# atom-documentation

## Description
A structured way to speed up code documentation. Mostly, a way to add in common elements that I use all the time, and to ensure that they adhere to a reasonable structure to provide metadata about a file / function.
---
Based loosely on R's structure for adding [package metadata](http://r-pkgs.had.co.nz/description.html) and the [Roxygen2 package](https://cran.r-project.org/web/packages/roxygen2/index.html) for [documenting individual functions](http://r-pkgs.had.co.nz/man.html).

## Installation
TBD; if interested, email lhughes@scripps.edu and I'll publish it via [Atom](http://flight-manual.atom.io/hacking-atom/sections/publishing/)

## What's inside
NOTE: all of these are intended to be commented out within your code. For instance, if set in options, a `#` python-esque comment character is inserted into the start of the inserted text. (see "Optional parameters")

### Add file documentation
`Cmd-shift-X`
 Meant to be a top, high-level summary of metadata on the current file. Inserts into text editor:

```
@name:        <name of file, automatically generated>
@summary:     *insert short description of the purpose of the file*
@description: *insert longer description/notes on file*
@sources:     *insert any sources/references of note*
@depends:     *insert any dependencies for the files*
@author:      <your name, pulled from the settings for the package>
@email:       <your email, pulled from the settings for the package>
@license:     <license; MIT by default>
@date:        <current date>
```

### Add function documentation
`Cmd-shift-E`
 Meant to be a summary for documenting individual functions. Inserts into text editor:

```
<<< *insert function name + arguments* >>>
@name:        *insert function name*
@summary:     *insert short description of function*
@description: *insert longer description/notes on function*
@inputs:      *insert input variables + description of their use*
@outputs:     *insert output variables + description of their contents. What function returns*
@examples:    *provide short tester examples to elucidate the use of the function*
```

### Add section header
`Cmd-shift-R`
Inserts a break to organize sections
`[]  ----------------------------------------------------------------------------------------------------`

### Add minisection header
`Cmd-option-R`
Inserts a break to organize sections
`--- *insert text* ---`

## Optional parameters:
**Author Name**: your name, for adding file documentation

**Author Email**: your email, for adding file documentation

**License**: software license. By default, MIT

**comment syntax**: an optional set of strings to append to *every* line of text inserted. For instance, `#` for python or `//` for javascript. Empty by default, to enable use of Atom's native language-specific commenting shortcut (`Cmd-/`)
