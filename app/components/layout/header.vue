<style lang='sass' scope>
  @import '../../scss/variable.scss';
  .app-header{
    height:$header-height;
    border-bottom: 1px solid #eeeeee;
    color:#666;
    font-size: 1.4rem;
    .nav-right{
      width: 200px;
      position: relative;

      i{
        position: absolute;
        right:5px;
        top:5px;
        color:#d4d4d4;
        font-size: 1.8rem;
      }
    }
    .topbar-btn{
      padding: 15px 10px;
    }
  }
</style>

<template>
  <header class='app-header flex align-items-c'>

    <div class="nav-left flex flex-1 justify-content-s align-items-c overflow">
      <span class="topbar-btn flex" >欢迎您来到云呼你运营中心,您有 <a href="#">3</a> 件事项未处理</span><span class="iconfont icon-oc-user"></span>
    </div>
    <div class="nav-right">
      <div class=" flex flex-1">
        <input class="form-control search" placeholder="搜索"   /><i class="iconfont icon-ico-search1"></i>
      </div>
    </div>
  </header>
</template>
<script>
import {localLogout} from '../../vuex/actions.js'
export default {
  vuex: {
    actions: {
    }
  }
}
</script>
