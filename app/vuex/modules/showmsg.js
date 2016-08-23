import {
  SHOW_MSG,
  HIDE_MSG
} from '../mutation-types'


const state = {
  message: {
    type: '',
    content: '',
    title: '',
    show: false,
  }
}

const mutations = {
  [SHOW_MSG] (state, message) {
    state.message = {...message}
    state.message.show = true
  },
  [HIDE_MSG] (state) {
    state.message = {
      type: '',
      content: '',
      title: '',
      show: false
    }
  }
}

export default {
  state,
  mutations
}
