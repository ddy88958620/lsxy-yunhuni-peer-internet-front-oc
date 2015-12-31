var config = require('./webpack.base.config')

config.devtool = 'eval-source-map'

config.devServer = {
  noInfo: true,
  proxy: {
    'static/': {
      target: 'localhost:5000',
      source: false
    }
  }
}

module.exports = config
