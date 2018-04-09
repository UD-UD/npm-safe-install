import { exec } from 'child_process'

export default class Shell {
  static async shell (cmd) {
    console.log(cmd)
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

  static async run (packages, targetdir, currentdir) {
    let packageName = []
    targetdir = targetdir || currentdir
    let { stdout } = await this.shell(`cd ${targetdir} && npm install`)
    this.print(stdout)
    packages.forEach(pkg => {
      packageName.push(pkg.packageName)
    })
    let names = packageName.join(' ')
    let { linkout } = await this.shell(`cd ${targetdir} && npm link ${names}`)
    this.print(linkout)
  }

  static print (stdout) {
    for (let line of stdout.split('\n')) {
      console.log(`ls: ${line}`)
    }
  }
}
