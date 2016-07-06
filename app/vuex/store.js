import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todo.js'

const debug = process.env.NODE_ENV !== 'production'

// install Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todo
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
