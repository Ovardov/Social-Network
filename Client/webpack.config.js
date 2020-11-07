const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HTMLWebpackPlugin({
  template: './public/index.html',
  filename: './index.html'
})

module.exports = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [htmlPlugin]
}