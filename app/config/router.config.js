export default function(router){
  router.map({
    '/editor':{
      component: require('../components/editor.vue')
    },
    '/postlist':{
      component: require('../components/postlist.vue'),
      subRoutes:{
        '/test':{
          component: require('../components/test.vue')
        },
        '/test2': {
          component: require('../components/test2.vue')
        }
      }
    }
  })

  // set the default router-view
  router.redirect({
    '/postlist': '/postlist/test',
  })
}
