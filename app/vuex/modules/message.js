import {
  MESSAGE_LIST,
  MESSAGE_MORE_LIST,
  NEW_MESSAGE,
  EDIT_MESSAGE,
  MESSAGE_DETAIL
} from '../mutation-types'

const state = {
   list : {},
   detail: {}
}

const mutations = {
  [MESSAGE_LIST] (state, list) {
    state.list = list
  },
  [MESSAGE_MORE_LIST] (state, list) {
    state.list.currentPageNo = list.currentPageNo
    state.list.result = state.list.result.concat(list.result)
  },
  [MESSAGE_DETAIL] (state, detail){
    state.detail = detail
  }
}

export default {
  state,
  mutations
}