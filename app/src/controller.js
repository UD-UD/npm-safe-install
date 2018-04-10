import SymlinkCollector from './collectSymlinks'
import Shell from './shell'
const path = require('path')
const fs = require('fs')

export default class Controller {
  constructor (path) {
    this.path = path
  }
  run () {
    let targetPath = this.path
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
      Shell.run(packageName.join(' '), path)
    })
  }

  readFromNSIFile (targetPath) {
    let nsiPath = path.join(targetPath, '.nsi.json')
    let packages = fs.readFileSync(nsiPath, 'utf8')
    Shell.run(JSON.parse(packages).join(' '), targetPath)
  }

  checkFile (targetpath, filename) {
    let filepath = path.join(targetpath, filename)
    if (!fs.existsSync(filepath)) {
      return false
    } else return true
  }
}
