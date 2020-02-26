const fs = require('fs')
const path = require('path')
const glob = require('glob')

export default class SymlinkCollector {
  constructor () {
    this.packages = []
  }

  async execute (startPath, cb) {
    let pathToNodeModules

    if (path.basename(startPath).startsWith('@')) {
      pathToNodeModules = startPath
    } else {
      pathToNodeModules = path.join(startPath, 'node_modules')
    }

    await new Promise((resolve, reject) => {
      glob(pathToNodeModules + '/*', async (err, foundPaths) => {
        if (err) console.warn(err)
        for (const foundPath of foundPaths) {
          let stats = fs.lstatSync(foundPath)
          if (stats.isDirectory() && path.basename(foundPath).startsWith('@')) {
            await this.execute(foundPath, this.callback)
          } else if (stats.isSymbolicLink()) {
            this.callback(path.basename(foundPath), foundPath)

            // unlink the symlinked dependency folders prior to `npm install`
            // (else, in symlinked folders, it deletes subdeps shared by root project)
            console.log('Unlinking symlinked dependency (protects its subdependencies): ' + path.basename(foundPath))
            fs.unlinkSync(foundPath)
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
