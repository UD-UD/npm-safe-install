const fs = require('fs')
const path = require('path')
const glob = require('glob')

export default class SymlinkCollector {
  constructor () {
    this.packages = []
  }

  async execute (startPath) {
    let pathToNodeModules
    let orgPrefix

    if (path.basename(startPath).startsWith('@')) {
      pathToNodeModules = startPath
      orgPrefix = `${path.basename(startPath)}/`
    } else {
      pathToNodeModules = path.join(startPath, 'node_modules')
      orgPrefix = ''
    }

    await new Promise((resolve, reject) => {
      glob(pathToNodeModules + '/*', async (err, foundPaths) => {
        if (err) console.warn(err)
        for (const foundPath of foundPaths) {
          const stats = fs.lstatSync(foundPath)
          if (stats.isDirectory() && path.basename(foundPath).startsWith('@')) {
            await this.execute(foundPath)
          } else if (stats.isSymbolicLink()) {
            const packageName = orgPrefix + path.basename(foundPath)
            this.callback(packageName, foundPath)
          }
        }
        resolve()
      })
    })
    return this.packages
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
