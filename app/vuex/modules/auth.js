import {
  LOCAL_LOGIN,
  LOCAL_LOGOUT
} from '../mutation-types.js'

const state = {
  token: '',
  user: null
}

const mutations = {
  [LOCAL_LOGIN](state, user){
    state.user = user
  },
  [LOCAL_LOGOUT](store){
    state.user = null
  }
}

export default {
  state,
  mutations
}



