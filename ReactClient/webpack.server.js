const path = require('path');
const nodeExternals = require('webpack-node-externals');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const { commonStyleLoaders, commonRules, commonResolve, commonPlugins } = require('./webpack.common');

const loadablePlugin = new LoadableWebpackPlugin();

const serverStyleLoaders = [
  { loader: 'isomorphic-style-loader' },
];

module.exports = {
  entry: './server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'server-build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      ...commonRules,
      {
        test: /\.scss/,
        use: [...serverStyleLoaders, ...commonStyleLoaders],
      }]
  },
  resolve: commonResolve,
  plugins: [...commonPlugins, loadablePlugin]
}