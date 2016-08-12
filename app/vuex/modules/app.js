import {
  APP_COUNT,
} from '../mutation-types.js'

const state = {
  count:{
    online: 0,
    total: 0
  }

}

const mutations = {
  [APP_COUNT] (state, app) {
    state.count = app
  },
}

export default {
  state,
  mutations
}
