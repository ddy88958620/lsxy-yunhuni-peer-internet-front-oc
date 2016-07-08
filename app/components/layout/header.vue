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
      <li >欢迎您，<a href="">admin</a>，今天，</li>
      <li ><a>您有(3)件事项未处理</a></li>
      <li >(3)条未读</li>
      <li><a @click='localLogout'>退出</a></li>
    </ul>
  </header>
</template>




<script>
<<<<<<< HEAD
import {localLogout} from '../../vuex/actions.js'
export default {
  vuex: {
    actions: {
      localLogout
    }
  }
}
=======
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
>>>>>>> 2ff59a01085cbbe49a1f65d8cb03621064680fe2
</script>
