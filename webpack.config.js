
const path = require('path')

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
  'target': 'node'
}
