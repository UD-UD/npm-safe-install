# npm-safe-install

A node cli that performs npm install in a safe manner such the locally linked modules are re-linked after installation

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

End with an example of getting some data out of the system or using it for a little demo

## Usage
You can run the module by using any of the following command : 
* `npm-safe-install`
* `nsi`

Suppose you have a project `test` where you want to use this module.

Create a `.nsi.json` in the root directory `test` and list all the submodules in an array 

```json
[
    "module-1",
    "module-2"
]
```
If you dont provide the above file `nsi` will search the `node_modules` of the project for linked projects.

You can go to the test directory and run 

```javascript
nsi
```
Or you can run 

```javascript
nsi `path-of-the-project`
//example: nsi a/b/d/test
```



## Built With

* [Webpack](http://www.dropwizard.io/1.0.2/docs/) - The web framework used

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
