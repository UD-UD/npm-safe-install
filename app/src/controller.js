import SymlinkCollector from './collectSymlinks'
import Shell from './shell'
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

export default class Controller {
  constructor (path, args, keepPrelinked) {
    this.path = path
    this.newPackages = args !== undefined ? args.join(' ') : undefined
    this.keepPrelinked = keepPrelinked
  }
  async run () {
    let targetPath = this.resolveRoot(this.path)
    let packageNames
    if (this.checkFile(targetPath, '.nsi.json')) {
      console.log(chalk.green('\nFound .nsi.json file. \n   Proceeding for safe install..'))
      packageNames = this.readFromNSIFile(targetPath)
    } else {
      console.log(chalk.red('\nUnable to find .nsi.json') +
        chalk.cyan('\nScanning modules...') +
        chalk.green('\nProceeding for safe install...'))
      packageNames = await this.collectSymLinksFromNodeModules(targetPath)
    }
    Shell.run(packageNames, targetPath, this.newPackages, this.keepPrelinked)
  }

  async collectSymLinksFromNodeModules (path) {
    let coll = new SymlinkCollector()
    const packages = await coll.execute(path)
    return packages.map(pkg => pkg.packageName)
  }

  readFromNSIFile (targetPath) {
    return JSON.parse(fs.readFileSync(path.join(targetPath, '.nsi.json'), 'utf8'))
  }

  checkFile (targetpath, filename) {
    let filepath = path.join(targetpath, filename)
    if (!fs.existsSync(filepath)) {
      return false
    } else return true
  }

  defaultCheck (dir) {
    return fs.existsSync(path.join(dir, 'package.json'))
  }

  findRoot (start, check) {
    start = start || this.path
    check = check || this.defaultCheck
    if (typeof start === 'string') {
      if (start[start.length - 1] !== path.sep) {
        start += path.sep
      }
      start = start.split(path.sep)
    }
    if (!start.length) {
      console.log(chalk.redBright(`FileNotFoundError: package.json not found in path ${this.path}`))
      process.exit()
    }
    start.pop()
    var dir = start.join(path.sep)
    try {
      if (check(dir)) {
        return dir
      }
    } catch (e) {}
    return this.findRoot(start, check)
  }

  resolveRoot (startPath) {
    if (!this.defaultCheck(startPath)) {
      startPath = this.findRoot(startPath)
    }
    console.log(chalk.white(chalk.green.bold('\nRunning nsi in: ') + startPath))
    return startPath
  }
}
