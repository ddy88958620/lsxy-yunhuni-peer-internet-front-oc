//import { getCookie } from '../utils/cookieAuth.js'
import cookies from 'cookies'

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
          name: 'dashboard',
          component: (resolve) => require(['../components/pages/dashboard/index.vue'], resolve),
        },
        '/inactive': {
          name: 'inactive',
          component: (resolve) => require(['../components/pages/inactive/index.vue'], resolve),
          subRoutes: {
            '/wait': {
              component: (resolve) => require(['../components/pages/inactive/waitActive.vue'], resolve)
            },
            'lose': {
              component: (resolve) => require(['../components/pages/inactive/lose.vue'], resolve)
            }
          }
        },
        '/tenant': {
          name: 'tenantList',
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
                  subRoutes: {
                    '/list': {
                      component: (resolve) => require(
                        ['../components/pages/tenant/app/list/index.vue'],
                        resolve),
                    },
                    '/detail/:appid': {
                      component: (resolve) => require(['../components/pages/tenant/app/detail/index.vue'], resolve),
                      subRoutes: {
                        '/template': {
                          component: (resolve) => require(['../components/pages/tenant/app/detail/template-table.vue'], resolve),
                        },
                        '/extension': {
                          component: (resolve) => require(['../components/pages/tenant/app/detail/extension-table.vue'], resolve),
                        },
                        '/condition': {
                          component: (resolve) => require(['../components/pages/tenant/app/detail/condition-table.vue'], resolve),
                        },
                        '/play': {
                          component: (resolve) => require(['../components/pages/tenant/app/detail/play-table.vue'], resolve),
                        },
                        '/record': {
                          component: (resolve) => require(
                            ['../components/pages/tenant/app/detail/record-table.vue'],
                            resolve),
                        },
                        '/bind': {
                          component: (resolve) => require(['../components/pages/tenant/app/detail/bind-number.vue'],
                          resolve),
                        },
                        '/agent': {
                          component: (resolve) => require(['../components/pages/tenant/app/detail/agent.vue'],
                          resolve),
                        },
                        '/subs/:serviceType': {
                          component: (resolve) => require(['../components/pages/tenant/app/detail/subs.vue'],
                            resolve),
                        },
                      }
                    }
                  }
                },
                '/base': {
                  component: (resolve) => require(['../components/pages/tenant/base/index.vue'], resolve)
                },
                '/session/': {
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
                    '/verification': {
                      component: (resolve) => require(['../components/pages/tenant/session/verification/index.vue'], resolve),
                    },
                    '/ivr': {
                      component: (resolve) => require(['../components/pages/tenant/session/ivr/index.vue'], resolve),
                    },
                    '/msg/:type': {
                      component: (resolve) => require(['../components/pages/tenant/session/msg/index.vue'], resolve),
                    },
                    '/callcenter': {
                      component: (resolve) => require(['../components/pages/tenant/session/callcenter/index.vue'], resolve),
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
                    '/callcenter': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/callcenter/index.vue'], resolve),
                    },
                    '/calldetail/:appid': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/callcenter/detail.vue'], resolve),
                    },
                    '/recharge': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/recharge/index.vue'], resolve),
                    },
                    '/interface': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/interface/index.vue'], resolve),
                    },
                    '/msg': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/msg/index.vue'], resolve),
                    },
                    'line': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/line/index.vue'], resolve),
                    },
                    'subs': {
                      component: (resolve) => require(['../components/pages/tenant/statistic/subs/index.vue'], resolve),
                    }
                  },
                },
                '/switch': {
                  component: (resolve) => require(['../components/pages/tenant/switch/index.vue'], resolve)
                },
                '/price': {
                  component: (resolve) => require(['../components/pages/tenant/price/index.vue'], resolve)
                },
                '/private': {
                  component: (resolve) => require(['../components/pages/tenant/private/index.vue'], resolve)
                },
                '/number': {
                  component: (resolve) => require(['../components/pages/tenant/numberlock/index.vue'], resolve)
                },
              }
            },
            '/list' : {
              name: 'tenantlist',
              component: (resolve) => require(['../components/pages/tenant/list.vue'], resolve)
            }
          }
        },
        '/service': {
          component: (resolve) => require(['../components/pages/service/index.vue'], resolve),
          subRoutes: {
            '/list': {
              component: (resolve) => require(['../components/pages/service/list.vue'], resolve),
            }
          }
        },
        '/settings' : {
          component: (resolve) => require(['../components/pages/settings/index.vue'], resolve),
          subRoutes: {
            '/line' : {
              component: (resolve) => require(['../components/pages/settings/line/index.vue'], resolve),
              subRoutes: {
                '/list': {
                  component: (resolve) => require(['../components/pages/settings/line/list.vue'], resolve),
                  subRoutes: {
                    '/all': {
                      name: 'line',
                      component: (resolve) => require(['../components/pages/settings/line/all_line.vue'], resolve),
                    },
                    '/global': {
                      component: (resolve) => require(['../components/pages/settings/line/global_line.vue'], resolve),
                    }
                  }
                },
                '/new' : {
                  component: (resolve) => require(['../components/pages/settings/line/new_line.vue'], resolve),
                },
                '/detail/:lid': {
                  component: (resolve) => require(['../components/pages/settings/line/detail/index.vue'], resolve),
                  subRoutes: {
                    '/base': {
                      component: (resolve) => require(['../components/pages/settings/line/detail/base.vue'], resolve),
                    },
                    '/number': {
                      name:'telnum',
                      component: (resolve) => require(['../components/pages/settings/line/detail/number.vue'], resolve),
                    },
                    '/tenant': {
                      component: (resolve) => require(['../components/pages/settings/line/detail/tenant.vue'], resolve),
                    },
                  }
                }
              }
            },
            '/number' : {
              component: (resolve) => require(['../components/pages/settings/number/index.vue'], resolve),
              subRoutes: {
                '/list': {
                  component: (resolve) => require(['../components/pages/settings/number/list.vue'], resolve),
                  subRoutes: {
                    '/all': {
                      name: 'numberAll',
                      component: (resolve) => require(['../components/pages/settings/number/all_number_list.vue'], resolve),
                    },
                    '/lock': {
                      component: (resolve) => require(['../components/pages/settings/number/lock_list.vue'], resolve),
                    }
                  }
                },
                '/new' : {
                  component: (resolve) => require(['../components/pages/settings/number/detail/new_number.vue'], resolve),
                },
                '/detail/:nid' : {
                  component: (resolve) => require(['../components/pages/settings/number/detail/index.vue'], resolve),
                  subRoutes: {
                    '/base': {
                      component: (resolve) => require(['../components/pages/settings/number/detail/edit_number.vue'], resolve),
                    },
                    '/relate': {
                      component: (resolve) => require(['../components/pages/settings/number/detail/related.vue'], resolve),
                    }
                  }
                }
              }
            },
            '/product': {
              component: (resolve) => require(['../components/pages/route-middle.vue'], resolve),
              subRoutes: {
                '/list': {
                  component: (resolve) => require(['../components/pages/settings/product/list.vue'], resolve),
                  subRoutes: {
                    '/pro': {
                      component: (resolve) => require(['../components/pages/settings/product/product_list.vue'], resolve),
                    },
                    '/price': {
                      component: (resolve) => require(['../components/pages/route-middle.vue'], resolve),
                      subRoutes: {
                        '/index': {
                          name: 'priceList',
                          component: (resolve) => require(['../components/pages/settings/product/price_list.vue'], resolve),
                        },
                        '/edit/:pid': {
                          component: (resolve) => require(['../components/pages/settings/product/detail/price_edit.vue'], resolve),
                        }
                      }
                    },
                  }
                },
              }
            },
            '/global': {
              component: (resolve) => require(['../components/pages/route-middle.vue'], resolve),
              subRoutes: {
                '/list': {
                  name: 'globalList',
                  component: (resolve) => require(['../components/pages/settings/global/global_list.vue'], resolve)
                }
              }
            },
            '/role': {
              component: (resolve) => require(['../components/pages/route-middle.vue'], resolve),
              subRoutes: {
                '/list': {
                  component: (resolve) => require(['../components/pages/settings/role/list.vue'], resolve),
                },
                '/new': {
                  component: (resolve) => require(['../components/pages/settings/role/newRole.vue'], resolve),
                }
              }
            },
            '/operator': {
              component: (resolve) => require(['../components/pages/route-middle.vue'], resolve),
              subRoutes: {
                '/list': {
                  component: (resolve) => require(['../components/pages/settings/operator/list.vue'], resolve),
                },
                '/new': {
                  component: (resolve) => require(['../components/pages/settings/operator/newOperator.vue'], resolve),
                }
              }
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
            },
            '/edit/:mid': {
              component: (resolve) => require(['../components/pages/message/edit.vue'], resolve),
            },
            '/detail/:mid': {
              component: (resolve) => require(['../components/pages/message/detail.vue'], resolve),
            },
          }
        },
        '/finance': {
          component: (resolve) => require(['../components/pages/finance/index.vue'], resolve),
          subRoutes: {
            '/invoice': {
              component: (resolve) => require(['../components/pages/finance/invoice/index.vue'], resolve),
              subRoutes:{
                '/list':{
                  component: (resolve) => require(['../components/pages/finance/invoice/list.vue'], resolve),
                  subRoutes:{
                    '/pending':{
                      component: (resolve) => require(['../components/pages/finance/invoice/table/pending-table.vue'], resolve),
                    },
                    '/passed':{
                      component: (resolve) => require(['../components/pages/finance/invoice/table/passed-table.vue'], resolve),
                    },
                    '/abnormal':{
                      component: (resolve) => require(['../components/pages/finance/invoice/table/abnormal-table.vue'], resolve),
                    }
                  }
                },
                '/detail/:id':{
                  component: (resolve) => require(['../components/pages/finance/invoice/detail.vue'],resolve),
                }
              }
            },
            '/delivery': {
              component: (resolve) => require(['../components/pages/finance/delivery/index.vue'], resolve),
              subRoutes:{
                '/list':{
                  component: (resolve) => require(['../components/pages/finance/delivery/list.vue'], resolve),
                  subRoutes:{
                    '/unsend':{
                      component: (resolve) => require(['../components/pages/finance/delivery/table/unsend-table.vue'], resolve),
                    },
                    '/send':{
                      component: (resolve) => require(['../components/pages/finance/delivery/table/send-table.vue'], resolve),
                    }
                  },
                },
                '/detail/:id':{
                  component: (resolve) => require(['../components/pages/finance/delivery/detail.vue'],resolve),
                }
              }
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
                    '/unauth':{
                      component: (resolve) => require(['../components/pages/demand/voice/table/unauth-table.vue'], resolve),
                    }
                  }
                }
              }
            },
            '/app': {
              component: (resolve) => require(['../components/pages/demand/app/index.vue'], resolve),
              subRoutes: {
                '/list/:type':{
                  component: (resolve) => require(['../components/pages/demand/app/list.vue'], resolve),
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
                    '/unauth':{
                      component: (resolve) => require(['../components/pages/demand/member/table/unauth-table.vue'], resolve),
                    }
                  }
                },
                '/detail/:authStatus/:id/:type':{
                  component: (resolve) => require(['../components/pages/demand/member/detail.vue'],resolve)
                }
              }
            },
            '/template': {
              component: (resolve) => require(['../components/pages/demand/template/index.vue'], resolve),
              subRoutes: {
                '/list/:type':{
                  component: (resolve) => require(['../components/pages/demand/template/list.vue'], resolve),
                },
                '/detail/:templateid':{
                  component: (resolve) => require(['../components/pages/demand/template/detail.vue'], resolve),
                }
              }
            }
          }
        }
      }
    },
  })

  // set the default router-view
  router.redirect({
    '*': '/admin/dashboard',
    '/': '/auth/login',
    // '/admin': '/admin/dashboard',
    '/admin/service': '/admin/service/list',
    '/admin/message': '/admin/message/list',
    '/admin/tenant': '/admin/tenant/list',
    '/admin/finance': '/admin/finance/invoice',
    '/admin/finance/invoice': '/admin/finance/invoice/list/pending',
    '/admin/finance/delivery': '/admin/finance/delivery/list/unsend',
    '/admin/tenant/detail/:uid/': '/admin/tenant/detail/:uid/preview',
    '/admin/tenant/detail/:uid/app': '/admin/tenant/detail/:uid/app/list',
    '/admin/tenant/detail/:uid/statistic': '/admin/tenant/detail/:uid/statistic/consume',
    '/admin/tenant/detail/:uid/session': '/admin/tenant/detail/:uid/session/call',
    '/admin/demand': '/admin/demand/member',
    '/admin/demand/member': '/admin/demand/member/list/await',
    '/admin/demand/voice': '/admin/demand/voice/list/await',
    '/admin/demand/app': '/admin/demand/app/list/await',
    '/admin/demand/template': '/admin/demand/template/list/await',
    '/admin/inactive': '/admin/inactive/wait',
    '/admin/settings': '/admin/settings/line/list/all',
    '/admin/settings/line': '/admin/settings/line/list/all',
    '/admin/settings/number': '/admin/settings/number/list/all',
    '/admin/settings/number/detail/:nid': '/admin/settings/number/detail/:nid/base',
    '/admin/settings/line/detail/:lid': '/admin/settings/line/detail/:lid/base',
    '/admin/settings/product': '/admin/settings/product/list/pro',
    '/admin/settings/product/list/price': '/admin/settings/product/list/price/index',
    '/admin/settings/role': '/admin/settings/role/list',
    '/admin/settings/operator': '/admin/settings/operator/list',
  })

  router.beforeEach(function({to, next, go}){
    // http only YUNHUNISESSIONID 不可在 document.cookie中打印，所以用自己设置的
    if(to.auth || cookies.get('user')) {
      next()
    } else {
      // redirect, status 401 or 403 ...
      go('/auth/login')
    }
  })
}
