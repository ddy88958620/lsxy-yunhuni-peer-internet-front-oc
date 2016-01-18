<<<<<<< HEAD:app/components/app.vue
<template>
    <div>
      {{msg}}
    </div>
=======
<template id="">
  <div class="">
    <h1><a v-link="{path: './'}">demo</a></h1>
    <a v-link="{path: '/editor'}">文章编辑</a>
    <a v-link="{path: '/postlist'}">文章列表</a>
    <router-view keep-alive></router-view>
  
    <input type="text" v-model='msg'>

    {{ msg }}
  </div>

>>>>>>> 616f62558185e91d7a13c8e28cc9a069f872a09a:resources/components/app.vue
</template>

<script>

export default {
  data () {
    return {
<<<<<<< HEAD:app/components/app.vue
      msg: 'ddddddd'
    }
=======
      msg: ''
    }
  },
  ready: function(){
    console.log(this.msg)
>>>>>>> 616f62558185e91d7a13c8e28cc9a069f872a09a:resources/components/app.vue
  }
}

</script>
