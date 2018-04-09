
import SymlinkCollector from './collectSymlinks'
import Shell from './shell'

const [, , ...arg] = process.argv
let coll = new SymlinkCollector()
var path = arg.length !== 0 ? arg[0] : process.cwd()
coll.execute(path).then((packages) => {
  Shell.run(packages, path)
})
