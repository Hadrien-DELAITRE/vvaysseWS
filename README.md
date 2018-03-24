# Victor Vayse Website

## Pre-requisites

* Node.js > 8.x.x

## Installation

There is two servers to install:

* WWW server, with [Nuxt](https://nuxtjs.org/) framework.
* API server, with [Backpack](https://github.com/jaredpalmer/backpack).

First, use this command to clone this project into your machine.

```sh
$> git clone git@github.com:Hadrien-DELAITRE/vvaysseWS.git
// or
$> git clone https://github.com/Hadrien-DELAITRE/vvaysseWS.git
```

Then, install it using `npm`:

```sh
$> cd vvaysseWS
$> npm install
```

In order to run servers (in development mode for the moment):

* WWW server, listening on `${protocol}//${hostname}:${port}`, see [configuration](#configuration).

```sh
$> npm run www
```

* API server, listening on `${protocol}//${hostname}:${port}`, see [configuration](#configuration):

```sh
$> npm run api
```

## Development

A linter is setup with enabled commands.
Use this one to show all linting errors and warns.

```sh
$> npm run lint
```

Use this one to fix all possible errors and warns.

```sh
$> npm run lintfix
```

Consider to use prettier and eslint plugins with your own editor (Atom, Sublime
Text, Xcode, ...).

## Configuration

Configuration of servers is defined in package.json file.
It provides a property `config`:

```js
"config": {
  "api": {
    "hostname": "foo", // [string] Hostname portion of the URL.
    "port": 1234, // [integer] Port portion of the URL.
    "protocol": "http:", // [string] Protocol portion of the URL.
    "images": {
      // [string] Duration of images route cache ([length] [unit] as "10
      // minutes" or "1 day").
      "cache": "1 minute",
    }
  },
  "www": {
    "hostname": "foo", // [string] Hostname portion of the URL.
    "port": 1234, // [integer] Port portion of the URL.
    "srcDir": "www", // [string] Url path of source nuxt folder.
    // [string] Url path of static nuxt folder. WARN: can't be modified, Nuxt
    // doesn't provide this possibility.
    "staticDirPath": "www/static",
    // [string] Url path of portfolio images. WARN: has to be defined in Nuxt
    // static folder.
    "portfolioDirPath": "www/static/foo/bar/baz",
  }
}
```
