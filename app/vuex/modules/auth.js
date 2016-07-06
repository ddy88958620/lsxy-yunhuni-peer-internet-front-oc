import {
  LOGIN_SUCCESS,
  USERINFO_SUCCESS,
  USERINFO_FAILURE,
  LOGOUT_USER,
  UPDATE_USESR_SUCCESS
} from '../types'

const state = {
  token: '',
  user: null
}

const mutations = {
  [LOGIN_SUCCESS](state, action){
    state.token = action.token
  },
  [USERINFO_SUCCESS](state, action) {
    state.user = action.user
  },
  [USERINFO_FAILURE](state, action) {
    state.user = null
  },
  [LOGOUT_USER](state, action) {
    state.token = null
    state.user = null
  },
  [UPDATE_USESR_SUCCESS](state, action) {
    state.user = action.user
  },
}

export default {
  state,
  mutations
}
