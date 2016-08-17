import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from  'vuex/logger'

import showmsg from './modules/showmsg.js'
import auth from './modules/auth.js'
import dashboard from './modules/dashboard.js'
import member from './modules/member.js'
import app from './modules/app.js'
import tenant from './modules/tenant.js'
import message from './modules/message.js'
import service from './modules/service.js'
import finance from './modules/finance.js'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    showmsg,
    auth,
    dashboard,
    member,
    app,
    tenant,
    message,
    service,
    finance,
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
