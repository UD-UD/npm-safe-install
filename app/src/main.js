/* eslint no-undef: off */
import Controller from './controller'
const cli = require('commander')
const chalk = require('chalk')
const packageData = require('../../package.json')

cli
  .version(packageData.version, '-v, --version')
  .option('-t, --target <n>', 'Path of the target directory')
  .usage('[options] <package> [morePackage ...]')
  .parse(process.argv)

let path = cli.target !== undefined ? cli.target : process.cwd()

let controller = new Controller(path, cli.args)

console.log(chalk.gray('\nKEEP CALM!\nNSI GOT YOU COVERED'))
controller.run()

process.on('unhandledRejection', (reason, p) => {
  console.log(chalk.red(`Failed to execute command: ${reason}`))
  process.exit()
})
