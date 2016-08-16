import {
  TENANT_LIST
} from '../mutation-types.js'

const state = {
  list: []
}

const mutations = {
  [TENANT_LIST] (state, list) {
    state.list = list
  }
}

export default {
  state,
  mutations
}
