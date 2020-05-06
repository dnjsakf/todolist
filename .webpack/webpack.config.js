const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');

const outputPath = path.join(__dirname, '../client/dist');
const staticPath = path.join(__dirname, '../client/public');
const publicPath = '/public/';

module.exports = {
  name: 'todolist',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    index: [
      './client/index.js',
      './client/index.css',
    ],
    vendor: [
      'react', 'react-dom', 'apollo-client'
    ]
  },
  output: {
    path: outputPath,
    publicPath: publicPath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunks: 'initial',
        name: 'vendor',
      }
    },
  },
  plugins:[
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v0.1"),
    }),
    new CopyWebpackPlugin(
      [
        {
          from: staticPath,
          to: outputPath,
        }
      ],
      {
        ignore: [
          '.*',
        ],
      },
    ),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: "[name].chunk.css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(staticPath, 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules'),
        options: {
          presets: [
            [
              '@babel/preset-env', {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: true
              }
            ],
            '@babel/preset-react',
          ],
          plugins: [
            [ "@babel/plugin-proposal-decorators", { legacy: true } ],
            "@babel/plugin-proposal-class-properties",
            'react-hot-loader/babel',
          ],
        },
      },
      {
        loader: 'file-loader',
        exclude: [/\.(css|js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
          name: '/public/[name].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/public/[name].[ext]',
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
  }
};