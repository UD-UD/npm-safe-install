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

    console.log(' glob started ')

    let k = await glob(pathToNodeModules + '/*', (err, foundPaths) => {
      console.log('in glob')
      if (err) console.warn(err)
      foundPaths.forEach(foundPath => {
        console.log('in foundpaths')
        fs.lstat(foundPath, (err, stats) => {
          console.log('in lstate')
          if (err) { console.warn(err) }
          if (stats.isDirectory()) {
            this.execute(foundPath, this.callback)
          } else if (stats.isSymbolicLink()) {
            var pkgName = path.basename(foundPath)
            this.callback(pkgName, foundPath)
          }
        })
      })
    })
    console.log(' glob completed ' + k)
    // return Promise.resolve(this.packages)
  }

  callback (pkgName, foundPath) {
    console.log('in callback')
    this.packages.push(
      {
        'package-name': pkgName,
        'path': foundPath
      }
    )
    console.log('Hello' + JSON.stringify(this.packages))
  }
}
