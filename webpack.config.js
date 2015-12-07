var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './app/index.js',
  output: {
    path: './dist',
    //Watching your source files for changes and when changes are made the
    //bundle will be recompiled. This modified bundle is served from memory at
    // the relative path specified in publicPath (see API).
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      }
    ]
  },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = 'build.[hash].js'

  module.exports.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
    })
  ]
} else {
  module.exports.devtool = '#source-map'
}
