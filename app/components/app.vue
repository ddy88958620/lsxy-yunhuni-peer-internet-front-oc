<template id="">
  <div class="">
    <h1><a v-link="{path: './'}">demo</a></h1>
    <a v-link="{path: '/editor'}">文章编辑</a>
    <a v-link="{path: '/postlist'}">文章列表</a>
    <router-view keep-alive></router-view>
  
    <input type="text" v-model='msg'>

    {{ msg }}
  </div>

</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  ready: function(){
    console.log(this.msg)
  }
}

</script>
