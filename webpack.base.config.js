var webpack = require('webpack')
var path = require('path')


module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    //Watching your source files for changes and when changes are made the
    //bundle will be recompiled. This modified bundle is served from memory at
    // the relative path specified in publicPath (see API).
    publicPath: '/',
    filename: 'build.js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
    ],
    alias: {
      // 'components': path.resolve(__dirname, 'app/components'),
      'font': path.resolve(__dirname, 'app/assets/fonts'),
      'actions': path.resolve(__dirname, 'app/vuex/actions.js'),
      'ui': path.resolve(__dirname, 'app/components/ui'),
      'assets': path.resolve(__dirname, 'app/assets'),
      'domain': path.resolve(__dirname, 'app/config/domain.js')
    },
    extensions: ['', '.json', '.js', '.vue'],
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['stage-0', 'es2015'], // stage-0 is es7 rule , ex:like {...state}
        },
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      },
      { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'},
    ],
    noParse: [],
  },
  vue: {
    postcss: [
      // 让import '*.scss' 也生效
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('autoprefixer')({
        browsers: ['last 3 versions'],
      }),
      require('cssnano')({ safe: true })
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery', // 这个可以使jquery变成全局变量
      $: 'jquery',
    }),
  ]
}
