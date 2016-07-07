<style lang="stylus" rel="stylesheet/stylus">
  header-height = 60px
  flexbox()
    display flex
    flex 1
  .app-header
    font-size 16px
    display flex
    min-height header-height
    align-items center
    color #FFF
    position flex
    background-color #2E97CB
    .logobox
      width 200px
    .nav-box
      margin 0
      padding 0
      li
        list-style-type none
        text-align center
        a
          color #FFF
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
      <li>欢迎您，<a href="">{{ msg }}</a>，今天，</li>
      <li><a @click='doshowMsg()'>您有({{ mattercount }})件事项未处理</a></li>
      <li><a @click='hideMsg()'>(3)条未读</a></li>
      <li>退出</li>
    </ul>
  </header>
</template>

<script>
  import {showMsg, hideMsg} from '../../vuex/actions'
  export default {
    data(){
      return {
        msg: 'admin',
        mattercount : 10
      }
    },
    vuex: {
      actions: {
        showMsg,
        hideMsg
      }
    },
    methods: {
      doshowMsg(){
        this.showMsg({content: '你有十个未读消息'})
      }
    }
  }
</script>
