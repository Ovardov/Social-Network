const isDevelopment = process.env.NODE_ENV === 'development';

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
  mode: 'development',
  isDevelopment,
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
}