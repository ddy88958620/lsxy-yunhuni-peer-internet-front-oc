import {
  ADD_TODO
} from '../mutation-types.js'

const state = {
  todos: []
}

const mutations = {
  [ADD_TODO] (state, text) {
    state.todos.push(text)
  }
}

export default {
  state,
  mutations
}

window.store = state
