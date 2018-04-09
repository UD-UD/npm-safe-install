
import SymlinkCollector from './collectSymlinks'
import Shell from './shell'

// const [, , ...arg] = process.argv

let arg = '/Users/ujjaldutta/Documents/FusionChartsWorks/FusionBoard/hello2/a'
let coll = new SymlinkCollector()

var path = arg || process.cwd()

coll.execute(path).then((packages) => {
  console.log(JSON.stringify(packages))
  Shell.run(packages, arg, process.cwd)
})
