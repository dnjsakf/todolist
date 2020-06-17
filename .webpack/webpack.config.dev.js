const path = require("path");
const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.config.js');

const GRAPHQL_URL = "http://localhost:3003/graphql";

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins:[
    new webpack.DefinePlugin({
      GRAPHQL_URL: JSON.stringify(GRAPHQL_URL),
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    hot: true,
    contentBase: config.output.path,
    //publicPath: config.output.publicPath,
    proxy: {
      '/graphql': {
        target: GRAPHQL_URL,
        secure: false,
      },
    },
  },
});