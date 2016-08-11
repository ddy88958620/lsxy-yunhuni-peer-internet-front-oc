import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import NProgress from 'nprogress'


import {sync} from 'vuex-router-sync'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(VueResource)

import App from './components/app.vue'
import configRouter from './config/router.js'

const router = new VueRouter({
  // history: true,
  saveScrollPosition: true,
})

Vue.http.interceptors.push(() => {
  return {
    request (request) {
      NProgress.inc(0.2)
      return request
    },

    response (response) {
      NProgress.done()
      return response
    }
  }
})


router.beforeEach(({ next }) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})


// test
configRouter(router)
sync(store, router)

router.start(App ,'#app')

// just for the debug
window.router = router
