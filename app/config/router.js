import { getCookie } from '../utils/cookieAuth.js'


// FUNCTION LAZYLOA DO NOT WORK
// const lazyLoad = function(path) {
//   return (resolve) => require([`${path}`], resolve)
// }


export default function(router){
  router.map({
    '/auth/login': {
      component: (resolve) => require(['../components/pages/auth.vue'], resolve),
      auth: true
    },
    '/auth/register': {
      component: (resolve) => require(['../components/pages/auth.vue'], resolve)
    },
    '/admin': {
      component: (resolve) =>  require(['../components/pages/admin.vue'], resolve),
      subRoutes: {
        '/dashboard': {
          component: (resolve) => require(['../components/pages/dashboard/index.vue'], resolve),
        },
        '/tenant': {
          component: (resolve) => require(['../components/pages/tenant/index.vue'], resolve),
        },
        '/service': {
          component: (resolve) => require(['../components/pages/service/index.vue'], resolve),
          subRoutes: {
            '/list': {
              component: (resolve) => require(['../components/pages/service/list.vue'], resolve),
            }
          }
        },
        '/message': {
          component: (resolve) => require(['../components/pages/message/index.vue'], resolve),
          subRoutes: {
            '/list': {
              component: (resolve) => require(['../components/pages/message/list.vue'], resolve),
            },
            '/new': {
              component: (resolve) => require(['../components/pages/message/new.vue'], resolve),
            }
          }
        },
        '/demand': {
          component: (resolve) => require(['../components/pages/demand/index.vue'], resolve),
	        subRoutes: {
            '/voice': {
              component: (resolve) => require(['../components/pages/demand/voice.vue'], resolve),
              subRoutes: {
                '/:tabid': {
                  component: (resolve) => require(['../components/pages/demand/voice/audting.vue'], resolve)
                }
              }
            },
            '/member': {
              component: (resolve) => require(['../components/pages/demand/member/index.vue'], resolve),
	            subRoutes: {
                '/:tabid': {
                  component: (resolve) => require(['../components/pages/demand/member/audting.vue'], resolve)
                }
              }
            },
            '/member/detail': {
              component: (resolve) => require(['../components/pages/demand/member/detail.vue'],resolve)
            }

          }
        }
      }
    },
  })
  
  // set the default router-view
  router.redirect({
    '/': '/admin',
	  '/admin/demand': '/admin/demand/member',
    '/admin/service': '/admin/service/list',
	  '/admin/message': '/admin/message/list',
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
