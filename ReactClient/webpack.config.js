/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const dotENVPlugin = require('dotenv-webpack');

const preparePlugins = (isDevelopment) => {
  const dotenvPlugin = new dotENVPlugin({
    path: isDevelopment ? './.env.development' : './.env.production',
  });

  const htmlPlugin = new HTMLWebpackPlugin({
    favicon: path.resolve(__dirname, 'public', 'images', 'favicon.ico'),
    template: './public/index.html',
    filename: './index.html',
  });

  // To Do -> Remove duplicate styles from [name].css and main.css
  const miniCssExctractPlugin = new MiniCssExtractPlugin();
  const optimizeCssAssetsPlugin = new OptimizeCssAssetsPlugin();

  return [
    dotenvPlugin,
    htmlPlugin,
    miniCssExctractPlugin,
    optimizeCssAssetsPlugin
  ];
};

const prepareStyleLoader = (isDevelopment) => [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      esModule: false,
    },
  },
  {
    loader: 'css-loader',
    options: {
      modules: { localIdentName: '[name]__[local]___[hash:base64:5]', },
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
  }
];

const prepareRules = (styleLoaders) => [
  {
    test: /\.(js|ts|jsx|tsx)$/,
    use: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.(jpe?g|gif|png)$/i,
    use: ['url-loader'],
  },
  {
    test: /\.(svg)$/i,
    use: [
      { loader: 'babel-loader', },
      { loader: 'react-svg-loader', options: { tsx: true, }, }
    ],
  },
  {
    test: /\.scss/,
    use: styleLoaders,
  }
];

module.exports = (env, arg) => {
  const { mode, } = arg;
  const isDevelopment = mode === 'development';

  const styleLoaders = prepareStyleLoader(isDevelopment);
  const rules = prepareRules(styleLoaders);
  const plugins = preparePlugins(isDevelopment);

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
      hot: true,
      port: 3000,
    },
    module: {
      rules,
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    plugins,
  };
};
