<style lang='sass' scope>
  @import '../../scss/variable.scss';
  .app-header{
    height:$header-height;
    background-color: #fff;
    .nav-left{
      width: 200px;
    }
    .topbar-btn{
      padding: 17px 10px;
      cursor: pointer;
      &:hover{
        background: #f3f0f0;
      }
    }
  }
</style>

<template>
  <header class='app-header flex align-items'>
    <div class="nav-left ">
      <div class="nav-logo flex flex-1 align-items ">
        <span class="topbar-btn logo">logo</span>
        <span class="topbar-btn">运营中心后台</span>
      </div>
    </div>
    <div class="nav-right flex flex-1 justify-content-end align-items">
      <span class="topbar-btn" >欢迎您，<a href="">admin</a>，今天，</span>
      <span class="topbar-btn" ><a>您有(3)件事项未处理</a></span>
      <span class="topbar-btn" >(3)条未读</span>
      <span class="topbar-btn" ><a @click='localLogout'>退出</a></span>
    </div>
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
