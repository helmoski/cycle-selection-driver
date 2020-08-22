const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
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
    rules: [
      { test: /\.ts?$/, loader: 'ts-loader' }
    ]
  },
  externals: {
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
    'xstream/extra/dropRepeats': {
      commonjs: 'xstream/extra/dropRepeats',
      commonjs2: 'xstream/extra/dropRepeats',
      amd: 'xstream/extra/dropRepeats',
      root: 'dropRepeats',
    },
    'xstream/extra/fromEvent': {
      commonjs: 'xstream/extra/fromEvent',
      commonjs2: 'xstream/extra/fromEvent',
      amd: 'xstream/extra/fromEvent',
      root: 'fromEvent',
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
