import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'

Vue.use(VueRouter)
Vue.use(VueValidator)


import App from './components/app.vue'
import {configRouter} from './config'

const router = new VueRouter({
  // history: true,
  saveScrollPosition: true
})

// test
configRouter(router)

router.start(App,'#app')

// just for the debug
window.router = router
