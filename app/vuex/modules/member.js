import {
  MEMBER_COUNT,
  MEMBER_RANK_LIST,
} from '../mutation-types'

const state = {
  count:{
    regist_total: 0,
    regist_tatal_day: 0,
    regist_tatal_week: 0,
    regist_tatal_month: 0,
    auth_total: 0,
    auth_total_day: 0,
    auth_total_week: 0,
    auth_total_month: 0,
    consume: 0,
    consume_day: 0,
    consume_week: 0,
    consume_month: 0
  },
  ranklist:{
    duration_top :[],
    call_top :[],
    consume_top :[],
    duration_week_top: [],
    call_week_top: []
  }



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
