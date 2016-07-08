import {
  SHOW_MSG,
  HIDE_MSG
} from '../mutation-types'


const state = {
  message: {
    type: '',
    content: '',
    title: ''
  }
}

const mutations = {
  [SHOW_MSG] (state, message) {
    state.message = {...message}
  },
  [HIDE_MSG] (state) {
    state.message = {
      type: '',
      content: '',
      title: ''
    }
  }
}

export default {
  state,
  mutations
}
