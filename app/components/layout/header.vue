<style lang="stylus" rel="stylesheet/stylus">
  header-height = 50px
  flexbox()
    display flex
    flex 1
  .app-header
    font-size 1.2rem
    display flex
    min-height header-height
    align-items center
    color #333
    .logobox
      width 200px
    .nav-box
      margin 0
      padding 0
      li
        list-style-type none
        text-align center
    .nav-left
      flexbox()
      .logo
        width 50px
    .nav-right
      flexbox()
      justify-content flex-end
</style>

<template>
  <header class='app-header'>
    <div class="logobox">
      <ul class="nav-box nav-left">
        <li class="logo">logo</li>
        <li>运营中心后台</li>
      </ul>
    </div>
    <ul class="nav-box nav-right">
      <li >欢迎您，<a href="">admin</a>，今天，</li>
      <li ><a>您有(3)件事项未处理</a></li>
      <li >(3)条未读</li>
      <li><a @click='localLogout'>退出</a></li>
    </ul>
  </header>
</template>
<script>
import {localLogout} from '../../vuex/actions.js'
export default {
  vuex: {
    actions: {
      localLogout
    }
  }
}
</script>
