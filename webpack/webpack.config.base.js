'use strict';

var path = require('path');

module.exports = {
  entry: {
    app: ['./src/js/index.js']
  },
  output: {
    path: './dist',
    filename: 'tones.js'
  },
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
  }
};
