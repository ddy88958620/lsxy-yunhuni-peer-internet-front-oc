import {
  APP_COUNT,
  LASTDAY_COMSUME,
  LASTDAY_DURATION
} from '../mutation-types.js'

const state = {
  count: {
    online: 0,
    total: 0
  },
  duration: {
    duration_day : 0,
    day_rate : 0,
    week_rate : 0,
    month_rate : 0
  },
  comsume: {
    consume_day : 0,
    day_rate : 0,
    week_rate : 0,
    month_rate : 0
  }
}

const mutations = {
  [APP_COUNT] (state, app) {
    state.count = app
  },
  [LASTDAY_COMSUME] (state, comsume) {
    state.duration_day = comsume
  },
  [LASTDAY_DURATION] (state, duration) {
    state.comsume = duration
  }
}

export default {
  state,
  mutations
}
