const path = require('path')
//const APP_PATH = path.resolve(__dirname, 'src')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'inline-source-map',
  //context: APP_PATH,
  entry: {
    main: ['babel-polyfill', './src/app.js'],
    //html: ['./index.html']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'file-loader?name=[name].[ext]'
    },{
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    },{
      test: /\.(s[a|c]ss)$/,
      loaders: 'style-loader!css-loader!sass-loader!autoprefixer',
    },{
      test: /\.eot/,loader : 'file?prefix=font/'},
      {test: /\.woff/,loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf/, loader : 'file?prefix=font/'},
      {test: /\.svg/, loader : 'file?prefix=font/'
    }]
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss']
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
  }
}