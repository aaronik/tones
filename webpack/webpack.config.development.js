'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var config = Object.create(baseConfig);
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
]);

config.output.filename = 'tones.js';

// Note: There seems to be no rhyme or reason at all about what combo of options
// need to be specified on the CLI vs. here in the config. This here works,
// so I'm half content to just leave it and carry on.
config.devServer = {
  // hot: true, // only works if specified on cli
  inline: true, // also have script in index.html
  progress: true,
  debug: true,
  // output: { publicPath: 'dist/' }, // only works if specified on cli
  // publicPath: 'dist/' // confusing option, only works if specified on cli
};

module.exports = config;
