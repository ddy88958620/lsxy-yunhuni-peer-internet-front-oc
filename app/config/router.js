export default function(router){
  router.map({
    '/auth': {
      component: require('../components/pages/auth.vue')
    }
  })
  // set the default router-view
  router.redirect({
    // '/postlist': '/postlist/test',
  })
}
