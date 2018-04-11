# npm-safe-install

A cli utility that performs npm install in a safe manner such the locally linked modules are re-linked after installation

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You need to have node installed in you system.You can easily install node from following :
* [Download Node](https://nodejs.org/en/download/)

### Installing

Install `npm-safe-install` globally by running the following command.

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
# run nsi
nsi

# install npm packages
nsi package-1 package-2

# run nsi in target folder
nsi -t <target folder path>

# install npm package in target path
nsi -t <target folder path> package-1 package-2

# check version
nsi -V

# list all options
nsi -h 
```
## Built With

* [Webpack](http://www.dropwizard.io/1.0.2/docs/) - The web framework used

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
