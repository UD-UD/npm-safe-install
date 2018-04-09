import { exec } from 'child_process'

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

  static async run (packages, targetdir) {
    let packageName = []
    console.log('*********** Installing Dependencies ***********')
    let { stdout } = await this.shell(`cd ${targetdir} && npm install`)
    this.print(stdout)
    packages.forEach(pkg => {
      packageName.push(pkg.packageName)
    })
    let names = packageName.join(' ')
    console.log('*********** Rebuilding Links ***********')
    let log = await this.shell(`cd ${targetdir} && npm link ${names}`)
    this.print(log.stdout)
  }

  static print (stdout) {
    console.log(stdout)
  }
}
