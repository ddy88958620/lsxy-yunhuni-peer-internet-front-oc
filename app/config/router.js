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
          subRoutes: {
            '/detail/:uid': {
              name: 'detail',
              component: (resolve) => require(['../components/pages/tenant/detail.vue'], resolve),
              subRoutes: {
                '/preview': {
                  component: (resolve) => require(['../components/pages/tenant/preview/index.vue'], resolve)
                },
                '/app': {
                  component: (resolve) => require(['../components/pages/tenant/app/index.vue'], resolve),
                  subRoutes:{
                    '/list':{
                      component: (resolve) => require(['../components/pages/tenant/app/list/index.vue'], resolve),
                    },
                    '/detail/:appid':{
                      component: (resolve) => require(['../components/pages/tenant/app/detail/index.vue'], resolve),
                      subRoutes:{
                        '/play':{
                          component: (resolve) => require(['../components/pages/tenant/app/detail/play-table.vue'], resolve),
                        },
                        '/record':{
                          component: (resolve) => require(['../components/pages/tenant/app/detail/record-table.vue'], resolve),
                        }
                      }
                    }
                  }
                },
                '/base': {
                  component: (resolve) => require(['../components/pages/tenant/base/index.vue'], resolve)
                },
                '/session': {
                  component: (resolve) => require(['../components/pages/tenant/session/index.vue'], resolve),
                  subRoutes: {
                    '/call': {
                      component: (resolve) => require(['../components/pages/tenant/session/call/index.vue'], resolve),
                    },
                    '/callback': {
                      component: (resolve) => require(['../components/pages/tenant/session/callback/index.vue'], resolve),
                    },
                    '/meeting': {
                      component: (resolve) => require(['../components/pages/tenant/session/meeting/index.vue'], resolve),
                    },
                    '/record': {
                      component: (resolve) => require(['../components/pages/tenant/session/record/index.vue'], resolve),
                    },
                    'verification': {
                      component: (resolve) => require(['../components/pages/tenant/session/verification/index.vue'], resolve),
                    },
                    'ivr': {
                      component: (resolve) => require(['../components/pages/tenant/session/ivr/index.vue'], resolve),
                    }
                  }
                },
                '/statistic': {
                  component: (resolve) => require(['../components/pages/tenant/statistic/index.vue'], resolve),
                  subRoutes: {
                    '/consume': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/consume/index.vue'], resolve),
                    },
                    '/conversation': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/conversation/index.vue'], resolve),
                    },
                    '/recharge': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/recharge/index.vue'], resolve),
                    },
                    '/interface': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/interface/index.vue'], resolve),
                    },
                    'line': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/line/index.vue'], resolve),
                    }
                  },
                },
                '/switch': {
                  component: (resolve) => require(['../components/pages/tenant/switch/index.vue'], resolve)
                },
              }
            },
            '/list' : {
              component: (resolve) => require(['../components/pages/tenant/list.vue'], resolve)
            }
          }
        }
        ,
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
              component: (resolve) => require(['../components/pages/demand/voice/index.vue'], resolve),
              subRoutes: {
                '/list':{
                  component: (resolve) => require(['../components/pages/demand/voice/list.vue'], resolve),
                  subRoutes:{
                    '/await':{
                      component: (resolve) => require(['../components/pages/demand/voice/table/await-table.vue'], resolve),
                    },
                    '/auditing':{
                      component: (resolve) => require(['../components/pages/demand/voice/table/auditing-table.vue'], resolve),
                    },
                    '/noauditing':{
                      component: (resolve) => require(['../components/pages/demand/voice/table/no-auditing-table.vue'], resolve),
                    }
                  }
                }
              }
            },
            '/member': {
              component: (resolve) => require(['../components/pages/demand/member/index.vue'], resolve),
	            subRoutes: {
                '/list':{
                  component: (resolve) => require(['../components/pages/demand/member/list.vue'], resolve),
                  subRoutes:{
                    '/await':{
                      component: (resolve) => require(['../components/pages/demand/member/table/await-table.vue'], resolve),
                    },
                    '/auditing':{
                      component: (resolve) => require(['../components/pages/demand/member/table/auditing-table.vue'], resolve),
                    },
                    '/noauditing':{
                      component: (resolve) => require(['../components/pages/demand/member/table/no-auditing-table.vue'], resolve),
                    }
                  }
                },
                '/detail/:id':{
                  component: (resolve) => require(['../components/pages/demand/member/detail.vue'],resolve)
                }
              }
            },
          }
        }
      }
    },
  })
  
  // set the default router-view
  router.redirect({
    '/': '/admin',
    '/admin/service': '/admin/service/list',
	  '/admin/message': '/admin/message/list',
    '/admin/tenant': '/admin/tenant/list',
    '/admin/tenant/detail/:uid/': '/admin/tenant/detail/:uid/preview',
    '/admin/tenant/detail/:uid/app': '/admin/tenant/detail/:uid/app/list',
    '/admin/tenant/detail/:uid/statistic': '/admin/tenant/detail/:uid/statistic/consume',
    '/admin/tenant/detail/:uid/session': '/admin/tenant/detail/:uid/session/call',
    '/admin/demand': '/admin/demand/member',
    '/admin/demand/member': '/admin/demand/member/list/await',
    '/admin/demand/voice': '/admin/demand/voice/list/await',
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
