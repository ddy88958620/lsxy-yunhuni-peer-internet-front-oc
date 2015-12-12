export default function(router){
  router.map({
    '/editor':{
      component: require('./components/editor.vue')
    }
  })
}
