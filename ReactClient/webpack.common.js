const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const isDevelopment = process.env === 'development';

const htmlPlugin = new HTMLWebpackPlugin({
  favicon: path.resolve(__dirname, 'public/images/favicon.ico'),
  template: './public/index.html',
  filename: './index.html'
})

const commonStyleLoaders = [
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
  commonStyleLoaders,
  commonRules: [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  }, {
    test: /\.(jpe?g|gif|png|svg)$/i,
    use: ['url-loader']
  }],
  commonResolve: {
    extensions: ['*', '.js', '.jsx']
  },
  commonPlugins: [htmlPlugin]
}