import { getCookie } from '../utils/cookieAuth.js'

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
      component: require('../components/pages/admin.vue'),
      subRoutes: {
        '/dashboard': {
          component: require('../components/pages/dashboard/index.vue'),
          subRoutes: {
            '/a': {
              component: require('../components/pages/dashboard/page-child-a/index.vue')
            },
            '/b': {
              component: require('../components/pages/dashboard/page-child-b/index.vue')
            },
          }
        },
        '/charts': {
          component: require('../components/pages/charts/index.vue'),
          subRoutes: {
            '/c': {
              component: require('../components/pages/charts/page-child-c/index.vue')
            },
            '/d': {
              component: require('../components/pages/charts/page-child-d/index.vue')
            },
          }
        },
        '/service': {
          component: require('../components/pages/charts/index.vue')
        }
      }
    },
  })
  // set the default router-view
  router.redirect({
    // '/postlist': '/postlist/test',
  })

  router.beforeEach(function({to, next, redirect}){
    if(to.auth || getCookie('user')) {
      next()
    } else {
      // redirect, status 401 or 403 ...
      redirect('/auth/login')
    }
  })
}
