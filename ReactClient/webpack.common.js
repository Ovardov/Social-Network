const dotENVPlugin = require('dotenv-webpack')

const mode = 'development'
const isDevelopment = mode === 'development'

const dotenvPlugin = new dotENVPlugin({
  path: isDevelopment ? './.env.development' : './.env.production',
})

const commonStyleLoaders = [
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
      test: /\.(jpe?g|gif|png)$/i,
      use: ['url-loader'],
    },
    {
      test: /\.(svg)$/i,
      use: [
        { loader: 'babel-loader' },
        { loader: 'react-svg-loader', options: { jsx: true } },
      ],
    },
  ],
  commonResolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  commonPlugins: [dotenvPlugin],
}
