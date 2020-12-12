const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'

// To Do -> Remove duplicate styles from [name].css and main.css
const miniCssExctractPlugin = new MiniCssExtractPlugin()
const optimizeCssAssetsPlugin = new OptimizeCssAssetsPlugin()

const commonStyleLoaders = [
  {loader: MiniCssExtractPlugin.loader},
  {
    loader: 'css-loader',
    options: {
      modules: { localIdentName: '[name]__[local]___[hash:base64:5]' },
      sourceMap: isDevelopment,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [__dirname, 'src'],
      },
      additionalData: '@import "./src/shared/styles/styles.scss";',
    },
  },
]

module.exports = {
  mode: 'development',
  isDevelopment,
  commonStyleLoaders,
  commonRules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.(jpe?g|gif|png|svg)$/i,
      use: ['url-loader'],
    },
  ],
  commonResolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  commonPlugins: [miniCssExctractPlugin, optimizeCssAssetsPlugin],
}
