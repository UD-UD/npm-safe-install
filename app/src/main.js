
import SymlinkCollector from './collectSymlinks'
// import WritePath from './write'

// const [, , ...arg] = process.argv

let arg = '/Users/ujjaldutta/Documents/FusionChartsWorks/FusionBoard/hello2/a'
let coll = new SymlinkCollector()

var path = arg || process.cwd()

coll.execute(path).then(() => {
  console.log(JSON.stringify(coll.packages))
})
