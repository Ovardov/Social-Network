const miniCssExtractPlugin = require('mini-css-extract-plugin');
const withScss = require('@zeit/next-sass');

const localIdentName = process.env.NODE_ENV === 'development' ? '[name]__[local]___[hash:base64:5]' : '[hash:base64]';

const styleLoaders = [
  {
    loader: 'sass-loader', options: {
      sassOptions: {
        includePaths: [__dirname, '/public/styles/styles.scss']
      },
      additionalData: '@import "./public/styles/styles.scss";',
    },
  },
]

module.exports = withScss({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: localIdentName
  },
  images: {
    domains: ['res.cloudinary.com']
  },

  webpack(config, options) {
    config.plugins.push(new miniCssExtractPlugin())

    config.module.rules.push({
      test: /\.scss/,
      use: styleLoaders,
    }, {
      test: /\.(jpe?g|gif|png|svg)$/i,
      use: ['url-loader']
    })

    return config;
  }
});