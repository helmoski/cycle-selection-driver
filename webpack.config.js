const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/umd'),
    filename: 'cycle-selection-driver.js',
    library: 'cycleSelectionDriver',
    libraryTarget: 'umd',
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    loaders: [
      {
        test: /\.ts?$/, loader: 'ts-loader', options: {
          compilerOptions: { declaration: false }
        }
      }
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
    'xstream/extra/fromEvent': {
      commonjs: 'xstream/extra/fromEvent',
      commonjs2: 'xstream/extra/fromEvent',
      amd: 'xstream/extra/fromEvent',
      root: 'fromEvent',
    }
  }
};
