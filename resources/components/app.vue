<template>
<div>
  <header>
    <h1><a v-link="'/admin/post'">管理后台</a></h1>
  </header>
  
  <a v-link="'/admin/post'">Post</a>
  <router-view></router-view>
</div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'ddddddd'
    }
  },
  ready: function(){
    console.log(this.msg)
  }
}

</script>
