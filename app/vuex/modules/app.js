import {
  APP_COUNT,
} from '../mutation-types.js'

const state = {
    online: 0,
    total: 0
}

const mutations = {
  [APP_COUNT] (state, app) {
    state.online = app.online
    state.total = app.total
  },
}

export default {
  state,
  mutations
}
