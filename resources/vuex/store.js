import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todo.js'

// install Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todo
  },
  strict: true,
})
