var webpack = require('webpack')
var config = require('./webpack.base.config')
var htmlwebpackplugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')
config.output.filename = 'build.[hash].js'

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new CopyWebpackPlugin([
    {from: path.resolve(__dirname,'app/assets/favicon.ico')},
  ]),
  // new webpack.LoaderOptionsPlugin({
  //   minimize: true
  // }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
	    drop_console: true,
    },
  }),
  new htmlwebpackplugin({
    filename: 'index.html',
    template: './template/product-index.html'
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./build/manifest.json'),
  }),
])

module.exports = config
