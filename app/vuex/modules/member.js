import {
  MEMBER_COUNT,
  MEMBER_RANK_LIST,
} from '../mutation-types'

const state = {

}

const mutations = {
  [MEMBER_COUNT] (state, member) {
    state.count = member
  },
  [MEMBER_RANK_LIST] (state, list) {
    state.ranklist = list
  }

}

export default {
  state,
  mutations
}
