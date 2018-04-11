var config = require('./webpack.config')
var nodeExternals = require('webpack-node-externals')
const path = require('path')
var isCoverage = process.env.NODE_ENV === 'coverage'

config.target = 'node'
config.externals = [nodeExternals()]
config.module.rules.unshift(isCoverage ? {
  test: /\.(js|ts)/,
  include: path.resolve('app/src'),
  loader: 'istanbul-instrumenter-loader',
  query: {
    esModules: true
  }
} : {})

module.exports = config
