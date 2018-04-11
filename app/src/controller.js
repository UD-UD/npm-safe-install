import SymlinkCollector from './collectSymlinks'
import Shell from './shell'
const path = require('path')
const fs = require('fs')

export default class Controller {
  constructor (path, args) {
    this.path = path
    this.newPackages = args !== undefined ? args.join(' ') : undefined
  }
  run () {
    let targetPath = this.resolveRoot(this.path)
    if (this.checkFile(targetPath, '.nsi.json')) {
      this.readFromNSIFile(targetPath)
    } else {
      console.warn('.nsi.json not found. Looking into node modules')
      this.collectSymLinksFromNodeModules(targetPath)
    }
  }

  collectSymLinksFromNodeModules (path) {
    let coll = new SymlinkCollector()
    coll.execute(path).then((packages) => {
      let packageName = []
      packages.forEach(pkg => {
        packageName.push(pkg.packageName)
      })
      this.runShell(packageName.join(' '), path)
    })
  }

  readFromNSIFile (targetPath) {
    let nsiPath = path.join(targetPath, '.nsi.json')
    let packages = fs.readFileSync(nsiPath, 'utf8')
    this.runShell(JSON.parse(packages).join(' '), targetPath)
  }

  runShell (packages, targetPath) {
    Shell.run(packages, targetPath, this.newPackages)
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
    start = start || module.parent.filename
    check = check || this.defaultCheck
    if (typeof start === 'string') {
      if (start[start.length - 1] !== path.sep) {
        start += path.sep
      }
      start = start.split(path.sep)
    }
    if (!start.length) {
      throw new Error(`package.json not found in path ${this.path}`)
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
    console.log(startPath)
    return startPath
  }
}
