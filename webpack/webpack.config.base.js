'use strict';

var path              = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './src/js/index.js',

  resolve: {
    extensions: ['', '.js', '.scss'],
    alias: {
      js: path.resolve(__dirname, '../src/js'),
      sass: path.resolve(__dirname, '../src/sass')
    }
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'], exclude: /node_modules/ }
    ]
  },

  output: { path: './dist' }, // filename added in dev/prod configs

  plugins: [new HtmlWebpackPlugin({
    template: './src/index.ejs',
    inject: 'body',                   // inject js into body, not head. Adds <script> tag with js from otuput above
    favicon: null,                    // TODO add one
    minify: false,
    hash: true,                      // TODO add hashing fer caching
    cache: false,                     // don't try to guess whether files have changed
    filename: '../index.html'
  })]
};
