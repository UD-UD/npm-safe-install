const path = require('path')
const shell = require('shelljs')
module.exports = {
  mode: 'development',
  context: path.join(__dirname, '/app/src'),
  entry: ['./main'],
  devtool: 'cheap-source-map',
  output: {
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  'target': 'node',
  plugins: [
    function () {
      console.log('hello')
      this.plugin('done', () => {
        shell
          .echo('#!/usr/bin/env node\n')
          .cat(`${__dirname}/dist/bundle.js`)
          .to(`${__dirname}/out/cli.js`)
        shell.chmod(755, `${__dirname}/out/cli.js`)
      })
    }
  ]
}
