import {
  LOCAL_LOGIN,
} from '../mutation-types.js'

const state = {
  token: '',
  user: null
}

const mutations = {
  [LOCAL_LOGIN](state, user){
    state.user = {...user}
  }
}

export default {
  state,
  mutations
}
