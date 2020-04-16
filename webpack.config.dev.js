const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'my_graphql',
  mode: 'development',
  // devtool: 'eval',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    './client/index.js',
    './client/common.css'
  ],
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'app.js',
    publicPath: '/client/dist',
  },
  plugins:[
    new MiniCssExtractPlugin({ filename: 'app.css' }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/client/index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: { browsers: ['last 2 chrome versions'] },
              debug: true,
            }],
            '@babel/preset-react',
          ],
          plugins: [
            'react-hot-loader/babel',
            '@babel/plugin-proposal-class-properties',
          ],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        loader: 'file-loader',
        exclude: [/\.(css|js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
          name: '/static/[name].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/static/[name].[ext]',
        },
      },
      {
        test: [/\.css$/],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ],
  },
  resolve: {
    alias: {
      Components: path.resolve( __dirname, 'client/components')
    }
  },
  devServer: {
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    hot: true,
    contentBase: path.join(__dirname, "/client/dist"),
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001/api/graphql',
        secure: false,
      },
    },
  },
};