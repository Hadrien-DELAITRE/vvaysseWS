# Victor Vayse Website

## Pre-requisites

* Node.js > 8.x.x

## Installation

There is two servers to install:

* WWW server, with [Nuxt](https://nuxtjs.org/) framework.
* API server, with [Backpack](https://github.com/jaredpalmer/backpack).
* PROXY server, with [Backpack](https://github.com/jaredpalmer/backpack).

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

* WWW server, listening on `${protocol}//${hostname}:${port}` by default http://www.vvaysse.com:7070, see [configuration](#configuration).

```sh
$> npm run www
```

* API server, listening on `${protocol}//${hostname}:${port}` by default http://api.vvaysse.com:7000, see [configuration](#configuration):

```sh
$> npm run api
```

* PROXY server, listening on `${protocol}//${hostname}:${port}` by default http://www.vvaysse.com:80, see [configuration](#configuration):

```sh
$> npm run proxy
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
    "srcDir": "api", // [string] Url path of source API folder.
    "images": {
      // [string] Duration of images route cache ([length] [unit] as "10
      // minutes" or "1 day").
      "cache": "1 minute",
      // [string] Url path of portfolio images.
      "portfolioDirPath": "foo/bar/baz",
    }
  },
  "www": {
    "hostname": "foo", // [string] Hostname portion of the URL.
    "port": 1234, // [integer] Port portion of the URL.
    "srcDir": "www", // [string] Url path of source WWW folder.
    "protocol": "http:" // [string] Protocol portion of the URL.
  },
  "proxy": {
    "hostname": "foo", // [string] Hostname portion of the URL.
    // [integer] Port portion of the URL. WARN: if 80, you will need admin
    // rights (sudoers).
    "port": 80,
    "srcDir": "proxy", // [string] Url path of source PROXY folder.
    "protocol": "http:" // [string] Protocol portion of the URL.
  }
}
```

## HTTP requests reverse proxy

Following schema presents how incoming HTTP requests are handled.

```
                                          +-----+
                                          | API |
                     +-------------+------>     |
+-------------+      |             |      |:7000|
|Incoming HTTP|      |Reverse Proxy|      +-----+
|             +------>             |
|  Requests   |      |     :80     |      +-----+
+-------------+      |             |      | WWW |
                     +-------------+------>     |
                                          |:7070|
                                          +-----+
```
