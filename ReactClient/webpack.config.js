const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const {
  mode,
  commonStyleLoaders,
  commonRules,
  commonResolve,
  commonPlugins,
} = require('./webpack.common.js')

const htmlPlugin = new HTMLWebpackPlugin({
  favicon: path.resolve(__dirname, 'public', 'images', 'favicon.ico'),
  template: './public/index.html',
  filename: './index.html',
})

const clientStyleLoaders = []

module.exports = {
  mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      ...commonRules,
      {
        test: /\.scss/,
        use: [...clientStyleLoaders, ...commonStyleLoaders],
      },
    ],
  },
  resolve: commonResolve,
  plugins: [...commonPlugins, htmlPlugin],
}