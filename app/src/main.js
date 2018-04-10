import Controller from './controller'

const [, , ...arg] = process.argv

const path = arg.length !== 0 ? arg[0] : process.cwd()

let controller = new Controller(path)

controller.run()
