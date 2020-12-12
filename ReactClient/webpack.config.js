const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const dotENVPlugin = require('dotenv-webpack')
const { mode, commonStyleLoaders, commonRules, commonResolve, isDevelopment } = require('./webpack.common.js')

const htmlPlugin = new HTMLWebpackPlugin({
  favicon: path.resolve(__dirname, 'public', 'images', 'favicon.ico'),
  template: './public/index.html',
  filename: './index.html'
})

const dotenvPlugin = new dotENVPlugin({
  path: mode === 'development' ? './.env.development' : './.env.production'
})

const clientStyleLoaders = [
  { loader: 'style-loader' },
]

module.exports = {
  mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [...commonRules, {
      test: /\.scss/,
      use: [...clientStyleLoaders, ...commonStyleLoaders],
    }]
  },
  resolve: commonResolve,
  plugins: [htmlPlugin, dotenvPlugin],
}