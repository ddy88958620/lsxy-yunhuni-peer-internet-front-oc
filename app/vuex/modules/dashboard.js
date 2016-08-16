import {
  DASHBOARD_MEMBER,
  DASHBOARD_APP
} from '../mutation-types'

const state = {
  member: null,
  app: null
}

const mutations = {
  [DASHBOARD_MEMBER] (state, member) {
    state.member = member
  },
  [DASHBOARD_APP] (state, app) {
    state.app = app
  }
}

export default {
  state,
  mutations
}
