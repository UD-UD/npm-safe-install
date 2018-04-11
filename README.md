<p align="center">
  <img src="https://raw.githubusercontent.com/UD-UD/npm-safe-install/master/demo.gif" alt="Safe npm install">
    <br>
    <br>
</p>

[![Build Status](https://travis-ci.org/UD-UD/npm-safe-install.svg?branch=develop)](https://travis-ci.org/UD-UD/npm-safe-install)
[![NPM version](https://img.shields.io/npm/v/npm-safe-install.svg)](https://www.npmjs.com/package/npm-safe-install)
[![Required Node version](https://img.shields.io/node/v/npm-safe-install.svg)](https://www.npmjs.com/package/npm-safe-install)
[![NPM total downloads](https://img.shields.io/npm/dt/npm-safe-install.svg)](https://www.npmjs.com/package/npm-safe-install)
[![Contributors](https://img.shields.io/github/contributors/UD-UD/npm-safe-install.svg)](https://github.com/UD-UD/npm-safe-install/graphs/contributors)
[![License](https://img.shields.io/github/license/UD-UD/npm-safe-install.svg)](https://github.com/UD-UD/npm-safe-install/blob/master/LICENSE)

# npm-safe-install

A cli utility that performs npm install in a safe manner such the locally linked modules are re-linked after installation

## Getting Started

These instructions will get your a copy of the project up and running on your local machine.

### Prerequisites

```
node >= 8.4.0
```

### Installing

Install `npm-safe-install` globally by running the following command:

```bash
npm install -g npm-safe-install
```

## Usage
You can run the module by using any of the following command : 
* `npm-safe-install`
* `nsi`

When you run this utility ,it searches for the linked projects and rebuilds any broken links.

Alternatively you can create a `.nsi.json` in the root directory and list all the submodules in form of an array 

```json
// example
[
    "module-1",
    "module-2"
]
```
The utility will rebuild the links for the submodules specified in this file.

### Options 
This utility has the following options :

```bash
# run nsi in current directory
nsi

# install npm packages
nsi package-1 package-2

# run nsi in target folder
nsi -t <target folder path>

# install npm package in target path
nsi -t <target folder path> package-1 package-2

# check version
nsi -v

# list all options
nsi -h 
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
