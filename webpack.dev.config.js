var config = require('./webpack.base.config')

config.devtool = 'eval-source-map'

config.devServer = {
<<<<<<< HEAD
  noInfo: true
=======
  noInfo: true,
  proxy: {
    'static/': {
      target: 'localhost:5000',
      source: false
    }
  }
>>>>>>> 616f62558185e91d7a13c8e28cc9a069f872a09a
}

module.exports = config
