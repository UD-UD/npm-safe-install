import { exec } from 'child_process'
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

export default class Shell {
  static async shell (cmd) {
    return new Promise(function (resolve, reject) {
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          reject(err)
        } else {
          resolve({ stdout, stderr })
        }
      })
    })
  }

  static async run (packages, targetdir, newPackages, keepPrelinked) {
    // unlink the symlinked dependency folders prior to `npm install`
    // (else, in symlinked folders, it deletes subdeps shared by root project)
    if (!keepPrelinked) {
      console.log(chalk.greenBright('\nUnlinking symlinked dependencies (protects their subdependencies)'))
      for (const packageName of packages) {
        const packagePath = path.join(targetdir, 'node_modules', packageName)
        const stats = fs.lstatSync(packagePath)
        if (stats.isSymbolicLink()) {
          this.print(packageName)
          fs.unlinkSync(packagePath)
        }
      }
    }

    console.log(chalk.greenBright('\nInstalling Dependencies'))
    let installCmd, log
    if (newPackages !== undefined) {
      installCmd = `cd ${targetdir} && npm install ${newPackages}`
    } else {
      installCmd = `cd ${targetdir} && npm install`
    }
    let { stdout } = await this.shell(installCmd)
    this.print(stdout)

    console.log(chalk.greenBright('Rebuilding Links'))
    if (packages.length) {
      log = await this.shell(`cd ${targetdir} && npm link ${packages.join(' ')}`)
      this.print(log.stdout)
    } else {
      this.print('No packages needed to relink')
    }
  }

  static print (stdout) {
    console.log('   ' + stdout)
  }
}
