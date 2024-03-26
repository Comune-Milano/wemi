require('dotenv/config');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
// webpack.config.js
const MakeDirsPlugin = require('./make-dirs.plugin');

module.exports = {
  target: 'node',
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
  },
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CopyPlugin([
      { from: 'src/html', to: 'html' },
      { from: 'src/assets', to: 'assets' },
    ]),
    new NodemonPlugin(),
    new MakeDirsPlugin([
      'assets/wemifiles/media',
    ]),
  ],
};