# home [![NPM version](https://badge.fury.io/js/home.svg)](http://badge.fury.io/js/home) [![Build Status](https://travis-ci.org/kaelzhang/node-home.svg?branch=master)](https://travis-ci.org/kaelzhang/node-home) [![Dependency Status](https://gemnasium.com/kaelzhang/node-home.svg)](https://gemnasium.com/kaelzhang/node-home)

A tiny utility to get the home directory, or resolve a path begins with `'~'`, with cross-platform compatibility.

## Install

```sh
$ npm install home --save
```

## Usage

```js
var home = require('home');

home(); // '/Users/kael'

var some_path = '~/workspace';
home.resolve(some_path); // '/Users/kael/workspace'
home.resolve(some_path, 'abc'); // '/Users/kael/workspace/abc'
```

## home()

Returns `path` the home directory specified by operating system.

## home.resolve([from...], to)

Resolves `to` to an absolute path, if `to` begins with `'~'`, it will be cooked to home directory before `path.resolve()`d.

The usage of `home.resolve` is very similar to [`path.resolve`](http://nodejs.org/api/path.html#path_path_resolve_from_to)

Another way to think of it is as a sequence of cd commands in a shell.

```js
home.resolve('foo/bar', '~/file/', '..', 'a/../subfile');
// -> '/Users/kael/subfile'
```

Is equivalent to:

```js
home.resolve('foo/bar', '/Users/kael/file/', '..', 'a/../subfile');
```

Is similar to:

```sh
cd foo/bar
cd ~/file/
cd ..
cd a/../subfile
pwd
```

## License

May be freely distributed under the [MIT license](https://raw.githubusercontent.com/kaelzhang/node-home/master/LICENSE-MIT).

Copyright (c) Kael Zhang and [other contributors](https://github.com/kaelzhang/node-home/graphs/contributors).
