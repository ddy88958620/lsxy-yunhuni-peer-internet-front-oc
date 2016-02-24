export default function(router){
  router.map({
    '/admin/post': {
      component:  require('../components/post/main.vue'),
      subRoutes: {
        'add': { component: require('../components/post/newPost.vue')},
        'list': { component: require('../components/post/postList.vue')},
      }
    }
  })
  // set the default router-view
  router.redirect({
    // '/postlist': '/postlist/test',
  })
}
