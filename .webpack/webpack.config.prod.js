const merge = require("webpack-merge");
const webpack = require("webpack");
const config = require("./webpack.config.js");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = merge(config, {
  mode: "production",
  devtool: 'inline-source-map',
  plugins:[
    new CleanWebpackPlugin({
      root: config.output.path,
      verbose: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',         // default: 'server', save file to {output.path}
      openAnalyzer: false,
      reportFilename: "report.html",
      //analyzerPort: 3001,
    }),
  ]
});