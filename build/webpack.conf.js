var webpackConfig = {
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: __dirname + '/../dist',
    filename: 'conversational-machine.js',
    libraryTarget: 'umd',
    library: '@aeternity/conversational-machine',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env'],
        },
      }
    ],
  }
};

module.exports = webpackConfig;
