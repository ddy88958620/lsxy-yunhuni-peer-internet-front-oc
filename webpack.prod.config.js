var webpack = require('webpack')
var config = require('./webpack.base.config')
var htmlwebpackplugin = require('html-webpack-plugin')

config.output.filename = 'build.[hash].js'

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  // new webpack.LoaderOptionsPlugin({
  //   minimize: true
  // }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      pure_funcs: [ 'console.log', 'console.info' ]
    },
  }),
  new htmlwebpackplugin({
    filename: 'index.html',
    template: './template/product-index.html'
  }),
])

module.exports = config
