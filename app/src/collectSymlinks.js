const fs = require('fs')
const path = require('path')
const glob = require('glob')

export default class SymlinkCollector {
  constructor () {
    this.packages = []
  }

  async execute (startPath, cb) {
    let pathToNodeModules

    if (startPath.includes('@')) {
      pathToNodeModules = startPath
    } else {
      pathToNodeModules = path.join(startPath, 'node_modules')
    }

    await new Promise((resolve, reject) => {
      glob(pathToNodeModules + '/*', (err, foundPaths) => {
        if (err) console.warn(err)
        foundPaths.forEach(foundPath => {
          let stats = fs.lstatSync(foundPath)
          if (stats.isDirectory()) {
            this.execute(foundPath, this.callback)
          } else if (stats.isSymbolicLink()) {
            var pkgName = path.basename(foundPath)
            this.callback(pkgName, foundPath)
          }
        })
        resolve()
      })
    })
    return Promise.resolve(this.packages)
  }

  callback (pkgName, foundPath) {
    this.packages.push(
      {
        'packageName': pkgName,
        'path': foundPath
      }
    )
  }
}
