import {
  APP_COUNT,
} from '../mutation-types'

const state = {

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
