const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.config.js');


module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    hot: true,
    contentBase: config.output.path,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000/graphql',
        secure: false,
      },
    },
  },
});