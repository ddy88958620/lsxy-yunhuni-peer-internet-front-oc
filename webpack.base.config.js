var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './app/main.js',
  output: {
    path: './static',
    //Watching your source files for changes and when changes are made the
    //bundle will be recompiled. This modified bundle is served from memory at
    // the relative path specified in publicPath (see API).
    publicPath: 'static/',
    filename: 'build.js'
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['stage-0', 'es2015'], // stage-0 is es7 rule , ex:like {...state}
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      },
      { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'},
      {
        test: /\.styl$/,
        loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
      }
    ]
  },
  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
