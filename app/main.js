import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import NProgress from 'nprogress'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import * as filter from './utils/filters'
import vueLogger from 'vue-logger'

Vue.use(vueLogger, { prefix: new Date(), dev: true })
Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(VueResource)

Object.keys(filter).forEach((k) => Vue.filter(k, filter[k]))

import App from './components/app.vue'
import configRouter from './config/router.js'

import initDirective from './utils/directive'
initDirective(Vue)

const router = new VueRouter({
  transitionOnLoad: true,
  saveScrollPosition: true
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

router.start(Vue.extend(App), '#app')

// just for the debug
window.router = router
