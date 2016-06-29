import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/app.vue'
import configRouter from './config/router'

Vue.use(VueRouter)

const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

configRouter(router)

router.start(App,'#app')

// just for the debug
window.router = router
