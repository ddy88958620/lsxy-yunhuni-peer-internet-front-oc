import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from  'vuex/logger'

import showmsg from './modules/showmsg.js'

const debug = process.env.NODE_ENV !== 'production'

// install Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    showmsg
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
