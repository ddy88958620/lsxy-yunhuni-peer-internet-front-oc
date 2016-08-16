import {
  SERVICE_LIST,
  SERVICE_MORE_LIST
} from '../mutation-types'

const state = {
   list : {}
}

const mutations = {
  [SERVICE_LIST] (state, list) {
    state.list = list
  },
  [SERVICE_MORE_LIST] (state, list) {
    state.list.currentPageNo = list.currentPageNo
    state.list.result = state.list.result.concat(list.result)
  }
}

export default {
  state,
  mutations
}