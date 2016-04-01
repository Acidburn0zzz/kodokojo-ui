'use strict'

var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'app.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.BABEL_ENV': '"production"'
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['eslint'],
        include: [
          path.join(__dirname, 'api'),
          path.join(__dirname, 'config'),
          path.join(__dirname, 'src')
        ]
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'config/shared')
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style!css!less'
      },
      {
        test: /\.jpg|png|svg$/, loader: "file-loader?name=images/[name].[ext]"
      },
      {
        test: /\.ico$/, loader: "file-loader?name=./[name].[ext]"
      }
    ]
  }
}
