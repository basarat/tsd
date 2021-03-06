# TSD 0.5.x CODE

> Technical stuff

:point_right: This info might be outdated.

See also:

* Main [readme](../README.md)
* Some extra [info](INFO.md)
* Things [todo](TODO.md)

## Implementation

Depends heavily on Promise's for async operation (using excellent [kriskowal/q](https://github.com/kriskowal/q) and [kriskowal/q-io](https://github.com/kriskowal/q-io)).
 
### Source

Code in `/src`, also contains the 2 main files to compile to `/build` (`cli` and `api`)

Code modules: (short names, because lazy :)

`/tsd` - all TSD specific code
`/git` - holds Git and Github specific code (not coupled to TSD) 
`/xm` - general utils and helpers (breeding code for `typescript-xm` lib) (not coupled to TSD) 

Main modules in `/tsd`

* `API` end-user module for code-based usage
* `CLI` code exposing `API` as cli commands
* `Core` has the reusable logic

Data structure files in `/tsd/data`

* `DefIndex` is the central model that holds the extracted repository data and is also a factory for the data objects. It will try to maintain only a single instance per identification and re-use/re-issue them. Does *not* perform IO or interaction with the application.
* A single definition is a `Def`: 
* The Git versioned contents of a `Def` is a `DefVersion` (should've been `DevRevision`? beh) 
* A single commit is a `DefCommit`. 
* The other files are support or data objects uses by these main types. 
	* `DefUtils` has many utility helpers.   

## Sub projects

TSD is also a incubator and proving-ground for some of @Bartvds's sub-projects:

**git.***

Github module to pull data from API and RAW, based on promises with focus on heavy caching (using `xm.http.HTTPCache`). 

**xm.assertVar** / **xm.typeOf**

Usable runtime checks and assertions, will be an assertion/testing/assessment library.. one day.

**xm.StyledOut** / **xm.Logger**

Chainable semantic output log/stream constructs. Provide auto-suggest friendly and string-poor text formatting (with many outputs, composites with miniwrite/ministyle).

**xm.expose.~**

CLI interface, abstracted with nice API. Very declarative but allows fluid building of CLI API in compiler checked way with good auto suggestion. Has all the info to print the help screens.

**xm.http.~**

Http cache loader (generation 3). Uses a shared local cache with http-caching features. Queued for another update to support big files.

**xm** *package (rest)*

Many TypeScript based utilities. Over time each will either consolidate or get ditched for external modules.

**./src/mini~.js**

Minimalistic output helpers. So far yieled [miniwrite](https://github.com/Bartvds/miniwrite) and [ministyle](https://github.com/Bartvds/ministyle).