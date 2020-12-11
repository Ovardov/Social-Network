const path = require('path')
const { commonStyleLoaders, commonRules, commonResolve, commonPlugins } = require('./webpack.common')

const clientStyleLoaders = [
  { loader: 'style-loader' },
]

module.exports = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [...commonRules, {
      test: /\.scss/,
      use: [...clientStyleLoaders, ...commonStyleLoaders],
    }]
  },
  resolve: commonResolve,
  plugins: [...commonPlugins]
}