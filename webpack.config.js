const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cycle-selection-driver.js',
    library: 'cycleSelectionDriver',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    loaders: [
      { test: /\.ts?$/, loader: 'ts-loader' }
    ]
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
    '@cycle/run': {
      commonjs: '@cycle/run',
      commonjs2: '@cycle/run',
      amd: '@cycle/run',
      root: 'run',
    },
    xstream: {
      commonjs: 'xstream',
      commonjs2: 'xstream',
      amd: 'xstream',
      root: 'xstream',
    },
    'xstream/extra/fromEvent': {
      commonjs: 'xstream/extra/fromEvent',
      commonjs2: 'xstream/extra/fromEvent',
      amd: 'xstream/extra/fromEvent',
      root: 'fromEvent',
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
};
