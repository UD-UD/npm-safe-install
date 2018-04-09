import fs from 'fs-extra'
import _ from 'lodash'

export default class WritePath {
  static createPathProperties (packages, path) {
    this.write({
      'links': packages
    }, path)
  }

  static write (prop, file) {
    fs.readJson(file, function (err, data) {
      if (err && err.code === 'ENOENT') {
        fs.outputJson(file, prop, function (err) {
          console.log(err)
        })
      } else if (!data) {
        fs.outputJson(file, prop, function (err) {
          console.log(err)
        })
      } else {
        var merged = _.merge(data, prop)
        fs.outputJson(file, merged, function (err) {
          console.log(err)
        })
      }
    })
  }
}
