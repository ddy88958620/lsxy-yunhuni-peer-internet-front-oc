import {
  MESSAGE_LIST,
  MESSAGE_MORE_LIST
} from '../mutation-types'

const state = {
   list : {}
}

const mutations = {
  [MESSAGE_LIST] (state, list) {
    state.list = list
  },
  [MESSAGE_MORE_LIST] (state, list) {
    state.list.currentPageNo = list.currentPageNo
    state.list.result = state.list.result.concat(list.result)
  },

}

export default {
  state,
  mutations
}
