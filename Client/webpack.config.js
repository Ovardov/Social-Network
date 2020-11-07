const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const isDevelopment = process.env === 'development'

const htmlPlugin = new HTMLWebpackPlugin({
  template: './public/index.html',
  filename: './index.html'
})

const styleLoaders = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      modules: { localIdentName: "[name]__[local]___[hash:base64:5]", },
      sourceMap: isDevelopment,
    }
  },
  {
    loader: 'sass-loader', options: {
      sassOptions: {
        includePaths: [__dirname, 'src']
      },
      additionalData: '@import "./src/shared/styles/styles.scss";',
    },
  },
]

module.exports = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.scss/,
      use: styleLoaders,
    }, {
      test: /\.(jpe?g|gif|png|svg)$/i,
      use: ['url-loader']
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [htmlPlugin]
}