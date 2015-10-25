var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './app/index',
    vendors: ['react']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
      include: __dirname
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'), //合并react
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('all.[hash].css', {allChunks: true})
  ]
};
