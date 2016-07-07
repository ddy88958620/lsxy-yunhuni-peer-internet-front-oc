export default function(router){
  router.map({
    '/auth/login': {
      component: require('../components/pages/auth.vue'),
      auth: true
    },
    '/auth/register': {
      component: require('../components/pages/auth.vue')
    },
    '/admin': {
      component: require('../components/pages/admin.vue')
    }
  })
  // set the default router-view
  router.redirect({
    // '/postlist': '/postlist/test',
  })

  router.beforeEach(function({to, next, redirect}){
    if(to.auth) {
      // login
      next()
    } else {
      // redirect, status 401 or 403 ...
      next()
      //redirect('/auth/login')
    }
  })
}
